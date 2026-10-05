import Navbar from './components/Navbar';
import HeroFilm from './components/film/HeroFilm';
import GlassShowcase from './components/film/GlassShowcase';
import GamesGrid from './components/home/GamesGrid';
import ModesSplit from './components/home/ModesSplit';
import PartyFeature from './components/home/PartyFeature';
import StoreCta from './components/home/StoreCta';
import Footer from './components/Footer';
import JsonLd from './components/JsonLd';
import { gamesItemListNode } from './lib/jsonld';

const homeJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [gamesItemListNode]
};

/* Dwa pierwsze ekrany (film i szkło) zostają takie, jakie są. Od trzeciego
   w dół strona jest celowo cicha: plakaty z apki, krótkie zdania, postacie,
   które wskazują i wyskakują zza krawędzi - bez kart z poświatą i bez dużych
   gradientów. */
export default function Home() {
  return (
    <>
      <JsonLd data={homeJsonLd} />
      <Navbar />
      <main>
        <HeroFilm />
        <GlassShowcase />
        <GamesGrid />
        <ModesSplit />
        <PartyFeature />
        <StoreCta />
      </main>
      <Footer />
    </>
  );
}
