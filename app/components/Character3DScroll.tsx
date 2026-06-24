'use client';

import { useEffect, useRef, useState } from 'react';
import Character3D from './Character3D';

type Beat = { pre: string; accent: string; post: string; desc: string };

const BEATS: Beat[] = [
  {
    pre: 'Sześć gier,',
    accent: 'jeden',
    post: 'wieczór.',
    desc: 'Czółko, Zakazane, Impostor, Sekrety, Państwa Miasta i Gra na P. Cała ekipa w jednej aplikacji.'
  },
  {
    pre: 'Lobby w',
    accent: 'sekundę.',
    post: '',
    desc: 'Stwórz pokój, podaj kod PIN i grajcie. Bez rejestracji, bez czekania, bez tłumaczenia zasad.'
  },
  {
    pre: 'Gdziekolwiek',
    accent: 'jesteście.',
    post: '',
    desc: 'Na jednym telefonie podawanym z ręki do ręki albo każdy na swoim. Wy decydujecie.'
  }
];


export default function Character3DScroll() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const mvRef = useRef<HTMLElement>(null);
  const lastThetaRef = useRef(999);
  const [active, setActive] = useState(0);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      if (rect.bottom < -vh || rect.top > vh) return;

      const dist = el.offsetHeight - vh;
      const scrolled = Math.min(Math.max(-rect.top, 0), dist);
      const p = dist > 0 ? scrolled / dist : 0;

      const theta = p * 56 - 28;
      if (Math.abs(theta - lastThetaRef.current) > 0.4) {
        lastThetaRef.current = theta;
        mvRef.current?.setAttribute('camera-orbit', `${theta.toFixed(1)}deg 88deg 100%`);
      }

      const idx = Math.min(BEATS.length - 1, Math.max(0, Math.floor(p * BEATS.length)));
      setActive((prev) => (prev === idx ? prev : idx));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      id="jak-to-dziala"
      ref={sectionRef}
      className="relative bg-background h-[270vh] md:h-[450vh]"
    >
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(40% 45% at 72% 50%, rgba(255,178,0,0.14), transparent 70%)'
          }}
        />

        <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-4 px-4 md:px-8 lg:grid-cols-2 lg:gap-10">
          <div className="relative order-2 min-h-[230px] text-center lg:order-1 lg:text-left">
            {BEATS.map((b, i) => (
              <div
                key={i}
                className="absolute inset-0 flex flex-col justify-center transition-all duration-[600ms] ease-out will-change-[opacity,transform]"
                style={{
                  opacity: active === i ? 1 : 0,
                  transform: active === i ? 'translateY(0)' : 'translateY(20px)'
                }}
                aria-hidden={active !== i}
              >
                <h2 className="text-balance text-[2.75rem] font-light leading-[0.98] tracking-tight sm:text-5xl md:text-7xl">
                  {b.pre} <span className="text-primary font-normal">{b.accent}</span>
                  {b.post ? ` ${b.post}` : ''}
                </h2>
                <p className="mx-auto mt-4 max-w-md text-base font-extralight leading-relaxed text-on-surface-variant sm:mt-6 sm:text-lg lg:mx-0">
                  {b.desc}
                </p>
              </div>
            ))}

            <div className="absolute -bottom-3 left-1/2 flex -translate-x-1/2 gap-2 lg:left-0 lg:translate-x-0">
              {BEATS.map((_, i) => (
                <span
                  key={i}
                  className="h-1 rounded-full transition-all duration-500"
                  style={{
                    width: i === active ? 30 : 14,
                    backgroundColor: i === active ? '#ffb200' : 'rgba(255,255,255,0.18)'
                  }}
                />
              ))}
            </div>
          </div>

          <div className="relative order-1 h-[46vh] w-full lg:order-2 lg:h-[80vh]">
            <Character3D ref={mvRef} src="/models/boy1.glb" cameraOrbit="-28deg 88deg 100%" />
          </div>
        </div>
      </div>
    </section>
  );
}
