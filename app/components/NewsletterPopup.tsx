'use client';

import { useState, useEffect } from 'react';

export default function NewsletterPopup() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const alreadyDismissed = sessionStorage.getItem(
      'newsletter-popup-dismissed'
    );
    if (alreadyDismissed) {
      setDismissed(true);
      return;
    }

    const timer = setTimeout(() => setVisible(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    setVisible(false);
    setDismissed(true);
    sessionStorage.setItem('newsletter-popup-dismissed', 'true');
  };

  const handleClick = () => {
    document
      .getElementById('newsletter')
      ?.scrollIntoView({ behavior: 'smooth' });
    handleDismiss();
  };

  if (dismissed) return null;

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-[90] transition-all duration-700 ease-out ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
      }`}
    >
      <div className="bg-primary/95 backdrop-blur-xl border-t border-primary shadow-[0_-10px_60px_rgba(255,178,0,0.3)]">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3 text-on-primary">
            <span className="text-2xl">🎮</span>
            <div>
              <p className="font-semibold text-sm md:text-base">
                Nie przegap premiery Bifor!
              </p>
              <p className="text-xs md:text-sm opacity-80">
                Zapisz się i zgarnij wczesny dostęp + bonusy
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleClick}
              className="bg-on-primary text-primary px-6 py-2.5 rounded-full font-bold text-sm hover:scale-105 transition-all cursor-pointer whitespace-nowrap"
            >
              Zapisz się teraz
            </button>
            <button
              onClick={handleDismiss}
              className="text-on-primary/60 hover:text-on-primary p-2 transition-colors cursor-pointer"
              aria-label="Zamknij"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
