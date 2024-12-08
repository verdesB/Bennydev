import ChatButton from '../components/ChatButton';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Hero2 from '../components/Hero2';
import SolutionsGrid from '../components/SolutionsGrid';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Solutions Digitales Sur Mesure',
  description: 'Découvrez nos solutions digitales personnalisées pour transformer votre présence en ligne. Expertise en développement web, applications mobiles et stratégie numérique.',
  keywords: 'solutions digitales, développement web, applications sur mesure, transformation numérique, services informatiques',
  openGraph: {
    title: 'Solutions Digitales Sur Mesure',
    description: 'Solutions numériques personnalisées pour votre entreprise. Expertise en développement web et applications sur mesure.',
    type: 'website',
    locale: 'fr_FR',
  }
};
export default function Solutions() {
  return (
    <>
    <Header pathname={'/solutions'} />      
    <main className="relative bg-gradient-to-b from-purple-50 to-white min-h-screen z-20">
          <Hero2 
            title="Mes Solutions" 
            subtitle="Des solutions sur mesure pour vos projets digitaux" 
          />
          <SolutionsGrid />

    </main>
    <Footer />
    <ChatButton />
    </>
  );
}