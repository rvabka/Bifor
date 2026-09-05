'use client';

import { useEffect, useState } from 'react';

import { androidViaPlay, hasIosBuild, TESTFLIGHT_URL } from '../lib/download';

type Platform = 'ios' | 'android' | null;

// Wykrycie jest WYLACZNIE podpowiedzia wizualna, nigdy warunkiem renderowania:
// oba przyciski istnieja od pierwszej klatki, takze bez JS i na komputerze.
// Dzieki temu nie ma ani przeskoku ukladu, ani rozjazdu hydracji, a osoba,
// u ktorej wykrywanie strzeli w plot, i tak ma czego kliknac.
function detectPlatform(): Platform {
  if (typeof navigator === 'undefined') return null;
  const ua = navigator.userAgent;
  if (/android/i.test(ua)) return 'android';
  // iPadOS podaje sie za Maca, wiec sam userAgent nie wystarcza.
  if (/iPad|iPhone|iPod/.test(ua)) return 'ios';
  if (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1) return 'ios';
  return null;
}

const CARD =
  'w-full rounded-3xl border p-6 sm:p-7 flex flex-col gap-3 text-left transition-all';
const CARD_PRIMARY =
  'bg-primary/10 border-primary/40 shadow-[0_0_60px_rgba(255,178,0,0.12)]';
const CARD_MUTED = 'bg-surface-container-lowest border-white/10';

const BUTTON =
  'mt-1 inline-flex items-center justify-center rounded-2xl py-4 px-6 font-bold text-base tracking-[0.06em] uppercase transition-all';
const BUTTON_ON = 'bg-primary text-on-primary hover:scale-[1.02] active:scale-95';
const BUTTON_OFF =
  'border border-white/20 text-on-surface hover:border-white/40';

export default function DownloadPanel() {
  const [platform, setPlatform] = useState<Platform>(null);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setPlatform(detectPlatform());
    setChecked(true);
  }, []);

  const iosPrimary = platform === 'ios';
  const androidPrimary = platform === 'android';

  return (
    <div className="w-full space-y-4">
      {checked && platform === null && (
        <p className="text-on-surface-variant text-sm font-light">
          Otwórz tę stronę na telefonie, na którym chcesz zagrać.
        </p>
      )}

      <div
        className={`${CARD} ${iosPrimary ? CARD_PRIMARY : CARD_MUTED}`}
      >
        <div className="flex items-center justify-between gap-3">
          <span className="text-on-surface font-medium text-lg">iPhone</span>
          {iosPrimary && (
            <span className="text-primary text-[11px] font-bold tracking-[0.2em] uppercase">
              Twój telefon
            </span>
          )}
        </div>
        <p className="text-on-surface-variant text-sm font-extralight leading-relaxed">
          Instalacja idzie przez TestFlight, oficjalną aplikację Apple do
          testów. Jeśli jej nie masz, App Store zaproponuje ją po kliknięciu.
        </p>
        {hasIosBuild ? (
          <a
            href={TESTFLIGHT_URL}
            className={`${BUTTON} ${iosPrimary ? BUTTON_ON : BUTTON_OFF}`}
          >
            Pobierz na iPhone
          </a>
        ) : (
          <span
            className={`${BUTTON} border border-white/10 text-on-surface-variant cursor-not-allowed`}
          >
            Wkrótce
          </span>
        )}
      </div>

      <div
        className={`${CARD} ${androidPrimary ? CARD_PRIMARY : CARD_MUTED}`}
      >
        <div className="flex items-center justify-between gap-3">
          <span className="text-on-surface font-medium text-lg">Android</span>
          {androidPrimary && (
            <span className="text-primary text-[11px] font-bold tracking-[0.2em] uppercase">
              Twój telefon
            </span>
          )}
        </div>
        <p className="text-on-surface-variant text-sm font-extralight leading-relaxed">
          {androidViaPlay
            ? 'Instalacja i aktualizacje idą przez Google Play, tak jak każda inna aplikacja.'
            : 'Na czas testów instalujesz plik bezpośrednio, z pominięciem sklepu. Android o to zapyta - to normalne i poniżej jest instrukcja.'}
        </p>
        <a
          href="/pobierz/android"
          className={`${BUTTON} ${androidPrimary ? BUTTON_ON : BUTTON_OFF}`}
        >
          Pobierz na Androida
        </a>

        {!androidViaPlay && (
          <p className="text-on-surface-variant text-xs font-extralight leading-relaxed">
            Otwierasz to z TikToka albo Instagrama? Wybierz w menu{' '}
            <strong className="font-medium text-on-surface">
              Otwórz w przeglądarce
            </strong>
            . Przeglądarki wbudowane w te aplikacje potrafią przerwać pobieranie
            bez żadnego komunikatu.
          </p>
        )}

        {!androidViaPlay && (
          <details className="mt-2 group" open={androidPrimary}>
            <summary className="cursor-pointer text-primary text-sm font-medium list-none marker:hidden">
              Android pokaże ostrzeżenie. Co wtedy zrobić?
            </summary>
            <ol className="mt-4 space-y-3 text-on-surface-variant text-sm font-extralight leading-relaxed list-decimal pl-5">
              <li>
                Po pobraniu telefon powie, że nie może zainstalować aplikacji z
                nieznanego źródła. Wybierz <strong>Ustawienia</strong> w tym
                komunikacie.
              </li>
              <li>
                Włącz zgodę na instalowanie z przeglądarki, z której pobierasz,
                i cofnij się.
              </li>
              <li>
                Jeśli pojawi się ekran Play Protect, wybierz{' '}
                <strong>Zainstaluj mimo to</strong>. To ostrzeżenie dotyczy
                każdej aplikacji spoza sklepu, nie konkretnie tej.
              </li>
            </ol>
            <p className="mt-4 text-on-surface-variant text-xs font-extralight leading-relaxed">
              Aplikacja trafi do Google Play przed premierą. Wtedy ten sam
              przycisk poprowadzi wprost do sklepu, a aktualizacje będą się
              instalowały same.
            </p>
          </details>
        )}
      </div>
    </div>
  );
}
