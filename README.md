# GREYZONE

Marketing site for GREYZONE — a technology and design studio in Ahmedabad.

Stack: **Next.js 16** (App Router) · **React 19** · **TypeScript** · **Tailwind CSS v4**

Application code lives under **`src/`**. See [docs/architecture/](docs/architecture/) and [AGENTS.md](AGENTS.md).

## Scripts

| Command | Purpose |
| -------- | ------- |
| `npm run dev` | Local development (`http://localhost:3000`) |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript (`tsc --noEmit`) |
| `npm run validate` | Content + routes + asset checks |
| `npm run test:e2e` | Build + Playwright smoke + local visual checks |
| `npm run test:e2e:smoke` | Build + smoke tests only (what CI runs) |
| `npm run test:e2e:update` | Refresh visual baseline screenshots |

## Project layout

| Path | Role |
| ---- | ---- |
| `src/app/` | Thin routes, layouts, SEO metadata routes |
| `src/templates/` | Home + work/journal detail composition |
| `src/features/` | Home sections, work art, effects |
| `src/components/` | Layout chrome + shared UI |
| `src/content/` | Typed collections (private) |
| `src/lib/content/` | **Public** content repository |
| `src/lib/site/` | Nav, social, SEO, site URL |
| `src/styles/site.css` | Primary marketing stylesheet |
| `public/assets/` | Logo, hero mask, studio media, process/journal images |
| `scripts/` | validate-content / routes / assets |
| `e2e/` | Playwright smoke + visual baselines |
| `docs/architecture/` | Architecture docs |

## Editing content

- Collections: `src/content/*.ts` — always consume via `@/lib/content`
- Nav / social / email: `src/lib/site/navigation.ts`, `social.ts`
- SEO: `src/lib/site/metadata.ts`
- Add a page: [docs/architecture/routing-and-content.md](docs/architecture/routing-and-content.md)

## Environment (`siteUrl`)

| Variable | When |
| -------- | ---- |
| `NEXT_PUBLIC_SITE_URL` | Production custom domain (no trailing slash) |

Fallbacks: `https://${VERCEL_URL}` on Vercel, else `http://localhost:3000`.

## Deploy (Vercel)

1. Import the GitHub repo into Vercel.
2. Framework preset: Next.js (default). **Do not** set `output: 'export'`.
3. Optional: set `NEXT_PUBLIC_SITE_URL` once the custom domain is live.
4. Require GitHub **CI / verify** before promoting production.

CI runs: lint → typecheck → validate → build → Playwright smoke.

## Visual baselines

Baselines under `e2e/visual.spec.ts-snapshots/`. Skipped on CI (OS font noise). Update locally with `npm run test:e2e:update` after intentional design changes.
