import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import JsonLd from '../../components/JsonLd';
import PageShell from '../../components/ui/PageShell';
import StoreBadges from '../../components/StoreBadges';
import Reveal from '../../components/home/Reveal';
import { GAMES, gamePath, getGame } from '../../lib/games';
import { breadcrumbNode, faqNode, gameNode, howToNode } from '../../lib/jsonld';
import { abs } from '../../lib/site';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return GAMES.map((game) => ({ slug: game.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const game = getGame(slug);
  if (!game) return {};

  const title = game.seo?.title ?? `${game.title} - zasady gry i jak grać (${game.players})`;
  const description = game.seo?.description ?? `${game.summary} Za darmo w aplikacji BIFOR na iPhone i Androida.`;

  return {
    title,
    description,
    keywords: game.keywords,
    alternates: { canonical: gamePath(game.slug) },
    openGraph: {
      type: 'article',
      locale: 'pl_PL',
      url: abs(gamePath(game.slug)),
      siteName: 'BIFOR',
      title: game.seo?.title ?? `${game.title} - zasady gry na imprezę`,
      description: game.seo?.description ?? game.summary,
      images: [{ url: game.art, width: 640, height: 857 }]
    },
    twitter: {
      card: 'summary_large_image',
      title: game.seo?.title ?? `${game.title} - zasady gry na imprezę`,
      description: game.seo?.description ?? game.summary
    }
  };
}

const H2 =
  'font-display text-balance text-[clamp(1.75rem,3.6vw,2.5rem)] font-extrabold leading-[1] tracking-[-0.025em]';

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
        { name: 'Gry', path: '/gry' },
        { name: game.title, path: gamePath(game.slug) }
      ])
    ]
  };

  const facts: { label: string; value: string }[] = [
    { label: 'Gracze', value: game.players },
    { label: 'Czas', value: game.duration },
    { label: 'Jak gracie', value: game.modeLabel },
    { label: 'Cena', value: game.categories.premium.length ? 'Za darmo, więcej haseł w BIFOR+' : 'Za darmo, w całości' }
  ];

  return (
    <>
      <JsonLd data={jsonLd} />
      <PageShell>
        <header className="px-6 pt-28 sm:px-8 md:pt-36">
          <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[minmax(0,20rem)_1fr] md:gap-16">
            <div className="overflow-hidden rounded-[1.6rem]">
              <Image
                src={game.art}
                alt={`${game.title} - gra na imprezę w aplikacji BIFOR`}
                width={640}
                height={857}
                priority
                sizes="(max-width: 768px) 100vw, 320px"
                className="h-auto w-full"
              />
            </div>

            <div className="flex flex-col justify-center">
              <nav aria-label="Ścieżka nawigacji" className="text-sm text-on-surface-variant">
                <Link href="/gry" className="transition-colors hover:text-on-surface">
                  Wszystkie gry
                </Link>
              </nav>
              <h1 className="font-display mt-4 text-[clamp(2.5rem,6vw,4.25rem)] font-extrabold leading-[0.95] tracking-[-0.035em]">
                {game.title}
              </h1>
              <p className="mt-3 text-lg font-semibold" style={{ color: game.glow }}>
                {game.tagline}
              </p>
              <p className="mt-5 max-w-xl text-pretty text-lg leading-relaxed text-on-surface-variant">
                {game.summary}
              </p>

              <dl className="mt-8 grid max-w-xl grid-cols-2 gap-x-8 gap-y-5 border-t border-white/[0.08] pt-6">
                {facts.map((fact) => (
                  <div key={fact.label}>
                    <dt className="text-sm text-on-surface-variant">{fact.label}</dt>
                    <dd className="mt-1 font-semibold text-on-surface">{fact.value}</dd>
                  </div>
                ))}
              </dl>

              <StoreBadges className="mt-9" />
            </div>
          </div>
        </header>

        <section id="na-czym-polega" className="px-6 pt-24 sm:px-8 md:pt-32">
          <div className="mx-auto max-w-6xl">
            <h2 className={H2}>Na czym polega {game.title}?</h2>
            <div className="mt-8 max-w-[44rem] space-y-5 text-pretty text-lg leading-relaxed text-on-surface-variant">
              {game.intro.map((paragraph) => (
                <p key={paragraph.slice(0, 24)}>{paragraph}</p>
              ))}
              <p>Najlepiej sprawdza się, gdy {game.bestFor}.</p>
            </div>

            {game.modeArt && (
              <div className="mt-14 grid max-w-4xl gap-6 sm:grid-cols-2">
                {[
                  { art: game.modeArt.local, label: 'Na jednym telefonie' },
                  { art: game.modeArt.online, label: 'Każdy na swoim' }
                ].map((mode) => (
                  <figure key={mode.label}>
                    <div className="overflow-hidden rounded-[1.3rem]">
                      <Image
                        src={mode.art}
                        alt={`${game.title}: ${mode.label.toLowerCase()}`}
                        width={900}
                        height={600}
                        sizes="(max-width: 640px) 100vw, 440px"
                        className="h-auto w-full"
                      />
                    </div>
                  </figure>
                ))}
              </div>
            )}
          </div>
        </section>

        <section id="jak-grac" className="px-6 pt-24 sm:px-8 md:pt-32">
          <div className="mx-auto max-w-6xl">
            <h2 className={H2}>Jak grać w {game.title}</h2>
            <ol className="mt-10 max-w-3xl divide-y divide-white/[0.07]">
              {game.steps.map((step, i) => (
                <li key={step.name} id={`krok-${i + 1}`} className="grid grid-cols-[2.5rem_1fr] gap-4 py-6">
                  <span className="font-display text-xl font-extrabold tabular-nums" style={{ color: game.glow }}>
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-bold tracking-[-0.01em]">{step.name}</h3>
                    <p className="mt-1.5 text-pretty leading-relaxed text-on-surface-variant">{step.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="punktacja" className="px-6 pt-24 sm:px-8 md:pt-32">
          <div className="mx-auto grid max-w-6xl gap-14 md:grid-cols-2">
            <div>
              <h2 className={H2}>Punkty</h2>
              <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-on-surface-variant">{game.scoring}</p>
            </div>
            <div id="kategorie">
              <h2 className={H2}>Kategorie haseł</h2>
              <p className="mt-6 text-on-surface-variant">
                Za darmo: <span className="text-on-surface">{game.categories.free.join(', ')}</span>
              </p>
              {game.categories.premium.length > 0 && (
                <p className="mt-3 text-pretty leading-relaxed text-on-surface-variant">
                  W BIFOR+: <span className="text-on-surface">{game.categories.premium.join(', ')}</span>
                </p>
              )}
            </div>
          </div>
        </section>

        <section id="wskazowki" className="px-6 pt-24 sm:px-8 md:pt-32">
          <div className="mx-auto max-w-6xl">
            <h2 className={H2}>Kilka rad od nas</h2>
            <ul className="mt-8 max-w-3xl space-y-4">
              {game.tips.map((tip) => (
                <li key={tip.slice(0, 24)} className="flex gap-4 text-pretty text-lg leading-relaxed text-on-surface-variant">
                  <span aria-hidden className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: game.glow }} />
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="faq" className="px-6 pt-24 sm:px-8 md:pt-32">
          <div className="mx-auto max-w-6xl">
            <h2 className={H2}>Pytania o {game.title}</h2>
            <div className="mt-8 max-w-3xl divide-y divide-white/[0.07]">
              {game.faq.map((item) => (
                <div key={item.question} className="py-6">
                  <h3 className="font-display text-lg font-bold tracking-[-0.01em]">{item.question}</h3>
                  <p className="mt-2 text-pretty leading-relaxed text-on-surface-variant">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 pt-24 sm:px-8 md:pt-32">
          <div className="relative mx-auto flex max-w-6xl flex-col items-start gap-6 border-t border-white/[0.08] pt-14 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className={H2}>Zagraj w {game.title} ze znajomymi</h2>
              <p className="mt-4 max-w-md text-pretty text-lg leading-relaxed text-on-surface-variant">
                Za darmo, razem z sześcioma innymi grami.
              </p>
            </div>
            <StoreBadges />
            <Reveal from="up" className="pointer-events-none absolute -top-[7.5rem] right-4 hidden w-28 md:block">
              <Image src="/postacie/czeka.webp" alt="" width={319} height={526} className="h-auto w-full" />
            </Reveal>
          </div>
        </section>

        <section id="inne-gry" className="px-6 pb-28 pt-24 sm:px-8 md:pt-28">
          <div className="mx-auto max-w-6xl">
            <h2 className="font-display text-xl font-bold tracking-[-0.01em]">Pozostałe gry w BIFOR</h2>
            <ul className="mt-6 grid grid-cols-3 gap-3 sm:grid-cols-6 sm:gap-4">
              {others.map((other) => (
                <li key={other.slug}>
                  <Link href={gamePath(other.slug)} className="group block">
                    <span className="block overflow-hidden rounded-xl">
                      <Image
                        src={other.art}
                        alt={other.title}
                        width={640}
                        height={857}
                        sizes="(max-width: 640px) 30vw, 160px"
                        className="h-auto w-full transition-transform duration-500 group-hover:scale-[1.04]"
                      />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </PageShell>
    </>
  );
}
