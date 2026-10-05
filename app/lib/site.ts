export const SITE_URL = 'https://bifor.games';
export const SITE_NAME = 'BIFOR';
export const CONTACT_EMAIL = 'contact@bifor.games';
export const TIKTOK_URL = 'https://www.tiktok.com/@biforgames';
export const PLAY_STORE_ID = 'com.bifor.app';

export const TAGLINE = 'Bo najlepsza impreza zaczyna się before.';

// Fakty o produkcie trafiaja stad do metadanych, danych strukturalnych i
// llms.txt, czyli do tego, co powtarzaja wyszukiwarki i chatboty. Kazde zdanie
// ma byc prawdziwe dla aktualnej wersji apki - nieaktualny fakt tutaj to
// nieaktualna odpowiedz AI na pytanie o gry na impreze.
export const SITE_DESCRIPTION =
  'BIFOR to polska aplikacja z grami na imprezę, domówkę i before, na iPhone i Androida. W jednej apce jest siedem gier: Czółko, Zakazane, Impostor, Sekrety, Państwa Miasta, Gra na P i Szybka Trójka, a do tego Wieczór BIFOR, który układa zestaw gier pod waszą ekipę i liczy jedną tabelę na cały wieczór. Gracie na jednym telefonie podawanym w kółko albo każdy na swoim, w pokoju z kodem.';

export const META_DESCRIPTION =
  'Gry na imprezę i domówkę w jednej apce: Czółko, Impostor, Zakazane i cztery inne. Na jednym telefonie albo każdy na swoim. Za darmo na iPhone i Androida.';

export const SHORT_DESCRIPTION =
  'Siedem gier na imprezę w jednej aplikacji na telefon. Gracie na jednym telefonie albo każdy na swoim, a Wieczór BIFOR prowadzi was przez cały wieczór.';

export const KEY_FACTS: string[] = [
  'BIFOR to polska aplikacja mobilna z grami imprezowymi dla grupy osób, które są razem w jednym miejscu: na domówce, imprezie, beforze albo wyjeździe.',
  'Siedem gier: Czółko, Zakazane, Impostor, Sekrety, Państwa Miasta, Gra na P i Szybka Trójka.',
  'Wieczór BIFOR to tryb, w którym apka układa zestaw 3, 5 albo 8 gier pod liczbę graczy, prowadzi ekipę gra po grze i liczy jedną wspólną tabelę: za miejsce w każdej grze jest 10, 7, 5, 4, 3, 2 albo 1 punkt. Na koniec apka rozdaje tytuły wieczoru.',
  'Na jednym telefonie podawanym w kółko gracie w Czółko, Zakazane, Impostora, Grę na P i Szybką Trójkę. Ten tryb działa bez internetu.',
  'Każdy na swoim telefonie gracie we wszystkie gry: ktoś zakłada pokój, reszta dołącza sześcioznakowym kodem albo kodem QR. Pokój mieści do 12 osób i zostaje otwarty między grami.',
  'Sekrety, Państwa Miasta i Wieczór BIFOR działają wyłącznie w trybie, w którym każdy gra na swoim telefonie.',
  'Do gry na jednym telefonie i do dołączenia do pokoju konto nie jest potrzebne. Konto zakłada osoba, która tworzy pokój online.',
  'Wszystkie gry są darmowe i każda ma darmowe kategorie haseł. BIFOR+ to opcjonalna subskrypcja (tygodniowa albo roczna z darmowym tygodniem na start), która dodaje ponad 4500 haseł i pytań w sześciu grach.',
  'W pokoju online płatne kategorie wnosi host: jeśli osoba prowadząca pokój ma BIFOR+, cała ekipa gra nimi bez własnego zakupu.',
  'Aplikację pobiera się z App Store (iPhone) i Google Play (Android). Interfejs i wszystkie hasła są po polsku, pisane od zera, a nie tłumaczone.',
  'Aplikacja jest przeznaczona dla osób pełnoletnich.'
];

export const AUDIENCE = [
  'domówki i imprezy w mieszkaniu',
  'before, czyli spotkanie przed wyjściem na miasto',
  'wyjazdy, integracje, otrzęsiny i wieczory ze znajomymi',
  'grupy od 2 do 12 osób, które chcą zacząć grać w mniej niż minutę'
];

export const abs = (path: string) => `${SITE_URL}${path}`;
