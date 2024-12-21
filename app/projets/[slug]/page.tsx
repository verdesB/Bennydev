import { notFound } from 'next/navigation';

import { projects } from '../projets.data';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import GallerySection from './components/GallerySection';
import DemoSection from './components/DemoSection';



// Fonction pour générer les paramètres statiques
export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.title.toLowerCase().replace(/\s+/g, '-'),
  }));
}

// Mise à jour du type avec les types corrects de Next.js
type PageProps = {
  params: { slug: string }
  searchParams?: { [key: string]: string | string[] | undefined }
}

// Page du projet
export default async function ProjectPage({ params }: PageProps) {
  const project = projects.find(
    (p) => p.title.toLowerCase().replace(/\s+/g, '-') === params.slug
  );

  if (!project) {
    notFound();
  }

  return (
    <>
      <Header pathname={'/projets'} />

      {/* Hero Section avec image en parallaxe */}


      <main className="max-w-6xl mx-auto  mt-32">
        <div className="relative h-[60vh] w-full mx-auto overflow-hidden  rounded-xl z-10">
          <div className="absolute inset-0">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/20" />
          </div>
          <div className="relative h-full max-w-6xl mx-auto px-4 flex flex-col justify-end pb-16">
            <h1 className="text-6xl font-bold text-white mb-6 leading-tight">{project.title}</h1>
            <div className="flex flex-wrap gap-3 mb-8">
              {project.technologies.map((tech, index) => (
                <span
                  key={index}
                  className="px-4 py-2 rounded-full text-sm font-medium bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-white/20 transition-colors"
                >
                  {tech.name}
                </span>
              ))}
            </div>
          </div>
        </div>
        {/* Introduction */}
        <section className="relative mt-12 py-20 z-10 bg-white/80 backdrop-blur-2xl rounded-xl p-8 sm:p-16 shadow-[0_0_20px_rgba(0,0,0,0.08)] hover:shadow-[0_0_60px_rgba(0,0,0,0.12)] transition-all duration-500">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="space-y-6">
              <h2 className="text-3xl font-semibold">À Propos du Projet</h2>
              <p className="text-lg text-gray-600 leading-relaxed">{project.description}</p>
              <div className="flex gap-4">
                {project.liveUrl ? (
                  <a 
                    href={project.liveUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="px-6 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition-colors"
                  >
                    Voir le projet
                  </a>
                ) : (
                  <span className="px-6 py-3 bg-gray-400 text-white rounded-full cursor-not-allowed">
                    En développement
                  </span>
                )}
                {project.githubUrl ? (
                  <a 
                    href={project.githubUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="px-6 py-3 border border-black rounded-full hover:bg-black hover:text-white transition-colors"
                  >
                    Code source
                  </a>
                ) : (
                  <span className="px-6 py-3 border border-gray-400 text-gray-400 rounded-full cursor-not-allowed">
                    Bêta 
                  </span>
                )}
              </div>
            </div>
            <div className="bg-gray-50 rounded-2xl p-8">
              <h3 className="text-xl font-medium mb-6">Points Clés</h3>
              <ul className="space-y-4">
                {project.keyPoints?.map((point, index) => (
                  <li key={index} className="flex items-start gap-4">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                      ✓
                    </span>
                    <span className="text-gray-600">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Galerie */}
        <GallerySection images={project.gallery} />
           

    <DemoSection videos={project.demoVideos} />
      </main>
      <Footer />
    </>
  );
} 