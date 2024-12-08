import { IconCode, IconDeviceLaptop, IconRocket, IconBrain } from './Icons'; // On va créer ces icônes

export default function Services() {
  const services = [
    {
      icon: <IconCode />,
      title: "Développement Web",
      description: "Création de sites et applications web modernes, réactifs et performants avec les dernières technologies.",
    },
    {
      icon: <IconDeviceLaptop />,
      title: "Applications Web",
      description: "Développement d'applications web complexes et évolutives adaptées à vos besoins spécifiques.",
    },
    {
      icon: <IconRocket />,
      title: "Optimisation SEO",
      description: "Amélioration de la visibilité de votre site avec les meilleures pratiques de référencement.",
    },
    {
      icon: <IconBrain />,
      title: "Conseil Technique",
      description: "Accompagnement et conseils pour vos projets digitaux, de la conception à la mise en production.",
    },
  ];

  return (
    <section className="relative z-20 py-20 overflow-hidden">
      

      {/* Effet de grille en arrière-plan */}
     

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête de section */}
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-800 to-pink-700 inline-block tracking-tight ">
            Services & Expertise
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Des solutions sur mesure pour donner vie à vos projets digitaux avec les meilleures technologies du marché.
          </p>
        </div>

        {/* Grille de services */}
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <li key={index}>
            <article
              
              className="border border-gray-200 bg-gradient-to-bl from-gray-100 to-white group relative p-8 bg-white rounded-2xl shadow-[0_0_50px_rgba(139,92,246,0.2)] hover:shadow-[0_0_50px_rgba(139,92,246,0.2)] transition-all duration-300 hover:-translate-y-1 "
            >
              {/* Icône avec cercle de fond */}
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-purple-100 text-purple-600 mb-6 group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>

              {/* Titre et description */}
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {service.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {service.description}
              </p>

              {/* Flèche indicative au survol */}
              <div className="absolute bottom-8 right-8 opacity-0 transform translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                <svg
                  className="w-6 h-6 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </div>
            </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
} 