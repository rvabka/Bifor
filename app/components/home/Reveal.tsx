'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

type From = 'up' | 'left' | 'right' | 'fade';

/* Wejście przy przewinięciu - postacie wyskakują zza krawędzi, treść lekko
   podjeżdża. Element ukrywa się dopiero po hydracji i tylko wtedy, gdy jest
   jeszcze poza ekranem: bez JS, dla robotów i dla tego, co widać od razu po
   wejściu na stronę, wszystko stoi na swoim miejscu od pierwszej klatki. */
export default function Reveal({
  children,
  from = 'fade',
  delay = 0,
  className = ''
}: {
  children: ReactNode;
  from?: From;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<'idle' | 'hidden' | 'shown'>('idle');

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setState('shown');
        io.disconnect();
      },
      { rootMargin: '0px 0px -10% 0px' }
    );
    /* Ukrycie w osobnej klatce, żeby nie ustawiać stanu w ciele efektu. */
    const id = requestAnimationFrame(() => setState('hidden'));
    io.observe(el);
    return () => {
      cancelAnimationFrame(id);
      io.disconnect();
    };
  }, []);

  return (
    <div
      ref={ref}
      data-reveal={state}
      data-from={from}
      className={`reveal ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
