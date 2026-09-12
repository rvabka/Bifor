import type { Metadata } from 'next';
import Link from 'next/link';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Testy beta Bifor',
  description:
    'Dołącz do testów beta aplikacji Bifor na Androida. Trzy kroki, około minuty.',
  alternates: { canonical: '/test' },
  robots: { index: false, follow: false }
};

const GROUP_URL = 'https://groups.google.com/g/bifor-testy';
const OPT_IN_URL = 'https://play.google.com/apps/testing/com.bifor.app';
const PLAY_URL = 'https://play.google.com/store/apps/details?id=com.bifor.app';

const BUTTON =
  'mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl px-6 py-4 font-display text-base font-extrabold transition-transform duration-200 hover:scale-[1.02] active:scale-[0.99] sm:w-auto';
const BUTTON_ON = `${BUTTON} border border-primary/50 bg-primary text-on-primary shadow-[0_24px_70px_-30px_rgba(255,178,0,0.9)]`;
const BUTTON_OFF = `${BUTTON} border border-white/[0.14] bg-white/[0.05] text-on-surface hover:border-white/30`;

function Arrow() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth={2.2}
      stroke="currentColor"
      className="h-4 w-4"
      aria-hidden
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 12h15m0 0-6-6m6 6-6 6" />
    </svg>
  );
}

function Step({
  n,
  title,
  lead,
  last,
  children
}: {
  n: number;
  title: string;
  lead: string;
  last?: boolean;
  children?: ReactNode;
}) {
  return (
    <li className={`relative pl-16 ${last ? '' : 'pb-12'}`}>
      {!last && (
        <span
          aria-hidden
          className="absolute top-14 bottom-0 left-[1.4375rem] w-px bg-gradient-to-b from-white/20 to-white/[0.04]"
        />
      )}
      <span
        aria-hidden
        className="border-primary/40 bg-primary/[0.12] text-primary font-display absolute top-0 left-0 flex h-12 w-12 items-center justify-center rounded-full border text-xl font-extrabold"
      >
        {n}
      </span>
      <h2 className="pt-1.5 text-xl font-normal tracking-tight sm:text-2xl">{title}</h2>
      <p className="text-on-surface-variant mt-2 leading-relaxed">{lead}</p>
      {children}
    </li>
  );
}

export default function TestPage() {
  return (
    <main className="bg-background text-on-surface min-h-screen px-4 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-xl">
        <Link
          href="/"
          className="text-on-surface-variant hover:text-on-surface inline-flex items-center gap-2 text-sm transition-colors"
        >
          ← Strona główna
        </Link>

        <h1 className="mt-6 text-4xl font-light tracking-tight md:text-5xl">
          Testy beta na Androida
        </h1>
        <p className="text-on-surface-variant mt-3 text-lg leading-relaxed">
          Trzy kroki, około minuty. Potem Bifor działa jak każda inna aplikacja ze Sklepu Play.
        </p>

        <div className="border-primary/25 bg-primary/[0.07] mt-8 rounded-2xl border p-5">
          <p className="text-sm leading-relaxed">
            <strong className="font-semibold">
              Wszędzie to samo konto Google, co w Sklepie Play na telefonie.
            </strong>{' '}
            <span className="text-on-surface-variant">
              To jedyna rzecz, która potrafi tu nie zadziałać.
            </span>
          </p>
        </div>

        <ol className="mt-14">
          <Step
            n={1}
            title="Dołącz do grupy"
            lead="Wchodzisz od razu, nikt niczego nie zatwierdza. Nie dostaniesz z niej żadnych wiadomości."
          >
            <a href={GROUP_URL} target="_blank" rel="noreferrer" className={BUTTON_ON}>
              Dołącz do grupy <Arrow />
            </a>
          </Step>

          <Step
            n={2}
            title="Zostań testerem"
            lead="Na stronie Google Play kliknij przycisk, żeby dołączyć do testu. Dopiero po kroku 1."
          >
            <a href={OPT_IN_URL} target="_blank" rel="noreferrer" className={BUTTON_ON}>
              Zostań testerem <Arrow />
            </a>
            <div className="mt-6 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5">
              <p className="text-on-surface-variant text-xs tracking-wide uppercase">
                Udało się, gdy zobaczysz
              </p>
              <p className="mt-3 inline-block rounded-md bg-[#d7f5dd] px-3 py-2 font-sans text-sm text-[#0b3d1b]">
                You are a tester.
              </p>
            </div>
          </Step>

          <Step
            n={3}
            title="Zainstaluj"
            lead="Otwórz Bifora w Sklepie Play na telefonie i pobierz. Aktualizacje przychodzą potem same."
            last
          >
            <a href={PLAY_URL} target="_blank" rel="noreferrer" className={BUTTON_OFF}>
              Otwórz w Google Play <Arrow />
            </a>
          </Step>
        </ol>

        <details className="mt-14 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5">
          <summary className="text-primary cursor-pointer list-none text-sm font-semibold marker:hidden">
            Play pisze, że aplikacja jest niedostępna
          </summary>
          <ul className="text-on-surface-variant mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed">
            <li>Sprawdź, czy w Sklepie Play jesteś na tym samym koncie, którym przeszedłeś kroki 1 i 2.</li>
            <li>Odczekaj kilka minut. Google potrzebuje chwili, żeby skojarzyć konto z testem.</li>
            <li>
              Jeśli dalej nic: Ustawienia telefonu → Aplikacje → Sklep Play → Pamięć → Wyczyść pamięć
              podręczną, potem otwórz link jeszcze raz.
            </li>
          </ul>
        </details>

        <div className="text-on-surface-variant mt-10 space-y-3 border-t border-white/[0.08] pt-10 text-sm leading-relaxed">
          <p>
            Coś nie działa albo masz uwagi - pisz na{' '}
            <a href="mailto:contact@bifor.games" className="text-primary hover:underline">
              contact@bifor.games
            </a>
            . Po to jest ta wersja. Przydaje się model telefonu i co robiłeś przed błędem.
          </p>
          <p>
            iPhone jeszcze nie ruszył.{' '}
            <Link href="/pobierz" className="text-primary hover:underline">
              Zostaw adres
            </Link>
            , damy znać.
          </p>
        </div>
      </div>
    </main>
  );
}
