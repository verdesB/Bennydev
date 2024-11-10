import Header from '../components/Header';
import Hero2 from '../components/Hero2';
import SolutionsGrid from '../components/SolutionsGrid';

export default function Solutions() {
  return (
    <>
    <Header pathname={'/solutions'} />      
    <main className="relative bg-gradient-to-b from-purple-50 to-white min-h-screen">
          <Hero2 
            title="Mes Solutions" 
            subtitle="Des solutions sur mesure pour vos projets digitaux" 
          />
          <SolutionsGrid />

          <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] z-1" />
    </main>
    </>
  );
}