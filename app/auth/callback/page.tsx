'use client';

import { useEffect, useSyncExternalStore } from 'react';

import { APP_STORE_URL, androidTarget } from '../../lib/download';

type Platform = 'ios' | 'android' | 'other';

const noSubscription = () => () => {};
const detectPlatform = (): Platform => {
  const ua = navigator.userAgent;
  if (/iPhone|iPad|iPod/i.test(ua)) return 'ios';
  if (/Android/i.test(ua)) return 'android';
  return 'other';
};

export default function AuthCallbackPage() {
  const platform = useSyncExternalStore<Platform>(noSubscription, detectPlatform, () => 'other');

  useEffect(() => {
    if (platform !== 'other') {
      const params = new URLSearchParams(window.location.search);
      const hasAuthPayload =
        params.has('code') || params.has('token_hash') || params.has('error');
      if (hasAuthPayload) {
        const scheme = `bifor://auth/callback?${params.toString()}`;
        window.location.href = scheme;
      }
    }
  }, [platform]);

  const storeUrl = platform === 'ios' ? APP_STORE_URL : androidTarget;

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
