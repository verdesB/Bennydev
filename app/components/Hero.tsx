import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-white via-pink-100 to-purple-200">
      {/* Gradient overlay */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-white/90 via-pink-100/80 to-purple-300/70 opacity-90" />
        
        {/* Effet de grille modifié pour être plus subtil */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      {/* Contenu principal */}
      <article className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
        <div className="space-y-8">
          {/* Petit texte d'introduction */}
          <p className="text-gray-600 font-mono uppercase tracking-wider animate-fade-in">
            Développeur Web Full Stack
          </p>

          {/* Titre principal avec nouveau dégradé */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-purple-800 to-pink-700 animate-title pb-2">
            Transformez vos idées<br />
            en réalité digitale
          </h1>

          {/* Sous-titre */}
          <p className="max-w-2xl mx-auto text-gray-700 text-lg md:text-xl animate-fade-in-up">
            Spécialisé dans la création d&apos;expériences web modernes et performantes
          </p>

          {/* CTA Buttons avec couleurs adaptées */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12 animate-fade-in-up">
            <Link 
              title='Démarrer un projet'
              href="/contact"
              className="px-8 py-4 bg-purple-600 text-white rounded-full font-medium hover:bg-purple-700 transform hover:scale-105 transition-all duration-200 shadow-[0_0_20px_rgba(147,51,234,0.3)] hover:shadow-[0_0_25px_rgba(147,51,234,0.4)]"
            >
              Démarrer un projet
            </Link>
            <Link 
              title='Voir mes projets'
              href="/projets"
              className="px-8 py-4 border border-purple-300 text-purple-800 rounded-full font-medium hover:bg-purple-50 transform hover:scale-105 transition-all duration-200"
            >
              Voir mes projets
            </Link>
          </div>
        </div>
      </article>

      {/* Scroll indicator avec nouvelle couleur */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg 
          className="w-6 h-6 text-purple-600"
          fill="none" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth="2" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </div>
    </section>
  );
} 