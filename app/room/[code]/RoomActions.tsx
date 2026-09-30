'use client';

import { useState } from 'react';

import { roomAppLink } from '../../lib/room';

export default function RoomActions({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="flex w-full flex-col items-center gap-6">
      <button
        type="button"
        onClick={copy}
        aria-label={`Kod pokoju ${code}, skopiuj`}
        className="group flex flex-col items-center gap-2"
      >
        <span className="font-display text-[clamp(3rem,14vw,5rem)] leading-none font-extrabold tracking-[0.12em] text-white">
          {code}
        </span>
        <span className="text-on-surface-variant text-xs font-semibold tracking-[0.25em] uppercase transition-colors group-hover:text-white">
          {copied ? 'Skopiowane' : 'Stuknij, żeby skopiować kod'}
        </span>
      </button>

      <a
        href={roomAppLink(code)}
        className="bg-primary text-on-primary font-display inline-flex w-full max-w-sm items-center justify-center rounded-2xl px-7 py-4 text-base font-extrabold transition-transform duration-200 hover:scale-[1.02] active:scale-[0.99]"
      >
        Otwórz w Bifor
      </a>
    </div>
  );
}
