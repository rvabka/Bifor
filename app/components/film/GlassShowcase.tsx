'use client';

import dynamic from 'next/dynamic';
import { useCallback, useEffect, useRef, useState } from 'react';
import { GAMES } from '../../lib/games';
import { useReducedMotion } from '../useReducedMotion';
import ShowcaseSlabs from './ShowcaseSlabs';

/* three, drei and fiber are ~280 KB gzipped for this one section, so the
   scene is split out and only fetched where it will actually pay off. The
   slabs themselves are always on screen as plain DOM underneath; WebGL just
   cross-fades over them once it has drawn a frame. */
const GlassSlabs = dynamic(() => import('../three/GlassSlabs'), { ssr: false });

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);

type Connection = { effectiveType?: string; saveData?: boolean };

/* Phones and low-core machines are exactly where the canvas used to arrive
   late or not at all, and they are the ones the static slabs serve best. */
function scenePaysOff() {
  if (!window.matchMedia('(min-width: 1024px) and (pointer: fine)').matches) return false;
  if ((navigator.hardwareConcurrency ?? 4) < 4) return false;

  const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
  if (memory !== undefined && memory < 4) return false;

  const connection = (navigator as Navigator & { connection?: Connection }).connection;
  if (connection?.saveData) return false;
  if (connection?.effectiveType && !connection.effectiveType.includes('4g')) return false;

  /* A probe context costs a millisecond and rules out the machines where the
     canvas would mount, fail silently and leave a black band. */
  try {
    const probe = document.createElement('canvas');
    const gl = probe.getContext('webgl2') ?? probe.getContext('webgl');
    if (!gl) return false;
    (gl.getExtension('WEBGL_lose_context') as WEBGL_lose_context | null)?.loseContext();
  } catch {
    return false;
  }
  return true;
}

export default function GlassShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  /* The ref object itself is handed to the scene - never its value during
     render - so the scroll handler can write it every frame without a
     re-render and the canvas reads it inside useFrame. */
  const progress = useRef(0);
  const [armed, setArmed] = useState(false);
  const [active, setActive] = useState(false);
  const [ready, setReady] = useState(false);
  const [bailed, setBailed] = useState(false);
  const reduced = useReducedMotion();

  const wanted = !reduced && !bailed;
  const onReady = useCallback(() => setReady(true), []);
  const onBail = useCallback(() => {
    setBailed(true);
    setReady(false);
    setArmed(false);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || !wanted) return;
    if (!scenePaysOff()) {
      setBailed(true);
      return;
    }

    /* Armed a viewport and a half out, then warmed again on idle: the chunk
       used to start downloading as the section came into view, which on
       anything but a fast link meant staring at the copy on black until it
       landed. */
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

    /* Warmed on the first scroll rather than on load: by then the visitor is
       on their way here, but someone who bounces off the hero never pays for
       a library they will not see. */
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
  }, [wanted]);

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
        {/* Held back a little on narrow screens, where the slabs crowd the
            copy instead of framing it. */}
        <div
          className="absolute inset-0 opacity-65 transition-opacity duration-700 lg:opacity-100"
          style={ready ? { opacity: 0 } : undefined}
        >
          <ShowcaseSlabs />
        </div>

        {armed && wanted ? (
          <div
            className="absolute inset-0 transition-opacity duration-700"
            style={{ opacity: ready ? 1 : 0 }}
          >
            <GlassSlabs
              progress={progress}
              active={active}
              ready={ready}
              onReady={onReady}
              onBail={onBail}
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
