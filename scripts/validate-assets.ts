/**
 * Ensure referenced public assets exist.
 * Run: npx tsx scripts/validate-assets.ts
 */
import { existsSync } from 'node:fs';
import path from 'node:path';
import { journalPosts } from '../src/content/journal';
import { processSteps } from '../src/content/process';
import { studio } from '../src/content/studio';

const errors: string[] = [];
const assets = [
  '/assets/logo.png',
  '/assets/hero-mask.webm',
  '/assets/hero-mask.mp4',
  studio.videoUrl,
  studio.videoPoster,
  ...processSteps.map((s) => s.image),
  ...journalPosts.map((j) => j.image),
];

for (const asset of assets) {
  const full = path.join(process.cwd(), 'public', asset.replace(/^\//, ''));
  if (!existsSync(full)) errors.push(`missing: ${asset}`);
}

if (errors.length) {
  console.error('validate-assets FAILED:\n' + errors.map((e) => ` - ${e}`).join('\n'));
  process.exit(1);
}
console.log(`validate-assets OK (${assets.length} checked)`);
