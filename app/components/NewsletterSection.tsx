import { Card } from './ui/Surface';
import NewsletterForm from './NewsletterForm';

export default function NewsletterSection() {
  return (
    <section id="newsletter" className="relative px-6 py-20 sm:px-8 md:py-28">
      <div className="mx-auto max-w-6xl">
        <Card accent="#FFB200" className="px-6 py-12 sm:px-12 sm:py-16 md:px-16 md:py-20">
          <div className="relative mx-auto max-w-2xl text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-primary">
              Wczesny dostęp
            </p>
            <h2 className="font-display mt-4 text-balance text-[clamp(2rem,5.5vw,3.25rem)] font-extrabold leading-[0.96] tracking-[-0.03em]">
              Bądź pierwszy przy nowych grach.
            </h2>
            <p className="mx-auto mt-5 max-w-lg text-pretty text-base leading-relaxed text-on-surface-variant sm:text-lg">
              Aplikacja jest już do pobrania. Napiszemy, gdy dojdzie nowa gra, nowa
              paczka haseł albo gdy wyjdziemy z bety. Zero spamu.
            </p>

            <NewsletterForm />
          </div>
        </Card>
      </div>
    </section>
  );
}
