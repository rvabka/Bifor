import Image from 'next/image';
import Link from 'next/link';

import { GAMES, gamePath } from '../../lib/games';
import { PARTY_PATH } from '../../lib/party';
import Reveal from './Reveal';

const TILES = [
  ...GAMES.map((g) => ({
    href: gamePath(g.slug),
    art: g.art,
    title: g.title,
    caption: g.players
  })),
  { href: PARTY_PATH, art: '/plakaty/wieczor.webp', title: 'Wieczór BIFOR', caption: 'kilka gier, jedna tabela' }
];

export default function GamesGrid() {
  return (
    <section id="gry" className="relative px-6 py-24 sm:px-8 md:py-36">
      <div className="relative mx-auto max-w-6xl">
        <div className="relative flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <h2 className="font-display max-w-xl text-balance text-[clamp(2.25rem,5vw,3.75rem)] font-extrabold leading-[0.95] tracking-[-0.03em]">
            Siedem gier na każdą ekipę.
          </h2>
          <p className="max-w-xs text-pretty text-base leading-relaxed text-on-surface-variant md:mr-44 md:text-right lg:mr-52">
            Każda ma darmowe hasła. Stuknij plakat, a zobaczysz zasady.
          </p>

          <Reveal
            from="right"
            className="pointer-events-none absolute -top-24 right-0 hidden w-40 md:block lg:w-48"
          >
            <Image src="/postacie/wskazuje-lewo.webp" alt="" width={460} height={712} className="h-auto w-full" />
          </Reveal>
        </div>

        <ul className="mt-14 grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-6 md:mt-16 md:grid-cols-4">
          {TILES.map((tile, i) => (
            <li key={tile.href}>
              <Reveal from="fade" delay={(i % 4) * 70}>
                <Link href={tile.href} className="group block">
                  <span className="block overflow-hidden rounded-[1.4rem] bg-surface-container-low">
                    <Image
                      src={tile.art}
                      alt={`${tile.title} - gra na imprezę w aplikacji BIFOR`}
                      width={640}
                      height={857}
                      sizes="(max-width: 768px) 46vw, 270px"
                      className="h-auto w-full transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                    />
                  </span>
                  <span className="sr-only">{tile.title}</span>
                  <span className="mt-3 block text-sm text-on-surface-variant transition-colors group-hover:text-on-surface">
                    {tile.caption}
                  </span>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
