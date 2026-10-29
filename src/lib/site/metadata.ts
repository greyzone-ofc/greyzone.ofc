import { contactEmail } from './navigation';
import { verifiedSameAs } from './social';

export { socialUrls } from './social';

export const siteTitle =
  'GREYZONE – Websites, software, AI and automation.';

export const siteDescription =
  'GREYZONE is a technology and design studio in Ahmedabad, Gujarat. We design and build websites, web applications, AI solutions, automation and custom software.';

export const ogTitle = 'GREYZONE – Websites, software, AI and automation';

export const ogDescription =
  'Websites, applications, AI and custom software, designed and built by one team in Ahmedabad, working across India and internationally.';

export type OrgJsonLd = {
  '@context': 'https://schema.org';
  '@type': 'Organization';
  name: string;
  url: string;
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

export function buildOrgJsonLd(siteUrl: string): OrgJsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'GREYZONE',
    url: siteUrl,
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
    sameAs: verifiedSameAs,
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
}
