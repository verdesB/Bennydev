import { createClient } from '@supabase/supabase-js';
import { FormData, ProjectType } from '../components/ProjectForm/types';

export class ProjectSummaryService {
  private supabase;

  constructor() {
    this.supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
  }

  private async createMarkdownFile(projectCode: string, content: string) {
    try {
      console.log('Tentative d\'upload...');
      
      const { data, error } = await this.supabase.storage
        .from('bennydev.projets')
        .upload(`${projectCode}.md`, content, {
          contentType: 'text/markdown; charset=utf-8',
          upsert: true
        });

      if (error) {
        console.log('Erreur détaillée:', error);
        throw error;
      }
      return data;
    } catch (error) {
      console.error('Erreur complète:', error);
      throw error;
    }
  }

  private generateCommonInfo(formData: FormData): string {
    return `
# Projet ${this.getProjectTypeName(formData.projectType)}
Date de création: ${new Date().toLocaleDateString('fr-FR')}

## Informations Client
- Entreprise: ${formData.company || 'Non spécifié'}
- Secteur d'activité: ${formData.businessSector || 'Non spécifié'}
- Site web existant: ${formData.website === 'yes' ? 'Oui' : 'Non'}

## Contact
- Nom: ${formData.contact.name || 'Non spécifié'}
- Email: ${formData.contact.email || 'Non spécifié'}
- Téléphone: ${formData.contact.phone || 'Non spécifié'}
- Méthode de contact préférée: ${formData.contact.preferredContact || 'Non spécifié'}
- Commentaires additionnels: ${formData.contact.comments || 'Non spécifié'}
- Rôle: ${formData.contact.role || 'Non spécifié'}

## Budget et Délais
- Budget envisagé: ${formData.budget ? formData.budget + '€' : 'Non spécifié'}
- Délai souhaité: ${this.formatDeadline(formData.deadline) || 'Non spécifié'}
`;
  }

  private formatDeadline(deadline?: string): string {
    const deadlineMap: { [key: string]: string } = {
      'urgent': 'Urgent (< 1 mois)',
      'normal': 'Normal (1-2 mois)',
      'flexible': 'Flexible (2-3 mois)',
      'notDefined': 'Pas encore défini'
    };
    return deadline ? deadlineMap[deadline] : '';
  }

  private generateWebsiteSummary(formData: FormData): string {
    const details = formData.website_details;
    if (!details) return '';
    
    return `
## Détails du Site Web
- Titre: ${details.title || 'Non spécifié'}
- Description: ${details.description || 'Non spécifié'}
- Nombre de pages: ${details.pages || 'Non spécifié'}
- Design existant: ${details.hasDesign ? 'Oui' : 'Non'}
${details.designUrl ? `- URL du design: ${details.designUrl}` : ''}

### Fonctionnalités souhaitées
${details.features?.map(feature => `- ${feature}`).join('\n') || 'Aucune fonctionnalité spécifiée'}
`;
  }

  private generateEcommerceSummary(formData: FormData): string {
    const details = formData.ecommerce_details;
    if (!details) return '';

    return `
## Détails E-commerce
- Type de produits: ${details.productType || 'Non spécifié'}
- Nombre de produits: ${details.productCount || 'Non spécifié'}

### Fonctionnalités activées
${Object.entries(details.features || {})
  .filter(([, enabled]) => enabled)
  .map(([feature]) => {
    const featureLabels: { [key: string]: string } = {
      stockManagement: 'Gestion des stocks',
      loyaltyProgram: 'Programme de fidélité',
      promoCodes: 'Codes promotionnels',
      multiCurrency: 'Multi-devise',
      multiLanguage: 'Multi-langue'
    };
    return `- ${featureLabels[feature] || feature}`;
  })
  .join('\n') || 'Aucune fonctionnalité spécifiée'}

### Méthodes de paiement
${details.paymentMethods?.map(method => `- ${method}`).join('\n') || 'Non spécifié'}

### Zones de livraison
${details.shippingRegions?.map(region => `- ${region}`).join('\n') || 'Non spécifié'}
`;
  }

  private generateAPISummary(formData: FormData): string {
    const details = formData.api_details;
    if (!details) return '';

    return `
## Détails API
- Type d'API: ${details.apiType || 'Non spécifié'}

### Fonctionnalités requises
${Object.entries(details.features || {})
  .filter(([, enabled]) => enabled)
  .map(([feature]) => {
    const featureLabels: { [key: string]: string } = {
      authentication: 'Authentification',
      rateLimit: 'Limitation de requêtes',
      documentation: 'Documentation automatique',
      monitoring: 'Monitoring',
      versioning: 'Versioning'
    };
    return `- ${featureLabels[feature] || feature}`;
  })
  .join('\n') || 'Aucune fonctionnalité spécifiée'}
`;
  }

