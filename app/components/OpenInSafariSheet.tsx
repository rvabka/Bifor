'use client';

/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react';

import { SAFARI_DOWNLOAD_URL } from '../lib/inAppBrowser';
import { SOURCE_PARAM } from '../lib/source';

// Arkusz dla iPhone'a w przeglądarce TikToka. Nie ma tu przycisku „otwórz w
// Safari” - TikTok blokuje także to przejście tym samym komunikatem, a przycisk
// kończący się błędem odbiera stronie wiarygodność. Zostaje to, co działa
// zawsze: menu ••• TikToka i wyszukanie apki w App Store. Karta apki u góry
// mówi, dokąd prowadzą te kroki. Rodzic montuje arkusz tylko na czas pokazania,
// więc stan „Skopiowano” nie przechodzi na kolejne otwarcie.
export default function OpenInSafariSheet({ source, onClose }: { source: string; onClose: () => void }) {
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
      await navigator.clipboard.writeText(`${SAFARI_DOWNLOAD_URL}?${SOURCE_PARAM}=${source}`);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="safari-sheet-title"
    >
      <button type="button" aria-label="Zamknij" onClick={onClose} className="absolute inset-0 bg-black/60" />

      {/* Menu ••• TikToka leży nad stroną, w prawym górnym rogu. */}
      <svg
        aria-hidden
        viewBox="0 0 24 24"
        className="pointer-events-none absolute top-1 right-2 h-16 w-16 text-white motion-safe:animate-bounce"
        fill="none"
        stroke="currentColor"
        strokeWidth={2.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M7 17 17 7M9 7h8v8" />
      </svg>

      <div className="bg-surface-container relative w-full max-w-md rounded-t-[1.75rem] px-6 pt-6 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
        <div className="flex items-center gap-4">
          <img src="/ikona.png" alt="" width={56} height={56} className="h-14 w-14 rounded-[14px]" />
          <div className="min-w-0">
            <p className="truncate font-semibold text-white">BIFOR - gry na imprezę</p>
            <p className="text-on-surface-variant text-sm">Za darmo w App Store</p>
          </div>
        </div>

        <h2 id="safari-sheet-title" className="font-display mt-6 text-[1.4rem] leading-tight font-extrabold tracking-tight">
          Otwórz tę stronę w Safari
        </h2>
        <p className="text-on-surface-variant mt-2 text-[15px] leading-relaxed text-pretty">
          TikTok otwiera linki we własnej przeglądarce, a z niej App Store się nie uruchamia.
        </p>

        <ol className="mt-6 space-y-4 text-[15px] text-white">
          <li className="flex items-center gap-3">
            <span className="text-on-surface-variant w-4 font-semibold">1</span>
            <span>Stuknij</span>
            <span className="rounded-lg bg-white/10 px-2.5 py-0.5 text-sm font-bold tracking-widest">•••</span>
            <span>w prawym górnym rogu</span>
          </li>
          <li className="flex items-center gap-3">
            <span className="text-on-surface-variant w-4 font-semibold">2</span>
            <span>Wybierz</span>
            <span className="flex items-center gap-2 rounded-lg bg-white/10 px-2.5 py-1 text-sm font-semibold">
              <svg aria-hidden viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2}>
                <circle cx="12" cy="12" r="9" />
                <path d="m15.5 8.5-2 5-5 2 2-5z" fill="currentColor" stroke="none" />
              </svg>
              Otwórz w przeglądarce
            </span>
          </li>
        </ol>

        <p className="text-on-surface-variant mt-6 text-sm leading-relaxed">
          Możesz też wpisać <span className="font-semibold text-white">BIFOR</span>
          {' w wyszukiwarce App\u00a0Store.'}
        </p>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={copy}
            className="rounded-2xl bg-white/[0.08] px-4 py-3.5 text-sm font-semibold text-white transition-transform active:scale-[0.98]"
          >
            {copied ? 'Skopiowano' : 'Skopiuj link'}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="bg-primary text-on-primary font-display rounded-2xl px-4 py-3.5 text-sm font-extrabold transition-transform active:scale-[0.98]"
          >
            Rozumiem
          </button>
        </div>
      </div>
    </div>
  );
}
