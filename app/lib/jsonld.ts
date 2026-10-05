import type { Game, GameFaq } from './games';
import { GAMES, gamePath } from './games';
import { APP_STORE_URL, STORE_LINKS } from './download';
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
    'Twórca aplikacji BIFOR z grami na imprezę na telefon dla polskich ekip.',
  sameAs: [TIKTOK_URL, ...STORE_LINKS],
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
  name: 'BIFOR',
  alternateName: ['BIFOR - gry na imprezę', 'Bifor'],
  description: SITE_DESCRIPTION,
  applicationCategory: 'GameApplication',
  applicationSubCategory: 'Gry imprezowe',
  operatingSystem: 'iOS, Android',
  inLanguage: 'pl',
  url: SITE_URL,
  image: abs('/logo.png'),
  softwareVersion: '1.0',
  contentRating: '18+',
  downloadUrl: STORE_LINKS,
  installUrl: APP_STORE_URL,
  sameAs: STORE_LINKS,
  publisher: { '@id': ORGANIZATION_ID },
  author: { '@id': ORGANIZATION_ID },
  isAccessibleForFree: true,
  featureList: [
    'Siedem gier na imprezę w jednej aplikacji',
    'Wieczór BIFOR: zestaw gier pod liczbę graczy i jedna tabela na cały wieczór',
    'Gra na jednym telefonie podawanym w kółko, bez internetu',
    'Pokój online z kodem albo kodem QR, do 12 osób',
    'Dołączanie do pokoju bez zakładania konta',
    'Polskie hasła i polski interfejs',
    'Darmowe kategorie haseł w każdej grze',
    'Opcjonalna subskrypcja BIFOR+ z dodatkowymi hasłami, z której korzysta cały pokój hosta'
  ],
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'PLN',
    availability: 'https://schema.org/InStock',
    category: 'Darmowa aplikacja z opcjonalną subskrypcją BIFOR+'
  },
  audience: {
    '@type': 'Audience',
    audienceType: 'Dorosłe grupy znajomych na imprezach, domówkach i beforach',
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
    availability: 'https://schema.org/InStock'
  }
});

export const howToNode = (game: Game) => ({
  '@type': 'HowTo',
  '@id': `${abs(gamePath(game.slug))}#howto`,
  name: `Jak grać w ${game.title}`,
  description: `Zasady gry ${game.title} w aplikacji BIFOR krok po kroku. ${game.players}, ${game.duration}.`,
  inLanguage: 'pl-PL',
  totalTime: 'PT20M',
  supply: [
    {
      '@type': 'HowToSupply',
      name: game.online && !game.local ? 'Telefon dla każdego gracza' : 'Telefon z aplikacją BIFOR'
    }
  ],
  tool: [{ '@type': 'HowToTool', name: 'Aplikacja BIFOR' }],
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
  name: 'Gry imprezowe w aplikacji BIFOR',
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
