/**
 * Public social profiles — placeholders until real accounts exist.
 * Swap these URLs when LinkedIn / Instagram / X are created, then add
 * verified ones to `verifiedSameAs` for Organization JSON-LD.
 */
export const socialUrls = {
  linkedin: 'https://www.linkedin.com/company/greyzone-ofc',
  instagram: 'https://www.instagram.com/greyzone.ofc',
  /** Live org for this repo. */
  github: 'https://github.com/greyzone-ofc',
  x: 'https://x.com/greyzone_ofc',
} as const;

/** Only profiles that actually exist today. */
export const verifiedSameAs: string[] = [socialUrls.github];
