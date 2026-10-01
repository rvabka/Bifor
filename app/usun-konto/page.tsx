import type { Metadata } from 'next';
import PageShell from '../components/ui/PageShell';
import Link from 'next/link';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Usunięcie konta Bifor',
  description:
    'Jak usunąć konto w aplikacji Bifor i jakie dane zostaną skasowane. Instrukcja krok po kroku oraz kontakt dla osób bez dostępu do aplikacji.',
  alternates: { canonical: '/usun-konto' }
};

const P_CLASS = 'text-on-surface-variant font-extralight leading-relaxed';
const UL_CLASS =
  'list-disc list-inside text-on-surface-variant font-extralight leading-relaxed space-y-2 pl-4';

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-light tracking-tight">{title}</h2>
      {children}
    </section>
  );
}

function Mail() {
  return (
    <a href="mailto:contact@bifor.games" className="text-primary hover:underline">
      contact@bifor.games
    </a>
  );
}

export default function DeleteAccountPage() {
  return (
    <PageShell>
      <div className="px-4 pt-32 pb-24 md:px-8 md:pt-40">
      <div className="mx-auto max-w-3xl space-y-12">
        <div className="space-y-4">
          <Link
            href="/"
            className="text-primary inline-flex items-center gap-2 text-sm hover:underline"
          >
            ← Strona główna
          </Link>
          <h1 className="text-4xl font-light tracking-tight md:text-5xl">
            Usunięcie konta Bifor
          </h1>
          <p className={P_CLASS}>
            Ta strona dotyczy aplikacji <strong className="font-normal">Bifor</strong> (gry
            imprezowe). Opisuje, jak usunąć konto i jakie dane zostaną przy tym skasowane,
            a jakie zachowane.
          </p>
        </div>

        <Section title="Jak usunąć konto w aplikacji">
          <p className={P_CLASS}>
            Usunięcie konta jest natychmiastowe i nieodwracalne. Nie trzeba nas o nic prosić
            ani czekać na odpowiedź.
          </p>
          <ul className={UL_CLASS}>
            <li>Otwórz aplikację Bifor i zaloguj się na konto, które chcesz usunąć.</li>
            <li>Przejdź do zakładki <strong className="font-normal">Ustawienia</strong>.</li>
            <li>W sekcji <strong className="font-normal">Konto</strong> wybierz <strong className="font-normal">Usuń konto</strong>.</li>
            <li>
              Potwierdź, wpisując adres e-mail przypisany do konta. To zabezpieczenie przed
              przypadkowym usunięciem.
            </li>
          </ul>
          <p className={P_CLASS}>
            <strong className="font-normal">Usunięcie konta nie anuluje subskrypcji BIFOR+.</strong>{' '}
            Jeśli ją masz, anuluj ją w ustawieniach konta sklepu - na iPhonie w Ustawienia →
            Twoje imię → Subskrypcje, na Androidzie w Google Play → Profil → Płatności i
            subskrypcje → Subskrypcje. Inaczej sklep będzie ją dalej odnawiał.
          </p>
        </Section>

        <Section title="Jeśli nie masz dostępu do aplikacji">
          <p className={P_CLASS}>
            Napisz na <Mail /> z adresu e-mail przypisanego do konta i podaj w treści, że
            chcesz je usunąć. Prośbę realizujemy w ciągu 30 dni. Możemy poprosić o dodatkowe
            potwierdzenie tożsamości, jeśli wiadomość przyjdzie z innego adresu niż ten
            przypisany do konta.
          </p>
        </Section>

        <Section title="Co zostanie usunięte">
          <p className={P_CLASS}>
            Razem z kontem trwale kasujemy wszystkie powiązane z nim dane:
          </p>
          <ul className={UL_CLASS}>
            <li>konto i adres e-mail;</li>
            <li>profil gracza, czyli nick i wybrany awatar;</li>
            <li>statystyki i osiągnięcia;</li>
            <li>pokoje gry, które prowadzisz jako gospodarz, razem z ich zawartością;</li>
            <li>zapis dostępu do BIFOR+ i pakietów premium;</li>
            <li>token powiadomień push i ustawienia powiadomień;</li>
            <li>listę zablokowanych graczy.</li>
          </ul>
        </Section>

        <Section title="Co zostaje i na jak długo">
          <ul className={UL_CLASS}>
            <li>
              <strong className="font-normal">Zgłoszenia moderacyjne</strong> - zgłoszenia
              wysłane przez Ciebie i dotyczące Ciebie zostają, ale są odłączone od Twojego
              konta i przestają wskazywać konkretną osobę. Trzymamy je, żeby móc reagować na
              nadużycia.
            </li>
            <li>
              <strong className="font-normal">Pokoje gry innych graczy</strong> z Twoim
              udziałem - Twój udział zostaje odłączony od konta. Same pokoje kasują się
              automatycznie: zakończone po 7 dniach, porzucone znacznie szybciej.
            </li>
            <li>
              <strong className="font-normal">Dane o awariach</strong> - zbierane bez danych
              identyfikujących.
            </li>
            <li>
              <strong className="font-normal">Statystyki użycia</strong> - zostają powiązane z
              identyfikatorem usuniętego konta, bez adresu e-mail i nicku. Jeśli chcesz je
              usunąć, napisz na <Mail />. Zbieranie statystyk wyłączysz w aplikacji
              przełącznikiem statystyk w Ustawienia → Aplikacja.
            </li>
            <li>
              <strong className="font-normal">Historia zakupów BIFOR+</strong> - RevenueCat,
              który obsługuje subskrypcje, przechowuje ją powiązaną z identyfikatorem konta
              także po jego usunięciu. Na prośbę wysłaną na <Mail /> usuniemy ją również tam.
              Dane transakcji przechowują też Apple i Google na własnych zasadach.
            </li>
          </ul>
        </Section>

        <Section title="Granie bez konta">
          <p className={P_CLASS}>
            Bifor działa też bez zakładania konta. W trybie gościa nie przechowujemy adresu
            e-mail ani profilu na serwerze, a nick i awatar zostają wyłącznie w pamięci
            telefonu. Odinstalowanie aplikacji usuwa je razem z nią.
          </p>
        </Section>

        <Section title="Pytania">
          <p className={P_CLASS}>
            W sprawach dotyczących danych osobowych napisz na <Mail />. Pełne informacje
            znajdziesz w{' '}
            <Link href="/polityka-prywatnosci" className="text-primary hover:underline">
              polityce prywatności
            </Link>
            .
          </p>
        </Section>
      </div>
    </div>
    </PageShell>
  );
}
