import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AssembleHero from './components/AssembleHero';
import SocialProofSection from './components/SocialProofSection';
import GamesSection from './components/GamesSection';
import HowItWorksSection from './components/HowItWorksSection';
import AboutSection from './components/AboutSection';
import FeaturesSection from './components/FeaturesSection';
import NewsletterSection from './components/NewsletterSection';
import Footer from './components/Footer';
import JsonLd from './components/JsonLd';
import { gamesItemListNode } from './lib/jsonld';
import { START_STEPS } from './lib/steps';
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
        'Trzy kroki od otwarcia aplikacji Bifor do pierwszej rundy gry imprezowej ze znajomymi - w około 30 sekund.',
      inLanguage: 'pl-PL',
      totalTime: 'PT30S',
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
        <AssembleHero />
        <SocialProofSection />
        <GamesSection />
        <HowItWorksSection />
        <AboutSection />
        <FeaturesSection />
        <NewsletterSection />
      </main>
      <Footer />
    </>
  );
}
