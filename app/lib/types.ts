// Définition des types pour le contexte
export interface CompanyInfo {
  name: string;
  founder: string;
  founded: number;
  location: string;
  contact: {
    email: string;
    discord: boolean;
    supportHours: string;
    responseTime: string;
    emergencyResponse: string;
    linkedin: string;
    github: string;
  };
}

export interface ServicePlan {
  id: string;
  name: string;
  price: string;
}

export interface ServiceFeatureValues {
  [key: string]: string | boolean;
}

export interface ServiceFeature {
  name: string;
  values: ServiceFeatureValues;
}

export interface ServicePricing {
  plans: ServicePlan[];
  features: ServiceFeature[];
}

export interface Service {
  title: string;
  description: string;
  features: string[];
  startingPrice: number;
  pricing: ServicePricing;
}

export interface ProcessStep {
  description: string;
  points: string[];
}

export interface ProcessPhase {
  [key: string]: ProcessStep;
}

export interface Context {
  companyInfo: CompanyInfo;
  expertise: {
    main: string;
    technologies: {
      frontend: {
        primary: string[];
        libraries: string[];
      };
      backend: {
        approaches: string[];
      };
    };
  };
  services: {
    siteVitrine: Service;
    ecommerce: Service;
    webApp: Service;
    refonteSite: Service;
    api: Service;
  };
  processus: {
    Consultation: ProcessPhase;
    Conception: ProcessPhase;
    Développement: ProcessPhase;
    Livraison: ProcessPhase;
  };
  garanties: {
    duree: string;
    inclus: string[];
    support: {
      plateforme: string;
      avantages: string[];
    };
  };
  valeurs: string[];
} 