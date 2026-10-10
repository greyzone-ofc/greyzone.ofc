"use client";

import { ArrowLeft, ArrowRight, Pause, Play } from "lucide-react";
import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
  type FocusEvent,
  type KeyboardEvent,
} from "react";

const TONES = [
  "bg-black text-white",
  "bg-graphite text-white",
  "bg-ink text-white",
  "bg-grey text-black",
] as const;

const controlClass =
  "grid size-12 place-items-center rounded-button border border-black bg-white text-black transition-colors hover:bg-black hover:text-white";

// Cards per full turn; items repeat to fill the ring.
const RING = 12;
// Auto speed in cards per 60fps frame.
const AUTO = 0.004;
const MOTION_QUERY = "(prefers-reduced-motion: reduce)";

type Project = { name: string; type: string; summary: string };

type ArcCarouselProps = { label: string; title: string; muted: string; items: Project[] };

type Engine = { go: (step: number) => void; hover: (i: number) => void; leave: (i: number) => void; hold: (on: boolean) => void };

const wrap = (d: number, n: number) => ((((d + n / 2) % n) + n) % n) - n / 2;
const fade = (deg: number) => (deg <= 75 ? 1 : Math.max(0, (110 - deg) / 35));
const pad = (i: number) => String(i).padStart(2, "0");

