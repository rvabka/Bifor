'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { GAMES } from '../../lib/games';
import { useReducedMotion } from '../useReducedMotion';

/* WebGL, drei and postprocessing are a heavy payload for one section (about
   280 KB over the wire), so the scene is split out. Until it draws, the block
   shows the poster below - the scene's own first frame - instead of black. */
const GlassSlabs = dynamic(() => import('../three/GlassSlabs'), { ssr: false });

/* Captured from the live scene at t = 0 and progress 0, without the scrim and
   the copy, on a 2.4:1 canvas. The camera has a fixed vertical field of view,
   so the frame lines up with the scene at any width as long as it is scaled
   to the viewport height and centred - which is exactly how it is placed. */
const POSTER = { src: '/film/glass-poster.webp', width: 2880, height: 1200 };

const onIdle = (fn: () => void, timeout: number) =>
  window.requestIdleCallback
    ? window.requestIdleCallback(fn, { timeout })
    : window.setTimeout(fn, 300);

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

    /* Fetched as soon as the page is idle, then mounted on the next idle
       slot: by the time the visitor scrolls through the hero the shaders are
       compiled and the canvas sits ready, paused, behind the poster. Waiting
       for the first scroll left the module downloading while the section was
       already on screen. */
    let idle = 0;
    let started = false;
    let cancelled = false;
    const warm = () => {
      if (started) return;
      started = true;
      idle = onIdle(() => {
        void import('../three/GlassSlabs').then(() => {
          if (!cancelled) idle = onIdle(() => setArmed(true), 1500);
        });
      }, 1500);
    };
    window.addEventListener('scroll', warm, { passive: true, once: true });
    if (document.readyState === 'complete') warm();
    else window.addEventListener('load', warm, { once: true });

    return () => {
      cancelled = true;
      arm.disconnect();
      live.disconnect();
      window.removeEventListener('scroll', warm);
      window.removeEventListener('load', warm);
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
        <Image
          src={POSTER.src}
          alt=""
          aria-hidden
          width={POSTER.width}
          height={POSTER.height}
          unoptimized
          loading="eager"
          fetchPriority="low"
          draggable={false}
          className="pointer-events-none absolute left-1/2 top-0 h-full w-auto max-w-none -translate-x-1/2 select-none"
        />
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
