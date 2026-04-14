import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
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
        <FeaturesSection />
        <NewsletterSection />
      </main>
      <Footer />
      <NewsletterPopup />
    </>
  );
}
