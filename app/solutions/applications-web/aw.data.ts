export const pricingData = {
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
      }
    ],
    disclaimer: `Chaque application web est unique et nécessite une évaluation précise de vos besoins. 
    Les prix indiqués sont des estimations de base et peuvent varier en fonction de :
    • La complexité des fonctionnalités requises
    • Le niveau de personnalisation souhaité
    • Les contraintes techniques spécifiques
    • Le volume de données à gérer
    • Les intégrations nécessaires
    
    Contactez-nous pour une évaluation précise de votre projet.`
  };