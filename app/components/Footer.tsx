'use client';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-background border-t border-white/5">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-20 flex flex-col md:flex-row justify-between items-center gap-12 relative">
        <div className="flex flex-col items-center md:items-start gap-4">
          <img src="/logo.png" alt="Bifor" className="h-10 w-auto" />
          <p className="text-[10px] uppercase tracking-[0.3em] text-on-surface-variant font-medium">
            © {new Date().getFullYear()} Bifor. Wszystkie prawa zastrzeżone.
          </p>
        </div>

        <div className="flex items-center gap-12">
          <a
            className="text-[10px] uppercase tracking-[0.2em] text-on-surface-variant hover:text-primary transition-colors"
            href="/polityka-prywatnosci"
          >
            Prywatność
          </a>
          <a
            className="text-[10px] uppercase tracking-[0.2em] text-on-surface-variant hover:text-primary transition-colors"
            href="mailto:kontakt@bifor.games"
          >
            Wsparcie
          </a>
          <a
            className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 hover:border-primary/30 transition-all group"
            href="https://www.tiktok.com/@biforgames"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="TikTok"
          >
            <svg
              className="w-4 h-4 text-on-surface-variant group-hover:text-primary transition-colors"
              fill="currentColor"
              viewBox="0 0 448 512"
            >
              <path d="M448 209.9a210.1 210.1 0 0 1-122.8-39.3v178.8A162.6 162.6 0 1 1 185 188.3v89.9a74.6 74.6 0 1 0 52.2 71.2V0h88a121 121 0 0 0 1.9 22.2 121.4 121.4 0 0 0 68 84.1 120.7 120.7 0 0 0 52.9 13.4v90.2Z" />
            </svg>
          </a>
        </div>

        <button
          onClick={scrollToTop}
          className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors group cursor-pointer"
          aria-label="Przewiń na górę"
        >
          <svg
            className="w-4 h-4 text-on-surface-variant group-hover:text-primary transition-colors"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18"
            />
          </svg>
        </button>
      </div>
    </footer>
  );
}