function subscribeMotion(onChange: () => void) {
  const query = window.matchMedia(MOTION_QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

// Resting ring before hydration; must match frame() with zero velocity and no hover.
function restingStyle(i: number, total: number): CSSProperties {
  const deg = wrap(i, total) * (360 / total);
  const rad = (deg * Math.PI) / 180;
  const a = Math.abs(deg);
  return {
    opacity: fade(a),
    zIndex: Math.round(100 - a / 5),
    transform: `translate(-50%, -50%) translate(calc(var(--arc-r) * ${Math.sin(rad).toFixed(4)}), calc(var(--arc-r) * ${(-Math.cos(rad)).toFixed(4)})) rotate(${deg}deg) scale(${(1 - Math.min(a / 90, 1) * 0.12).toFixed(3)})`,
  };
}

export function ArcCarousel({ label, title, muted, items }: ArcCarouselProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const engine = useRef<Engine | null>(null);
  const playingRef = useRef(true);
  const [current, setCurrent] = useState(0);
  const [choice, setChoice] = useState<boolean | null>(null);
  const reduce = useSyncExternalStore(subscribeMotion, () => window.matchMedia(MOTION_QUERY).matches, () => false);
  const playing = choice ?? !reduce;

  const n = items.length;
  const total = n * Math.ceil(RING / n);
  const ring = Array.from({ length: total }, (_, i) => items[i % n]);
  const active = items[current];

  useEffect(() => {
    playingRef.current = playing;
  }, [playing]);

  useEffect(() => {
    const frameEl = frameRef.current;
    const stage = stageRef.current;
    if (!frameEl || !stage) return;

    const cards = cardRefs.current;
    const step = 360 / total;
    const hov = cards.map(() => 0);
    let radius = 0;
    let pos = 0;
    let vel = 0;
    let vSmooth = 0;
    let target: number | null = null;
    let dragging = false;
    let held = false;
    let visible = true;
    let lastX = 0;
    let lastT = 0;
    let hoverIdx = -1;
    let shown = 0;
    let raf = 0;

    function measure() {
      radius =
        parseFloat(getComputedStyle(frameEl!).getPropertyValue("--arc-r")) ||
        Math.min(stage!.clientWidth * 0.44, 480);
    }

    function frame(now: number) {
      raf = 0;
      const f = lastT ? Math.min((now - lastT) / 16.667, 3) : 1;
      lastT = now;
      const prev = pos;
      const auto = playingRef.current && !held && !dragging && hoverIdx < 0 && target === null;
      vel = Math.max(-0.5, Math.min(0.5, vel));

      if (dragging) {
        pos += vel * f;
        vel *= Math.pow(0.8, f);
      } else if (target !== null) {
        pos += (target - pos) * (1 - Math.pow(0.88, f));
        vel = 0;
        if (Math.abs(target - pos) < 0.001) {
          pos = target;
          target = null;
        }
      } else if (auto) {
        vel += (AUTO - vel) * (1 - Math.pow(0.95, f));
        pos += vel * f;
      } else {
        pos += vel * f;
        vel *= Math.pow(0.93, f);
        if (!playingRef.current && Math.abs(vel) < 0.03) pos += (Math.round(pos) - pos) * (1 - Math.pow(0.88, f));
      }

      vSmooth += ((pos - prev) / f - vSmooth) * 0.18;
      const v = reduce ? 0 : vSmooth;
      const spread = step * (1 + Math.min(Math.abs(v) * 3.2, 0.5));
      const skew = v * -70;
      const extraRot = v * 70;
      let busy =
        auto ||
        dragging ||
        target !== null ||
        Math.abs(vel) > 0.0005 ||
        Math.abs(vSmooth) > 0.0005 ||
        (!playingRef.current && Math.abs(Math.round(pos) - pos) > 0.0005);

      for (let i = 0; i < total; i++) {
        const card = cards[i];
        if (!card) continue;
        const d = wrap(i - pos, total);
        const deg = d * spread;
        const a = Math.abs(deg);
        const goal = hoverIdx === i && !dragging ? 1 : 0;
        hov[i] += (goal - hov[i]) * (1 - Math.pow(0.86, f));
        if (Math.abs(goal - hov[i]) > 0.001) busy = true;
        else hov[i] = goal;
        const hv = hov[i];

        const rad = (deg * Math.PI) / 180;
        const r = radius + hv * 24;
        const x = Math.sin(rad) * r;
        const y = -Math.cos(rad) * r;
        const rot = (deg + extraRot * Math.sign(d || 1) * Math.min(Math.abs(d), 1.5) * 0.5) * (1 - hv);
        const s = 1 - Math.min(a / 90, 1) * 0.12 + hv * 0.35;

        const o = fade(a);
        card.style.opacity = String(o);
        card.style.pointerEvents = o > 0.5 ? "" : "none";
        card.style.zIndex = String(Math.round(100 - a / 5 + hv * 100));
        card.style.transform = `translate(-50%, -50%) translate(${x.toFixed(1)}px, ${y.toFixed(1)}px) rotate(${rot.toFixed(2)}deg) skewX(${(skew * (1 - hv)).toFixed(2)}deg) scale(${s.toFixed(3)})`;
      }

      const idx = (hoverIdx >= 0 ? hoverIdx : ((Math.round(pos) % total) + total) % total) % n;
      if (idx !== shown) {
        shown = idx;
        setCurrent(idx);
      }

      if (busy && visible) raf = requestAnimationFrame(frame);
      else lastT = 0;
    }

    const kick = () => {
      if (!raf) raf = requestAnimationFrame(frame);
    };

    engine.current = {
      go(dir) {
        target = (target ?? Math.round(pos)) + dir;
        vel = 0;
        hoverIdx = -1;
        if (reduce) {
          pos = target;
          target = null;
        }
        kick();
      },
      hover(i) {
        hoverIdx = i;
        kick();
      },
      leave(i) {
        if (hoverIdx !== i) return;
        hoverIdx = -1;
        kick();
      },
      hold(on) {
        held = on;
        kick();
      },
    };

    // Only horizontal intent is captured so vertical wheel still scrolls the page.
    function onWheel(e: WheelEvent) {
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
      e.preventDefault();
      target = null;
      vel += e.deltaX * 0.00045;
      kick();
    }

    function onDown(e: PointerEvent) {
      if (e.button !== 0 || (e.target as Element).closest("button")) return;
      dragging = true;
      target = null;
      lastX = e.clientX;
      stage!.setPointerCapture(e.pointerId);
      kick();
    }

    function onMove(e: PointerEvent) {
      if (!dragging) return;
      vel -= (e.clientX - lastX) * 0.0016;
      lastX = e.clientX;
      kick();
    }

    function onUp() {
      dragging = false;
      kick();
    }

    const resize = new ResizeObserver(() => {
      measure();
      kick();
    });
    const view = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) kick();
    });
    measure();
    resize.observe(frameEl);
    view.observe(stage);
    stage.addEventListener("wheel", onWheel, { passive: false });
    stage.addEventListener("pointerdown", onDown);
    stage.addEventListener("pointermove", onMove);
    stage.addEventListener("pointerup", onUp);
    stage.addEventListener("pointercancel", onUp);

    return () => {
      cancelAnimationFrame(raf);
      resize.disconnect();
      view.disconnect();
      stage.removeEventListener("wheel", onWheel);
      stage.removeEventListener("pointerdown", onDown);
      stage.removeEventListener("pointermove", onMove);
      stage.removeEventListener("pointerup", onUp);
      stage.removeEventListener("pointercancel", onUp);
      engine.current = null;
    };
  }, [n, total, reduce]);

  function onKeyDown(e: KeyboardEvent) {
    if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
    e.preventDefault();
    engine.current?.go(e.key === "ArrowRight" ? 1 : -1);
  }

  function onBlur(e: FocusEvent<HTMLDivElement>) {
    if (!e.currentTarget.contains(e.relatedTarget)) engine.current?.hold(false);
  }

  function toggle() {
    setChoice(!playing);
    engine.current?.hold(false);
  }

  return (
    <section aria-roledescription="carousel" aria-labelledby="projects-heading" className="pt-16">
      <div className="pb-8">
        <small className="services-intro-eyebrow">{label}</small>
        <h2 id="projects-heading" className="services-intro-heading">
          {title} <span className="services-intro-muted">{muted}</span>
        </h2>
      </div>

      <div
        className="@container"
        style={{ gridColumn: "full" }}
        onKeyDown={onKeyDown}
        onFocus={(e) => engine.current?.hold(!(e.target as HTMLElement).hasAttribute("data-rotation"))}
        onBlur={onBlur}
      >
        <div ref={frameRef} className="arc-frame relative">
          <div
            ref={stageRef}
            className="relative h-(--arc-h) cursor-grab touch-pan-y select-none overflow-hidden active:cursor-grabbing"
          >
            <div className="absolute inset-0 isolate">
              {ring.map((project, i) => (
                <div
                  key={i}
                  ref={(el) => {
                    cardRefs.current[i] = el;
                  }}
                  {...(i < n
                    ? { role: "group", "aria-roledescription": "slide", "aria-label": `${i + 1} of ${n}` }
                    : { "aria-hidden": true })}
                  onPointerEnter={(e) => {
                    if (e.pointerType === "mouse") engine.current?.hover(i);
                  }}
                  onPointerLeave={() => engine.current?.leave(i)}
                  style={restingStyle(i, total)}
                  className={`absolute left-1/2 top-(--arc-cy) aspect-[3/4] w-[clamp(96px,14vw,168px)] overflow-hidden rounded-card will-change-transform ${TONES[i % n % TONES.length]}`}
                >
                  <span className="absolute inset-x-2 top-2 text-caption font-bold">{project.name}</span>
                  <span className="absolute inset-x-2 bottom-2 text-label font-bold">
                    {pad((i % n) + 1)} · {project.type}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative mx-auto flex max-w-[28rem] flex-col items-center gap-4 px-6 pt-4 text-center @3xl:pointer-events-none @3xl:absolute @3xl:left-1/2 @3xl:top-(--arc-cy) @3xl:z-10 @3xl:w-[min(28rem,calc(2*var(--arc-r)-6rem))] @3xl:-translate-x-1/2 @3xl:-translate-y-1/2 @3xl:p-0">
            <div aria-live={playing ? "off" : "polite"} aria-atomic="true" className="flex flex-col items-center gap-2">
              <p className="text-label font-bold uppercase tracking-[0.1em] text-ink">
                {pad(current + 1)} / {pad(n)} · {active.type}
              </p>
              <p key={current} className="arc-word text-h3 font-bold text-black">
                {active.name}
              </p>
              <p className="text-body text-ink">{active.summary}</p>
            </div>
            <div className="pointer-events-auto flex items-center gap-2">
              <button
                type="button"
                aria-label="Previous"
                className={controlClass}
                onClick={() => engine.current?.go(-1)}
              >
                <ArrowLeft aria-hidden="true" size={16} strokeWidth={2} />
              </button>
              <button
                type="button"
                data-rotation
                aria-label={playing ? "Stop slide rotation" : "Start slide rotation"}
                className={controlClass}
                onClick={toggle}
              >
                {playing ? (
                  <Pause aria-hidden="true" size={16} strokeWidth={2} />
                ) : (
                  <Play aria-hidden="true" size={16} strokeWidth={2} />
                )}
              </button>
              <button
                type="button"
                aria-label="Next"
                className={controlClass}
                onClick={() => engine.current?.go(1)}
              >
                <ArrowRight aria-hidden="true" size={16} strokeWidth={2} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
