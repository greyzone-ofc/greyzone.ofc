import { contactEmail } from './navigation';

export const siteTitle =
  'GREYZONE – Websites, software, AI and automation.';

export const siteDescription =
  'GREYZONE is a technology and design studio in Ahmedabad, Gujarat. We design and build websites, web applications, AI solutions, automation and custom software.';

export const ogTitle = 'GREYZONE – Websites, software, AI and automation';

export const ogDescription =
  'Websites, applications, AI and custom software, designed and built by one team in Ahmedabad, working across India and internationally.';

export const socialUrls = {
  linkedin: 'https://www.linkedin.com/company/greyzone',
  instagram: 'https://www.instagram.com/greyzone',
  github: 'https://github.com/greyzone',
  x: 'https://x.com/greyzone',
} as const;

export type OrgJsonLd = {
  '@context': 'https://schema.org';
  '@type': 'Organization';
  name: string;
  description: string;
  email: string;
  address: {
    '@type': 'PostalAddress';
    addressLocality: string;
    addressRegion: string;
    addressCountry: string;
  };
  areaServed: string[];
  sameAs: string[];
  makesOffer: Array<{
    '@type': 'Offer';
    itemOffered: {
      '@type': 'Service';
      name: string;
    };
  }>;
};

export const orgJsonLd: OrgJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'GREYZONE',
  description:
    'Technology and design studio in Ahmedabad, Gujarat. Websites, web applications, AI, automation and custom software.',
  email: contactEmail,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Ahmedabad',
    addressRegion: 'Gujarat',
    addressCountry: 'IN',
  },
  areaServed: ['India', 'Worldwide'],
  sameAs: [
    socialUrls.linkedin,
    socialUrls.instagram,
    socialUrls.github,
    socialUrls.x,
  ],
  makesOffer: [
    {
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name: 'Websites' },
    },
    {
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name: 'Applications' },
    },
    {
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name: 'AI and automation' },
    },
    {
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name: 'Custom software' },
    },
  ],
};
