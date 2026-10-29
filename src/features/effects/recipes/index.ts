import type { FxRecipe } from '../runtime/types';
import { registerRecipes } from '../runtime/registry';
import { revealRecipe } from './reveal';
import {
  mountArc,
  mountBrief,
  mountCircle,
  mountHeroFx,
  mountMarquee,
  mountStack,
  mountStudioVideo,
  mountVmask,
} from './scenes';

function recipe(
  id: string,
  cost: FxRecipe['cost'],
  reducedMotion: FxRecipe['reducedMotion'],
  mount: FxRecipe['mount'],
): FxRecipe {
  return { id, cost, reducedMotion, mount };
}

/** All reusable section recipes — ids match `data-fx="<id>"`. */
export const allRecipes: FxRecipe[] = [
  revealRecipe,
  recipe('vmask', 'mid', 'simplify', (root) => mountVmask(root)),
  recipe('stack', 'heavy', 'static', (root) => mountStack(root)),
  recipe('arc', 'heavy', 'static', (root) => mountArc(root)),
  recipe('circle', 'heavy', 'static', (root) => mountCircle(root)),
  recipe('marquee', 'mid', 'static', (root) => mountMarquee(root)),
  recipe('hero-fx', 'heavy', 'simplify', (root) => mountHeroFx(root)),
  recipe('studio-video', 'cheap', 'off', (root) => mountStudioVideo(root)),
  recipe('brief', 'cheap', 'static', (root) => mountBrief(root)),
];

export function registerAllRecipes(): void {
  registerRecipes(allRecipes);
}

export { revealRecipe };
export * from './scenes';
