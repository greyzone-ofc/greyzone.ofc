import type { Cleanup, FxContext, FxRecipe } from './types';

const recipes = new Map<string, FxRecipe>();

export function registerRecipe(recipe: FxRecipe): void {
  if (recipes.has(recipe.id)) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn(`[fx] recipe "${recipe.id}" already registered — replacing`);
    }
  }
  recipes.set(recipe.id, recipe);
}

export function registerRecipes(list: FxRecipe[]): void {
  list.forEach(registerRecipe);
}

export function getRecipe(id: string): FxRecipe | undefined {
  return recipes.get(id);
}

export function listRecipes(): FxRecipe[] {
  return [...recipes.values()];
}

/**
 * Mount every `[data-fx]` under `scope` (default: document).
 * Unknown ids are skipped (dev warning).
 */
export function mountDeclaredEffects(
  scope: ParentNode = document,
  ctx: FxContext,
): Cleanup {
  const nodes = scope.querySelectorAll<HTMLElement>('[data-fx]');
  const cleanups: Cleanup[] = [];

  nodes.forEach((el) => {
    const id = el.getAttribute('data-fx')?.trim();
    if (!id) return;
    const recipe = recipes.get(id);
    if (!recipe) {
      if (process.env.NODE_ENV !== 'production') {
        console.warn(`[fx] unknown data-fx="${id}"`, el);
      }
      return;
    }
    if (ctx.reduceMotion && recipe.reducedMotion === 'off') return;
    cleanups.push(recipe.mount(el, ctx));
    el.setAttribute('data-fx-mounted', 'true');
  });

  return () => {
    cleanups.forEach((fn) => {
      try {
        fn();
      } catch {
        /* ignore */
      }
    });
    nodes.forEach((el) => el.removeAttribute('data-fx-mounted'));
  };
}
