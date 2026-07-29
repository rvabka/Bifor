import { ImageResponse } from 'next/og';
import { GAMES, getGame } from '../../lib/games';

export const alt = 'Gra imprezowa w aplikacji Bifor';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export function generateStaticParams() {
  return GAMES.map((game) => ({ slug: game.slug }));
}

export default async function Image({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const game = getGame(slug);
  const title = game?.title ?? 'Bifor';
  const tagline = game?.tagline ?? 'Gry imprezowe na telefon';
  const glow = game?.glow ?? '#ffb200';
  const meta = game ? `${game.players} · ${game.duration}` : 'Graj ze znajomymi';

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
          backgroundImage: `radial-gradient(circle at 50% 38%, ${glow}33, transparent 60%)`,
          fontFamily: 'sans-serif'
        }}
      >
        <div
          style={{
            display: 'flex',
            fontSize: 26,
            letterSpacing: 8,
            color: '#adaaaa',
            textTransform: 'uppercase'
          }}
        >
          Bifor · gry imprezowe
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: 128,
            fontWeight: 800,
            letterSpacing: -4,
            color: glow,
            marginTop: 24,
            textAlign: 'center'
          }}
        >
          {title}
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: 40,
            color: '#ffffff',
            marginTop: 16,
            textAlign: 'center'
          }}
        >
          {tagline}
        </div>
        <div style={{ display: 'flex', fontSize: 28, color: '#adaaaa', marginTop: 40 }}>
          {meta}
        </div>
      </div>
    ),
    { ...size }
  );
}
