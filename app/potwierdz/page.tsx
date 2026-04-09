'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Suspense } from 'react';

const statusMessages: Record<
  string,
  { icon: string; title: string; description: string }
> = {
  success: {
    icon: '🎉',
    title: 'Potwierdzono!',
    description:
      'Twój zapis został potwierdzony. Dostaniesz od nas wiadomość, gdy Bifor będzie gotowy do pobrania.'
  },
  already: {
    icon: '👋',
    title: 'Już jesteś na liście!',
    description:
      'Ten adres e-mail jest już zapisany. Nie musisz nic więcej robić — odezwiemy się wkrótce.'
  },
  expired: {
    icon: '⏰',
    title: 'Link wygasł',
    description:
      'Ten link potwierdzający wygasł lub jest nieprawidłowy. Spróbuj zapisać się ponownie.'
  },
  error: {
    icon: '😔',
    title: 'Coś poszło nie tak',
    description:
      'Nie udało się potwierdzić zapisu. Spróbuj ponownie później lub napisz do nas na kontakt@bifor.games.'
  }
};

function ConfirmContent() {
  const searchParams = useSearchParams();
  const status = searchParams.get('status') || 'error';
  const content = statusMessages[status] || statusMessages.error;

  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-8">
        <img src="/logo.png" alt="Bifor" className="h-12 w-auto mx-auto" />
        <div className="text-7xl">{content.icon}</div>
        <h1 className="text-4xl md:text-5xl font-light tracking-tight text-on-surface">
          {content.title}
        </h1>
        <p className="text-on-surface-variant text-lg font-extralight leading-relaxed">
          {content.description}
        </p>
        <Link
          href="/"
          className="inline-block px-8 py-3 bg-primary text-on-primary rounded-full font-medium text-sm tracking-wide hover:bg-primary/90 transition-colors"
        >
          Wróć na stronę główną
        </Link>
      </div>
    </main>
  );
}

export default function ConfirmPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-on-surface-variant text-lg">Ładowanie...</div>
        </main>
      }
    >
      <ConfirmContent />
    </Suspense>
  );
}
