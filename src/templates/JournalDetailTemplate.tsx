import Image from 'next/image';
import Link from 'next/link';
import type { JournalPost } from '@/lib/content';

export function JournalDetailTemplate({ post }: { post: JournalPost }) {
  return (
    <article className="detail-page journal-detail">
      <div className="detail-in">
        <p className="eyebrow">
          <Link href="/#journal">Journal</Link>
          <span aria-hidden="true"> · </span>
          {post.category}
        </p>
        <h1>{post.title}</h1>
        <p className="detail-meta">
          {post.date} · {post.readTime}
        </p>
        <div className="detail-hero-img">
          <Image
            src={post.image}
            alt={post.alt}
            width={1200}
            height={750}
            sizes="(max-width:900px) 100vw, 720px"
            priority
          />
        </div>
        <p className="detail-lede">{post.excerpt}</p>
        {post.body ? <div className="detail-body">{post.body}</div> : null}
        <p>
          <Link className="detail-cta" href="/#contact">
            {post.ctaLabel}
          </Link>
        </p>
      </div>
    </article>
  );
}
