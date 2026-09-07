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

/* Sam formularz, bez naglowka i bez karty - strona glowna i /pobierz mowia co
   innego, ale zapisuja tak samo. Kopia tego bloku oznaczalaby dwa widgety
   Turnstile i dwie sciezki bledow do utrzymania. */
export default function NewsletterForm({
  submitLabel = 'Zapisz mnie',
  idleNote = 'Adres zostaje u nas. Wypisujesz się jednym kliknięciem.'
}: {
  submitLabel?: string;
  idleNote?: string;
}) {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
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
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
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
        body: JSON.stringify({ email, firstName, turnstileToken })
      });

      const data = await res.json();

      if (res.ok) {
        setStatus('success');
        setMessage('Sprawdź skrzynkę i kliknij link potwierdzający.');
        setEmail('');
        setFirstName('');
      } else {
        setStatus('error');
        setMessage(data.error || 'Coś poszło nie tak. Spróbuj ponownie.');
      }
    } catch {
      setStatus('error');
      setMessage('Błąd połączenia. Sprawdź internet i spróbuj ponownie.');
    }

    if (widgetIdRef.current && window.turnstile) {
      window.turnstile.reset(widgetIdRef.current);
      setTurnstileToken('');
    }
  };

  const sent = status === 'success';

  return (
    <form onSubmit={handleSubmit} className="mx-auto mt-10 max-w-xl text-left">
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="block">
          <span className="sr-only">Imię</span>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="h-14 w-full rounded-2xl border border-white/[0.09] bg-white/[0.04] px-5 text-base text-on-surface transition-colors placeholder:text-on-surface-variant focus:border-primary/60 focus:bg-white/[0.06] focus:outline-none"
            placeholder="Imię"
            autoComplete="given-name"
            required
            disabled={status === 'loading'}
          />
        </label>
        <label className="block">
          <span className="sr-only">Adres e-mail</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-14 w-full rounded-2xl border border-white/[0.09] bg-white/[0.04] px-5 text-base text-on-surface transition-colors placeholder:text-on-surface-variant focus:border-primary/60 focus:bg-white/[0.06] focus:outline-none"
            placeholder="Adres e-mail"
            autoComplete="email"
            required
            disabled={status === 'loading'}
          />
        </label>
      </div>

      <div ref={turnstileRef} className="mt-4 flex justify-center [&>*]:mx-auto" />

      <button
        type="submit"
        disabled={status === 'loading' || sent}
        className="mt-4 inline-flex h-14 w-full items-center justify-center gap-3 rounded-2xl bg-primary px-8 text-base font-semibold text-on-primary shadow-[0_20px_60px_-25px_rgba(255,178,0,0.7)] transition-transform duration-200 hover:scale-[1.01] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === 'loading' ? 'Wysyłanie...' : sent ? 'Zapisane' : submitLabel}
        {status === 'idle' || status === 'error' ? (
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
            <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ) : null}
      </button>

      <p
        role="status"
        className={`mt-4 min-h-[1.25rem] text-center text-sm ${
          status === 'error' ? 'text-error' : 'text-on-surface-variant'
        }`}
      >
        {message || idleNote}
      </p>
    </form>
  );
}
