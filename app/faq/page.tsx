import type { Metadata } from 'next';
import Navbar from '../components/Navbar';
import FAQSection from '../components/FAQSection';
import Footer from '../components/Footer';

export const metadata: Metadata = {
  title: 'FAQ — Bifor | Najczęstsze pytania o gry imprezowe',
  description:
    'Najczęściej zadawane pytania o Bifor: dla ilu graczy, czy za darmo, kiedy premiera i na jakich urządzeniach działa aplikacja z grami imprezowymi.'
};

export default function FAQPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-10">
        <FAQSection />
      </main>
      <Footer />
    </>
  );
}
