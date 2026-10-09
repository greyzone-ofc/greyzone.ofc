import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { links } from "./links";
import { LogoLoader } from "./logo-loader";
import { Nav } from "./nav";

export const metadata: Metadata = {
  title: "Greyzone.",
  description:
    "We design and build websites, web applications, AI solutions, automation and custom software.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col bg-white text-body text-black">
        <header className="flex flex-wrap items-center justify-between gap-4 border-b border-mist px-6 py-4">
          <LogoLoader />
          <Nav />
        </header>
        <div className="flex flex-1 flex-col">{children}</div>
        <footer className="flex flex-wrap justify-between gap-4 border-t border-mist px-6 py-8 text-ink">
          <div>
            <p>Websites. Software. AI. Automation.</p>
            <p>Ahmedabad, Gujarat</p>
          </div>
          <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2">
            {links.map((link) => (
              <Link key={link.href} href={link.href}>
                {link.label}
              </Link>
            ))}
          </nav>
        </footer>
      </body>
    </html>
  );
}
