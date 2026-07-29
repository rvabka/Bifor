import Link from 'next/link';

export const START_STEPS = [
  {
    name: 'Pobierz aplikację i wybierz grę',
    text: 'Bifor to sześć gier w jednej aplikacji na iOS i Androida. Wybierasz grę z biblioteki i ustawiasz kategorię haseł.'
  },
  {
    name: 'Zbierz ekipę - jeden telefon albo pokój online',
    text: 'W trybie lokalnym telefon krąży po grupie. W trybie online tworzysz pokój, a znajomi dołączają kodem pokoju lub kodem QR, bez zakładania konta.'
  },
  {
    name: 'Grajcie, a resztą zajmie się aplikacja',
    text: 'Bifor pilnuje czasu, losuje hasła, przydziela role i liczy punkty. Po zakończonej grze możecie od razu przełączyć się na kolejną bez rozwiązywania pokoju.'
  }
];

const FACTS = [
  { label: 'Liczba gier', value: 'Sześć na start' },
  { label: 'Liczba graczy', value: 'Od 2 do 10 osób, zależnie od gry' },
  { label: 'Tryby', value: 'Jeden telefon podawany w grupie lub każdy na swoim' },
  { label: 'Dołączanie', value: 'Kod pokoju lub kod QR, bez rejestracji' },
  { label: 'Cena', value: 'Darmowa rozgrywka, płatne tylko dodatkowe paczki haseł' },
  { label: 'Język', value: 'Polskie hasła i polski interfejs' }
];

export default function HowItWorksSection() {
  return (
    <section id="jak-to-dziala" className="bg-background py-16 sm:py-24">
      <div className="mx-auto max-w-4xl px-4 md:px-8">
        <div className="space-y-5">
          <h2 className="text-balance text-[2.5rem] font-light leading-[1.05] tracking-tight sm:text-5xl">
            Jak to działa
          </h2>
          <p className="max-w-2xl text-lg font-extralight leading-relaxed text-on-surface sm:text-xl">
            Bifor to aplikacja z grami imprezowymi do grania w grupie, na żywo. Nie
            potrzebujesz planszy, kartek ani tłumaczenia zasad - od włączenia aplikacji do
            pierwszej rundy mija mniej niż minuta.
          </p>
        </div>

        <ol className="mt-10 space-y-4">
          {START_STEPS.map((step, i) => (
            <li
              key={step.name}
              className="flex gap-4 rounded-2xl border border-white/5 p-5 sm:p-6"
            >
              <span className="mt-0.5 text-2xl font-light tabular-nums text-primary">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="space-y-1.5">
                <h3 className="text-lg font-light tracking-tight sm:text-xl">
                  {step.name}
                </h3>
                <p className="text-sm font-extralight leading-relaxed text-on-surface-variant sm:text-base">
                  {step.text}
                </p>
              </div>
            </li>
          ))}
        </ol>

        <h3 className="mt-14 text-2xl font-light tracking-tight sm:text-3xl">
          Bifor w skrócie
        </h3>
        <dl className="mt-6 grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-white/5 bg-white/5 sm:grid-cols-2">
          {FACTS.map((fact) => (
            <div key={fact.label} className="bg-background p-5">
              <dt className="text-[10px] uppercase tracking-[0.2em] text-on-surface-variant">
                {fact.label}
              </dt>
              <dd className="mt-1.5 text-base font-light text-on-surface">{fact.value}</dd>
            </div>
          ))}
        </dl>

        <p className="mt-8 text-base font-extralight leading-relaxed text-on-surface-variant">
          Gry lokalne działają bez internetu. Tryby online wymagają połączenia, ale gracze
          nie muszą być w tej samej sieci Wi-Fi - wystarczy kod pokoju. Więcej szczegółów
          znajdziesz w{' '}
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
