import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import FAQSection from '../components/FAQSection';
import { faqs } from '../components/faq-data';
import Footer from '../components/Footer';
import JsonLd from '../components/JsonLd';
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
      <Navbar />
      <main className="min-h-screen pt-10">
        <FAQSection />

        <section className="bg-background pb-20">
          <div className="mx-auto max-w-3xl px-4 md:px-8">
            <h2 className="text-2xl font-light tracking-tight sm:text-3xl">
              Pytania o konkretne gry
            </h2>
            <p className="mt-3 text-base font-extralight leading-relaxed text-on-surface-variant">
              Zasady, punktacja i osobne FAQ każdej z siedmiu gier znajdują się na jej
              stronie.
            </p>
            <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {GAMES.map((game) => (
                <li key={game.slug}>
                  <Link
                    href={gamePath(game.slug)}
                    className="block rounded-2xl border border-white/5 p-4 transition-colors hover:border-white/15"
                  >
                    <span className="font-light" style={{ color: game.glow }}>
                      Jak grać w {game.title}?
                    </span>
                    <span className="mt-1 block text-xs text-on-surface-variant">
                      {game.players} · {game.modeLabel}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-8 text-sm font-extralight text-on-surface-variant">
              Nie znalazłeś odpowiedzi? Napisz na{' '}
              <a
                href="mailto:kontakt@bifor.games"
                className="text-primary hover:underline"
              >
                kontakt@bifor.games
              </a>
              .
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
