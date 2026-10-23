import { socialUrls } from './social';

export type NavLink = {
  href: string;
  label: string;
};

export type SocialLink = {
  href: string;
  label: string;
  iconId: 'i-in' | 'i-ig' | 'i-gh' | 'i-x';
};

export const navLinks: NavLink[] = [
  { href: '#services', label: 'Services' },
  { href: '#work', label: 'Work' },
  { href: '#process', label: 'How we build' },
  { href: '#studio', label: 'Studio' },
  { href: '#journal', label: 'Journal' },
  { href: '#contact', label: 'Contact' },
];

export const serviceSublinks: NavLink[] = [
  { href: '#services', label: 'Websites' },
  { href: '#services', label: 'Applications' },
  { href: '#services', label: 'AI and automation' },
  { href: '#services', label: 'Custom software' },
];

export const socialLinks: SocialLink[] = [
  {
    href: socialUrls.linkedin,
    label: 'LinkedIn',
    iconId: 'i-in',
  },
  {
    href: socialUrls.instagram,
    label: 'Instagram',
    iconId: 'i-ig',
  },
  {
    href: socialUrls.github,
    label: 'GitHub',
    iconId: 'i-gh',
  },
  {
    href: socialUrls.x,
    label: 'X (Twitter)',
    iconId: 'i-x',
  },
];

export const contactEmail = 'hello@greyzone.in';
