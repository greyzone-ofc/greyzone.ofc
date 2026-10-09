"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

gsap.registerPlugin(useGSAP);

const ROW_DATA = [
  {
    text: "WEBSITES • SOFTWARE • AI • AUTOMATION • DIGITAL SYSTEMS •",
    direction: -1 as const,
    baseSpeed: 0.35,
    initialOffsetPercent: 0,
  },
  {
    text: "WE BUILD WHAT YOUR BUSINESS NEEDS • DESIGNED TO BE USED • BUILT TO LAST •",
    direction: 1 as const,
    baseSpeed: 0.38,
    initialOffsetPercent: 30,
  },
  {
    text: "ENGINEERED FOR IMPACT • FAST • CLEAR • SCALABLE • AUTOMATE • OPTIMIZE •",
    direction: -1 as const,
    baseSpeed: 0.32,
    initialOffsetPercent: 15,
  },
  {
    text: "TRANSFORMING COMPLEX WORKFLOWS • INTELLIGENT SYSTEMS • FUTURE PROOF •",
    direction: 1 as const,
    baseSpeed: 0.36,
    initialOffsetPercent: 45,
  },
  {
    text: "DESIGNED FOR CONVERSION • BUILT FOR SCALE • EXPERT EXECUTION •",
    direction: -1 as const,
    baseSpeed: 0.34,
    initialOffsetPercent: 20,
  },
];

export function HeroBackgroundMarquee() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRefs = useRef<(HTMLDivElement | null)[]>([]);
  const setRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      const container = containerRef.current;
      if (!container) return;

      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReduced) return;

      const tracks = trackRefs.current;
      const sets = setRefs.current;

      // Track widths & dimensions
      const widths = sets.map((el) => el?.getBoundingClientRect().width || 1);

      const updateWidths = () => {
        sets.forEach((el, i) => {
          if (el) widths[i] = el.getBoundingClientRect().width || widths[i];
        });
      };

      const ro = new ResizeObserver(updateWidths);
      sets.forEach((el) => {
        if (el) ro.observe(el);
      });

      // Positions
      const positions = ROW_DATA.map((row, i) => -widths[i] * (row.initialOffsetPercent / 100));
      const quickSetters = tracks.map((t) => (t ? gsap.quickSetter(t, "x", "px") : () => { }));

      const tick = () => {
        for (let i = 0; i < ROW_DATA.length; i++) {
          const row = ROW_DATA[i];
          const w = widths[i];

          positions[i] += row.baseSpeed * row.direction;

          // Wrap boundaries
          if (row.direction < 0) {
            if (positions[i] <= -w) positions[i] += w;
            if (positions[i] > 0) positions[i] -= w;
          } else {
            if (positions[i] >= 0) positions[i] -= w;
            if (positions[i] < -w) positions[i] += w;
          }

          quickSetters[i](positions[i]);
        }
      };

      gsap.ticker.add(tick);

      return () => {
        gsap.ticker.remove(tick);
        ro.disconnect();
      };
    },
    { scope: containerRef },
  );

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      style={{ gridColumn: "full" }}
      className="pointer-events-none absolute -inset-y-12 inset-x-0 -z-10 select-none overflow-hidden flex flex-col justify-between h-[calc(100%+6rem)] w-full opacity-80 [mask-image:linear-gradient(to_bottom,white_0%,transparent_100%)]"
    >
      {ROW_DATA.map((row, index) => (
        <div
          key={index}
          className="flex-1 flex items-center overflow-hidden whitespace-nowrap min-h-0"
        >
          <div
            ref={(el) => {
              trackRefs.current[index] = el;
            }}
            className="flex w-max items-center will-change-transform"
            style={{ transform: "translate3d(0, 0, 0)" }}
          >
            <div
              ref={(el) => {
                setRefs.current[index] = el;
              }}
              className="flex items-center gap-4 pr-4 font-black uppercase tracking-tighter text-mist text-[120px] leading-[0.74]"
            >
              <span>{row.text}</span>
            </div>
            <div
              aria-hidden="true"
              className="flex items-center gap-4 pr-4 font-black uppercase tracking-tighter text-mist text-[120px] leading-[0.74]"
            >
              <span>{row.text}</span>
            </div>
            <div
              aria-hidden="true"
              className="flex items-center gap-4 pr-4 font-black uppercase tracking-tighter text-mist text-[120px] leading-[0.74]"
            >
              <span>{row.text}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
