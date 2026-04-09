'use client';

import { useState, useRef, useEffect, type FormEvent } from 'react';

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: string | HTMLElement,
        options: {
          sitekey: string;
          callback: (token: string) => void;
          'error-callback'?: () => void;
          'expired-callback'?: () => void;
          theme?: 'light' | 'dark' | 'auto';
          size?: 'normal' | 'compact' | 'invisible';
        }
      ) => string;
      reset: (widgetId: string) => void;
      remove: (widgetId: string) => void;
    };
  }
}

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle');
  const [message, setMessage] = useState('');
  const [turnstileToken, setTurnstileToken] = useState('');
  const turnstileRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);

  useEffect(() => {
    const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
    if (!siteKey) return;

    const renderWidget = () => {
      if (turnstileRef.current && window.turnstile && !widgetIdRef.current) {
        widgetIdRef.current = window.turnstile.render(turnstileRef.current, {
          sitekey: siteKey,
          callback: (token: string) => setTurnstileToken(token),
          'expired-callback': () => setTurnstileToken(''),
          'error-callback': () => setTurnstileToken(''),
          theme: 'dark',
          size: 'normal'
        });
      }
    };

    if (window.turnstile) {
      renderWidget();
    } else {
      const script = document.createElement('script');
      script.src =
        'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
      script.async = true;
      script.onload = renderWidget;
      document.head.appendChild(script);
    }

    return () => {
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
    };
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!email) return;

    if (!turnstileToken) {
      setStatus('error');
      setMessage('Proszę potwierdzić, że nie jesteś robotem.');
      return;
    }

    setStatus('loading');

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, turnstileToken })
      });

      const data = await res.json();

      if (res.ok) {
        setStatus('success');
        setMessage('Jesteś na liście! Wkrótce się odezwiemy. 🎉');
        setEmail('');
      } else {
        setStatus('error');
        setMessage(data.error || 'Coś poszło nie tak. Spróbuj ponownie.');
      }
    } catch {
      setStatus('error');
      setMessage('Błąd połączenia. Sprawdź internet i spróbuj ponownie.');
    }

    // Reset turnstile
    if (widgetIdRef.current && window.turnstile) {
      window.turnstile.reset(widgetIdRef.current);
      setTurnstileToken('');
    }
  };

  return (
    <section id="newsletter" className="py-16 bg-background">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8">
        <div className="bg-surface-container-lowest p-12 md:p-24 rounded-[4rem] border border-white/5 flex flex-col items-center text-center gap-16 relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary-dim/10 blur-[120px] rounded-full" />

          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute bottom-0 -right-2 md:-right-6 w-32 md:w-80 pointer-events-none drop-shadow-[0_0_30px_rgba(255,178,0,0.25)] z-20 hidden md:block"
          >
            <source src="/bboy.webm" type="video/webm" />
          </video>

          <div className="max-w-2xl relative z-10 space-y-8">
            <h2 className="text-5xl md:text-7xl font-light tracking-tight leading-none">
              Bądź pierwszy
            </h2>
            <p className="text-on-surface-variant text-xl font-extralight leading-relaxed max-w-xl mx-auto">
              Zapisz się, aby uzyskać wczesny dostęp do aplikacji, ekskluzywne
              gry i wpływ na to, co stworzymy dalej.
            </p>
            <div className="flex items-center justify-center gap-4 text-xs text-primary font-medium tracking-[0.2em] uppercase">
              <span>Wczesny dostęp + ekskluzywne bonusy</span>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="w-full max-w-md relative z-10 flex flex-col gap-8 items-center"
          >
            <div className="relative w-full">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full bg-transparent border-0 border-b border-white/20 py-6 px-0 text-2xl font-light text-on-surface placeholder:text-on-surface-variant focus:ring-0 focus:outline-none focus:border-primary transition-all duration-500 text-center"
                placeholder="Twój adres e-mail"
                required
                disabled={status === 'loading'}
              />
            </div>

            <div ref={turnstileRef} className="flex justify-center" />

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full max-w-xs bg-primary-dim text-on-primary py-6 rounded-2xl font-medium text-lg hover:bg-primary hover:shadow-[0_0_40px_rgba(255,178,0,0.3)] transition-all uppercase tracking-[0.1em] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {status === 'loading' ? 'Wysyłanie...' : 'Zaczynamy'}
            </button>

            {message && (
              <p
                className={`text-sm font-light ${
                  status === 'success' ? 'text-primary' : 'text-error'
                }`}
              >
                {message}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
