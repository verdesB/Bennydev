import Image from 'next/image';

export default function About() {
  const values = [
    { title: "Expertise", description: "Compétences techniques constamment à jour" },
    { title: "Créativité", description: "Solutions uniques et innovantes" },
    { title: "Proximité", description: "Relations de confiance et transparence" },
    { title: "Engagement", description: "Qualité et respect des délais" },
    { title: "Accessibilité", description: "Solutions inclusives pour tous" }
  ];

  return (
    <section className="relative z-20 py-20 ">
      {/* Effet de grille subtil */}
      <div className="absolute inset-0 bg-[linear-radient(rgba(139,92,246,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête de section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-800 to-pink-700 inline-block tracking-tight ">
            À Propos de BennyDev
          </h2>
        </div>

        {/* Contenu principal */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image avec overlay et photo de profil */}
          <div className="relative">
            {/* Image de fond */}
            <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/Bennydev.webp"
                alt="BennyDev workspace"
                fill
                className="object-cover"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/40 to-transparent" />
            </div>

            {/* Photo de profil et informations */}
            <div className="absolute -bottom-28 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
              {/* Photo de profil ronde */}
              <div className="relative w-24 h-24 rounded-full border-4 border-white shadow-xl overflow-hidden mb-4">
                <Image
                  src="/moi.webp" // Ajoutez votre photo de profil
                  alt="Benjamin Verdès"
                  fill
                  className="object-cover"
                />
              </div>
              
              {/* Informations */}
              <div className="bg-white rounded-xl shadow-lg p-6 text-center w-64">
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  Verdès Benjamin
                </h3>
                <p className="text-purple-600 font-medium text-sm mb-2">
                  Développeur Web Full Stack
                </p>
                <p className="text-gray-600 text-sm">
                  Passionné par le développement web et l&apos;expérience utilisateur
                </p>
              </div>
            </div>
          </div>

          {/* Texte de présentation - ajout de margin-top sur mobile */}
          <div className="space-y-6 mt-16 lg:mt-0">
            <p className="text-gray-700 leading-relaxed">
              En tant que fondateur de BennyDev, je m&apos;engage à offrir des solutions digitales innovantes, tout en cultivant des relations de confiance et de proximité. Depuis peu, je mets mon expertise technique et ma créativité au service de vos objectifs.
            </p>
            
            <div className="border-l-4 border-purple-600 pl-4 my-8">
              <p className="text-gray-900 font-medium italic">
                &quot;Ma mission est d&apos;accompagner mes clients dans la réalisation de leurs projets web, de la conception à la livraison, et au-delà.&quot;
              </p>
            </div>
          </div>
        </div>

        {/* Valeurs */}
        <div className="mt-32">
          <h3 className="text-2xl font-semibold text-gray-900 text-center mb-12 tracking-tight ">
            Mes Valeurs
          </h3>
          
          {/* Nouvelle section mise en avant */}
          <div className="mb-12 bg-gradient-to-r from-purple-900 to-pink-800 rounded-2xl p-8 md:p-12 text-white shadow-xl transform hover:scale-[1.02] transition-transform duration-300">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-start space-x-6">
                {/* Icône */}
                <div className="hidden md:block">
                  <svg className="w-12 h-12 text-purple-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                  </svg>
                </div>
                
                <div className="space-y-4">
                  <h4 className="text-2xl md:text-3xl font-bold text-purple-100 tracking-tight">
                    L&apos;Humain au Cœur de Chaque Projet
                  </h4>
                  <p className="text-purple-100 text-lg leading-relaxed">
                    Au-delà de la technique, je crois profondément en l&apos;importance des relations humaines dans chaque projet. Mon approche personnalisée me permet de vraiment comprendre vos besoins, vos aspirations et vos contraintes. Je ne suis pas qu&apos;un simple prestataire, mais un véritable partenaire qui s&apos;investit dans votre réussite.
                  </p>
                  <div className="pt-4 flex flex-wrap gap-4">
                    <div className="flex items-center space-x-2">
                      <svg className="w-5 h-5 text-purple-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-purple-100">Écoute active</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <svg className="w-5 h-5 text-purple-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-purple-100">Accompagnement personnalisé</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <svg className="w-5 h-5 text-purple-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-purple-100">Communication transparente</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Grille des autres valeurs */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="border border-gray-200 bg-gradient-to-bl from-gray-50 to-white group bg-white p-6 rounded-xl shadow-[0_0_50px_rgba(139,92,246,0.1)] hover:shadow-[0_0_50px_rgba(139,92,246,0.2)] transition-all duration-300"
              >
                <h4 className="text-lg font-semibold text-purple-700 mb-2 tracking-tight">
                  {value.title}
                </h4>
                <p className="text-sm text-gray-600">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Histoire */}
        <div className="mt-20 bg-white rounded-2xl p-8 shadow-[0_0_50px_rgba(139,92,246,0.1)] bg-gradient-to-bl from-gray-100 to-white border border-gray-200">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6 tracking-tight">
            Mon Histoire
          </h3>
          <div className="prose prose-purple max-w-none text-gray-700">
            <p className="mb-4">
              Après avoir exploré plusieurs domaines professionnels, de l&apos;ébénisterie à l&apos;hôtellerie-restauration, j&apos;ai rejoint l&apos;entreprise BEDEV en 2023 où j&apos;ai travaillé sur d&apos;importants projets d&apos;applications web.
            </p>
            <p className="mb-4">
              En 2024, guidé par mon désir d&apos;avoir un contact direct avec les clients, j&apos;ai créé BennyDev, ma propre micro-entreprise de développement web
            </p>
          </div>
        </div>
      </div>
    </section>
  );
} 