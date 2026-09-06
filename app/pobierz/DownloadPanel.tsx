'use client';

import { useSyncExternalStore } from 'react';

import { androidViaPlay, hasIosBuild, TESTFLIGHT_URL } from '../lib/download';

type Platform = 'ios' | 'android' | null;

let cached: Platform | undefined;

/* Detection is only ever a visual hint, never a render condition: both
   buttons exist from the first frame, on desktop and without JS. Nothing
   shifts, hydration cannot disagree, and someone the sniffing gets wrong
   still has the other button right there. */
function detectPlatform(): Platform {
  if (cached !== undefined) return cached;
  if (typeof navigator === 'undefined') return null;
  const ua = navigator.userAgent;
  if (/android/i.test(ua)) cached = 'android';
  // iPadOS reports itself as a Mac, so the user agent alone is not enough.
  else if (/iPad|iPhone|iPod/.test(ua)) cached = 'ios';
  else if (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1) cached = 'ios';
  else cached = null;
  return cached;
}

const subscribe = () => () => {};

function AppleMark() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-8 w-8 sm:h-9 sm:w-9">
      <path d="M16.36 12.75c-.02-2.2 1.8-3.26 1.88-3.31-1.02-1.5-2.61-1.7-3.18-1.73-1.35-.14-2.64.8-3.33.8-.69 0-1.75-.78-2.87-.76-1.48.02-2.84.86-3.6 2.18-1.53 2.66-.39 6.6 1.1 8.76.73 1.06 1.6 2.25 2.75 2.21 1.1-.05 1.52-.71 2.86-.71 1.33 0 1.71.71 2.88.69 1.19-.02 1.94-1.08 2.67-2.14.84-1.23 1.19-2.42 1.21-2.48-.03-.01-2.32-.89-2.35-3.51zM14.2 6.3c.6-.74 1.01-1.75.9-2.77-.87.04-1.93.58-2.56 1.31-.56.65-1.06 1.7-.93 2.7.97.08 1.97-.5 2.59-1.24z" />
    </svg>
  );
}

function AndroidMark() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-8 w-8 sm:h-9 sm:w-9">
      <path d="M17.6 9.48l1.84-3.18a.4.4 0 0 0-.7-.4l-1.87 3.23a11.4 11.4 0 0 0-9.74 0L5.26 5.9a.4.4 0 1 0-.7.4L6.4 9.48A10.7 10.7 0 0 0 1 18h22a10.7 10.7 0 0 0-5.4-8.52zM7 15.25a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5zm10 0a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5z" />
    </svg>
  );
}

export default function DownloadPanel() {
  const platform = useSyncExternalStore(subscribe, detectPlatform, () => null);
  const iosPrimary = platform === 'ios';
  const androidPrimary = platform === 'android';

  const tile =
    'group relative flex flex-col items-center justify-center gap-3 rounded-[1.5rem] border px-4 py-7 text-center transition-all duration-200 sm:py-9';
  const on =
    'border-primary/50 bg-primary text-on-primary shadow-[0_24px_70px_-30px_rgba(255,178,0,0.9)] hover:scale-[1.02] active:scale-[0.99]';
  const off =
    'border-white/[0.12] bg-white/[0.04] text-on-surface hover:border-white/25 hover:bg-white/[0.07]';

  return (
    <div className="w-full">
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        {hasIosBuild ? (
          <a href={TESTFLIGHT_URL} className={`${tile} ${iosPrimary ? on : off}`}>
            <AppleMark />
            <span className="font-display text-base font-extrabold tracking-[-0.01em] sm:text-lg">
              iPhone
            </span>
            <span
              className={`text-[11px] font-medium ${iosPrimary ? 'text-on-primary/70' : 'text-on-surface-variant'}`}
            >
              {iosPrimary ? 'Twój telefon' : 'przez TestFlight'}
            </span>
          </a>
        ) : (
          <span className={`${tile} cursor-not-allowed border-white/[0.08] text-on-surface-variant`}>
            <AppleMark />
            <span className="font-display text-base font-extrabold sm:text-lg">iPhone</span>
            <span className="text-[11px] font-medium">wkrótce</span>
          </span>
        )}

        <a href="/pobierz/android" className={`${tile} ${androidPrimary ? on : off}`}>
          <AndroidMark />
          <span className="font-display text-base font-extrabold tracking-[-0.01em] sm:text-lg">
            Android
          </span>
          <span
            className={`text-[11px] font-medium ${androidPrimary ? 'text-on-primary/70' : 'text-on-surface-variant'}`}
          >
            {androidPrimary ? 'Twój telefon' : androidViaPlay ? 'przez Google Play' : 'plik APK'}
          </span>
        </a>
      </div>

      <div className="mt-8 space-y-4 text-left">
        <p className="text-pretty text-sm leading-relaxed text-on-surface-variant">
          Na iPhonie instalacja idzie przez TestFlight, oficjalną aplikację Apple
          do testów - App Store zaproponuje ją po kliknięciu.{' '}
          {androidViaPlay
            ? 'Na Androidzie wszystko idzie przez Google Play.'
            : 'Na Androidzie na czas testów instalujesz plik bezpośrednio, z pominięciem sklepu.'}
        </p>

        {!androidViaPlay && (
          <>
            <p className="text-pretty text-sm leading-relaxed text-on-surface-variant">
              Otwierasz to z TikToka albo Instagrama? Wybierz w menu{' '}
              <strong className="font-semibold text-on-surface">
                Otwórz w przeglądarce
              </strong>
              . Przeglądarki wbudowane w te aplikacje potrafią przerwać pobieranie
              bez żadnego komunikatu.
            </p>

            <details className="rounded-[1.25rem] border border-white/[0.08] bg-white/[0.02] p-5" open={androidPrimary}>
              <summary className="cursor-pointer list-none text-sm font-semibold text-primary marker:hidden">
                Android pokaże ostrzeżenie. Co wtedy zrobić?
              </summary>
              <ol className="mt-4 list-decimal space-y-3 pl-5 text-sm leading-relaxed text-on-surface-variant">
                <li>
                  Po pobraniu telefon powie, że nie może zainstalować aplikacji z
                  nieznanego źródła. Wybierz <strong>Ustawienia</strong> w tym
                  komunikacie.
                </li>
                <li>
                  Włącz zgodę na instalowanie z przeglądarki, z której pobierasz, i
                  cofnij się.
                </li>
                <li>
                  Jeśli pojawi się ekran Play Protect, wybierz{' '}
                  <strong>Zainstaluj mimo to</strong>. To ostrzeżenie dotyczy każdej
                  aplikacji spoza sklepu, nie konkretnie tej.
                </li>
              </ol>
              <p className="mt-4 text-xs leading-relaxed text-on-surface-variant">
                Aplikacja trafi do Google Play przed premierą. Wtedy ten sam
                przycisk poprowadzi wprost do sklepu, a aktualizacje będą się
                instalowały same.
              </p>
            </details>
          </>
        )}
      </div>
    </div>
  );
}
