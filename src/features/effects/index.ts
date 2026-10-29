import { initChromeMenu } from './chrome-menu';
import { initThemeToggle } from './theme-toggle';
import { createFxContext, onReducedMotionChange } from './runtime/prefers';
import { mountDeclaredEffects } from './runtime/registry';
import { registerAllRecipes } from './recipes';
import { mountReveal } from './recipes/reveal';
import type { Cleanup } from './runtime/types';

export type { FxRecipe, FxContext, Cleanup, FxCost } from './runtime/types';
export { listRecipes, getRecipe } from './runtime/registry';
export { allRecipes } from './recipes';

/**
 * Facade: chrome + declarative `data-fx` recipes + global reveals.
 * Returns cleanup for HMR / unmount.
 */
export function initSiteEffects(): Cleanup {
  if (typeof window === 'undefined') return () => {};

  registerAllRecipes();
  const ctx = createFxContext();

  const cleanMenu = initChromeMenu();
  const cleanTheme = initThemeToggle();
  const cleanFx = mountDeclaredEffects(document, ctx);
  // Page-wide reveals (Why / heads / principles) — not always wrapped in data-fx="reveal"
  const cleanReveal = mountReveal(null);

  // Live reduced-motion: remount is heavy; reload keeps scene math consistent (hero canvas).
  const unsubMotion = onReducedMotionChange((reduce) => {
    if (reduce !== ctx.reduceMotion) {
      // Match prior hero-fx behavior: prefer a clean slate when OS preference flips.
      window.location.reload();
    }
  });

  return () => {
    unsubMotion();
    cleanReveal();
    cleanFx();
    cleanTheme();
    cleanMenu();
  };
}

export { initChromeMenu } from './chrome-menu';
export { initThemeToggle } from './theme-toggle';
