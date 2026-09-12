'use client';

import dynamic from 'next/dynamic';
import { useCallback, useEffect, useRef, useState } from 'react';
import { GAMES } from '../../lib/games';
import { useReducedMotion } from '../useReducedMotion';

/* WebGL, drei and postprocessing are a heavy payload for one section, so the
   scene is split out. Until it lands the block is just type on black, which
   is why it is fetched on the first scroll and armed a viewport and a half
   out rather than at the edge of the section. */
const GlassSlabs = dynamic(() => import('../three/GlassSlabs'), { ssr: false });

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);

export default function GlassShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  /* The ref object itself is handed to the scene - never its value during
     render - so the scroll handler can write it every frame without a
     re-render and the canvas reads it inside useFrame. */
  const progress = useRef(0);
  const [armed, setArmed] = useState(false);
  const [active, setActive] = useState(false);
  const [ready, setReady] = useState(false);
  /* One remount recovers a lost WebGL context. Past that the driver is gone
     and retrying would only spin. */
  const [attempt, setAttempt] = useState(0);
  const reduced = useReducedMotion();

  const onReady = useCallback(() => setReady(true), []);
  const onLost = useCallback(() => {
    setReady(false);
    setAttempt((n) => (n === 0 ? 1 : n));
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || reduced) return;

    const arm = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setArmed(true);
          arm.disconnect();
        }
      },
      { rootMargin: '150% 0px' }
    );
    /* Separate from arming: the scene must also stop once it scrolls away. */
    const live = new IntersectionObserver(([entry]) => setActive(entry.isIntersecting));
    arm.observe(section);
    live.observe(section);

    /* Warmed on the first scroll, on idle: the module then has three screens
       of hero to land in instead of starting to download once the section is
       already needed. Someone who bounces off the hero still pays nothing. */
    let idle = 0;
    const warm = () => {
      const load = () => void import('../three/GlassSlabs');
      idle = window.requestIdleCallback
        ? window.requestIdleCallback(load, { timeout: 4000 })
        : window.setTimeout(load, 400);
    };
    window.addEventListener('scroll', warm, { passive: true, once: true });

    return () => {
      arm.disconnect();
      live.disconnect();
      window.removeEventListener('scroll', warm);
      if (!idle) return;
      if (window.cancelIdleCallback) window.cancelIdleCallback(idle);
      else window.clearTimeout(idle);
    };
  }, [reduced]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || reduced) return;

    let raf = 0;
    let queued = false;
    const render = () => {
      queued = false;
      const rect = section.getBoundingClientRect();
      const distance = rect.height - window.innerHeight;
      progress.current = distance > 0 ? clamp01(-rect.top / distance) : 0;
    };
    const onScroll = () => {
      if (queued) return;
      queued = true;
      raf = requestAnimationFrame(render);
    };
    render();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
    };
  }, [reduced]);

  return (
    <section
      ref={sectionRef}
      className={reduced ? 'relative' : 'relative h-[240svh]'}
      aria-label="Siedem gier Bifor"
    >
      <div className="sticky top-0 flex h-svh items-center overflow-hidden bg-[#0a0a0a]">
        {armed ? (
          /* Revealed on the first drawn frame rather than on mount, so the
             section never shows the blank canvas that precedes it. */
          <div
            className="absolute inset-0 transition-opacity duration-500"
            style={{ opacity: ready ? 1 : 0 }}
          >
            <GlassSlabs
              key={attempt}
              progress={progress}
              active={active}
              ready={ready}
              onReady={onReady}
              onLost={attempt === 0 ? onLost : undefined}
            />
          </div>
        ) : null}

        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(70% 52% at 50% 48%, rgba(10,10,10,0.86) 0%, rgba(10,10,10,0.55) 46%, transparent 76%)'
          }}
        />

        <div className="relative z-10 mx-auto w-full max-w-6xl px-6 text-center sm:px-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-on-surface-variant">
            Jedna aplikacja
          </p>
          <h2 className="font-display mx-auto mt-5 max-w-4xl text-balance text-[clamp(2.25rem,7vw,4.75rem)] font-extrabold leading-[0.94] tracking-[-0.035em]">
            Siedem gier w jednej kieszeni.
          </h2>
          <p className="mx-auto mt-6 max-w-lg text-pretty text-base leading-relaxed text-on-surface-variant sm:text-lg">
            Jedna ikona na ekranie zamiast siedmiu. Nic nie doinstalowujecie w
            trakcie wieczoru i nic nie szukacie w sklepie.
          </p>

          <ul className="mx-auto mt-10 flex max-w-3xl flex-wrap items-center justify-center gap-x-4 gap-y-2.5 sm:gap-x-5">
            {GAMES.map((game) => (
              <li
                key={game.slug}
                className="text-[11px] font-semibold uppercase tracking-[0.2em] sm:text-xs"
                style={{ color: game.glow }}
              >
                {game.title}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
