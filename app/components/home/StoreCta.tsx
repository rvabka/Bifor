import Image from 'next/image';
import Link from 'next/link';

import StoreBadges from '../StoreBadges';
import Reveal from './Reveal';

const FADE_BOTTOM = 'linear-gradient(to bottom, #000 68%, transparent 97%)';

export default function StoreCta() {
  return (
    <section className="relative overflow-x-clip px-6 pb-28 pt-4 sm:px-8 md:pb-40">
      <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
        {/* Szerokość ma sufit, bo źródło ma 1400 px - szerzej na ekranie
            Retina obraz traci ostrość. Dół grafiki wygasa, bo białe buty pod
            białym napisem go gubiły. */}
        <Reveal from="left" className="w-full max-w-[34rem]">
          <Image
            src="/sceny/armata.webp"
            alt="Duet z aplikacji BIFOR wylatuje na imprezę na armacie"
            width={1399}
            height={1400}
            sizes="(max-width: 640px) 100vw, 544px"
            className="h-auto w-full"
            style={{ WebkitMaskImage: FADE_BOTTOM, maskImage: FADE_BOTTOM }}
          />
        </Reveal>

        <h2 className="font-display relative -mt-8 max-w-3xl text-balance text-[clamp(2.5rem,6.5vw,4.75rem)] font-extrabold leading-[0.95] tracking-[-0.03em] sm:-mt-12">
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
