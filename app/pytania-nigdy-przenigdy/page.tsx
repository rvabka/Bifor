import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import JsonLd from '../components/JsonLd';
import PageShell from '../components/ui/PageShell';
import StoreBadges from '../components/StoreBadges';
import Reveal from '../components/home/Reveal';
import { gamePath } from '../lib/games';
import { GUIDE_PATH } from '../lib/guide';
import { breadcrumbNode, faqNode } from '../lib/jsonld';
import {
  NEVER_DESCRIPTION,
  NEVER_FAQ,
  NEVER_INTRO,
  NEVER_PATH,
  NEVER_RULES,
  NEVER_SETS,
  NEVER_TITLE
} from '../lib/never';
import { abs } from '../lib/site';

export const metadata: Metadata = {
  title: NEVER_TITLE,
  description: NEVER_DESCRIPTION,
  alternates: { canonical: NEVER_PATH },
  keywords: [
    'pytania do nigdy przenigdy',
    'nigdy przenigdy pytania',
    'nigdy przenigdy',
    'nigdy przenigdy na imprezę',
    'nigdy przenigdy gra',
    'nigdy przenigdy na telefon'
  ],
  openGraph: {
    type: 'article',
    locale: 'pl_PL',
    url: abs(NEVER_PATH),
    siteName: 'BIFOR',
    title: NEVER_TITLE,
    description: NEVER_DESCRIPTION
  }
};

const H2 =
  'font-display text-balance text-[clamp(1.75rem,3.6vw,2.5rem)] font-extrabold leading-[1] tracking-[-0.025em]';

