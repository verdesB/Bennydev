import Header from '../components/Header';
import Hero2 from '../components/Hero2';
import SolutionsGrid from '../components/SolutionsGrid';

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
    </>
  );
}