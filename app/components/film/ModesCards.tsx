/* eslint-disable @next/next/no-img-element */
import { GAMES } from '../../lib/games';
import { Card, Section, SectionHead } from '../ui/Surface';

const count = (pick: (g: (typeof GAMES)[number]) => boolean) =>
  GAMES.filter(pick).length;

const MODES = [
  {
    tag: 'Na jednym telefonie',
    title: 'Jeden aparat krąży po stole.',
    body: 'Telefon krąży z ręki do ręki. Nikt nic nie instaluje, działa bez internetu.',
    meta: () => `${count((g) => g.local)} z ${GAMES.length} gier`,
    art: '/cards/jeden-telefon.webp',
    tint: '#FFB200'
  },
  {
    tag: 'Każdy na swoim',
    title: 'Wszyscy wchodzą kodem pokoju.',
    body: 'Host zakłada pokój, reszta wchodzi kodem albo skanuje QR. Bez konta, bez wspólnego wi-fi.',
    meta: () => `Wszystkie ${count((g) => g.online)} gier`,
    art: '/cards/kazdy-swoj.webp',
    tint: '#6EA8FF'
  }
];

export default function ModesCards() {
  return (
    <Section>
      <SectionHead
        eyebrow="Jak gracie"
        title="Gracie tak, jak akurat siedzicie."
      />

      <div className="mt-12 grid gap-4 sm:gap-6 md:mt-16 md:grid-cols-2">
        {MODES.map((mode) => (
          <Card key={mode.tag} as="article" accent={mode.tint}>
            <div className="relative aspect-[4/3] overflow-hidden">
              <img
                src={mode.art}
                alt=""
                loading="lazy"
                className="h-full w-full object-cover"
              />
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(to top, #0f0f12 3%, rgba(15,15,18,0.2) 38%, transparent 66%)'
                }}
              />
            </div>

            <div className="relative p-7 pt-2 sm:p-9 sm:pt-3">
              <p
                className="text-[11px] font-semibold uppercase tracking-[0.24em]"
                style={{ color: mode.tint }}
              >
                {mode.tag}
              </p>
              <h3 className="font-display mt-3 text-balance text-2xl font-bold leading-[1.1] tracking-[-0.02em] sm:text-[1.75rem]">
                {mode.title}
              </h3>
              <p className="mt-4 max-w-md text-pretty text-sm leading-relaxed text-on-surface-variant sm:text-base">
                {mode.body}
              </p>
              <p className="mt-7 border-t border-white/[0.07] pt-5 text-pretty text-[13px] leading-relaxed text-on-surface-variant">
                {mode.meta()}
              </p>
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
}
