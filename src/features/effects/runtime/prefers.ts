import type { FxContext } from './types';

export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function supportsScrollDrivenAnimations(): boolean {
  if (typeof window === 'undefined' || !window.CSS?.supports) return false;
  // Chrome guidance: require animation-range to filter partial support.
  return (
    CSS.supports('animation-timeline: scroll()') &&
    CSS.supports('animation-range: 0% 100%')
  );
}

export function createFxContext(): FxContext {
  return {
    reduceMotion: prefersReducedMotion(),
    supportsSda: supportsScrollDrivenAnimations(),
  };
}

/** Subscribe to live reduced-motion changes. Returns unsubscribe. */
export function onReducedMotionChange(
  handler: (reduce: boolean) => void,
): () => void {
  if (typeof window === 'undefined') return () => {};
  const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
  const listener = () => handler(mq.matches);
  mq.addEventListener('change', listener);
  return () => mq.removeEventListener('change', listener);
}
