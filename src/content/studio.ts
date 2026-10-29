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
  locationBold: string;
  locationRest: string;
  copyBeforeEmail: string;
  copyAfterEmail: string;
  principles: StudioPrinciple[];
};

export const studio: StudioContent = {
  eyebrow: 'Studio',
  title: 'One team, in Ahmedabad. Design and code under one',
  titleAccent: 'roof.',
  lede: 'GREYZONE is a small technology and design studio. The people who plan your project are the people who design and build it — nothing is handed off, and every decision is explained in plain language.',
  videoUrl: '/assets/studio-collab.mp4',
  videoPoster: '/assets/studio-poster.jpg',
  videoAriaLabel: 'The GREYZONE team collaborating in the studio',
  stats: [
    { value: '4', label: 'services, one consistent system' },
    { value: '6', label: 'steps in every project, nothing hidden' },
    { value: '12 hrs', label: 'saved each week by one automation' },
    { value: '98%', label: 'of automation runs completed' },
  ],
  locationBold: 'Based in Ahmedabad, Gujarat,',
  locationRest:
    ' working with clients across India and internationally. Websites, applications, AI and custom software — the same four services, the same six-step process, on every project.',
  copyBeforeEmail: 'Tell us what you are making, fixing or automating at ',
  copyAfterEmail: '. We reply with honest next steps.',
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
