'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { createSequence, type SequenceHandle } from '../../lib/frameSequence';
import { useReducedMotion } from '../useReducedMotion';

const DESKTOP = { dir: '/film/wide', count: 61 };
/* Fewer, smaller frames on phones is a memory decision, not a quality one:
   61 frames at 810x1440 hold ~270 MB of decoded bitmap, which is past what
   an iOS tab gets. Over its budget the system evicts images and the canvas
   sticks on a stale frame - the film simply stops moving. */
const MOBILE = { dir: '/film/tall', count: 41 };

type Stage = {
  from: number;
  to: number;
  eyebrow: string;
  title: string;
  body: string;
};

/* The film runs screens-off to screens-on, so each stage of copy lands on
   the beat where that many phones are actually lit. */
const STAGES: Stage[] = [
  {
    from: 0,
    to: 0.3,
    eyebrow: 'Siedem gier imprezowych',
    title: 'Impreza zaczyna się tutaj.',
    body: 'Gry na imprezę, domówkę i before - w jednej aplikacji na telefon, dla ekipy od 2 do 10 osób.'
  },
  {
    from: 0.34,
    to: 0.64,
    eyebrow: 'Dwa tryby',
    title: 'Jeden telefon albo każdy swój.',
    body: 'Podajecie jeden aparat z ręki do ręki albo każdy dołącza kodem pokoju. Bez zakładania konta.'
  },
  {
    from: 0.68,
    to: 1,
    eyebrow: 'Trzydzieści sekund',
    title: 'Odpalasz i gracie.',
    body: 'Apka trzyma czas, losuje hasła i liczy punkty. Wy tylko krzyczycie.'
  }
];

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);

export default function HeroFilm() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cueRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [posterUp, setPosterUp] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;

    const tall = window.matchMedia('(max-aspect-ratio: 7/10)').matches;
    const spec = tall ? MOBILE : DESKTOP;
    let seq: SequenceHandle | null = createSequence(canvas, spec, () =>
      setPosterUp(true)
    );

    let raf = 0;
    let queued = false;

    const render = () => {
      queued = false;
      const rect = section.getBoundingClientRect();
      const distance = rect.height - window.innerHeight;
      const scrolled = -rect.top;
      const p = reduced ? 1 : distance > 0 ? clamp01(scrolled / distance) : 0;

      seq?.paint(p);

      for (let i = 0; i < STAGES.length; i++) {
        const el = stageRefs.current[i];
        if (!el) continue;
        const { from, to } = STAGES[i];
        const span = to - from;
        const local = clamp01((p - from) / span);
        /* Hold the copy legible across the middle of its window and only
           trade places at the edges, so nothing is half-faded while it is
           being read. */
        /* Stage one is the page's first paint, so it starts fully up
           rather than fading in from nothing. */
        const inFade = i === 0 ? 1 : clamp01(local / 0.18);
        const outFade = 1 - clamp01((local - 0.8) / 0.2);
        const last = i === STAGES.length - 1;
        const opacity = inFade * (last ? 1 : outFade);
        el.style.opacity = String(opacity);
        el.style.transform = `translate3d(0, ${((1 - inFade) * 26 - (last ? 0 : (1 - outFade) * 18)).toFixed(1)}px, 0)`;
        el.style.pointerEvents = opacity > 0.6 ? 'auto' : 'none';
      }

      if (cueRef.current) {
        cueRef.current.style.opacity = String(1 - clamp01(p / 0.08));
      }
    };

    const onScroll = () => {
      if (queued) return;
      queued = true;
      raf = requestAnimationFrame(render);
    };

    const onResize = () => {
      seq?.resize();
      onScroll();
    };

    render();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(raf);
      seq?.destroy();
      seq = null;
    };
  }, [reduced]);

  return (
    <section
      ref={sectionRef}
      className={reduced ? 'relative h-svh' : 'relative h-[280svh] md:h-[380svh]'}
    >
      <div className="sticky top-0 flex h-svh flex-col overflow-hidden bg-[#0a0a0a]">
        <canvas
          ref={canvasRef}
          aria-hidden
          className="absolute inset-0 h-full w-full"
          style={{ opacity: posterUp ? 1 : 0, transition: 'opacity 600ms ease' }}
        />

        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to top, rgba(10,10,10,0.96) 0%, rgba(10,10,10,0.82) 30%, rgba(10,10,10,0.42) 52%, rgba(10,10,10,0.12) 68%, transparent 82%)'
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0 hidden md:block"
          style={{
            background:
              'linear-gradient(to right, rgba(10,10,10,0.9) 0%, rgba(10,10,10,0.6) 34%, rgba(10,10,10,0.05) 62%, transparent 78%)'
          }}
        />
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#0a0a0a] via-[#0a0a0a]/70 to-transparent"
        />

        <div className="relative z-10 flex h-full flex-col justify-end">
          <div className="mx-auto grid w-full max-w-5xl px-6 pb-[max(3.5rem,calc(env(safe-area-inset-bottom)+3.5rem))] sm:px-8 md:pb-20">
            {STAGES.map((stage, i) => (
              <div
                key={stage.title}
                ref={(el) => {
                  stageRefs.current[i] = el;
                }}
                className="col-start-1 row-start-1 max-w-3xl self-end will-change-[transform,opacity]"
                style={{ opacity: i === 0 ? 1 : 0 }}
              >
                <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-primary sm:text-[11px]">
                  {stage.eyebrow}
                </p>
                {i === 0 ? (
                  <h1 className="font-display mt-4 text-balance text-[clamp(2.4rem,7.6vw,5.25rem)] font-extrabold leading-[0.94] tracking-[-0.035em]">
                    {stage.title}
                  </h1>
                ) : (
                  <p className="font-display mt-4 text-balance text-[clamp(2.4rem,7.6vw,5.25rem)] font-extrabold leading-[0.94] tracking-[-0.035em]">
                    {stage.title}
                  </p>
                )}
                <p className="mt-5 max-w-xl text-pretty text-[0.95rem] leading-relaxed text-on-surface-variant sm:text-lg">
                  {stage.body}
                </p>
              </div>
            ))}

            <div className="col-start-1 row-start-2 mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 sm:mt-10">
              <Link
                href="/pobierz"
                className="inline-flex h-14 items-center gap-3 rounded-full bg-primary px-8 text-base font-semibold text-on-primary transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
              >
                Pobierz za darmo
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                  <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <span className="text-[13px] leading-snug text-on-surface-variant">
                Otwarta beta na iPhone. Android wkrótce.
              </span>
            </div>
          </div>
        </div>

        <div
          ref={cueRef}
          aria-hidden
          className="pointer-events-none absolute bottom-8 right-8 z-10 hidden md:block"
        >
          <span className="text-[10px] font-medium uppercase tracking-[0.34em] text-on-surface-variant">
            Przewiń
          </span>
        </div>
      </div>
    </section>
  );
}
