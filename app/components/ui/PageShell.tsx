import type { ReactNode } from 'react';
import Navbar from '../Navbar';
import Footer from '../Footer';

/* Podstrony stoją na tym samym, gładkim tle co strona główna poniżej filmu:
   bez plam gradientu, ten sam krój i ta sama szerokość kolumny. */
export default function PageShell({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="relative">{children}</main>
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
  eyebrow?: string;
  title: string;
  lead?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <header className="px-6 pb-4 pt-32 sm:px-8 md:pt-40">
      <div className="mx-auto max-w-6xl">
        {eyebrow ? <p className="mb-5 text-sm font-semibold text-primary">{eyebrow}</p> : null}
        <h1 className="font-display max-w-4xl text-balance text-[clamp(2.25rem,6.5vw,4.25rem)] font-extrabold leading-[0.95] tracking-[-0.035em]">
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
