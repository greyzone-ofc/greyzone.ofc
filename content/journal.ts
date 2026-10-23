export type JournalPost = {
  id: string;
  category: string;
  date: string;
  readTime: string;
  title: string;
  excerpt: string;
  image: string;
  alt: string;
  ctaLabel: string;
  href: string;
};

export const journalPosts: JournalPost[] = [
  {
    id: 'journal-speed',
    category: 'Performance',
    date: 'Mar 2026',
    readTime: '6 min read',
    title: 'How we cut a checkout to under two seconds',
    excerpt:
      "Image budgets, fewer fonts and honest performance targets — the changes that moved a real store's checkout, step by step.",
    image:
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop',
    alt: "A developer's desk with code on a laptop screen",
    ctaLabel: "Discuss your site's speed",
    href: '#contact',
  },
  {
    id: 'journal-ai',
    category: 'AI and automation',
    date: 'Feb 2026',
    readTime: '5 min read',
    title: 'AI in the back office: where it actually pays',
    excerpt:
      'Invoice matching, follow-ups and data entry paid back in weeks. Chatbots nobody asked for did not. Here is how we tell the difference.',
    image:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop',
    alt: 'A laptop showing business analytics charts',
    ctaLabel: 'Discuss an automation',
    href: '#contact',
  },
  {
    id: 'journal-design',
    category: 'Design',
    date: 'Jan 2026',
    readTime: '4 min read',
    title: 'Design systems that survive handover',
    excerpt:
      'One type scale, one icon set, one spacing rhythm — the small rules that keep a site looking like itself long after launch.',
    image:
      'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?q=80&w=1200&auto=format&fit=crop',
    alt: "A designer's desk with sketches and a laptop",
    ctaLabel: 'Discuss your design system',
    href: '#contact',
  },
];
