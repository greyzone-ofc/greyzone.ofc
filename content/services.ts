export type ServiceIconId = 'i-web' | 'i-app' | 'i-ai' | 'i-code';

export type Service = {
  num: string;
  kicker: string;
  title: string;
  body: string;
  tags: string[];
  iconId: ServiceIconId;
  /** Screen-reader label appended after “Discuss your project” */
  srLabel: string;
};

export const services: Service[] = [
  {
    num: '01',
    kicker: 'Design and frontend',
    title: 'Websites',
    body: 'Fast, clear, built to convert. Design and frontend development for businesses that need their site to work.',
    tags: ['Marketing', 'E-commerce', 'CMS'],
    iconId: 'i-web',
    srLabel: ' about websites',
  },
  {
    num: '02',
    kicker: 'Full stack',
    title: 'Applications',
    body: 'Backend and frontend, built together. Web applications and mobile apps your team will actually use.',
    tags: ['Web apps', 'Mobile', 'Portals'],
    iconId: 'i-app',
    srLabel: ' about applications',
  },
  {
    num: '03',
    kicker: 'Where it helps',
    title: 'AI and automation',
    body: 'Where it saves time, and only there. We tell you where AI does not help.',
    tags: ['Workflows', 'Documents', 'Integrations'],
    iconId: 'i-ai',
    srLabel: ' about AI and automation',
  },
  {
    num: '04',
    kicker: 'Built around you',
    title: 'Custom software',
    body: 'We build custom software around how your business actually works.',
    tags: ['Internal tools', 'ERP and CRM', 'APIs'],
    iconId: 'i-code',
    srLabel: ' about custom software',
  },
];
