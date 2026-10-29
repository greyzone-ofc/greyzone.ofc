export type BriefOption = {
  value: string;
  label: string;
  defaultChecked?: boolean;
};

export type ContactChannel = {
  label: string;
  value: string;
  href?: string;
};

export type ContactContent = {
  eyebrow: string;
  titleBefore: string;
  titleAccent: string;
  lede: string;
  channels: ContactChannel[];
  briefKicker: string;
  typeLegend: string;
  budgetLegend: string;
  types: BriefOption[];
  budgets: BriefOption[];
  summaryDefault: string;
  ctaLabel: string;
  replyNote: string;
  plainEmailLead: string;
  footCopy: string;
  topLabel: string;
};

export const contact: ContactContent = {
  eyebrow: 'Contact',
  titleBefore: 'Have something to',
  titleAccent: 'build?',
  lede:
    'Tell us what you are making, fixing or automating. We reply with honest next steps, and we will tell you if we are not the right fit.',
  channels: [
    {
      label: 'Studio',
      value: 'Ahmedabad, Gujarat · India and international',
    },
    {
      label: 'Reply',
      value: 'Within 1 working day',
    },
  ],
  briefKicker: 'Project brief',
  typeLegend: 'What are you building?',
  budgetLegend: 'Budget range',
  types: [
    { value: 'a website', label: 'Website', defaultChecked: true },
    { value: 'an application', label: 'Application' },
    { value: 'AI and automation', label: 'AI and automation' },
    { value: 'custom software', label: 'Custom software' },
    {
      value: 'a project I am still defining',
      label: 'Not sure yet',
    },
  ],
  budgets: [
    { value: 'under ₹1 lakh', label: 'Under ₹1 lakh' },
    { value: '₹1–3 lakh', label: '₹1–3 lakh' },
    { value: '₹3–10 lakh', label: '₹3–10 lakh' },
    { value: '₹10 lakh or more', label: '₹10 lakh +' },
    { value: 'not fixed yet', label: 'Not fixed yet' },
  ],
  summaryDefault:
    'You are building a website. Pick a budget range, or just send what you have.',
  ctaLabel: 'Send brief by email',
  replyNote: 'We reply within 1 working day.',
  plainEmailLead: 'Prefer plain email?',
  footCopy:
    '© 2026 GREYZONE · Ahmedabad, Gujarat · Working across India and internationally',
  topLabel: 'Back to top',
};
