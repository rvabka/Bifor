import type { Metadata } from 'next';
import PageShell from '../components/ui/PageShell';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Polityka prywatności',
  description:
    'Polityka prywatności aplikacji mobilnej Bifor oraz strony bifor.games - jakie dane zbieramy i w jakim celu.',
  alternates: { canonical: '/polityka-prywatnosci' }
};

export default function PrivacyPolicyPage() {
  return (
    <PageShell>
      <div className="px-4 pt-32 pb-24 md:px-8 md:pt-40">
      <div className="max-w-3xl mx-auto space-y-12">
        <div className="space-y-4">
          <Link
            href="/"
            className="text-primary text-sm hover:underline inline-flex items-center gap-2"
          >
            ← Wróć na stronę główną
          </Link>
          <h1 className="text-4xl md:text-5xl font-light tracking-tight">
            Polityka prywatności
          </h1>
          <p className="text-on-surface-variant text-sm">
            Ostatnia aktualizacja: 1 października 2026
          </p>
        </div>

        <section className="space-y-4">
          <h2 className="text-2xl font-light tracking-tight">
            1. Administrator danych
          </h2>
          <p className="text-on-surface-variant font-extralight leading-relaxed">
            Administratorem Twoich danych osobowych jest Bifor (dalej
            &quot;Administrator&quot;). W sprawach związanych z ochroną danych
            osobowych możesz skontaktować się z nami pod adresem e-mail:{' '}
            <a
              href="mailto:contact@bifor.games"
              className="text-primary hover:underline"
            >
              contact@bifor.games
            </a>
            .
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-light tracking-tight">
            2. Zakres polityki
          </h2>
          <p className="text-on-surface-variant font-extralight leading-relaxed">
            Niniejsza polityka opisuje przetwarzanie danych w ramach: (a) strony
            internetowej bifor.games oraz (b) aplikacji mobilnej Bifor na iOS i
            Androida (dalej &quot;Aplikacja&quot;).
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-light tracking-tight">
            3. Dane zbierane przez stronę internetową
          </h2>
          <ul className="list-disc list-inside text-on-surface-variant font-extralight leading-relaxed space-y-2 pl-4">
            <li>
              <strong className="font-normal text-on-surface">Imię</strong> -
              podane dobrowolnie w formularzu zapisu na newsletter.
            </li>
            <li>
              <strong className="font-normal text-on-surface">
                Adres e-mail
              </strong>{' '}
              - podany w formularzu zapisu na newsletter (potwierdzenie zapisu
              odbywa się metodą double opt-in).
            </li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-light tracking-tight">
            4. Dane zbierane przez Aplikację
          </h2>
          <ul className="list-disc list-inside text-on-surface-variant font-extralight leading-relaxed space-y-2 pl-4">
            <li>
              <strong className="font-normal text-on-surface">Konto</strong> -
              adres e-mail oraz identyfikator konta, gdy zakładasz konto przez
              e-mail, Logowanie z Google lub Logowanie z Apple. Gra jako gość nie
              wymaga konta.
            </li>
            <li>
              <strong className="font-normal text-on-surface">Profil</strong> -
              wybrany pseudonim (nick) i awatar.
            </li>
            <li>
              <strong className="font-normal text-on-surface">
                Statystyki gier i odznaki
              </strong>{' '}
              - tylko dla kont: liczba rozegranych i wygranych gier, wyniki w
              poszczególnych grach, dni, w które grasz, największa liczba graczy
              w jednej grze, liczba gier nocnych, daty pierwszej i ostatniej gry
              oraz zdobyte odznaki. Bez konta seria dni gry jest liczona
              wyłącznie na Twoim urządzeniu.
            </li>
            <li>
              <strong className="font-normal text-on-surface">
                Treści tworzone przez użytkownika (UGC)
              </strong>{' '}
              - wpisy w grach (m.in. sekrety, zdania, odpowiedzi), nazwy pokoi
              oraz zdjęcia selfie w rundzie &quot;Twarz na żądanie&quot;. Treści
              te są przetwarzane efemerycznie na potrzeby bieżącej rozgrywki i
              przesyłane między urządzeniami graczy w danym pokoju; nie budujemy
              z nich trwałego archiwum po stronie serwera.
            </li>
            <li>
              <strong className="font-normal text-on-surface">
                Subskrypcja BIFOR+
              </strong>{' '}
              - po uruchomieniu Aplikacja łączy się z RevenueCat, żeby pokazać
              aktualne ceny i sprawdzić, czy masz dostęp do BIFOR+. Bez konta
              używa do tego losowego identyfikatora zapisanego na urządzeniu, a
              po zalogowaniu - identyfikatora konta. Przy zakupie RevenueCat
              otrzymuje od sklepu informacje o transakcji: produkt, cenę i
              walutę, daty, status subskrypcji i kraj sklepu. W naszej bazie
              przechowujemy wyłącznie datę, do której masz dostęp, jego źródło i
              identyfikator produktu. Nie otrzymujemy danych karty ani innych
              danych płatniczych - płatność obsługuje Apple lub Google.
            </li>
            <li>
              <strong className="font-normal text-on-surface">
                Powiadomienia i urządzenie
              </strong>{' '}
              - token powiadomień push, strefa czasowa, znacznik ostatniej gry
              oraz Twoje preferencje powiadomień (jeśli włączysz powiadomienia).
            </li>
            <li>
              <strong className="font-normal text-on-surface">
                Moderacja i bezpieczeństwo
              </strong>{' '}
              - zgłoszenia treści/graczy, blokady graczy oraz dane techniczne
              niezbędne do ograniczania nadużyć (rate-limit).
            </li>
            <li>
              <strong className="font-normal text-on-surface">
                Statystyki użycia
              </strong>{' '}
              - zdarzenia z korzystania z Aplikacji (np. otwarte ekrany,
              uruchomione gry, utworzone pokoje) powiązane z losowym
              identyfikatorem, a po zalogowaniu z identyfikatorem konta. Nie
              przekazujemy adresu e-mail ani pseudonimu, a ustalanie lokalizacji
              na podstawie adresu IP jest wyłączone. Zbieranie możesz wyłączyć w
              Aplikacji: Ustawienia → Aplikacja → Anonimowe statystyki.
            </li>
            <li>
              <strong className="font-normal text-on-surface">
                Diagnostyka awarii
              </strong>{' '}
              - raporty o błędach i awariach Aplikacji (Sentry), zbierane bez
              danych osobowych (opcja sendDefaultPii jest wyłączona).
            </li>
            <li>
              <strong className="font-normal text-on-surface">Wiek</strong> -
              jednorazowe potwierdzenie ukończenia 16 lat. Podana data urodzenia
              służy wyłącznie do weryfikacji wieku i pozostaje lokalnie na Twoim
              urządzeniu - nie wysyłamy jej na serwer.
            </li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-light tracking-tight">
            5. Cele i podstawy prawne przetwarzania
          </h2>
          <ul className="list-disc list-inside text-on-surface-variant font-extralight leading-relaxed space-y-2 pl-4">
            <li>
              Świadczenie usługi - prowadzenie konta, rozgrywka wieloosobowa,
              synchronizacja profilu, statystyki gier i odznaki - art. 6 ust. 1
              lit. b RODO (wykonanie umowy).
            </li>
            <li>
              Obsługa subskrypcji BIFOR+ - sprawdzanie zakupów i przyznawanie
              dostępu do płatnych treści - art. 6 ust. 1 lit. b RODO (wykonanie
              umowy).
            </li>
            <li>
              Statystyki użycia - poprawianie i rozwój Aplikacji - art. 6 ust. 1
              lit. f RODO (uzasadniony interes). Możesz się temu sprzeciwić,
              wyłączając statystyki w Ustawieniach Aplikacji.
            </li>
            <li>
              Newsletter oraz powiadomienia marketingowe (np. zaproszenia na
              weekend, nowości) - art. 6 ust. 1 lit. a RODO (Twoja dobrowolna
              zgoda). Powiadomienia marketingowe są domyślnie wyłączone i wymagają
              osobnego włączenia.
            </li>
            <li>
              Moderacja treści, bezpieczeństwo i zapobieganie nadużyciom - art. 6
              ust. 1 lit. f RODO (uzasadniony interes) oraz art. 6 ust. 1 lit. c
              (obowiązek reagowania na zgłoszenia).
            </li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-light tracking-tight">
            6. Odbiorcy danych (podmioty przetwarzające)
          </h2>
          <p className="text-on-surface-variant font-extralight leading-relaxed">
            Powierzamy dane następującym dostawcom, wyłącznie w zakresie
            niezbędnym do świadczenia usługi:
          </p>
          <ul className="list-disc list-inside text-on-surface-variant font-extralight leading-relaxed space-y-2 pl-4">
            <li>
              <strong className="font-normal text-on-surface">Supabase</strong>{' '}
              - uwierzytelnianie, baza danych, komunikacja w czasie rzeczywistym i
              hosting backendu Aplikacji.
            </li>
            <li>
              <strong className="font-normal text-on-surface">
                Google LLC
              </strong>{' '}
              - obsługa Logowania z Google.
            </li>
            <li>
              <strong className="font-normal text-on-surface">Apple Inc.</strong>{' '}
              - obsługa Logowania z Apple.
            </li>
            <li>
              <strong className="font-normal text-on-surface">Resend, Inc.</strong>{' '}
              - wysyłka wiadomości e-mail (potwierdzenia konta, newsletter).
            </li>
            <li>
              <strong className="font-normal text-on-surface">
                Sentry (Functional Software, Inc.)
              </strong>{' '}
              - diagnostyka awarii Aplikacji.
            </li>
            <li>
              <strong className="font-normal text-on-surface">
                RevenueCat, Inc.
              </strong>{' '}
              - obsługa subskrypcji BIFOR+ i weryfikacja zakupów.
            </li>
            <li>
              <strong className="font-normal text-on-surface">PostHog, Inc.</strong>{' '}
              - statystyki użycia Aplikacji, przetwarzane na serwerach w Unii
              Europejskiej.
            </li>
            <li>
              <strong className="font-normal text-on-surface">Expo</strong> -
              usługa dostarczania powiadomień push.
            </li>
            <li>
              <strong className="font-normal text-on-surface">
                Cloudflare, Inc.
              </strong>{' '}
              - ochrona formularza na stronie (Turnstile).
            </li>
            <li>
              <strong className="font-normal text-on-surface">Vercel Inc.</strong>{' '}
              - hosting strony internetowej.
            </li>
          </ul>
          <p className="text-on-surface-variant font-extralight leading-relaxed">
            Płatności za BIFOR+ obsługuje operator sklepu - Apple (App Store) lub
            Google (Google Play) - na własnych zasadach i jako odrębny
            administrator danych.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-light tracking-tight">
            7. Przekazywanie danych poza EOG
          </h2>
          <p className="text-on-surface-variant font-extralight leading-relaxed">
            Część powyższych dostawców może przetwarzać dane poza Europejskim
            Obszarem Gospodarczym (m.in. w USA). Przekazywanie odbywa się na
            podstawie standardowych klauzul umownych (SCC) zatwierdzonych przez
            Komisję Europejską lub innych mechanizmów zgodnych z RODO.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-light tracking-tight">
            8. Pliki cookies
          </h2>
          <p className="text-on-surface-variant font-extralight leading-relaxed">
            Strona bifor.games korzysta z plików cookies wyłącznie w zakresie
            niezbędnym do działania zabezpieczenia Cloudflare Turnstile. Są to
            cookies techniczne, które nie śledzą aktywności na innych stronach i
            nie służą celom marketingowym ani analitycznym. Na stronie nie
            korzystamy z Google Analytics, Facebook Pixel ani innych narzędzi
            śledzących i nie wyświetlamy reklam. Aplikacja mobilna nie używa
            plików cookies, nie wyświetla reklam i nie śledzi Cię w innych
            aplikacjach ani na stronach internetowych.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-light tracking-tight">
            9. Okres przechowywania danych
          </h2>
          <ul className="list-disc list-inside text-on-surface-variant font-extralight leading-relaxed space-y-2 pl-4">
            <li>
              Dane konta i profilu - do momentu usunięcia konta przez
              użytkownika.
            </li>
            <li>
              Dane rozgrywki (pokoje, wpisy) - usuwane automatycznie po
              zakończeniu gry (pokoje kasowane cyklicznie, najpóźniej w ciągu 7
              dni).
            </li>
            <li>
              Statystyki gier i odznaki oraz zapis dostępu do BIFOR+ - do
              momentu usunięcia konta.
            </li>
            <li>
              Historia transakcji w RevenueCat - pozostaje powiązana z
              identyfikatorem konta także po jego usunięciu. Na Twoją prośbę
              wysłaną na contact@bifor.games usuniemy ją również tam. Dane
              transakcji przechowują też Apple i Google na własnych zasadach.
            </li>
            <li>
              Statystyki użycia - do czasu, gdy przestaną być potrzebne do
              analizy działania Aplikacji. Na Twoją prośbę usuniemy je wcześniej.
            </li>
            <li>
              Dane gości - identyfikatory graczy bez konta są usuwane
              automatycznie po 30 dniach bez aktywności, a techniczne sesje
              logowania gości po 30 dniach od ich utworzenia.
            </li>
            <li>
              Zgłoszenia moderacyjne - przechowywane do czasu rozpatrzenia oraz w
              zakresie niezbędnym do celów dowodowych i bezpieczeństwa.
            </li>
            <li>
              Dane newslettera - do momentu wycofania zgody.
            </li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-light tracking-tight">
            10. Dzieci i osoby małoletnie
          </h2>
          <p className="text-on-surface-variant font-extralight leading-relaxed">
            Aplikacja jest przeznaczona dla osób, które ukończyły 16 lat. Świadomie
            nie zbieramy danych osób poniżej 16. roku życia. Jeżeli dowiemy się, że
            konto należy do osoby poniżej tego wieku, usuniemy je wraz z powiązanymi
            danymi. Jeśli jesteś rodzicem lub opiekunem i sądzisz, że dziecko
            przekazało nam swoje dane, napisz na{' '}
            <a
              href="mailto:contact@bifor.games"
              className="text-primary hover:underline"
            >
              contact@bifor.games
            </a>
            .
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-light tracking-tight">11. Twoje prawa</h2>
          <p className="text-on-surface-variant font-extralight leading-relaxed">
            Zgodnie z RODO przysługują Ci prawa: dostępu do danych, sprostowania,
            usunięcia (&quot;prawo do bycia zapomnianym&quot;), ograniczenia
            przetwarzania, przenoszenia danych, wycofania zgody w dowolnym momencie
            oraz wniesienia skargi do Prezesa Urzędu Ochrony Danych Osobowych
            (PUODO).
          </p>
          <p className="text-on-surface-variant font-extralight leading-relaxed">
            Konto wraz z danymi możesz usunąć samodzielnie w Aplikacji: Ustawienia
            → Konto → Usuń konto. Aby zrealizować pozostałe prawa (w tym dostęp do
            danych i ich przeniesienie), napisz na{' '}
            <a
              href="mailto:contact@bifor.games"
              className="text-primary hover:underline"
            >
              contact@bifor.games
            </a>
            .
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-light tracking-tight">
            12. Bezpieczeństwo
          </h2>
          <p className="text-on-surface-variant font-extralight leading-relaxed">
            Stosujemy środki techniczne adekwatne do ryzyka: sesja logowania jest
            przechowywana w bezpiecznym magazynie systemowym urządzenia (Keychain
            /Keystore), dostęp do danych w bazie chronią reguły bezpieczeństwa na
            poziomie wierszy (RLS), a transmisja odbywa się szyfrowanym połączeniem.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-light tracking-tight">
            13. Zmiany w polityce prywatności
          </h2>
          <p className="text-on-surface-variant font-extralight leading-relaxed">
            Administrator zastrzega sobie prawo do wprowadzania zmian w niniejszej
            polityce prywatności. Aktualna wersja będzie zawsze dostępna na tej
            stronie.
          </p>
        </section>
      </div>
    </div>
    </PageShell>
  );
}
