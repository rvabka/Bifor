import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import JsonLd from '../../components/JsonLd';
import PageShell, { PageHero, Prose } from '../../components/ui/PageShell';
import { Card, Section, SectionHead } from '../../components/ui/Surface';
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
    { label: 'Platformy', value: 'iOS i Android (otwarta beta)' }
  ];

  return (
    <>
      <JsonLd data={jsonLd} />
      <PageShell>
        <PageHero eyebrow={game.genre} title={game.title} lead={game.summary}>
          <nav aria-label="Ścieżka nawigacji" className="mt-10 text-xs text-on-surface-variant">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="transition-colors hover:text-primary">
                  Strona główna
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li>
                <Link href="/gry" className="transition-colors hover:text-primary">
                  Gry imprezowe
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li aria-current="page" className="text-on-surface">
                {game.title}
              </li>
            </ol>
          </nav>
        </PageHero>

        <Section>
          <div className="grid gap-6 md:grid-cols-[minmax(0,22rem)_1fr] md:items-start">
            <Card accent={game.glow}>
              <Image
                src={game.art}
                alt={`${game.title} - gra imprezowa w aplikacji Bifor`}
                width={800}
                height={1071}
                priority
                sizes="(max-width: 768px) 100vw, 352px"
                className="h-auto w-full"
              />
            </Card>

            <div>
              <h2 className="sr-only">Najważniejsze informacje o grze {game.title}</h2>
              <dl className="grid gap-3 sm:grid-cols-2 sm:gap-4">
                {facts.map((fact) => (
                  <Card key={fact.label} className="p-5 sm:p-6">
                    <dt className="text-[10px] font-semibold uppercase tracking-[0.2em] text-on-surface-variant">
                      {fact.label}
                    </dt>
                    <dd className="font-display mt-2 text-base font-bold text-on-surface">
                      {fact.value}
                    </dd>
                  </Card>
                ))}
              </dl>
            </div>
          </div>
        </Section>

        <Section id="na-czym-polega">
          <SectionHead eyebrow="Zasady" title={`Na czym polega ${game.title}?`} />
          <div className="mt-10">
            <Prose>
              {game.intro.map((paragraph) => (
                <p key={paragraph.slice(0, 24)}>{paragraph}</p>
              ))}
              <p>Najlepiej sprawdza się jako {game.bestFor}.</p>
            </Prose>
          </div>
        </Section>

        <Section id="jak-grac">
          <SectionHead eyebrow="Krok po kroku" title={`Jak grać w ${game.title}`} />
          <ol className="mt-12 grid gap-4 sm:gap-6 md:grid-cols-2">
            {game.steps.map((step, i) => (
              <Card key={step.name} as="li" className="p-6 sm:p-7">
                <div id={`krok-${i + 1}`} className="flex gap-5">
                  <span
                    className="font-display text-2xl font-extrabold tabular-nums leading-none"
                    style={{ color: game.glow }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-bold tracking-[-0.01em]">
                      {step.name}
                    </h3>
                    <p className="mt-2 text-pretty text-sm leading-relaxed text-on-surface-variant">
                      {step.text}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </ol>
        </Section>

        <Section id="punktacja">
          <SectionHead eyebrow="Punkty" title={`Punktacja w grze ${game.title}`} />
          <div className="mt-10">
            <Prose>
              <p>{game.scoring}</p>
            </Prose>
          </div>
        </Section>

        <Section id="wskazowki">
          <SectionHead eyebrow="Taktyka" title="Wskazówki i taktyka" />
          <ul className="mt-12 grid gap-4 sm:gap-6 md:grid-cols-2">
            {game.tips.map((tip) => (
              <Card key={tip.slice(0, 24)} as="li" className="p-6 sm:p-7">
                <p className="text-pretty text-sm leading-relaxed text-on-surface-variant sm:text-base">
                  {tip}
                </p>
              </Card>
            ))}
          </ul>
        </Section>

        <Section id="faq-gry">
          <SectionHead eyebrow="FAQ" title={`${game.title} - najczęstsze pytania`} />
          <ul className="mt-12 grid gap-4 sm:gap-6 md:grid-cols-2">
            {game.faq.map((item) => (
              <Card key={item.question} as="li" className="p-6 sm:p-7">
                <h3 className="font-display text-lg font-bold tracking-[-0.01em]">
                  {item.question}
                </h3>
                <p className="mt-3 text-pretty text-sm leading-relaxed text-on-surface-variant">
                  {item.answer}
                </p>
              </Card>
            ))}
          </ul>
        </Section>

        <Section id="cta">
          <Card accent={game.glow} className="px-6 py-14 text-center sm:px-12 sm:py-16">
            <h2 className="font-display text-balance text-[clamp(1.75rem,4.5vw,2.75rem)] font-extrabold leading-[0.98] tracking-[-0.03em]">
              Zagraj w {game.title} ze znajomymi
            </h2>
            <p className="mx-auto mt-5 max-w-md text-pretty text-base leading-relaxed text-on-surface-variant">
              {game.title} to jedna z siedmiu gier w aplikacji Bifor. Otwarta beta na
              iOS i Androida jest już do pobrania, a podstawowa rozgrywka jest darmowa.
            </p>
            <Link
              href="/pobierz"
              className="mt-9 inline-flex h-14 items-center justify-center gap-3 rounded-full bg-primary px-9 text-base font-semibold text-on-primary shadow-[0_20px_60px_-25px_rgba(255,178,0,0.7)] transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
            >
              Pobierz za darmo
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </Card>
        </Section>

        <Section id="inne-gry">
          <SectionHead eyebrow="Reszta biblioteki" title="Pozostałe gry imprezowe w Bifor" />
          <ul className="mt-12 grid gap-4 sm:gap-6 md:grid-cols-3">
            {others.map((other) => (
              <Card key={other.slug} as="li" accent={other.glow}>
                <Link href={gamePath(other.slug)} className="block p-6 sm:p-7">
                  <span
                    className="font-display block text-xl font-bold tracking-[-0.02em]"
                    style={{ color: other.glow }}
                  >
                    {other.title}
                  </span>
                  <span className="mt-2 block text-pretty text-sm leading-relaxed text-on-surface-variant">
                    {other.tagline}
                  </span>
                  <span className="mt-5 block border-t border-white/[0.07] pt-4 text-xs text-on-surface-variant">
                    {other.players} - {other.modeLabel}
                  </span>
                </Link>
              </Card>
            ))}
          </ul>
          <p className="mt-8 text-sm text-on-surface-variant">
            Zobacz też{' '}
            <Link href="/gry" className="text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary">
              pełną listę gier imprezowych na telefon
            </Link>{' '}
            oraz{' '}
            <Link href="/faq" className="text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary">
              odpowiedzi na najczęstsze pytania
            </Link>
            .
          </p>
        </Section>
      </PageShell>
    </>
  );
}
