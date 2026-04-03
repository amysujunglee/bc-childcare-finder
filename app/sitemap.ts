import type { MetadataRoute } from 'next';
import { centres } from '@/lib/mock-data';
import { slugify } from '@/lib/utils';

const BASE_URL = 'https://find-care-bc.vercel.app';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, priority: 1 },
    { url: `${BASE_URL}/find`, priority: 0.9 },
    { url: `${BASE_URL}/about`, priority: 0.6 },
    { url: `${BASE_URL}/contact`, priority: 0.5 },
  ];

  const centreRoutes: MetadataRoute.Sitemap = centres.map((centre) => ({
    url: `${BASE_URL}/centre/${slugify(centre.name)}`,
    priority: 0.8,
  }));

  return [...staticRoutes, ...centreRoutes];
}
