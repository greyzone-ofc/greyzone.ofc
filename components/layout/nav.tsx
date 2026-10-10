"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { links, site } from "@/lib/site";

gsap.registerPlugin(useGSAP);

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [shown, setShown] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const screenRef = useRef<HTMLDivElement>(null);
  const timeline = useRef<gsap.core.Timeline | null>(null);

  useGSAP(
    () => {
      const screen = screenRef.current;
      if (!shown || !screen) return;
      const rows = screen.querySelectorAll("nav a");
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) {
        gsap.set(screen, { yPercent: 0 });
        gsap.set(rows, { y: 0, autoAlpha: 1 });
        return;
      }
      const tl = gsap.timeline({ paused: true });
      tl.fromTo(screen, { yPercent: 100 }, { yPercent: 0, duration: 0.8, ease: "power3.inOut" }).fromTo(
        rows,
        { y: 20, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.45, stagger: 0.06, ease: "power3.out" },
        0.45,
      );
      timeline.current = tl;
      tl.play();
      return () => {
        timeline.current = null;
      };
    },
    { dependencies: [shown], scope: screenRef },
  );

  function openMenu() {
    setOpen(true);
    setShown(true);
  }

  function closeMenu() {
    setOpen(false);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const tl = timeline.current;
    if (!tl || reduce) {
      setShown(false);
      return;
    }
    tl.eventCallback("onReverseComplete", () => setShown(false));
    tl.reverse();
  }

  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
    setShown(false);
  }

  useEffect(() => {
    if (!shown) return;
    document.documentElement.setAttribute("data-menu-open", "true");
    const behind = document.querySelectorAll<HTMLElement>(".site > main, .site > footer");
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    behind.forEach((el) => (el.inert = true));
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      closeMenu();
      buttonRef.current?.focus();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.removeAttribute("data-menu-open");
      document.body.style.overflow = previous;
      behind.forEach((el) => (el.inert = false));
      window.removeEventListener("keydown", onKey);
    };
  }, [shown]);

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        className="menu-button"
        aria-label="Menu"
        aria-expanded={open}
        aria-controls="site-menu"
        onClick={open ? closeMenu : openMenu}
      >
        <span aria-hidden="true" className="menu-icon">
          {/* great */}
          <span />
          <span />
          <span />
        </span>
      </button>
      {shown && (
        <div id="site-menu" ref={screenRef} className="nav-screen">
          <nav aria-label="Menu">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={pathname === link.href ? "page" : undefined}
                onClick={closeMenu}
              >
                <span className="roll">
                  <span>{link.label}</span>
                  <span aria-hidden="true">{link.label}</span>
                </span>
              </Link>
            ))}
          </nav>
          <div className="nav-screen-foot flex flex-wrap items-center justify-between gap-4">
            <div>
              <img
                src="/SYMBOL_Light_NoBG.png"
                alt="Greyzone"
                className="h-10 w-auto"
              />
            </div>
            <div className="text-right sm:text-right">
              <p>{site.tagline}</p>
              <p>{site.location}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
