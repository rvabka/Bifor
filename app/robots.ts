import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: 'https://bifor.games/sitemap.xml',
    host: 'https://bifor.games'
  };
}
