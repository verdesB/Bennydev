export interface Project {
  id: string;
  name: string;
  description: string;
  type: string;
  status: string;
  startDate: string;
  endDate: string;
  budget: number;
  figma_link: string;
  pre_prod_url: string;
  users: {
    role: string;
    displayName: string;
    user_id: string;
  }[];
}

export interface ChatMessage {
  id: number;
  sender_id: string;
  message: string;
  created_at: string;
  profiles: {
    id: string;
    first_name?: string | null;
    last_name?: string | null;
  };
}

export interface ProjectImage {
  id: number;
  url: string;
  caption: string;
  location: string;
  order: number;
} 

export interface ProjectStatus {
    value: string;
    label: string;
    color: string;
  }

  export interface User {
    id: string;
    first_name: string;
    last_name: string;
    // Ajoutez d'autres propriétés selon vos besoins
  }