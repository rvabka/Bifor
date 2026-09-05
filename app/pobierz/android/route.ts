import { redirect } from 'next/navigation';

import { androidTarget } from '../../lib/download';

// Stale wejscie dla Androida. Artefakt EAS zmienia adres z kazdym buildem, a ten
// nie - dzieki temu link wyslany raz do newslettera nie starzeje sie nigdy.
export const dynamic = 'force-dynamic';

export function GET() {
  redirect(androidTarget);
}
