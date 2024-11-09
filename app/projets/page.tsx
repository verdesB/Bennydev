import React from 'react';

import Projets from '../components/Projects';
import Hero2 from '../components/Hero2';

export default function ProjetsPage() {
  return (
    <main className="relative bg-gradient-to-b from-purple-50 to-white min-h-screen">
      <Hero2 
        title="Portfolio de Projets"
        subtitle="Découvrez nos réalisations innovantes et créatives"
      />
      <Projets />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] z-1" />
    </main>
  );
} 