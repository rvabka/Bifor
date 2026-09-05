import type { MetadataRoute } from 'next';
import { GAMES, gamePath } from './lib/games';
import { abs } from './lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: abs('/'),
      lastModified,
      changeFrequency: 'weekly',
      priority: 1,
      images: [abs('/logo.png')]
    },
    { url: abs('/gry'), lastModified, changeFrequency: 'weekly', priority: 0.9 },
    {
      url: abs('/pobierz'),
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9
    },
    ...GAMES.map((game) => ({
      url: abs(gamePath(game.slug)),
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
      images: [abs(game.art)]
    })),
    { url: abs('/faq'), lastModified, changeFrequency: 'monthly', priority: 0.7 },
    { url: abs('/terms'), lastModified, changeFrequency: 'yearly', priority: 0.3 },
    {
      url: abs('/polityka-prywatnosci'),
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.3
    }
  ];
}
