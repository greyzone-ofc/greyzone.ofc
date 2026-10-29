# Code map

Canonical locations after the `src/` cutover. Config, `public/`, `e2e/`, and `scripts/` stay at the repo root.

| Path | Responsibility |
|------|----------------|
| `src/app/` | Thin App Router entry points, metadata routes, globals |
| `src/app/(marketing)/` | Home page + shared marketing chrome layout |
| `src/app/work/[slug]/` | Work detail routes (`generateStaticParams`) |
| `src/app/journal/[slug]/` | Journal detail routes |
| `src/templates/` | Page-family composition (`HomeTemplate`, detail templates) |
| `src/features/home/` | Homepage section components |
| `src/features/work/` | Work list art + detail pieces |
| `src/features/journal/` | Journal section + detail pieces |
| `src/features/effects/` | Client site-effects modules + facade |
| `src/components/layout/` | Header, footer, menu, skip link, SVG sprite |
| `src/components/ui/` | `Acc`, `Icon` |
| `src/components/interactions/` | `SiteEffects` client mount |
| `src/content/` | Typed collections (private to `lib/content`) |
| `src/lib/content/` | **Public** repository: `getAll*`, `getBySlug`, `getAllRoutes` |
| `src/lib/site/` | `config`, `navigation`, `social`, `metadata` |
| `src/lib/theme.ts` | Theme key + boot script |
| `src/styles/site.css` | Primary marketing stylesheet + tokens |
| `public/assets/` | Logo, video, process/journal images |
| `scripts/` | `validate-content`, `validate-routes`, `validate-assets` |
| `e2e/` | Smoke + visual baselines |
| `docs/architecture/` | This documentation set |

## Import rules

1. Prefer `@/` alias → `src/*`.
2. Pages/templates import `@/lib/content`, never `@/content/*`.
3. Features may import shared components and lib; not other features’ internals.
4. Do not add empty FSD layers (`atoms`, `molecules`, unused feature shells).
