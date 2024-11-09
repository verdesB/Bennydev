import Together from "together-ai";

export const siteConfig = {
  companyInfo: {
    name: "BennyDev",
    founder: "Verdès Benjamin",
    founded: 2024,
    location: "Montpellier, France",
    contact: {
      email: "contact@bennydev.fr",
      discord: true,
      supportHours: "Lundi au vendredi, 9h-18h",
      responseTime: "4h ouvrées",
      emergencyResponse: "2h pour problèmes critiques"
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
          "API Shopify"
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
    phases: [
      {
        name: "Consultation",
        steps: ["Analyse des besoins", "Définition des objectifs", "Étude de faisabilité", "Proposition technique"]
      },
      {
        name: "Conception",
        steps: ["Maquettes et wireframes", "Validation du design", "Architecture technique", "Planning détaillé"]
      },
      {
        name: "Développement",
        steps: ["Développement par sprints", "Tests réguliers", "Revue de code", "Optimisation des performances"]
      },
      {
        name: "Livraison",
        steps: ["Tests finaux", "Déploiement", "Formation", "Documentation"]
      }
    ]
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