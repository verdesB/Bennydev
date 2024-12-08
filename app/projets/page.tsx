import React from 'react';

import Projets from '../components/Projects';
import Hero2 from '../components/Hero2';
import Header from '../components/Header';
import ChatButton from '../components/ChatButton';
import Footer from '../components/Footer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Portoflio de Projets',
  description: 'Découvrez mes projets de développement web incluant des sites e-commerce, vitrines, applications web et les projets personnels.',
  
}

export default function ProjetsPage() {
  return (
    <>
    <Header pathname={'/projets'} />
    <main className="relative bg-gradient-to-b from-purple-50 to-white min-h-screen">
      <Hero2 
        title="Portfolio de Projets"
        subtitle="Découvrez nos réalisations innovantes et créatives"
      />
      <Projets />
    </main>
    <Footer />
    <ChatButton />
    </>
  );
} 