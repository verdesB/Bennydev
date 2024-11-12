export const pricingData = {
  plans: [
    { id: 'starter', name: 'API Starter', price: '3900€' },
    { id: 'business', name: 'API Business', price: '7900€' },
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
}; 