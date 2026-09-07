import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import JsonLd from '../components/JsonLd';
import PageShell, { PageHero, Prose } from '../components/ui/PageShell';
import { Card, Section, SectionHead } from '../components/ui/Surface';
import { GAMES, gamePath } from '../lib/games';
import { breadcrumbNode, faqNode, gamesItemListNode } from '../lib/jsonld';
import { abs } from '../lib/site';

export const metadata: Metadata = {
  title: 'Gry na imprezę i domówkę - lista 7 gier imprezowych',
  description:
    'Lista gier imprezowych na telefon w aplikacji Bifor: Czółko, Zakazane, Impostor, Sekrety, Państwa Miasta, Gra na P i Szybka Trójka. Zasady, liczba graczy, czas rozgrywki i tryby - na jednym telefonie lub online ze znajomymi.',
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
    siteName: 'Bifor',
    title: 'Gry imprezowe na telefon - lista gier w aplikacji Bifor',
    description:
      'Siedem gier imprezowych w jednej aplikacji: zasady, liczba graczy i tryby gry na jednym telefonie lub online.'
  }
};

const CHOICES: { question: string; answer: string; slugs: string[] }[] = [
  {
    question: 'Jaka gra imprezowa dla dwóch osób?',
    answer:
      'Czółko, Gra na P i Szybka Trójka działają już w dwie osoby - jedna opisuje albo odpowiada, druga zgaduje lub odmierza czas. Państwa Miasta w duecie zamieniają się w szybki pojedynek na czas.',
    slugs: ['czolko', 'gra-na-p', 'szybka-trojka', 'panstwa-miasta']
  },
  {
    question: 'Jaka gra dla dużej ekipy, 8-10 osób?',
    answer:
      'Zakazane dzieli grupę na drużyny, a Sekrety, Państwa Miasta i Szybka Trójka obsługują do 10 graczy jednocześnie, więc nikt nie czeka na swoją kolej.',
    slugs: ['zakazane', 'sekrety', 'panstwa-miasta', 'szybka-trojka']
  },
  {
    question: 'Jaka gra, gdy mamy tylko jeden telefon?',
    answer:
      'Czółko, Zakazane, Impostor, Gra na P i Szybka Trójka mają tryb lokalny - telefon krąży po grupie i wystarczy jedno urządzenie na całą ekipę.',
    slugs: ['czolko', 'impostor', 'gra-na-p', 'szybka-trojka']
  },
  {
    question: 'Jaka gra na przełamanie lodów?',
    answer:
      'Sekrety zostały zaprojektowane dokładnie do tego: anonimowe odpowiedzi, pytania "kto z nas" i dziewięć typów rund, które szybko rozkręcają nieznajomą ekipę.',
    slugs: ['sekrety']
  },
  {
    question: 'Jaka gra bez internetu?',
    answer:
      'Tryby lokalne z darmową kategorią haseł działają offline - dotyczy to Czółka, Zakazanego, Impostora, Gry na P i Szybkiej Trójki. Sekrety i Państwa Miasta wymagają połączenia.',
    slugs: ['czolko', 'zakazane', 'impostor', 'gra-na-p', 'szybka-trojka']
  },
  {
    question: 'Jaka gra na krótko, gdy macie 10 minut?',
    answer:
      'Czółko, Gra na P i Szybka Trójka dają się rozegrać w dziesięć minut, bo rundy są krótkie i można je przerwać w dowolnym momencie.',
    slugs: ['czolko', 'gra-na-p', 'szybka-trojka']
  }
];

const HUB_FAQ = [
  {
    question: 'Ile gier imprezowych jest w aplikacji Bifor?',
    answer:
      'Siedem: Czółko, Zakazane, Impostor, Sekrety, Państwa Miasta, Gra na P oraz Szybka Trójka. Każda ma własne zasady, liczbę graczy i tryby gry.'
  },
  {
    question: 'Czy gry imprezowe w Bifor są darmowe?',
    answer:
      'Tak, pełna rozgrywka jest darmowa - każda gra ma darmową kategorię haseł. Płatne są tylko dodatkowe paczki treści, a w pokoju online wystarczy, że ma je host.'
  },
  {
    question: 'Czy trzeba zakładać konto, żeby zagrać?',
    answer:
      'Nie. Do gry lokalnej konto nie jest potrzebne w ogóle, a do pokoju online dołącza się kodem pokoju lub kodem QR.'
  },
  {
    question: 'Ile osób może grać jednocześnie?',
    answer:
      'Od 2 do 10 osób zależnie od gry. Czółko obsługuje 2-8 graczy, Impostor 3-8, Zakazane 4-10, Sekrety 3-10, Państwa Miasta 2-10, Gra na P 2-10, a Szybka Trójka 2-10.'
  }
];

