// Définition des types
export type ProjectType = 'ecommerce' | 'vitrine' | 'application' | 'SEO' | 'personnel';
export const technologies: { [key: string]: Technology } = {
    react: { name: 'React', color: 'bg-blue-100 text-blue-600' },
    node: { name: 'Node.js', color: 'bg-green-100 text-green-600' },
    typescript: { name: 'TypeScript', color: 'bg-indigo-100 text-indigo-600' },
    graphql: { name: 'GraphQL', color: 'bg-emerald-100 text-emerald-600' },
    firebase: { name: 'Firebase', color: 'bg-yellow-100 text-yellow-600' },
    next: { name: 'Next.js', color: 'bg-purple-100 text-purple-600' },
    tailwind: { name: 'Tailwind CSS', color: 'bg-pink-100 text-pink-600' },
    supabase: { name: 'Supabase', color: 'bg-orange-100 text-orange-600' },
    strapi: { name: 'Strapi', color: 'bg-teal-100 text-teal-600' },
    docker: { name: 'Docker', color: 'bg-cyan-100 text-cyan-600' },
    kubernetes: { name: 'Kubernetes', color: 'bg-blue-100 text-blue-600' },
    mongodb: { name: 'MongoDB', color: 'bg-emerald-100 text-emerald-600' },
    mysql: { name: 'MySQL', color: 'bg-yellow-100 text-yellow-600' },
    postgresql: { name: 'PostgreSQL', color: 'bg-indigo-100 text-indigo-600' },
    redis: { name: 'Redis', color: 'bg-pink-100 text-pink-600' },
    elasticsearch: { name: 'Elasticsearch', color: 'bg-orange-100 text-orange-600' },
    kibana: { name: 'Kibana', color: 'bg-teal-100 text-teal-600' },
    grafana: { name: 'Grafana', color: 'bg-cyan-100 text-cyan-600' },
    nest: { name: 'Nest.js', color: 'bg-purple-100 text-purple-600' },
    express: { name: 'Express', color: 'bg-green-100 text-green-600' },
    sequelize: { name: 'Sequelize', color: 'bg-indigo-100 text-indigo-600' },
    prisma: { name: 'Prisma', color: 'bg-pink-100 text-pink-600' },
    knex: { name: 'Knex', color: 'bg-orange-100 text-orange-600' },
    threejs: { name: 'Three.js', color: 'bg-teal-100 text-teal-600' },

  };
export interface Technology {
  name: string;
  color: string;
}
export interface Project {
    id: number;
    title: string;
    type: ProjectType;
    image: string;
    description: string;
    technologies: Technology[];
    link: string;
    year: number;
    gallery: {
      image: string;
      caption: string;
    }[];
    keyPoints: string[];
    demoVideos: {
      title: string;
      url: string;
    }[];
    liveUrl?: string;
    githubUrl?: string;
  }
  
  interface FilterOption {
    id: ProjectType | 'tous';
    label: string;
  }

export const projects: Project[] = [
    {
      id: 1,
      title: "Webtune",
      type: "personnel",
      image: "https://iskqpfzwkuwtheuclxjq.supabase.co/storage/v1/object/sign/bennydev/homepage2.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJiZW5ueWRldi9ob21lcGFnZTIucG5nIiwiaWF0IjoxNzM0NTU2NTQ5LCJleHAiOjE4OTIyMzY1NDl9.fExb2DwN_bQFc8cATeq_UK2vfJW-nNP4PZSvxHHArvs&t=2024-12-18T21%3A19%3A30.442Z",
      description: "Application de gestion de contenu sociale (Facebook, Instagram, linkedin...). Cette application est en développement avec une entreprise belge, le projet est toujours en cours de développement mais à été mis en standBy pour le moment.",
      technologies: [technologies.react, technologies.nest, technologies.graphql],
      link: "/webtune",
      year: 2023,
      gallery: [
        {
          image: '/webtune-1.webp',
          caption: 'Dashboard analytics'
        },
        {
          image: '/webtune-2.webp',
          caption: 'Calendrier éditorial'
        },
        {
          image: '/webtune-3.webp',
          caption: 'Gestion des publications'
        },
        {
          image: '/webtune-4.webp',
          caption: 'Gestion des publications'
        }
      ],
      keyPoints: [
        'Gestion des publications',
        'Dashboard analytics',
        'Calendrier éditorial',
        'Gestion des utilisateurs',
        'Intégration de l\'API Facebook',
        'Intégration de l\'API Instagram',
        'Intégration de l\'API LinkedIn'
      ],
      demoVideos: [
        {
          title: 'Démonstration 1',
          url: 'https://iskqpfzwkuwtheuclxjq.supabase.co/storage/v1/object/sign/bennydev/post.webm?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJiZW5ueWRldi9wb3N0LndlYm0iLCJpYXQiOjE3MzQ3ODk0MjgsImV4cCI6MTc2NjMyNTQyOH0.GG0QruPYCBzl5Qqi5x2UqNjXVY-zQAIHMLMo2M4skK0&t=2024-12-21T14%3A00%3A55.699Z'
        }
      ]
    },
    {
      id: 2,
      title: "Monokrom",
      type: "personnel",
      image: "https://iskqpfzwkuwtheuclxjq.supabase.co/storage/v1/object/sign/bennydev/showroomRTF.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJiZW5ueWRldi9zaG93cm9vbVJURi5wbmciLCJpYXQiOjE3MzQ1NjA5NzksImV4cCI6MTg5MjI0MDk3OX0.Q7b_TGUfmGrJonH9c8Qi1LBeOrUQz9lcNODtataJSKM&t=2024-12-18T22%3A33%3A20.751Z",
      description: "Site de création/visite de galeries d'art 3D, une version bêta à été développée afin de tester la 3D sur le web, le projet prendra une nouvelle tourne dans le futur.",
      technologies: [technologies.next, technologies.tailwind, technologies.threejs],
      link: "/monokrom",
      year: 2024,
      gallery: [
        {
          image: '/monokrom-1.webp',
          caption: 'Vue 1ère personne dans la galerie 3D'
        },
        {
          image: '/monokrom-2.webp',
          caption: 'Exposition virtuelle'
        },
        
      ],
      keyPoints: [
        'Création de galeries 3D',
   
        'Navigation 3D',
        'Détail œuvre',
        'Vue d\'ensemble'
      ],
      demoVideos: [
        {
          title: 'Démonstration 1',
          url: 'https://iskqpfzwkuwtheuclxjq.supabase.co/storage/v1/object/sign/bennydev/threejs.mp4?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJiZW5ueWRldi90aHJlZWpzLm1wNCIsImlhdCI6MTczNDc5MDYyOCwiZXhwIjoxNzY2MzI2NjI4fQ.DHu2VIHDNwcMGo2zGukNaIp9tMB8HO1Fq42BhAxKGrE&t=2024-12-21T14%3A20%3A55.745Z'
        }
      ],
      liveUrl: 'https://showroom-rtf.vercel.app/',
    },
    
  ];

  export const filters: FilterOption[] = [
    { id: 'tous', label: 'Tous les projets' },
    { id: 'ecommerce', label: 'E-commerce' },
    { id: 'vitrine', label: 'Site Vitrine' },
    { id: 'application', label: 'Application Web' },
    { id: 'SEO', label: 'SEO' },
    { id: 'personnel', label: 'Projets Personnels' }
  ];