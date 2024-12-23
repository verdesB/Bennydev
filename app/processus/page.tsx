import Hero2 from '@/app/components/Hero2';
import ProcessusSteps from '../components/ProcessusSteps';
import Header from '../components/Header';
import ChatButton from '../components/ChatButton';
import Footer from '../components/Footer';

export const metadata = {
  title: 'Mon Processus',
  description: 'Découvrez mon processus de développement web étape par étape. Une approche méthodique et transparente pour la réalisation de vos projets.',
};

export default function ProcessusPage() {
  return (
    <> 
    <Header pathname={'/processus'} />
    <main className="relative bg-gradient-to-b from-purple-50 to-white min-h-screen">
      <Hero2 
        title="Mon Processus"
        subtitle="Découvrez mon processus de développement étape par étape"
      />
      
      <ProcessusSteps />
      
      <div className="absolute inset- bg-[linear-gradient(rgba(139,92,246,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] z-1" />
    </main>
    <Footer />
    <ChatButton />
    </>
  );
} 