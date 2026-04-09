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

        <div className="flex gap-12">
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
