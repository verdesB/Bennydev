export enum ProjectType {
  WEBSITE = 'website',
  ECOMMERCE = 'ecommerce',
  API = 'api',
  SEO = 'seo',
  REDESIGN = 'redesign'
}

export interface SlideProps {
  formData: any;
  setFormData: (data: any) => void;
  onNext: () => void;
  onPrevious: () => void;
  onSubmit?: () => void;
}

export interface FormData {
  step: number;
  projectType: ProjectType;
  website?: {
    title: string;
    description: string;
    features: string[];
  };
  ecommerce?: {
    title: string;
    description: string;
    products: number;
    features: string[];
  };
  api?: {
    title: string;
    description: string;
    endpoints: string[];
  };
  seo?: {
    title: string;
    description: string;
    keywords: string[];
  };
  redesign?: {
    title: string;
    description: string;
    currentUrl?: string;
  };
  contact?: {
    name: string;
    email: string;
    phone?: string;
  };
  // ... autres champs
}

// Ajoutez les autres interfaces selon vos besoins