import { abs } from './site';

// Przeglądarka wbudowana w TikToka przedstawia się tokenami ByteDance, nie nazwą
// aplikacji. `trill` to wariant TikToka z części rynków azjatyckich.
const TIKTOK_UA = /musical_ly|BytedanceWebview|TikTok|trill_/i;
const IOS_UA = /iPhone|iPad|iPod/i;

// TikTok od 2023 roku nie przepuszcza z bio kont prywatnych przejścia do App
// Store - kończy się komunikatem „Nie można ukończyć działania”. Google Play
// przechodzi normalnie, więc problem dotyczy wyłącznie iPhone'a.
export const blocksAppStore = (ua: string) => IOS_UA.test(ua) && TIKTOK_UA.test(ua);

// Stały adres pobierania - wklejony w Safari przekierowuje prosto do App Store.
// Schematu `x-safari-https://` nie używamy: TikTok blokuje go tym samym
// komunikatem co link do App Store.
export const SAFARI_DOWNLOAD_URL = abs('/pobierz/ios');

// Parametr, z którym /pobierz/ios odsyła przeglądarkę TikToka na /pobierz -
// tam od razu wyjeżdża instrukcja zamiast martwego przekierowania.
export const SAFARI_PROMPT_PARAM = 'safari';
