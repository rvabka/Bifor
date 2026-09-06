import type { ReactNode } from 'react';

/* Every card on the page is this one shell. Coherence comes from there being
   a single definition of "a card" rather than each section inventing its own
   radius, border and shadow. */
export function Card({
  children,
  className = '',
  accent,
  as: Tag = 'div'
}: {
  children: ReactNode;
  className?: string;
  accent?: string;
  as?: 'div' | 'article' | 'li' | 'section';
}) {
  return (
    <Tag
      className={`group relative isolate overflow-hidden rounded-[1.75rem] border border-white/[0.07] bg-[#0f0f12] shadow-[0_40px_120px_-70px_rgba(0,0,0,1)] md:rounded-[2rem] ${className}`}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"
      />
      {accent ? (
        <span
          aria-hidden
          /* The bright point sits on the card's own top edge and fades to
             nothing well inside the element. Anchoring it to the element's
             bottom instead put the brightest pixel exactly where the box was
             clipped, which is what drew a straight line across the card. */
          className="pointer-events-none absolute inset-x-0 top-0 h-64"
          style={{
            background: `radial-gradient(120% 100% at 50% 0%, ${accent}26 0%, ${accent}0f 34%, transparent 72%)`
          }}
        />
      ) : null}
      {children}
    </Tag>
  );
}

export function Section({
  children,
  className = '',
  id
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={`relative px-6 py-20 sm:px-8 md:py-28 ${className}`}
    >
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
  );
}

export function SectionHead({
  eyebrow,
  title,
  lead,
  center = false
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  center?: boolean;
}) {
  return (
    <header className={center ? 'text-center' : undefined}>
      <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-on-surface-variant">
        {eyebrow}
      </p>
      <h2 className="font-display mt-4 text-balance text-[clamp(2rem,5.5vw,3.5rem)] font-extrabold leading-[0.96] tracking-[-0.03em]">
        {title}
      </h2>
      {lead ? (
        <p
          className={`mt-5 max-w-[42rem] text-pretty text-base leading-relaxed text-on-surface-variant sm:text-lg ${center ? 'mx-auto' : ''}`}
        >
          {lead}
        </p>
      ) : null}
    </header>
  );
}
