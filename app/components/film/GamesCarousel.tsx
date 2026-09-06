'use client';

/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { GAMES, gamePath } from '../../lib/games';
import { Section, SectionHead } from '../ui/Surface';

export default function GamesCarousel() {
  /* Embla runs its own animation loop instead of leaning on CSS scroll-snap.
     The hand-rolled rail stuttered on slide changes because the browser was
     enforcing a mandatory snap while a smooth scroll was still animating.

     Deliberately no wheel plugin: a trackpad emits small horizontal noise
     while scrolling vertically, and anything that claims wheel events here
     can grab the page mid-gesture and hand it back a moment later, which
     reads as the page catching. Vertical scrolling is what everyone does on
     this section - it does not get to be at risk for a horizontal shortcut.
     Dragging, the arrows and touch swipe all still move the reel. */
  const [emblaRef, embla] = useEmblaCarousel({
    align: 'start',
    containScroll: 'trimSnaps',
    dragFree: false,
    duration: 22
  });
  const glowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [edges, setEdges] = useState({ start: true, end: false });

  const onSelect = useCallback(() => {
    if (!embla) return;
    const index = embla.selectedScrollSnap();
    /* Written straight to the DOM - re-rendering seven gradient layers on
       every slide change is exactly the cost this section cannot afford. */
    for (let i = 0; i < glowRefs.current.length; i++) {
      const layer = glowRefs.current[i];
      if (layer) layer.style.opacity = i === index ? '1' : '0';
    }
    setEdges((prev) => {
      const start = !embla.canScrollPrev();
      const end = !embla.canScrollNext();
      return prev.start === start && prev.end === end ? prev : { start, end };
    });
  }, [embla]);

  useEffect(() => {
    if (!embla) return;
    /* Scheduled rather than called straight away: the first sync only needs
       to land before paint, and running it in the effect body would set
       state during the commit. */
    const id = requestAnimationFrame(onSelect);
    embla.on('select', onSelect).on('reInit', onSelect);
    return () => {
      cancelAnimationFrame(id);
      embla.off('select', onSelect).off('reInit', onSelect);
    };
  }, [embla, onSelect]);

  return (
    <Section id="gry" className="!px-0">
      {/* Seven full-width gradient layers repainted on every scroll frame is
          a lot of fill for decoration. Each one is promoted to its own
          compositor layer so scrolling moves them instead of redrawing them,
          and paint is contained so nothing outside is invalidated. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-1/4 h-[36rem]"
        style={{ contain: 'paint' }}
      >
        {GAMES.map((game, i) => (
          <div
            key={game.slug}
            ref={(el) => {
              glowRefs.current[i] = el;
            }}
            className="absolute inset-0 transition-opacity duration-700 ease-out"
            style={{
              opacity: i === 0 ? 1 : 0,
              willChange: 'opacity',
              transform: 'translateZ(0)',
              background: `radial-gradient(46% 42% at 50% 40%, ${game.glow}1c, transparent 70%)`
            }}
          />
        ))}
      </div>

      <div className="relative px-6 sm:px-8">
        <div className="flex items-end justify-between gap-6">
          <SectionHead
            eyebrow="Biblioteka"
            title="Wybierzcie, w co gracie."
            lead="Od zgadywanki z telefonem na czole po szukanie zdrajcy w ekipie. Każda ma darmową kategorię haseł."
          />
          <div className="hidden shrink-0 gap-2 md:flex">
            <ArrowButton
              dir={-1}
              onClick={() => embla?.scrollPrev()}
              disabled={edges.start}
              label="Poprzednia gra"
            />
            <ArrowButton
              dir={1}
              onClick={() => embla?.scrollNext()}
              disabled={edges.end}
              label="Następna gra"
            />
          </div>
        </div>
      </div>

      <div
        className="relative mt-12 overflow-hidden md:mt-16"
        ref={emblaRef}
      >
        <div className="flex touch-pan-y px-6 sm:px-8">
          {GAMES.map((game) => (
            <div
              key={game.slug}
              className="min-w-0 shrink-0 grow-0 basis-[78%] pr-4 sm:basis-[21rem] sm:pr-6 md:basis-[23rem]"
            >
              <Link
                href={gamePath(game.slug)}
                draggable={false}
                className="group relative block overflow-hidden rounded-[1.75rem] border border-white/[0.07] bg-[#0f0f12] transition-colors duration-500 hover:border-white/[0.14] md:rounded-[2rem]"
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
                />
                <span className="relative block aspect-[4/5] overflow-hidden">
                  <img
                    src={game.art}
                    alt=""
                    loading="lazy"
                    draggable={false}
                    className="h-full w-full object-cover object-top transition-transform duration-[900ms] ease-out group-hover:scale-[1.05]"
                  />
                  <span
                    aria-hidden
                    className="absolute inset-0"
                    style={{
                      background:
                        'linear-gradient(to top, #0f0f12 6%, rgba(15,15,18,0.35) 34%, transparent 62%)'
                    }}
                  />
                </span>

                <span className="relative -mt-16 block px-6 pb-7 sm:px-7">
                  <span
                    className="font-display block text-[1.4rem] font-extrabold tracking-[-0.02em]"
                    style={{ color: game.glow }}
                  >
                    {game.title}
                  </span>
                  <span className="mt-2 block min-h-[2.75rem] text-sm leading-snug text-on-surface-variant">
                    {game.tagline}
                  </span>
                  <span className="mt-5 flex items-center justify-between border-t border-white/[0.07] pt-4">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-on-surface-variant">
                      {game.players}
                    </span>
                    <span
                      className="text-[13px] font-semibold transition-transform duration-300 group-hover:translate-x-0.5"
                      style={{ color: game.glow }}
                    >
                      Zasady
                    </span>
                  </span>
                </span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

function ArrowButton({
  dir,
  onClick,
  disabled,
  label
}: {
  dir: number;
  onClick: () => void;
  disabled: boolean;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className="grid h-12 w-12 place-items-center rounded-full border border-white/[0.1] bg-white/[0.04] text-on-surface transition-all duration-200 hover:scale-[1.04] hover:bg-white/[0.08] disabled:pointer-events-none disabled:opacity-30"
    >
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
        <path
          d={dir < 0 ? 'M15 6l-6 6 6 6' : 'M9 6l6 6-6 6'}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
