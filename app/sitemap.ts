// app/sitemap.ts
import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const lastMod = '2024-12-07T15:26:19+00:00'
  
  return [
    {
      url: 'https://www.bennydev.fr/',
      lastModified: lastMod,
      priority: 1.00,
    },
    {
      url: 'https://www.bennydev.fr/processus',
      lastModified: lastMod,
      priority: 0.80,
    },
    {
      url: 'https://www.bennydev.fr/projets',
      lastModified: lastMod,
      priority: 0.80,
    },
    {
      url: 'https://www.bennydev.fr/solutions',
      lastModified: lastMod,
      priority: 0.80,
    },
    {
      url: 'https://www.bennydev.fr/contact',
      lastModified: lastMod,
      priority: 0.80,
    },
    {
      url: 'https://www.bennydev.fr/demarrer-un-projet',
      lastModified: lastMod,
      priority: 0.80,
    },
    {
      url: 'https://www.bennydev.fr/login',
      lastModified: lastMod,
      priority: 0.80,
    },
    {
      url: 'https://www.bennydev.fr/solutions/sites-vitrines',
      lastModified: lastMod,
      priority: 0.64,
    },
    {
      url: 'https://www.bennydev.fr/solutions/e-commerce',
      lastModified: lastMod,
      priority: 0.64,
    },
    {
      url: 'https://www.bennydev.fr/solutions/applications-web',
      lastModified: lastMod,
      priority: 0.64,
    },
    {
      url: 'https://www.bennydev.fr/solutions/refonte-site',
      lastModified: lastMod,
      priority: 0.64,
    },
    {
      url: 'https://www.bennydev.fr/solutions/seo',
      lastModified: lastMod,
      priority: 0.64,
    },
    {
      url: 'https://www.bennydev.fr/solutions/api',
      lastModified: lastMod,
      priority: 0.64,
    },
  ]
}