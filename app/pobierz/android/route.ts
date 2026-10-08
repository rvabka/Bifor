import { redirect } from 'next/navigation';

import { ANDROID_NOTIFY_ANCHOR, androidPaused } from '../../lib/download';
import { playUrlFor, sourceFromParams } from '../../lib/source';

// Stale wejscie dla Androida. Artefakt EAS zmienia adres z kazdym buildem, a ten
// nie - dzieki temu link wyslany raz do newslettera nie starzeje sie nigdy.
export const dynamic = 'force-dynamic';

export function GET(request: Request) {
  // Adres jest staly i rozeslany, wiec gdy Android czeka na Google Play, nie
  // prowadzi donikad tylko do zapisu na powiadomienie.
  if (androidPaused) redirect(ANDROID_NOTIFY_ANCHOR);
  redirect(playUrlFor(sourceFromParams(new URL(request.url).searchParams)));
}
