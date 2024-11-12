import Together from "together-ai";

export const siteConfig = {
  companyInfo: {
    name: "BennyDev",
    founder: "Verdès Benjamin",
    founded: 2024,
    location: "Achères, France",
    contact: {
      email: "contact@bennydev.fr",
      discord: true,
      supportHours: "Lundi au vendredi, 9h-18h",
      responseTime: "4h ouvrées",
      emergencyResponse: "2h pour problèmes critiques",
      linkedin: "www.linkedin.com/in/verdesben",
      github: "https://github.com/BennyDev"
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
          "WooCommerce",
        ]
      }
    }
  },

  services: {
    siteVitrine: {
      title: "Site Vitrine",
      description: "Solutions web personnalisées pour entreprises et professionnels",
      features: [
        "Design sur-mesure responsive",
        "Navigation intuitive",
        "Back-office intuitif",
        "Optimisation SEO",
        "Interface adaptative tous écrans"
      ],
      startingPrice: 999
    },

    ecommerce: {
      title: "E-commerce & Solutions Marchandes",
      description: "Boutiques en ligne personnalisées avec Shopify",
      features: [
        "Interface sur-mesure",
        "Intégration API Shopify",
        "Gestion des produits et paiements",
        "Formation et documentation",
        "Optimisation des performances"
      ],
      startingPrice: 2499
    },

    surMesure: {
      title: "Solutions sur Mesure",
      description: "Développements spécifiques adaptés à vos besoins",
      approach: "Analyse individuelle des projets avec possibilité de collaboration externe"
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
      plateforme: "Discord",
      avantages: [
        "Canal dédié par projet",
        "Réponses rapides",
        "Partage facilité",
        "Historique conservé",
        "Appels vocaux possibles"
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

// Correction de l'initialisation du client Together
if (!process.env.TOGETHER_API_KEY) {
  throw new Error('TOGETHER_API_KEY is not defined');
}

export const togetherClient = new Together({
  apiKey: process.env.TOGETHER_API_KEY
});

export const getSystemMessage = () => ({
  role: 'system',
  content: `Tu es l'assistant virtuel de BennyDev. Utilise les informations suivantes pour répondre aux questions.

INFORMATIONS GÉNÉRALES DE BENNYDEV:
- Fondateur : ${siteConfig.companyInfo.founder}
- Expertise : ${siteConfig.expertise.main}
- Localisation : ${siteConfig.companyInfo.location}
- Contact : ${siteConfig.companyInfo.contact.email}

SERVICES PROPOSÉS :
${JSON.stringify(siteConfig.services, null, 2)}

RÈGLES DE COMMUNICATION:
- Réponds toujours en français de manière claire et directe
- Reste professionnel et chaleureux
- Utilise les informations du siteConfig pour personnaliser tes réponses
- Mets en avant l'expertise et les valeurs de BennyDev
- Propose toujours des solutions adaptées aux besoins spécifiques du client`
});