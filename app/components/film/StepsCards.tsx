/* eslint-disable @next/next/no-img-element */
import { START_STEPS } from '../../lib/steps';
import MascotClip from './MascotClip';
import { Card, Section, SectionHead } from '../ui/Surface';

export default function StepsCards() {
  return (
    <Section id="jak-to-dziala">
      <SectionHead
        eyebrow="Jak to działa"
        title={
          <>
            Od zera do pierwszej rundy:{' '}
            <span className="text-primary tabular-nums">0:30</span>
          </>
        }
        lead="Tyle czasu mija od otwarcia aplikacji do pierwszego hasła na ekranie."
      />

      <ol className="mt-12 grid gap-4 sm:gap-6 md:mt-16 md:grid-cols-3">
        {START_STEPS.map((step, i) => (
          <Card key={step.name} as="li" accent={step.tint} className="flex flex-col">
            <div className="relative flex items-center gap-3 px-7 pt-7 sm:px-8 sm:pt-8">
              <span
                className="font-display text-sm font-extrabold tabular-nums"
                style={{ color: step.tint }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="h-px flex-1 bg-white/[0.09]" />
              <span className="font-display text-sm font-extrabold tabular-nums text-on-surface-variant">
                0:{String(step.clock).padStart(2, '0')}
              </span>
            </div>

            <div className="relative px-7 pt-6 sm:px-8">
              <h3 className="font-display text-xl font-bold tracking-[-0.01em] sm:text-2xl">
                {step.name}
              </h3>
              <p className="mt-3 text-pretty text-sm leading-relaxed text-on-surface-variant">
                {step.text}
              </p>
            </div>

            <div className="relative mt-8 flex flex-1 items-end justify-center px-7 pb-8 sm:px-8">
              {step.shot ? (
                <span
                  className="block w-[11rem] overflow-hidden rounded-[1.4rem] border border-white/[0.09] sm:w-[12rem]"
                  style={{ boxShadow: `0 30px 80px -45px ${step.tint}` }}
                >
                  <img
                    src={step.shot}
                    alt=""
                    loading="lazy"
                    className="block w-full"
                  />
                </span>
              ) : (
                <MascotClip className="block w-[15rem] sm:w-[16.5rem]" />
              )}
            </div>
          </Card>
        ))}
      </ol>
    </Section>
  );
}
