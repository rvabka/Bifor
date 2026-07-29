import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import JsonLd from '../components/JsonLd';
import { GAMES, gamePath } from '../lib/games';
import { breadcrumbNode, faqNode, gamesItemListNode } from '../lib/jsonld';
import { abs } from '../lib/site';

export const metadata: Metadata = {
  title: 'Gry imprezowe na telefon - lista 6 gier w aplikacji Bifor',
  description:
    'Lista gier imprezowych na telefon w aplikacji Bifor: Czółko, Zakazane, Impostor, Sekrety, Państwa Miasta i Gra na P. Zasady, liczba graczy, czas rozgrywki i tryby - na jednym telefonie lub online ze znajomymi.',
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
      'Sześć gier imprezowych w jednej aplikacji: zasady, liczba graczy i tryby gry na jednym telefonie lub online.'
  }
};

const CHOICES: { question: string; answer: string; slugs: string[] }[] = [
  {
    question: 'Jaka gra imprezowa dla dwóch osób?',
    answer:
      'Czółko i Gra na P działają już w dwie osoby - jedna opisuje, druga zgaduje. Państwa Miasta w duecie zamieniają się w szybki pojedynek na czas.',
    slugs: ['czolko', 'gra-na-p', 'panstwa-miasta']
  },
  {
    question: 'Jaka gra dla dużej ekipy, 8-10 osób?',
    answer:
      'Zakazane dzieli grupę na drużyny, a Sekrety i Państwa Miasta obsługują do 10 graczy jednocześnie, więc nikt nie czeka na swoją kolej.',
    slugs: ['zakazane', 'sekrety', 'panstwa-miasta']
  },
  {
    question: 'Jaka gra, gdy mamy tylko jeden telefon?',
    answer:
      'Czółko, Zakazane, Impostor i Gra na P mają tryb lokalny - telefon krąży po grupie i wystarczy jedno urządzenie na całą ekipę.',
    slugs: ['czolko', 'impostor', 'gra-na-p']
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
      'Tryby lokalne z darmową kategorią haseł działają offline - dotyczy to Czółka, Zakazanego, Impostora i Gry na P. Sekrety i Państwa Miasta wymagają połączenia.',
    slugs: ['czolko', 'zakazane', 'impostor', 'gra-na-p']
  },
  {
    question: 'Jaka gra na krótko, gdy macie 10 minut?',
    answer:
      'Czółko i Gra na P dają się rozegrać w dziesięć minut, bo rundy są krótkie i można je przerwać w dowolnym momencie.',
    slugs: ['czolko', 'gra-na-p']
  }
];

