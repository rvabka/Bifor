import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Bifor — Gry imprezowe na telefon',
    short_name: 'Bifor',
    description:
      'Gry imprezowe na telefon. Stwórz lobby kodem PIN i grajcie razem ze znajomymi.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0a0a0a',
    theme_color: '#0a0a0a',
    lang: 'pl',
    categories: ['games', 'entertainment'],
    icons: [{ src: '/logo.png', sizes: 'any', type: 'image/png', purpose: 'any' }]
  };
}
