'use client';

import { useEffect, useState } from 'react';

const APP_STORE_URL = 'https://apps.apple.com/app/id0000000000';
const PLAY_STORE_URL =
  'https://play.google.com/store/apps/details?id=com.bifor.app';

export default function AuthCallbackPage() {
  const [platform, setPlatform] = useState<'ios' | 'android' | 'other'>('other');

  useEffect(() => {
    const ua = navigator.userAgent;
    const isIos = /iPhone|iPad|iPod/i.test(ua);
    const isAndroid = /Android/i.test(ua);
    setPlatform(isIos ? 'ios' : isAndroid ? 'android' : 'other');

    if (isIos || isAndroid) {
      const params = new URLSearchParams(window.location.search);
      const scheme = `bifor://auth/callback?${params.toString()}`;
      window.location.href = scheme;
    }
  }, []);

  const storeUrl = platform === 'ios' ? APP_STORE_URL : PLAY_STORE_URL;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-neutral-950 px-6 text-white">
      <div className="flex max-w-md flex-col items-center gap-4 text-center">
        <div className="h-16 w-16 rounded-full bg-yellow-400/15 flex items-center justify-center text-3xl">
          ✉️
        </div>
        <h1 className="text-2xl font-extrabold">Otwieramy aplikację BIFOR…</h1>
        <p className="text-sm text-neutral-400">
          Jeśli nie otworzyła się automatycznie, upewnij się, że masz
          zainstalowaną aplikację, albo pobierz ją ze sklepu.
        </p>
        {platform !== 'other' && (
          <a
            href={storeUrl}
            className="mt-2 rounded-2xl bg-yellow-400 px-6 py-3 text-sm font-extrabold text-neutral-950 active:opacity-80"
          >
            Pobierz BIFOR
          </a>
        )}
      </div>
    </main>
  );
}
