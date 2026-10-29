/**
 * Content integrity: required fields, unique slugs, non-empty strings.
 * Run: npx tsx scripts/validate-content.ts
 */
import { existsSync } from 'node:fs';
import path from 'node:path';
import { journalPosts } from '../src/content/journal';
import { processSteps } from '../src/content/process';
import { projects } from '../src/content/projects';

const errors: string[] = [];
const slugRe = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function req(cond: unknown, msg: string) {
  if (!cond) errors.push(msg);
}

const projectSlugs = new Set<string>();
for (const p of projects) {
  req(p.slug && slugRe.test(p.slug), `project bad slug: ${p.slug}`);
  req(p.title?.trim(), `project ${p.slug}: missing title`);
  req(p.seoTitle?.trim(), `project ${p.slug}: missing seoTitle`);
  req(p.seoDescription?.trim(), `project ${p.slug}: missing seoDescription`);
  req(p.artSvgId, `project ${p.slug}: missing artSvgId`);
  if (projectSlugs.has(p.slug)) errors.push(`duplicate project slug: ${p.slug}`);
  projectSlugs.add(p.slug);
}

const journalSlugs = new Set<string>();
for (const j of journalPosts) {
  req(j.slug && slugRe.test(j.slug), `journal bad slug: ${j.slug}`);
  req(j.title?.trim(), `journal ${j.slug}: missing title`);
  req(j.seoTitle?.trim(), `journal ${j.slug}: missing seoTitle`);
  req(j.image?.startsWith('/'), `journal ${j.slug}: image must be root-relative`);
  if (journalSlugs.has(j.slug)) errors.push(`duplicate journal slug: ${j.slug}`);
  journalSlugs.add(j.slug);
  const assetPath = path.join(process.cwd(), 'public', j.image.replace(/^\//, ''));
  req(existsSync(assetPath), `journal ${j.slug}: missing asset ${j.image}`);
}

for (const step of processSteps) {
  const assetPath = path.join(process.cwd(), 'public', step.image.replace(/^\//, ''));
  req(existsSync(assetPath), `process ${step.step}: missing asset ${step.image}`);
}

if (errors.length) {
  console.error('validate-content FAILED:\n' + errors.map((e) => ` - ${e}`).join('\n'));
  process.exit(1);
}
console.log(`validate-content OK (${projects.length} projects, ${journalPosts.length} journal)`);
