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
