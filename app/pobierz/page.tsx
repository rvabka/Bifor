import type { Metadata } from 'next';

import { SITE_URL } from '../lib/site';
import DownloadPanel from './DownloadPanel';

export const metadata: Metadata = {
  title: 'Pobierz Bifor - beta na iOS i Androida',
  description:
    'Zainstaluj Bifor w wersji beta. Siedem gier imprezowych po polsku, za darmo - na iPhone przez TestFlight, na Androida bezpośrednio z pliku.',
  alternates: { canonical: `${SITE_URL}/pobierz` },
  openGraph: {
    title: 'Pobierz Bifor - beta',
    description:
      'Siedem gier imprezowych po polsku. Zainstaluj wersję beta na iPhone lub Androida.',
    url: `${SITE_URL}/pobierz`
  }
};

export default function DownloadPage() {
  return (
    <main className="min-h-screen bg-background px-5 py-16 sm:py-24">
      <div className="max-w-2xl mx-auto flex flex-col items-center text-center gap-10">
        <a href="/" className="inline-block">
          <img src="/logo.png" alt="Bifor" className="h-11 w-auto mx-auto" />
        </a>

        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold tracking-[0.2em] uppercase">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Otwarte testy
          </div>
          <h1 className="text-balance text-[2.5rem] sm:text-6xl font-light tracking-tight leading-[1.05]">
            Pobierz <span className="text-primary font-normal">Bifor</span>
          </h1>
          <p className="text-on-surface-variant text-lg font-extralight leading-relaxed max-w-lg mx-auto">
            Siedem gier imprezowych po polsku, za darmo. Wersja testowa, więc
            coś może jeszcze zgrzytnąć - i właśnie o tym chcemy usłyszeć.
          </p>
        </div>

        <DownloadPanel />

        <p className="text-on-surface-variant text-sm font-extralight max-w-md">
          Coś nie działa albo apka się wysypała? Napisz na{' '}
          <a
            href="mailto:kontakt@bifor.games"
            className="text-primary hover:underline"
          >
            kontakt@bifor.games
          </a>
          . Każde zgłoszenie z bety realnie zmienia to, co trafi do premiery.
        </p>

        <a
          href="/"
          className="text-on-surface-variant text-sm font-light hover:text-on-surface transition-colors"
        >
          Wróć na stronę główną
        </a>
      </div>
    </main>
  );
}
