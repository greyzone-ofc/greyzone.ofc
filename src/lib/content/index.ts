import { cache } from 'react';
import { contact } from '@/content/contact';
import { hero } from '@/content/hero';
import { journalPosts } from '@/content/journal';
import { processSteps } from '@/content/process';
import { projects } from '@/content/projects';
import { services } from '@/content/services';
import { studio } from '@/content/studio';
import { why } from '@/content/why';
import type { JournalPost, Project, SiteRoute } from './types';

/** Future ISR tags: project:${slug}, journal:${slug}, site */

export const getAllProjects = cache(async (): Promise<Project[]> => projects);

export const getProjectBySlug = cache(
  async (slug: string): Promise<Project | undefined> =>
    projects.find((p) => p.slug === slug),
);

/** @deprecated Prefer getAllProjects — kept for call-site clarity during migration. */
export const getProjects = getAllProjects;

export const getAllJournalPosts = cache(
  async (): Promise<JournalPost[]> => journalPosts,
);

export const getJournalPostBySlug = cache(
  async (slug: string): Promise<JournalPost | undefined> =>
    journalPosts.find((p) => p.slug === slug),
);

export const getServices = cache(async () => services);
export const getProcessSteps = cache(async () => processSteps);
export const getStudio = cache(async () => studio);
export const getContact = cache(async () => contact);
export const getHero = cache(async () => hero);
export const getWhy = cache(async () => why);

export const getAllRoutes = cache(async (): Promise<SiteRoute[]> => {
  const work = projects.map((p) => ({
    path: `/work/${p.slug}`,
    kind: 'work' as const,
  }));
  const journal = journalPosts.map((p) => ({
    path: `/journal/${p.slug}`,
    kind: 'journal' as const,
  }));
  return [{ path: '/', kind: 'home' }, ...work, ...journal];
});

export type {
  JournalPost,
  Project,
  ProjectArtId,
  SiteRoute,
  Service,
  ProcessStep,
  StudioContent,
  ContactContent,
  HeroContent,
  WhyContent,
} from './types';
