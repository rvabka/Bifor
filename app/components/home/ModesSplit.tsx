import Image from 'next/image';

import { GAMES } from '../../lib/games';
import Reveal from './Reveal';

const localGames = GAMES.filter((g) => g.local).map((g) => g.title);

const MODES = [
  {
    art: '/cards/jeden-telefon.webp',
    title: 'Jeden telefon na wszystkich',
    body: 'Telefon idzie z ręki do ręki, każdy widzi swoją część gry w swojej kolejce. Działa bez internetu.',
    meta: localGames.join(', ')
  },
  {
    art: '/cards/kazdy-swoj.webp',
    title: 'Każdy na swoim',
    body: 'Ktoś zakłada pokój, reszta wpisuje kod albo skanuje QR. Do 12 osób, bez wspólnego Wi-Fi. Pokój zostaje otwarty między grami.',
    meta: 'Wszystkie gry, a Sekrety, Państwa Miasta i Wieczór BIFOR tylko tak.'
  }
];

export default function ModesSplit() {
  return (
    <section className="relative px-6 py-24 sm:px-8 md:py-36">
      <div className="mx-auto max-w-6xl">
        <h2 className="font-display max-w-2xl text-balance text-[clamp(2.25rem,5vw,3.75rem)] font-extrabold leading-[0.95] tracking-[-0.03em]">
          Gracie tak, jak akurat siedzicie.
        </h2>

        <div className="mt-14 grid gap-32 md:mt-24 md:grid-cols-2 md:gap-10">
          {MODES.map((mode, i) => (
            <article key={mode.title} className="relative">
              <div className="relative">
                {i === 1 && (
                  <Reveal
                    from="up"
                    className="pointer-events-none absolute -top-[7rem] right-6 z-0 w-32 sm:-top-[7.75rem] sm:w-36"
                  >
                    <Image src="/postacie/macha.webp" alt="" width={440} height={449} className="h-auto w-full" />
                  </Reveal>
                )}
                <div className="relative z-10 overflow-hidden rounded-[1.6rem]">
                  <Image
                    src={mode.art}
                    alt=""
                    width={1200}
                    height={800}
                    sizes="(max-width: 768px) 100vw, 560px"
                    className="h-auto w-full"
                  />
                </div>
              </div>
              <h3 className="font-display mt-7 text-2xl font-bold tracking-[-0.02em]">{mode.title}</h3>
              <p className="mt-3 max-w-md text-pretty leading-relaxed text-on-surface-variant">{mode.body}</p>
              <p className="mt-4 max-w-md text-pretty text-sm leading-relaxed text-on-surface-variant/70">
                {mode.meta}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