export default function NeverQuestionsPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        '@id': `${abs(NEVER_PATH)}#artykul`,
        headline: NEVER_TITLE,
        description: NEVER_DESCRIPTION,
        inLanguage: 'pl-PL',
        datePublished: '2026-10-08',
        dateModified: '2026-10-08',
        author: { '@id': `${abs('/')}#organization` },
        publisher: { '@id': `${abs('/')}#organization` },
        mainEntityOfPage: abs(NEVER_PATH)
      },
      ...NEVER_SETS.map((set) => ({
        '@type': 'ItemList',
        '@id': `${abs(NEVER_PATH)}#${set.id}`,
        name: `Pytania do Nigdy przenigdy - ${set.title}`,
        numberOfItems: set.questions.length,
        itemListElement: set.questions.map((q, i) => ({ '@type': 'ListItem', position: i + 1, name: q }))
      })),
      faqNode(NEVER_FAQ, `${abs(NEVER_PATH)}#faq`),
      breadcrumbNode([
        { name: 'Strona główna', path: '/' },
        { name: 'Pytania do Nigdy przenigdy', path: NEVER_PATH }
      ])
    ]
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <PageShell>
        <header className="px-6 pt-28 sm:px-8 md:pt-36">
          <div className="relative mx-auto max-w-6xl lg:min-h-[24rem] xl:min-h-[30rem]">
            <h1 className="font-display max-w-3xl text-balance text-[clamp(2.25rem,5.5vw,4rem)] font-extrabold leading-[0.97] tracking-[-0.035em]">
              Pytania do Nigdy przenigdy
            </h1>
            <div className="mt-6 max-w-[40rem] space-y-4 text-pretty text-lg leading-relaxed text-on-surface-variant">
              {NEVER_INTRO.map((p) => (
                <p key={p.slice(0, 20)}>{p}</p>
              ))}
            </div>
            <nav aria-label="Części listy" className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
              {NEVER_SETS.map((set) => (
                <a
                  key={set.id}
                  href={`#${set.id}`}
                  className="font-display font-bold underline decoration-primary decoration-2 underline-offset-4 hover:text-primary"
                >
                  {set.title} ({set.questions.length})
                </a>
              ))}
            </nav>
            <Reveal from="right" className="pointer-events-none absolute -top-6 right-0 hidden w-[9rem] lg:block xl:w-[11rem]">
              <Image
                src="/postacie/reka.webp"
                alt=""
                width={562}
                height={1600}
                priority
                sizes="176px"
                className="h-auto w-full"
              />
            </Reveal>
          </div>
        </header>

        <section className="px-6 pt-20 sm:px-8 md:pt-24">
          <div className="mx-auto max-w-6xl">
            <h2 className={H2}>Jak grać</h2>
            <ol className="mt-8 grid max-w-5xl gap-x-12 gap-y-6 md:grid-cols-3">
              {NEVER_RULES.map((rule, i) => (
                <li key={rule.name} className="border-t border-white/[0.08] pt-4">
                  <span className="font-display text-lg font-extrabold tabular-nums text-primary">{i + 1}</span>
                  <h3 className="font-display mt-1 font-bold">{rule.name}</h3>
                  <p className="mt-1 text-pretty text-on-surface-variant">{rule.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {NEVER_SETS.map((set) => (
          <section key={set.id} id={set.id} className="scroll-mt-28 px-6 pt-24 sm:px-8 md:pt-32">
            <div className="mx-auto max-w-6xl">
              <h2 className={H2}>{set.title}</h2>
              <p className="mt-3 max-w-2xl text-pretty text-on-surface-variant">{set.note}</p>
              <ol className="mt-8 max-w-3xl divide-y divide-white/[0.07]">
                {set.questions.map((q, i) => (
                  <li key={q} className="grid grid-cols-[2.5rem_1fr] gap-3 py-4">
                    <span className="font-display font-bold tabular-nums text-on-surface-variant/70">{i + 1}</span>
                    <p className="text-pretty text-lg leading-snug">{q}</p>
                  </li>
                ))}
              </ol>
            </div>
          </section>
        ))}

        <section className="px-6 pt-24 sm:px-8 md:pt-32">
          <div className="mx-auto max-w-6xl">
            <h2 className={H2}>Wersja na telefon</h2>
            <p className="mt-6 max-w-3xl text-pretty text-lg leading-relaxed text-on-surface-variant">
              W BIFOR Nigdy przenigdy to jedna z dziewięciu rund w grze{' '}
              <Link
                href={gamePath('sekrety')}
                className="text-on-surface underline decoration-primary decoration-2 underline-offset-4 hover:text-primary"
              >
                Sekrety
              </Link>
              . Każdy odpowiada na swoim telefonie, a wynik pokazuje się dopiero, gdy odpowie cała ekipa. Zdania losują się
              same i nie powtarzają między grami, a apka liczy punkty za was.
            </p>
            <StoreBadges className="mt-8" />
          </div>
        </section>

        <section id="faq" className="px-6 pt-24 sm:px-8 md:pt-32">
          <div className="mx-auto max-w-6xl">
            <h2 className={H2}>Częste pytania</h2>
            <div className="mt-8 max-w-3xl divide-y divide-white/[0.07]">
              {NEVER_FAQ.map((item) => (
                <div key={item.question} className="py-6">
                  <h3 className="font-display text-lg font-bold tracking-[-0.01em]">{item.question}</h3>
                  <p className="mt-2 text-pretty leading-relaxed text-on-surface-variant">{item.answer}</p>
                </div>
              ))}
            </div>
            <p className="mt-6 max-w-3xl text-pretty leading-relaxed text-on-surface-variant">
              Szukacie innych gier na wieczór? Zajrzyjcie do poradnika{' '}
              <Link href={GUIDE_PATH} className="text-on-surface underline decoration-white/25 underline-offset-4 hover:decoration-primary">
                w co zagrać na imprezie
              </Link>
              .
            </p>
          </div>
        </section>

        <section className="px-6 pb-28 pt-24 sm:px-8 md:pt-32">
          <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 border-t border-white/[0.08] pt-14 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className={H2}>Zagrajcie w to na telefonach</h2>
              <p className="mt-4 text-on-surface-variant">
                Za darmo na iPhone i Androida. W BIFOR jest siedem gier na imprezę, a Nigdy przenigdy to tylko jedna z rund.
              </p>
            </div>
            <StoreBadges />
          </div>
        </section>
      </PageShell>
    </>
  );
}
