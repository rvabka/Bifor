import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import JsonLd from '../components/JsonLd';
import PageShell, { PageHero } from '../components/ui/PageShell';
import StoreBadges from '../components/StoreBadges';
import { GAMES, gamePath } from '../lib/games';
import { breadcrumbNode, faqNode, gamesItemListNode } from '../lib/jsonld';
import { PARTY_PATH } from '../lib/party';
import { abs } from '../lib/site';

export const metadata: Metadata = {
  title: 'Gry na imprezę i domówkę - 7 gier w aplikacji BIFOR',
  description:
    'Czółko, Zakazane, Impostor, Sekrety, Państwa Miasta, Gra na P i Szybka Trójka. Zasady, liczba graczy, czas i która gra pasuje do jakiej ekipy.',
  keywords: [
    'gry imprezowe',
    'gry imprezowe na telefon',
    'gry na domówkę',
    'gry ze znajomymi',
    'gry towarzyskie',
    'gry na imprezę bez planszy',
    'gry imprezowe online',
    'gry na jednym telefonie'
  ],
  alternates: { canonical: '/gry' },
  openGraph: {
    type: 'website',
    locale: 'pl_PL',
    url: abs('/gry'),
    siteName: 'BIFOR',
    title: 'Gry na imprezę w aplikacji BIFOR',
    description: 'Siedem gier w jednej aplikacji: zasady, liczba graczy i jak gracie.'
  }
};

const CHOICES: { question: string; answer: string; slugs: string[] }[] = [
  {
    question: 'Jest was dwoje',
    answer: 'Czółko, Gra na P, Szybka Trójka i Państwa Miasta działają od dwóch osób.',
    slugs: ['czolko', 'gra-na-p', 'szybka-trojka', 'panstwa-miasta']
  },
  {
    question: 'Jest was dziesięcioro',
    answer: 'Zakazane dzieli wszystkich na drużyny, a w Sekretach i Szybkiej Trójce nikt nie czeka długo na swoją kolej.',
    slugs: ['zakazane', 'sekrety', 'szybka-trojka']
  },
  {
    question: 'Macie jeden telefon',
    answer: 'Pięć gier działa na jednym telefonie podawanym w kółko, także bez internetu.',
    slugs: ['czolko', 'zakazane', 'impostor', 'gra-na-p', 'szybka-trojka']
  },
  {
    question: 'Ekipa się nie zna',
    answer: 'Sekrety: anonimowe odpowiedzi, „Kto z nas” i „Nigdy przenigdy”. Zacznijcie od kategorii Na luzie.',
    slugs: ['sekrety']
  },
  {
    question: 'Lubicie się kłócić',
    answer: 'Impostor, czyli szukanie kłamcy, i Państwa Miasta, gdzie głosujecie, czy hasło się liczy.',
    slugs: ['impostor', 'panstwa-miasta']
  },
  {
    question: 'Macie dziesięć minut',
    answer: 'Szybka Trójka albo jedno kółko Gry na P. Krótkie tury, można skończyć w każdej chwili.',
    slugs: ['szybka-trojka', 'gra-na-p']
  }
];

const HUB_FAQ = [
  {
    question: 'Ile gier jest w aplikacji BIFOR?',
    answer:
      'Siedem: Czółko, Zakazane, Impostor, Sekrety, Państwa Miasta, Gra na P i Szybka Trójka. Do tego Wieczór BIFOR, który łączy kilka z nich w jeden wieczór z jedną tabelą.'
  },
  {
    question: 'Czy gry w BIFOR są darmowe?',
    answer:
      'Tak, wszystkie. Każda ma darmowe kategorie haseł, a dodatkowe są w opcjonalnej subskrypcji BIFOR+. W pokoju wystarczy, że ma ją osoba prowadząca.'
  },
  {
    question: 'Czy trzeba zakładać konto?',
    answer:
      'Do gry na jednym telefonie i do dołączenia do pokoju nie. Konto zakłada osoba, która tworzy pokój online.'
  },
  {
    question: 'Ile osób może grać jednocześnie?',
    answer:
      'Czółko 2-8, Impostor 3-8, Zakazane 4-10, Sekrety 3-10, Państwa Miasta, Gra na P i Szybka Trójka 2-10. Pokój online mieści do 12 osób.'
  }
];

const H2 =
  'font-display text-balance text-[clamp(1.75rem,3.6vw,2.5rem)] font-extrabold leading-[1] tracking-[-0.025em]';

