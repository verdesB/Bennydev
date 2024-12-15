export enum ProjectType {
  WEBSITE = 'website',
  ECOMMERCE = 'ecommerce',
  API = 'api',
  SEO = 'seo',
  REDESIGN = 'redesign',
  WEBAPP = 'webapp'
}

export interface SlideProps {
  formData: ProjectFormData;
  setFormData: (data: ProjectFormData | ((prev: ProjectFormData) => ProjectFormData)) => void;
  onNext: () => void;
  onPrevious: () => void;
  onSubmit: () => void;
  isSubmitting: boolean;
  setCsrfToken: (token: string) => void;
}

export interface WebAppData {
  appType: 'internal' | 'customer' | 'collaborative' | 'other';
  appTypeOther?: string;
  userCount: number;
  accessLevel: 'mixed' | 'public' | 'private';
  keyFeatures: Record<string, boolean>;
  integrations: Record<string, boolean>;
  technicalNeeds: Record<string, boolean>;
}

export interface EcommerceData {
  title: string;
  description: string;
  productType: 'physical' | 'digital' | 'services' | 'mixed';
  productCount: number;
  features: Record<string, boolean>;
  paymentMethods: string[];
  hasInventory: boolean;
  shippingRegions: string[];
}

export interface ProjectFormData {
  step: number;
  projectType: ProjectType | null;
  
  // Informations générales
  company: string;
  businessSector: string;
  website: 'yes' | 'no';
  budget?: number;
  deadline?: string;
  captchaToken: string | null;
  
  // Projet Website
  website_details?: {
    title: string;
    description: string;
    features: Record<string, boolean>;
    pages: string[];
    hasDesign: boolean;
    designUrl?: string;
  };

  // Projet E-commerce
  ecommerce_details?: Partial<EcommerceData>;

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
      [key: string]: boolean;
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
  webapp?: Partial<WebAppData>;

  
}
// Ajoutez les autres interfaces selon vos besoins

