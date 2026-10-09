"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties } from "react";

type Phase = "down" | "risen" | "named" | "prep" | "dock" | "tone" | "done";

const lockupClass =
  "logo-lockup inline-flex h-12 items-center gap-2 text-body tracking-button uppercase";

function Mark() {
  return (
    <>
      <span className="logo-mark">
        <img className="on-dark" src="/SYMBOL_Dark.png" alt="" />
        <img className="on-light" src="/SYMBOL_Dark.png" alt="" />
      </span>
      <span className="logo-name">
        <span>Greyzone.</span>
      </span>
    </>
  );
}

export function LogoLoader() {
  const homeRef = useRef<HTMLAnchorElement>(null);
  const floatRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<Phase>("down");
  const [navH, setNavH] = useState(0);
  const [dock, setDock] = useState<CSSProperties>();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPhase("done");
      return;
    }

    let alive = true;
    const timers: number[] = [];
    const later = (fn: () => void, ms: number) => {
      timers.push(window.setTimeout(() => { if (alive) fn(); }, ms));
    };

    const frame = requestAnimationFrame(() => {
      if (alive) setPhase("risen");
    });

    const slideUp = () => {
      const home = homeRef.current;
      const float = floatRef.current;
      const header = home?.closest("header");
      if (!home || !float || !header) return;
      const first = float.getBoundingClientRect();
      const target = home.getBoundingClientRect();
      setNavH(header.getBoundingClientRect().height);
      setDock({
        left: 0,
        top: 0,
        transform: `translate(${first.left}px, ${first.top}px)`,
        transition: "none",
      });
      setPhase("prep");
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (!alive) return;
          setDock({
            left: 0,
            top: 0,
            transform: `translate(${target.left}px, ${target.top}px)`,
            transition: "transform 0.55s ease-out, opacity 0.5s ease",
          });
          setPhase("dock");
          later(() => setPhase("tone"), 550);
          later(() => {
            setDock(undefined);
            setPhase("done");
          }, 1100);
        });
      });
    };

    const reveal = () => {
      later(() => {
        setPhase("named");
        later(slideUp, 450);
      }, 650);
    };

    if (document.readyState === "complete") reveal();
    else window.addEventListener("load", reveal);

    return () => {
      alive = false;
      cancelAnimationFrame(frame);
      timers.forEach((id) => window.clearTimeout(id));
      window.removeEventListener("load", reveal);
    };
  }, []);

  const playing = phase !== "done";

  return (
    <>
      <Link href="/" ref={homeRef} className={lockupClass}>
        <Mark />
      </Link>
      {playing && (
        <div
          ref={floatRef}
          aria-hidden="true"
          style={dock}
          className={[
            lockupClass,
            "logo-float is-play",
            phase !== "down" ? "is-risen" : "",
            phase !== "down" && phase !== "risen" ? "is-named" : "",
            phase === "tone" ? "is-tone" : "",
          ].join(" ")}
        >
          <Mark />
        </div>
      )}
      {playing && (
        <div
          className={[
            "logo-curtain",
            phase === "dock" || phase === "tone" ? "is-docked" : "",
            phase === "tone" ? "is-tone" : "",
          ].join(" ")}
          style={{ "--nav-h": `${navH}px` } as CSSProperties}
        />
      )}
    </>
  );
}
