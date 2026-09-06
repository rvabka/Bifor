/* eslint-disable @next/next/no-img-element */
import type { Metadata } from 'next';

import { SITE_URL } from '../lib/site';
import Link from 'next/link';
import DownloadPanel from './DownloadPanel';
import AmbientWash from '../components/ui/AmbientWash';

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
    <main className="relative min-h-screen overflow-hidden bg-background px-6 py-20 sm:py-28">
      <AmbientWash />

      <div className="relative mx-auto flex max-w-2xl flex-col items-center gap-12 text-center">
        <Link href="/" className="inline-block">
          <img src="/logo.png" alt="Bifor" className="mx-auto h-11 w-auto" />
        </Link>

        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-primary">
            Otwarte testy
          </p>
          <h1 className="font-display mt-5 text-balance text-[clamp(2.5rem,7vw,4.5rem)] font-extrabold leading-[0.95] tracking-[-0.035em]">
            Pobierz Bifor
          </h1>
          <p className="mx-auto mt-6 max-w-lg text-pretty text-base leading-relaxed text-on-surface-variant sm:text-lg">
            Siedem gier imprezowych po polsku, za darmo. Wersja testowa, więc coś
            może jeszcze zgrzytnąć - i właśnie o tym chcemy usłyszeć.
          </p>
        </div>

        <DownloadPanel />

        <p className="max-w-md text-pretty text-sm leading-relaxed text-on-surface-variant">
          Coś nie działa albo apka się wysypała? Napisz na{' '}
          <a
            href="mailto:kontakt@bifor.games"
            className="text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary"
          >
            kontakt@bifor.games
          </a>
          . Każde zgłoszenie z bety realnie zmienia to, co trafi do premiery.
        </p>

        <Link
          href="/"
          className="text-sm text-on-surface-variant transition-colors hover:text-on-surface"
        >
          Wróć na stronę główną
        </Link>
      </div>
    </main>
  );
}
