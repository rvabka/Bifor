import type { Metadata } from 'next';
import Link from 'next/link';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Testy beta Bifor',
  description:
    'Dołącz do testów beta aplikacji Bifor na Androida. Dwa kroki: zapisz się do grupy testerów i włącz testy w Google Play.',
  alternates: { canonical: '/test' },
  robots: { index: false, follow: false }
};

const GROUP_URL = 'https://groups.google.com/g/bifor-testy';
const OPT_IN_URL = 'https://play.google.com/apps/testing/com.bifor.app';
const PLAY_URL = 'https://play.google.com/store/apps/details?id=com.bifor.app';

const P_CLASS = 'text-pretty leading-relaxed text-on-surface-variant';

const BUTTON_CLASS =
  'inline-flex items-center justify-center rounded-[1.25rem] border border-primary/50 bg-primary px-6 py-4 font-display text-base font-extrabold text-on-primary shadow-[0_24px_70px_-30px_rgba(255,178,0,0.9)] transition-transform duration-200 hover:scale-[1.02] active:scale-[0.99]';

function Step({
  number,
  title,
  children
}: {
  number: number;
  title: string;
  children: ReactNode;
}) {
  return (
    <li className="rounded-[1.5rem] border border-white/[0.08] bg-white/[0.02] p-6 sm:p-8">
      <div className="flex items-baseline gap-4">
        <span className="font-display text-2xl font-extrabold text-primary">{number}</span>
        <h2 className="text-xl font-light tracking-tight sm:text-2xl">{title}</h2>
      </div>
      <div className="mt-4 space-y-5 sm:pl-10">{children}</div>
    </li>
  );
}

function Mail() {
  return (
    <a href="mailto:contact@bifor.games" className="text-primary hover:underline">
      contact@bifor.games
    </a>
  );
}

export default function TestPage() {
  return (
    <main className="bg-background text-on-surface min-h-screen px-4 py-32 md:px-8">
      <div className="mx-auto max-w-2xl space-y-12">
        <div className="space-y-4">
          <Link
            href="/"
            className="text-primary inline-flex items-center gap-2 text-sm hover:underline"
          >
            ← Strona główna
          </Link>
          <h1 className="text-4xl font-light tracking-tight md:text-5xl">Testy beta Bifor</h1>
          <p className={P_CLASS}>
            Bifor jest w fazie testów na Androidzie. Poniżej dwa kroki, po których aplikacja
            pojawi się u Ciebie w Google Play jak każda inna. Zajmuje to około minuty.
          </p>
        </div>

        <div className="rounded-[1.25rem] border border-primary/25 bg-primary/[0.06] p-5">
          <p className="text-sm leading-relaxed text-on-surface">
            <strong className="font-semibold">Użyj tego samego konta Google</strong>, na którym
            masz zalogowany Sklep Play w telefonie. To jedyna rzecz, która potrafi tu nie
            zadziałać: jeśli zapiszesz się z innego adresu, Play nie rozpozna Cię jako testera
            i zobaczysz komunikat, że aplikacja jest niedostępna.
          </p>
        </div>

        <ol className="space-y-6">
          <Step number={1} title="Zapisz się do grupy testerów">
            <p className={P_CLASS}>
              Kliknij <strong className="font-normal text-on-surface">Dołącz do grupy</strong>.
              Nikt niczego nie zatwierdza, wchodzisz od razu. Grupa służy nam wyłącznie za listę
              testerów, nie dostaniesz z niej żadnych wiadomości.
            </p>
            <a
              href={GROUP_URL}
              target="_blank"
              rel="noreferrer"
              className={`${BUTTON_CLASS} w-full sm:w-auto`}
            >
              Dołącz do grupy
            </a>
          </Step>

          <Step number={2} title="Włącz testy">
            <p className={P_CLASS}>
              Na stronie, która się otworzy, kliknij{' '}
              <strong className="font-normal text-on-surface">Zostań testerem</strong>. Zrób to
              dopiero po kroku pierwszym, bo strona sprawdza, czy jesteś już w grupie.
            </p>
            <a
              href={OPT_IN_URL}
              target="_blank"
              rel="noreferrer"
              className={`${BUTTON_CLASS} w-full sm:w-auto`}
            >
              Zostań testerem
            </a>
          </Step>

          <Step number={3} title="Pobierz z Google Play">
            <p className={P_CLASS}>
              Otwórz{' '}
              <a
                href={PLAY_URL}
                target="_blank"
                rel="noreferrer"
                className="text-primary hover:underline"
              >
                Bifor w Google Play
              </a>{' '}
              na telefonie i zainstaluj. Aktualizacje przychodzą potem same, tak jak przy
              zwykłych aplikacjach.
            </p>
            <p className="text-sm leading-relaxed text-on-surface-variant">
              Jeśli Play twierdzi, że aplikacja jest niedostępna, odczekaj kilka minut i odśwież.
              Czasem chwilę trwa, zanim Google skojarzy Twoje konto z testem.
            </p>
          </Step>
        </ol>

        <section className="space-y-4 border-t border-white/[0.08] pt-10">
          <h2 className="text-2xl font-light tracking-tight">Coś nie działa?</h2>
          <p className={P_CLASS}>
            Napisz na <Mail />. To wersja testowa, więc zgłoszenia są dokładnie tym, po co ona
            istnieje. Przydaje się model telefonu i to, co dokładnie zrobiłeś przed błędem.
          </p>
          <p className={P_CLASS}>
            Na iPhone aplikacja jeszcze nie jest dostępna publicznie.{' '}
            <Link href="/pobierz" className="text-primary hover:underline">
              Zostaw adres
            </Link>
            , a damy znać, gdy ruszy.
          </p>
        </section>
      </div>
    </main>
  );
}
