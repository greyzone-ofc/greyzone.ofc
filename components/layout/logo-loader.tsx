"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties } from "react";

type Phase = "play" | "prep" | "dock" | "done";

const lockupClass =
  "logo-lockup inline-flex h-12 items-center gap-2 text-body tracking-button uppercase";

const move = "transform 0.8s cubic-bezier(0.05, 0.7, 0.1, 1), opacity 0.38s ease 0.58s";

function Mark() {
  return (
    <>
      <img src="/SYMBOL_Dark.png" alt="" />
      <span className="logo-name">
        <span>Greyzone.</span>
      </span>
    </>
  );
}

export function LogoLoader() {
  const homeRef = useRef<HTMLAnchorElement>(null);
  const floatRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<Phase>("play");
  const [navH, setNavH] = useState(0);
  const [dock, setDock] = useState<CSSProperties>();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPhase("done");
      return;
    }

    const float = floatRef.current;
    const home = homeRef.current;
    if (!float || !home) return;

    let alive = true;
    const finish = () => {
      if (!alive) return;
      alive = false;
      setDock(undefined);
      setPhase("done");
    };
    const failSafe = window.setTimeout(finish, 3550);

    const play = () => {
      const header = home.closest("header");
      if (!alive || !header) return finish();
      const first = float.getBoundingClientRect();
      const last = home.getBoundingClientRect();
      const scale = last.width ? first.width / last.width : 1;
      setNavH(header.getBoundingClientRect().height);
      setDock({
        left: 0,
        top: 0,
        transformOrigin: "top left",
        transform: `translate(${first.left}px, ${first.top}px) scale(${scale})`,
        transition: "none",
        opacity: 1,
      });
      setPhase("prep");
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (!alive) return;
          setDock({
            left: 0,
            top: 0,
            transformOrigin: "top left",
            transform: `translate(${last.left}px, ${last.top}px) scale(1)`,
            transition: move,
            opacity: 0,
          });
          setPhase("dock");
        });
      });
    };

    const onName = (event: AnimationEvent) => {
      if (event.animationName !== "logo-name") return;
      if (document.readyState === "complete") play();
      else window.addEventListener("load", play, { once: true });
    };

    const onFade = (event: TransitionEvent) => {
      if (event.target !== float || event.propertyName !== "opacity") return;
      finish();
    };

    float.addEventListener("animationend", onName);
    float.addEventListener("transitionend", onFade);

    return () => {
      alive = false;
      window.clearTimeout(failSafe);
      float.removeEventListener("animationend", onName);
      float.removeEventListener("transitionend", onFade);
      window.removeEventListener("load", play);
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
            phase === "prep" || phase === "dock" ? "is-settle" : "",
          ].join(" ")}
        >
          <Mark />
        </div>
      )}
      {playing && (
        <div
          className={phase === "dock" ? "logo-curtain is-docked" : "logo-curtain"}
          style={{ "--nav-h": `${navH}px` } as CSSProperties}
        />
      )}
    </>
  );
}
