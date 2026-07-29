import Link from 'next/link';
import { GAMES, gamePath } from '../lib/games';

export default function GamesIndexSection() {
  return (
    <section id="lista-gier" className="bg-background py-12 sm:py-16">
      <div className="mx-auto max-w-[1440px] px-4 md:px-8">
        <div className="mx-auto max-w-3xl space-y-4 text-center">
          <h2 className="text-3xl font-light tracking-tight sm:text-4xl">
            Wszystkie gry i ich zasady
          </h2>
          <p className="text-base font-extralight leading-relaxed text-on-surface-variant sm:text-lg">
            Czółko, Zakazane, Impostor, Sekrety, Państwa Miasta i Gra na P. Cztery z nich
            zagrasz na jednym telefonie, wszystkie sześć w trybie online, gdzie każdy gra
            na swoim.
          </p>
        </div>

        <ul className="mx-auto mt-10 grid max-w-4xl grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {GAMES.map((game) => (
            <li key={game.slug}>
              <Link
                href={gamePath(game.slug)}
                className="block h-full rounded-2xl border border-white/5 p-5 transition-colors hover:border-white/15"
              >
                <span
                  className="text-xl font-light tracking-tight"
                  style={{ color: game.glow }}
                >
                  {game.title}
                </span>
                <span className="mt-1.5 block text-sm font-extralight leading-relaxed text-on-surface-variant">
                  {game.tagline}
                </span>
                <span className="mt-2 block text-xs text-on-surface-variant">
                  {game.players} · {game.duration}
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <p className="mt-8 text-center text-sm font-extralight text-on-surface-variant">
          <Link href="/gry" className="text-primary hover:underline">
            Zobacz porównanie wszystkich gier imprezowych
          </Link>
        </p>
      </div>
    </section>
  );
}
