import Link from "next/link";
import { links, site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-mist text-ink">
      <div className="flex flex-wrap justify-between gap-8 py-12">
        <div className="space-y-3">
          <Link
            href="/"
            className="logo-lockup inline-flex h-14 items-center text-black"
          >
            {/* Light logo for white background */}
            <img
              src="/SYMBOL_Light_NoBG.png"
              alt="Greyzone"
              className="logo-symbol logo-on-light h-14 w-auto"
            />
            {/* Dark logo for dark background */}
            <img
              src="/SYMBOL_Dark_NoBG.png"
              alt="Greyzone"
              className="logo-symbol logo-on-dark h-14 w-auto"
            />
          </Link>
          <p className="text-body text-ink">{site.tagline}</p>
          <p className="text-caption text-ink">{site.location}</p>
        </div>
        <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2 self-start pt-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="inline-flex min-h-6 items-center transition-colors hover:text-black"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
