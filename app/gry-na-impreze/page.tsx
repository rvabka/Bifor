import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import JsonLd from '../components/JsonLd';
import PageShell from '../components/ui/PageShell';
import StoreBadges from '../components/StoreBadges';
import Reveal from '../components/home/Reveal';
import { gamePath } from '../lib/games';
import { GUIDE_FAQ, GUIDE_GAMES, GUIDE_INTRO, GUIDE_PATH, GUIDE_PICKS, GUIDE_PLAN } from '../lib/guide';
import { breadcrumbNode, faqNode } from '../lib/jsonld';
import { PARTY_PATH } from '../lib/party';
import { abs } from '../lib/site';

const TITLE = 'W co zagrać na imprezie? 10 gier na domówkę, z telefonem i bez';
const DESCRIPTION =
  'Dziesięć sprawdzonych gier na imprezę i domówkę: Czółko, kalambury, Zakazane słowa, Impostor, Państwa Miasta, Nigdy przenigdy i inne. Ile osób, co trzeba mieć i od czego zacząć.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: GUIDE_PATH },
  keywords: ['gry na imprezę', 'gry na domówkę', 'w co zagrać na imprezie', 'gry imprezowe bez niczego', 'gry towarzyskie dla dorosłych'],
  openGraph: {
    type: 'article',
    locale: 'pl_PL',
    url: abs(GUIDE_PATH),
    siteName: 'BIFOR',
    title: TITLE,
    description: DESCRIPTION
  }
};

const H2 =
  'font-display text-balance text-[clamp(1.75rem,3.6vw,2.5rem)] font-extrabold leading-[1] tracking-[-0.025em]';

export default function GuidePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        '@id': `${abs(GUIDE_PATH)}#artykul`,
        headline: TITLE,
        description: DESCRIPTION,
        inLanguage: 'pl-PL',
        datePublished: '2026-10-06',
        dateModified: '2026-10-06',
        author: { '@id': `${abs('/')}#organization` },
        publisher: { '@id': `${abs('/')}#organization` },
        mainEntityOfPage: abs(GUIDE_PATH)
      },
      {
        '@type': 'ItemList',
        '@id': `${abs(GUIDE_PATH)}#lista`,
        name: 'Gry na imprezę',
        numberOfItems: GUIDE_GAMES.length,
        itemListElement: GUIDE_GAMES.map((g, i) => ({ '@type': 'ListItem', position: i + 1, name: g.name, description: g.text }))
      },
      faqNode(GUIDE_FAQ, `${abs(GUIDE_PATH)}#faq`),
      breadcrumbNode([
        { name: 'Strona główna', path: '/' },
        { name: 'W co zagrać na imprezie', path: GUIDE_PATH }
      ])
    ]
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <PageShell>
        <header className="px-6 pt-28 sm:px-8 md:pt-36">
          <div className="relative mx-auto max-w-6xl lg:min-h-[24rem] xl:min-h-[35rem]">
            <h1 className="font-display max-w-3xl text-balance text-[clamp(2.25rem,5.5vw,4rem)] font-extrabold leading-[0.97] tracking-[-0.035em]">
              W co zagrać na imprezie?
            </h1>
            <div className="mt-6 max-w-[42rem] space-y-4 text-pretty text-lg leading-relaxed text-on-surface-variant">
              {GUIDE_INTRO.map((p) => (
                <p key={p.slice(0, 20)}>{p}</p>
              ))}
            </div>
            {/* Odbity, żeby wskazywał w dół na listę, a nie poza ekran. */}
            <Reveal from="right" className="pointer-events-none absolute -top-4 -right-6 hidden w-[17rem] lg:block xl:-top-6 xl:w-[25rem]">
              <Image
                src="/postacie/wskazuje.webp"
                alt=""
                width={1101}
                height={1600}
                priority
                sizes="(max-width: 1280px) 272px, 400px"
                className="h-auto w-full -scale-x-100"
              />
            </Reveal>
          </div>
        </header>

        <section className="px-6 pt-20 sm:px-8 md:pt-24">
          <div className="mx-auto max-w-6xl">
            <h2 className={H2}>Szybki wybór</h2>
            <dl className="mt-8 grid max-w-5xl gap-x-12 gap-y-6 md:grid-cols-2">
              {GUIDE_PICKS.map((pick) => (
                <div key={pick.situation} className="border-t border-white/[0.08] pt-4">
                  <dt className="font-display font-bold">{pick.situation}</dt>
                  <dd className="mt-1 text-on-surface-variant">{pick.games}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="px-6 pt-24 sm:px-8 md:pt-32">
          <div className="mx-auto max-w-6xl">
            <h2 className={H2}>Dziesięć gier, które działają</h2>
            <ol className="mt-10 max-w-3xl space-y-12">
              {GUIDE_GAMES.map((game, i) => (
                <li key={game.name} className="grid grid-cols-[2.5rem_1fr] gap-4">
                  <span className="font-display text-xl font-extrabold tabular-nums text-primary">{i + 1}</span>
                  <div>
                    <h3 className="font-display text-xl font-bold tracking-[-0.01em]">{game.name}</h3>
                    <p className="mt-1 text-sm text-on-surface-variant/80">
                      {game.players}. Potrzebujecie: {game.needs}.
                    </p>
                    <p className="mt-3 text-pretty text-lg leading-relaxed text-on-surface-variant">{game.text}</p>
                    {game.bifor && (
                      <p className="mt-3 text-pretty">
                        <Link
                          href={gamePath(game.bifor.slug)}
                          className="text-on-surface underline decoration-primary decoration-2 underline-offset-4 hover:text-primary"
                        >
                          {game.bifor.note}
                        </Link>
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="px-6 pt-24 sm:px-8 md:pt-32">
          <div className="mx-auto max-w-6xl">
            <h2 className={H2}>Jak ułożyć wieczór</h2>
            <dl className="mt-8 max-w-3xl divide-y divide-white/[0.07]">
              {GUIDE_PLAN.map((step) => (
                <div key={step.when} className="grid gap-2 py-5 sm:grid-cols-[11rem_1fr] sm:gap-6">
                  <dt className="font-display font-bold">{step.when}</dt>
                  <dd className="text-pretty leading-relaxed text-on-surface-variant">{step.what}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-6 max-w-3xl text-pretty leading-relaxed text-on-surface-variant">
              Jeśli chcecie zwycięzcy całego wieczoru, liczcie miejsca w każdej grze albo włączcie{' '}
              <Link href={PARTY_PATH} className="text-on-surface underline decoration-white/25 underline-offset-4 hover:decoration-primary">
                Wieczór BIFOR
              </Link>
              , który ułoży zestaw i policzy tabelę za was.
            </p>
          </div>
        </section>

        <section id="faq" className="px-6 pt-24 sm:px-8 md:pt-32">
          <div className="mx-auto max-w-6xl">
            <h2 className={H2}>Częste pytania</h2>
            <div className="mt-8 max-w-3xl divide-y divide-white/[0.07]">
              {GUIDE_FAQ.map((item) => (
                <div key={item.question} className="py-6">
                  <h3 className="font-display text-lg font-bold tracking-[-0.01em]">{item.question}</h3>
                  <p className="mt-2 text-pretty leading-relaxed text-on-surface-variant">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 pb-28 pt-24 sm:px-8 md:pt-32">
          <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 border-t border-white/[0.08] pt-14 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className={H2}>Większość z nich jest w BIFOR</h2>
              <p className="mt-4 text-on-surface-variant">Za darmo na iPhone i Androida.</p>
            </div>
            <StoreBadges />
          </div>
        </section>
      </PageShell>
    </>
  );
}
