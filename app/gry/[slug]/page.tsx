import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import JsonLd from '../../components/JsonLd';
import { GAMES, gamePath, getGame } from '../../lib/games';
import {
  breadcrumbNode,
  faqNode,
  gameNode,
  howToNode
} from '../../lib/jsonld';
import { abs } from '../../lib/site';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return GAMES.map((game) => ({ slug: game.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const game = getGame(slug);
  if (!game) return {};

  const title = `${game.title} - zasady gry i jak grać (${game.players})`;
  const description = `${game.summary} Gra dostępna w darmowej aplikacji Bifor na iOS i Android, ${game.modeLabel.toLowerCase()}.`;

  return {
    title,
    description,
    keywords: game.keywords,
    alternates: { canonical: gamePath(game.slug) },
    openGraph: {
      type: 'article',
      locale: 'pl_PL',
      url: abs(gamePath(game.slug)),
      siteName: 'Bifor',
      title: `${game.title} - zasady gry imprezowej`,
      description: game.summary
    },
    twitter: {
      card: 'summary_large_image',
      title: `${game.title} - zasady gry imprezowej`,
      description: game.summary
    }
  };
}

export default async function GamePage({ params }: Props) {
  const { slug } = await params;
  const game = getGame(slug);
  if (!game) notFound();

  const others = GAMES.filter((g) => g.slug !== game.slug);
  const url = abs(gamePath(game.slug));

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      gameNode(game),
      howToNode(game),
      faqNode(game.faq, `${url}#faq`),
      breadcrumbNode([
        { name: 'Strona główna', path: '/' },
        { name: 'Gry imprezowe', path: '/gry' },
        { name: game.title, path: gamePath(game.slug) }
      ])
    ]
  };

  const facts: { label: string; value: string }[] = [
    { label: 'Liczba graczy', value: game.players },
    { label: 'Czas rozgrywki', value: game.duration },
    { label: 'Tryb gry', value: game.modeLabel },
    { label: 'Typ gry', value: game.genre },
    { label: 'Cena', value: 'Darmowa podstawowa kategoria haseł' },
    { label: 'Platformy', value: 'iOS i Android (premiera wkrótce)' }
  ];

  return (
    <>
      <JsonLd data={jsonLd} />
      <Navbar />

      <main className="min-h-screen bg-background pt-28 pb-24">
        <div className="mx-auto max-w-3xl px-4 md:px-8">
          <nav aria-label="Ścieżka nawigacji" className="text-xs text-on-surface-variant">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">
                  Strona główna
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li>
                <Link href="/gry" className="hover:text-primary transition-colors">
                  Gry imprezowe
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li aria-current="page" className="text-on-surface">
                {game.title}
              </li>
            </ol>
          </nav>

          <header className="mt-8 space-y-6">
            <div
              className="relative overflow-hidden rounded-[2rem] border"
              style={{
                borderColor: `${game.glow}40`,
                backgroundColor: `${game.glow}10`,
                boxShadow: `0 30px 60px rgba(0,0,0,0.5), 0 0 60px ${game.glow}26`
              }}
            >
              <Image
                src={game.art}
                alt={`${game.title} - gra imprezowa w aplikacji Bifor`}
                width={800}
                height={500}
                priority
                className="h-56 w-full object-cover object-top sm:h-72"
              />
            </div>

            <div className="space-y-4">
              <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-on-surface-variant">
                {game.genre}
              </p>
              <h1
                className="text-[2.75rem] font-light leading-none tracking-tight sm:text-6xl"
                style={{ color: game.glow, textShadow: `0 0 40px ${game.glow}59` }}
              >
                {game.title}
              </h1>
              <p className="text-lg font-extralight leading-relaxed text-on-surface sm:text-xl">
                {game.summary}
              </p>
            </div>
          </header>

          <section aria-labelledby="fakty" className="mt-12">
            <h2 id="fakty" className="sr-only">
              Najważniejsze informacje o grze {game.title}
            </h2>
            <dl className="grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-white/5 bg-white/5 sm:grid-cols-2">
              {facts.map((fact) => (
                <div key={fact.label} className="bg-background p-5">
                  <dt className="text-[10px] uppercase tracking-[0.2em] text-on-surface-variant">
                    {fact.label}
                  </dt>
                  <dd className="mt-1.5 text-base font-light text-on-surface">
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>
          </section>

          <section aria-labelledby="na-czym-polega" className="mt-14 space-y-4">
            <h2
              id="na-czym-polega"
              className="text-3xl font-light tracking-tight sm:text-4xl"
            >
              Na czym polega {game.title}?
            </h2>
            {game.intro.map((paragraph) => (
              <p
                key={paragraph.slice(0, 24)}
                className="text-base font-extralight leading-relaxed text-on-surface-variant sm:text-lg"
              >
                {paragraph}
              </p>
            ))}
            <p className="text-base font-extralight leading-relaxed text-on-surface-variant sm:text-lg">
              Najlepiej sprawdza się jako {game.bestFor}.
            </p>
          </section>

          <section aria-labelledby="jak-grac" className="mt-14 space-y-6">
            <h2 id="jak-grac" className="text-3xl font-light tracking-tight sm:text-4xl">
              Jak grać w {game.title} - krok po kroku
            </h2>
            <ol className="space-y-4">
              {game.steps.map((step, i) => (
                <li
                  key={step.name}
                  id={`krok-${i + 1}`}
                  className="flex gap-4 rounded-2xl border border-white/5 p-5"
                >
                  <span
                    className="mt-0.5 text-2xl font-light tabular-nums"
                    style={{ color: game.glow }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="space-y-1.5">
                    <h3 className="text-lg font-light tracking-tight">{step.name}</h3>
                    <p className="text-sm font-extralight leading-relaxed text-on-surface-variant sm:text-base">
                      {step.text}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section aria-labelledby="punktacja" className="mt-14 space-y-4">
            <h2 id="punktacja" className="text-3xl font-light tracking-tight sm:text-4xl">
              Punktacja w grze {game.title}
            </h2>
            <p className="text-base font-extralight leading-relaxed text-on-surface-variant sm:text-lg">
              {game.scoring}
            </p>
          </section>

          <section aria-labelledby="wskazowki" className="mt-14 space-y-4">
            <h2 id="wskazowki" className="text-3xl font-light tracking-tight sm:text-4xl">
              Wskazówki i taktyka
            </h2>
            <ul className="space-y-3">
              {game.tips.map((tip) => (
                <li
                  key={tip.slice(0, 24)}
                  className="flex gap-3 text-base font-extralight leading-relaxed text-on-surface-variant sm:text-lg"
                >
                  <span aria-hidden style={{ color: game.glow }}>
                    -
                  </span>
                  {tip}
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="faq-gry" className="mt-14 space-y-6">
            <h2 id="faq-gry" className="text-3xl font-light tracking-tight sm:text-4xl">
              {game.title} - najczęstsze pytania
            </h2>
            <div className="space-y-6">
              {game.faq.map((item) => (
                <div key={item.question} className="space-y-2">
                  <h3 className="text-lg font-light tracking-tight text-on-surface">
                    {item.question}
                  </h3>
                  <p className="text-base font-extralight leading-relaxed text-on-surface-variant">
                    {item.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section
            aria-labelledby="cta"
            className="mt-16 rounded-[2rem] border border-white/5 bg-surface-container p-8 text-center sm:p-10"
          >
            <h2 id="cta" className="text-2xl font-light tracking-tight sm:text-3xl">
              Zagraj w {game.title} ze znajomymi
            </h2>
            <p className="mx-auto mt-3 max-w-md text-base font-extralight leading-relaxed text-on-surface-variant">
              {game.title} to jedna z sześciu gier w aplikacji Bifor. Premiera na iOS i
              Android już wkrótce - zapisz się, żeby dostać powiadomienie pierwszego dnia.
            </p>
            <Link
              href="/#newsletter"
              className="mt-6 inline-block rounded-full bg-primary px-8 py-4 text-sm font-semibold uppercase tracking-[0.15em] text-on-primary transition-transform hover:scale-105 active:scale-95"
            >
              Zapisz się na premierę
            </Link>
          </section>

          <section aria-labelledby="inne-gry" className="mt-16 space-y-6">
            <h2 id="inne-gry" className="text-3xl font-light tracking-tight sm:text-4xl">
              Pozostałe gry imprezowe w Bifor
            </h2>
            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {others.map((other) => (
                <li key={other.slug}>
                  <Link
                    href={gamePath(other.slug)}
                    className="block rounded-2xl border border-white/5 p-5 transition-colors hover:border-white/15"
                  >
                    <span
                      className="text-xl font-light tracking-tight"
                      style={{ color: other.glow }}
                    >
                      {other.title}
                    </span>
                    <span className="mt-1.5 block text-sm font-extralight leading-relaxed text-on-surface-variant">
                      {other.tagline}
                    </span>
                    <span className="mt-2 block text-xs text-on-surface-variant">
                      {other.players} · {other.modeLabel}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <p className="text-sm font-extralight text-on-surface-variant">
              Zobacz też{' '}
              <Link href="/gry" className="text-primary hover:underline">
                pełną listę gier imprezowych na telefon
              </Link>{' '}
              oraz{' '}
              <Link href="/faq" className="text-primary hover:underline">
                odpowiedzi na najczęstsze pytania
              </Link>
              .
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}
