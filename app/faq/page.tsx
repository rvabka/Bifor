import type { Metadata } from 'next';
import Navbar from '../components/Navbar';
import FAQSection from '../components/FAQSection';
import { faqs } from '../components/faq-data';
import Footer from '../components/Footer';

export const metadata: Metadata = {
  title: 'FAQ — najczęstsze pytania o gry imprezowe',
  description:
    'Najczęściej zadawane pytania o Bifor: dla ilu graczy, czy za darmo, kiedy premiera i na jakich urządzeniach działa aplikacja z grami imprezowymi.',
  alternates: { canonical: '/faq' }
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.question,
    acceptedAnswer: { '@type': 'Answer', text: f.answer }
  }))
};

export default function FAQPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Navbar />
      <main className="min-h-screen pt-10">
        <FAQSection />
      </main>
      <Footer />
    </>
  );
}
