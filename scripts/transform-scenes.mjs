/**
 * One-shot: wrap legacy home IIFEs as named mount* exports for the fx registry.
 */
import fs from 'node:fs';

const path = 'src/features/effects/recipes/scenes.ts';
// Always start from legacy source of truth
const legacy = fs.readFileSync(
  'src/features/effects/legacy-home-effects.ts',
  'utf8',
);

function extractIifeAfter(src, needle) {
  const start = src.indexOf(needle);
  if (start < 0) throw new Error('missing needle: ' + needle);
  const iife = src.indexOf('(function () {', start);
  if (iife < 0) throw new Error('missing iife after: ' + needle);
  const openBrace = src.indexOf('{', iife);
  let depth = 0;
  let i = openBrace;
  for (; i < src.length; i++) {
    if (src[i] === '{') depth++;
    else if (src[i] === '}') {
      depth--;
      if (depth === 0) break;
    }
  }
  const close = src.indexOf('})();', i);
  if (close < 0) throw new Error('missing })(); after: ' + needle);
  return {
    body: src.slice(openBrace + 1, i),
    end: close + '})();'.length,
    start,
  };
}

function stripEarlyReturn(body) {
  // convert bare `return;` inside mounts to `return noop;`
  return body.replace(/\breturn;\b/g, 'return noop;');
}

const mounts = [];

function add(exportName, needle, prelude, bodyTransform = (b) => b) {
  const { body } = extractIifeAfter(legacy, needle);
  const transformed = stripEarlyReturn(bodyTransform(body));
  mounts.push(`
export function ${exportName}(root) {
  if (typeof window === 'undefined') return noop;
${prelude}
${transformed}
  return noop;
}
`);
}

add(
  'mountVmask',
  '/* ===== VIDEO TEXT MASK ===== */',
  `  var wrap = (root && (root.matches('[data-vmask]') ? root : root.querySelector('[data-vmask]'))) || document.querySelector('[data-vmask]');`,
  (b) => b.replace(/var wrap = document\.querySelector\('\[data-vmask\]'\);\s*/, ''),
);

add(
  'mountStack',
  '/* ===== SERVICES: curtain-led card stack ===== */',
  `  var sec = (root && (root.id === 'services' || root.classList.contains('services') ? root : root.querySelector('.services,#services'))) || document.getElementById('services');`,
  (b) => b.replace(/var sec = document\.getElementById\('services'\);\s*/, ''),
);

add(
  'mountArc',
  '/* ===== PROJECTS: curtain reveal + velocity arc carousel ===== */',
  `  var sec = (root && (root.classList.contains('projects') ? root : root.querySelector('.projects'))) || document.querySelector('.projects');`,
  (b) => b.replace(/var sec = document\.querySelector\('\.projects'\);\s*/, ''),
);

add(
  'mountCircle',
  '/* ===== CONTACT: circle reveal from bottom centre ===== */',
  `  var sec = (root && (root.classList.contains('contact') ? root : root.querySelector('.contact'))) || document.querySelector('.contact');`,
  (b) => b.replace(/var sec = document\.querySelector\('\.contact'\);\s*/, ''),
);

add(
  'mountMarquee',
  '/* ===== HOW WE BUILD: card marquee + pause ===== */',
  `  var sec = (root && (root.id === 'process' || root.classList.contains('build') ? root : root.querySelector('.build,#process'))) || document.querySelector('.build');`,
  (b) =>
    b.replace(
      /var sec = document\.querySelector\('\.build'\);\s*if \(!sec\) return noop;\s*/,
      '  if (!sec) return noop;\n',
    ).replace(
      /var sec = document\.querySelector\('\.build'\);\s*if \(!sec\) return;\s*/,
      '  if (!sec) return noop;\n',
    ),
);

add(
  'mountHeroFx',
  '/* ===== HERO FX: reactive dot field, rotating service word, live console, count-ups ===== */',
  `  var banner = (root && (root.id === 'HeroBanner' ? root : root.querySelector('#HeroBanner'))) || document.getElementById('HeroBanner');
  var hero = (root && (root.classList && root.classList.contains('hero-area') ? root : root.querySelector('.hero-area'))) || document.querySelector('.hero-area');`,
  (b) =>
    b.replace(
      /var banner = document\.getElementById\('HeroBanner'\), hero = document\.querySelector\('\.hero-area'\);\s*/,
      '',
    ),
);

add(
  'mountStudioVideo',
  '/* Studio showreel:',
  `  var v = (root && root.querySelector && root.querySelector('.studio-video')) || document.querySelector('.studio-video');`,
  (b) => b.replace(/var v = document\.querySelector\('\.studio-video'\);\s*/, ''),
);

// Brief only (no reveal) — extract and strip reveal part
{
  const { body } = extractIifeAfter(
    legacy,
    '/* ===== Brief builder + shared reveal ===== */',
  );
  // Keep only form/btn sync; drop [data-rv] reveal (owned by mountReveal)
  let brief = body.replace(
    /var form = document\.getElementById\('briefForm'\), btn = document\.getElementById\('briefBtn'\),\s*sum = document\.getElementById\('briefSummary'\);\s*/,
    '',
  );
  // Remove reveal block at end
  brief = brief.replace(
    /var rv = \[\]\.slice\.call\(document\.querySelectorAll\('\[data-rv\]'\)\);[\s\S]*$/,
    '',
  );
  brief = stripEarlyReturn(brief);
  mounts.push(`
export function mountBrief(root) {
  if (typeof window === 'undefined') return noop;
  var form = (root && root.querySelector && root.querySelector('#briefForm')) || document.getElementById('briefForm');
  var btn = (root && root.querySelector && root.querySelector('#briefBtn')) || document.getElementById('briefBtn');
  var sum = (root && root.querySelector && root.querySelector('#briefSummary')) || document.getElementById('briefSummary');
${brief}
  return noop;
}
`);
}

const out = `// @ts-nocheck
/* Home-section DOM effects — recipe mounts (generated from legacy-home-effects). */
const noop = () => {};

${mounts.join('\n')}

/** @deprecated Prefer data-fx recipe mounts via the registry. */
export function initHomeSectionEffects() {
  mountVmask(null);
  mountStack(null);
  mountArc(null);
  mountCircle(null);
  mountMarquee(null);
  mountHeroFx(null);
  mountStudioVideo(null);
  mountBrief(null);
}
`;

fs.writeFileSync(path, out);
console.log('Wrote', path, 'chars', out.length);
