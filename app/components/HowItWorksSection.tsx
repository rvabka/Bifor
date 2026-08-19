'use client';

/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef, useState } from 'react';
import { seeded, seededRange } from '../lib/rand';
import { START_STEPS } from '../lib/steps';
import { useReducedMotion } from './useReducedMotion';

const N = START_STEPS.length;

const CONFETTI_TINTS = ['#FFB200', '#6EA8FF', '#C084FC', '#22C55E', '#F472B6'];

const CONFETTI = Array.from({ length: 38 }, (_, i) => {
  const duration = seededRange(i + 13, 3.6, 7, 2);
  const size = Math.round(seededRange(i + 19, 5, 10, 0));
  return {
    left: seededRange(i + 1, 0, 100, 2),
    delay: Number((-seeded(i + 7) * duration).toFixed(2)),
    duration,
    size,
    height: Number((size * 1.8).toFixed(1)),
    tint: CONFETTI_TINTS[i % CONFETTI_TINTS.length],
    drift: seededRange(i + 23, -35, 35, 1)
  };
});

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));
const smooth = (t: number) => t * t * (3 - 2 * t);

const clock = (s: number) => `0:${String(Math.round(s)).padStart(2, '0')}`;

export default function HowItWorksSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const clockRef = useRef<HTMLSpanElement>(null);
  const artRefs = useRef<(HTMLDivElement | null)[]>([]);
  const railRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const auraRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const shotRefs = useRef<(HTMLDivElement | null)[]>([]);
  const crewRef = useRef<HTMLDivElement>(null);
  const partyRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    let raf = 0;
    let running = false;

    const update = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const dist = rect.height - vh;
      const scrolled = clamp(-rect.top, 0, Math.max(dist, 1));
      const p = dist > 0 ? scrolled / dist : 0;

      const seg = p * N;
      const idx = Math.min(N - 1, Math.floor(seg));
      const local = seg - idx;
      const t = smooth(clamp((local - 0.62) / 0.38, 0, 1));
      const pos = Math.min(idx + t, N - 1);

      if (clockRef.current) {
        const lo = START_STEPS[Math.min(N - 1, Math.floor(pos))].clock;
        const hi = START_STEPS[Math.min(N - 1, Math.ceil(pos))].clock;
        const frac = pos - Math.floor(pos);
        clockRef.current.textContent = clock(lo + (hi - lo) * frac);
      }

      for (let i = 0; i < N; i++) {
        const w = clamp(1 - Math.abs(pos - i), 0, 1);
        const eased = smooth(w);
        const art = artRefs.current[i];
        if (art) {
          art.style.opacity = String(eased);
          art.style.transform = `translate3d(0, ${((1 - eased) * 34).toFixed(1)}px, 0) scale(${(0.94 + eased * 0.06).toFixed(3)})`;
        }
        const rail = railRefs.current[i];
        if (rail) {
          rail.style.transform = `scaleX(${clamp(pos - i + 1, 0, 1).toFixed(3)})`;
        }
        const shot = shotRefs.current[i];
        if (shot) shot.style.opacity = String(eased);
      }

      const finale = clamp(1 - Math.abs(pos - (N - 1)), 0, 1);
      const easedFinale = smooth(finale);

      if (phoneRef.current) {
        phoneRef.current.style.opacity = String(1 - easedFinale);
        phoneRef.current.style.transform = `translate3d(0, ${(easedFinale * 60).toFixed(1)}px, 0) scale(${(1 - easedFinale * 0.12).toFixed(3)})`;
      }
      if (crewRef.current) {
        crewRef.current.style.transform = `translate3d(${(-easedFinale * 13).toFixed(2)}%, 0, 0) scale(${(1 + easedFinale * 0.12).toFixed(3)})`;
      }
      if (partyRef.current) {
        partyRef.current.style.opacity = String(easedFinale);
      }

      if (auraRef.current) {
        const lo = START_STEPS[Math.min(N - 1, Math.floor(pos))].tint;
        const hi = START_STEPS[Math.min(N - 1, Math.ceil(pos))].tint;
        auraRef.current.style.background = `radial-gradient(44% 46% at 60% 52%, ${lo}22, transparent 66%), radial-gradient(36% 40% at 74% 58%, ${hi}16, transparent 68%)`;
      }

      const next = Math.round(pos);
      setActive((prev) => (prev === next ? prev : next));
    };

    const loop = () => {
      update();
      raf = requestAnimationFrame(loop);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !running) {
          running = true;
          raf = requestAnimationFrame(loop);
        } else if (!entry.isIntersecting && running) {
          running = false;
          cancelAnimationFrame(raf);
          raf = 0;
        }
      },
      { rootMargin: '120px 0px' }
    );
    const node = sectionRef.current;
    if (node) io.observe(node);
    return () => {
      io.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, [reduced]);

  const step = START_STEPS[active];

  if (reduced) {
    return (
      <>
        <section id="jak-to-dziala" className="bg-background px-6 py-20 md:px-12">
          <p className="text-[11px] font-medium uppercase tracking-[0.32em] text-on-surface-variant">
            Jak to działa
          </p>
          <h2 className="mt-4 max-w-xl text-balance text-[1.75rem] font-light leading-[1.1] tracking-tight sm:text-3xl md:text-4xl">
            Od zera do pierwszej rundy:{' '}
            <span className="text-primary font-normal">30 sekund.</span>
          </h2>

          <ol className="mt-12 space-y-12">
            {START_STEPS.map((s) => (
              <li key={s.name} className="flex flex-wrap items-center gap-x-10 gap-y-6">
                <div className="max-w-md flex-1">
                  <span className="block text-4xl font-extralight tabular-nums tracking-tight text-primary">
                    {clock(s.clock)}
                  </span>
                  <h3 className="mt-3 text-[1.75rem] font-light leading-[1.1] tracking-tight sm:text-4xl">
                    {s.name}
                  </h3>
                  <p className="mt-3 text-base font-extralight leading-relaxed text-on-surface-variant sm:text-lg">
                    {s.text}
                  </p>
                </div>
                <img src={s.art} alt="" className="h-40 w-auto sm:h-52" draggable={false} />
              </li>
            ))}
          </ol>
        </section>
      </>
    );
  }

  return (
    <>
      <section
        id="jak-to-dziala"
        ref={sectionRef}
        className="relative bg-background h-[280vh] md:h-[320vh]"
      >
        <div className="sticky top-0 h-svh overflow-hidden">
          <div ref={auraRef} aria-hidden className="pointer-events-none absolute inset-0" />

          <div className="relative mx-auto flex h-full w-full max-w-[1500px] flex-col justify-center px-6 md:px-12">
          <div className="relative z-10 pb-[34svh] md:pb-0">
            <p className="text-[11px] font-medium uppercase tracking-[0.32em] text-on-surface-variant">
              Jak to działa
            </p>
            <h2 className="mt-4 max-w-xl text-balance text-[1.75rem] font-light leading-[1.1] tracking-tight sm:text-3xl md:text-4xl">
              Od zera do pierwszej rundy:{' '}
              <span className="text-primary font-normal">30 sekund.</span>
            </h2>

            <div className="mt-7 flex max-w-xs gap-2" aria-hidden>
              {START_STEPS.map((s, i) => (
                <span key={s.name} className="h-0.5 flex-1 rounded-full bg-white/12">
                  <span
                    ref={(el) => {
                      railRefs.current[i] = el;
                    }}
                    className="block h-0.5 origin-left rounded-full bg-primary"
                    style={{ transform: 'scaleX(0)' }}
                  />
                </span>
              ))}
            </div>

            <div className="mt-14 max-w-md sm:mt-16">
              <span
                ref={clockRef}
                className="block text-5xl font-extralight tabular-nums tracking-tight text-primary sm:text-6xl"
              >
                0:02
              </span>

              <div key={active} className="mt-5 animate-[fadeUp_0.5s_ease-out]">
                <h3 className="text-balance text-[2.25rem] font-light leading-[1.05] tracking-tight sm:text-5xl">
                  {step.name}
                </h3>
                <p className="mt-4 text-base font-extralight leading-relaxed text-on-surface-variant sm:text-lg">
                  {step.text}
                </p>
              </div>
            </div>
          </div>

          <div
            aria-hidden
            className="pointer-events-none absolute top-1/2 hidden -translate-y-1/2 lg:left-[38%] lg:block lg:w-[224px] xl:left-[41%] xl:w-[268px]"
          >
            <div ref={phoneRef} style={{ willChange: 'transform, opacity' }}>
              <div
                className="relative rounded-[2.1rem] border border-white/12 bg-[#0d0d11] p-[5px] shadow-[0_44px_100px_rgba(0,0,0,0.75)]"
                style={{ transform: 'rotate(-5deg)' }}
              >
                <div
                  className="relative overflow-hidden rounded-[1.85rem]"
                  style={{ aspectRatio: '560 / 1216' }}
                >
                  {START_STEPS.map((s, i) =>
                    s.shot ? (
                      <div
                        key={s.name}
                        ref={(el) => {
                          shotRefs.current[i] = el;
                        }}
                        className="absolute inset-0"
                        style={{ opacity: i === 0 ? 1 : 0, willChange: 'opacity' }}
                      >
                        <img
                          src={s.shot}
                          alt=""
                          className="h-full w-full object-cover"
                          draggable={false}
                        />
                      </div>
                    ) : null
                  )}
                </div>
              </div>
            </div>
          </div>

          <div
            ref={partyRef}
            aria-hidden
            className="pointer-events-none absolute inset-y-0 hidden overflow-hidden lg:left-[34%] lg:right-[21%] lg:block"
            style={{ opacity: 0 }}
          >
            {CONFETTI.map((c, i) => (
              <span
                key={i}
                className="confetti absolute top-0 block rounded-[2px]"
                style={{
                  left: `${c.left}%`,
                  width: c.size,
                  height: c.height,
                  backgroundColor: c.tint,
                  animationDelay: `${c.delay}s`,
                  animationDuration: `${c.duration}s`,
                  '--drift': `${c.drift}px`
                } as React.CSSProperties}
              />
            ))}
          </div>

          <div
            ref={crewRef}
            aria-hidden
            className="pointer-events-none absolute bottom-0 right-0 h-[34svh] w-[64%] origin-bottom-right sm:h-[48svh] sm:w-[52%] md:right-[1%] md:h-[80svh] md:w-[44%]"
            style={{ willChange: 'transform' }}
          >
            {START_STEPS.map((s, i) => (
              <div
                key={s.name}
                ref={(el) => {
                  artRefs.current[i] = el;
                }}
                className="absolute inset-0 origin-bottom"
                style={{ opacity: i === 0 ? 1 : 0, willChange: 'transform, opacity' }}
              >
                <img
                  src={s.art}
                  alt=""
                  className="absolute bottom-0 right-0 h-full w-auto max-w-none object-contain"
                  draggable={false}
                />
              </div>
            ))}
          </div>

          </div>

          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent"
          />
        </div>
      </section>
    </>
  );
}
