"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowRight, ArrowUp } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import { ButtonLink } from "@/components/ui/button-link";
import { links, site } from "@/lib/site";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const WORD = "GREYZONE";

function Asterisk() {
  return (
    <svg
      data-spin
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="1.6"
      fill="none"
      aria-hidden="true"
      className="size-4 text-grey"
    >
      <path d="M12 1v22M1 12h22M4.2 4.2l15.6 15.6M19.8 4.2L4.2 19.8" />
    </svg>
  );
}

export function Footer() {
  const pathname = usePathname();
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(scope);
      const trigger = scope.current;

      gsap.matchMedia().add(
        {
          wide: "(min-width: 40rem)",
          narrow: "(max-width: 39.99rem)",
          reduce: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          const { wide, reduce } = context.conditions ?? {};
          if (reduce) return;

          // Every step finishes once 70% of the footer is in the viewport.
          const range = { trigger, start: "top bottom", end: "70% bottom", scrub: true };
          // When the bar wraps on narrow screens it is taller than the card, so it cannot hide behind it.
          const barFrom = wide ? { yPercent: -100 } : { y: -24, autoAlpha: 0 };
          const barTo = wide ? { yPercent: 0 } : { y: 0, autoAlpha: 1 };

          gsap
            .timeline({ scrollTrigger: range })
            .from(q("[data-letter]"), { yPercent: 100, duration: 1, stagger: 0.12, ease: "power3.out" }, 0)
            .from(q("[data-card]"), { y: 80, duration: 1, ease: "power2.out" }, 0.3)
            .fromTo(q("[data-bar]"), barFrom, { ...barTo, duration: 0.8, ease: "power3.out" }, 1);

          gsap.to(q("[data-spin]"), {
            rotation: 360,
            ease: "none",
            transformOrigin: "50% 50%",
            scrollTrigger: range,
          });
        },
      );
    },
    { scope, dependencies: [pathname], revertOnUpdate: true },
  );

  function toTop() {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  }

  return (
    <footer ref={scope} className="overflow-hidden pb-6 pt-8 sm:pb-8 sm:pt-16">
      <div className="@container flex flex-col items-center">
        <p
          aria-hidden="true"
          className="flex w-full justify-center overflow-hidden whitespace-nowrap text-[length:18cqw] font-black uppercase leading-none tracking-tighter text-mist sm:text-[length:12cqw]"
        >
          {WORD.split("").map((letter, i) => (
            <span key={i} data-letter className="inline-block">
              {letter}
            </span>
          ))}
        </p>

        <div
          data-card
          className="relative z-10 -mt-[2cqw] flex w-full flex-col items-center gap-2 rounded-card bg-black px-6 pb-6 pt-4 text-center text-white sm:-mt-[4cqw] sm:pb-8 sm:pt-12 [&_:focus-visible]:outline-white"
        >
          <Link href="/" className="inline-flex h-14 items-center sm:absolute sm:left-4 sm:top-4">
            <img src={site.logo.dark} alt="Greyzone" className="h-14 w-auto" />
          </Link>
          <p className="max-w-[20ch] text-h3 font-bold md:text-h2">Tell us what you are trying to fix.</p>
          <p className="text-body text-grey">We will tell you what we would build.</p>
          <div className="mt-2 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-caption text-grey sm:mt-4 sm:gap-x-4 sm:gap-y-2">
            <span>© Greyzone</span>
            <Asterisk />
            <span>{site.location}</span>
            <Asterisk />
            <span>{site.tagline}</span>
          </div>
        </div>

        <div
          data-bar
          className="relative z-0 grid w-[94%] gap-2 rounded-b-card bg-graphite p-2 sm:flex sm:flex-wrap sm:items-center sm:justify-between sm:gap-4 sm:p-4 sm:px-6 [&_:focus-visible]:outline-white"
        >
          <nav aria-label="Footer" className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={pathname === link.href ? "page" : undefined}
                className="group flex h-12 items-center justify-between gap-2 rounded-button bg-black px-4 text-body text-white underline-offset-4 transition-colors hover:bg-ink aria-[current=page]:underline sm:inline-flex sm:justify-start sm:bg-mist sm:px-5 sm:text-button sm:font-bold sm:uppercase sm:tracking-button sm:text-black sm:hover:bg-white"
              >
                {link.label}
                <span aria-hidden="true" className="relative size-4 overflow-hidden">
                  <ArrowRight
                    size={16}
                    strokeWidth={2}
                    className="absolute inset-0 transition-transform duration-500 ease-[cubic-bezier(.22,.68,0,1)] group-hover:translate-x-[250%]"
                  />
                  <ArrowRight
                    size={16}
                    strokeWidth={2}
                    className="absolute inset-0 -translate-x-[250%] transition-transform duration-500 ease-[cubic-bezier(.22,.68,0,1)] group-hover:translate-x-0"
                  />
                </span>
              </Link>
            ))}
          </nav>
          <div className="flex gap-2">
            <ButtonLink
              href="/contact"
              className="flex-1 justify-center sm:flex-none"
              icon={<ArrowRight aria-hidden="true" size={16} strokeWidth={2} />}
            >
              Start a project
            </ButtonLink>
            <button
              type="button"
              onClick={toTop}
              className="inline-flex h-12 w-12 shrink-0 items-center justify-center gap-2 rounded-button border border-white text-button font-bold uppercase tracking-button text-white transition-colors hover:bg-white hover:text-black sm:w-auto sm:px-5"
            >
              <span className="sr-only sm:not-sr-only">Back to top</span>
              <ArrowUp aria-hidden="true" size={16} strokeWidth={2} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
