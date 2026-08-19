'use client';

/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import { GAMES, gamePath } from '../lib/games';

const N = GAMES.length;
const AUTOPLAY_MS = 3600;
const HALF = N / 2;

const wrapOffset = (i: number, pos: number) => {
  const raw = i - pos;
  return ((((raw + HALF) % N) + N) % N) - HALF;
};

const mod = (v: number, m: number) => ((v % m) + m) % m;

export default function GamesSection() {
  const stageRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const posRef = useRef(0);
  const targetRef = useRef(0);
  const pausedRef = useRef(false);
  const draggingRef = useRef(false);
  const dragMovedRef = useRef(0);
  const lastAdvanceRef = useRef(0);
  const [active, setActive] = useState(0);
  const [dims, setDims] = useState({ cardW: 260, cardH: 325, spacing: 300 });

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const calc = () => {
      const stageH = el.clientHeight || 420;
      const stageW = el.clientWidth || window.innerWidth;
      let cardH = Math.min(500, Math.max(200, stageH * 0.9));
      let cardW = cardH * 0.78;
      const maxW = stageW * 0.66;
      if (cardW > maxW) {
        cardW = maxW;
        cardH = cardW / 0.78;
      }
      setDims({ cardW, cardH, spacing: Math.min(420, cardW * 1.12) });
    };
    calc();
    const ro = new ResizeObserver(calc);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const goTo = useCallback((next: number) => {
    targetRef.current = next;
    lastAdvanceRef.current = performance.now();
  }, []);

  const step = useCallback(
    (dir: number) => goTo(Math.round(targetRef.current) + dir),
    [goTo]
  );

  useEffect(() => {
    let raf = 0;
    let visible = false;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const paint = () => {
      const pos = posRef.current;
      for (let i = 0; i < N; i++) {
        const card = cardRefs.current[i];
        if (!card) continue;
        const off = wrapOffset(i, pos);
        const abs = Math.abs(off);
        const x = off * dims.spacing;
        const ry = Math.max(-46, Math.min(46, -off * 34));
        const tz = -Math.min(abs, 3) * 170;
        const sc = Math.max(0.6, 1 - abs * 0.13);
        card.style.transform = `translate(-50%, -50%) translate3d(${x.toFixed(1)}px, 0, ${tz.toFixed(1)}px) rotateY(${ry.toFixed(1)}deg) scale(${sc.toFixed(3)})`;
        card.style.opacity = String(Math.max(0, 1 - abs * 0.36));
        card.style.zIndex = String(100 - Math.round(abs * 10));
        card.style.pointerEvents = abs < 0.5 ? 'auto' : 'none';
      }
    };

    const loop = (time: number) => {
      if (
        !reduced &&
        !pausedRef.current &&
        !draggingRef.current &&
        time - lastAdvanceRef.current > AUTOPLAY_MS
      ) {
        lastAdvanceRef.current = time;
        targetRef.current = Math.round(targetRef.current) + 1;
      }

      const diff = targetRef.current - posRef.current;
      if (Math.abs(diff) > 0.0005) {
        posRef.current += diff * (draggingRef.current ? 1 : 0.09);
      } else {
        posRef.current = targetRef.current;
      }

      paint();

      const idx = mod(Math.round(posRef.current), N);
      setActive((prev) => (prev === idx ? prev : idx));

      raf = requestAnimationFrame(loop);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !visible) {
          visible = true;
          lastAdvanceRef.current = performance.now();
          raf = requestAnimationFrame(loop);
        } else if (!entry.isIntersecting && visible) {
          visible = false;
          cancelAnimationFrame(raf);
          raf = 0;
        }
      },
      { rootMargin: '120px 0px' }
    );
    const node = stageRef.current;
    if (node) io.observe(node);
    return () => {
      io.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, [dims]);

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    if ((e.target as HTMLElement).closest('button')) return;
    draggingRef.current = true;
    dragMovedRef.current = 0;
    const startX = e.clientX;
    const startPos = posRef.current;

    const move = (ev: PointerEvent) => {
      const dx = ev.clientX - startX;
      dragMovedRef.current = Math.max(dragMovedRef.current, Math.abs(dx));
      const next = startPos - dx / dims.spacing;
      posRef.current = next;
      targetRef.current = next;
    };
    const up = () => {
      draggingRef.current = false;
      targetRef.current = Math.round(posRef.current);
      lastAdvanceRef.current = performance.now();
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
      window.removeEventListener('pointercancel', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
    window.addEventListener('pointercancel', up);
  };

  const g = GAMES[active];

  return (
    <section
      id="gry"
      className="relative flex min-h-svh flex-col justify-center overflow-hidden bg-background py-14 sm:py-16"
    >
      <div className="shrink-0 px-6 text-center">
        <p className="text-[11px] font-medium uppercase tracking-[0.32em] text-on-surface-variant">
          Biblioteka
        </p>
        <h2 className="mt-3 text-balance text-[2.25rem] font-light leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
          Siedem <span className="text-primary font-normal">gier</span>, jeden wieczór.
        </h2>
        <p className="mx-auto mt-3 max-w-md text-balance text-base font-extralight leading-relaxed text-on-surface-variant">
          Przesuń, żeby poznać ekipę, która rozkręci każdą imprezę.
        </p>
      </div>

      <div
        ref={stageRef}
        onPointerDown={onPointerDown}
        onMouseEnter={() => {
          pausedRef.current = true;
        }}
        onMouseLeave={() => {
          pausedRef.current = false;
          lastAdvanceRef.current = performance.now();
        }}
        className="relative my-5 min-h-[220px] flex-1 cursor-grab touch-pan-y select-none active:cursor-grabbing sm:my-6"
        style={{ perspective: 1500 }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 transition-[background] duration-700"
          style={{
            background: `radial-gradient(42% 52% at 50% 50%, ${g.glow}24, transparent 70%)`
          }}
        />

        <div className="absolute inset-0" style={{ transformStyle: 'preserve-3d' }}>
          {GAMES.map((game, i) => (
            <div
              key={game.slug}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              className="absolute left-1/2 top-1/2 overflow-hidden rounded-[1.75rem]"
              style={{
                width: dims.cardW,
                height: dims.cardH,
                border: `1px solid ${game.glow}33`,
                backgroundColor: `${game.glow}10`,
                boxShadow: `0 30px 70px rgba(0,0,0,0.55), 0 0 44px ${game.glow}2e`,
                willChange: 'transform, opacity'
              }}
            >
              <Link
                href={gamePath(game.slug)}
                aria-label={`${game.title} - zasady gry i jak grać`}
                draggable={false}
                onClick={(e) => {
                  if (dragMovedRef.current > 8) e.preventDefault();
                }}
                className="block h-full w-full"
              >
                <img
                  src={game.art}
                  alt={`${game.title} - ${game.tagline}`}
                  className="h-full w-full object-cover object-top"
                  style={{ maxWidth: 'none' }}
                  draggable={false}
                />
              </Link>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={() => step(-1)}
          aria-label="Poprzednia gra"
          className="absolute left-2 top-1/2 z-[200] flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/30 text-on-surface-variant backdrop-blur transition-colors hover:text-on-surface sm:left-6"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
            <path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => step(1)}
          aria-label="Następna gra"
          className="absolute right-2 top-1/2 z-[200] flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/30 text-on-surface-variant backdrop-blur transition-colors hover:text-on-surface sm:right-6"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
            <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      <div className="shrink-0 px-6 text-center">
        <div className="mx-auto min-h-[8.5rem] max-w-lg" aria-live="polite">
          <div key={active} className="animate-[fadeUp_0.45s_ease-out]">
            <h3
              className="text-[1.75rem] font-light tracking-tight md:text-4xl"
              style={{ color: g.glow }}
            >
              {g.title}
            </h3>
            <p className="mt-2 text-base font-extralight text-on-surface md:text-lg">
              {g.tagline}
            </p>
            <p className="mt-1 text-sm font-light text-on-surface-variant">
              {g.players} · {g.modeLabel}
            </p>
            <Link
              href={gamePath(g.slug)}
              className="mt-2 inline-block text-xs uppercase tracking-[0.2em] transition-opacity hover:opacity-70"
              style={{ color: g.glow }}
            >
              Zasady i jak grać
            </Link>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-center gap-2">
          {GAMES.map((game, i) => (
            <button
              key={game.slug}
              type="button"
              aria-label={game.title}
              aria-current={i === active}
              onClick={() =>
                goTo(Math.round(targetRef.current) + wrapOffset(i, Math.round(targetRef.current)))
              }
              className="h-6 px-0.5"
            >
              <span
                className="block h-1.5 rounded-full transition-all duration-300"
                style={{
                  width: i === active ? 28 : 8,
                  backgroundColor: i === active ? game.glow : 'rgba(255,255,255,0.18)'
                }}
              />
            </button>
          ))}
        </div>

        <Link
          href="/gry"
          className="mt-4 inline-block text-xs font-light text-on-surface-variant transition-opacity hover:opacity-70"
        >
          Zobacz zasady i porównanie wszystkich 7 gier →
        </Link>
      </div>
    </section>
  );
}