export default function GamesHubPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      gamesItemListNode,
      faqNode(HUB_FAQ, `${abs('/gry')}#faq`),
      breadcrumbNode([
        { name: 'Strona główna', path: '/' },
        { name: 'Gry', path: '/gry' }
      ])
    ]
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <PageShell>
        <PageHero
          title="Gry na imprezę"
          lead="Siedem gier w jednej aplikacji. W pięć zagracie na jednym telefonie podawanym w kółko, we wszystkie każdy na swoim. Stuknij plakat, żeby zobaczyć zasady."
        />

        <section id="lista-gier" className="px-6 pt-14 sm:px-8">
          <ul className="mx-auto grid max-w-6xl grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4">
            {GAMES.map((game) => (
              <li key={game.slug}>
                <Link href={gamePath(game.slug)} className="group block">
                  <span className="block overflow-hidden rounded-[1.4rem]">
                    <Image
                      src={game.art}
                      alt={`${game.title} - gra na imprezę`}
                      width={640}
                      height={857}
                      sizes="(max-width: 768px) 46vw, 270px"
                      className="h-auto w-full transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </span>
                  <span className="font-display mt-4 block text-lg font-bold tracking-[-0.01em]">{game.title}</span>
                  <span className="mt-1 block text-pretty text-sm leading-snug text-on-surface-variant">
                    {game.tagline}
                  </span>
                  <span className="mt-2 block text-xs text-on-surface-variant/70">{game.players}</span>
                </Link>
              </li>
            ))}
            <li>
              <Link href={PARTY_PATH} className="group block">
                <span className="block overflow-hidden rounded-[1.4rem]">
                  <Image
                    src="/plakaty/wieczor.webp"
                    alt="Wieczór BIFOR - kilka gier i jedna tabela"
                    width={640}
                    height={857}
                    sizes="(max-width: 768px) 46vw, 270px"
                    className="h-auto w-full transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </span>
                <span className="font-display mt-4 block text-lg font-bold tracking-[-0.01em]">Wieczór BIFOR</span>
                <span className="mt-1 block text-pretty text-sm leading-snug text-on-surface-variant">
                  Kilka gier, jedna tabela na cały wieczór.
                </span>
                <span className="mt-2 block text-xs text-on-surface-variant/70">od 2 osób</span>
              </Link>
            </li>
          </ul>
        </section>

        <section id="ktora-gra" className="px-6 pt-24 sm:px-8 md:pt-32">
          <div className="mx-auto max-w-6xl">
            <h2 className={H2}>Którą wybrać?</h2>
            <dl className="mt-10 grid max-w-5xl gap-x-12 gap-y-8 md:grid-cols-2">
              {CHOICES.map((choice) => (
                <div key={choice.question}>
                  <dt className="font-display text-lg font-bold">{choice.question}</dt>
                  <dd className="mt-2 text-pretty leading-relaxed text-on-surface-variant">
                    {choice.answer}{' '}
                    {choice.slugs.map((slug, i) => {
                      const game = GAMES.find((g) => g.slug === slug);
                      if (!game) return null;
                      return (
                        <span key={slug}>
                          {i > 0 ? ', ' : ''}
                          <Link href={gamePath(slug)} className="text-on-surface underline decoration-white/25 underline-offset-4 hover:decoration-primary">
                            {game.title}
                          </Link>
                        </span>
                      );
                    })}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section id="porownanie" className="px-6 pt-24 sm:px-8 md:pt-32">
          <div className="mx-auto max-w-6xl">
            <h2 className={H2}>Wszystkie gry w jednej tabeli</h2>
            <div className="mt-10 overflow-x-auto">
              <table className="w-full min-w-[640px] border-collapse text-left text-sm">
                <caption className="sr-only">
                  Porównanie siedmiu gier w aplikacji BIFOR: liczba graczy, czas i sposób gry
                </caption>
                <thead>
                  <tr className="border-b border-white/[0.1] text-on-surface-variant">
                    <th scope="col" className="py-3 pr-4 font-medium">Gra</th>
                    <th scope="col" className="py-3 pr-4 font-medium">Gracze</th>
                    <th scope="col" className="py-3 pr-4 font-medium">Czas</th>
                    <th scope="col" className="py-3 pr-4 font-medium">Jeden telefon</th>
                    <th scope="col" className="py-3 pr-4 font-medium">Każdy na swoim</th>
                    <th scope="col" className="py-3 font-medium">Darmowe kategorie</th>
                  </tr>
                </thead>
                <tbody>
                  {GAMES.map((game) => (
                    <tr key={game.slug} className="border-b border-white/[0.06]">
                      <th scope="row" className="py-4 pr-4 font-semibold">
                        <Link href={gamePath(game.slug)} className="hover:text-primary">
                          {game.title}
                        </Link>
                      </th>
                      <td className="whitespace-nowrap py-4 pr-4 text-on-surface-variant">{game.players}</td>
                      <td className="whitespace-nowrap py-4 pr-4 text-on-surface-variant">{game.duration}</td>
                      <td className="py-4 pr-4 text-on-surface-variant">{game.local ? 'tak' : 'nie'}</td>
                      <td className="py-4 pr-4 text-on-surface-variant">{game.online ? 'tak' : 'nie'}</td>
                      <td className="py-4 text-on-surface-variant">{game.categories.free.join(', ')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section id="faq" className="px-6 pt-24 sm:px-8 md:pt-32">
          <div className="mx-auto max-w-6xl">
            <h2 className={H2}>Częste pytania</h2>
            <div className="mt-8 max-w-3xl divide-y divide-white/[0.07]">
              {HUB_FAQ.map((item) => (
                <div key={item.question} className="py-6">
                  <h3 className="font-display text-lg font-bold tracking-[-0.01em]">{item.question}</h3>
                  <p className="mt-2 text-pretty leading-relaxed text-on-surface-variant">{item.answer}</p>
                </div>
              ))}
            </div>
            <p className="mt-6 text-sm text-on-surface-variant">
              Więcej w{' '}
              <Link href="/faq" className="text-on-surface underline decoration-white/25 underline-offset-4 hover:decoration-primary">
                FAQ
              </Link>{' '}
              i w poradniku{' '}
              <Link href="/gry-na-impreze" className="text-on-surface underline decoration-white/25 underline-offset-4 hover:decoration-primary">
                w co zagrać na imprezie
              </Link>
              .
            </p>
          </div>
        </section>

        <section className="px-6 pb-28 pt-24 sm:px-8 md:pt-32">
          <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 border-t border-white/[0.08] pt-14 md:flex-row md:items-center md:justify-between">
            <h2 className={H2}>Pobierz za darmo</h2>
            <StoreBadges />
          </div>
        </section>
      </PageShell>
    </>
  );
}
