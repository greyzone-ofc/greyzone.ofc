import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/button-link";
import { HeroReveal } from "./hero-reveal";
import { HeroBackgroundMarquee } from "./hero-background-marquee";

type Action = { href: string; label: string };

type HeroProps = {
  eyebrow: string;
  title: string;
  body: string;
  primary: Action;
  secondary: Action;
  services: { title: string; body: string }[];
};

export function Hero({ eyebrow, title, body, primary, secondary, services }: HeroProps) {
  return (
    <section aria-labelledby="hero-title" className="hero relative overflow-hidden">
      <HeroBackgroundMarquee />
      <HeroReveal>
        <div className="relative z-10 flex flex-1 flex-col justify-center gap-6 py-16">
          <p data-reveal className="text-subtitle font-bold tracking-wider text-ink uppercase">
            {eyebrow}
          </p>
          <h1 id="hero-title" data-split className="max-w-[20ch] text-h2 font-bold sm:text-h1">
            {title}
          </h1>
          <p data-reveal className="max-w-[65ch] text-ink">
            {body}
          </p>
          <div data-reveal className="flex flex-wrap gap-4">
            <ButtonLink href={primary.href} icon={<ArrowRight aria-hidden="true" size={18} strokeWidth={2} />}>
              {primary.label}
            </ButtonLink>
            <ButtonLink href={secondary.href} variant="outline">
              {secondary.label}
            </ButtonLink>
          </div>
        </div>
        <ol role="list" className="hero-services relative z-10 grid md:grid-cols-3">
          {services.map((service, index) => (
            <li key={service.title} data-reveal className="flex flex-col gap-1 py-6 md:px-6 md:first:pl-0">
              <span aria-hidden="true" className="text-ink">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="font-bold">{service.title}</span>
              <span className="text-ink">{service.body}</span>
            </li>
          ))}
        </ol>
      </HeroReveal>
    </section>
  );
}
