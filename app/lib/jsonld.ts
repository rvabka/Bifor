import type { Game, GameFaq } from './games';
import { GAMES, gamePath } from './games';
import {
  CONTACT_EMAIL,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
  TIKTOK_URL,
  abs
} from './site';

const ORGANIZATION_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;
const APP_ID = `${SITE_URL}/#app`;

export const organizationNode = {
  '@type': 'Organization',
  '@id': ORGANIZATION_ID,
  name: SITE_NAME,
  alternateName: 'BIFOR',
  url: SITE_URL,
  logo: abs('/logo.png'),
  email: CONTACT_EMAIL,
  slogan: 'Bo najlepsza impreza zaczyna się before.',
  description:
    'Twórca aplikacji Bifor z grami imprezowymi na telefon dla polskojęzycznych grup znajomych.',
  sameAs: [TIKTOK_URL],
  contactPoint: [
    {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      email: CONTACT_EMAIL,
      availableLanguage: ['pl', 'Polish']
    }
  ]
};

export const websiteNode = {
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  url: SITE_URL,
  name: SITE_NAME,
  description: SITE_DESCRIPTION,
  inLanguage: 'pl-PL',
  publisher: { '@id': ORGANIZATION_ID }
};

export const appNode = {
  '@type': ['MobileApplication', 'SoftwareApplication'],
  '@id': APP_ID,
  name: 'Bifor',
  alternateName: 'Bifor - gry imprezowe',
  description: SITE_DESCRIPTION,
  applicationCategory: 'GameApplication',
  applicationSubCategory: 'Gry imprezowe',
  operatingSystem: 'iOS, Android',
  inLanguage: 'pl',
  url: SITE_URL,
  image: abs('/logo.png'),
  softwareVersion: '1.0',
  publisher: { '@id': ORGANIZATION_ID },
  author: { '@id': ORGANIZATION_ID },
  isAccessibleForFree: true,
  featureList: [
    'Sześć gier imprezowych w jednej aplikacji',
    'Tryb na jednym telefonie podawanym z ręki do ręki',
    'Tryb online z pokojem i kodem dla znajomych',
    'Dołączanie kodem pokoju lub kodem QR bez zakładania konta',
    'Od 2 do 10 graczy zależnie od gry',
    'Polskie hasła i polski interfejs',
    'Darmowa kategoria haseł w każdej grze'
  ],
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'PLN',
    availability: 'https://schema.org/PreOrder',
    category: 'Darmowa aplikacja z opcjonalnymi zakupami'
  },
  audience: {
    '@type': 'Audience',
    audienceType: 'Grupy znajomych na imprezach, domówkach i beforach',
    geographicArea: { '@type': 'Country', name: 'Polska' }
  }
};

export const breadcrumbNode = (items: { name: string; path: string }[]) => ({
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: item.name,
    item: abs(item.path)
  }))
});

export const faqNode = (faqs: GameFaq[], id: string) => ({
  '@type': 'FAQPage',
  '@id': id,
  inLanguage: 'pl-PL',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.question,
    acceptedAnswer: { '@type': 'Answer', text: f.answer }
  }))
});

export const gameNode = (game: Game) => ({
  '@type': 'VideoGame',
  '@id': `${abs(gamePath(game.slug))}#game`,
  name: game.title,
  alternateName: game.alsoKnownAs,
  url: abs(gamePath(game.slug)),
  description: game.summary,
  image: abs(game.art),
  genre: [game.genre, 'Gra imprezowa', 'Gra towarzyska'],
  inLanguage: 'pl',
  gamePlatform: ['iOS', 'Android'],
  applicationCategory: 'GameApplication',
  operatingSystem: 'iOS, Android',
  playMode: game.online ? ['MultiPlayer', 'CoOp'] : ['MultiPlayer'],
  numberOfPlayers: {
    '@type': 'QuantitativeValue',
    minValue: game.minPlayers,
    maxValue: game.maxPlayers,
    unitText: 'gracze'
  },
  isPartOf: { '@id': APP_ID },
  publisher: { '@id': ORGANIZATION_ID },
  isAccessibleForFree: true,
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'PLN',
    availability: 'https://schema.org/PreOrder'
  }
});

export const howToNode = (game: Game) => ({
  '@type': 'HowTo',
  '@id': `${abs(gamePath(game.slug))}#howto`,
  name: `Jak grać w ${game.title}`,
  description: `Zasady gry ${game.title} w aplikacji Bifor krok po kroku. ${game.players}, ${game.duration}.`,
  inLanguage: 'pl-PL',
  totalTime: 'PT20M',
  supply: [
    {
      '@type': 'HowToSupply',
      name: game.online && !game.local ? 'Telefon dla każdego gracza' : 'Telefon z aplikacją Bifor'
    }
  ],
  tool: [{ '@type': 'HowToTool', name: 'Aplikacja Bifor' }],
  step: game.steps.map((s, i) => ({
    '@type': 'HowToStep',
    position: i + 1,
    name: s.name,
    text: s.text,
    url: `${abs(gamePath(game.slug))}#krok-${i + 1}`
  }))
});

export const gamesItemListNode = {
  '@type': 'ItemList',
  '@id': `${abs('/gry')}#lista-gier`,
  name: 'Gry imprezowe w aplikacji Bifor',
  numberOfItems: GAMES.length,
  itemListOrder: 'https://schema.org/ItemListUnordered',
  itemListElement: GAMES.map((game, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    url: abs(gamePath(game.slug)),
    name: game.title,
    description: game.summary
  }))
};
