// Jedyne miejsce z adresami do pobrania. Cala reszta (strona /pobierz, redirecty
// /pobierz/ios i /pobierz/android, maile do newslettera, bio na TikToku) wskazuje
// na stale adresy w tej domenie, wiec zmiana kanalu dystrybucji to zmiana TEGO
// pliku - bez erraty do listy mailingowej i bez poprawiania opisow na TikToku.

// Karta BIFOR w App Store. Identyfikator z App Store Connect (ascAppId), bez
// nazwy w adresie - Apple przekierowuje sam, a zmiana nazwy apki nie psuje linku.
export const APP_STORE_ID = '6788678207';
export const APP_STORE_URL = `https://apps.apple.com/pl/app/id${APP_STORE_ID}`;

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

// Adres sklepu Google Play. `null` = Androida nie ma w sklepie: kafel zbiera
// wtedy zapisy na powiadomienie, a redirect /pobierz/android prowadzi do zapisu.
export const PLAY_URL: string | null =
  'https://play.google.com/store/apps/details?id=com.bifor.app';

export const androidTarget = PLAY_URL ?? ANDROID_APK_URL;
export const androidViaPlay = PLAY_URL !== null;

// Brak JAKIEGOKOLWIEK publicznego kanalu na Androida. Wtedy - i tylko wtedy -
// kafel Androida przestaje byc przyciskiem i zbiera zapisy na powiadomienie.
// APK zostaje w tym pliku, bo nadal wysylamy go pojedynczym osobom, ale strona
// go nie podaje: instalacja z pliku nie liczy sie do wymaganych przez Google
// 12 testerow, a kosztuje ostrzezenia Play Protect i pytania na kontakt@.
export const androidPaused = PLAY_URL === null;

// Kotwica bloku z zapisem na /pobierz. Trzymana tu, bo wskazuje na nia takze
// redirect /pobierz/android, czyli adres uzywany w mailach i w bio na TikToku.
export const ANDROID_NOTIFY_ANCHOR = '/pobierz#powiadom';

// Linki do obu sklepow naraz - dane strukturalne, llms.txt i przyciski sklepow.
export const STORE_LINKS = [APP_STORE_URL, PLAY_URL].filter(
  (url): url is string => url !== null
);
