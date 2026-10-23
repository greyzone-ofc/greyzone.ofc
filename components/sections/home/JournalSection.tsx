import { Acc } from '@/components/ui/Acc';
import { Icon } from '@/components/ui/Icon';
import { journalPosts } from '@/content/journal';

function journalSrcSet(image: string) {
  const w600 = image.replace('w=1200', 'w=600');
  const w900 = image.replace('w=1200', 'w=900');
  return `${w600} 600w, ${w900} 900w, ${image} 1200w`;
}

export function JournalSection() {
  return (
    <section className="journal" id="journal" aria-labelledby="journalTitle">
      <div className="journal-in">
        <span className="eyebrow">Journal</span>
        <h2 id="journalTitle">
          Insights from the <Acc>studio.</Acc>
        </h2>
        <p className="journal-lede">
          What we learn building websites, applications and automations —
          written plainly, with the numbers we actually see.
        </p>
        <div className="journal-grid" data-rv>
          {journalPosts.map((post) => (
            <article className="post" id={post.id} key={post.id}>
              <div className="post-img">
                <img
                  src={post.image}
                  srcSet={journalSrcSet(post.image)}
                  sizes="(max-width:900px) 100vw, 33vw"
                  width={1200}
                  height={750}
                  loading="lazy"
                  decoding="async"
                  alt={post.alt}
                />
              </div>
              <p className="post-meta">
                <b>{post.category}</b>
                <span>{post.date}</span>
                <span>{post.readTime}</span>
              </p>
              <h3>{post.title}</h3>
              <p>{post.excerpt}</p>
              <a className="post-link" href={post.href}>
                {post.ctaLabel} <Icon id="i-arrow" className="ic" />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
