# Definition of Done notes

## Baseline (Phase 0)

- Branch: `testing`
- Pre-cutover SHA: `538371304c655e662cfe7f59412a61d727c894fd`
- Pre-fix defect: empty `src/app` broke `tsc` — fixed by single live `src/app` tree

## Validation commands (executed during migration)

| Command | Result |
|---------|--------|
| `npm run validate` | OK — 6 projects, 3 journal, 10 routes, 14 assets |
| `npm run lint` | OK |
| `npm run typecheck` | OK |
| `npm run build` | OK — static `/` + SSG work/journal paths; not `output: 'export'` |
| `npx playwright test e2e/smoke.spec.ts` | OK — 8 passed (home + detail menu + 404) |

## How to add a page

See [routing-and-content.md](./routing-and-content.md).

## How to modify a template

Edit `src/templates/*Template.tsx`. Routes under `src/app` should stay thin.

## How to add a shared component

Place under `src/components/ui` (primitive) or `src/components/layout` (chrome). Do not import `@/content/*`.

## Remaining risks

- Scene recipe bodies in `recipes/scenes.ts` remain `@ts-nocheck` (typed registry + chrome; gradual typing next).
- Recipe cleanups are mostly no-ops for heavy scroll listeners — improve per-recipe teardown when touching a scene.
- `sections/upgrades.css` still mixes cross-section enhancements — fold into section files when editing those areas.
- Visual baselines should be re-checked locally after large CSS edits.
- Lighthouse/CWV not gated in CI — spot-check manually when needed.
- CMS/ISR webhook not implemented (documented in decisions.md).
