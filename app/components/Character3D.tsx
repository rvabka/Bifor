'use client';

import { createElement, forwardRef, useEffect, useRef } from 'react';

const SCRIPT_SRC =
  'https://cdn.jsdelivr.net/npm/@google/model-viewer@4.0.0/dist/model-viewer.min.js';

function injectModelViewer() {
  if (document.querySelector('script[data-model-viewer]')) return;
  const s = document.createElement('script');
  s.type = 'module';
  s.src = SCRIPT_SRC;
  s.setAttribute('data-model-viewer', '');
  document.head.appendChild(s);
}

type Props = {
  src: string;
  autoRotate?: boolean;
  controls?: boolean;
  cameraOrbit?: string;
  className?: string;
};

const Character3D = forwardRef<HTMLElement, Props>(function Character3D(
  { src, autoRotate = false, controls = false, cameraOrbit = '0deg 90deg 105%', className },
  ref
) {
  const localRef = useRef<HTMLElement | null>(null);

  const setRefs = (node: HTMLElement | null) => {
    localRef.current = node;
    if (typeof ref === 'function') ref(node);
    else if (ref) ref.current = node;
  };

  useEffect(() => {
    const el = localRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          injectModelViewer();
          io.disconnect();
        }
      },
      { rootMargin: '700px 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const attrs: Record<string, unknown> = {
    ref: setRefs,
    src,
    alt: 'Postać 3D Bifor',
    exposure: '1.05',
    'shadow-intensity': '0.4',
    'environment-image': 'neutral',
    'interaction-prompt': 'none',
    'camera-orbit': cameraOrbit,
    'min-camera-orbit': 'auto 90deg auto',
    'max-camera-orbit': 'auto 90deg auto',
    'field-of-view': '26deg',
    'disable-zoom': true,
    'disable-pan': true,
    loading: 'lazy',
    reveal: 'auto',
    style: { width: '100%', height: '100%', backgroundColor: 'transparent' },
    className
  };
  if (autoRotate) {
    attrs['auto-rotate'] = true;
    attrs['auto-rotate-delay'] = '0';
    attrs['rotation-per-second'] = '24deg';
  }
  if (controls) {
    attrs['camera-controls'] = true;
    attrs['min-camera-orbit'] = 'auto auto auto';
    attrs['max-camera-orbit'] = 'auto auto auto';
  }

  return createElement('model-viewer', attrs);
});

export default Character3D;
