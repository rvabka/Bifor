'use client';

import Image from 'next/image';
import Link from 'next/link';
import { smoothScrollTo } from './scrollTo';
import { GAMES, gamePath } from '../lib/games';

const INFO_LINKS = [
  { label: 'Wszystkie gry', href: '/gry' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Prywatność', href: '/polityka-prywatnosci' },
  { label: 'Regulamin', href: '/terms' }
];

export default function Footer() {
  const scrollToTop = () => smoothScrollTo('top');

  return (
    <footer className="bg-background border-t border-white/5">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-14 sm:py-20">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[1.2fr_1fr_1fr_auto] md:gap-12">
          <div className="flex flex-col items-center gap-4 md:items-start">
            <Image src="/logo.png" alt="Bifor" width={120} height={40} className="h-10 w-auto" />
            <p className="max-w-xs text-center text-sm font-extralight leading-relaxed text-on-surface-variant md:text-left">
              Bifor to aplikacja z grami imprezowymi na telefon. Siedem gier, jeden wieczór -
              graj na jednym telefonie albo każdy na swoim.
            </p>
          </div>

          <nav aria-label="Gry" className="text-center md:text-left">
            <h2 className="text-[10px] uppercase tracking-[0.3em] text-on-surface-variant">
              Gry
            </h2>
            <ul className="mt-4 space-y-2.5">
              {GAMES.map((game) => (
                <li key={game.slug}>
                  <Link
                    href={gamePath(game.slug)}
                    className="text-sm font-extralight text-on-surface-variant transition-colors hover:text-primary"
                  >
                    {game.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Informacje" className="text-center md:text-left">
            <h2 className="text-[10px] uppercase tracking-[0.3em] text-on-surface-variant">
              Informacje
            </h2>
            <ul className="mt-4 space-y-2.5">
              {INFO_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm font-extralight text-on-surface-variant transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href="mailto:kontakt@bifor.games"
                  className="text-sm font-extralight text-on-surface-variant transition-colors hover:text-primary"
                >
                  kontakt@bifor.games
                </a>
              </li>
            </ul>
          </nav>

          <div className="flex items-center justify-center gap-3 md:items-start md:justify-end">
            <a
              className="group flex h-12 w-12 items-center justify-center rounded-full border border-white/10 transition-all hover:border-primary/30 hover:bg-white/5 active:scale-90"
              href="https://www.tiktok.com/@biforgames"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Bifor na TikToku"
            >
              <svg
                className="h-4 w-4 text-on-surface-variant transition-colors group-hover:text-primary"
                fill="currentColor"
                viewBox="0 0 448 512"
              >
                <path d="M448 209.9a210.1 210.1 0 0 1-122.8-39.3v178.8A162.6 162.6 0 1 1 185 188.3v89.9a74.6 74.6 0 1 0 52.2 71.2V0h88a121 121 0 0 0 1.9 22.2 121.4 121.4 0 0 0 68 84.1 120.7 120.7 0 0 0 52.9 13.4v90.2Z" />
              </svg>
            </a>
            <button
              onClick={scrollToTop}
              className="group flex h-12 w-12 items-center justify-center rounded-full border border-white/10 transition-all hover:bg-white/5 active:scale-90 cursor-pointer"
              aria-label="Przewiń na górę"
            >
              <svg
                className="h-4 w-4 text-on-surface-variant transition-colors group-hover:text-primary"
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
        </div>

        <p className="mt-12 border-t border-white/5 pt-8 text-center text-[10px] uppercase tracking-[0.3em] text-on-surface-variant md:text-left">
          © {new Date().getFullYear()} Bifor. Wszystkie prawa zastrzeżone.
        </p>
      </div>
    </footer>
  );
}
