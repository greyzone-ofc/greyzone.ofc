# Styles & effects architecture

## CSS modules (`src/styles/`)

Entry: `index.css` (imported from `app/globals.css`). `site.css` re-exports `index.css` for backwards compatibility.

| Path | Role |
|------|------|
| `tokens.css` | Design tokens (`:root`, themes, `--fx-p`) |
| `base.css` | Reset, body, `.ic`, `.sr`, scrollbar |
| `chrome/` | Header, menu, theme VT, footer, a11y (skip/sprite) |
| `sections/` | One file (or pair) per page section + `detail.css` |
| `responsive.css` | Cross-cutting a11y/type/touch additives (last) |

**Rules**

1. Keep cascade order in `index.css` — do not alphabetize.
2. Section-prefixed BEM (`.svc-`, `.proj-`, …); put enhancements in that section file when practical (`upgrades.css` is transitional).
3. Tokens are the source of truth; Tailwind `@theme` in `globals.css` must stay aligned.
4. Prefer existing tokens over arbitrary values. Do not rewrite the marketing look to utility soup.

## Effects recipes (`src/features/effects/`)

```text
runtime/     types, registry, prefers, scroll-bus, near-gate, math
recipes/     data-fx mounts (stack, arc, circle, …) + scenes.ts bodies
chrome-menu.ts / theme-toggle.ts   typed chrome
index.ts     initSiteEffects facade
```

Markup: `data-fx="<recipe-id>"` on a section root. `SiteEffects` registers recipes and calls `mountDeclaredEffects`.

| `data-fx` | Mount | Cost |
|-----------|-------|------|
| `hero-fx` | canvas / words | heavy |
| `vmask` | video text mask | mid |
| `stack` | services curtain stack | heavy |
| `arc` | projects carousel | heavy |
| `circle` | contact reveal | heavy |
| `brief` | mailto composer | cheap |
| `marquee` | process cards | mid |
| `studio-video` | IO play/pause | cheap |
| `reveal` | `[data-rv]` one-shot | cheap |

**Rules**

1. Query only inside the recipe `root`.
2. One animation owner per CSS property.
3. Native scroll only — no scroll-jacking / Lenis unless product revisits.
4. `prefers-reduced-motion`: use each recipe’s `reducedMotion` strategy.
5. Progressive enhancement for CSS scroll-driven animations via `@supports`; do not ship the incomplete scroll-timeline polyfill as the fallback strategy.

## Scalability gaps addressed

- Monolithic `site.css` → modular tree
- Monolithic home effects → registry + `data-fx`
- Skip-link / sprite moved into `chrome/a11y.css`
- `features/work` public barrel for `ProjectArt`
- Docs point at `(marketing)/work|journal` routes (not phantom root `app/work`)
