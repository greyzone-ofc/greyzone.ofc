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

- Home section effects still largely in `@ts-nocheck` legacy module (menu + theme are typed).
- Visual baselines should be re-checked locally after large CSS edits.
- Lighthouse/CWV not gated in CI — spot-check manually when needed.
- CMS/ISR webhook not implemented (documented in decisions.md).
