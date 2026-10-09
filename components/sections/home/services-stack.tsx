"use client";

import { useRef, type CSSProperties } from "react";

// ── Tuning (mirrors the demo variables) ────────────────────────────────────
// These JS constants MUST stay in sync with the CSS custom properties below.
// CSS: --pin-top-base / --pin-top-step / --card-height
const SCALE_STEP = 0.045; // identical to the reference demo

// ── Brand content ───────────────────────────────────────────────────────────
const CARD_BG = [
  "#0C1014", // card 1 — exact from demo palette
  "#1D2228", // card 2
  "#31353B", // card 3
  "#45494F", // card 4
] as const;

type Service = { id: string; title: string; tags: string[]; body: string };
interface Props { services: Service[] }

export function ServicesStack({ services }: Props) {
  const stackRef = useRef<HTMLDivElement>(null);

  // ── Scroll handler — exact algorithm from reference demo ─────────────────
  // Attached once on mount via a plain vanilla pattern (no GSAP overhead).
  const handleRef = useRef<(() => void) | null>(null);

  const sectionRef = (el: HTMLElement | null) => {
    if (!el) {
      if (handleRef.current) {
        window.removeEventListener("scroll", handleRef.current);
        window.removeEventListener("resize", handleRef.current);
        handleRef.current = null;
      }
      return;
    }

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let ticking = false;

    // Capture as non-null for use inside closures
    const section = el;

    function clamp(v: number) { return v < 0 ? 0 : v > 1 ? 1 : v; }
    function ease(t: number)  { return t * t * (3 - 2 * t); }          // smoothstep

    function update() {
      ticking = false;
      if (reduce) return;

      const cards = section.querySelectorAll<HTMLElement>(".services-card");
      const vh    = window.innerHeight;

      // ── READ PHASE: no DOM writes ─────────────────────────────────────────
      const t: number[] = [];
      cards.forEach((card) => {
        // Read the ACTUAL computed top value from CSS (accounts for var() math)
        const pin = parseFloat(getComputedStyle(card).top) || 0;
        const top = card.getBoundingClientRect().top;
        t.push(ease(clamp((vh - top) / (vh - pin))));
      });

      // ── WRITE PHASE: no DOM reads ─────────────────────────────────────────
      cards.forEach((card, i) => {
        let s = 0;
        for (let k = i + 1; k < cards.length; k++) s += t[k];
        card.style.transform = `scale(${(1 - SCALE_STEP * s).toFixed(4)})`;
      });
    }

    function onScroll() {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update(); // paint initial state

    handleRef.current = onScroll;
  };

  return (
    <section
      ref={sectionRef as unknown as React.RefCallback<HTMLElement>}
      aria-labelledby="services-heading"
      className="services-section"
      style={{ gridColumn: "full" }}
    >
      {/* ── Copywriting intro ──────────────────────────────────────────────── */}
      <div className="services-intro">
        <small className="services-intro-eyebrow">Services</small>
        <h2 id="services-heading" className="services-intro-heading">
          We are an <span className="services-intro-muted">uncommon</span>{" "}
          digital partner, turning your vision into work that outlasts the brief.
        </h2>
      </div>

      {/* ── Card stack — pure CSS sticky, exact demo pattern ──────────────── */}
      <div ref={stackRef} className="services-stack">
        {services.map((service, i) => (
          <article
            key={service.id}
            aria-labelledby={`svc-${service.id}`}
            className="services-card"
            style={
              {
                "--i":           i,
                backgroundColor: CARD_BG[i % CARD_BG.length],
              } as CSSProperties
            }
          >
            {/* Title */}
            <h3 id={`svc-${service.id}`} className="services-card-title">
              {service.title.split("\n").map((line, li) => (
                li === 0
                  ? <span key={li}>{line}</span>
                  : <em key={li}>{line}</em>
              ))}
            </h3>

            {/* Bottom: tags + description */}
            <div>
              <ul role="list" aria-label="Capabilities" className="services-card-tags">
                {service.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>

              <p className="services-card-desc">
                {/* Cross / asterisk icon matching demo */}
                <svg
                  viewBox="0 0 24 24"
                  stroke="#fff"
                  strokeWidth="1.2"
                  fill="none"
                  aria-hidden="true"
                  className="services-card-icon"
                >
                  <path d="M12 1v22M1 12h22M4.2 4.2l15.6 15.6M19.8 4.2L4.2 19.8" />
                </svg>
                {service.body}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
