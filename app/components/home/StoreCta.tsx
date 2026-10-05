import Image from 'next/image';
import Link from 'next/link';

import StoreBadges from '../StoreBadges';
import Reveal from './Reveal';

export default function StoreCta() {
  return (
    <section className="relative px-6 pb-28 pt-12 sm:px-8 md:pb-40">
      <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
        <Reveal from="right" className="w-64 sm:w-80">
          <Image
            src="/sceny/armata.webp"
            alt="Duet z aplikacji BIFOR wylatuje na imprezę na armacie"
            width={900}
            height={901}
            sizes="320px"
            className="h-auto w-full"
          />
        </Reveal>

        <h2 className="font-display mt-6 text-balance text-[clamp(2.25rem,5.5vw,4rem)] font-extrabold leading-[0.95] tracking-[-0.03em]">
          Najlepsza impreza zaczyna się before.
        </h2>
        <p className="mt-5 max-w-md text-pretty text-lg leading-relaxed text-on-surface-variant">
          Za darmo na iPhone i Androida. Wystarczy jeden telefon, żeby zacząć.
        </p>

        <StoreBadges center className="mt-9" />

        <Link
          href="/gry-na-impreze"
          className="mt-8 text-sm text-on-surface-variant underline decoration-white/20 underline-offset-4 transition-colors hover:text-on-surface"
        >
          Nie wiesz, od czego zacząć? Zobacz, w co zagrać na imprezie
        </Link>
      </div>
    </section>
  );
}
