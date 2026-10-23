# GREYZONE

Marketing site for GREYZONE — a technology and design studio in Ahmedabad.

Stack: **Next.js 16** (App Router) · **React 19** · **TypeScript** · **Tailwind CSS v4**

## Scripts

| Command | Purpose |
| -------- | ------- |
| `npm run dev` | Local development (`http://localhost:3000`) |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript (`tsc --noEmit`) |
| `npm run test:e2e` | Build + Playwright smoke + local visual checks |
| `npm run test:e2e:smoke` | Build + smoke tests only (what CI runs) |
| `npm run test:e2e:update` | Refresh visual baseline screenshots |

## Project layout

| Path | Role |
| ---- | ---- |
| `app/(marketing)/` | Home page + marketing chrome |
| `components/` | Layout, sections, UI primitives |
| `content/` | Typed copy for services, process, journal, studio |
| `modules/site/` | Navigation, social URLs, SEO metadata, site URL |
| `modules/projects/` | Selected-work data |
| `lib/site-effects.ts` | Client interaction scripts (menu, carousels, brief) |
| `styles/site.css` | Primary marketing stylesheet |
| `public/assets/` | Logo, hero mask, studio media, process/journal images |
| `e2e/` | Playwright smoke tests and visual baselines |

## Editing content

- Section copy: `content/*.ts` and `modules/projects/data.ts`
- Nav / social / email: `modules/site/navigation.ts`, `modules/site/social.ts`
- SEO titles and Organization JSON-LD: `modules/site/metadata.ts`
- Canonical URL: set `NEXT_PUBLIC_SITE_URL` (see below). Until a custom domain exists, Vercel preview/production URLs are used automatically.

Social LinkedIn / Instagram / X entries are **placeholders** until real accounts exist. Only GitHub (`greyzone-ofc`) is listed in structured-data `sameAs`.

## Environment

| Variable | When |
| -------- | ---- |
| `NEXT_PUBLIC_SITE_URL` | Set on Vercel after purchasing a domain (e.g. `https://www.example.com`). No trailing slash. |

Local default without env: `http://localhost:3000`.

## Deploy (Vercel)

1. Import the GitHub repo into Vercel.
2. Framework preset: Next.js (default).
3. Optional: set `NEXT_PUBLIC_SITE_URL` once the custom domain is live.
4. In Vercel → Project → Deployment Checks, require GitHub **CI / verify** (and e2e when enabled) before promoting production.

CI (`.github/workflows/ci.yml`) runs on `master` and `testing`: lint → typecheck → build → Playwright **smoke** (Chromium).

Rollback: redeploy the previous successful deployment in the Vercel dashboard.

## Visual baselines

Baseline screenshots live under `e2e/visual.spec.ts-snapshots/` (desktop light/dark + mobile light).

- Run locally: `npm run test:e2e` (includes visual) or `npm run test:e2e:update` after intentional design changes
- Skipped on CI — OS font/raster differences make full-page PNG compares noisy across Windows vs Linux

Prefer reviewing diffs before committing new baselines — refactors should not silently redesign the portfolio.
