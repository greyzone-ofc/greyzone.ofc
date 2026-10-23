'use client';

import { useEffect } from 'react';
import { initSiteEffects } from '@/lib/site-effects';

/** Mounts the original marketing-page interaction scripts after hydration. */
export function SiteEffects() {
  useEffect(() => {
    document.documentElement.classList.add('js');
    initSiteEffects();
  }, []);

  return null;
}
