'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { smoothScrollTo } from './scrollTo';

const SECTION_LINKS = [{ label: 'Jak to działa', id: 'jak-to-dziala' }];

const PAGE_LINKS = [
  { label: 'Gry', href: '/gry' },
  { label: 'Pobierz', href: '/pobierz' },
  { label: 'FAQ', href: '/faq' }
];

export default function Navbar() {
  const pathname = usePathname();
  const onHome = pathname === '/';
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    let ticking = false;

    const read = () => {
      ticking = false;
      const y = window.scrollY;
      setScrolled(y > 20);
      if (Math.abs(y - last) > 6) {
        setHidden(y > last && y > 160);
        last = y;
      }
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(read);
    };

    read();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Always close the mobile menu when the route changes (e.g. FAQ link).
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const goSection = (id: string) => {
    setOpen(false);
    // Wait for the menu overlay to close, then scroll to the section.
    if (onHome) requestAnimationFrame(() => smoothScrollTo(id));
    else window.location.href = `/#${id}`;
  };

  const goTop = () => {
    if (onHome) smoothScrollTo('top');
    else window.location.href = '/';
  };

  return (
    <nav
      aria-label="Nawigacja główna"
      className={`fixed top-0 left-0 w-full z-50 transition-[transform,background-color,border-color] duration-300 ease-out ${
        hidden && !open ? '-translate-y-full' : 'translate-y-0'
      } ${
        scrolled || open
          ? 'bg-background/80 backdrop-blur-xl border-b border-white/5'
          : 'border-b border-transparent'
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-5 flex items-center justify-between">
        <button
          onClick={goTop}
          aria-label="Bifor - góra strony"
          className="cursor-pointer transition-transform active:scale-95"
        >
          <Image src="/logo.png" alt="Bifor" width={120} height={40} priority className="h-9 w-auto" />
        </button>

        <div className="hidden md:flex items-center gap-9">
          {PAGE_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm font-light tracking-tight text-on-surface-variant hover:text-on-surface transition-colors"
            >
              {l.label}
            </Link>
          ))}
          {SECTION_LINKS.map((l) => (
            <button
              key={l.id}
              onClick={() => goSection(l.id)}
              className="text-sm font-light tracking-tight text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
            >
              {l.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/pobierz"
            className="bg-primary text-on-primary px-5 md:px-6 py-2.5 rounded-full text-sm font-semibold tracking-tight hover:scale-105 hover:shadow-[0_0_30px_rgba(255,178,0,0.4)] active:scale-95 transition-all cursor-pointer"
          >
            Pobierz
          </Link>
          <button
            onClick={() => setOpen((o) => !o)}
            className="md:hidden flex h-10 w-10 items-center justify-center text-on-surface cursor-pointer transition-transform active:scale-90"
            aria-label={open ? 'Zamknij menu' : 'Otwórz menu'}
            aria-expanded={open}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />
              )}
            </svg>
          </button>
        </div>
      </div>

      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-out ${
          open ? 'max-h-72' : 'max-h-0'
        }`}
      >
        <div className="flex flex-col gap-1 border-b border-white/5 bg-background/95 px-3 pb-6 pt-2 backdrop-blur-xl">
          {PAGE_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="flex items-center justify-between rounded-2xl px-3 py-3.5 text-left text-base font-light text-on-surface-variant transition-colors hover:text-on-surface active:bg-white/5"
            >
              {l.label}
              <svg className="h-4 w-4 text-outline" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
              </svg>
            </Link>
          ))}
          {SECTION_LINKS.map((l) => (
            <button
              key={l.id}
              onClick={() => goSection(l.id)}
              className="flex items-center justify-between rounded-2xl px-3 py-3.5 text-left text-base font-light text-on-surface-variant transition-colors hover:text-on-surface active:bg-white/5"
            >
              {l.label}
              <svg className="h-4 w-4 text-outline" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
