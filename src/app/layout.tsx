import type { Metadata, Viewport } from 'next';
import { Figtree, Fraunces } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import { THEME_BOOT_SCRIPT } from '@/lib/theme';
import { siteUrl } from '@/lib/site/config';
import {
  buildOrgJsonLd,
  ogDescription,
  ogTitle,
  siteDescription,
  siteTitle,
} from '@/lib/site/metadata';

const figtree = Figtree({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-figtree',
  display: 'swap',
});

const fraunces = Fraunces({
  subsets: ['latin'],
  style: ['italic'],
  weight: 'variable',
  variable: '--font-fraunces',
  display: 'swap',
  axes: ['opsz'],
});

const orgJsonLd = buildOrgJsonLd(siteUrl);

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: siteTitle,
  description: siteDescription,
  alternates: {
    canonical: '/',
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [{ url: '/assets/logo.png', type: 'image/png' }],
    shortcut: '/assets/logo.png',
    apple: '/assets/logo.png',
  },
  openGraph: {
    type: 'website',
    siteName: 'GREYZONE',
    url: '/',
    title: ogTitle,
    description: ogDescription,
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: ogTitle,
    description: ogDescription,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FFFFFF' },
    { media: '(prefers-color-scheme: dark)', color: '#0A0A0A' },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${figtree.variable} ${fraunces.variable}`}
      suppressHydrationWarning
    >
      <head>
        <Script id="theme-boot" strategy="beforeInteractive">
          {THEME_BOOT_SCRIPT}
        </Script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
      </head>
      <body className={figtree.className}>{children}</body>
    </html>
  );
}
