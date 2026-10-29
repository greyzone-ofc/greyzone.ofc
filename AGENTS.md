<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# GREYZONE agent guide

Static marketing site for GREYZONE (Next.js 16 App Router, React 19, TypeScript). Application code lives under **`src/`**. `public/` stays at repo root.

## Where things live

| Need | Go here |
|------|---------|
| Routes / layouts | `src/app/` |
| Page composition | `src/templates/` |
| Home / work / journal UI | `src/features/` |
| Shared chrome & UI | `src/components/` |
| Edit copy / projects / journal | `src/content/` via **`src/lib/content`** only |
| Nav, email, SEO, site URL | `src/lib/site/` |
| Styles / tokens | `src/styles/site.css` |
| Interactions | `src/features/effects/` + `SiteEffects` |
| Architecture docs | `docs/architecture/` |

Full map: [docs/architecture/code-map.md](docs/architecture/code-map.md).

## Hard rules

1. Pages/templates import `@/lib/content`, **never** `@/content/*` directly.
2. Do not add `output: 'export'`.
3. Do not create empty FSD folders (`atoms`, `molecules`, unused features).
4. Preserve `/` hash sections (`#services`, `#work`, `#contact`, …). Hash hrefs from any page must be absolute (`/#contact`).
5. Slugs are kebab-case and immutable by default (renames need redirects).
6. Architecture refactors are not redesigns — check visual baselines locally.
7. No `dangerouslySetInnerHTML` without explicit review.

## Commands

```bash
npm run dev
npm run lint
npm run typecheck
npm run validate          # content + routes + assets
npm run build
npm run test:e2e:smoke
npm run test:e2e          # includes visual (local)
```

## Add a page

See [docs/architecture/routing-and-content.md](docs/architecture/routing-and-content.md).

## Agent workflow

1. Identify URL / feature / component.
2. Read this file + code-map.
3. Change the canonical owner only.
4. Prefer extending existing abstractions.
5. Run lint, typecheck, validate, and relevant e2e.
6. Update docs if conventions change.
