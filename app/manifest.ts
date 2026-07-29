import type { MetadataRoute } from 'next';
import { SHORT_DESCRIPTION } from './lib/site';

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: '/',
    name: 'Bifor - gry imprezowe na telefon',
    short_name: 'Bifor',
    description: SHORT_DESCRIPTION,
    start_url: '/',
    scope: '/',
    display: 'standalone',
    background_color: '#0a0a0a',
    theme_color: '#0a0a0a',
    lang: 'pl',
    dir: 'ltr',
    categories: ['games', 'entertainment', 'social'],
    icons: [{ src: '/logo.png', sizes: 'any', type: 'image/png', purpose: 'any' }]
  };
}