export default function GamesHubPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      gamesItemListNode,
      faqNode(HUB_FAQ, `${abs('/gry')}#faq`),
      breadcrumbNode([
        { name: 'Strona główna', path: '/' },
        { name: 'Gry imprezowe', path: '/gry' }
      ])
    ]
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <PageShell>
        <PageHero
          eyebrow="Biblioteka"
          title="Gry imprezowe na telefon"
          lead={
            <>
              <p>
                Bifor to aplikacja z siedmioma grami imprezowymi po polsku. Pięć z
                nich zagrasz na jednym telefonie podawanym z ręki do ręki, wszystkie
                siedem w trybie online, gdzie każdy gra na swoim. Bez planszy, bez
                kartek, bez tłumaczenia zasad przez pół godziny.
              </p>
              <p className="mt-4 text-base">
                Poniżej znajdziesz listę gier z zasadami, liczbą graczy i czasem
                rozgrywki, a niżej podpowiedź, którą grę wybrać w konkretnej sytuacji.
              </p>
            </>
          }
        >
          <nav aria-label="Ścieżka nawigacji" className="mt-10 text-xs text-on-surface-variant">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="transition-colors hover:text-primary">
                  Strona główna
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li aria-current="page" className="text-on-surface">
                Gry imprezowe
              </li>
            </ol>
          </nav>
        </PageHero>

        <Section id="lista-gier">
          <SectionHead eyebrow="Siedem gier" title="Lista gier w aplikacji Bifor" />
          <ul className="mt-12 grid gap-4 sm:gap-6 md:grid-cols-2">
            {GAMES.map((game) => (
              <Card key={game.slug} as="li" accent={game.glow}>
                <Link href={gamePath(game.slug)} className="flex h-full gap-5 p-5 sm:gap-6 sm:p-6">
                  <Image
                    src={game.art}
                    alt={`${game.title} - ${game.tagline}`}
                    width={800}
                    height={1071}
                    sizes="128px"
                    className="h-auto w-24 shrink-0 self-start rounded-[1.15rem] sm:w-28"
                  />
                  <span className="block">
                    <span
                      className="font-display block text-xl font-bold tracking-[-0.02em] sm:text-2xl"
                      style={{ color: game.glow }}
                    >
                      {game.title}
                    </span>
                    <span className="mt-2 block text-sm leading-relaxed text-on-surface">
                      {game.tagline}
                    </span>
                    <span className="mt-4 block text-xs leading-relaxed text-on-surface-variant">
                      {game.players} - {game.duration}
                      <br />
                      {game.modeLabel}
                    </span>
                  </span>
                </Link>
              </Card>
            ))}
          </ul>
        </Section>

        <Section id="porownanie">
          <SectionHead eyebrow="Zestawienie" title="Porównanie gier" />
          <Card className="mt-12 overflow-x-auto">
            <table className="w-full min-w-[680px] border-collapse text-left text-sm">
              <caption className="sr-only">
                Porównanie siedmiu gier imprezowych w aplikacji Bifor pod kątem liczby
                graczy, czasu rozgrywki i trybów
              </caption>
              <thead>
                <tr className="border-b border-white/[0.07] text-[10px] uppercase tracking-[0.2em] text-on-surface-variant">
                  <th scope="col" className="p-4 font-semibold">Gra</th>
                  <th scope="col" className="p-4 font-semibold">Typ</th>
                  <th scope="col" className="p-4 font-semibold">Gracze</th>
                  <th scope="col" className="p-4 font-semibold">Czas</th>
                  <th scope="col" className="p-4 font-semibold">Jeden telefon</th>
                  <th scope="col" className="p-4 font-semibold">Online</th>
                </tr>
              </thead>
              <tbody className="text-on-surface-variant">
                {GAMES.map((game) => (
                  <tr key={game.slug} className="border-b border-white/[0.05] last:border-0">
                    <th scope="row" className="p-4 font-semibold" style={{ color: game.glow }}>
                      <Link href={gamePath(game.slug)} className="hover:underline">
                        {game.title}
                      </Link>
                    </th>
                    <td className="p-4">{game.genre}</td>
                    <td className="whitespace-nowrap p-4">{game.players}</td>
                    <td className="whitespace-nowrap p-4">{game.duration}</td>
                    <td className="p-4">{game.local ? 'Tak' : 'Nie'}</td>
                    <td className="p-4">{game.online ? 'Tak' : 'Nie'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </Section>

        <Section id="ktora-gra">
          <SectionHead
            eyebrow="Podpowiedź"
            title="Którą grę wybrać?"
            lead="Sześć typowych sytuacji i gry, które sprawdzają się w każdej z nich."
          />
          <ul className="mt-12 grid gap-4 sm:gap-6 md:grid-cols-2">
            {CHOICES.map((choice) => (
              <Card key={choice.question} as="li" className="p-6 sm:p-7">
                <h3 className="font-display text-lg font-bold tracking-[-0.01em] sm:text-xl">
                  {choice.question}
                </h3>
                <p className="mt-3 text-pretty text-sm leading-relaxed text-on-surface-variant">
                  {choice.answer}
                </p>
                <p className="mt-5 flex flex-wrap gap-x-4 gap-y-2 border-t border-white/[0.07] pt-4 text-[13px] font-semibold">
                  {choice.slugs.map((slug) => {
                    const game = GAMES.find((g) => g.slug === slug);
                    if (!game) return null;
                    return (
                      <Link
                        key={slug}
                        href={gamePath(slug)}
                        className="hover:underline"
                        style={{ color: game.glow }}
                      >
                        {game.title}
                      </Link>
                    );
                  })}
                </p>
              </Card>
            ))}
          </ul>
        </Section>

        <Section id="tryby">
          <SectionHead eyebrow="Dwa tryby" title="Na jednym telefonie czy każdy na swoim?" />
          <div className="mt-10">
            <Prose>
              <p>
                W trybie lokalnym wystarczy jedno urządzenie - telefon krąży po grupie,
                a każdy widzi swoją część gry, gdy przyjdzie jego kolej. To najszybszy
                sposób, żeby zacząć, i jedyny, który działa bez internetu.
              </p>
              <p>
                W trybie online host tworzy pokój, a reszta dołącza kodem pokoju lub
                kodem QR. Każdy widzi na swoim ekranie tylko to, co powinien - dzięki
                temu możliwe są anonimowe odpowiedzi, ukryte role i jednoczesne pisanie.
                Gracze nie muszą być w tej samej sieci Wi-Fi, wystarczy internet.
              </p>
            </Prose>
          </div>
        </Section>

        <Section id="hub-faq">
          <SectionHead
            eyebrow="FAQ"
            title="Najczęstsze pytania o gry imprezowe w Bifor"
          />
          <ul className="mt-12 grid gap-4 sm:gap-6 md:grid-cols-2">
            {HUB_FAQ.map((item) => (
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
          <p className="mt-8 text-sm text-on-surface-variant">
            Więcej odpowiedzi znajdziesz w{' '}
            <Link
              href="/faq"
              className="text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary"
            >
              sekcji FAQ
            </Link>
            .
          </p>
        </Section>

        <Section id="hub-cta">
          <Card accent="#FFB200" className="px-6 py-14 text-center sm:px-12 sm:py-16">
            <h2 className="font-display text-balance text-[clamp(1.75rem,4.5vw,2.75rem)] font-extrabold leading-[0.98] tracking-[-0.03em]">
              Otwarta beta na iPhone
            </h2>
            <p className="mx-auto mt-5 max-w-md text-pretty text-base leading-relaxed text-on-surface-variant">
              Wszystkie siedem gier jest już do pobrania, a podstawowa rozgrywka
              jest darmowa, bez zakładania konta. Wersja na Androida czeka na
              wejście do Google Play.
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
      </PageShell>
    </>
  );
}
