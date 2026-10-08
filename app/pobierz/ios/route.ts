import { redirect } from 'next/navigation';

import { SAFARI_PROMPT_PARAM, blocksAppStore } from '../../lib/inAppBrowser';
import { SOURCE_PARAM, appStoreUrlFor, sourceFromParams } from '../../lib/source';

// Stałe wejście dla iPhone'a, bliźniak /pobierz/android - do bio, kodów QR i
// maili, żeby adres karty w App Store żył tylko w lib/download.ts. `?z=tiktok`
// idzie dalej do sklepu jako oznaczenie kampanii.
export const dynamic = 'force-dynamic';

export function GET(request: Request) {
  const source = sourceFromParams(new URL(request.url).searchParams);
  // Z przeglądarki TikToka przekierowanie do App Store kończy się błędem, więc
  // taki ruch idzie na /pobierz, gdzie czeka instrukcja przejścia do Safari.
  if (blocksAppStore(request.headers.get('user-agent') ?? '')) {
    redirect(`/pobierz?${SAFARI_PROMPT_PARAM}=1${source ? `&${SOURCE_PARAM}=${source}` : ''}`);
  }
  redirect(appStoreUrlFor(source));
}
