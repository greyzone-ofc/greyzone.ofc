# Code map

Canonical locations after the `src/` cutover. Config, `public/`, `e2e/`, and `scripts/` stay at the repo root.

| Path | Responsibility |
|------|----------------|
| `src/app/` | Thin App Router entry points, metadata routes, globals |
| `src/app/(marketing)/` | Home + work/journal detail routes + marketing chrome layout |
| `src/templates/` | Page-family composition (`HomeTemplate`, detail templates) |
| `src/features/home/` | Homepage section components |
| `src/features/work/` | Work art (`ProjectArt`) — public barrel `index.ts` |
| `src/features/effects/` | Effect recipes + runtime + chrome menu/theme |
| `src/components/layout/` | Header, footer, menu, skip link, SVG sprite |
| `src/components/ui/` | `Acc`, `Icon` |
| `src/components/interactions/` | `SiteEffects` client mount |
| `src/content/` | Typed collections (private to `lib/content`) |
| `src/lib/content/` | **Public** repository: `getAll*`, `getBySlug`, `getAllRoutes` |
| `src/lib/site/` | `config`, `navigation`, `social`, `metadata`, `redirects` |
| `src/lib/theme.ts` | Theme key + boot script |
| `src/styles/` | Modular CSS — entry `index.css` (see [styles-and-effects.md](./styles-and-effects.md)) |
| `public/assets/` | Logo, video, process/journal images |
| `scripts/` | `validate-content`, `validate-routes`, `validate-assets` |
| `e2e/` | Smoke + visual baselines |
| `docs/architecture/` | This documentation set |

## Import rules

1. Prefer `@/` alias → `src/*`.
2. Pages/templates import `@/lib/content`, never `@/content/*`.
3. Features may import shared components and lib; prefer public feature barrels (`@/features/work`) over deep internals.
4. Do not add empty FSD layers (`atoms`, `molecules`, unused feature shells).
5. Section motion: declare `data-fx="<recipe-id>"`; do not add ad-hoc `window` scroll listeners in components.
