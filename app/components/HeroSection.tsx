'use client';

/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { Fragment, useEffect, useRef } from 'react';
import { GAMES } from '../lib/games';
import { seeded, seededRange } from '../lib/rand';
import { smoothScrollTo } from './scrollTo';

const TITLE_LINES = [['Impreza', 'zaczyna', 'się'], ['tutaj.']];

const SPARKS = Array.from({ length: 26 }, (_, i) => {
  const duration = seededRange(i + 5, 9, 18, 2);
  return {
    left: seededRange(i + 1, 0, 100, 2),
    delay: Number((-seeded(i + 11) * duration).toFixed(2)),
    duration,
    size: Math.round(seededRange(i + 17, 2, 4, 0)),
    drift: seededRange(i + 29, -45, 45, 1),
    warm: seeded(i + 37) > 0.45
  };
});

export default function HeroSection() {
  const auraRef = useRef<HTMLDivElement>(null);
  const mascotRef = useRef<HTMLDivElement>(null);
  const mascotLeftRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduced) return;

    let raf = 0;
    let tx = 0;
    let ty = 0;
    let cx = 0;
    let cy = 0;

    const onMove = (e: PointerEvent) => {
      tx = e.clientX / window.innerWidth - 0.5;
      ty = e.clientY / window.innerHeight - 0.5;
    };

    const loop = () => {
      cx += (tx - cx) * 0.06;
      cy += (ty - cy) * 0.06;
      if (auraRef.current) {
        auraRef.current.style.transform = `translate3d(${(cx * 70).toFixed(1)}px, ${(cy * 46).toFixed(1)}px, 0)`;
      }
      if (mascotRef.current) {
        mascotRef.current.style.transform = `translate3d(${(cx * -24).toFixed(1)}px, ${(cy * -14).toFixed(1)}px, 0)`;
      }
      if (mascotLeftRef.current) {
        mascotLeftRef.current.style.transform = `translate3d(${(cx * 18).toFixed(1)}px, ${(cy * -10).toFixed(1)}px, 0)`;
      }
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="relative flex min-h-svh flex-col overflow-hidden bg-background">
      <div
        ref={auraRef}
        aria-hidden
        className="pointer-events-none absolute inset-[-15%] -z-10"
        style={{
          background:
            'radial-gradient(40% 44% at 42% 44%, rgba(255,178,0,0.17), transparent 70%)'
        }}
      />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 bottom-14 overflow-hidden"
      >
        {SPARKS.map((spark, i) => (
          <span
            key={i}
            className="spark absolute bottom-0 block rounded-full"
            style={
              {
                left: `${spark.left}%`,
                width: spark.size,
                height: spark.size,
                backgroundColor: spark.warm ? '#FFB200' : '#ffffff',
                animationDelay: `${spark.delay}s`,
                animationDuration: `${spark.duration}s`,
                '--drift': `${spark.drift}px`
              } as React.CSSProperties
            }
          />
        ))}
      </div>

      <div
        ref={mascotLeftRef}
        aria-hidden
        className="pointer-events-none absolute bottom-[68px] left-[2%] hidden h-[min(32vw,62svh)] lg:block"
        style={{ willChange: 'transform' }}
      >
        <div className="mascot-float-slow relative h-full">
          <div
            aria-hidden
            className="absolute inset-x-[-45%] bottom-[-4%] h-[26%] rounded-[50%]"
            style={{
              background:
                'radial-gradient(closest-side, rgba(255,178,0,0.16), transparent 75%)'
            }}
          />
          <img
            src="/mascot/stance.webp"
            alt=""
            className="relative h-full w-auto max-w-none object-contain"
            draggable={false}
          />
        </div>
      </div>

      <div
        ref={mascotRef}
        aria-hidden
        className="pointer-events-none absolute bottom-[68px] right-[2%] hidden h-[min(32vw,62svh)] lg:block"
        style={{ willChange: 'transform' }}
      >
        <div className="mascot-float relative h-full">
          <div
            aria-hidden
            className="absolute inset-x-[-40%] bottom-[-4%] h-[24%] rounded-[50%]"
            style={{
              background:
                'radial-gradient(closest-side, rgba(255,178,0,0.20), transparent 75%)'
            }}
          />
          <img
            src="/mascot/wave.webp"
            alt=""
            className="relative h-full w-auto max-w-none object-contain"
            draggable={false}
          />
        </div>
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col items-center justify-center px-6 pb-12 pt-24 text-center">
        <p className="animate-rise inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.28em] text-on-surface-variant">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
          Beta dostępna na iOS i Androida
        </p>

        <h1 className="mt-6 text-[clamp(3.25rem,7vw,7.5rem)] font-light leading-[0.94] tracking-tighter">
          {TITLE_LINES.map((line, li) => (
            <Fragment key={line.join('-')}>
              <span className="block">
              {line.map((word, wi) => {
                const order = TITLE_LINES.slice(0, li).flat().length + wi;
                const accent = li === TITLE_LINES.length - 1;
                return (
                  <Fragment key={word}>
                    <span
                      className="animate-rise inline-block"
                      style={{ animationDelay: `${0.08 + order * 0.07}s` }}
                    >
                      {accent ? (
                        <span className="text-primary font-normal">{word}</span>
                      ) : (
                        word
                      )}
                    </span>
                    {wi < line.length - 1 ? ' ' : null}
                  </Fragment>
                );
              })}
              </span>
              {li < TITLE_LINES.length - 1 ? ' ' : null}
            </Fragment>
          ))}
        </h1>

        <p
          className="animate-rise mt-7 max-w-2xl text-balance text-lg font-extralight leading-relaxed text-on-surface-variant sm:text-xl md:text-2xl"
          style={{ animationDelay: '0.36s' }}
        >
          Gry na imprezę i domówkę: siedem gier imprezowych w jednej aplikacji, dla
          ekipy od 2 do 10 osób.
        </p>

        <div
          className="animate-rise mt-9 flex flex-col items-center gap-4"
          style={{ animationDelay: '0.44s' }}
        >
          <Link
            href="/pobierz"
            className="newsletter-pulse group inline-flex items-center justify-center gap-3 rounded-full bg-primary px-11 py-5 text-lg font-semibold tracking-tight text-on-primary shadow-[0_0_50px_rgba(255,178,0,0.28)] transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_80px_rgba(255,178,0,0.5)] active:scale-[0.98]"
          >
            Pobierz za darmo
            <svg
              className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
          <span className="text-center text-[13px] font-light leading-snug text-on-surface-variant">
            Bez planszy, bez kartek, bez tłumaczenia zasad.
          </span>
          <button
            onClick={() => smoothScrollTo('newsletter')}
            className="text-center text-[13px] font-light leading-snug text-on-surface-variant underline decoration-white/25 underline-offset-4 transition-colors hover:text-on-surface cursor-pointer"
          >
            Wolisz poczekać na premierę? Damy znać mailem.
          </button>
        </div>
      </div>

      <div
        aria-hidden
        className="relative z-10 overflow-hidden border-t border-white/5 py-5"
        style={{
          maskImage:
            'linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)',
          WebkitMaskImage:
            'linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)'
        }}
      >
        <div className="marquee flex w-max gap-10 pr-10">
          {[0, 1].map((pass) => (
            <div key={pass} className="flex shrink-0 gap-10 pr-10">
              {GAMES.map((game) => (
                <span
                  key={game.slug}
                  className="whitespace-nowrap text-sm font-light uppercase tracking-[0.24em] text-on-surface-variant"
                >
                  {game.title}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
