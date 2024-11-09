'use client'
import React, { useState } from 'react';


// Définition des types
type ProjectType = 'ecommerce' | 'vitrine' | 'application' | 'mobile';

interface Technology {
  name: string;
  color: string;
}

interface Project {
  id: number;
  title: string;
  type: ProjectType;
  image: string;
  description: string;
  technologies: Technology[];
  link: string;
  year: number;
}

interface FilterOption {
  id: ProjectType | 'tous';
  label: string;
}

const Projets: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'tous' | ProjectType>('tous');

  const technologies: { [key: string]: Technology } = {
    react: { name: 'React', color: 'bg-blue-100 text-blue-600' },
    node: { name: 'Node.js', color: 'bg-green-100 text-green-600' },
    typescript: { name: 'TypeScript', color: 'bg-indigo-100 text-indigo-600' },
    mongodb: { name: 'MongoDB', color: 'bg-emerald-100 text-emerald-600' },
    firebase: { name: 'Firebase', color: 'bg-yellow-100 text-yellow-600' },
  };

  const projects: Project[] = [
    {
      id: 1,
      title: "Marketplace Artisanale",
      type: "ecommerce",
      image: "/bennydev.webp",
      description: "Plateforme de vente pour artisans locaux avec système de paiement intégré",
      technologies: [technologies.react, technologies.node, technologies.mongodb],
      link: "#",
      year: 2024
    },
    {
      id: 2,
      title: "Portfolio Photographe",
      type: "vitrine",
      image: "/bennydev.webp",
      description: "Site vitrine moderne avec galerie photos interactive",
      technologies: [technologies.react, technologies.typescript],
      link: "#",
      year: 2024
    },
    {
      id: 3,
      title: "Application de Gestion",
      type: "application",
      image: "/bennydev.webp",
      description: "Dashboard complet pour la gestion d'entreprise",
      technologies: [technologies.react, technologies.typescript, technologies.firebase],
      link: "#",
      year: 2023
    }
  ];

  const filters: FilterOption[] = [
    { id: 'tous', label: 'Tous les projets' },
    { id: 'ecommerce', label: 'E-commerce' },
    { id: 'vitrine', label: 'Site Vitrine' },
    { id: 'application', label: 'Application Web' },
    { id: 'mobile', label: 'Application Mobile' }
  ];

  const filteredProjects = activeFilter === 'tous' 
    ? projects 
    : projects.filter(project => project.type === activeFilter);

  return (
  

      <section className="relative z-20 max-w-7xl mx-auto px-4 py-16">
        {/* Filtres */}
        <div className="flex flex-wrap gap-4 justify-center mb-16">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`
                px-6 py-3 rounded-full transition-all duration-300
                font-medium text-sm
                ${activeFilter === filter.id
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-200'
                  : 'bg-white text-purple-600 border border-purple-600 hover:bg-purple-50'
                }
              `}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Grille de projets */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <article 
              key={project.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500"
            >
              <div className="relative overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4">
                    <a 
                      href={project.link}
                      className="inline-block px-6 py-2 bg-white text-gray-900 rounded-full hover:bg-purple-600 hover:text-white transition-colors duration-300"
                    >
                      Découvrir le projet
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-gray-900">{project.title}</h3>
                  <span className="text-sm text-gray-500">{project.year}</span>
                </div>
                <p className="text-gray-600 mb-4 line-clamp-2">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, index) => (
                    <span 
                      key={index}
                      className={`px-3 py-1 rounded-full text-sm ${tech.color}`}
                    >
                      {tech.name}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
   
  );
};

export default Projets; 