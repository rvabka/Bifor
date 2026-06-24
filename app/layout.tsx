import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin', 'latin-ext'],
  display: 'swap'
});

const SITE = 'https://bifor.games';
const DESCRIPTION =
  'Bifor to aplikacja z grami imprezowymi na telefon. Graj w Zakazane słowa, Czółko, Impostor, Sekrety, Państwa Miasta i Grę na P ze znajomymi. Stwórz lobby kodem PIN i baw się razem, na jednym lub wielu telefonach.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default:
      'Bifor — Gry imprezowe na telefon | Zakazane słowa, Czółko, Impostor i więcej',
    template: '%s | Bifor'
  },
  description: DESCRIPTION,
  applicationName: 'Bifor',
  generator: 'Next.js',
  category: 'games',
  keywords: [
    'gry imprezowe',
    'gry na telefon',
    'gry towarzyskie',
    'gry na imprezę',
    'gry na domówkę',
    'zakazane słowa',
    'czółko',
    'impostor',
    'sekrety',
    'państwa miasta',
    'gry ze znajomymi',
    'party games',
    'gry multiplayer',
    'gry online ze znajomymi',
    'bifor',
    'aplikacja imprezowa'
  ],
  authors: [{ name: 'Bifor', url: SITE }],
  creator: 'Bifor',
  publisher: 'Bifor',
  icons: {
    icon: '/logo.png',
    apple: '/logo.png'
  },
  alternates: {
    canonical: '/'
  },
  openGraph: {
    type: 'website',
    locale: 'pl_PL',
    url: SITE,
    siteName: 'Bifor',
    title: 'Bifor — Gry imprezowe na telefon',
    description:
      'Zakazane słowa, Czółko, Impostor i więcej gier imprezowych w jednej aplikacji. Stwórz lobby, zaproś znajomych kodem PIN i grajcie razem.'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bifor — Gry imprezowe na telefon',
    description:
      'Zakazane słowa, Czółko, Impostor i więcej gier imprezowych w jednej aplikacji.'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1
    }
  }
};

export const viewport: Viewport = {
  themeColor: '#0e0e0e',
  width: 'device-width',
  initialScale: 1
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${SITE}/#organization`,
      name: 'Bifor',
      url: SITE,
      logo: `${SITE}/logo.png`,
      sameAs: ['https://www.tiktok.com/@biforgames']
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE}/#website`,
      url: SITE,
      name: 'Bifor',
      description: DESCRIPTION,
      inLanguage: 'pl-PL',
      publisher: { '@id': `${SITE}/#organization` }
    },
    {
      '@type': 'MobileApplication',
      '@id': `${SITE}/#app`,
      name: 'Bifor',
      description: DESCRIPTION,
      applicationCategory: 'GameApplication',
      operatingSystem: 'iOS, Android',
      inLanguage: 'pl',
      url: SITE,
      publisher: { '@id': `${SITE}/#organization` },
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'PLN',
        availability: 'https://schema.org/PreOrder'
      }
    }
  ]
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
