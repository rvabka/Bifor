'use client';

/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef, useState } from 'react';
import { GAMES } from '../lib/games';
import { useReducedMotion } from './useReducedMotion';

const N = GAMES.length;

type ScatterUnit = {
  ux: number;
  uy: number;
  uz: number;
  rotX: number;
  rotY: number;
  rotZ: number;
};

const SCATTER_UNIT: ScatterUnit[] = [
  { ux: -1.15, uy: -0.62, uz: -1.0, rotX: 14, rotY: -38, rotZ: -20 },
  { ux: 1.05, uy: -0.78, uz: -0.6, rotX: -10, rotY: 32, rotZ: 16 },
  { ux: -0.68, uy: 0.72, uz: -1.3, rotX: 18, rotY: 22, rotZ: 10 },
  { ux: 0.06, uy: -0.2, uz: -0.15, rotX: -6, rotY: -8, rotZ: -6 },
  { ux: 0.78, uy: 0.68, uz: -0.95, rotX: 10, rotY: -28, rotZ: -13 },
  { ux: -1.2, uy: 0.16, uz: -0.5, rotX: -16, rotY: 36, rotZ: 18 },
  { ux: 1.3, uy: 0.1, uz: -1.2, rotX: 8, rotY: -34, rotZ: 8 }
];

const MAX_UX = Math.max(...SCATTER_UNIT.map((u) => Math.abs(u.ux)));
const MAX_UY = Math.max(...SCATTER_UNIT.map((u) => Math.abs(u.uy)));

const SCATTER_SCALE = 0.6;
const REST_SCALE = 0.86;
const SCATTER_SAFETY = 1.22;
const REST_SAFETY = 1.06;
const EDGE_PAD = 14;
const CARD_RATIO = 176 / 132;
const RING_MIN_GAP = 26;

type Dims = {
  cardW: number;
  cardH: number;
  spreadX: number;
  spreadY: number;
  spreadZ: number;
  radiusX: number;
  radiusY: number;
  angles: number[];
};

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

const RING_START = -Math.PI / 2;
const RELAX_ITERATIONS = 600;

const ringAngles = (rx: number, ry: number, count: number) => {
  const t = Array.from(
    { length: count },
    (_, i) => RING_START + (i / count) * Math.PI * 2
  );
  const at = (a: number): [number, number] => [Math.cos(a) * rx, Math.sin(a) * ry];
  const speed = (a: number) =>
    Math.hypot(-Math.sin(a) * rx, Math.cos(a) * ry) || 1;

  for (let iteration = 0; iteration < RELAX_ITERATIONS; iteration++) {
    const gaps: number[] = [];
    for (let i = 0; i < count; i++) {
      const [x1, y1] = at(t[i]);
      const [x2, y2] = at(t[(i + 1) % count]);
      gaps.push(Math.hypot(x2 - x1, y2 - y1));
    }
    let largest = 0;
    for (let i = 1; i < count; i++) {
      const shift =
        ((gaps[i] - gaps[(i - 1 + count) % count]) / (2 * speed(t[i]))) * 0.5;
      t[i] += shift;
      largest = Math.max(largest, Math.abs(shift));
    }
    if (largest < 1e-5) break;
  }
  return t;
};

const ringFor = (cardW: number, stageW: number, stageH: number) => {
  const cardH = cardW * CARD_RATIO;
  const restHalfW = (cardW * REST_SCALE * REST_SAFETY) / 2;
  const restHalfH = (cardH * REST_SCALE * REST_SAFETY) / 2;
  const rx = Math.min(stageW * 0.34, stageW / 2 - EDGE_PAD - restHalfW);
  const ry = Math.min(stageH * 0.44, stageH / 2 - EDGE_PAD - restHalfH);
  if (rx <= 0 || ry <= 0) return null;

  const angles = ringAngles(rx, ry, N);
  const w = cardW * REST_SCALE + RING_MIN_GAP;
  const h = cardH * REST_SCALE + RING_MIN_GAP;
  for (let i = 0; i < N; i++) {
    for (let j = i + 1; j < N; j++) {
      const dx = Math.abs(Math.cos(angles[i]) * rx - Math.cos(angles[j]) * rx);
      const dy = Math.abs(Math.sin(angles[i]) * ry - Math.sin(angles[j]) * ry);
      if (dx < w && dy < h) return null;
    }
  }
  return { rx, ry, angles };
};

