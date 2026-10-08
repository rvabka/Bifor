'use client';

import { useEffect, useState } from 'react';

import { SAFARI_DOWNLOAD_URL, safariEscapeUrl } from '../lib/inAppBrowser';

// Arkusz dla iPhone'a w przeglądarce TikToka. Najpierw próba przejścia do Safari
// jednym stuknięciem, a gdy TikTok i to zatrzyma - instrukcja, która działa
// zawsze, i kopiowanie linku jako ostatnia deska ratunku. Rodzic montuje go
// tylko na czas pokazania, więc stan „Skopiowane” nie przechodzi na kolejne otwarcie.
export default function OpenInSafariSheet({ onClose }: { onClose: () => void }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(SAFARI_DOWNLOAD_URL);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center" role="dialog" aria-modal="true" aria-labelledby="safari-sheet-title">
      <button type="button" aria-label="Zamknij" onClick={onClose} className="absolute inset-0 bg-black/90" />

      {/* Menu ••• TikToka leży nad stroną, w prawym górnym rogu - strzałka
          pokazuje miejsce, którego instrukcja dotyczy. */}
      <p aria-hidden className="pointer-events-none absolute top-3 right-4 text-right text-sm font-semibold text-white">
        Stuknij ••• ↗
      </p>

      <div className="bg-surface-container relative w-full max-w-md rounded-t-[1.75rem] px-6 pt-8 pb-[max(2rem,env(safe-area-inset-bottom))] text-left">
        <h2 id="safari-sheet-title" className="font-display text-2xl leading-tight font-extrabold tracking-tight">
          Otwórz w Safari, żeby pobrać
        </h2>
        <p className="text-on-surface-variant mt-3 text-[15px] leading-relaxed text-pretty">
          Przeglądarka TikToka nie wpuszcza do App Store. W Safari pobierzesz BIFOR jednym stuknięciem.
        </p>

        <a
          href={safariEscapeUrl}
          className="bg-primary text-on-primary font-display mt-7 flex w-full items-center justify-center rounded-2xl px-6 py-4 text-base font-extrabold transition-transform duration-200 active:scale-[0.99]"
        >
          Otwórz w Safari
        </a>

        <p className="text-on-surface-variant mt-6 text-sm leading-relaxed">
          Nic się nie stało? Stuknij <span className="font-semibold text-white">•••</span> w prawym górnym rogu i wybierz{' '}
          <span className="font-semibold text-white">Otwórz w przeglądarce</span>.
        </p>

        <div className="mt-6 flex items-center justify-between gap-4 border-t border-white/10 pt-5">
          <button type="button" onClick={copy} className="text-primary text-sm font-semibold">
            {copied ? 'Skopiowane - wklej w Safari' : 'Skopiuj link'}
          </button>
          <button type="button" onClick={onClose} className="text-on-surface-variant text-sm font-semibold">
            Zamknij
          </button>
        </div>
      </div>
    </div>
  );
}
