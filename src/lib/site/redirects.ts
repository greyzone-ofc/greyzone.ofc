/**
 * Slug rename redirects. Empty until a published slug must change.
 * Wire into next.config.ts redirects() when entries are added.
 */
export type ContentRedirect = {
  source: string;
  destination: string;
  permanent: boolean;
};

export const contentRedirects: ContentRedirect[] = [];
