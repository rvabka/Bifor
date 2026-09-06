import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import JsonLd from './components/JsonLd';
import SmoothScroll from './components/SmoothScroll';
import { appNode, organizationNode, websiteNode } from './lib/jsonld';
import { META_DESCRIPTION, SITE_NAME, SITE_URL } from './lib/site';

/* Both faces are self-hosted variable fonts cut down to Latin + Latin
   Extended-A, which is every glyph Polish (and the rest of Central Europe)
   needs. Google's own subsetting splits latin from latin-ext, so a Polish
   page always pulled two files per family - 232 KB of which the extended
   file alone carried Vietnamese and phonetic glyphs nothing here renders.
   One file per family, 87 KB together. Inter keeps its full weight axis;
   Montserrat is the display face and only ever runs at 700 and 800. */
const inter = localFont({
  src: './fonts/inter-latin.woff2',
  variable: '--font-inter',
  weight: '100 900',
  display: 'swap',
  adjustFontFallback: 'Arial'
});

const montserrat = localFont({
  src: './fonts/montserrat-latin.woff2',
  variable: '--font-montserrat',
  weight: '700 800',
  display: 'swap',
  adjustFontFallback: 'Arial'
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Gry na imprezę i domówkę - Bifor, 7 gier imprezowych na telefon',
    template: '%s | Bifor'
  },
  description: META_DESCRIPTION,
  applicationName: SITE_NAME,
  category: 'games',
  keywords: [
    'gry imprezowe',
    'gry imprezowe na telefon',
    'gry na imprezę',
    'gry na domówkę',
    'gry ze znajomymi',
    'gry towarzyskie',
    'gry na before',
    'gry imprezowe online',
    'gry na jednym telefonie',
    'czółko',
    'zakazane słowa',
    'impostor',
    'sekrety',
    'państwa miasta online',
    'kalambury na p',
    'aplikacja z grami imprezowymi',
    'bifor'
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  icons: {
    icon: '/logo.png',
    apple: '/logo.png'
  },
  alternates: {
    canonical: '/',
    languages: { 'pl-PL': SITE_URL }
  },
  appleWebApp: {
    capable: true,
    title: SITE_NAME,
    statusBarStyle: 'black-translucent'
  },
  formatDetection: { telephone: false },
  openGraph: {
    type: 'website',
    locale: 'pl_PL',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: 'Gry na imprezę i domówkę - Bifor',
    description:
      'Siedem gier imprezowych w jednej aplikacji: Czółko, Zakazane, Impostor, Sekrety, Państwa Miasta, Gra na P i Szybka Trójka. Grajcie na jednym telefonie albo każdy na swoim - dołączacie kodem pokoju, bez zakładania konta.'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gry na imprezę i domówkę - Bifor',
    description:
      'Siedem gier imprezowych w jednej aplikacji. Graj ze znajomymi na jednym telefonie lub online, dołączając kodem pokoju.'
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
  themeColor: '#0a0a0a',
  width: 'device-width',
  initialScale: 1
};

const siteJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [organizationNode, websiteNode, appNode]
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl" className={`${inter.variable} ${montserrat.variable} dark`}>
      <head>
        <JsonLd data={siteJsonLd} />
        <link rel="alternate" type="text/plain" href="/llms.txt" title="llms.txt" />
      </head>
      <body className="min-h-screen bg-background text-on-surface antialiased">
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
