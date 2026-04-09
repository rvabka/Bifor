import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin', 'latin-ext'],
  display: 'swap'
});

export const metadata: Metadata = {
  title:
    'Bifor — Gry imprezowe na telefon | Zakazane słowa, Czółko, Impostor i więcej',
  icons: {
    icon: '/logo.png',
    apple: '/logo.png'
  },
  description:
    'Bifor to aplikacja z grami imprezowymi na telefon. Graj w Zakazane słowa, Czółko, Impostor i więcej ze znajomymi. Stwórz lobby kodem PIN i baw się razem — na jednym lub wielu telefonach.',
  keywords: [
    'gry imprezowe',
    'gry na telefon',
    'gry towarzyskie',
    'gry na imprezę',
    'zakazane słowa',
    'czółko',
    'impostor',
    'gry ze znajomymi',
    'party games',
    'gry multiplayer',
    'bifor',
    'aplikacja imprezowa'
  ],
  authors: [{ name: 'Bifor' }],
  creator: 'Bifor',
  publisher: 'Bifor',
  applicationName: 'Bifor',
  category: 'games',
  openGraph: {
    type: 'website',
    locale: 'pl_PL',
    siteName: 'Bifor',
    title: 'Bifor — Gry imprezowe na telefon',
    description:
      'Zakazane słowa, Czółko, Impostor i więcej gier imprezowych w jednej aplikacji. Stwórz lobby, zaproś znajomych i grajcie razem.'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bifor — Gry imprezowe na telefon',
    description:
      'Zakazane słowa, Czółko, Impostor i więcej gier imprezowych w jednej aplikacji.'
  },
  robots: {
    index: true,
    follow: true
  },
  alternates: {
    canonical: 'https://bifor.games'
  }
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'MobileApplication',
  name: 'Bifor',
  description:
    'Aplikacja z grami imprezowymi na telefon — Zakazane słowa, Czółko, Impostor i więcej gier ze znajomymi.',
  applicationCategory: 'GameApplication',
  operatingSystem: 'iOS, Android',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'PLN',
    availability: 'https://schema.org/PreOrder'
  },
  inLanguage: 'pl'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl" className={`${inter.variable} dark`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-background text-on-surface font-light antialiased">
        {children}
      </body>
    </html>
  );
}