const easeOutBack = (t: number) => {
  const c1 = 1.7;
  const c3 = c1 + 1;
  const x = t - 1;
  return 1 + c3 * x * x * x + c1 * x * x;
};

export default function AssembleHero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rigRef = useRef<HTMLDivElement>(null);
  const markRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [dims, setDims] = useState<Dims>({
    cardW: 132,
    cardH: 176,
    spreadX: 420,
    spreadY: 180,
    spreadZ: 300,
    radiusX: 260,
    radiusY: 150,
    angles: []
  });

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;

    const calc = () => {
      const stageW = el.clientWidth || window.innerWidth;
      const stageH = el.clientHeight || window.innerHeight * 0.5;

      const roomX = stageW / 2 - EDGE_PAD;
      const roomY = stageH / 2 - EDGE_PAD;

      let lo = 70;
      let hi = Math.min(stageW * 0.3, 210);
      let ring = ringFor(lo, stageW, stageH);
      if (ring) {
        for (let i = 0; i < 22; i++) {
          const mid = (lo + hi) / 2;
          const candidate = ringFor(mid, stageW, stageH);
          if (candidate) {
            lo = mid;
            ring = candidate;
          } else {
            hi = mid;
          }
        }
      } else {
        ring = {
          rx: roomX,
          ry: roomY,
          angles: Array.from({ length: N }, (_, i) => RING_START + (i / N) * Math.PI * 2)
        };
      }

      const cardW = lo;
      const cardH = cardW * CARD_RATIO;

      const scatterHalfW = (cardW * SCATTER_SCALE * SCATTER_SAFETY) / 2;
      const scatterHalfH = (cardH * SCATTER_SCALE * SCATTER_SAFETY) / 2;
      const maxSpreadX = Math.max(0, (roomX - scatterHalfW) / MAX_UX);
      const maxSpreadY = Math.max(0, (roomY - scatterHalfH) / MAX_UY);

      setDims({
        cardW,
        cardH,
        spreadX: clamp(Math.min(stageW * 0.46, maxSpreadX), 60, 620),
        spreadY: clamp(Math.min(stageH * 0.42, maxSpreadY), 40, 320),
        spreadZ: clamp(cardW * 2.1, 160, 320),
        radiusX: ring.rx,
        radiusY: ring.ry,
        angles: ring.angles
      });
    };

    calc();
    const ro = new ResizeObserver(calc);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    let raf = 0;
    let running = false;
    let lastP = -1;

    const update = (time: number) => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const dist = rect.height - vh;
      const scrolled = Math.min(Math.max(-rect.top, 0), dist);
      const p = reduced ? 1 : dist > 0 ? scrolled / dist : 0;

      const idle = reduced ? 0 : time * 0.00016;

      if (rigRef.current) {
        const spin = lerp(-16, 0, p) + Math.sin(idle) * lerp(2.4, 0.6, p);
        const tiltX = Math.cos(idle * 0.7) * lerp(1.6, 0.35, p);
        rigRef.current.style.transform = `rotateX(${tiltX.toFixed(2)}deg) rotateY(${spin.toFixed(2)}deg)`;
      }

      const completion = clamp((p - 0.86) / 0.14, 0, 1);
      const flash = Math.sin(completion * Math.PI);

      if (markRef.current) {
        const s = lerp(0.55, 1, easeOutBack(clamp(p / 0.92, 0, 1)));
        markRef.current.style.opacity = String(clamp(lerp(0.1, 1, p / 0.9), 0, 1));
        markRef.current.style.transform = `translate(-50%, -50%) scale(${s.toFixed(3)})`;
        markRef.current.style.filter = `drop-shadow(0 0 ${(14 + flash * 22).toFixed(0)}px rgba(255,178,0,${(0.35 + flash * 0.45).toFixed(2)}))`;
      }
      if (glowRef.current) {
        glowRef.current.style.opacity = String(clamp(lerp(0.18, 0.55, p) + flash * 0.25, 0, 0.85));
      }

      if (Math.abs(p - lastP) >= 0.0015) {
        lastP = p;
        for (let i = 0; i < N; i++) {
          const card = cardRefs.current[i];
          if (!card) continue;
          const unit = SCATTER_UNIT[i % SCATTER_UNIT.length];
          const angle = dims.angles[i] ?? (i / N) * Math.PI * 2 - Math.PI / 2;

          const startX = unit.ux * dims.spreadX;
          const startY = unit.uy * dims.spreadY;
          const startZ = unit.uz * dims.spreadZ;
          const endX = Math.cos(angle) * dims.radiusX;
          const endY = Math.sin(angle) * dims.radiusY;
          const endZ = 0;

          const stagger = i * 0.025;
          const local = clamp((p - stagger) / (1 - 0.18), 0, 1);
          const ease = local * local * (3 - 2 * local);
          const easeScale = easeOutBack(local);

          const x = lerp(startX, endX, ease);
          const y = lerp(startY, endY, ease);
          const z = lerp(startZ, endZ, ease);
          const rotX = lerp(unit.rotX, 0, ease);
          const rotY = lerp(unit.rotY, 0, ease);
          const rotZ = lerp(unit.rotZ, 0, ease);
          const scale = lerp(SCATTER_SCALE, REST_SCALE, clamp(easeScale, 0, 1.12));

          card.style.transform = `translate(-50%, -50%) translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, ${z.toFixed(1)}px) rotateX(${rotX.toFixed(1)}deg) rotateY(${rotY.toFixed(1)}deg) rotateZ(${rotZ.toFixed(1)}deg) scale(${scale.toFixed(3)})`;
          card.style.opacity = String(clamp(0.4 + ease * 0.6, 0, 1));

          const glowPulse = Math.sin(ease * Math.PI) * 26;
          const glowColor = `${GAMES[i]?.glow ?? '#FFB200'}55`;
          card.style.boxShadow = `0 ${(14 + ease * 14).toFixed(0)}px ${(28 + ease * 20).toFixed(0)}px rgba(0,0,0,0.5), 0 0 ${(24 + glowPulse + flash * 30).toFixed(0)}px ${glowColor}`;
        }
      }
    };

    const loop = (time: number) => {
      update(time);
      raf = requestAnimationFrame(loop);
    };

    if (reduced) {
      update(0);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !running) {
          running = true;
          lastP = -1;
          raf = requestAnimationFrame(loop);
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
  }, [dims, reduced]);

  return (
    <section
      ref={sectionRef}
      className={
        reduced
          ? 'relative h-svh bg-background'
          : 'relative bg-background h-[260vh] sm:h-[300vh] md:h-[320vh]'
      }
    >
      <div className="sticky top-0 flex h-svh flex-col overflow-hidden">
        <div
          ref={glowRef}
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(45% 48% at 50% 52%, rgba(255,178,0,0.22), transparent 72%)',
            opacity: 0.18
          }}
        />

        <div className="relative z-10 shrink-0 px-6 pt-20 text-center sm:pt-24">
          <h2 className="text-balance text-[2rem] font-light leading-[1.05] tracking-tight sm:text-4xl md:text-6xl">
            Wszystko w <span className="text-primary font-normal">jednej aplikacji.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm font-extralight leading-relaxed text-on-surface-variant sm:text-base md:text-lg">
            Siedem gier składa się w jedno miejsce - bez przełączania aplikacji, bez
            szukania w sklepie.
          </p>
        </div>

        <div
          ref={stageRef}
          className="relative min-h-0 flex-1 pb-6"
          style={{ perspective: 1400 }}
        >
          <div
            ref={rigRef}
            className="absolute inset-0"
            style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
          >
            <div
              ref={markRef}
              className="absolute left-1/2 top-1/2 flex flex-col items-center gap-2"
              style={{ opacity: 0.1, willChange: 'transform, opacity, filter' }}
            >
              <img
                src="/logo.png"
                alt="Bifor"
                className="h-9 w-auto sm:h-12 md:h-14"
                draggable={false}
              />
            </div>

            {GAMES.map((game, i) => (
              <div
                key={game.slug}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                className="absolute left-1/2 top-1/2 overflow-hidden rounded-2xl"
                style={{
                  width: dims.cardW,
                  height: dims.cardH,
                  border: `1px solid ${game.glow}55`,
                  willChange: 'transform, opacity, box-shadow'
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
      </div>
    </section>
  );
}
