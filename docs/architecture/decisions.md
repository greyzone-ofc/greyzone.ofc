# Architecture decisions

## ADR-001: Typed TypeScript content behind a repository API

**Problem:** Need scalable pages without a CMS yet; UI must not couple to storage.

**Decision:** Collections in `src/content/*.ts`; all reads via `src/lib/content` (`getAll*`, `getBySlug`, `getAllRoutes`). Pages never import `@/content/*`.

**Trade-off:** Developers edit code for content (good for agents; poor for non-dev editors until a CMS adapter replaces the repository body).

## ADR-002: Migrate into `src/`

**Problem:** Empty `src/app` scaffold poisoned Next type generation while live code lived at root.

**Decision:** Single live tree under `src/`; delete root `app/`. `public/` stays at root.

**Trade-off:** One-time move cost; clearer separation of config vs application code.

## ADR-003: Static-first; forbid `output: 'export'`

**Problem:** Want static performance and a path to ISR/CMS later; site already uses Next `headers()`.

**Decision:** Prerender with App Router defaults + `generateStaticParams`. Never enable static export.

**Trade-off:** Requires Node hosting (Vercel) for future on-demand revalidation — acceptable.

## ADR-004: Work and journal detail routes

**Problem:** Cards looked like destinations but only linked to `#contact`.

**Decision:** `/work/[slug]` and `/journal/[slug]` from content; home hashes preserved; cards link to details; detail CTA to `/#contact`.

## ADR-005: Pragmatic features, not full FSD

**Problem:** Empty FSD folders (`faq`, `atoms`, `molecules`) added confusion without value.

**Decision:** Use `features/` only for real ownership; shared UI under `components/`.

## ADR-006: Keep imperative site-effects; modularize incrementally

**Problem:** ~750-line `@ts-nocheck` port from static HTML powers menu, carousels, brief mailto.

**Decision:** Preserve behavior; split into modules; menu must not require `#HeroBanner` (detail pages).

## ADR-007: Cache tag naming (ISR later)

Tags: `project:${slug}`, `journal:${slug}`, `site`. No webhook yet.

## ADR-008: Trailing slash

Do not flip Next `trailingSlash` in this engagement; keep framework defaults.

## ADR-009: Slug immutability

Slugs are stable public IDs. Renames need an explicit redirect entry.