const HUB_FAQ = [
  {
    question: 'Ile gier imprezowych jest w aplikacji Bifor?',
    answer:
      'Sześć: Czółko, Zakazane, Impostor, Sekrety, Państwa Miasta oraz Gra na P. Każda ma własne zasady, liczbę graczy i tryby gry.'
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
      'Od 2 do 10 osób zależnie od gry. Czółko obsługuje 2-8 graczy, Impostor 3-8, Zakazane 4-10, Sekrety 3-10, Państwa Miasta 2-10, a Gra na P 2-10.'
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
      <Navbar />

      <main className="min-h-screen bg-background pt-28 pb-24">
        <div className="mx-auto max-w-4xl px-4 md:px-8">
          <nav aria-label="Ścieżka nawigacji" className="text-xs text-on-surface-variant">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">
                  Strona główna
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li aria-current="page" className="text-on-surface">
                Gry imprezowe
              </li>
            </ol>
          </nav>

          <header className="mt-8 space-y-5">
            <h1 className="text-balance text-[2.75rem] font-light leading-[1.02] tracking-tight sm:text-6xl">
              Gry imprezowe <span className="text-primary font-normal">na telefon</span>
            </h1>
            <p className="max-w-2xl text-lg font-extralight leading-relaxed text-on-surface sm:text-xl">
              Bifor to aplikacja z sześcioma grami imprezowymi po polsku. Cztery z nich
              zagrasz na jednym telefonie podawanym z ręki do ręki, wszystkie sześć w
              trybie online, gdzie każdy gra na swoim. Bez planszy, bez kartek, bez
              tłumaczenia zasad przez pół godziny.
            </p>
            <p className="max-w-2xl text-base font-extralight leading-relaxed text-on-surface-variant">
              Poniżej znajdziesz listę gier z zasadami, liczbą graczy i czasem rozgrywki,
              a niżej podpowiedź, którą grę wybrać w konkretnej sytuacji.
            </p>
          </header>

          <section aria-labelledby="lista-gier" className="mt-14 space-y-6">
            <h2 id="lista-gier" className="text-3xl font-light tracking-tight sm:text-4xl">
              Lista gier w aplikacji Bifor
            </h2>
            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {GAMES.map((game) => (
                <li key={game.slug}>
                  <Link
                    href={gamePath(game.slug)}
                    className="group block overflow-hidden rounded-[1.75rem] border transition-colors"
                    style={{
                      borderColor: `${game.glow}33`,
                      backgroundColor: `${game.glow}0d`
                    }}
                  >
                    <Image
                      src={game.art}
                      alt={`${game.title} - ${game.tagline}`}
                      width={800}
                      height={420}
                      className="h-40 w-full object-cover object-top"
                    />
                    <div className="space-y-2 p-5">
                      <h3
                        className="text-2xl font-light tracking-tight"
                        style={{ color: game.glow }}
                      >
                        {game.title}
                      </h3>
                      <p className="text-sm font-extralight leading-relaxed text-on-surface">
                        {game.tagline}
                      </p>
                      <p className="text-xs text-on-surface-variant">
                        {game.players} · {game.duration} · {game.modeLabel}
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="porownanie" className="mt-16 space-y-6">
            <h2 id="porownanie" className="text-3xl font-light tracking-tight sm:text-4xl">
              Porównanie gier
            </h2>
            <div className="overflow-x-auto rounded-3xl border border-white/5">
              <table className="w-full min-w-[640px] border-collapse text-left text-sm">
                <caption className="sr-only">
                  Porównanie sześciu gier imprezowych w aplikacji Bifor pod kątem liczby
                  graczy, czasu rozgrywki i trybów
                </caption>
                <thead>
                  <tr className="border-b border-white/5 text-[10px] uppercase tracking-[0.2em] text-on-surface-variant">
                    <th scope="col" className="p-4 font-medium">
                      Gra
                    </th>
                    <th scope="col" className="p-4 font-medium">
                      Typ
                    </th>
                    <th scope="col" className="p-4 font-medium">
                      Gracze
                    </th>
                    <th scope="col" className="p-4 font-medium">
                      Czas
                    </th>
                    <th scope="col" className="p-4 font-medium">
                      Jeden telefon
                    </th>
                    <th scope="col" className="p-4 font-medium">
                      Online
                    </th>
                  </tr>
                </thead>
                <tbody className="font-extralight text-on-surface-variant">
                  {GAMES.map((game) => (
                    <tr key={game.slug} className="border-b border-white/5 last:border-0">
                      <th scope="row" className="p-4 font-light" style={{ color: game.glow }}>
                        <Link href={gamePath(game.slug)} className="hover:underline">
                          {game.title}
                        </Link>
                      </th>
                      <td className="p-4">{game.genre}</td>
                      <td className="p-4 whitespace-nowrap">{game.players}</td>
                      <td className="p-4 whitespace-nowrap">{game.duration}</td>
                      <td className="p-4">{game.local ? 'Tak' : 'Nie'}</td>
                      <td className="p-4">{game.online ? 'Tak' : 'Nie'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section aria-labelledby="ktora-gra" className="mt-16 space-y-8">
            <h2 id="ktora-gra" className="text-3xl font-light tracking-tight sm:text-4xl">
              Którą grę wybrać?
            </h2>
            {CHOICES.map((choice) => (
              <div key={choice.question} className="space-y-2">
                <h3 className="text-lg font-light tracking-tight text-on-surface">
                  {choice.question}
                </h3>
                <p className="text-base font-extralight leading-relaxed text-on-surface-variant">
                  {choice.answer}
                </p>
                <p className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
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
                        Zasady: {game.title}
                      </Link>
                    );
                  })}
                </p>
              </div>
            ))}
          </section>

          <section aria-labelledby="tryby" className="mt-16 space-y-4">
            <h2 id="tryby" className="text-3xl font-light tracking-tight sm:text-4xl">
              Na jednym telefonie czy każdy na swoim?
            </h2>
            <p className="text-base font-extralight leading-relaxed text-on-surface-variant sm:text-lg">
              W trybie lokalnym wystarczy jedno urządzenie - telefon krąży po grupie, a
              każdy widzi swoją część gry, gdy przyjdzie jego kolej. To najszybszy sposób,
              żeby zacząć, i jedyny, który działa bez internetu.
            </p>
            <p className="text-base font-extralight leading-relaxed text-on-surface-variant sm:text-lg">
              W trybie online host tworzy pokój, a reszta dołącza kodem pokoju lub kodem
              QR. Każdy widzi na swoim ekranie tylko to, co powinien - dzięki temu możliwe
              są anonimowe odpowiedzi, ukryte role i jednoczesne pisanie. Gracze nie muszą
              być w tej samej sieci Wi-Fi, wystarczy internet.
            </p>
          </section>

          <section aria-labelledby="hub-faq" className="mt-16 space-y-6">
            <h2 id="hub-faq" className="text-3xl font-light tracking-tight sm:text-4xl">
              Najczęstsze pytania o gry imprezowe w Bifor
            </h2>
            <div className="space-y-6">
              {HUB_FAQ.map((item) => (
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
            <p className="text-sm font-extralight text-on-surface-variant">
              Więcej odpowiedzi znajdziesz w{' '}
              <Link href="/faq" className="text-primary hover:underline">
                sekcji FAQ
              </Link>
              .
            </p>
          </section>

          <section
            aria-labelledby="hub-cta"
            className="mt-16 rounded-[2rem] border border-white/5 bg-surface-container p-8 text-center sm:p-10"
          >
            <h2 id="hub-cta" className="text-2xl font-light tracking-tight sm:text-3xl">
              Bifor - premiera wkrótce
            </h2>
            <p className="mx-auto mt-3 max-w-md text-base font-extralight leading-relaxed text-on-surface-variant">
              Aplikacja trafi na App Store i Google Play. Zapisz się, żeby dostać
              powiadomienie w dniu premiery.
            </p>
            <Link
              href="/#newsletter"
              className="mt-6 inline-block rounded-full bg-primary px-8 py-4 text-sm font-semibold uppercase tracking-[0.15em] text-on-primary transition-transform hover:scale-105 active:scale-95"
            >
              Zapisz się na premierę
            </Link>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}
