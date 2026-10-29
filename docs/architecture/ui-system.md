# UI system

## Design tokens

Primary tokens live in `src/styles/tokens.css` (`:root`): `--ink`, `--page`, `--red` / signal, `--muted`, `--line`, `--card`, fluid type (`--fs-title`, `--fs-lede`), layout (`--pad`, `--site-max`, `--tap`, `--svh`), fonts (`--font`, `--font-serif`), motion (`--ease-menu`, `--fx-p`).

Entry stylesheet: `src/styles/index.css` (via `app/globals.css`). `site.css` re-exports that barrel.

`src/app/globals.css` `@theme` mirrors semantic colors for the few Tailwind utilities in use. Keep both aligned — do not invent a second palette.

Section / chrome CSS is split under `src/styles/chrome/` and `src/styles/sections/` — see [styles-and-effects.md](./styles-and-effects.md).

## Shared components

| Component | Role |
|-----------|------|
| `Acc` | One italic accent word (`<em class="acc">`) |
| `Icon` | SVG sprite `<use href="#id">` |
| Layout chrome | Skip link, header, menu overlay, footer, sprite |

## Styling rules

- Marketing look is mostly hand CSS under `src/styles/` (BEM-ish section prefixes).
- Prefer existing tokens over arbitrary values.
- Respect `prefers-reduced-motion` paths already in CSS/effects.
- Scroll interactions mount via `data-fx` recipes (`src/features/effects`), not per-component scroll hooks.
- Do not wholesale rewrite to Tailwind in this architecture pass.

## Empty / single-item collections

- Zero projects or journal posts: hide the section (or render a safe empty state) — never divide by zero in meters.
- Single item: carousel controls may no-op; meter shows `01 / 01`.

## Visual regression

Baselines under `e2e/visual.spec.ts-snapshots/`:

- Desktop light, desktop dark, mobile light

Run locally: `npm run test:e2e` or update with `npm run test:e2e:update` after **intentional** visual changes. Visual tests are skipped on CI (OS font/raster noise).

Architecture refactors must not silently redesign the site.
