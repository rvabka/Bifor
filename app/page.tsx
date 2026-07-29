import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import Character3DScroll from './components/Character3DScroll';
import SocialProofSection from './components/SocialProofSection';
import GamesSection from './components/GamesSection';
import GamesIndexSection from './components/GamesIndexSection';
import HowItWorksSection, { START_STEPS } from './components/HowItWorksSection';
import FeaturesSection from './components/FeaturesSection';
import NewsletterSection from './components/NewsletterSection';
import Footer from './components/Footer';
import JsonLd from './components/JsonLd';
import { gamesItemListNode } from './lib/jsonld';
import { abs } from './lib/site';

const homeJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    gamesItemListNode,
    {
      '@type': 'HowTo',
      '@id': `${abs('/')}#jak-zaczac`,
      name: 'Jak zacząć grać w gry imprezowe w aplikacji Bifor',
      description:
        'Trzy kroki od pobrania aplikacji Bifor do pierwszej rundy gry imprezowej ze znajomymi.',
      inLanguage: 'pl-PL',
      totalTime: 'PT1M',
      tool: [{ '@type': 'HowToTool', name: 'Telefon z aplikacją Bifor' }],
      step: START_STEPS.map((step, i) => ({
        '@type': 'HowToStep',
        position: i + 1,
        name: step.name,
        text: step.text,
        url: `${abs('/')}#jak-to-dziala`
      }))
    }
  ]
};

export default function Home() {
  return (
    <>
      <JsonLd data={homeJsonLd} />
      <Navbar />
      <main>
        <HeroSection />
        <SocialProofSection />
        <GamesSection />
        <GamesIndexSection />
        <HowItWorksSection />
        <FeaturesSection />
        <Character3DScroll />
        <NewsletterSection />
      </main>
      <Footer />
    </>
  );
}
