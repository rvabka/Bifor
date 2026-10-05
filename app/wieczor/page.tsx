import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import JsonLd from '../components/JsonLd';
import PageShell from '../components/ui/PageShell';
import StoreBadges from '../components/StoreBadges';
import Reveal from '../components/home/Reveal';
import { breadcrumbNode, faqNode } from '../lib/jsonld';
import { PARTY_PATH, PARTY_POINTS, PARTY_PRESETS, PARTY_TITLES } from '../lib/party';
import { abs } from '../lib/site';

export const metadata: Metadata = {
  title: 'Wieczór BIFOR - kilka gier na imprezę i jedna tabela',
  description:
    'Apka układa zestaw 3, 5 albo 8 gier pod waszą ekipę, prowadzi was gra po grze i liczy jedną tabelę na cały wieczór. Na koniec gala z tytułami.',
  alternates: { canonical: PARTY_PATH },
  openGraph: {
    type: 'article',
    locale: 'pl_PL',
    url: abs(PARTY_PATH),
    siteName: 'BIFOR',
    title: 'Wieczór BIFOR - kilka gier, jedna tabela',
    description: 'Zestaw gier pod waszą ekipę, punkty za miejsca i gala na koniec.',
    images: [{ url: '/wieczor/hero.webp', width: 900, height: 1125 }]
  }
};

const STEPS = [
  {
    name: 'Wybieracie długość',
    text: 'Szybki set, Wieczór albo Maraton. Albo układacie zestaw sami, w dowolnej kolejności.'
  },
  {
    name: 'Apka dobiera gry',
    text: 'Pod liczbę osób w pokoju. Gra, której wasza ekipa nie uciągnie, sama wypada z zestawu.'
  },
  {
    name: 'Gracie gra po grze',
    text: 'Po każdej grze widzicie tabelę i zapowiedź następnej. Prowadzący może pominąć grę albo skończyć wcześniej.'
  },
  {
    name: 'Gala',
    text: 'Zwycięzca wieczoru, pełna klasyfikacja i tytuły dla reszty ekipy. Wynik można wrzucić na story.'
  }
];

const FAQ = [
  {
    question: 'Jak działa Wieczór BIFOR?',
    answer:
      'Apka układa zestaw kilku gier pod liczbę osób, prowadzi was przez nie po kolei i liczy jedną wspólną tabelę. Za miejsce w każdej grze są punkty: 10, 7, 5, 4, 3, 2 i 1. Na koniec jest gala z tytułami.'
  },
  {
    question: 'Ile trwa Wieczór BIFOR?',
    answer:
      'Szybki set to 3 gry i około 25 minut, Wieczór 5 gier i około 40 minut, Maraton 8 gier i około 65 minut. Możecie też ułożyć zestaw sami.'
  },
  {
    question: 'Czy do Wieczoru trzeba mieć każdy swój telefon?',
    answer:
      'Tak. Wieczór działa w pokoju online: prowadzący zakłada pokój (potrzebuje konta), a reszta dołącza kodem albo kodem QR.'
  },
  {
    question: 'Dlaczego punkty są za miejsce, a nie za wynik?',
    answer:
      'Bo gry mają zupełnie różne skale. W Państwach Miastach zdobywa się po kilkadziesiąt punktów na rundę, w Czółku po kilka. Punkty za miejsce sprawiają, że każda gra waży tyle samo.'
  }
];

const H2 =
  'font-display text-balance text-[clamp(1.75rem,3.6vw,2.5rem)] font-extrabold leading-[1] tracking-[-0.025em]';

