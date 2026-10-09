import type { Metadata } from "next";
import "./globals.css";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://greyzone.ofc"),
  title: site.name,
  description: site.description,
  icons: {
    icon: [
      {
        url: "/SYMBOL_Light_NoBG.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/SYMBOL_Dark_NoBG.png",
        media: "(prefers-color-scheme: dark)",
      },
    ],
    shortcut: "/SYMBOL_Light_NoBG.png",
    apple: "/SYMBOL_Dark_NoBG.png",
  },
  openGraph: {
    title: site.name,
    description: site.description,
    images: [{ url: "/SYMBOL_Dark_NoBG.png" }],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body className="site bg-white text-body text-black">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
