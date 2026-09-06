import Navbar from './components/Navbar';
import HeroFilm from './components/film/HeroFilm';
import GamesCarousel from './components/film/GamesCarousel';
import StepsCards from './components/film/StepsCards';
import ModesCards from './components/film/ModesCards';
import CloserSection from './components/film/CloserSection';
import NewsletterSection from './components/NewsletterSection';
import GlassShowcase from './components/film/GlassShowcase';
import LightField from './components/three/LightField';
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
        <HeroFilm />
        <GlassShowcase />

        <div className="relative">
          {/* One shader lit in the seven game colours ties every section below
              the showcase together; it sticks to the viewport so the canvas
              stays one screen tall instead of spanning the whole document. */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="sticky top-0 h-svh">
              <LightField />
            </div>
          </div>

          <div className="relative z-10">
            <GamesCarousel />
            <StepsCards />
            <ModesCards />
            <CloserSection />
            <NewsletterSection />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
