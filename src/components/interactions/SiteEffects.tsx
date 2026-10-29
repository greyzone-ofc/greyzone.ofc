'use client';

import { useEffect } from 'react';
import { initSiteEffects } from '@/features/effects';

/** Mounts marketing interaction scripts after hydration; cleans up on unmount. */
export function SiteEffects() {
  useEffect(() => {
    document.documentElement.classList.add('js');
    const cleanup = initSiteEffects();
    return () => {
      cleanup();
      document.documentElement.classList.remove('js');
    };
  }, []);

  return null;
}
