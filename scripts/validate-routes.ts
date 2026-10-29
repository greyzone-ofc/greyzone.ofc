/**
 * Route inventory from content must be unique and well-formed.
 * Run: npx tsx scripts/validate-routes.ts
 */
import { journalPosts } from '../src/content/journal';
import { projects } from '../src/content/projects';

const errors: string[] = [];
const paths = new Set<string>();

function add(path: string) {
  if (paths.has(path)) errors.push(`duplicate route: ${path}`);
  paths.add(path);
}

add('/');
for (const p of projects) add(`/work/${p.slug}`);
for (const j of journalPosts) add(`/journal/${j.slug}`);

const expected = 1 + projects.length + journalPosts.length;
if (paths.size !== expected) {
  errors.push(`expected ${expected} routes, got ${paths.size}`);
}

if (errors.length) {
  console.error('validate-routes FAILED:\n' + errors.map((e) => ` - ${e}`).join('\n'));
  process.exit(1);
}
console.log(`validate-routes OK (${paths.size} routes)`);
for (const p of [...paths].sort()) console.log(`  ${p}`);
