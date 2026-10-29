/** Cleanup returned by every recipe / chrome effect. */
export type Cleanup = () => void;

export type FxCost = 'cheap' | 'mid' | 'heavy';

/** How the recipe behaves under prefers-reduced-motion. */
export type ReducedMotionStrategy = 'static' | 'simplify' | 'off';

export type FxContext = {
  reduceMotion: boolean;
  /** CSS scroll-driven animations (animation-timeline: scroll()). */
  supportsSda: boolean;
};

export type FxRecipe = {
  /** Stable id — matches `data-fx="<id>"` on a section root. */
  id: string;
  cost: FxCost;
  reducedMotion: ReducedMotionStrategy;
  /**
   * Mount against a section root. Query only inside `root`.
   * Must be idempotent enough for HMR (cleanup then remount).
   */
  mount: (root: HTMLElement, ctx: FxContext) => Cleanup;
};
