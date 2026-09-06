import Link from 'next/link';
import { Card } from '../ui/Surface';
import MascotClip from './MascotClip';

const PROOF = [
  { value: '7', label: 'gier na start' },
  { value: '2-10', label: 'graczy' },
  { value: '0 zł', label: 'żeby zacząć' },
  { value: '0', label: 'kont do założenia' }
];

export default function CloserSection() {
  return (
    <section className="relative px-6 pb-4 pt-20 sm:px-8 md:pt-28">
      <div className="mx-auto max-w-6xl">
        <Card className="px-6 py-14 sm:px-12 sm:py-20 md:px-16">
          <span
            aria-hidden
            className="pointer-events-none absolute -left-10 top-0 h-80 w-[38rem] opacity-80"
            style={{
              background:
                'radial-gradient(50% 60% at 30% 40%, rgba(255,178,0,0.16), transparent 72%)'
            }}
          />
          <div className="relative grid items-center gap-10 md:grid-cols-[1.15fr_0.85fr] md:gap-14">
            <div className="text-center md:text-left">
              <h2 className="font-display text-balance text-[clamp(2rem,5.6vw,3.5rem)] font-extrabold leading-[0.96] tracking-[-0.03em]">
                Zbierzcie ekipę. Resztę robi apka.
              </h2>
              <p className="mx-auto mt-5 max-w-md text-pretty text-base leading-relaxed text-on-surface-variant sm:text-lg md:mx-0">
                Siedem gier imprezowych po polsku, otwarta beta na iOS i Androida.
                Podstawowa rozgrywka jest darmowa, a w pokoju wystarczy, że paczki
                haseł ma host.
              </p>

              <div className="mt-9 flex flex-col items-center gap-4 sm:flex-row md:justify-start">
                <Link
                  href="/pobierz"
                  className="inline-flex h-14 w-full items-center justify-center gap-3 rounded-full bg-primary px-9 text-base font-semibold text-on-primary shadow-[0_20px_60px_-25px_rgba(255,178,0,0.7)] transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98] sm:w-auto"
                >
                  Pobierz za darmo
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                    <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
                <Link
                  href="/gry"
                  className="inline-flex h-14 items-center text-sm font-medium text-on-surface-variant underline decoration-white/20 underline-offset-4 transition-colors hover:text-on-surface"
                >
                  Najpierw zobacz wszystkie gry
                </Link>
              </div>
            </div>

<MascotClip className="pointer-events-none mx-auto w-52 sm:w-60 md:w-full md:max-w-xs" />
          </div>

          <dl className="relative mt-14 grid grid-cols-2 gap-x-6 gap-y-10 border-t border-white/[0.07] pt-12 sm:grid-cols-4">
            {PROOF.map((item) => (
              <div key={item.label} className="text-center">
                <dt className="font-display text-3xl font-extrabold tracking-[-0.02em] sm:text-4xl">
                  {item.value}
                </dt>
                <dd className="mt-2 text-xs leading-snug text-on-surface-variant sm:text-sm">
                  {item.label}
                </dd>
              </div>
            ))}
          </dl>
        </Card>
      </div>
    </section>
  );
}
