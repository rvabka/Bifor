import { APP_STORE_ID, APP_STORE_URL, PLAY_URL, androidTarget } from './download';

// Źródło wejścia (`?z=tiktok`) doklejane do linków sklepów, żeby App Store Connect
// i Play Console pokazały, z którego kanału przyszła instalacja. Strona sama nic
// nie mierzy - raporty są w sklepach.
export const SOURCE_PARAM = 'z';
export const SITE_SOURCE = 'strona';
export const INVITE_SOURCE = 'zaproszenie';

// Identyfikator dostawcy z App Store Connect (Analytics → Acquisition → Campaigns,
// parametr `pt` w wygenerowanym linku). Bez niego Apple nie przypisze instalacji
// do kampanii.
export const APP_STORE_PROVIDER_TOKEN: string | null = '129131510';

const SESSION_KEY = 'bifor.zrodlo';
const SOCIAL = new Set(['tiktok', 'instagram', 'youtube', 'facebook']);

export const cleanSource = (raw: string | null | undefined) => {
  const value = (raw ?? '').toLowerCase().replace(/[^a-z0-9-]/g, '').slice(0, 40);
  return value || null;
};

export const sourceFromParams = (params: URLSearchParams) =>
  cleanSource(params.get(SOURCE_PARAM) ?? params.get('utm_source'));

const mediumFor = (source: string) => {
  if (SOCIAL.has(source)) return 'social';
  if (source === INVITE_SOURCE) return 'referral';
  if (source === SITE_SOURCE) return 'web';
  return 'partner';
};

// Format linku kampanii dokładnie taki, jaki generuje App Store Connect.
export const appStoreUrlFor = (source: string | null) =>
  source && APP_STORE_PROVIDER_TOKEN
    ? `https://apps.apple.com/app/apple-store/id${APP_STORE_ID}?pt=${APP_STORE_PROVIDER_TOKEN}&ct=${source}&mt=8`
    : APP_STORE_URL;

export const playUrlFor = (source: string | null) => {
  if (!PLAY_URL) return androidTarget;
  if (!source) return PLAY_URL;
  const referrer = encodeURIComponent(`utm_source=${source}&utm_medium=${mediumFor(source)}`);
  return `${PLAY_URL}&referrer=${referrer}`;
};

// Źródło z adresu wejścia zostaje w sesji, bo do sklepu klika się zwykle dopiero
// na drugiej albo trzeciej podstronie. Wołane tylko w przeglądarce.
export const rememberSource = () => {
  try {
    const fromUrl = sourceFromParams(new URLSearchParams(window.location.search));
    if (fromUrl) sessionStorage.setItem(SESSION_KEY, fromUrl);
  } catch {}
};

export const currentSource = (fallback: string) => {
  try {
    const fromUrl = sourceFromParams(new URLSearchParams(window.location.search));
    if (fromUrl) return fromUrl;
    return cleanSource(sessionStorage.getItem(SESSION_KEY)) ?? fallback;
  } catch {
    return fallback;
  }
};
