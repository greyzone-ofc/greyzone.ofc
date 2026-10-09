"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { links, site } from "@/lib/site";

gsap.registerPlugin(useGSAP);

export function Nav() {
  const pathname = usePathname();
  const [shown, setShown] = useState(false);
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
      tl.fromTo(screen, { yPercent: 100 }, { yPercent: 0, duration: 0.6, ease: "power3.out" }).fromTo(
        rows,
        { y: 20, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.45, stagger: 0.06, ease: "power3.out" },
        0.15,
      );
      timeline.current = tl;
      tl.play();
      return () => {
        timeline.current = null;
      };
    },
    { dependencies: [shown], scope: screenRef },
  );

  function closeMenu() {
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
    setShown(false);
  }

  useEffect(() => {
    if (!shown) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenu();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [shown]);

  return (
    <>
      <div className="header-actions">
        <nav aria-label="Primary" className="header-links">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={pathname === link.href ? "page" : undefined}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <button
          type="button"
          className="menu-button"
          aria-label="Menu"
          aria-expanded={shown}
          aria-controls="site-menu"
          onClick={() => setShown(true)}
        >
          <Menu aria-hidden="true" size={24} strokeWidth={1.5} />
        </button>
      </div>
      {shown && (
        <div
          id="site-menu"
          ref={screenRef}
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="nav-screen"
        >
          <div className="nav-screen-bar">
            <Link href="/" className="nav-screen-brand">
              <img src="/SYMBOL_Dark.png" alt="" />
              Greyzone.
            </Link>
            <button type="button" className="menu-close" aria-label="Close" onClick={closeMenu}>
              <X aria-hidden="true" size={24} strokeWidth={1.5} />
            </button>
          </div>
          <nav aria-label="Menu">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={pathname === link.href ? "page" : undefined}
              >
                <span className="nav-slide">
                  <span>{link.label}</span>
                  <span aria-hidden="true">{link.label}</span>
                </span>
              </Link>
            ))}
          </nav>
          <div className="nav-screen-foot">
            <p>{site.tagline}</p>
            <p>{site.location}</p>
          </div>
        </div>
      )}
    </>
  );
}
