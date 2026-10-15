export const ROOM_CODE_LENGTH = 6;

const ALPHABET = new Set('ABCDEFGHJKMNPQRSTUVWXYZ23456789');

export function normalizeRoomCode(input: string): string | null {
  const code = decodeURIComponent(input)
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, '')
    .slice(0, ROOM_CODE_LENGTH);
  if (code.length !== ROOM_CODE_LENGTH) return null;
  for (const ch of code) {
    if (!ALPHABET.has(ch)) return null;
  }
  return code;
}

export const roomAppLink = (code: string) => `bifor://room/${code}`;

// Przy przejściu do sklepu kod trafia do schowka: po instalacji ekran
// dołączania w apce proponuje wklejenie. Apple nie przekazuje niczego przez
// instalację, więc na iPhonie to jedyna droga, żeby kod przeżył sklep.
// Zapis musi ruszyć w obsłudze stuknięcia, a na wynik czekamy krótko, żeby
// nie opóźniać przejścia do sklepu.
export async function copyRoomCode(code: string | null | undefined): Promise<void> {
  if (!code) return;
  try {
    const write = navigator.clipboard?.writeText(code);
    if (!write) return;
    await Promise.race([write, new Promise((resolve) => setTimeout(resolve, 350))]);
  } catch {}
}
