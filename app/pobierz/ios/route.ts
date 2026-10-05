import { redirect } from 'next/navigation';

import { APP_STORE_URL } from '../../lib/download';

// Stałe wejście dla iPhone'a, bliźniak /pobierz/android - do bio, kodów QR i
// maili, żeby adres karty w App Store żył tylko w lib/download.ts.
export const dynamic = 'force-dynamic';

export function GET() {
  redirect(APP_STORE_URL);
}
