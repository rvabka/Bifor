import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';

import { normalizeRoomCode } from '../../lib/room';

export const alt = 'Zaproszenie do pokoju w BIFOR';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image({ params }: { params: Promise<{ code: string }> }) {
  const code = normalizeRoomCode((await params).code) ?? '';
  const [extraBold, semiBold] = await Promise.all([
    readFile(join(process.cwd(), 'app/fonts/montserrat-extrabold.ttf')),
    readFile(join(process.cwd(), 'app/fonts/montserrat-semibold.ttf'))
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 80,
          backgroundColor: '#0a0a0a',
          backgroundImage: 'radial-gradient(circle at 50% 42%, #facc1533, transparent 62%)',
          fontFamily: 'Montserrat'
        }}
      >
        <div
          style={{
            display: 'flex',
            fontSize: 28,
            fontWeight: 600,
            letterSpacing: 8,
            color: '#adaaaa',
            textTransform: 'uppercase'
          }}
        >
          Zaproszenie do pokoju
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: 176,
            fontWeight: 800,
            letterSpacing: 18,
            color: '#facc15',
            marginTop: 28
          }}
        >
          {code}
        </div>
        <div style={{ display: 'flex', fontSize: 44, fontWeight: 600, color: '#ffffff', marginTop: 24 }}>
          Ekipa czeka. Dołącz w BIFOR.
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'Montserrat', data: extraBold, weight: 800, style: 'normal' },
        { name: 'Montserrat', data: semiBold, weight: 600, style: 'normal' }
      ]
    }
  );
}
