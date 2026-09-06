export type SequenceSpec = {
  dir: string;
  count: number;
  ext?: string;
};

export type SequenceHandle = {
  paint: (progress: number) => void;
  resize: () => void;
  ready: Promise<void>;
  loaded: () => number;
  destroy: () => void;
};

const framePath = (spec: SequenceSpec, index: number) =>
  `${spec.dir}/f-${String(index + 1).padStart(4, '0')}.${spec.ext ?? 'webp'}`;

/* Frames are decoded once into an array and painted onto a canvas with
   cover geometry. A <video> would be lighter to download but browsers seek
   to the nearest keyframe, so scrubbing it stutters; an image sequence is
   the only way to land on an exact frame every scroll tick. */
export function createSequence(
  canvas: HTMLCanvasElement,
  spec: SequenceSpec,
  onFirstFrame?: () => void
): SequenceHandle {
  const ctx = canvas.getContext('2d', { alpha: false });
  const frames: (HTMLImageElement | null)[] = new Array(spec.count).fill(null);
  let loadedCount = 0;
  let lastPainted = -1;
  let wantIndex = 0;
  let destroyed = false;
  let resolveReady: () => void = () => {};
  const ready = new Promise<void>((resolve) => {
    resolveReady = resolve;
  });

  const drawFrame = (img: HTMLImageElement) => {
    if (!ctx) return;
    const cw = canvas.width;
    const ch = canvas.height;
    const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
    const w = img.naturalWidth * scale;
    const h = img.naturalHeight * scale;
    ctx.drawImage(img, (cw - w) / 2, (ch - h) / 2, w, h);
  };

  const nearestLoaded = (index: number) => {
    if (frames[index]) return frames[index];
    for (let step = 1; step < spec.count; step++) {
      const before = frames[index - step];
      if (before) return before;
      const after = frames[index + step];
      if (after) return after;
    }
    return null;
  };

  const paint = (progress: number) => {
    if (destroyed || !ctx) return;
    const index = Math.min(
      spec.count - 1,
      Math.max(0, Math.round(progress * (spec.count - 1)))
    );
    wantIndex = index;
    if (index === lastPainted && frames[index]) return;
    const img = nearestLoaded(index);
    if (!img) return;
    lastPainted = frames[index] ? index : -1;
    drawFrame(img);
  };

  const resize = () => {
    if (destroyed) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();
    const w = Math.round(rect.width * dpr);
    const h = Math.round(rect.height * dpr);
    if (w === 0 || h === 0) return;
    if (canvas.width === w && canvas.height === h) return;
    canvas.width = w;
    canvas.height = h;
    const current = lastPainted < 0 ? 0 : lastPainted;
    const img = nearestLoaded(current);
    if (img) drawFrame(img);
  };

  const load = (index: number) =>
    new Promise<void>((resolve) => {
      const img = new Image();
      img.decoding = 'async';
      img.onload = () => {
        if (destroyed) return resolve();
        frames[index] = img;
        loadedCount += 1;
        if (loadedCount === 1) {
          resize();
          drawFrame(img);
          onFirstFrame?.();
        } else if (index === wantIndex) {
          /* The frame the viewer is actually parked on has only just
             arrived - upgrade from whatever neighbour stood in for it,
             otherwise a fast scroll (or a reduced-motion jump straight to
             the end) leaves a stale frame on screen for good. */
          lastPainted = index;
          drawFrame(img);
        }
        resolve();
      };
      img.onerror = () => resolve();
      img.src = framePath(spec, index);
    });

  /* First frame alone, so the poster is up before anything else competes
     for bandwidth; then the rest a few at a time to keep the connection
     pool free for fonts and the rest of the page. */
  const idle = () =>
    new Promise<void>((resolve) => {
      if (document.readyState === 'complete') {
        resolve();
        return;
      }
      window.addEventListener('load', () => resolve(), { once: true });
    });

  const loadAll = async () => {
    await load(0);
    /* The tail of the reel is only needed once the viewer starts scrolling,
       so it waits for the rest of the page to finish loading first. */
    await idle();
    const rest = Array.from({ length: spec.count - 1 }, (_, i) => i + 1);
    const CONCURRENCY = 6;
    let cursor = 0;
    const worker = async () => {
      while (cursor < rest.length && !destroyed) {
        const index = rest[cursor++];
        await load(index);
      }
    };
    await Promise.all(
      Array.from({ length: Math.min(CONCURRENCY, rest.length) }, worker)
    );
    resolveReady();
  };

  void loadAll();

  return {
    paint,
    resize,
    ready,
    loaded: () => loadedCount,
    destroy: () => {
      destroyed = true;
      frames.fill(null);
    }
  };
}
