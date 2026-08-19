import Link from 'next/link';
import { GAMES } from '../lib/games';

const gameNames = GAMES.map((g) => g.title);
const gameList = `${gameNames.slice(0, -1).join(', ')} i ${gameNames[gameNames.length - 1]}`;

export default function AboutSection() {
  return (
    <section className="bg-background px-6 pb-24 pt-4 md:px-12">
      <div className="max-w-3xl">
        <h2 className="text-balance text-[1.75rem] font-light leading-[1.15] tracking-tight sm:text-3xl md:text-4xl">
          Gry na imprezę, domówkę i before
        </h2>

        <div className="mt-6 space-y-5 text-base font-extralight leading-relaxed text-on-surface-variant sm:text-lg">
          <p>
            Bifor to gry imprezowe na telefon dla ekipy, która siedzi razem w jednym
            pokoju. Zamiast planszy, kartek i tłumaczenia zasad wyciągacie telefon i
            gracie - na jednym urządzeniu podawanym z ręki do ręki albo każdy na swoim,
            po dołączeniu do pokoju kodem.
          </p>
          <p>
            Siedem gier towarzyskich po polsku, dla grup od 2 do 10 osób: {gameList}.
            Każda ma darmową kategorię haseł, a tryb lokalny działa bez internetu -
            dlatego sprawdzają się i na domówce, i na beforze przed wyjściem, i na
            wyjeździe ze znajomymi.
          </p>
          <p>
            Więcej szczegółów - zasady, liczba graczy, tryby - znajdziesz w{' '}
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
      </div>
    </section>
  );
}
