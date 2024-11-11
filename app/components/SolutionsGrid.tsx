import Link from 'next/link';
import {
  Globe,
  ShoppingCart,
  LayoutDashboard,

  Rocket,
  Code,
  RefreshCcw
} from 'lucide-react';

const solutions = [
  {
    icon: <Globe className="w-8 h-8" />,
    title: "Sites Vitrines",
    description: "Présentez votre entreprise avec élégance et professionnalisme",
    link: "/solutions/sites-vitrines",
    features: ["Design personnalisé", "Responsive", "SEO optimisé"]
  },
  {
    icon: <ShoppingCart className="w-8 h-8" />,
    title: "E-commerce",
    description: "Vendez vos produits en ligne avec une solution complète",
    link: "/solutions/e-commerce",
    features: ["Gestion des stocks", "Paiement sécurisé", "Interface admin"]
  },
  {
    icon: <LayoutDashboard className="w-8 h-8" />,
    title: "Applications Web",
    description: "Des applications web sur mesure pour votre activité",
    link: "/solutions/applications-web",
    features: ["Sur mesure", "Évolutif", "Maintenance incluse"]
  },
  {
    icon: <RefreshCcw className="w-8 h-8" />,
    title: "Refonte de site",
    description: "Renouvelez votre site web pour une meilleure expérience d&apos;utilisateur",
    link: "/solutions/refonte-site",
    features: ["Design moderne", "Responsive", "Optimisé pour les performances"]
  },
  {
    icon: <Rocket className="w-8 h-8" />,
    title: "Solutions SEO",
    description: "Optimisez votre visibilité en ligne",
    link: "/solutions/seo",
    features: ["Audit complet", "Optimisation", "Suivi régulier"]
  },
  {
    icon: <Code className="w-8 h-8" />,
    title: "Solutions API",
    description: "Connectez vos systèmes avec des API robustes",
    link: "/solutions/api",
    features: ["REST/GraphQL", "Documentation", "Sécurité"]
  }
];

export default function SolutionsGrid() {
  const getBadges = (title: string) => {
    const badgeConfig = {
      "Sites Vitrines": {
        availability: "Disponible",
        complexity: "Simple",
        duration: "2-3 semaines"
      },
      "E-commerce": {
        availability: "Disponible",
        complexity: "Complexe",
        duration: "2-3 mois"
      },
      "Applications Web": {
        availability: "Indisponible",
        complexity: "Modéré",
        duration: "1-2 mois"
      },
      "Refonte de site": {
        availability: "Disponible",
        complexity: "Simple",
        duration: "3-4 semaines"
      },
      "Solutions SEO": {
        availability: "Disponible",
        complexity: "Simple",
        duration: "1-2 semaines"
      },
      "Solutions API": {
        availability: "Indisponible",
        complexity: "Complexe",
        duration: "1-2 mois"
      }
    };

    const getBadgeColor = (complexity: string) => {
      switch (complexity.toLowerCase()) {
        case 'simple': return 'bg-green-100 text-green-800';
        case 'modéré': return 'bg-yellow-100 text-yellow-800';
        case 'complexe': return 'bg-red-100 text-red-800';
        default: return 'bg-gray-100 text-gray-800';
      }
    };

    const config = badgeConfig[title as keyof typeof badgeConfig];

    return (
      <div className="flex flex-wrap gap-2 mb-4">
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${config.availability === "Indisponible" ? 'bg-red-100 text-red-800' : 'bg-purple-100 text-purple-800'}`}>
          {config.availability}
        </span>
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getBadgeColor(config.complexity)}`}>
          {config.complexity}
        </span>
        <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
          {config.duration}
        </span>
      </div>
    );
  };

  return (
    <section className="py-20 relative z-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {solutions.map((solution, index) => (
            <li key={index} className="group bg-white p-8 rounded-2xl shadow-[0_0_50px_rgba(139,92,246,0.1)] hover:shadow-[0_0_50px_rgba(139,92,246,0.2)] transition-all duration-300 hover:-translate-y-1"
            >
              <article>
                <Link
                  title={solution.title}
                  href={solution.link}

                >
                  <div className="flex flex-col h-full">
                    {/* Ajout des badges ici */}
                    {getBadges(solution.title)}

                    <div className="text-purple-600 mb-4 group-hover:scale-110 transition-transform duration-300">
                      {solution.icon}
                    </div>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {solution.title}
                    </h3>

                    <p className="text-gray-600 mb-6">
                      {solution.description}
                    </p>

                    <ul className="mt-auto space-y-2">
                      {solution.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-sm text-gray-500">
                          <span className="w-1.5 h-1.5 bg-purple-600 rounded-full mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-6 flex items-center text-purple-600 group-hover:translate-x-2 transition-transform duration-300">
                      <span className="text-sm font-medium">En savoir plus</span>
                      <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
} 