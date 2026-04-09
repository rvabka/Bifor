'use client';

import Image from 'next/image';

export default function Navbar() {
  const scrollToNewsletter = () => {
    document
      .getElementById('newsletter')
      ?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-[100] px-4 md:px-8 py-8 flex justify-between items-center">
      <Image
        src="/logo.png"
        alt="Bifor"
        width={120}
        height={40}
        className="h-10 w-auto"
      />
      <button
        onClick={scrollToNewsletter}
        className="bg-white/10 backdrop-blur-xl border border-white/20 px-6 py-3 rounded-full text-white text-sm font-light hover:bg-white/20 transition-all tracking-tight cursor-pointer"
      >
        Pozostańmy w kontakcie
      </button>
    </nav>
  );
}
