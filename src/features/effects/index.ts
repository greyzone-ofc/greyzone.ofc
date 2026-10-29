import { initChromeMenu } from './chrome-menu';
import { initHomeSectionEffects } from './legacy-home-effects';
import { initThemeToggle } from './theme-toggle';

/** Facade: chrome + home sections + theme. Returns cleanup for HMR/unmount. */
export function initSiteEffects(): () => void {
  if (typeof window === 'undefined') return () => {};
  const cleanMenu = initChromeMenu();
  initHomeSectionEffects();
  const cleanTheme = initThemeToggle();
  return () => {
    cleanMenu();
    cleanTheme();
  };
}

export { initChromeMenu } from './chrome-menu';
export { initThemeToggle } from './theme-toggle';
