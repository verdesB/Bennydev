export enum ProjectType {
  WEBSITE = 'website',
  ECOMMERCE = 'ecommerce',
  API = 'api',
  SEO = 'seo',
  REDESIGN = 'redesign'
}

export interface SlideProps {
  formData: FormData;
  setFormData: (data: FormData) => void;
  onNext: () => void;
  onPrevious: () => void;
  onSubmit?: () => void;
}

export interface FormData {
  step: number;
  projectType: ProjectType;
  
  // Informations générales
  company: string;
  businessSector: string;
  website: 'yes' | 'no';
  budget?: number;
  deadline?: string;
  
  // Projet Website
  website_details?: {
    title: string;
    description: string;
    features: string[];
    pages: number;
    hasDesign: boolean;
    designUrl?: string;
  };

  // Projet E-commerce
  ecommerce_details?: {
    title: string;
    description: string;
    productType: 'physical' | 'digital' | 'services' | 'mixed';
    productCount: number;
    features: {
      stockManagement?: boolean;
      loyaltyProgram?: boolean;
      promoCodes?: boolean;
      multiCurrency?: boolean;
      multiLanguage?: boolean;
    };
    paymentMethods: string[];
    hasInventory: boolean;
    shippingRegions: string[];
  };

  // Projet API
  api_details?: {
    title: string;
    description: string;
    apiType: 'rest' | 'graphql' | 'soap' | 'websocket';
    features: {
      authentication?: boolean;
      rateLimit?: boolean;
      documentation?: boolean;
      monitoring?: boolean;
      versioning?: boolean;
    };
    endpoints: string[];
    expectedTraffic: string;
  };

  // Projet SEO
  seo_details?: {
    title: string;
    description: string;
    keywords: string[];
    competitors: string[];
    targetMarket: string;
    currentRanking?: string;
    websiteUrl: string;
    objectives: string;
    services: {
      audit?: boolean;
      optimization?: boolean;
      content?: boolean;
      local?: boolean;
      monitoring?: boolean;
    };
  };

  // Projet Redesign
  redesign_details?: {
    title: string;
    description: string;
    currentUrl: string;
    improvements: {
      design?: boolean;
      performance?: boolean;
      mobile?: boolean;
      seo?: boolean;
    };
    painPoints: string[];
    desiredFeatures: string[];
    brandGuidelines: boolean;
  };

  // Contact
  contact: {
    name: string;
    email: string;
    phone?: string;
    preferredContact: 'email' | 'phone';
    comments?: string;
    role?: string;
    company?: string;
  };

  // Projet WebApp
  webapp?: {
    appType: 'internal' | 'customer' | 'collaborative' | 'other';
    appTypeOther?: string;
    userCount: number;
    accessLevel: 'public' | 'private' | 'mixed';
    keyFeatures: {
      authentication?: boolean;
      rightsManagement?: boolean;
      notifications?: boolean;
      externalApi?: boolean;
    };
    integrations: {
      crm?: boolean;
      erp?: boolean;
      externalTools?: boolean;
    };
    technicalNeeds: {
      realtime?: boolean;
      dataStorage?: boolean;
      heavyProcessing?: boolean;
      mobileFirst?: boolean;
    };
  };
}

// Ajoutez les autres interfaces selon vos besoins