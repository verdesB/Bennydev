import Hero2 from '@/app/components/Hero2';
import ProcessusSteps from '@/app/components/ProcessusSteps';

export default function ProcessusPage() {
  return (
    <main className="relative bg-gradient-to-b from-purple-50 to-white min-h-screen">
      <Hero2 
        title="Notre Processus"
        subtitle="Découvrez notre méthodologie de développement étape par étape"
      />
      
      <ProcessusSteps />
      
      <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] z-1" />
    </main>
  );
} 