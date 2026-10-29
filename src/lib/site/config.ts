/**
 * Canonical origin for metadata, sitemap, and robots.
 *
 * Prefer NEXT_PUBLIC_SITE_URL once a custom domain is purchased.
 * On Vercel previews/production without that env, fall back to VERCEL_URL.
 * Locally, fall back to http://localhost:3000.
 */
function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) return explicit.replace(/\/$/, '');

  const vercel = process.env.VERCEL_URL?.trim();
  if (vercel) {
    const host = vercel.replace(/^https?:\/\//, '').replace(/\/$/, '');
    return `https://${host}`;
  }

  return 'http://localhost:3000';
}

export const siteUrl = resolveSiteUrl();

/** Safe default for third-party links opened in a new tab. */
export const externalRel = 'noopener noreferrer';
