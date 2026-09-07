import { redirect } from 'next/navigation';

import { ANDROID_NOTIFY_ANCHOR, androidPaused, androidTarget } from '../../lib/download';

// Stale wejscie dla Androida. Artefakt EAS zmienia adres z kazdym buildem, a ten
// nie - dzieki temu link wyslany raz do newslettera nie starzeje sie nigdy.
export const dynamic = 'force-dynamic';

export function GET() {
  // Adres jest staly i rozeslany, wiec gdy Android czeka na Google Play, nie
  // prowadzi donikad tylko do zapisu na powiadomienie.
  redirect(androidPaused ? ANDROID_NOTIFY_ANCHOR : androidTarget);
}
