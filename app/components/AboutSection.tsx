/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { GAMES, gamePath } from '../lib/games';

const gameNames = GAMES.map((g) => g.title);
const gameList = `${gameNames.slice(0, -1).join(', ')} i ${gameNames[gameNames.length - 1]}`;

const OCCASIONS = [
  {
    label: 'Na domówce',
    slug: 'zakazane',
    text: 'Dwie drużyny, buzzer i hasła, których nie wolno powiedzieć. Najlepsza, gdy ekipa jest już w komplecie.'
  },
  {
    label: 'Na beforze',
    slug: 'czolko',
    text: 'Telefon na czoło i zgadujesz, kim jesteś. Rozgrzewka na start wieczoru, gdy ludzie dopiero się schodzą.'
  },
  {
    label: 'Bez internetu',
    slug: 'impostor',
    text: 'Wszyscy znają hasło poza jedną osobą. Tryb lokalny działa na jednym telefonie, także poza zasięgiem.'
  }
];

export default function AboutSection() {
  return (
    <section className="relative overflow-hidden bg-background px-6 py-24 md:px-12">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(40% 44% at 50% 34%, rgba(255,178,0,0.09), transparent 70%)'
        }}
      />

      <div className="relative mx-auto max-w-6xl text-center">
        <p className="text-[11px] font-medium uppercase tracking-[0.32em] text-on-surface-variant">
          Gdzie się sprawdza
        </p>
        <h2 className="mt-4 text-balance text-[2rem] font-light leading-[1.05] tracking-tight sm:text-4xl md:text-5xl">
          Gry na imprezę, domówkę i{' '}
          <span className="text-primary font-normal">before.</span>
        </h2>
        <p className="mx-auto mt-5 max-w-3xl text-balance text-base font-extralight leading-relaxed text-on-surface-variant sm:text-lg">
          Bifor to siedem gier imprezowych na telefon - {gameList} - dla ekipy, która
          siedzi razem w jednym pokoju. Zamiast planszy, kartek i tłumaczenia zasad
          wyciągacie telefon i gracie.
        </p>

        <div className="mt-16 grid gap-12 sm:grid-cols-3 sm:gap-8">
          {OCCASIONS.map((occasion) => {
            const game = GAMES.find((g) => g.slug === occasion.slug);
            if (!game) return null;
            return (
              <Link
                key={occasion.slug}
                href={gamePath(game.slug)}
                className="group flex flex-col items-center transition-opacity hover:opacity-80"
              >
                <span
                  className="block h-24 w-24 overflow-hidden rounded-[1.35rem]"
                  style={{
                    border: `1px solid ${game.glow}33`,
                    boxShadow: `0 16px 40px rgba(0,0,0,0.5), 0 0 30px ${game.glow}22`
                  }}
                >
                  <img
                    src={game.art}
                    alt=""
                    className="h-full w-full object-cover object-top"
                    style={{ maxWidth: 'none' }}
                  />
                </span>
                <span
                  className="mt-5 text-[11px] font-medium uppercase tracking-[0.28em]"
                  style={{ color: game.glow }}
                >
                  {occasion.label}
                </span>
                <span className="mt-2 text-2xl font-light tracking-tight text-on-surface">
                  {game.title}
                </span>
                <span className="mt-3 max-w-xs text-balance text-sm font-extralight leading-relaxed text-on-surface-variant">
                  {occasion.text}
                </span>
              </Link>
            );
          })}
        </div>

        <p className="mx-auto mt-16 max-w-2xl text-balance text-sm font-extralight leading-relaxed text-on-surface-variant">
          Wszystkie gry imprezowe Bifor są po polsku, a każda ma darmową kategorię
          haseł. Zasady, liczbę graczy i tryby znajdziesz w{' '}
          <Link href="/faq" className="text-primary hover:underline">
            najczęstszych pytaniach
          </Link>{' '}
          oraz na stronach poszczególnych{' '}
          <Link href="/gry" className="text-primary hover:underline">
            gier imprezowych
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
