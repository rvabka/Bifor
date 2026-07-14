'use client';

/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef, useState } from 'react';

type Game = {
  title: string;
  tagline: string;
  players: string;
  mode: string;
  art: string;
  glow: string;
};

const GAMES: Game[] = [
  { title: 'Czółko', tagline: 'Zgadnij kim jesteś, zanim czas minie.', players: '2–8 graczy', mode: 'Na jednym lub wielu telefonach', art: '/games/czolko.webp', glow: '#F59E0B' },
  { title: 'Zakazane', tagline: 'Opisz hasło bez używania zakazanych słów.', players: '2–4 drużyny', mode: 'Na jednym telefonie', art: '/games/zakazane.webp', glow: '#22C55E' },
  { title: 'Impostor', tagline: 'Odkryj zdrajcę wśród przyjaciół.', players: '3–8 graczy', mode: 'Na jednym lub wielu telefonach', art: '/games/impostor.webp', glow: '#EF4444' },
  { title: 'Sekrety', tagline: 'Poznajcie się lepiej, zanim impreza się rozkręci.', players: '3–10 graczy', mode: 'Każdy na swoim telefonie', art: '/games/sekrety.webp', glow: '#A855F7' },
  { title: 'Państwa Miasta', tagline: 'Litera, kolumny i walka o punkty.', players: '2–10 graczy', mode: 'Każdy na swoim telefonie', art: '/games/panstwa.webp', glow: '#3B82F6' },
  { title: 'Gra na P', tagline: 'Opisz hasło tylko słowami na literę P.', players: '2–4 drużyny', mode: 'Na jednym telefonie', art: '/games/granap.webp', glow: '#F97316' }
];

const N = GAMES.length;

