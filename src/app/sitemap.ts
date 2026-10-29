import type { MetadataRoute } from 'next';
import { getAllRoutes } from '@/lib/content';
import { siteUrl } from '@/lib/site/config';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes = await getAllRoutes();
  return routes.map((route) => ({
    url: `${siteUrl}${route.path === '/' ? '' : route.path}`,
    lastModified: new Date(),
  }));
}
