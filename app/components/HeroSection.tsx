'use client';

export default function HeroSection() {
  const scrollToNewsletter = () => {
    document
      .getElementById('newsletter')
      ?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative pt-28 pb-16 overflow-hidden min-h-screen flex flex-col items-center">
      <div className="absolute inset-0 hero-gradient -z-10" />

      <div className="max-w-[1440px] w-full mx-auto px-4 md:px-8 text-center space-y-8 relative z-10">
        <div className="space-y-4 relative">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface-container-highest border border-outline-variant/15 text-primary text-[0.7rem] uppercase tracking-[0.2em] font-medium mx-auto">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Gry imprezowe • Wkrótce
          </div>

          <h1 className="text-6xl md:text-[7rem] font-light tracking-tighter leading-[0.9] text-on-surface">
            Impreza zaczyna <br />
            się <span className="text-primary font-normal">tutaj.</span>
          </h1>

          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute -right-4 md:-right-30 top-[140%] md:-bottom-32 md:top-auto w-32 md:w-86 pointer-events-none drop-shadow-[0_0_30px_rgba(255,178,0,0.2)] z-20"
          >
            <source src="/dancing.webm" type="video/webm" />
            <source src="/dancing.mov" type="video/quicktime" />
          </video>

          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute -left-4 md:-left-20 top-[140%] md:-bottom-32 md:top-auto w-32 md:w-72 pointer-events-none drop-shadow-[0_0_25px_rgba(255,178,0,0.2)] z-20"
          >
            <source src="/flying.webm" type="video/webm" />
            <source src="/flying.mov" type="video/quicktime" />
          </video>

          <p className="text-lg md:text-xl text-on-surface-variant max-w-2xl mx-auto font-extralight leading-relaxed">
            Zakazane słowa, Czółko, Impostor i więcej — wszystko w jednej
            aplikacji. Stwórz lobby, zaproś znajomych kodem PIN i grajcie razem
            na swoich telefonach.
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            <span className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[11px] md:text-xs text-on-surface-variant font-light">
              🎲 4 gry na start
            </span>
            <span className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[11px] md:text-xs text-on-surface-variant font-light">
              📱 Na jednym lub wielu telefonach
            </span>
            <span className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[11px] md:text-xs text-on-surface-variant font-light">
              ⚡ Start w 30 sekund
            </span>
          </div>

          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <div className="relative group">
              <button
                disabled
                className="flex items-center gap-3 bg-white/60 text-black/50 px-4 py-3.5 rounded-full font-semibold text-sm shadow-lg cursor-not-allowed"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 384 512"
                >
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
                className="flex items-center gap-3 bg-white/60 text-black/50 px-4 py-3.5 rounded-full font-semibold text-sm shadow-lg cursor-not-allowed"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 512 512"
                >
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

        <div className="flex flex-col items-center gap-4 pt-2">
          <button
            onClick={scrollToNewsletter}
            className="group relative bg-primary text-on-primary px-8 py-4 rounded-full font-semibold text-lg uppercase tracking-[0.15em] hover:scale-105 hover:shadow-[0_0_60px_rgba(255,178,0,0.5)] transition-all duration-300 cursor-pointer newsletter-pulse"
          >
            <span className="relative z-10">
              🔥 Zapisz się — bądź pierwszy!
            </span>
          </button>
          <span className="text-xs text-on-surface-variant font-light">
            Już <span className="text-primary font-medium">500+ osób</span>{' '}
            czeka na premierę — dołącz do nich!
          </span>
        </div>

        <div className="flex flex-col items-center gap-2 pt-1">
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

        <div className="relative max-w-5xl mx-auto h-[700px] flex items-center justify-center mt-96">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 -rotate-12 scale-75 opacity-40 blur-[1px]">
            <div className="relative bg-surface-container-lowest rounded-[3rem] p-3 border-[6px] border-white/5 shadow-2xl overflow-hidden phone-glow">
              <div className="w-[280px] h-[550px] rounded-[2.2rem] bg-black" />
            </div>
          </div>

          <div className="absolute right-0 top-1/2 -translate-y-1/2 rotate-12 scale-75 opacity-40 blur-[1px]">
            <div className="relative bg-surface-container-lowest rounded-[3rem] p-3 border-[6px] border-white/5 shadow-2xl overflow-hidden phone-glow">
              <div className="w-[280px] h-[550px] rounded-[2.2rem] bg-black" />
            </div>
          </div>

          <div className="relative z-20 scale-100 md:scale-110">
            <div className="relative bg-surface-container-lowest rounded-[3.5rem] p-4 border-[10px] border-surface-container-low shadow-[0_50px_100px_rgba(0,0,0,0.8)] overflow-hidden phone-glow">
              <div className="w-[320px] h-[640px] rounded-[2.8rem] bg-black flex items-center justify-center">
                <span className="text-4xl font-black tracking-tighter text-white/10">
                  B
                </span>
              </div>
            </div>

            <div className="absolute -left-4 md:-left-36 top-[2%] floating-element z-30">
              <div className="bg-primary px-4 py-3 md:px-5 md:py-4 rounded-2xl rounded-bl-none shadow-2xl max-w-[190px] md:max-w-[210px]">
                <div className="flex items-center gap-2 md:gap-3 mb-1">
                  <div className="w-6 h-6 rounded-full bg-black/20" />
                  <span className="text-[10px] font-bold text-black/60">
                    KINGA
                  </span>
                </div>
                <p className="text-xs font-medium text-black leading-snug">
                  Gramy dziś wieczorem? 🎉
                </p>
              </div>
            </div>

            <div className="absolute -right-4 md:-right-36 top-[18%] md:top-[12%] floating-element-delayed z-30">
              <div className="bg-[#1e1e1e] border border-white/10 px-4 py-3 md:px-5 md:py-4 rounded-2xl rounded-br-none shadow-2xl max-w-[190px] md:max-w-[210px]">
                <div className="flex items-center gap-2 md:gap-3 mb-1">
                  <div className="w-6 h-6 rounded-full bg-primary/40" />
                  <span className="text-[10px] font-bold text-white/60">
                    MAREK
                  </span>
                </div>
                <p className="text-xs text-white leading-snug">
                  Jasne, tworzę lobby! 🚀
                </p>
              </div>
            </div>

            <div
              className="absolute -left-2 md:-left-40 top-[38%] md:top-[30%] floating-element z-30"
              style={{ animationDelay: '1s' }}
            >
              <div className="bg-[#1e1e1e] border border-white/10 px-4 py-3 md:px-5 md:py-4 rounded-2xl rounded-bl-none shadow-2xl max-w-[190px] md:max-w-[210px]">
                <div className="flex items-center gap-2 md:gap-3 mb-1">
                  <div className="w-6 h-6 rounded-full bg-tertiary/40" />
                  <span className="text-[10px] font-bold text-white/60">
                    MAJA
                  </span>
                </div>
                <p className="text-xs text-white leading-snug">
                  Czekaj, dołączam za minutkę! ⏳
                </p>
              </div>
            </div>

            <div
              className="absolute -right-2 md:-right-36 top-[55%] md:top-[42%] floating-element z-30"
              style={{ animationDelay: '3s' }}
            >
              <div className="bg-primary px-4 py-3 md:px-5 md:py-4 rounded-2xl rounded-br-none shadow-2xl max-w-[190px] md:max-w-[210px]">
                <div className="flex items-center gap-2 md:gap-3 mb-1">
                  <div className="w-6 h-6 rounded-full bg-black/20" />
                  <span className="text-[10px] font-bold text-black/60">
                    TOMEK
                  </span>
                </div>
                <p className="text-xs font-medium text-black leading-snug">
                  Kto wybrał tę talię? 😂
                </p>
              </div>
            </div>

            <div className="absolute -left-4 md:-left-36 top-[72%] md:top-[58%] floating-element-delayed z-30">
              <div className="bg-white/10 backdrop-blur-xl border border-white/15 px-4 py-3 md:px-5 md:py-4 rounded-2xl rounded-bl-none shadow-2xl max-w-[190px] md:max-w-[210px]">
                <div className="flex items-center gap-2 md:gap-3 mb-1">
                  <div className="w-6 h-6 rounded-full bg-primary/30" />
                  <span className="text-[10px] font-bold text-white/60">
                    ANIA
                  </span>
                </div>
                <p className="text-xs text-white leading-snug">
                  Wygrywam trzeci raz z rzędu 💪
                </p>
              </div>
            </div>

            <div
              className="absolute -right-2 md:-right-40 top-[88%] md:top-[72%] floating-element z-30 hidden md:block"
              style={{ animationDelay: '4s' }}
            >
              <div className="bg-[#1e1e1e] border border-white/10 px-3 py-2.5 md:px-5 md:py-4 rounded-2xl rounded-br-none shadow-2xl max-w-[150px] md:max-w-[210px]">
                <div className="flex items-center gap-2 md:gap-3 mb-1">
                  <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-error/30" />
                  <span className="text-[9px] md:text-[10px] font-bold text-white/60">
                    BARTEK
                  </span>
                </div>
                <p className="text-[10px] md:text-xs text-white leading-snug">
                  Rewanż! Tym razem wygram 🔥
                </p>
              </div>
            </div>

            <div className="absolute -right-2 md:-right-24 -top-10 floating-element z-30">
              <div className="bg-primary/20 backdrop-blur-xl border border-primary/30 px-3 py-1.5 md:px-4 md:py-2 rounded-full flex items-center gap-2 shadow-2xl">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span className="text-[9px] md:text-[10px] font-bold text-primary uppercase tracking-widest">
                  Nowa gra
                </span>
              </div>
            </div>

            <div
              className="absolute -left-2 md:-left-28 -top-10 floating-element z-30 hidden md:block"
              style={{ animationDelay: '2s' }}
            >
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 px-4 py-2.5 rounded-full flex items-center gap-2 shadow-2xl">
                <div className="flex -space-x-2">
                  <div className="w-5 h-5 rounded-full bg-primary/60 border border-black/30" />
                  <div className="w-5 h-5 rounded-full bg-tertiary/60 border border-black/30" />
                  <div className="w-5 h-5 rounded-full bg-white/30 border border-black/30" />
                </div>
                <span className="text-[10px] font-bold text-white/70 uppercase tracking-wider">
                  6 online
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
