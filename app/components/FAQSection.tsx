'use client';

import { useState } from 'react';

const faqs = [
  {
    question: 'Czy Bifor jest darmowy?',
    answer:
      'Tak! Bifor będzie dostępny za darmo z pełnym dostępem do podstawowych gier. W przyszłości planujemy opcjonalne rozszerzenia, ale fundament zawsze będzie darmowy.'
  },
  {
    question: 'Ile osób może grać jednocześnie?',
    answer:
      'W zależności od gry, od 3 do nawet 16 graczy w jednym lobby. Wystarczy, że każdy ma telefon i wpisze kod PIN — żadnego logowania, żadnych kont.'
  },
  {
    question: 'Czy potrzebuję internetu do gry?',
    answer:
      'Tak, gracze muszą być połączeni z internetem (Wi-Fi lub dane mobilne). Nie musicie być w tej samej sieci — grajcie z dowolnego miejsca na świecie!'
  },
  {
    question: 'Kiedy premiera aplikacji?',
    answer:
      'Pracujemy nad tym! Zapisz się do newslettera, żeby jako pierwszy dostać informację o premierze i uzyskać wczesny dostęp z ekskluzywnymi bonusami.'
  },
  {
    question: 'Na jakich urządzeniach działa Bifor?',
    answer:
      'Bifor będzie dostępny na iOS (App Store) i Android (Google Play). Aplikacja jest optymalizowana pod telefony, ale tabletów też nie wykluczamy!'
  },
  {
    question: 'Czy mogę zaproponować nową grę?',
    answer:
      'Oczywiście! Zapisz się do newslettera — subskrybenci mają bezpośredni wpływ na rozwój aplikacji. Twój pomysł może trafić do następnej aktualizacji.'
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 bg-background">
      <div className="max-w-3xl mx-auto px-4 md:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-5xl md:text-7xl font-light tracking-tight leading-none">
            Pytania i{' '}
            <span className="text-primary font-normal">odpowiedzi</span>
          </h2>
          <p className="text-on-surface-variant text-lg font-extralight">
            Najczęściej zadawane pytania o Bifor.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="border border-white/5 rounded-2xl overflow-hidden transition-colors hover:border-white/10"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-6 md:p-8 text-left cursor-pointer group"
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
                  <p className="px-6 md:px-8 pb-6 md:pb-8 text-on-surface-variant font-extralight leading-relaxed">
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
