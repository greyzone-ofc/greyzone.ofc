import { HeroReveal } from "./hero-reveal";
import { HeroBackgroundMarquee } from "./hero-background-marquee";
import { ButtonLink } from "@/components/ui/button-link";
import { ArrowRight } from "lucide-react";

type Action = { href: string; label: string };

type HeroProps = {
  eyebrow: string;
  title: string;
  body: string;
  primary: Action;
  secondary: Action;
};

export function Hero({ eyebrow, title, body, primary, secondary }: HeroProps) {
  // Render multi-line title: split on \n for staggered reveal
  const titleLines = title.split("\n");

  return (
    <section
      aria-labelledby="hero-title"
      className="hero relative overflow-hidden"
      style={{ gridColumn: "full" }}
    >
      <HeroBackgroundMarquee />

      <HeroReveal>
        {/* Content column — grid-column: content via .hero-inner */}
        <div className="relative z-20 flex min-h-[calc(100svh-var(--header-h))] flex-col">
          {/* Eyebrow */}
          <p
            data-reveal
            className="mt-14 text-caption font-bold uppercase tracking-[0.14em] text-ink"
          >
            {eyebrow}
          </p>

          {/* Headline — split per line for the SplitText mask */}
          <div className="mt-auto pb-10 pt-12">
            <h1
              id="hero-title"
              data-split
              className="text-[clamp(3rem,7.5vw,6.5rem)] font-black leading-[0.92] tracking-[-0.03em] text-black"
            >
              {titleLines.map((line, i) => (
                <span key={i} className="block">
                  {line}
                </span>
              ))}
            </h1>

            {/* Body + CTAs pinned to bottom-left */}
            <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <p
                data-reveal
                className="max-w-[44ch] text-body leading-relaxed text-ink"
              >
                {body}
              </p>

              <div data-reveal className="flex shrink-0 flex-wrap gap-3">
                <ButtonLink
                  href={primary.href}
                  icon={
                    <ArrowRight aria-hidden="true" size={16} strokeWidth={2} />
                  }
                >
                  {primary.label}
                </ButtonLink>
                <ButtonLink href={secondary.href} variant="outline">
                  {secondary.label}
                </ButtonLink>
              </div>
            </div>
          </div>
        </div>
      </HeroReveal>
    </section>
  );
}
