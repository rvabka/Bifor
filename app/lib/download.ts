// Jedyne miejsce z adresami do pobrania. Cala reszta (strona /pobierz, redirect
// /pobierz/android, maile do newslettera, bio na TikToku) wskazuje na stale
// adresy w tej domenie, wiec zmiana kanalu dystrybucji to zmiana TEGO pliku -
// bez erraty do listy mailingowej i bez poprawiania opisow na TikToku.

// Publiczny link grupy zewnetrznej TestFlight (testflight.apple.com/join/XXXXXXXX).
// Pusty string = przycisk iOS pokazuje sie jako niedostepny zamiast prowadzic donikad.
export const TESTFLIGHT_URL = 'https://testflight.apple.com/join/QeyxePNt';

// APK jako plik wydania na PUBLICZNYM repo strony. Adres `/releases/latest/`
// zawsze wskazuje najnowsze wydanie, wiec po kolejnym buildzie NIE zmieniasz tu
// nic - wystarczy wgrac nowy plik pod ta sama nazwa w nowym wydaniu.
//
// Dlaczego nie artefakt EAS: EAS kasuje artefakty po 30 dniach
// (`artifactsExpirationDate`), wiec link w newsletterze umieralby sam, w losowym
// momencie, bez zadnego sygnalu. Dlaczego nie Supabase Storage: darmowy plan ma
// limit rozmiaru pojedynczego pliku, ktory APK potrafi przekroczyc, a i tak
// trzeba by nadpisywac plik recznie. GitHub nie ma tu ani jednego, ani drugiego.
export const ANDROID_APK_URL =
  'https://github.com/rvabka/Bifor/releases/latest/download/bifor-beta.apk';

// Gdy Android przejdzie na Google Play: wpisz adres sklepu. Strona i redirect
// przelacza sie same, instrukcja o "nieznanych zrodlach" znika.
export const PLAY_URL: string | null = null;

export const androidTarget = PLAY_URL ?? ANDROID_APK_URL;
export const androidViaPlay = PLAY_URL !== null;
export const hasIosBuild = TESTFLIGHT_URL.length > 0;

// Android nie ma PUBLICZNEGO kanalu, dopoki apka nie wejdzie do Google Play. APK
// zostaje w tym pliku, bo nadal wysylamy go pojedynczym osobom, ale strona go nie
// podaje z dwoch powodow: instalacja z pliku nie liczy sie do wymaganych przez
// Google 12 testerow na kanale zamknietym (a od nich zalezy dostep do produkcji),
// i kosztuje ostrzezenia Play Protect plus pytania na kontakt@. Zamiast tego kafel
// Androida zbiera zapisy na powiadomienie.
//
// Wpisanie PLAY_URL wyzej odwraca to samo: przycisk wraca do roli przycisku,
// blok z zapisem znika, redirect /pobierz/android znowu prowadzi do instalacji.
export const androidPaused = PLAY_URL === null;

// Kotwica bloku z zapisem na /pobierz. Trzymana tu, bo wskazuje na nia takze
// redirect /pobierz/android, czyli adres uzywany w mailach i w bio na TikToku.
export const ANDROID_NOTIFY_ANCHOR = '/pobierz#powiadom';
