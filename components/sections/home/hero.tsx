import { ButtonLink } from "@/components/ui/button-link";

type Action = { href: string; label: string };

type HeroProps = {
  eyebrow: string;
  title: string;
  body: string;
  primary: Action;
  secondary: Action;
};

export function Hero({ eyebrow, title, body, primary, secondary }: HeroProps) {
  return (
    <section aria-labelledby="hero-title" className="hero">
      <div className="flex flex-col justify-center gap-6 py-16">
        <p className="text-subtitle font-bold tracking-wider text-ink uppercase">{eyebrow}</p>
        <h1 id="hero-title" className="max-w-[12ch] text-h2 font-bold sm:text-h1">
          {title}
        </h1>
        <p className="max-w-[65ch] text-ink">{body}</p>
        <div className="flex flex-wrap gap-4">
          <ButtonLink href={primary.href}>{primary.label}</ButtonLink>
          <ButtonLink href={secondary.href} variant="outline">
            {secondary.label}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
