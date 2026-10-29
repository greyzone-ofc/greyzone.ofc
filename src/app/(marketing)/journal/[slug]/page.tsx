import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllJournalPosts, getJournalPostBySlug } from '@/lib/content';
import { JournalDetailTemplate } from '@/templates/JournalDetailTemplate';

export const dynamicParams = false;

export async function generateStaticParams() {
  const posts = await getAllJournalPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getJournalPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.seoTitle,
    description: post.seoDescription,
    alternates: { canonical: `/journal/${post.slug}` },
    openGraph: {
      title: post.seoTitle,
      description: post.seoDescription,
      url: `/journal/${post.slug}`,
    },
  };
}

export default async function JournalPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getJournalPostBySlug(slug);
  if (!post) notFound();
  return <JournalDetailTemplate post={post} />;
}
