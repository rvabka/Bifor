import type { Metadata } from 'next';
import Link from 'next/link';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Regulamin',
  description:
    'Regulamin i warunki korzystania z aplikacji Bifor z grami imprezowymi, w tym zasady dotyczące treści użytkowników.',
  alternates: { canonical: '/terms' }
};

const P_CLASS =
  'text-on-surface-variant font-extralight leading-relaxed';
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
    <a
      href="mailto:kontakt@bifor.games"
      className="text-primary hover:underline"
    >
      kontakt@bifor.games
    </a>
  );
}

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-background text-on-surface py-32 px-4 md:px-8">
      <div className="max-w-3xl mx-auto space-y-12">
        <div className="space-y-4">
          <Link
            href="/"
            className="text-primary text-sm hover:underline inline-flex items-center gap-2"
          >
            ← Wróć na stronę główną
          </Link>
          <h1 className="text-4xl md:text-5xl font-light tracking-tight">
            Regulamin
          </h1>
          <p className="text-on-surface-variant text-sm">
            Ostatnia aktualizacja: 4 lipca 2026
          </p>
          <p className={P_CLASS}>
            Niniejszy Regulamin (dalej „Regulamin”) stanowi umowę licencyjną
            użytkownika końcowego (EULA) oraz określa warunki korzystania z
            aplikacji mobilnej Bifor (dalej „Aplikacja”). Zakładając konto lub
            korzystając z Aplikacji, akceptujesz ten Regulamin. Jeśli się na
            niego nie zgadzasz, nie korzystaj z Aplikacji.
          </p>
        </div>

        <Section title="1. Postanowienia ogólne">
          <p className={P_CLASS}>
            Dostawcą Aplikacji jest Bifor (dalej „my”, „nas”, „Dostawca”).
            Kontakt: <Mail />. Aplikacja to zestaw towarzyskich gier imprezowych,
            w które grasz wspólnie ze znajomymi na jednym urządzeniu lub w
            prywatnym pokoju online.
          </p>
        </Section>

        <Section title="2. Definicje">
          <ul className={UL_CLASS}>
            <li>
              <strong className="font-normal text-on-surface">Użytkownik</strong>{' '}
              - osoba korzystająca z Aplikacji, zalogowana lub w trybie gościa.
            </li>
            <li>
              <strong className="font-normal text-on-surface">Konto</strong> -
              konto tworzone przez email, Google lub Apple.
            </li>
            <li>
              <strong className="font-normal text-on-surface">
                Treści Użytkownika
              </strong>{' '}
              - dowolne treści, które tworzysz lub wprowadzasz w Aplikacji:
              pseudonim (nick), sekrety, stwierdzenia, odpowiedzi, zdjęcia
              (selfie) oraz inne dane przekazywane w trakcie gry.
            </li>
            <li>
              <strong className="font-normal text-on-surface">Pokój</strong> -
              prywatna sesja gry online, do której inni dołączają za pomocą kodu
              PIN lub kodu QR.
            </li>
          </ul>
        </Section>

        <Section title="3. Wiek i uprawnienie do korzystania">
          <p className={P_CLASS}>
            Aby zakładać konto i korzystać z Aplikacji, musisz mieć ukończone co
            najmniej 16 lat; przy pierwszym uruchomieniu potwierdzasz swój wiek.
            Aplikacja zawiera treści imprezowe — pytania, zabawy i wyzwania
            towarzyskie — zgodnie z kategorią wiekową przypisaną Aplikacji w
            sklepie App Store / Google Play. Korzystając z Aplikacji, oświadczasz,
            że spełniasz wymóg wieku oraz że wszystkie podane przez Ciebie dane są
            prawdziwe.
          </p>
        </Section>

        <Section title="4. Licencja">
          <p className={P_CLASS}>
            Udzielamy Ci niewyłącznej, nieprzenoszalnej, odwołalnej licencji na
            korzystanie z Aplikacji na urządzeniach, które posiadasz lub
            kontrolujesz, wyłącznie do użytku osobistego i niekomercyjnego,
            zgodnie z niniejszym Regulaminem oraz zasadami sklepu App Store /
            Google Play. Nie wolno Ci w szczególności:
          </p>
          <ul className={UL_CLASS}>
            <li>
              kopiować, modyfikować, dekompilować ani odtwarzać kodu źródłowego
              Aplikacji, poza zakresem dozwolonym przez bezwzględnie
              obowiązujące prawo;
            </li>
            <li>
              wykorzystywać Aplikacji do celów niezgodnych z prawem, oszustw lub
              naruszania praw osób trzecich;
            </li>
            <li>
              zakłócać działania Aplikacji, obchodzić zabezpieczeń ani uzyskiwać
              nieuprawnionego dostępu do naszych systemów.
            </li>
          </ul>
        </Section>

        <Section title="5. Treści Użytkownika i zasady zachowania (zero tolerancji)">
          <p className={P_CLASS}>
            Aplikacja umożliwia tworzenie i przekazywanie Treści Użytkownika
            innym uczestnikom gry. Ponosisz pełną odpowiedzialność za treści,
            które tworzysz, publikujesz lub udostępniasz. Stosujemy politykę{' '}
            <strong className="font-normal text-on-surface">
              zera tolerancji
            </strong>{' '}
            wobec treści i zachowań o charakterze obraźliwym oraz wobec
            użytkowników dopuszczających się nadużyć.
          </p>
          <p className={P_CLASS}>Zabronione jest w szczególności tworzenie, przesyłanie lub udostępnianie treści, które:</p>
          <ul className={UL_CLASS}>
            <li>
              są obraźliwe, nękające, zniesławiające, grożące, zastraszające lub
              stanowią mowę nienawiści;
            </li>
            <li>
              dyskryminują ze względu na rasę, pochodzenie etniczne,
              narodowość, religię, płeć, orientację seksualną, tożsamość
              płciową, wiek lub niepełnosprawność;
            </li>
            <li>
              zawierają treści seksualne z udziałem osób nieletnich lub w
              jakikolwiek sposób seksualizują osoby nieletnie - takie treści
              zgłaszamy odpowiednim organom;
            </li>
            <li>
              przedstawiają przemoc, samookaleczenia, nadużywanie substancji lub
              nakłaniają do nich;
            </li>
            <li>
              naruszają prywatność lub prawa (w tym prawa autorskie i dobra
              osobiste) innych osób, w tym udostępnianie cudzych danych bez
              zgody;
            </li>
            <li>
              są nielegalne, wprowadzają w błąd, stanowią spam lub złośliwe
              oprogramowanie.
            </li>
          </ul>
          <p className={P_CLASS}>
            Przekazując Treści Użytkownika, udzielasz nam ograniczonej licencji
            niezbędnej wyłącznie do technicznego świadczenia usługi (np.
            przesłania treści innym graczom w Twoim pokoju w trakcie gry). Nie
            wykorzystujemy Twoich treści do innych celów. Większość treści w
            grze ma charakter ulotny i nie jest trwale przechowywana po
            zakończeniu rundy lub gry.
          </p>
        </Section>

        <Section title="6. Zgłaszanie, blokowanie i moderacja">
          <p className={P_CLASS}>
            Udostępniamy narzędzia pozwalające reagować na nadużycia. W ramach
            Aplikacji możesz:
          </p>
          <ul className={UL_CLASS}>
            <li>
              <strong className="font-normal text-on-surface">zgłosić</strong>{' '}
              treść lub gracza, którego zachowanie narusza Regulamin;
            </li>
            <li>
              <strong className="font-normal text-on-surface">
                zablokować
              </strong>{' '}
              innego użytkownika, aby nie widzieć jego treści ani nie grać z nim
              w jednym pokoju.
            </li>
          </ul>
          <p className={P_CLASS}>
            Zgłoszenia możesz przesyłać także na adres <Mail />.
            Rozpatrujemy zgłoszenia dotyczące treści obraźliwych oraz nadużyć i
            reagujemy na nie{' '}
            <strong className="font-normal text-on-surface">
              w ciągu 24 godzin
            </strong>{' '}
            - usuwając treści naruszające Regulamin oraz, w uzasadnionych
            przypadkach, blokując lub usuwając konto sprawcy. Zastrzegamy sobie
            prawo do moderowania, ograniczania lub usuwania treści oraz kont
            naruszających Regulamin, według naszego uznania i zgodnie z
            obowiązującym prawem.
          </p>
        </Section>

        <Section title="7. Konsekwencje naruszeń">
          <p className={P_CLASS}>
            W przypadku naruszenia Regulaminu możemy - w zależności od wagi
            naruszenia - usunąć treść, ograniczyć dostęp do funkcji, zawiesić lub
            trwale usunąć Konto, a także zgłosić sprawę właściwym organom, jeśli
            wymaga tego prawo. Możesz w każdej chwili usunąć swoje Konto w
            ustawieniach Aplikacji; usunięcie Konta powoduje trwałe skasowanie
            powiązanych z nim danych profilu.
          </p>
        </Section>

        <Section title="8. Zakupy w aplikacji">
          <p className={P_CLASS}>
            Aplikacja może oferować płatne treści dodatkowe (np. pakiety pytań)
            w formie zakupów w aplikacji. Płatności są obsługiwane wyłącznie
            przez operatora sklepu (Apple App Store lub Google Play) zgodnie z
            jego regulaminem i polityką zwrotów. Ceny oraz zakres dostępnych
            treści mogą ulegać zmianie. Zakupione treści są przypisane do konta,
            z którego dokonano zakupu.
          </p>
        </Section>

        <Section title="9. Własność intelektualna">
          <p className={P_CLASS}>
            Aplikacja, jej kod, grafiki, logo, nazwa oraz treści przygotowane
            przez nas są chronione prawem i stanowią naszą własność lub własność
            naszych licencjodawców. Regulamin nie przenosi na Ciebie żadnych praw
            do tych elementów poza licencją opisaną w pkt 4.
          </p>
        </Section>

        <Section title="10. Wyłączenie odpowiedzialności">
          <p className={P_CLASS}>
            Aplikacja jest udostępniana „taką, jaka jest” i „w miarę
            dostępności”. W granicach dozwolonych przez prawo nie ponosimy
            odpowiedzialności za treści tworzone przez innych użytkowników ani za
            szkody wynikające z korzystania z Aplikacji. Niniejsze postanowienie
            nie ogranicza uprawnień przysługujących konsumentom na podstawie
            bezwzględnie obowiązujących przepisów prawa.
          </p>
        </Section>

        <Section title="11. Prywatność">
          <p className={P_CLASS}>
            Zasady przetwarzania danych osobowych opisuje nasza{' '}
            <Link
              href="/polityka-prywatnosci"
              className="text-primary hover:underline"
            >
              Polityka prywatności
            </Link>
            , która stanowi integralną część niniejszego Regulaminu.
          </p>
        </Section>

        <Section title="12. Zmiany Regulaminu">
          <p className={P_CLASS}>
            Zastrzegamy sobie prawo do zmiany Regulaminu. O istotnych zmianach
            poinformujemy w Aplikacji lub drogą e-mail. Aktualna wersja jest
            zawsze dostępna na tej stronie. Dalsze korzystanie z Aplikacji po
            wejściu zmian w życie oznacza ich akceptację.
          </p>
        </Section>

        <Section title="13. Postanowienia dotyczące urządzeń Apple">
          <p className={P_CLASS}>
            Poniższe postanowienia mają zastosowanie, jeśli pobierasz Aplikację
            ze sklepu Apple App Store:
          </p>
          <ul className={UL_CLASS}>
            <li>
              Regulamin zawierasz wyłącznie z nami (Bifor), a nie z Apple. Apple
              nie jest stroną tej umowy.
            </li>
            <li>
              Apple nie ma obowiązku świadczenia jakiegokolwiek wsparcia ani
              serwisu w odniesieniu do Aplikacji.
            </li>
            <li>
              W razie niezgodności Aplikacji z obowiązującą gwarancją możesz
              powiadomić Apple, a Apple zwróci Ci cenę zakupu (jeśli dotyczy). W
              maksymalnym zakresie dozwolonym prawem Apple nie ma żadnych innych
              zobowiązań gwarancyjnych, a za wszelkie roszczenia dotyczące
              Aplikacji odpowiadamy my.
            </li>
            <li>
              Apple nie odpowiada za rozpatrywanie roszczeń dotyczących Aplikacji
              lub korzystania z niej, w tym roszczeń z tytułu odpowiedzialności
              za produkt, niezgodności z przepisami oraz roszczeń konsumenckich.
            </li>
            <li>
              W przypadku roszczeń osób trzecich, że Aplikacja narusza ich prawa
              własności intelektualnej, za takie roszczenia odpowiadamy my, a nie
              Apple.
            </li>
            <li>
              Apple oraz jego podmioty zależne są beneficjentami będącymi osobami
              trzecimi niniejszego Regulaminu i mają prawo go egzekwować.
            </li>
            <li>
              Oświadczasz, że nie znajdujesz się w kraju objętym embargiem rządu
              USA ani na liście podmiotów objętych zakazem, oraz że będziesz
              przestrzegać warunków usług osób trzecich związanych z korzystaniem
              z Aplikacji.
            </li>
          </ul>
        </Section>

        <Section title="14. Prawo właściwe i kontakt">
          <p className={P_CLASS}>
            Regulamin podlega prawu polskiemu, z zastrzeżeniem bezwzględnie
            obowiązujących przepisów chroniących konsumentów w kraju ich
            zamieszkania. Wszelkie pytania dotyczące Regulaminu kieruj na adres{' '}
            <Mail />.
          </p>
        </Section>
      </div>
    </main>
  );
}
