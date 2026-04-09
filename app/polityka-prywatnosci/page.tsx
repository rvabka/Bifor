import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Polityka prywatności — Bifor',
  description: 'Polityka prywatności aplikacji Bifor.'
};

export default function PrivacyPolicyPage() {
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
            Polityka prywatności
          </h1>
          <p className="text-on-surface-variant text-sm">
            Ostatnia aktualizacja: 9 kwietnia 2026
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
              href="mailto:kontakt@bifor.games"
              className="text-primary hover:underline"
            >
              kontakt@bifor.games
            </a>
            .
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-light tracking-tight">
            2. Jakie dane zbieramy
          </h2>
          <p className="text-on-surface-variant font-extralight leading-relaxed">
            W ramach działania strony internetowej bifor.games zbieramy
            następujące dane:
          </p>
          <ul className="list-disc list-inside text-on-surface-variant font-extralight leading-relaxed space-y-2 pl-4">
            <li>
              <strong className="font-normal text-on-surface">Imię</strong> —
              podane dobrowolnie w formularzu zapisu na newsletter.
            </li>
            <li>
              <strong className="font-normal text-on-surface">
                Adres e-mail
              </strong>{' '}
              — podany w formularzu zapisu na newsletter w celu otrzymywania
              informacji o aplikacji Bifor.
            </li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-light tracking-tight">
            3. Cel przetwarzania danych
          </h2>
          <p className="text-on-surface-variant font-extralight leading-relaxed">
            Twoje dane osobowe przetwarzamy w następujących celach:
          </p>
          <ul className="list-disc list-inside text-on-surface-variant font-extralight leading-relaxed space-y-2 pl-4">
            <li>
              Wysyłanie informacji o postępach w rozwoju aplikacji Bifor,
              wczesnym dostępie i ekskluzywnych bonusach (newsletter).
            </li>
            <li>
              Ochrona formularza przed botami i nadużyciami (Cloudflare
              Turnstile).
            </li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-light tracking-tight">
            4. Podstawa prawna
          </h2>
          <p className="text-on-surface-variant font-extralight leading-relaxed">
            Przetwarzanie danych odbywa się na podstawie Twojej dobrowolnej
            zgody (art. 6 ust. 1 lit. a RODO), wyrażonej poprzez wypełnienie
            formularza zapisu na newsletter. Zgodę możesz wycofać w dowolnym
            momencie, kontaktując się z nami na adres{' '}
            <a
              href="mailto:kontakt@bifor.games"
              className="text-primary hover:underline"
            >
              kontakt@bifor.games
            </a>{' '}
            lub klikając link rezygnacji w wiadomości e-mail.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-light tracking-tight">
            5. Odbiorcy danych
          </h2>
          <p className="text-on-surface-variant font-extralight leading-relaxed">
            Twoje dane mogą być przekazywane następującym podmiotom trzecim,
            wyłącznie w zakresie niezbędnym do realizacji celów opisanych
            powyżej:
          </p>
          <ul className="list-disc list-inside text-on-surface-variant font-extralight leading-relaxed space-y-2 pl-4">
            <li>
              <strong className="font-normal text-on-surface">
                Resend, Inc.
              </strong>{' '}
              — obsługa newslettera i przechowywanie listy kontaktów (USA,
              zgodność z RODO na podstawie standardowych klauzul umownych).
            </li>
            <li>
              <strong className="font-normal text-on-surface">
                Cloudflare, Inc.
              </strong>{' '}
              — ochrona formularza przed botami za pomocą usługi Turnstile (USA,
              zgodność z RODO na podstawie standardowych klauzul umownych).
            </li>
            <li>
              <strong className="font-normal text-on-surface">
                Vercel Inc.
              </strong>{' '}
              — hosting strony internetowej (USA, zgodność z RODO na podstawie
              standardowych klauzul umownych).
            </li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-light tracking-tight">
            6. Pliki cookies
          </h2>
          <p className="text-on-surface-variant font-extralight leading-relaxed">
            Strona bifor.games korzysta z plików cookies wyłącznie w zakresie
            niezbędnym do działania zabezpieczenia Cloudflare Turnstile. Są to
            cookies techniczne, które:
          </p>
          <ul className="list-disc list-inside text-on-surface-variant font-extralight leading-relaxed space-y-2 pl-4">
            <li>Służą do weryfikacji, czy użytkownik nie jest botem.</li>
            <li>Nie śledzą aktywności użytkownika na innych stronach.</li>
            <li>
              Nie są wykorzystywane do celów marketingowych ani analitycznych.
            </li>
            <li>
              Są ustawiane przez domenę cloudflare.com i wygasają po zakończeniu
              sesji.
            </li>
          </ul>
          <p className="text-on-surface-variant font-extralight leading-relaxed">
            Nie korzystamy z Google Analytics, Facebook Pixel ani żadnych innych
            narzędzi śledzących. Nie wyświetlamy reklam.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-light tracking-tight">
            7. Okres przechowywania danych
          </h2>
          <p className="text-on-surface-variant font-extralight leading-relaxed">
            Twoje dane osobowe przechowujemy do momentu wycofania zgody na ich
            przetwarzanie. Po wycofaniu zgody dane zostaną niezwłocznie usunięte
            z naszej listy kontaktów.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-light tracking-tight">8. Twoje prawa</h2>
          <p className="text-on-surface-variant font-extralight leading-relaxed">
            Zgodnie z RODO przysługują Ci następujące prawa:
          </p>
          <ul className="list-disc list-inside text-on-surface-variant font-extralight leading-relaxed space-y-2 pl-4">
            <li>Prawo dostępu do swoich danych osobowych.</li>
            <li>Prawo do sprostowania danych.</li>
            <li>
              Prawo do usunięcia danych (&quot;prawo do bycia
              zapomnianym&quot;).
            </li>
            <li>Prawo do ograniczenia przetwarzania.</li>
            <li>Prawo do przenoszenia danych.</li>
            <li>Prawo do wycofania zgody w dowolnym momencie.</li>
            <li>
              Prawo do wniesienia skargi do organu nadzorczego — Prezesa Urzędu
              Ochrony Danych Osobowych (PUODO).
            </li>
          </ul>
          <p className="text-on-surface-variant font-extralight leading-relaxed">
            W celu realizacji swoich praw skontaktuj się z nami pod adresem{' '}
            <a
              href="mailto:kontakt@bifor.games"
              className="text-primary hover:underline"
            >
              kontakt@bifor.games
            </a>
            .
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-light tracking-tight">
            9. Zmiany w polityce prywatności
          </h2>
          <p className="text-on-surface-variant font-extralight leading-relaxed">
            Administrator zastrzega sobie prawo do wprowadzania zmian w
            niniejszej polityce prywatności. Aktualna wersja będzie zawsze
            dostępna na tej stronie.
          </p>
        </section>
      </div>
    </main>
  );
}
