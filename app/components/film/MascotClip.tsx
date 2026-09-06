'use client';

/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef, useState, useSyncExternalStore } from 'react';

let cached: boolean | null = null;

/* The clip is a VP9 WebM carrying a real alpha channel. Chromium and Firefox
   composite that alpha; Safari plays the same file but ignores it and would
   paint the keyed-out green, so it gets a cut-out still instead. There is no
   feature query for "VP9 alpha", hence the explicit engine check. */
function canAnimate() {
  if (cached !== null) return cached;
  if (typeof window === 'undefined') return false;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const ua = window.navigator.userAgent;
  const isSafari = /^((?!chrome|android|crios|fxios|edg).)*safari/i.test(ua);
  const probe = document.createElement('video');
  cached =
    !reduced &&
    !isSafari &&
    probe.canPlayType('video/webm; codecs="vp9"') === 'probably';
  return cached;
}

const subscribe = () => () => {};

/* The clip and its still share one intrinsic ratio; declaring it means the
   box holds its height before either has loaded, so nothing below shifts. */
const RATIO = '440 / 534';

export default function MascotClip({ className = '' }: { className?: string }) {
  const animated = useSyncExternalStore(subscribe, canAnimate, () => false);
  const hostRef = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);

  /* autoplay defeats preload="none" - the browser fetches the whole clip as
     soon as the element exists. Mounting it only once the block is close to
     the viewport keeps a decorative loop off the initial page weight. */
  useEffect(() => {
    if (!animated) return;
    const host = hostRef.current;
    if (!host) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin: '25% 0px' }
    );
    io.observe(host);
    return () => io.disconnect();
  }, [animated]);

  if (!animated) {
    return (
      <img
        src="/mascot-cheer.webp"
        alt=""
        aria-hidden
        loading="lazy"
        width={440}
        height={534}
        className={className}
        style={{ aspectRatio: RATIO, height: 'auto' }}
      />
    );
  }

  return (
    <div ref={hostRef} className={className} style={{ aspectRatio: RATIO }}>
      {near ? (
        <video
          autoPlay
          loop
          muted
          playsInline
          aria-hidden
          className="h-full w-full object-contain"
        >
          <source src="/mascot-cheer.webm" type="video/webm" />
        </video>
      ) : (
        <img
          src="/mascot-cheer.webp"
          alt=""
          aria-hidden
          loading="lazy"
          width={440}
          height={534}
          className="h-full w-full object-contain"
        />
      )}
    </div>
  );
}
