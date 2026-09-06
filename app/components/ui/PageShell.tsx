import type { ReactNode } from 'react';
import Navbar from '../Navbar';
import Footer from '../Footer';
import AmbientWash from './AmbientWash';

/* Subpages share the home page's ground: the same shader wash, the same
   display face, the same container. Without this they read as a different
   site wearing the same logo. */
export default function PageShell({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="relative">
        <AmbientWash />
        <div className="relative z-10">{children}</div>
      </main>
      <Footer />
    </>
  );
}

export function PageHero({
  eyebrow,
  title,
  lead,
  children
}: {
  eyebrow: string;
  title: string;
  lead?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <header className="px-6 pb-4 pt-32 sm:px-8 md:pt-40">
      <div className="mx-auto max-w-6xl">
        <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-primary">
          {eyebrow}
        </p>
        <h1 className="font-display mt-5 max-w-4xl text-balance text-[clamp(2.25rem,6.5vw,4.25rem)] font-extrabold leading-[0.95] tracking-[-0.035em]">
          {title}
        </h1>
        {lead ? (
          <div className="mt-6 max-w-[44rem] text-pretty text-base leading-relaxed text-on-surface-variant sm:text-lg">
            {lead}
          </div>
        ) : null}
        {children}
      </div>
    </header>
  );
}

export function Prose({ children }: { children: ReactNode }) {
  return (
    <div className="max-w-[44rem] space-y-5 text-pretty text-base leading-relaxed text-on-surface-variant sm:text-lg">
      {children}
    </div>
  );
}
