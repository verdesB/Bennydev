import { z } from 'zod';

// Schéma de contact commun
const contactSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Email invalide"),
  phone: z.string().optional(),
  preferredContact: z.enum(["email", "phone", "any"]),
  comments: z.string().optional(),
  role: z.string().optional()
});

// Schémas spécifiques pour chaque type de projet
const websiteDetailsSchema = z.object({
  pages: z.array(z.string()).optional(),
  features: z.record(z.boolean()).optional(),
  designPreferences: z.string().optional(),
  contentManagement: z.boolean().optional(),
  responsive: z.boolean().optional()
});

const ecommerceDetailsSchema = z.object({
  numberOfProducts: z.number().optional(),
  paymentMethods: z.array(z.string()).optional(),
  shippingMethods: z.array(z.string()).optional(),
  inventory: z.boolean().optional(),
  features: z.record(z.boolean()).optional()
});

const webappDetailsSchema = z.object({
  userRoles: z.array(z.string()).optional(),
  features: z.record(z.boolean()).optional(),
  authentication: z.boolean().optional(),
  database: z.boolean().optional(),
  apiIntegration: z.boolean().optional()
});

const redesignDetailsSchema = z.object({
  currentWebsite: z.string().url("URL invalide").optional(),
  painPoints: z.array(z.string()).optional(),
  keepFeatures: z.array(z.string()).optional(),
  newFeatures: z.array(z.string()).optional(),
  seoMigration: z.boolean().optional()
});

const seoDetailsSchema = z.object({
  websiteUrl: z.string().url("URL invalide").optional(),
  objectives: z.array(z.string()).optional(),
  competitors: z.array(z.string()).optional(),
  keywords: z.array(z.string()).optional(),
  services: z.record(z.boolean()).optional(),
  analytics: z.boolean().optional()
});

const apiDetailsSchema = z.object({
  apiType: z.enum(["rest", "graphql", "soap"]).optional(),
  endpoints: z.number().optional(),
  authentication: z.boolean().optional(),
  documentation: z.boolean().optional(),
  features: z.record(z.boolean()).optional(),
  integrations: z.array(z.string()).optional()
});

// Schéma principal avec union discriminante
export const projectFormSchema = z.object({
  projectType: z.enum(["website", "ecommerce", "webapp", "redesign", "seo", "api"]),
  company: z.string().min(2, "Le nom de l'entreprise doit contenir au moins 2 caractères"),
  businessSector: z.string().optional(),
  website: z.enum(["yes", "no"]).optional(),
  contact: contactSchema,
  budget: z.number().min(0).optional(),
  deadline: z.string().optional(),
  
  // Détails spécifiques selon le type de projet
  details: z.discriminatedUnion("projectType", [
    z.object({ projectType: z.literal("website"), ...websiteDetailsSchema.shape }),
    z.object({ projectType: z.literal("ecommerce"), ...ecommerceDetailsSchema.shape }),
    z.object({ projectType: z.literal("webapp"), ...webappDetailsSchema.shape }),
    z.object({ projectType: z.literal("redesign"), ...redesignDetailsSchema.shape }),
    z.object({ projectType: z.literal("seo"), ...seoDetailsSchema.shape }),
    z.object({ projectType: z.literal("api"), ...apiDetailsSchema.shape })
  ]).optional(),
  
  // Ajouter tous les champs pour les détails spécifiques
  website_details: z.object(websiteDetailsSchema.shape).optional(),
  ecommerce_details: z.object(ecommerceDetailsSchema.shape).optional(),
  webapp_details: z.object(webappDetailsSchema.shape).optional(),
  redesign_details: z.object(redesignDetailsSchema.shape).optional(),
  seo_details: z.object(seoDetailsSchema.shape).optional(),
  api_details: z.object(apiDetailsSchema.shape).optional(),
  
  // Opt
  step: z.number().optional()
});

export type ProjectFormData = z.infer<typeof projectFormSchema>; 