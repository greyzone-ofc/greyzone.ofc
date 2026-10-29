export type ProjectArtId =
  | 'portal'
  | 'clinic'
  | 'invoice'
  | 'catalogue'
  | 'fleet'
  | 'course';

export type Project = {
  slug: string;
  idx: string;
  industry: string;
  title: string;
  sub: string;
  year: string;
  result: string;
  artSvgId: ProjectArtId;
  seoTitle: string;
  seoDescription: string;
};

export const projects: Project[] = [
  {
    slug: 'wholesale-ordering-portal',
    idx: '01',
    industry: 'Textiles',
    title: 'Wholesale ordering portal',
    sub: 'Web application',
    year: '2026',
    result: 'Days of phone orders became minutes online',
    artSvgId: 'portal',
    seoTitle: 'Wholesale ordering portal — GREYZONE',
    seoDescription:
      'Web application that turned days of phone orders into minutes online for a textiles wholesaler.',
  },
  {
    slug: 'clinic-booking-reminders',
    idx: '02',
    industry: 'Healthcare',
    title: 'Clinic booking and reminders',
    sub: 'Application',
    year: '2025',
    result: '40% fewer missed appointments',
    artSvgId: 'clinic',
    seoTitle: 'Clinic booking and reminders — GREYZONE',
    seoDescription:
      'Clinic booking application that cut missed appointments by 40%.',
  },
  {
    slug: 'invoice-matching-ai',
    idx: '03',
    industry: 'Finance',
    title: 'Invoice matching with AI',
    sub: 'AI and automation',
    year: '2026',
    result: '12 hours of data entry saved every week',
    artSvgId: 'invoice',
    seoTitle: 'Invoice matching with AI — GREYZONE',
    seoDescription:
      'AI automation that saved 12 hours of invoice data entry every week.',
  },
  {
    slug: 'manufacturer-catalogue',
    idx: '04',
    industry: 'Industrial',
    title: 'Manufacturer catalogue website',
    sub: 'Website',
    year: '2025',
    result: 'Loads in 2.1 seconds on a 4G phone',
    artSvgId: 'catalogue',
    seoTitle: 'Manufacturer catalogue website — GREYZONE',
    seoDescription:
      'Industrial catalogue website that loads in 2.1 seconds on a 4G phone.',
  },
  {
    slug: 'fleet-dispatch-console',
    idx: '05',
    industry: 'Logistics',
    title: 'Fleet and dispatch console',
    sub: 'Custom software',
    year: '2025',
    result: 'Six separate tools replaced by one console',
    artSvgId: 'fleet',
    seoTitle: 'Fleet and dispatch console — GREYZONE',
    seoDescription:
      'Custom fleet and dispatch console that replaced six separate tools.',
  },
  {
    slug: 'course-platform-payments',
    idx: '06',
    industry: 'Education',
    title: 'Course platform and payments',
    sub: 'Web application',
    year: '2024',
    result: '98% of payments reconciled automatically',
    artSvgId: 'course',
    seoTitle: 'Course platform and payments — GREYZONE',
    seoDescription:
      'Course platform with payments that reconciles 98% of payments automatically.',
  },
];
