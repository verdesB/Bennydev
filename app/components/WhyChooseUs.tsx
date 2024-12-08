import { 
  Gauge, // Pour la performance
  Search, // Pour le SEO
  PiggyBank, // Pour les prix fixes
  HeadphonesIcon, // Pour le support standard
  Shield, // Pour le support premium
  Check // Pour les listes
} from 'lucide-react';

export default function WhyChooseUs() {
  const benefits = [
    {
      title: "Performance Garantie",
      icon: <Gauge className="w-6 h-6 text-purple-600" />,
      description: "Sites web optimisés pour une vitesse de chargement maximale et une expérience utilisateur fluide",
      metrics: ["Score PageSpeed > 90", "Temps de chargement < 3s", "Optimisation des ressources"]
    },
    {
      title: "SEO Optimisé",
      icon: <Search className="w-6 h-6 text-purple-600" />,
      description: "Maximisez votre visibilité en ligne grâce à nos pratiques SEO avancées",
      metrics: ["Structure optimisée", "Balisage sémantique", "Meta-données optimisées"]
    },
    {
      title: "Prix Fixe & Transparent",
      icon: <PiggyBank className="w-6 h-6 text-purple-600" />,
      description: "Aucune surprise : le prix convenu est maintenu même en cas de dépassement de temps",
      metrics: ["Devis détaillé", "Pas de coûts cachés", "Paiement échelonné"]
    },
    {
      title: "Support & Maintenance",
      icon: <Shield className="w-6 h-6 text-purple-600" />,
      description: "Choisissez le niveau de support qui correspond à vos besoins",
      comparison: {
        standard: {
          title: "Support Classique",
          icon: <HeadphonesIcon className="w-5 h-5 text-gray-600" />,
          features: [
            "Support par email",
            "Réponse sous 48h",
            "Maintenance corrective",
          ]
        },
        premium: {
          title: "Support Premium",
          icon: <Shield className="w-5 h-5 text-purple-600" />,
          features: [
            "Support prioritaire 6j/7",
            "Réponse sous 24h",
            "Maintenance préventive",
            "Rapport mensuel",
            "Optimisations continues"
          ]
        }
      }
    }
  ];

  return (
    <section className="relative z-20 py-20 ">

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-800 to-pink-700 inline-block tracking-tight">
            Pourquoi Choisir BennyDev ?
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Une approche centrée sur la qualité, la transparence et votre satisfaction
          </p>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {benefits.map((benefit, index) => (
            <li key={index} className="border border-gray-200 bg-gradient-to-bl from-gray-100 to-white relative bg-white rounded-2xl p-8 shadow-[0_0_50px_rgba(139,92,246,0.2)] hover:shadow-[0_0_50px_rgba(139,92,246,0.2)] transition-all duration-300">
            <article
              
              
            >
              <div className="flex items-center gap-3 mb-4">
                {benefit.icon}
                <h3 className="text-xl font-semibold text-gray-900 tracking-tight">
                  {benefit.title}
                </h3>
              </div>

              <p className="text-gray-600 mb-6">
                {benefit.description}
              </p>
              
              {benefit.comparison ? (
                <div className="grid grid-cols-2 gap-4">
                  {/* Support Classique */}
                  <div className="space-y-3">
                    <h4 className="font-medium text-gray-800">
                      {benefit.comparison.standard.title}
                    </h4>
                    <div className="space-y-2">
                      {benefit.comparison.standard.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center space-x-2 text-sm text-gray-600">
                          <Check className="w-4 h-4 text-gray-400 shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Support Premium */}
                  <div className="space-y-3">
                    <h4 className="font-medium text-purple-700">
                      {benefit.comparison.premium.title}
                    </h4>
                    <div className="space-y-2">
                      {benefit.comparison.premium.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center space-x-2 text-sm text-gray-600">
                          <Check className="w-4 h-4 text-purple-600 shrink-0" />
                          <span className="font-medium">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  {benefit.metrics?.map((metric, idx) => (
                    <div key={idx} className="flex items-center space-x-2 text-sm text-gray-600">
                      <Check className="w-5 h-5 text-purple-600 shrink-0" />
                      <span>{metric}</span>
                    </div>
                  ))}
                </div>
              )}

              
            </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
} 