'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { smoothScrollTo } from './scrollTo';

const SECTION_LINKS = [
  { label: 'Gry', id: 'gry' },
  { label: 'Jak to działa', id: 'jak-to-dziala' }
];

export default function Navbar() {
  const pathname = usePathname();
  const onHome = pathname === '/';
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const goSection = (id: string) => {
    setOpen(false);
    if (onHome) smoothScrollTo(id);
    else window.location.href = `/#${id}`;
  };

  const goNewsletter = () => {
    setOpen(false);
    if (onHome) smoothScrollTo('newsletter');
    else window.location.href = '/#newsletter';
  };

  const goTop = () => {
    if (onHome) smoothScrollTo('top');
    else window.location.href = '/';
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${
        scrolled || open
          ? 'bg-background/80 backdrop-blur-xl border-b border-white/5'
          : 'border-b border-transparent'
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-5 flex items-center justify-between">
        <button onClick={goTop} aria-label="Bifor — góra strony" className="cursor-pointer">
          <Image src="/logo.png" alt="Bifor" width={120} height={40} priority className="h-9 w-auto" />
        </button>

        <div className="hidden md:flex items-center gap-9">
          {SECTION_LINKS.map((l) => (
            <button
              key={l.id}
              onClick={() => goSection(l.id)}
              className="text-sm font-light tracking-tight text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
            >
              {l.label}
            </button>
          ))}
          <Link
            href="/faq"
            className="text-sm font-light tracking-tight text-on-surface-variant hover:text-on-surface transition-colors"
          >
            FAQ
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={goNewsletter}
            className="bg-primary text-on-primary px-5 md:px-6 py-2.5 rounded-full text-sm font-semibold tracking-tight hover:scale-105 hover:shadow-[0_0_30px_rgba(255,178,0,0.4)] transition-all cursor-pointer"
          >
            Zapisz się!
          </button>
          <button
            onClick={() => setOpen((o) => !o)}
            className="md:hidden flex h-10 w-10 items-center justify-center text-on-surface cursor-pointer"
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
        <div className="flex flex-col gap-1 border-b border-white/5 bg-background/95 px-4 pb-6 pt-1 backdrop-blur-xl">
          {SECTION_LINKS.map((l) => (
            <button
              key={l.id}
              onClick={() => goSection(l.id)}
              className="py-3 text-left text-base font-light text-on-surface-variant hover:text-on-surface transition-colors"
            >
              {l.label}
            </button>
          ))}
          <Link
            href="/faq"
            onClick={() => setOpen(false)}
            className="py-3 text-left text-base font-light text-on-surface-variant hover:text-on-surface transition-colors"
          >
            FAQ
          </Link>
        </div>
      </div>
    </nav>
  );
}
