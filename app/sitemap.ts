import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://bifor.games';
  const lastModified = new Date();
  return [
    { url: `${base}/`, lastModified, changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/faq`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    {
      url: `${base}/polityka-prywatnosci`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.3
    }
  ];
}
