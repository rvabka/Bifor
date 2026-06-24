'use client';

import { smoothScrollTo } from './scrollTo';

export default function HeroSection() {
  const scrollToNewsletter = () => smoothScrollTo('newsletter');

  return (
    <section className="relative pt-28 pb-20 overflow-hidden min-h-screen flex flex-col items-center justify-center">
      <div className="absolute inset-0 hero-gradient -z-10" />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-0 hidden h-svh overflow-hidden md:block"
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute bottom-0 left-0 h-[20vh] w-auto md:h-[34vh] lg:h-[40vh] drop-shadow-[0_0_25px_rgba(255,178,0,0.2)] safari-hide-video"
        >
          <source src="/flying.webm" type="video/webm" />
        </video>
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute bottom-0 right-0 h-[20vh] w-auto md:h-[34vh] lg:h-[40vh] drop-shadow-[0_0_30px_rgba(255,178,0,0.2)] safari-hide-video"
        >
          <source src="/dancing.webm" type="video/webm" />
        </video>

        {/* iOS/Safari fallback — alpha .webm not supported there */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/characters/girl2.webp"
          alt=""
          className="safari-only absolute bottom-0 left-0 h-[19vh] w-auto md:h-[32vh] lg:h-[38vh] drop-shadow-[0_0_25px_rgba(255,178,0,0.2)]"
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/characters/boy1.webp"
          alt=""
          className="safari-only absolute bottom-0 right-0 h-[19vh] w-auto md:h-[32vh] lg:h-[38vh] drop-shadow-[0_0_30px_rgba(255,178,0,0.2)]"
        />
      </div>

      <div className="max-w-[1440px] w-full mx-auto px-4 md:px-8 text-center space-y-6 sm:space-y-8 relative z-10">
        <div className="space-y-4 relative">
          <div className="animate-rise inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface-container-highest border border-outline-variant/15 text-primary text-[0.7rem] uppercase tracking-[0.2em] font-medium mx-auto">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Gry imprezowe • Wkrótce
          </div>

          <h1
            className="animate-rise text-balance text-[3.25rem] sm:text-6xl md:text-[7rem] font-light tracking-tighter leading-[0.92] text-on-surface"
            style={{ animationDelay: '0.08s' }}
          >
            Impreza zaczyna <br className="hidden sm:block" />
            się <span className="text-primary font-normal">tutaj.</span>
          </h1>

          <p
            className="animate-rise text-base sm:text-lg md:text-xl text-on-surface-variant max-w-2xl mx-auto font-extralight leading-relaxed"
            style={{ animationDelay: '0.16s' }}
          >
            Zakazane słowa, Czółko, Impostor i więcej — wszystko w jednej
            aplikacji. Stwórz lobby, zaproś znajomych kodem PIN i grajcie razem
            na swoich telefonach.
          </p>

          <div
            className="animate-rise flex flex-wrap justify-center gap-2 sm:gap-3"
            style={{ animationDelay: '0.24s' }}
          >
            <span className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[11px] md:text-xs text-on-surface-variant font-light">
              🎲 6 gier na start
            </span>
            <span className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[11px] md:text-xs text-on-surface-variant font-light">
              📱 Na jednym lub wielu telefonach
            </span>
            <span className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[11px] md:text-xs text-on-surface-variant font-light">
              ⚡ Start w 30 sekund
            </span>
          </div>

          <div
            className="animate-rise flex flex-wrap justify-center gap-3 sm:gap-4 pt-2"
            style={{ animationDelay: '0.32s' }}
          >
            <div className="relative group">
              <button
                disabled
                className="flex items-center gap-3 bg-white/60 text-black/50 px-5 py-3.5 rounded-full font-semibold text-sm shadow-lg cursor-not-allowed"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 384 512">
                  <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-31.4-73.3-114.8-4.4-156.7zM289.1 80.3c21.4-25.8 33.2-59.3 29.8-94.5-31.4 1.4-62.4 20.7-82.6 44.2-18.6 21.4-33.8 55.4-29.4 89.2 33.7 2.6 63.8-15.6 82.2-38.9z" />
                </svg>
                App Store
              </button>
              <span className="absolute -top-2 -right-2 bg-primary text-on-primary text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">
                Wkrótce
              </span>
            </div>
            <div className="relative group">
              <button
                disabled
                className="flex items-center gap-3 bg-white/60 text-black/50 px-5 py-3.5 rounded-full font-semibold text-sm shadow-lg cursor-not-allowed"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 512 512">
                  <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z" />
                </svg>
                Google Play
              </button>
              <span className="absolute -top-2 -right-2 bg-primary text-on-primary text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">
                Wkrótce
              </span>
            </div>
          </div>
        </div>

        <div
          className="animate-rise flex flex-col items-center gap-4 pt-2"
          style={{ animationDelay: '0.4s' }}
        >
          <button
            onClick={scrollToNewsletter}
            className="group relative w-full max-w-sm sm:w-auto bg-primary text-on-primary px-6 sm:px-8 py-4 rounded-full font-semibold text-base sm:text-lg uppercase tracking-[0.1em] sm:tracking-[0.15em] hover:scale-105 hover:shadow-[0_0_60px_rgba(255,178,0,0.5)] active:scale-95 transition-all duration-300 cursor-pointer newsletter-pulse"
          >
            <span className="relative z-10">🔥 Zapisz się — bądź pierwszy!</span>
          </button>
          <span className="text-xs text-on-surface-variant font-light">
            Już <span className="text-primary font-medium">500+ osób</span> czeka
            na premierę — dołącz do nich!
          </span>
        </div>

        <div className="hidden sm:flex flex-col items-center gap-2 pt-1">
          <span className="text-[10px] uppercase tracking-[0.3em] text-on-surface-variant font-medium">
            Przewiń w dół
          </span>
          <div className="scroll-bounce">
            <svg
              className="w-5 h-5 text-on-surface-variant"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
