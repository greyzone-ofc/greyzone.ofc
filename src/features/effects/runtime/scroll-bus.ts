import type { Cleanup } from './types';

export type ScrollListener = (y: number) => void;

/**
 * One passive window scroll listener shared by recipes.
 * Sections should still near-gate before doing heavy work.
 */
export function createScrollBus(): {
  subscribe: (fn: ScrollListener) => Cleanup;
  getY: () => number;
  destroy: Cleanup;
} {
  const listeners = new Set<ScrollListener>();
  let y = typeof window !== 'undefined' ? window.pageYOffset || 0 : 0;
  let ticking = false;

  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      y = window.pageYOffset || 0;
      listeners.forEach((fn) => fn(y));
      ticking = false;
    });
  };

  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  return {
    getY: () => y,
    subscribe(fn) {
      listeners.add(fn);
      return () => {
        listeners.delete(fn);
      };
    },
    destroy() {
      listeners.clear();
      if (typeof window !== 'undefined') {
        window.removeEventListener('scroll', onScroll);
      }
    },
  };
}

export type ScrollBus = ReturnType<typeof createScrollBus>;
