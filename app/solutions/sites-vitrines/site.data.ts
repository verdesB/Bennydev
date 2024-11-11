export const pricingData = {
    plans: [
      { id: 'essential', name: 'Essentiel', price: '800€' },
      { id: 'business', name: 'Business', price: '1200€' },
      { id: 'premium', name: 'Premium', price: '1800€' }
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
    ]
  };