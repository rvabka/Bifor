'use client';

/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef, useState, useSyncExternalStore } from 'react';

type Clip = { src: string; type: string } | null;

let cached: Clip | undefined;

/* The mascot is a cut-out, so it needs a real alpha channel, and the two
   engines disagree on how to carry one. Chromium and Firefox composite the
   alpha in a VP9 WebM; WebKit plays that file but ignores its alpha and would
   paint the keyed-out green, so it gets HEVC-with-alpha in a MOV - Apple's own
   format for transparent video. Both run at 24 fps. There is no feature query
   for "VP9 alpha", hence the explicit engine check.

   The branch is on the ENGINE, not the brand: every browser on iOS is WebKit
   underneath, so Chrome and Firefox there need the MOV just as much as Safari
   does. Branching on the Safari user agent alone dropped them into neither
   arm and left them with a frozen still. */
function pickClip(): Clip {
  if (cached !== undefined) return cached;
  if (typeof window === 'undefined') return null;
  const nav = window.navigator;
  const ua = nav.userAgent;
  // iPadOS reports itself as a Mac, so the user agent alone is not enough.
  const iOS = /iPad|iPhone|iPod/.test(ua) || (/Macintosh/.test(ua) && nav.maxTouchPoints > 1);
  const desktopSafari = /^((?!chrome|android|crios|fxios|edg).)*safari/i.test(ua);
  const probe = document.createElement('video');

  if (iOS || desktopSafari) {
    cached =
      probe.canPlayType('video/quicktime') !== ''
        ? { src: '/mascot-cheer.mov', type: 'video/quicktime' }
        : null;
  } else {
    cached =
      probe.canPlayType('video/webm; codecs="vp9"') === 'probably'
        ? { src: '/mascot-cheer.webm', type: 'video/webm' }
        : null;
  }
  return cached;
}

function prefersStill() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

const subscribe = () => () => {};

/* The clip and its still share one intrinsic ratio; declaring it means the
   box holds its height before either has loaded, so nothing below shifts. */
const RATIO = '440 / 534';
const STILL = '/mascot-cheer.webp';

export default function MascotClip({ className = '' }: { className?: string }) {
  const clip = useSyncExternalStore(subscribe, pickClip, () => null);
  const still = useSyncExternalStore(subscribe, prefersStill, () => false);
  const animated = clip !== null && !still;
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
        src={STILL}
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
        /* poster carries the still through a failed or slow load, so the
           block is never an empty hole. */
        <video
          autoPlay
          loop
          muted
          playsInline
          poster={STILL}
          aria-hidden
          className="h-full w-full object-contain"
        >
          <source src={clip.src} type={clip.type} />
        </video>
      ) : (
        <img
          src={STILL}
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
