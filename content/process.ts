export type ProcessCategory = 'plan' | 'design' | 'build' | 'grow';

export type ProcessStep = {
  step: string;
  cat: ProcessCategory;
  categoryLabel: string;
  title: string;
  body: string;
  timing: string;
  detail: string;
  image: string;
  alt: string;
};

export const processSteps: ProcessStep[] = [
  {
    step: '01',
    cat: 'plan',
    categoryLabel: 'Plan',
    title: 'We start with questions, not screens.',
    body: 'Before anything is designed, we sit with your team and map the real problem: who it is for, what it must do, and what success looks like in numbers.',
    timing: 'Weeks 1–2',
    detail: 'Stakeholder workshop · Research · Opportunity map',
    image: '/assets/process/step-01.jpg',
    alt: 'The team mapping a problem together in a workshop',
  },
  {
    step: '02',
    cat: 'plan',
    categoryLabel: 'Plan',
    title: 'A plan everyone can point to.',
    body: 'We turn the discovery into a fixed scope: sitemap, features, timeline and price, written in plain language. No surprises later, because everything is decided here.',
    timing: 'Weeks 2–3',
    detail: 'Scope document · Sitemap · Fixed quote',
    image: '/assets/process/step-02.jpg',
    alt: 'Planning notes and a laptop on a desk',
  },
  {
    step: '03',
    cat: 'design',
    categoryLabel: 'Design',
    title: 'Design you can click before we build.',
    body: 'You review a working prototype, not static pictures. We test it on real phones, with real content, and revise until it reads clearly at every size.',
    timing: 'Weeks 3–5',
    detail: 'UI design · Clickable prototype · Design system',
    image: '/assets/process/step-03.jpg',
    alt: 'Design tools and colour swatches laid out for UI design',
  },
  {
    step: '04',
    cat: 'build',
    categoryLabel: 'Build',
    title: 'Clean code, built in the open.',
    body: 'Frontend and backend are built together, with a staging link you can open any day. Fast pages are a requirement here, not a favour: budgets are set and measured.',
    timing: 'Weeks 5–9',
    detail: 'Development · Staging access · Performance budgets',
    image: '/assets/process/step-04.jpg',
    alt: 'Code on a monitor during development',
  },
  {
    step: '05',
    cat: 'build',
    categoryLabel: 'Build',
    title: 'AI where it earns its keep.',
    body: 'Only after the basics work do we automate: document processing, follow-ups, data entry. Every automation reports what it did, and a human can override it.',
    timing: 'Weeks 8–10',
    detail: 'Workflow automation · AI features · Audit trail',
    image: '/assets/process/step-05.jpg',
    alt: 'An abstract AI visualisation',
  },
  {
    step: '06',
    cat: 'grow',
    categoryLabel: 'Grow',
    title: 'Launch is the starting line.',
    body: 'We test on real devices, deploy, and watch the numbers with you. Then we improve what the data says matters: speed, enquiries, completed tasks.',
    timing: 'Week 10 onwards',
    detail: 'QA · Deployment · Monthly improvements',
    image: '/assets/process/step-06.jpg',
    alt: 'Analytics dashboards being reviewed after launch',
  },
];
