import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { SITE_URL } from '../lib/site';
import PageShell from '../components/ui/PageShell';
import SafariPromptOnLoad from '../components/SafariPromptOnLoad';
import StoreBadges from '../components/StoreBadges';

export const metadata: Metadata = {
  title: 'Pobierz BIFOR - gry na imprezę na iPhone i Androida',
  description:
    'Siedem gier na imprezę po polsku, za darmo. BIFOR pobierzesz z App Store na iPhone i z Google Play na Androida.',
  alternates: { canonical: `${SITE_URL}/pobierz` },
  openGraph: {
    title: 'Pobierz BIFOR',
    description: 'Siedem gier na imprezę po polsku, za darmo. App Store i Google Play.',
    url: `${SITE_URL}/pobierz`
  }
};

export default function DownloadPage() {
  return (
    <PageShell>
      <div className="mx-auto grid min-h-svh max-w-6xl content-center items-center px-6 pt-28 pb-28 sm:px-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] md:gap-6 md:pt-32">
        {/* Grafika kończy się wygaszonym dołem, więc na telefonie nagłówek
            wchodzi na jej dolną część zamiast stać pod nią. */}
        {/* Źródło ma 583 px, więc szerokość ma sufit - większa grafika na
            ekranie Retina wychodziła rozmyta. */}
        <div className="relative mx-auto w-[min(78%,19rem)] md:order-2 md:w-[21rem]">
          <Image
            src="/postacie/macha.webp"
            alt=""
            width={583}
            height={600}
            priority
            sizes="(max-width: 768px) 78vw, 336px"
            className="h-auto w-full"
          />
        </div>

        <div className="relative -mt-14 flex flex-col items-center text-center md:order-1 md:mt-0 md:items-start md:text-left">
          <h1 className="font-display text-[clamp(3rem,9vw,6rem)] leading-[0.92] font-extrabold tracking-[-0.04em] text-balance">
            Pobierz BIFOR
          </h1>
          <p className="text-on-surface-variant mt-6 max-w-md text-lg leading-relaxed text-pretty">
            Siedem gier na imprezę po polsku, za darmo. Wybierz swój sklep.
          </p>

          <StoreBadges className="mt-10 justify-center md:justify-start" />

          <p className="text-on-surface-variant mt-14 max-w-md text-sm leading-relaxed text-pretty">
            Coś nie działa albo masz pomysł na grę? Napisz na{' '}
            <a
              href="mailto:contact@bifor.games"
              className="text-primary decoration-primary/40 hover:decoration-primary underline underline-offset-4"
            >
              contact@bifor.games
            </a>
            . Czytamy każdą wiadomość.
          </p>
          <Link
            href="/gry"
            className="text-on-surface-variant mt-4 text-sm underline decoration-white/20 underline-offset-4 hover:text-on-surface"
          >
            Najpierw zobacz gry
          </Link>
        </div>
      </div>
      <SafariPromptOnLoad />
    </PageShell>
  );
}
