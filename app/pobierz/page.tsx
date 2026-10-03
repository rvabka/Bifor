import type { Metadata } from 'next';
import Link from 'next/link';

import { SITE_URL } from '../lib/site';
import DownloadPanel from './DownloadPanel';
import PageShell from '../components/ui/PageShell';
import NewsletterForm from '../components/NewsletterForm';
import { Card } from '../components/ui/Surface';
import { androidPaused } from '../lib/download';

export const metadata: Metadata = {
  title: 'Pobierz Bifor - gry na imprezę na Androida i iPhone',
  description:
    'Siedem gier imprezowych po polsku, za darmo. Na Androida w Google Play, na iPhone w wersji testowej przez TestFlight.',
  alternates: { canonical: `${SITE_URL}/pobierz` },
  openGraph: {
    title: 'Pobierz Bifor',
    description:
      'Siedem gier imprezowych po polsku, za darmo. Android w Google Play, iPhone przez TestFlight.',
    url: `${SITE_URL}/pobierz`
  }
};

export default function DownloadPage() {
  return (
    <PageShell>
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-12 px-6 pt-32 pb-24 text-center md:pt-40">
        <div>
          <p className="text-primary text-[11px] font-semibold tracking-[0.3em] uppercase">
            Za darmo
          </p>
          <h1 className="font-display mt-5 text-[clamp(2.5rem,7vw,4.5rem)] leading-[0.95] font-extrabold tracking-[-0.035em] text-balance">
            Pobierz Bifor
          </h1>
          <p className="text-on-surface-variant mx-auto mt-6 max-w-lg text-base leading-relaxed text-pretty sm:text-lg">
            Siedem gier imprezowych po polsku, za darmo. Na iPhonie trwa jeszcze
            wersja testowa, więc coś może zgrzytnąć - i właśnie o tym chcemy usłyszeć.
          </p>
        </div>

        <DownloadPanel />

        {androidPaused && (
          <section id="powiadom" className="w-full scroll-mt-32">
            <Card className="px-6 py-9 text-center sm:px-10">
              <h2 className="text-xl font-normal tracking-tight sm:text-2xl">
                Damy znać, gdy wejdziemy do Google Play.
              </h2>
              <p className="text-on-surface-variant mx-auto mt-3 max-w-md text-sm leading-relaxed text-pretty">
                Kończymy testy wymagane przez Google przed publikacją. Zostaw adres, a
                dostaniesz jedną wiadomość w dniu, w którym Bifor pojawi się w sklepie.
              </p>

              <NewsletterForm
                submitLabel="Powiadom mnie"
                idleNote="Jedna wiadomość o premierze. Wypisujesz się jednym kliknięciem."
              />
            </Card>
          </section>
        )}

        <p className="text-on-surface-variant max-w-md text-sm leading-relaxed text-pretty">
          Coś nie działa albo apka się wysypała? Napisz na{' '}
          <a
            href="mailto:contact@bifor.games"
            className="text-primary decoration-primary/40 hover:decoration-primary underline underline-offset-4"
          >
            contact@bifor.games
          </a>
          . Każde zgłoszenie realnie zmienia kolejne wersje.
        </p>
      </div>
    </PageShell>
  );
}
