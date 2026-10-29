export type { Project, ProjectArtId } from '@/content/projects';
export type { JournalPost } from '@/content/journal';
export type { Service, ServiceIconId } from '@/content/services';
export type { ProcessStep, ProcessCategory } from '@/content/process';
export type { StudioContent, StudioStat, StudioPrinciple } from '@/content/studio';
export type { ContactContent, BriefOption, ContactChannel } from '@/content/contact';
export type { HeroContent } from '@/content/hero';
export type { WhyContent } from '@/content/why';

export type SiteRoute = {
  path: string;
  kind: 'home' | 'work' | 'journal';
};
