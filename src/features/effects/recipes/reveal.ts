import type { Cleanup, FxRecipe } from '../runtime/types';
import { prefersReducedMotion } from '../runtime/prefers';

/**
 * One-shot scroll reveals for `[data-rv]`.
 * - Single IntersectionObserver for all targets under root (or document).
 * - Unobserves after fire.
 * - Hash / mid-page: anything already above the fold gets `.in` immediately.
 */
export function mountReveal(root?: HTMLElement | null): Cleanup {
  if (typeof window === 'undefined') return () => {};

  const scope: ParentNode = root ?? document;
  const targets = [
    ...scope.querySelectorAll<HTMLElement>('[data-rv]:not(.in)'),
  ];
  if (targets.length === 0) return () => {};

  const reduce = prefersReducedMotion();

  const revealAboveFold = () => {
    const y = window.pageYOffset || 0;
    const vh = window.innerHeight || 0;
    targets.forEach((el) => {
      const top = el.getBoundingClientRect().top + y;
      if (top < y + vh * 0.92) el.classList.add('in');
    });
  };

  // Deep links / restored scroll: reveal everything already on screen.
  revealAboveFold();

  if (reduce || typeof IntersectionObserver === 'undefined') {
    targets.forEach((el) => el.classList.add('in'));
    return () => {};
  }

  const pending = targets.filter((el) => !el.classList.contains('in'));
  if (pending.length === 0) return () => {};

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        (entry.target as HTMLElement).classList.add('in');
        io.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
  );

  pending.forEach((el) => io.observe(el));

  return () => io.disconnect();
}

export const revealRecipe: FxRecipe = {
  id: 'reveal',
  cost: 'cheap',
  reducedMotion: 'static',
  mount(root) {
    return mountReveal(root);
  },
};
