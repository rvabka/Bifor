'use client';

import { useState } from 'react';
import { faqs } from './faq-data';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="px-6 pb-4 pt-32 sm:px-8 md:pt-40">
      <div className="mx-auto max-w-3xl">
        <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-primary">
          Pomoc
        </p>
        <h1 className="font-display mt-5 text-balance text-[clamp(2.25rem,6.5vw,4.25rem)] font-extrabold leading-[0.95] tracking-[-0.035em]">
          Pytania i odpowiedzi
        </h1>
        <p className="mt-6 max-w-[44rem] text-pretty text-base leading-relaxed text-on-surface-variant sm:text-lg">
          Najczęściej zadawane pytania o Bifor - aplikację z grami imprezowymi na
          telefon. Znajdziesz tu informacje o liczbie graczy, trybach gry, cenie i
          premierze.
        </p>

        <ul className="mt-12 space-y-3 md:mt-16">
          {faqs.map((faq, i) => (
            <li
              key={faq.question}
              className="overflow-hidden rounded-[1.25rem] border border-white/[0.07] bg-[#0f0f12] transition-colors hover:border-white/[0.13]"
            >
              <h2 className="font-display text-base font-bold tracking-[-0.01em] md:text-lg">
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  aria-expanded={openIndex === i}
                  className="flex w-full cursor-pointer items-center justify-between gap-4 p-5 text-left transition-colors active:bg-white/[0.03] sm:p-6"
                >
                  <span className="pr-4">{faq.question}</span>
                  <svg
                    className={`h-5 w-5 shrink-0 text-primary transition-transform duration-300 ${
                      openIndex === i ? 'rotate-45' : ''
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4.5v15m7.5-7.5h-15"
                    />
                  </svg>
                </button>
              </h2>
              <div
                className={`grid transition-all duration-300 ${
                  openIndex === i
                    ? 'grid-rows-[1fr] opacity-100'
                    : 'grid-rows-[0fr] opacity-0'
                }`}
              >
                <div className="overflow-hidden">
                  <p className="px-5 pb-5 text-pretty text-sm leading-relaxed text-on-surface-variant sm:px-6 sm:pb-6 sm:text-base">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
