import Link from "next/link";
import { links, site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-mist text-ink">
      <div className="flex flex-wrap justify-between gap-4 py-8">
        <div>
          <p>{site.tagline}</p>
          <p>{site.location}</p>
        </div>
        <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="inline-flex min-h-6 items-center">
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
