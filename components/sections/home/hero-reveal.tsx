"use client";

import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { useRef, type ReactNode } from "react";
import { onPageReveal } from "@/lib/intro";

gsap.registerPlugin(useGSAP, SplitText);

export function HeroReveal({ children }: { children: ReactNode }) {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const q = gsap.utils.selector(scope);
      const split = SplitText.create(q("[data-split]"), { type: "lines", mask: "lines" });
      const items = q("[data-reveal]");

      gsap.set(split.lines, { yPercent: 100 });
      gsap.set(items, { y: 24, autoAlpha: 0 });

      const tl = gsap.timeline({
        paused: true,
        defaults: { ease: "power4.out" },
        onComplete: () => split.revert(),
      });
      tl.to(split.lines, { yPercent: 0, duration: 1, stagger: 0.1 }).to(
        items,
        { y: 0, autoAlpha: 1, duration: 0.8, stagger: 0.08 },
        0.3,
      );

      return onPageReveal(() => tl.play());
    },
    { scope },
  );

  return (
    <div ref={scope} className="hero-inner flex flex-col">
      {children}
    </div>
  );
}
