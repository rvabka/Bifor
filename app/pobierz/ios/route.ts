import { redirect } from 'next/navigation';

import { APP_STORE_URL } from '../../lib/download';
import { SAFARI_PROMPT_PARAM, blocksAppStore } from '../../lib/inAppBrowser';

// Stałe wejście dla iPhone'a, bliźniak /pobierz/android - do bio, kodów QR i
// maili, żeby adres karty w App Store żył tylko w lib/download.ts.
export const dynamic = 'force-dynamic';

export function GET(request: Request) {
  // Z przeglądarki TikToka przekierowanie do App Store kończy się błędem, więc
  // taki ruch idzie na /pobierz, gdzie czeka instrukcja przejścia do Safari.
  if (blocksAppStore(request.headers.get('user-agent') ?? '')) {
    redirect(`/pobierz?${SAFARI_PROMPT_PARAM}=1`);
  }
  redirect(APP_STORE_URL);
}
