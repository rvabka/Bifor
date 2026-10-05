import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { SITE_URL } from '../lib/site';
import PageShell from '../components/ui/PageShell';
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
      <div className="mx-auto flex max-w-2xl flex-col items-center px-6 pt-32 pb-28 text-center md:pt-40">
        <Image
          src="/postacie/macha.webp"
          alt=""
          width={440}
          height={449}
          priority
          className="h-auto w-36 sm:w-44"
        />
        <h1 className="font-display mt-6 text-[clamp(2.5rem,7vw,4.5rem)] leading-[0.95] font-extrabold tracking-[-0.035em] text-balance">
          Pobierz BIFOR
        </h1>
        <p className="text-on-surface-variant mx-auto mt-6 max-w-md text-lg leading-relaxed text-pretty">
          Siedem gier na imprezę po polsku, za darmo. Wybierz swój sklep.
        </p>

        <StoreBadges center className="mt-10" />

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
    </PageShell>
  );
}
