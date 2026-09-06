'use client';

import { useEffect } from 'react';

/* Inertial scrolling is the single thing that separates a site that feels
   built from one that feels assembled. It drives the native scroll position,
   so every scroll-linked effect on the page keeps working unchanged. */
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    /* Touch keeps the platform's own momentum - overriding it there fights
       the OS and feels worse, not better. */
    if (!window.matchMedia('(pointer: fine)').matches) return;

    let destroy: (() => void) | undefined;
    let disposed = false;

    void import('lenis').then(({ default: Lenis }) => {
      if (disposed) return;
      const lenis = new Lenis({
        duration: 1.05,
        gestureOrientation: 'vertical',
        easing: (t: number) => 1 - Math.pow(1 - t, 3),
        wheelMultiplier: 1,
        touchMultiplier: 1.6
      });

      let raf = 0;
      const frame = (time: number) => {
        lenis.raf(time);
        raf = requestAnimationFrame(frame);
      };
      raf = requestAnimationFrame(frame);

      destroy = () => {
        cancelAnimationFrame(raf);
        lenis.destroy();
      };
    });

    return () => {
      disposed = true;
      destroy?.();
    };
  }, []);

  return null;
}
