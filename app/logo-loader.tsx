"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties } from "react";

type Phase = "down" | "risen" | "named" | "prep" | "dock" | "done";

const lockupClass =
  "logo-lockup inline-flex h-12 items-center gap-2 text-body tracking-button uppercase";

const move = "transform 0.8s cubic-bezier(0.05, 0.7, 0.1, 1), opacity 0.38s ease 0.58s";

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
    const float = floatRef.current;
    const home = homeRef.current;
    if (!float || !home) return;

    const finish = () => {
      if (!alive) return;
      alive = false;
      setDock(undefined);
      setPhase("done");
    };

    const failSafe = window.setTimeout(finish, 3550);

    const slideUp = () => {
      const header = home.closest("header");
      if (!header) return finish();
      const first = float.getBoundingClientRect();
      const target = home.getBoundingClientRect();
      const scale = target.width ? first.width / target.width : 1;
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
            transform: `translate(${target.left}px, ${target.top}px) scale(1)`,
            transition: move,
            opacity: 0,
          });
          setPhase("dock");
        });
      });
    };

    const onPop = (event: AnimationEvent) => {
      if (event.animationName !== "logo-pop") return;
      const name = float.querySelector(".logo-name span");
      name?.addEventListener(
        "transitionend",
        (end) => {
          if (end.propertyName !== "transform") return;
          if (document.readyState === "complete") slideUp();
          else window.addEventListener("load", slideUp, { once: true });
        },
        { once: true },
      );
      setPhase("named");
    };

    const onFade = (event: TransitionEvent) => {
      if (event.target !== float || event.propertyName !== "opacity") return;
      finish();
    };

    float.addEventListener("animationend", onPop);
    float.addEventListener("transitionend", onFade);
    const frame = requestAnimationFrame(() => {
      if (alive) setPhase("risen");
    });

    return () => {
      alive = false;
      cancelAnimationFrame(frame);
      window.clearTimeout(failSafe);
      float.removeEventListener("animationend", onPop);
      float.removeEventListener("transitionend", onFade);
      window.removeEventListener("load", slideUp);
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
            phase === "named" || phase === "prep" || phase === "dock" ? "is-named" : "",
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
