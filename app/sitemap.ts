import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/site';
import { getAllProducts } from '@/lib/shop-data';
import { getProjectSlugs } from '@/lib/projects';

export const dynamic = 'force-static';

const STATIC_PATHS = [
  '/',
  '/was-wir-machen',
  '/shop',
  '/projekte',
  '/kontakt',
  '/faq',
  '/impressum',
  '/datenschutz',
  '/agb',
  '/widerruf',
  '/versand-zahlung',
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const staticEntries: MetadataRoute.Sitemap = STATIC_PATHS.map((path) => ({
    url: `${SITE.url}${path}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: path === '/' ? 1 : 0.7,
  }));

  const productEntries: MetadataRoute.Sitemap = getAllProducts().map((p) => ({
    url: `${SITE.url}/shop/${p.handle}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  const projectEntries: MetadataRoute.Sitemap = (await getProjectSlugs()).map((slug) => ({
    url: `${SITE.url}/projekte/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [...staticEntries, ...productEntries, ...projectEntries];
}
