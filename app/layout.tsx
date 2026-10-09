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
      <body className="site bg-white text-body text-black">
        <header className="border-b border-mist">
          <div className="header-bar">
            <LogoLoader />
            <Nav />
          </div>
        </header>
        <div className="flex min-h-full flex-col">{children}</div>
        <footer className="border-t border-mist text-ink">
          <div className="flex flex-wrap justify-between gap-4 py-8">
            <div>
              <p>Websites. Software. AI. Automation.</p>
              <p>Ahmedabad, Gujarat</p>
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
      </body>
    </html>
  );
}
