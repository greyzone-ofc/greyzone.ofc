import type { Cleanup } from './types';

/**
 * IntersectionObserver gate — call `onChange(true|false)` when root enters/leaves
 * the viewport (with margin). Recipes should skip scroll work when far.
 */
export function observeNear(
  root: Element,
  onChange: (near: boolean) => void,
  rootMargin = '120px 0px',
): Cleanup {
  if (typeof IntersectionObserver === 'undefined') {
    onChange(true);
    return () => {};
  }

  let near = false;
  const io = new IntersectionObserver(
    (entries) => {
      const next = Boolean(entries[0]?.isIntersecting);
      if (next === near) return;
      near = next;
      onChange(near);
    },
    { root: null, rootMargin, threshold: 0 },
  );
  io.observe(root);
  return () => io.disconnect();
}
