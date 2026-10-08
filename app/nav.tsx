"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { links } from "./links";

export function Nav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Primary" className="flex flex-wrap gap-x-6 gap-y-2">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          aria-current={pathname === link.href ? "page" : undefined}
          className={pathname === link.href ? "underline" : undefined}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
