import { ImageResponse } from 'next/og';

export const alt = 'Bifor - gry imprezowe na telefon';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
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
          backgroundColor: '#0a0a0a',
          backgroundImage:
            'radial-gradient(circle at 50% 36%, rgba(255,178,0,0.20), transparent 58%)',
          fontFamily: 'sans-serif'
        }}
      >
        <div style={{ display: 'flex', fontSize: 168, fontWeight: 800, letterSpacing: -4 }}>
          <span style={{ color: '#ffffff' }}>Bifor</span>
          <span style={{ color: '#ffb200' }}>.</span>
        </div>
        <div style={{ display: 'flex', fontSize: 46, color: '#d4d4d4', marginTop: 6 }}>
          Gry imprezowe na telefon
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: 26,
            fontWeight: 600,
            color: '#ffb200',
            marginTop: 48,
            letterSpacing: 6
          }}
        >
          GRAJ ZE ZNAJOMYMI KODEM PIN
        </div>
      </div>
    ),
    { ...size }
  );
}
