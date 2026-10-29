# Effects-related CSS

Scroll / motion **behavior** lives in `src/features/effects/` (recipes + runtime).

Section **look** for those effects stays next to the section styles:

| Effect (`data-fx`) | Primary CSS |
|--------------------|-------------|
| `hero-fx` / `vmask` | `sections/hero.css`, `sections/vmask.css` |
| `stack` | `sections/services.css` |
| `arc` | `sections/projects.css` |
| `circle` / `brief` | `sections/contact.css`, `sections/upgrades.css` |
| `marquee` | `sections/process.css` |
| `studio-video` | `sections/studio-journal.css` |
| `reveal` (`[data-rv]`) | reveal rules inside section / upgrades CSS |

Recipes may publish `--fx-p` (0–1) on the section root for CSS to consume under `@supports (animation-timeline: scroll())` later. Do not add a second animation owner on the same property.
