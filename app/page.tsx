import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import Character3DScroll from './components/Character3DScroll';
import SocialProofSection from './components/SocialProofSection';
import GamesSection from './components/GamesSection';
import FeaturesSection from './components/FeaturesSection';
import NewsletterSection from './components/NewsletterSection';
import NewsletterPopup from './components/NewsletterPopup';
import Footer from './components/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <Character3DScroll />
        <SocialProofSection />
        <GamesSection />
        <FeaturesSection />
        <NewsletterSection />
      </main>
      <Footer />
      <NewsletterPopup />
    </>
  );
}
