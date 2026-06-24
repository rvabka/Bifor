'use client';

import { useState } from 'react';
import { faqs } from './faq-data';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-16 sm:py-24 bg-background">
      <div className="max-w-3xl mx-auto px-4 md:px-8">
        <div className="reveal text-center space-y-4 mb-10 sm:mb-16">
          <h2 className="text-balance text-[2.75rem] sm:text-5xl md:text-7xl font-light tracking-tight leading-[1.02] sm:leading-none">
            Pytania i{' '}
            <span className="text-primary font-normal">odpowiedzi</span>
          </h2>
          <p className="text-on-surface-variant text-base sm:text-lg font-extralight">
            Najczęściej zadawane pytania o Bifor.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="reveal border border-white/5 rounded-2xl overflow-hidden transition-colors hover:border-white/10"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 md:p-8 text-left cursor-pointer group active:bg-white/5 transition-colors"
              >
                <span className="text-base md:text-lg font-light tracking-tight pr-4">
                  {faq.question}
                </span>
                <svg
                  className={`w-5 h-5 text-primary shrink-0 transition-transform duration-300 ${
                    openIndex === i ? 'rotate-45' : ''
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
              </button>
              <div
                className={`grid transition-all duration-300 ${
                  openIndex === i
                    ? 'grid-rows-[1fr] opacity-100'
                    : 'grid-rows-[0fr] opacity-0'
                }`}
              >
                <div className="overflow-hidden">
                  <p className="px-5 sm:px-6 md:px-8 pb-5 sm:pb-6 md:pb-8 text-sm sm:text-base text-on-surface-variant font-extralight leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
