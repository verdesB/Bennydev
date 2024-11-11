export interface Technology {
  name: string;
  icon: string;
  category: 'frontend' | 'backend' | 'cms' | 'deployment' | 'ecommerce';
  description: string;
  whyUseIt: string[];
  documentation: string;
}

// Technologies pour sites vitrines
export const vitrinesTechnologies: Technology[] = [
  {
    name: 'Next.js',
    icon: '/next.webp',
    category: 'frontend',
    description: 'Framework React moderne pour créer des sites vitrines performants et optimisés',
    whyUseIt: [
      'Performances optimales avec le rendu hybride',
      'Optimisation automatique des images',
      'Excellent référencement naturel (SEO)',
      'Expérience de développement optimale'
    ],
    documentation: 'https://nextjs.org/docs'
  },
  {
    name: 'Tailwind CSS',
    icon: '/tailwind.webp',
    category: 'frontend',
    description: 'Framework CSS moderne pour un design sur mesure et responsive',
    whyUseIt: [
      'Design personnalisé et unique pour chaque projet',
      'Développement rapide et maintenance facilitée',
      'Responsive design intégré',
      'Optimisation automatique du CSS en production'
    ],
    documentation: 'https://tailwindcss.com/docs'
  },
  {
    name: 'Strapi',
    icon: '/strapi.webp',
    category: 'cms',
    description: 'CMS headless open-source pour gérer facilement votre contenu',
    whyUseIt: [
      'Interface d\'administration intuitive',
      'API REST et GraphQL automatisée',
      'Gestion simple des médias et du contenu',
      'Personnalisation complète des types de contenu'
    ],
    documentation: 'https://docs.strapi.io'
  },
  {
    name: 'Vercel',
    icon: '/vercel.webp',
    category: 'deployment',
    description: 'Plateforme de déploiement optimisée pour Next.js',
    whyUseIt: [
      'Déploiement automatisé à chaque modification',
      'Excellentes performances globales',
      'CDN mondial pour une vitesse optimale',
      'Certificats SSL automatiques et gratuits'
    ],
    documentation: 'https://vercel.com/docs'
  }
];

// Technologies pour e-commerce
export const ecommerceTechnologies: Technology[] = [
  {
    name: 'Next.js',
    icon: '/next.webp',
    category: 'frontend',
    description: 'Framework React optimisé pour les applications e-commerce performantes',
    whyUseIt: [
      'Performances critiques pour la conversion',
      'Gestion optimale du panier et du checkout',
      'SEO avancé pour les produits',
      'Intégration parfaite avec Shopify'
    ],
    documentation: 'https://nextjs.org/docs'
  },
  {
    name: 'Tailwind CSS',
    icon: '/tailwind.webp',
    category: 'frontend',
    description: 'Framework CSS pour des interfaces e-commerce modernes et réactives',
    whyUseIt: [
      'Design e-commerce personnalisé et professionnel',
      'Composants réutilisables pour le catalogue',
      'Responsive design pour tous les appareils',
      'Animations fluides pour l\'expérience utilisateur'
    ],
    documentation: 'https://tailwindcss.com/docs'
  },
  {
    name: 'Shopify API',
    icon: '/shopify.webp',
    category: 'ecommerce',
    description: 'API robuste pour la gestion complète de votre boutique en ligne',
    whyUseIt: [
      'Gestion complète des produits et commandes',
      'Système de paiement sécurisé intégré',
      'Gestion des stocks en temps réel',
      'Outils marketing et analytics intégrés'
    ],
    documentation: 'https://shopify.dev/api'
  },
  {
    name: 'Vercel',
    icon: '/vercel.webp',
    category: 'deployment',
    description: 'Plateforme de déploiement idéale pour les sites e-commerce Next.js',
    whyUseIt: [
      'Performance optimale pour la conversion',
      'Mise à l\'échelle automatique pendant les pics de trafic',
      'Analytics en temps réel',
      'Intégration continue pour les mises à jour rapides'
    ],
    documentation: 'https://vercel.com/docs'
  }
];

// Technologies pour les applications web
export const webappTechnologies: Technology[] = [
  {
    name: 'Next.js',
    icon: '/next.webp',
    category: 'frontend',
    description: 'Framework React optimisé pour les applications web complexes',
    whyUseIt: [
      'Architecture robuste pour les applications complexes',
      'Excellent pour les applications avec authentification',
      'Support TypeScript natif pour un code plus fiable',
      'Rendu hybride pour une expérience utilisateur optimale'
    ],
    documentation: 'https://nextjs.org/docs'
  },
  {
    name: 'Tailwind CSS',
    icon: '/tailwind.webp',
    category: 'frontend',
    description: 'Framework CSS pour des interfaces utilisateur professionnelles',
    whyUseIt: [
      'Système de design cohérent et maintenable',
      'Composants réutilisables et personnalisables',
      'Excellent pour les interfaces complexes',
      'Performance optimale en production'
    ],
    documentation: 'https://tailwindcss.com/docs'
  },
  {
    name: 'Supabase',
    icon: '/supabase.webp',
    category: 'backend',
    description: 'Plateforme backend complète avec base de données PostgreSQL',
    whyUseIt: [
      'Base de données PostgreSQL puissante et scalable',
      'Authentification et autorisations intégrées',
      'API REST et temps réel automatisée',
      'Stockage de fichiers et fonctions serverless'
    ],
    documentation: 'https://supabase.com/docs'
  },
  {
    name: 'Vercel',
    icon: '/vercel.webp',
    category: 'deployment',
    description: 'Plateforme de déploiement et d\'hébergement pour applications web modernes',
    whyUseIt: [
      'Déploiement automatisé et rollback facile',
      'Excellentes performances globales',
      'CDN mondial pour une vitesse optimale',
      'Certificats SSL automatiques et gratuits'
    ],
    documentation: 'https://vercel.com/docs'
  }
]; 