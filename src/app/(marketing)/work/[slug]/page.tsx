import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllProjects, getProjectBySlug } from '@/lib/content';
import { WorkDetailTemplate } from '@/templates/WorkDetailTemplate';

export const dynamicParams = false;

export async function generateStaticParams() {
  const projects = await getAllProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: project.seoTitle,
    description: project.seoDescription,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: {
      title: project.seoTitle,
      description: project.seoDescription,
      url: `/work/${project.slug}`,
    },
  };
}

export default async function WorkPage({ params }: PageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();
  return <WorkDetailTemplate project={project} />;
}