export default function GamesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const lastFRef = useRef(-1);
  const [active, setActive] = useState(0);
  const [dims, setDims] = useState({ cardW: 280, cardH: 350, spacing: 330 });

  useEffect(() => {
    const calc = () => {
      const stageH = stageRef.current?.clientHeight ?? window.innerHeight * 0.5;
      let cardH = Math.min(440, Math.max(190, stageH * 0.82));
      let cardW = cardH * 0.8;
      const maxW = window.innerWidth * 0.72;
      if (cardW > maxW) {
        cardW = maxW;
        cardH = cardW * 1.25;
      }
      const spacing = Math.min(440, cardW * 1.18);
      setDims({ cardW, cardH, spacing });
    };
    calc();
    window.addEventListener('resize', calc, { passive: true });
    return () => window.removeEventListener('resize', calc);
  }, []);

  useEffect(() => {
    let raf = 0;
    // dims changed (e.g. resize) → force the next frame to recompute.
    lastFRef.current = -1;
    const update = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const dist = rect.height - vh;
      const scrolled = Math.min(Math.max(-rect.top, 0), dist);
      const p = dist > 0 ? scrolled / dist : 0;
      const f = p * (N - 1);

      // Skip redundant work when the position barely moved.
      if (Math.abs(f - lastFRef.current) < 0.002) return;
      lastFRef.current = f;

      for (let i = 0; i < N; i++) {
        const card = cardRefs.current[i];
        if (!card) continue;
        const off = i - f;
        const abs = Math.abs(off);
        const x = off * dims.spacing;
        const ry = Math.max(-52, Math.min(52, -off * 40));
        const tz = -Math.min(abs, 3) * 150;
        const sc = Math.max(0.62, 1 - abs * 0.14);
        card.style.transform = `translate(-50%, -50%) translateX(${x.toFixed(1)}px) translateZ(${tz.toFixed(1)}px) rotateY(${ry.toFixed(1)}deg) scale(${sc.toFixed(3)})`;
        card.style.opacity = String(Math.max(0.12, 1 - abs * 0.34));
        card.style.zIndex = String(100 - Math.round(abs * 10));
      }

      const idx = Math.max(0, Math.min(N - 1, Math.round(f)));
      setActive((prev) => (prev === idx ? prev : idx));
    };
    // iOS coalesces scroll events during momentum scrolling, so an
    // event-driven update runs in sparse bursts and the carousel stutters.
    // A continuous rAF loop ticks once per rendered frame regardless of when
    // scroll events fire, giving true refresh-rate motion. It runs only while
    // the section is on screen (IntersectionObserver) to save battery.
    const loop = () => {
      update();
      raf = requestAnimationFrame(loop);
    };

    let running = false;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !running) {
          running = true;
          lastFRef.current = -1;
          loop();
        } else if (!entry.isIntersecting && running) {
          running = false;
          cancelAnimationFrame(raf);
          raf = 0;
        }
      },
      { rootMargin: '100px 0px' }
    );
    const node = sectionRef.current;
    if (node) io.observe(node);
    return () => {
      io.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, [dims]);

  const g = GAMES[active];

  return (
    <section
      id="gry"
      ref={sectionRef}
      className="relative bg-background h-[300vh] md:h-[370vh]"
    >
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden">
        <div className="px-4 pt-20 text-center sm:pt-24 md:pt-28">
          <h2 className="text-[2.25rem] font-light leading-none tracking-tight sm:text-4xl md:text-6xl">
            Sześć <span className="text-primary font-normal">gier</span>, jeden
            wieczór.
          </h2>
          <p className="mx-auto mt-3 max-w-xl px-2 text-sm font-extralight text-on-surface-variant sm:mt-4 sm:text-base md:text-lg">
            Poznaj ekipę, która rozkręci każdą imprezę. Każda gra gotowa w kilka
            sekund — wystarczy telefon.
          </p>
        </div>

        <div ref={stageRef} className="relative flex-1" style={{ perspective: 1500 }}>
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 transition-[background] duration-500"
            style={{
              background: `radial-gradient(40% 50% at 50% 45%, ${g.glow}26, transparent 70%)`
            }}
          />

          <div className="absolute inset-0" style={{ transformStyle: 'preserve-3d' }}>
            {GAMES.map((game, i) => (
              <div
                key={game.title}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                className="absolute left-1/2 top-1/2 overflow-hidden rounded-[2rem]"
                style={{
                  width: dims.cardW,
                  height: dims.cardH,
                  border: `1px solid ${game.glow}40`,
                  backgroundColor: `${game.glow}10`,
                  boxShadow: `0 30px 60px rgba(0,0,0,0.5), 0 0 40px ${game.glow}33`,
                  willChange: 'transform, opacity'
                }}
              >
                <img
                  src={game.art}
                  alt={game.title}
                  className="h-full w-full object-cover object-top"
                  style={{ maxWidth: 'none' }}
                  draggable={false}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="px-4 pb-10 text-center sm:pb-12 md:pb-16">
          <div className="mx-auto min-h-32 max-w-lg sm:min-h-28">
            <div key={active} className="animate-[fadeUp_0.5s_ease-out]">
              <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-on-surface-variant">
                {String(active + 1).padStart(2, '0')} / 0{N}
              </p>
              <h3
                className="mt-2 text-3xl font-light tracking-tight md:text-4xl"
                style={{ color: g.glow }}
              >
                {g.title}
              </h3>
              <p className="mt-2 px-2 text-base font-extralight text-on-surface md:text-lg">
                {g.tagline}
              </p>
              <p className="mt-1 text-sm font-light text-on-surface-variant">
                {g.players} · {g.mode}
              </p>
            </div>
          </div>

          <div className="mt-5 flex items-center justify-center gap-2">
            {GAMES.map((game, i) => (
              <span
                key={game.title}
                className="h-1.5 rounded-full transition-all duration-300"
                style={{
                  width: i === active ? 26 : 8,
                  backgroundColor: i === active ? game.glow : 'rgba(255,255,255,0.18)'
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
