# Architecture overview

GREYZONE is a **static-first** Next.js 16 App Router marketing site for a technology and design studio. Content is typed TypeScript behind a repository API. Pages are React Server Components by default; client JavaScript is limited to interactions.

## Rendering model

- Build-time static generation for `/`, `/work/[slug]`, `/journal/[slug]`, and SEO routes.
- **Forbidden:** `output: 'export'` (blocks ISR, Draft Mode, and our security headers path on Vercel Node).
- Future content freshness without full redeploy: swap `src/lib/content` to a CMS and use `revalidateTag` (see [decisions.md](./decisions.md)).

## Module boundaries

```text
app (thin routes)
  → templates
    → features
      → components (shared UI / chrome)
lib/content  ← only module that reads content/*
lib/site     ← nav, SEO, site URL
```

- Routes compose templates; they do not embed large content objects.
- Shared UI must not import page content or features.
- Features own section UI and related behavior.

## Page families

| Family | Routes | Template |
|--------|--------|----------|
| Home | `/` (+ hash sections) | `HomeTemplate` |
| Work detail | `/work/[slug]` | `WorkDetailTemplate` |
| Journal detail | `/journal/[slug]` | `JournalDetailTemplate` |
| Utility | not-found | minimal |
| SEO | sitemap, robots, opengraph-image | metadata routes |

## Baseline (Phase 0)

- Branch: `testing`
- Pre-migration SHA: `538371304c655e662cfe7f59412a61d727c894fd`
- Known pre-fix defect: empty `src/app` scaffold broke `tsc` (resolved by cutover to real `src/app` only)
- Visual baselines: `e2e/visual.spec.ts-snapshots/` (desktop light/dark, mobile light)

## Related docs

- [code-map.md](./code-map.md)
- [routing-and-content.md](./routing-and-content.md)
- [ui-system.md](./ui-system.md)
- [styles-and-effects.md](./styles-and-effects.md)
- [decisions.md](./decisions.md)
