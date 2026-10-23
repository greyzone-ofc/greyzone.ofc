import type { Project } from './types';

/**
 * Selected-work projects (metadata only).
 * SVG art can stay in components later — use `artSvgId` (or another art key)
 * to map each project to its illustration.
 */
const projects: Project[] = [
  {
    idx: '01',
    industry: 'Textiles',
    title: 'Wholesale ordering portal',
    sub: 'Web application',
    year: '2026',
    result: 'Days of phone orders became minutes online',
    artSvgId: 'portal',
  },
  {
    idx: '02',
    industry: 'Healthcare',
    title: 'Clinic booking and reminders',
    sub: 'Application',
    year: '2025',
    result: '40% fewer missed appointments',
    artSvgId: 'clinic',
  },
  {
    idx: '03',
    industry: 'Finance',
    title: 'Invoice matching with AI',
    sub: 'AI and automation',
    year: '2026',
    result: '12 hours of data entry saved every week',
    artSvgId: 'invoice',
  },
  {
    idx: '04',
    industry: 'Industrial',
    title: 'Manufacturer catalogue website',
    sub: 'Website',
    year: '2025',
    result: 'Loads in 2.1 seconds on a 4G phone',
    artSvgId: 'catalogue',
  },
  {
    idx: '05',
    industry: 'Logistics',
    title: 'Fleet and dispatch console',
    sub: 'Custom software',
    year: '2025',
    result: 'Six separate tools replaced by one console',
    artSvgId: 'fleet',
  },
  {
    idx: '06',
    industry: 'Education',
    title: 'Course platform and payments',
    sub: 'Web application',
    year: '2024',
    result: '98% of payments reconciled automatically',
    artSvgId: 'course',
  },
];

export async function getProjects(): Promise<Project[]> {
  return projects;
}
