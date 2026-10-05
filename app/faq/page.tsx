import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { faqs } from '../components/faq-data';
import JsonLd from '../components/JsonLd';
import PageShell, { PageHero } from '../components/ui/PageShell';
import StoreBadges from '../components/StoreBadges';
import { GAMES, gamePath } from '../lib/games';
import { breadcrumbNode, faqNode } from '../lib/jsonld';
import { abs } from '../lib/site';

export const metadata: Metadata = {
  title: 'FAQ - pytania o aplikację BIFOR z grami na imprezę',
  description:
    'Gdzie pobrać BIFOR, czy jest darmowy, co daje BIFOR+, ile osób może grać, czy działa bez internetu i jak dołączyć do pokoju znajomych.',
  alternates: { canonical: '/faq' },
  openGraph: {
    type: 'website',
    locale: 'pl_PL',
    url: abs('/faq'),
    siteName: 'BIFOR',
    title: 'FAQ - pytania o aplikację BIFOR',
    description: 'Pobieranie, cena, liczba graczy, tryby gry i pokoje z kodem.'
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
        <PageHero
          title="Pytania i odpowiedzi"
          lead="Wszystko o BIFOR w jednym miejscu. Zasady konkretnych gier znajdziesz na ich stronach."
        />

        <section id="faq" className="px-6 pt-10 sm:px-8">
          <div className="relative mx-auto max-w-6xl">
            <div className="max-w-3xl divide-y divide-white/[0.07]">
              {faqs.map((item) => (
                <div key={item.question} className="py-6">
                  <h2 className="font-display text-lg font-bold tracking-[-0.01em]">{item.question}</h2>
                  <p className="mt-2 text-pretty leading-relaxed text-on-surface-variant">{item.answer}</p>
                </div>
              ))}
            </div>
            <Image
              src="/postacie/reka.webp"
              alt=""
              width={300}
              height={855}
              className="pointer-events-none absolute right-0 top-4 hidden h-auto w-24 lg:block"
            />
          </div>
        </section>

        <section className="px-6 pt-20 sm:px-8">
          <div className="mx-auto max-w-6xl">
            <h2 className="font-display text-xl font-bold">Zasady gier</h2>
            <p className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
              {GAMES.map((game) => (
                <Link
                  key={game.slug}
                  href={gamePath(game.slug)}
                  className="text-on-surface underline decoration-white/25 underline-offset-4 hover:decoration-primary"
                >
                  {game.title}
                </Link>
              ))}
            </p>
          </div>
        </section>

        <section className="px-6 pb-28 pt-20 sm:px-8">
          <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 border-t border-white/[0.08] pt-14 md:flex-row md:items-center md:justify-between">
            <p className="max-w-md text-pretty text-on-surface-variant">
              Nie ma tu twojego pytania? Napisz na{' '}
              <a href="mailto:contact@bifor.games" className="text-on-surface underline decoration-white/25 underline-offset-4">
                contact@bifor.games
              </a>
              .
            </p>
            <StoreBadges />
          </div>
        </section>
      </PageShell>
    </>
  );
}
