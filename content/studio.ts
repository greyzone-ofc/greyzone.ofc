export type StudioStat = {
  value: string;
  label: string;
};

export type StudioPrinciple = {
  num: string;
  title: string;
  body: string;
};

export type StudioContent = {
  eyebrow: string;
  title: string;
  titleAccent: string;
  lede: string;
  videoUrl: string;
  videoPoster: string;
  videoAriaLabel: string;
  stats: StudioStat[];
  copy: string[];
  contactEmail: string;
  principles: StudioPrinciple[];
};

export const studio: StudioContent = {
  eyebrow: 'Studio',
  title: 'One team, in Ahmedabad. Design and code under one',
  titleAccent: 'roof.',
  lede: 'GREYZONE is a small technology and design studio. The people who plan your project are the people who design and build it — nothing is handed off, and every decision is explained in plain language.',
  videoUrl:
    'https://videos.pexels.com/video-files/3129671/3129671-uhd_2560_1440_30fps.mp4',
  videoPoster:
    'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop',
  videoAriaLabel: 'The GREYZONE team collaborating in the studio',
  stats: [
    { value: '4', label: 'services, one consistent system' },
    { value: '6', label: 'steps in every project, nothing hidden' },
    { value: '12 hrs', label: 'saved each week by one automation' },
    { value: '98%', label: 'of automation runs completed' },
  ],
  copy: [
    'Based in Ahmedabad, Gujarat, working with clients across India and internationally. Websites, applications, AI and custom software — the same four services, the same six-step process, on every project.',
    'Tell us what you are making, fixing or automating at hello@greyzone.in. We reply with honest next steps.',
  ],
  contactEmail: 'hello@greyzone.in',
  principles: [
    {
      num: '01',
      title: 'Explain everything',
      body: 'Every decision in plain language, so you always know what is happening and why.',
    },
    {
      num: '02',
      title: 'Fixed quotes, in writing',
      body: 'Scope, timeline and price are decided before we build. No surprises later.',
    },
    {
      num: '03',
      title: 'Built in the open',
      body: 'A staging link you can open any day, from the first week to launch.',
    },
  ],
};
