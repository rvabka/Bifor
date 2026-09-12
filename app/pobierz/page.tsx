import type { Metadata } from 'next';
import Link from 'next/link';

import { SITE_URL } from '../lib/site';
import DownloadPanel from './DownloadPanel';
import PageShell from '../components/ui/PageShell';
import NewsletterForm from '../components/NewsletterForm';
import { Card } from '../components/ui/Surface';
import { androidPaused, androidViaBetaTest } from '../lib/download';

export const metadata: Metadata = {
  title: 'Pobierz Bifor - beta na iPhone i Androida',
  description:
    'Zainstaluj Bifor w wersji beta. Siedem gier imprezowych po polsku, za darmo - na iPhone przez TestFlight, na Androida przez testy w Google Play.',
  alternates: { canonical: `${SITE_URL}/pobierz` },
  openGraph: {
    title: 'Pobierz Bifor - beta',
    description:
      'Siedem gier imprezowych po polsku. Zainstaluj wersję beta na iPhone albo Androida.',
    url: `${SITE_URL}/pobierz`
  }
};

export default function DownloadPage() {
  return (
    <PageShell>
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-12 px-6 pt-32 pb-24 text-center md:pt-40">
        <div>
          <p className="text-primary text-[11px] font-semibold tracking-[0.3em] uppercase">
            Wersja testowa
          </p>
          <h1 className="font-display mt-5 text-[clamp(2.5rem,7vw,4.5rem)] leading-[0.95] font-extrabold tracking-[-0.035em] text-balance">
            Pobierz Bifor
          </h1>
          <p className="text-on-surface-variant mx-auto mt-6 max-w-lg text-base leading-relaxed text-pretty sm:text-lg">
            Siedem gier imprezowych po polsku, za darmo. Wersja testowa, więc coś
            może jeszcze zgrzytnąć - i właśnie o tym chcemy usłyszeć.
          </p>
        </div>

        <DownloadPanel />

        {androidViaBetaTest && (
          <Card accent="#3DDC84" className="px-6 py-10 text-center sm:px-10 sm:py-12">
            <p className="text-[11px] font-semibold tracking-[0.3em] text-[#3DDC84] uppercase">
              Android
            </p>
            <h2 className="font-display mt-4 text-[clamp(1.6rem,4.5vw,2.4rem)] leading-[1.02] font-extrabold tracking-[-0.03em] text-balance">
              Trzy kroki i grasz.
            </h2>
            <p className="text-on-surface-variant mx-auto mt-4 max-w-md text-sm leading-relaxed text-pretty sm:text-base">
              Bifor jest już w Google Play, ale na czas testów wpuszczamy przez
              listę testerów. Zapisujesz się sam, w minutę, bez czekania na zgodę.
              Prowadzimy przez to krok po kroku.
            </p>
            <Link
              href="/test"
              className="bg-primary text-on-primary font-display mt-8 inline-flex items-center justify-center rounded-2xl px-7 py-4 text-base font-extrabold transition-transform duration-200 hover:scale-[1.02] active:scale-[0.99]"
            >
              Jak dołączyć do testów
            </Link>
          </Card>
        )}

        <section id="powiadom" className="w-full scroll-mt-32">
          <Card className="px-6 py-9 text-center sm:px-10">
            <h2 className="text-xl font-normal tracking-tight sm:text-2xl">
              {androidPaused
                ? 'Damy znać, gdy wejdziemy do Google Play.'
                : 'Wolisz poczekać na zwykłą wersję?'}
            </h2>
            <p className="text-on-surface-variant mx-auto mt-3 max-w-md text-sm leading-relaxed text-pretty">
              {androidPaused
                ? 'Kończymy testy wymagane przez Google przed publikacją. Zostaw adres, a dostaniesz jedną wiadomość w dniu, w którym Bifor pojawi się w sklepie.'
                : 'Za kilka tygodni Bifor będzie w Google Play normalnie, bez zapisywania się na nic. Zostaw adres, a dostaniesz jedną wiadomość tego dnia.'}
            </p>

            <NewsletterForm
              submitLabel="Powiadom mnie"
              idleNote="Jedna wiadomość o premierze. Wypisujesz się jednym kliknięciem."
            />
          </Card>
        </section>

        <p className="text-on-surface-variant max-w-md text-sm leading-relaxed text-pretty">
          Coś nie działa albo apka się wysypała? Napisz na{' '}
          <a
            href="mailto:contact@bifor.games"
            className="text-primary decoration-primary/40 hover:decoration-primary underline underline-offset-4"
          >
            contact@bifor.games
          </a>
          . Każde zgłoszenie z bety realnie zmienia to, co trafi do premiery.
        </p>
      </div>
    </PageShell>
  );
}
