import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import SocialProofSection from './components/SocialProofSection';
import GamesSection from './components/GamesSection';
import FeaturesSection from './components/FeaturesSection';
import NewsletterSection from './components/NewsletterSection';
import FAQSection from './components/FAQSection';
import NewsletterPopup from './components/NewsletterPopup';
import Footer from './components/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <SocialProofSection />
        <GamesSection />
        <FeaturesSection />
        <NewsletterSection />
        <FAQSection />
      </main>
      <Footer />
      <NewsletterPopup />
    </>
  );
}