  private generateSEOSummary(formData: FormData): string {
    const details = formData.seo_details;
    if (!details) return '';

    return `
## Détails SEO
- URL du site: ${details.websiteUrl || 'Non spécifié'}
- Objectifs: ${details.objectives || 'Non spécifié'}

### Services demandés
${Object.entries(details.services || {})
  .filter(([, enabled]) => enabled)
  .map(([service]) => {
    const serviceLabels: { [key: string]: string } = {
      audit: 'Audit SEO',
      optimization: 'Optimisation technique',
      content: 'Stratégie de contenu',
      local: 'SEO Local',
      monitoring: 'Suivi et reporting'
    };
    return `- ${serviceLabels[service] || service}`;
  })
  .join('\n') || 'Aucun service spécifié'}
`;
  }

  private generateRedesignSummary(formData: FormData): string {
    const details = formData.redesign_details;
    if (!details) return '';

    const getImprovementLabel = (improvement: string): string => {
      const labels: { [key: string]: string } = {
        design: 'Design moderne',
        performance: 'Performance',
        mobile: 'Adaptation mobile',
        seo: 'SEO'
      };
      return labels[improvement] || improvement;
    };

    return `
## Détails Refonte
- Titre: ${details.title || 'Non spécifié'}
- Description: ${details.description || 'Non spécifié'}
- URL actuelle: ${details.currentUrl || 'Non spécifié'}
- Guide de marque disponible: ${details.brandGuidelines ? 'Oui' : 'Non'}

### Améliorations souhaitées
${Object.entries(details.improvements || {})
  .filter(([, enabled]) => enabled)
  .map(([improvement]) => `- ${getImprovementLabel(improvement)}`)
  .join('\n') || 'Aucune amélioration spécifiée'}

### Points d'amélioration
${details.painPoints?.map(point => `- ${point}`).join('\n') || 'Non spécifié'}

### Fonctionnalités désirées
${details.desiredFeatures?.map(feature => `- ${feature}`).join('\n') || 'Non spécifié'}
`;
  }

  private generateWebAppSummary(formData: FormData): string {
    const details = formData.webapp;
    if (!details) return '';

    const getFeatureLabel = (feature: string): string => {
      const labels: { [key: string]: string } = {
        authentication: 'Authentification',
        rightsManagement: 'Gestion de droits',
        notifications: 'Notifications',
        externalApi: 'API externe',
        crm: 'CRM',
        erp: 'ERP',
        externalTools: 'Outils externes',
        realtime: 'Temps réel',
        dataStorage: 'Stockage de données',
        heavyProcessing: 'Traitement lourd',
        mobileFirst: 'Mobile-first'
      };
      return labels[feature] || feature;
    };

    const getAppTypeLabel = (type: string): string => {
      const types: { [key: string]: string } = {
        internal: 'Gestion interne',
        customer: 'Service client',
        collaborative: 'Plateforme collaborative',
        other: 'Autre'
      };
      return types[type] || type;
    };

    const getAccessLevelLabel = (level: string): string => {
      const levels: { [key: string]: string } = {
        public: 'Public',
        private: 'Privé',
        mixed: 'Mixte'
      };
      return levels[level] || level;
    };

    return `
## Détails Application Web
- Type d'application: ${getAppTypeLabel(details.appType)}${details.appTypeOther ? ` (${details.appTypeOther})` : ''}
- Nombre d'utilisateurs estimé: ${details.userCount || 'Non spécifié'}
- Niveau d'accès: ${getAccessLevelLabel(details.accessLevel) || 'Non spécifié'}

### Fonctionnalités clés
${Object.entries(details.keyFeatures || {})
  .filter(([, enabled]) => enabled)
  .map(([feature]) => `- ${getFeatureLabel(feature)}`)
  .join('\n') || 'Aucune fonctionnalité spécifiée'}

### Intégrations nécessaires
${Object.entries(details.integrations || {})
  .filter(([, enabled]) => enabled)
  .map(([integration]) => `- ${getFeatureLabel(integration)}`)
  .join('\n') || 'Aucune intégration spécifiée'}

### Besoins techniques
${Object.entries(details.technicalNeeds || {})
  .filter(([, enabled]) => enabled)
  .map(([need]) => `- ${getFeatureLabel(need)}`)
  .join('\n') || 'Aucun besoin technique spécifié'}
`;
  }

  private getProjectTypeName(type: ProjectType): string {
    const types = {
      [ProjectType.WEBSITE]: 'Site Web',
      [ProjectType.ECOMMERCE]: 'E-commerce',
      [ProjectType.SEO]: 'SEO',
      [ProjectType.API]: 'API',
      [ProjectType.REDESIGN]: 'Refonte de Site',
      [ProjectType.WEBAPP]: 'Application Web'
    };
    return types[type] || type;
  }

  async generateProjectSummary(formData: FormData, projectCode: string): Promise<void> {
    let content = this.generateCommonInfo(formData);

    switch (formData.projectType) {
      case 'website':
        content += this.generateWebsiteSummary(formData);
        break;
      case 'ecommerce':
        content += this.generateEcommerceSummary(formData);
        break;
      case 'seo':
        content += this.generateSEOSummary(formData);
        break;
      case 'api':
        content += this.generateAPISummary(formData);
        break;
      case 'redesign':
        content += this.generateRedesignSummary(formData);
        break;
      case 'webapp':
        content += this.generateWebAppSummary(formData);
        break;
    }

    await this.createMarkdownFile(projectCode, content);
  }
} 