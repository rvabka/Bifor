import Image from 'next/image';
import Link from 'next/link';

import { PARTY_PATH, PARTY_PRESETS } from '../../lib/party';
import Reveal from './Reveal';

export default function PartyFeature() {
  return (
    <section className="relative overflow-hidden px-6 py-24 sm:px-8 md:py-36">
      <div className="mx-auto grid max-w-6xl items-center gap-14 md:grid-cols-[1fr_0.9fr] md:gap-16">
        <div className="relative">
          <p className="text-sm font-semibold text-primary">Wieczór BIFOR</p>
          <h2 className="font-display mt-4 max-w-lg text-balance text-[clamp(2.25rem,5vw,3.75rem)] font-extrabold leading-[0.95] tracking-[-0.03em]">
            Kilka gier, jedna tabela.
          </h2>
          <p className="mt-6 max-w-md text-pretty text-lg leading-relaxed text-on-surface-variant">
            Wybieracie długość, a apka układa zestaw gier pod waszą ekipę i prowadzi was gra po grze.
            Za miejsce w każdej grze są punkty, więc do końca nie wiadomo, kto wygra.
          </p>
          <p className="mt-4 max-w-md text-pretty leading-relaxed text-on-surface-variant">
            Na koniec gala z tytułami. Ktoś zostanie Czarnym koniem, ktoś Wiecznie drugim.
          </p>
          <Link
            href={PARTY_PATH}
            className="mt-8 inline-flex items-center gap-2 text-base font-semibold text-on-surface underline decoration-primary decoration-2 underline-offset-[6px] transition-colors hover:text-primary"
          >
            Jak działa Wieczór BIFOR
          </Link>

          <ul className="mt-12 grid max-w-md grid-cols-4 gap-3">
            {PARTY_PRESETS.map((preset) => (
              <li key={preset.id}>
                <div className="overflow-hidden rounded-xl">
                  <Image
                    src={preset.art}
                    alt={preset.name}
                    width={520}
                    height={696}
                    sizes="110px"
                    className="h-auto w-full"
                  />
                </div>
                <p className="mt-2 text-xs leading-snug text-on-surface-variant">
                  {preset.games ? `${preset.games} ${preset.games < 5 ? 'gry' : 'gier'}, ${preset.time}` : 'własny zestaw'}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative mt-24 md:mt-0">
          <Reveal from="up" className="pointer-events-none absolute -top-[7.5rem] left-8 z-0 w-28 sm:w-32">
            <Image src="/postacie/megafon.webp" alt="" width={460} height={680} className="h-auto w-full" />
          </Reveal>
          <div className="relative z-10 aspect-square overflow-hidden rounded-[1.8rem]">
            <Image
              src="/wieczor/hero.webp"
              alt="Duet z aplikacji BIFOR z pucharem za wygrany wieczór gier"
              width={900}
              height={1125}
              sizes="(max-width: 768px) 100vw, 480px"
              className="h-full w-full object-cover object-top"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