export default function PartyPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'HowTo',
        '@id': `${abs(PARTY_PATH)}#howto`,
        name: 'Jak zorganizować wieczór gier z Wieczorem BIFOR',
        inLanguage: 'pl-PL',
        tool: [{ '@type': 'HowToTool', name: 'Aplikacja BIFOR na telefonie każdego gracza' }],
        step: STEPS.map((s, i) => ({ '@type': 'HowToStep', position: i + 1, name: s.name, text: s.text }))
      },
      faqNode(FAQ, `${abs(PARTY_PATH)}#faq`),
      breadcrumbNode([
        { name: 'Strona główna', path: '/' },
        { name: 'Wieczór BIFOR', path: PARTY_PATH }
      ])
    ]
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <PageShell>
        <header className="px-6 pt-28 sm:px-8 md:pt-36">
          <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-[1fr_0.8fr] md:gap-16">
            <div>
              <p className="text-sm font-semibold text-primary">Wieczór BIFOR</p>
              <h1 className="font-display mt-4 text-balance text-[clamp(2.5rem,6vw,4.5rem)] font-extrabold leading-[0.95] tracking-[-0.035em]">
                Kilka gier, jedna tabela.
              </h1>
              <p className="mt-6 max-w-lg text-pretty text-lg leading-relaxed text-on-surface-variant">
                Zamiast pytać co pół godziny, w co teraz, wybieracie długość wieczoru. Apka układa zestaw
                gier pod waszą ekipę, prowadzi was gra po grze i liczy punkty za miejsca. Do ostatniej gry
                nie wiadomo, kto wygra.
              </p>
              <StoreBadges className="mt-9" />
            </div>
            <div className="overflow-hidden rounded-[1.8rem]">
              <Image
                src="/wieczor/hero.webp"
                alt="Duet z aplikacji BIFOR z pucharem za wygrany wieczór"
                width={900}
                height={1125}
                priority
                sizes="(max-width: 768px) 100vw, 440px"
                className="h-auto w-full"
              />
            </div>
          </div>
        </header>

        <section className="px-6 pt-24 sm:px-8 md:pt-32">
          <div className="mx-auto max-w-6xl">
            <h2 className={H2}>Ile chcecie grać?</h2>
            <ul className="mt-10 grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-6 md:grid-cols-4">
              {PARTY_PRESETS.map((preset) => (
                <li key={preset.id}>
                  <div className="overflow-hidden rounded-[1.3rem]">
                    <Image src={preset.art} alt={preset.name} width={520} height={696} sizes="(max-width: 768px) 46vw, 270px" className="h-auto w-full" />
                  </div>
                  <p className="mt-3 text-sm text-on-surface-variant">
                    {preset.games ? `${preset.games} ${preset.games < 5 ? 'gry' : 'gier'}, ${preset.time}` : 'własny zestaw, w waszej kolejności'}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="px-6 pt-24 sm:px-8 md:pt-32">
          <div className="mx-auto max-w-6xl">
            <h2 className={H2}>Jak to wygląda</h2>
            <ol className="mt-10 max-w-3xl divide-y divide-white/[0.07]">
              {STEPS.map((step, i) => (
                <li key={step.name} className="grid grid-cols-[2.5rem_1fr] gap-4 py-6">
                  <span className="font-display text-xl font-extrabold tabular-nums text-primary">{i + 1}</span>
                  <div>
                    <h3 className="font-display text-lg font-bold">{step.name}</h3>
                    <p className="mt-1.5 text-pretty leading-relaxed text-on-surface-variant">{step.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="px-6 pt-24 sm:px-8 md:pt-32">
          <div className="mx-auto grid max-w-6xl gap-14 md:grid-cols-2">
            <div>
              <h2 className={H2}>Punkty za miejsce</h2>
              <p className="mt-6 max-w-md text-pretty text-lg leading-relaxed text-on-surface-variant">
                Gry mają różne skale, więc liczy się tylko to, które miejsce zajmujesz w każdej z nich.
              </p>
              <ol className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
                {PARTY_POINTS.map((points, i) => (
                  <li key={i} className="text-on-surface-variant">
                    <span className="font-display text-2xl font-extrabold text-on-surface tabular-nums">{points}</span>{' '}
                    za {i + 1}.
                  </li>
                ))}
              </ol>
            </div>
            <div className="relative">
              <h2 className={H2}>Tytuły wieczoru</h2>
              <p className="mt-6 max-w-md text-pretty text-lg leading-relaxed text-on-surface-variant">
                Zwycięzca ma puchar, a reszta ekipy może dostać jeden z tytułów. Najwyżej trzy na wieczór.
              </p>
              <dl className="mt-8 space-y-4">
                {PARTY_TITLES.map((title) => (
                  <div key={title.name}>
                    <dt className="font-display font-bold">{title.name}</dt>
                    <dd className="text-sm text-on-surface-variant">{title.text}</dd>
                  </div>
                ))}
              </dl>
              <Reveal from="right" className="pointer-events-none absolute -top-10 right-0 hidden w-24 lg:block">
                <Image src="/postacie/puchar.webp" alt="" width={360} height={820} className="h-auto w-full" />
              </Reveal>
            </div>
          </div>
        </section>

        <section id="faq" className="px-6 pt-24 sm:px-8 md:pt-32">
          <div className="mx-auto max-w-6xl">
            <h2 className={H2}>Pytania o Wieczór</h2>
            <div className="mt-8 max-w-3xl divide-y divide-white/[0.07]">
              {FAQ.map((item) => (
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
              <h2 className={H2}>Zbierzcie ekipę</h2>
              <p className="mt-4 text-on-surface-variant">
                Wieczór gracie każdy na swoim telefonie.{' '}
                <Link href="/gry" className="text-on-surface underline decoration-white/25 underline-offset-4 hover:decoration-primary">
                  Zobacz gry
                </Link>
              </p>
            </div>
            <StoreBadges />
          </div>
        </section>
      </PageShell>
    </>
  );
}
