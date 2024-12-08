export const siteConfig = {
  companyInfo: {
    name: "Bennydev",
    founder: "Verdès Benjamin",
    founded: 2024,
    location: "Achères, France",
    contact: {
      email: "verdesb.devacc@gmail.com",
      discord: true,
      supportHours: "Lundi au vendredi, 9h-18h",
      responseTime: "4h ouvrées",
      emergencyResponse: "2h pour problèmes critiques",
      linkedin: "www.linkedin.com/in/verdesben",
      github: ""
    }
  },

  expertise: {
    main: "Développement Web Full Stack",
    technologies: {
      frontend: {
        primary: ["TypeScript", "React", "Next.js", "Tailwind CSS"],
        libraries: ["Lucide", "Recharts"]
      },
      backend: {
        approaches: [
          "Solutions API REST (Node.js, Express, PostgreSQL)",
          "Serverless avec Next.js",
          "Intégration Strapi",
          "API Shopify",
          "Medusa JS",
        ]
      }
    }
  },

  services: {
    siteVitrine: {
      title: "Site Vitrine",
      description: "Solutions web personnalisées pour entreprises et professionnels",
      features: [
        "Design responsive",
        "Navigation intuitive",
        "Back-office intuitif",
        "Optimisation SEO",
        "Interface adaptative tous écrans"
      ],
      startingPrice: 800,
      pricing: {
        plans: [
          { id: 'essential', name: 'Essentiel', price: 'à partir de 800€' },
          { id: 'business', name: 'Business', price: 'à partir de 1200€' },
          { id: 'premium', name: 'Premium', price: 'à partir de 1800€' }
        ],
        features: [
          {
            name: 'Pages incluses',
            values: {
              essential: 'Jusqu\'à 5 pages',
              business: 'Jusqu\'à 10 pages',
              premium: 'Sur-mesure'
            }
          },
          {
            name: 'Design responsive',
            values: {
              essential: 'Template optimisé',
              business: 'Design personnalisé',
              premium: 'Design sur-mesure'
            }
          },
          {
            name: 'Performance & SEO',
            values: {
              essential: 'SEO basique + score >90',
              business: 'SEO avancé + schema.org',
              premium: 'SEO premium + stratégie'
            }
          },
          {
            name: 'Animations',
            values: {
              essential: 'Standards',
              business: 'Personnalisées',
              premium: 'Sur-mesure + Micro-interactions'
            }
          },
          {
            name: 'Formulaires',
            values: {
              essential: '1 formulaire contact',
              business: '3 formulaires',
              premium: 'Illimités + CRM'
            }
          },
          {
            name: 'Blog',
            values: {
              essential: false,
              business: 'Blog simple',
              premium: 'Blog avancé + Catégories'
            }
          },
          {
            name: 'Multilingue',
            values: {
              essential: false,
              business: '2 langues',
              premium: '3 langues'
            }
          },
          {
            name: 'Analytics & Rapports',
            values: {
              essential: 'Google Analytics',
              business: '+ Events tracking',
              premium: '+ Dashboard personnalisé'
            }
          },
          {
            name: 'Support technique',
            values: {
              essential: 'Email (48h)',
              business: 'Email prioritaire (24h)',
              premium: 'Support dédié (4h)'
            }
          },
          {
            name: 'Maintenance',
            values: {
              essential: 'Trimestrielle',
              business: 'Mensuelle',
              premium: 'Hebdomadaire'
            }
          },
          {
            name: 'Formation admin',
            values: {
              essential: '1h',
              business: '2h',
              premium: '4h'
            }
          },
          {
            name: 'Modifications post-launch',
            values: {
              essential: '1 révision',
              business: '3 révisions',
              premium: 'Illimitées 1er mois'
            }
          }
        ,
        {
          name: 'Hébergement',
          values: {
            essential: 'Offert pendant 1 an',
            business: 'Offert pendant 1 an',
            premium: 'Offert pendant 1 an'
          }
        },
        {
          name: 'Certificat SSL',
          values: {
            essential: true,
            business: true,
            premium: true
          }
        }
        ],
      }
    },

    ecommerce: {
      title: "E-commerce & Solutions Marchandes",
      description: "Boutiques en ligne personnalisées avec Shopify",
      features: [
        "Interface sur-mesure",
        "Intégration API Shopify ou Medusa",
        "Gestion des produits et paiements",
        "Formation et documentation",
        "Optimisation des performances"
      ],
      startingPrice: 2499,
      pricing: {
        plans: [
          { id: 'starter', name: 'Starter', price: 'à partir de 1999€' },
          { id: 'business', name: 'Business', price: 'à partir de 2999€' },
          { id: 'premium', name: 'Premium', price: 'à partir de 4999€' }
        ],
        features: [
          {
            name: 'Produits inclus',
            values: {
              starter: 'Jusqu\'à 50 produits',
              business: 'Jusqu\'à 500 produits',
              premium: 'Illimité'
            }
          },
          {
            name: 'Design responsive',
            values: {
              starter: 'Template optimisé',
              business: 'Design personnalisé',
              premium: 'Design sur-mesure'
            }
          },
          {
            name: 'Performance & SEO',
            values: {
              starter: 'SEO e-commerce basique',
              business: 'SEO avancé + Rich Snippets',
              premium: 'SEO premium + Stratégie'
            }
          },
          {
            name: 'Méthodes de paiement',
            values: {
              starter: '2 méthodes',
              business: '4 méthodes',
              premium: 'Illimité'
            }
          },
          {
            name: 'Gestion des stocks',
            values: {
              starter: 'Basique',
              business: 'Avancée',
              premium: 'Multi-entrepôts'
            }
          },
          {
            name: 'Transporteurs',
            values: {
              starter: '1 transporteur',
              business: '3 transporteurs',
              premium: 'Illimité'
            }
          },
          {
            name: 'Emails transactionnels',
            values: {
              starter: 'Templates standards',
              business: 'Templates personnalisés',
              premium: 'Templates sur-mesure'
            }
          },
          {
            name: 'Analytics & Rapports',
            values: {
              starter: 'Basique',
              business: '+ Rapports avancés',
              premium: '+ Dashboard personnalisé'
            }
          },
          {
            name: 'Support technique',
            values: {
              starter: 'Email (48h)',
              business: 'Email prioritaire (24h)',
              premium: 'Support dédié (4h)'
            }
          },
          {
            name: 'Formation',
            values: {
              starter: '2h',
              business: '4h',
              premium: '8h'
            }
          },
          {
            name: 'Maintenance',
            values: {
              starter: 'Trimestrielle',
              business: 'Mensuelle',
              premium: 'Hebdomadaire'
            }
          },
          {
            name: 'Import produits',
            values: {
              starter: 'Manuel',
              business: 'CSV/Excel',
              premium: 'API + automatisation'
            }
          },
          {
            name: 'Hébergement',
            values: {
              starter: 'Offert pendant 1 an',
              business: 'Offert pendant 1 an',
              premium: 'Offert pendant 1 an'
            }
          },
          {
            name: 'Certificat SSL',
            values: {
              starter: true,
              business: true,
              premium: true
            }
          }
        ]
        
      }
    },

    webApp: {
      title: "Solutions sur Mesure",
      description: "Développements spécifiques adaptés à vos besoins",
      features: [
        "Architecture sur-mesure",
        "Développement d'API personnalisées",
        "Intégration de services tiers",
        "Solutions métier spécifiques",
        "Scalabilité et performance"
      ],
      startingPrice: 4999,
      pricing: {
        plans: [
          { id: 'basic', name: 'Application Simple', price: 'À partir de 4900€' },
          { id: 'advanced', name: 'Application Avancée', price: 'À partir de 9900€' },
          { id: 'enterprise', name: 'Application Entreprise', price: 'Sur mesure' }
        ],
        features: [
          {
            name: 'Type d\'application',
            values: {
              basic: 'CRUD simple, 3-5 fonctionnalités',
              advanced: '5-10 fonctionnalités complexes',
              enterprise: 'Solution métier complète'
            }
          },
          {
            name: 'Authentification',
            values: {
              basic: 'Email + Social Auth',
              advanced: '+ Rôles et permissions',
              enterprise: '+ SSO & Auth personnalisée'
            }
          },
          {
            name: 'Base de données',
            values: {
              basic: 'PostgreSQL simple',
              advanced: '+ Cache + Indexation',
              enterprise: '+ Clustering & Réplication'
            }
          },
          {
            name: 'API',
            values: {
              basic: 'REST API basique',
              advanced: '+ GraphQL',
              enterprise: '+ API Gateway & Microservices'
            }
          },
          {
            name: 'Interface utilisateur',
            values: {
              basic: 'UI Components standards',
              advanced: 'UI Components personnalisés',
              enterprise: 'Design système complet'
            }
          },
          {
            name: 'Temps réel',
            values: {
              basic: 'Notifications simples',
              advanced: '+ WebSocket temps réel',
              enterprise: '+ Synchronisation complète'
            }
          },
          {
            name: 'Intégrations',
            values: {
              basic: '1-2 services externes',
              advanced: '3-5 services externes',
              enterprise: 'Intégrations illimitées'
            }
          },
          {
            name: 'Tests',
            values: {
              basic: 'Tests unitaires',
              advanced: '+ Tests E2E',
              enterprise: '+ Tests de charge & QA'
            }
          },
          {
            name: 'Déploiement',
            values: {
              basic: 'Environnement unique',
              advanced: 'Dev/Staging/Prod',
              enterprise: '+ Infrastructure HA'
            }
          },
          {
            name: 'Monitoring',
            values: {
              basic: 'Logs basiques',
              advanced: '+ APM & Alerting',
              enterprise: '+ Dashboard personnalisé'
            }
          },
          {
            name: 'Support & Maintenance',
            values: {
              basic: '3 mois inclus',
              advanced: '6 mois inclus',
              enterprise: 'SLA personnalisé'
            }
          },
          {
            name: 'Formation',
            values: {
              basic: '4h de formation',
              advanced: '8h + documentation',
              enterprise: 'Formation sur mesure'
            }
          },
          {
            name: 'Documentation',
            values: {
              basic: 'Documentation utilisateur',
              advanced: '+ Documentation technique',
              enterprise: '+ Architecture & API'
            }
          },
        ]
      
      }
    },

    refonteSite: {
      title: "Refonte de Site",
      description: "Modernisation et optimisation de sites web existants",
      features: [
        "Audit complet de l'existant",
        "Modernisation du design",
        "Migration de contenu",
        "Optimisation des performances",
        "Amélioration du SEO"
      ],
      startingPrice: 1499,
      pricing: {
        plans: [
          { id: 'essential', name: 'Refonte Essentielle', price: 'à partir de 1499€' },
          { id: 'premium', name: 'Refonte Premium', price: 'à partir de 2999€' },
          { id: 'enterprise', name: 'Sur-Mesure', price: 'Sur devis' }
        ],
        features: [
          {
            name: 'Audit initial',
            values: {
              essential: 'Audit de base',
              premium: 'Audit approfondi',
              enterprise: 'Audit complet + Benchmark'
            }
          },
          {
            name: 'Design',
            values: {
              essential: 'Design moderne responsive',
              premium: 'Design premium personnalisé',
              enterprise: 'Design sur-mesure illimité'
            }
          },
          {
            name: 'Migration contenu',
            values: {
              essential: 'Migration basique',
              premium: 'Migration + Optimisation',
              enterprise: 'Migration complète + Restructuration'
            }
          },
          {
            name: 'SEO',
            values: {
              essential: 'Optimisation de base',
              premium: 'SEO avancé + Stratégie',
              enterprise: 'SEO premium + Suivi'
            }
          },
          {
            name: 'Performance',
            values: {
              essential: 'Score > 85',
              premium: 'Score > 90 + Optimisations',
              enterprise: 'Score > 95 + CDN'
            }
          },
          {
            name: 'Sécurité',
            values: {
              essential: 'SSL + Sécurité de base',
              premium: 'Protection avancée',
              enterprise: 'Sécurité maximale + Audit'
            }
          },
          {
            name: 'Analytics',
            values: {
              essential: 'Google Analytics',
              premium: '+ Rapports personnalisés',
              enterprise: '+ Dashboard sur mesure'
            }
          },
          {
            name: 'Formation',
            values: {
              essential: '2h incluses',
              premium: '4h + Documentation',
              enterprise: 'Formation complète équipe'
            }
          },
          {
            name: 'Support',
            values: {
              essential: '3 mois',
              premium: '6 mois',
              enterprise: '12 mois'
            }
          },
          {
            name: 'Maintenance',
            values: {
              essential: 'Trimestrielle',
              premium: 'Mensuelle',
              enterprise: 'Hebdomadaire'
            }
          },
          {
            name: 'Révisions',
            values: {
              essential: '2 séries de révisions',
              premium: '4 séries de révisions',
              enterprise: 'Révisions illimitées'
            }
          },
          {
            name: 'Délai',
            values: {
              essential: '4-6 semaines',
              premium: '8-12 semaines',
              enterprise: 'Sur mesure'
            }
          }
        ]
      }
    },
    api: {
      title: "Solutions API",
      description: "Développement d'APIs robustes et scalables",
      features: [
        "Architecture REST/GraphQL",
        "Documentation complète",
        "Sécurité renforcée",
        "Performance optimisée",
        "Support dédié"
      ],
      startingPrice: 3900,
      pricing: {
        plans: [
          { id: 'starter', name: 'API Starter', price: 'à partir de 3900€' },
          { id: 'business', name: 'API Business', price: 'à partir de 7900€' },
          { id: 'enterprise', name: 'API Enterprise', price: 'Sur devis' }
        ],
        features: [
          {
            name: 'Endpoints',
            values: {
              starter: 'Jusqu\'à 10 endpoints',
              business: 'Jusqu\'à 25 endpoints',
              enterprise: 'Illimité'
            }
          },
          {
            name: 'Architecture',
            values: {
              starter: 'REST API basique',
              business: 'REST + GraphQL',
              enterprise: 'Architecture sur mesure'
            }
          },
          {
            name: 'Documentation',
            values: {
              starter: 'Swagger/OpenAPI basique',
              business: 'Documentation interactive',
              enterprise: 'Documentation complète + Exemples'
            }
          },
          {
            name: 'Authentification',
            values: {
              starter: 'JWT + API Keys',
              business: '+ OAuth2',
              enterprise: '+ SSO & Auth personnalisée'
            }
          },
          {
            name: 'Rate Limiting',
            values: {
              starter: 'Limites basiques',
              business: 'Limites personnalisables',
              enterprise: 'Sur mesure + Quotas'
            }
          },
          {
            name: 'Monitoring',
            values: {
              starter: 'Monitoring basique',
              business: '+ Alertes personnalisées',
              enterprise: 'Monitoring avancé + Dashboard'
            }
          },
          {
            name: 'Tests',
            values: {
              starter: 'Tests unitaires',
              business: '+ Tests d\'intégration',
              enterprise: '+ Tests de charge'
            }
          },
          {
            name: 'Versioning',
            values: {
              starter: 'Gestion basique',
              business: 'Gestion avancée',
              enterprise: 'Stratégie sur mesure'
            }
          },
          {
            name: 'Cache',
            values: {
              starter: 'Cache basique',
              business: 'Cache distribué',
              enterprise: 'Cache sur mesure + CDN'
            }
          },
          {
            name: 'Support',
            values: {
              starter: 'Email (48h)',
              business: 'Email + Chat (24h)',
              enterprise: 'Support dédié (4h)'
            }
          },
          {
            name: 'Formation',
            values: {
              starter: '2h incluses',
              business: '4h + Documentation',
              enterprise: 'Formation complète équipe'
            }
          },
          {
            name: 'Maintenance',
            values: {
              starter: '3 mois inclus',
              business: '6 mois inclus',
              enterprise: '12 mois inclus'
            }
          }
        ]
      }
    }
  },

  processus: {
    "Consultation": {
      "Analyse des besoins": {
        description: "Après m'avoir contacté, on se cale un moment sympa pour échanger en visio ou autour d'un café. L'objectif ? Mieux comprendre votre projet et vos ambitions.",
        points: [
          "On définit ensemble vos objectifs",
          "On cerne votre cible idéale",
          "On jette un œil à ce que fait la concurrence",
          "On liste les fonctionnalités qui vous feront gagner"
        ]
      },
      "Définition des objectifs": {
        description: "On pose les bases solides de votre projet avec des objectifs clairs et atteignables. Pas de stress, on avance étape par étape !",
        points: [
          "On fixe des objectifs concrets, pas du blabla",
          "On choisit les bons indicateurs pour mesurer votre succès",
          "On établit un planning réaliste qui vous convient",
          "On parle budget sans tabou et on optimise les ressources"
        ]
      },
      "Étude de faisabilité": {
        description: "On vérifie que tout est techniquement possible et financièrement viable. Mieux vaut prévenir que guérir !",
        points: [
          "On explore les possibilités techniques sans jargon",
          "On anticipe les obstacles potentiels",
          "On fait les comptes, transparence totale",
          "On garde toujours un plan B sous le coude"
        ]
      },
      "Proposition technique": {
        description: "Je vous prépare un plan d'action sur mesure, clair et sans surprise.",
        points: [
          "Des solutions techniques adaptées à votre réalité",
          "Un calendrier qui respecte vos contraintes",
          "Un budget détaillé sans mauvaises surprises",
          "Une façon de travailler qui vous ressemble"
        ]
      }
    },
    "Conception": {
      "Maquettes et wireframes": {
        description: "On crée des maquettes et wireframes pour visualiser l'architecture de votre site web. C'est le moment de définir les éléments principaux et de les organiser de manière intuitive.",
        points: [
          "On définit les éléments principaux",
          "On organise les éléments de manière intuitive",
          "On valide les maquettes avec vous",
          "On ajuste les maquettes en fonction de vos retours"
        ]
      },
      "Architecture technique": {
        description: "On définit l'architecture technique de votre site web. C'est le moment de choisir les technologies appropriées et de les organiser de manière efficace.",
        points: [
          "On choisit les technologies appropriées",
          "On organise les technologies de manière efficace",
          "On valide l'architecture technique avec vous",
          "On ajuste l'architecture en fonction de vos retours"
        ]
      },
      "Design UI/UX": {
        description: "On définit le design de votre site web. C'est le moment de créer une interface intuitive et esthétique. On s'assure que le design est à la fois attractif et fonctionnel.",
        points: [
          "On définit le design",
          "On valide le design avec vous",
          "On ajuste le design en fonction de vos retours",
          "On s'assure que le design est à la fois attractif et fonctionnel"
        ]
      },
      "Validation du design": {
        description: "On fait le tour ensemble de chaque détail du design. C'est le moment de peaufiner jusqu'à ce que ce soit exactement comme vous l'imaginiez !",
        points: [
          "On passe en revue chaque écran ensemble",
          "On ajuste les couleurs, les formes, les animations",
          "On vérifie que tout est cohérent avec votre image",
          "On valide que c'est pratique et agréable à utiliser"
        ]
      },
      "Planning détaillé": {
        description: "On établit notre feuille de route, étape par étape. C'est comme un GPS pour votre projet : on sait exactement où on va !",
        points: [
          "On découpe le projet en petites étapes digestes",
          "On définit des jalons clairs pour suivre l'avancement",
          "On prévoit des moments pour vos retours",
          "On garde de la flexibilité pour s'adapter en cours de route"
        ]
      }
    },
    "Développement": {
      "Développement par sprints": {
        description: "On développe le site web par sprints. C'est le moment de découper le projet en tâches plus petites et de les traiter de manière itérative.",
        points: [
          "On découpe le projet en tâches plus petites",
          "On définit des jalons clairs pour suivre l'avancement",
          "On traite les tâches de manière itérative",
          "On valide les sprints avec vous"
        ]
      },
      "Intégration continue": {
        description: "On intègre les nouvelles fonctionnalités du site web de manière continue. C'est le moment de s'assurer que chaque fonctionnalité est intégrée de manière stable et efficace.",
        points: [
          "On intègre les nouvelles fonctionnalités",
          "On valide les intégrations continues",
          "On ajuste les intégrations continues en fonction de vos retours",
          "On s'assure que les intégrations continues sont stables et efficaces"
        ]
      },
      "Revue de code": {
        description: "On vérifie constamment que tout fonctionne nickel. C'est comme faire un petit contrôle technique régulier pour éviter les mauvaises surprises !",
        points: [
          "On teste chaque nouvelle fonctionnalité à fond",
          "On fait des simulations d'utilisation réelle",
          "On vérifie la compatibilité sur tous les appareils",
          "On s'assure que tout reste stable même sous pression"
        ]
      },
     
      "Optimisation des performances": {
        description: "On fait en sorte que votre application soit rapide comme l'éclair ! Parce qu'un site lent, c'est comme un café froid : ça n'intéresse personne.",
        points: [
          "On traque et élimine les ralentissements",
          "On optimise les images et les ressources",
          "On améliore les temps de chargement",
          "On s'assure que tout reste fluide même avec beaucoup d'utilisateurs"
        ]
      }
    },
    "Livraison": {
      "Tests finaux": {
        description: "On vérifie constamment que tout fonctionne nickel. C'est comme faire un petit contrôle technique régulier pour éviter les mauvaises surprises !",
        points: [
          "On teste chaque nouvelle fonctionnalité à fond",
          "On fait des simulations d'utilisation réelle",
          "On vérifie la compatibilité sur tous les appareils",
          "On s'assure que tout reste stable même sous pression"
        ]
      },
      
      "Déploiement": {
        description: "C'est le grand saut ! On met votre projet en ligne tout en douceur, comme un atterrissage parfait.",
        points: [
          "On prépare l'environnement de production aux petits oignons",
          "On fait une check-list complète avant décollage",
          "On déploie par étapes pour plus de sécurité",
          "On vérifie que tout roule en conditions réelles"
        ]
      },
      "Formation et documentation": {
        description: "Je vous apprends tous les secrets de votre nouvelle application. C'est comme un cours particulier, mais en plus sympa !",
        points: [
          "On fait des sessions de formation sur mesure",
          "On crée des guides d'utilisation super clairs",
          "On prépare une doc technique pour votre équipe",
          "On reste dispo pour répondre à vos questions"
        ]
      },
      "Suivi et maintenance": {
        description: "On s'assure que votre site web fonctionne correctement et que vous pouvez facilement le maintenir. C'est le moment de mettre en place un plan de maintenance régulier.",
        points: [
          "On planifie des moments pour la maintenance",
          "On met en place un plan de maintenance régulier",
          "On s'assure que la maintenance est effectuée de manière régulière",
          "On reste dispo pour répondre à vos questions"
        ]
      }
    }
  },

  garanties: {
    duree: "3 mois après livraison",
    inclus: [
      "Correction des bugs",
      "Optimisation des performances",
      "Mises à jour de sécurité critiques",
      "Sauvegarde régulière des données"
    ],
    support: {
      plateforme: "Sur le CRM BennyDev",
      avantages: [
        "Canal dédié par projet",
        "Réponses rapides",
        "Partage facilité",
        "Historique conservé",
        "Messagerie instantanée",
        "Support 24h/24 7j/7",
        "Support qui vous servira en phase de post-livraison",
        "Création de ticket post livraison"
      ]
    }
  },

  valeurs: [
    "Expertise technique à jour",
    "Créativité et innovation",
    "Proximité et transparence",
    "Engagement qualité",
    "Accessibilité"
  ]
};

