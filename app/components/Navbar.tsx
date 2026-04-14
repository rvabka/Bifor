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
        className="bg-primary text-on-primary px-6 py-3 rounded-full text-sm font-semibold hover:shadow-[0_0_30px_rgba(255,178,0,0.4)] hover:scale-105 transition-all tracking-tight cursor-pointer"
      >
        Zapisz się!
      </button>
    </nav>
  );
}
