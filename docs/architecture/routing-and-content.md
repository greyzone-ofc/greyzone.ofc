# Routing and content

## How to add a work page

1. Add an entry in `src/content/projects.ts` with a unique kebab-case `slug`, SEO fields, and card fields.
2. Use an `artSvgId` from the typed union (or omit for no art).
3. Run `npm run validate:content` and `npm run validate:routes`.
4. Build: `generateStaticParams` picks up the slug automatically; sitemap uses `getAllRoutes()`.

## How to add a journal page

1. Add an entry in `src/content/journal.ts` with unique `slug`, `id` (home DOM anchor), SEO fields, excerpt, image, CTA.
2. Optional future `body` field can hold long-form copy later without changing `/journal/[slug]`.
3. Validate + build as above.

## Slug rules

- Format: lowercase kebab-case (`wholesale-ordering-portal`).
- Unique within and across work/journal (routes are namespaced, but validators still enforce uniqueness per family).
- **Immutable by default.** Renames require a redirect entry in `src/lib/site/redirects.ts` (or `next.config` redirects) and an ADR note.

## Site URL (`siteUrl`)

Resolved in `src/lib/site/config.ts`:

1. `NEXT_PUBLIC_SITE_URL` (no trailing slash) — set for production custom domain
2. else `https://${VERCEL_URL}` on Vercel previews/production
3. else `http://localhost:3000`

Canonical URLs, sitemap, and robots host all depend on this.

## Hash navigation

Home sections keep ids: `#services`, `#work`, `#contact`, `#process`, `#studio`, `#journal`.

From any page, hash links must be absolute (`/#services`), not relative `#services`, so detail pages navigate home correctly.

## Unknown slugs

`dynamicParams = false` and `notFound()` — unknown `/work/...` or `/journal/...` return 404.

## Sitemap scale

Today: one sitemap from `getAllRoutes()`. If URL count ever approaches 50k, split into a sitemap index (document when needed; not required now).

## Cache tags (future ISR)

When a CMS adapter lands, tag reads as:

- `project:${slug}`
- `journal:${slug}`
- `site` (nav, global SEO)

Webhook → `revalidateTag` — not implemented in this engagement.
