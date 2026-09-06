import type { Metadata } from 'next';
import Link from 'next/link';
import FAQSection from '../components/FAQSection';
import { faqs } from '../components/faq-data';
import JsonLd from '../components/JsonLd';
import PageShell from '../components/ui/PageShell';
import { Card, Section, SectionHead } from '../components/ui/Surface';
import { GAMES, gamePath } from '../lib/games';
import { breadcrumbNode, faqNode } from '../lib/jsonld';
import { abs } from '../lib/site';

export const metadata: Metadata = {
  title: 'FAQ - pytania o gry imprezowe w aplikacji Bifor',
  description:
    'Odpowiedzi na najczęstsze pytania o Bifor: jakie gry imprezowe zawiera, dla ilu graczy, czy jest darmowy, czy działa bez internetu, jak dołączyć kodem pokoju i kiedy premiera.',
  alternates: { canonical: '/faq' },
  openGraph: {
    type: 'website',
    locale: 'pl_PL',
    url: abs('/faq'),
    siteName: 'Bifor',
    title: 'FAQ - pytania o gry imprezowe w aplikacji Bifor',
    description:
      'Liczba graczy, tryby gry, cena, premiera i dołączanie kodem pokoju - wszystko w jednym miejscu.'
  }
};

export default function FAQPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      faqNode(faqs, `${abs('/faq')}#faq`),
      breadcrumbNode([
        { name: 'Strona główna', path: '/' },
        { name: 'FAQ', path: '/faq' }
      ])
    ]
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <PageShell>
        <FAQSection />

        <Section>
          <SectionHead
            eyebrow="Zasady gier"
            title="Pytania o konkretne gry"
            lead="Zasady, punktacja i osobne FAQ każdej z siedmiu gier znajdują się na jej stronie."
          />
          <ul className="mt-12 grid gap-4 sm:gap-6 md:grid-cols-2">
            {GAMES.map((game) => (
              <Card key={game.slug} as="li" accent={game.glow}>
                <Link href={gamePath(game.slug)} className="block p-6 sm:p-7">
                  <span
                    className="font-display block text-lg font-bold tracking-[-0.01em]"
                    style={{ color: game.glow }}
                  >
                    Jak grać w {game.title}?
                  </span>
                  <span className="mt-4 block border-t border-white/[0.07] pt-4 text-xs text-on-surface-variant">
                    {game.players} - {game.modeLabel}
                  </span>
                </Link>
              </Card>
            ))}
          </ul>
          <p className="mt-10 text-sm text-on-surface-variant">
            Nie znalazłeś odpowiedzi? Napisz na{' '}
            <a
              href="mailto:kontakt@bifor.games"
              className="text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary"
            >
              kontakt@bifor.games
            </a>
            .
          </p>
        </Section>
      </PageShell>
    </>
  );
}
