import { GAMES } from '../../lib/games';

/* The instant rendition of the showcase: seven lit slabs built from two divs
   each. It costs nothing and paints with the HTML, so the section is never a
   black rectangle while three.js is still on the wire - and on phones, slow
   links and machines without WebGL it is the whole effect, not a stand-in. */

type Placement = {
  x: number;
  y: number;
  scale: number;
  tilt: number;
  depth: number;
  lift: number;
  duration: number;
  delay: number;
};

/* Positions trace the same shallow arc the scene sweeps: big and cropped at
   the edges, small and dim toward the middle, so the copy always sits in the
   quiet part of the frame. */
const PLACEMENTS: Placement[] = [
  { x: 84, y: 40, scale: 1.12, tilt: -7, depth: 1, lift: 16, duration: 11, delay: -1.5 },
  { x: 2, y: 52, scale: 1.02, tilt: 8, depth: 0.92, lift: 20, duration: 13, delay: -6 },
  { x: 21, y: 34, scale: 0.72, tilt: -5, depth: 0.62, lift: 12, duration: 9.5, delay: -3 },
  { x: 37, y: 72, scale: 0.66, tilt: 6, depth: 0.5, lift: 14, duration: 12, delay: -8 },
  { x: 96, y: 64, scale: 0.86, tilt: 5, depth: 0.7, lift: 18, duration: 14, delay: -4.5 },
  { x: 55, y: 76, scale: 0.6, tilt: -6, depth: 0.44, lift: 11, duration: 10.5, delay: -2 },
  { x: 68, y: 26, scale: 0.64, tilt: 7, depth: 0.5, lift: 13, duration: 12.5, delay: -7 }
];

export default function ShowcaseSlabs() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {GAMES.map((game, i) => {
        const p = PLACEMENTS[i % PLACEMENTS.length];
        const width = `calc(clamp(46px, 6.4vw, 92px) * ${p.scale})`;

        return (
          <div
            key={game.slug}
            className="absolute"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width,
              transform: `translate(-50%, -50%) rotate(${p.tilt}deg)`,
              opacity: 0.34 + p.depth * 0.5
            }}
          >
            <div
              className="slab-drift relative"
              style={
                {
                  aspectRatio: '1 / 2.06',
                  '--slab-lift': `${p.lift}px`,
                  '--slab-duration': `${p.duration}s`,
                  '--slab-delay': `${p.delay}s`
                } as React.CSSProperties
              }
            >
              <div
                className="absolute -inset-[70%] rounded-full"
                style={{
                  background: `radial-gradient(closest-side, ${game.glow}4d, transparent 72%)`
                }}
              />
              <div
                className="absolute inset-0 rounded-[16%/7.5%] border border-white/10"
                style={{
                  background: 'linear-gradient(150deg, #1b1c22 0%, #0d0e12 60%)',
                  boxShadow: `0 0 ${28 * p.depth + 12}px ${game.glow}59`
                }}
              />
              <div
                className="absolute inset-[7%] rounded-[12%/5.5%]"
                style={{
                  background: `linear-gradient(155deg, ${game.glow} 0%, ${game.glow}d9 52%, ${game.glow}8c 100%)`
                }}
              />
              <div
                className="absolute inset-0 rounded-[16%/7.5%]"
                style={{
                  background:
                    'linear-gradient(148deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.04) 26%, transparent 46%)'
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
