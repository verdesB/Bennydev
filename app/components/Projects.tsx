'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { filters, projects, ProjectType, Technology } from '../projets/projets.data';




const Projets: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'tous' | ProjectType>('tous');



  

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
           <figure className="relative overflow-hidden">
             <Image 
               src={project.image} 
               alt={project.title}
               width={800}
               height={600}
               className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-500"
             />
             <figcaption className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
               <div className="absolute bottom-4 left-4 right-4">
                 <Link 
                   title={project.title}
                   href={`/projets/${project.title.toLowerCase().replace(/\s+/g, '-')}`}
                   className="inline-block px-6 py-2 bg-white text-gray-900 rounded-full hover:bg-purple-600 hover:text-white transition-colors duration-300"
                 >
                   Découvrir le projet
                 </Link>
               </div>
             </figcaption>
           </figure>
           
           <div className="p-6">
             <div className="flex justify-between items-start mb-3">
               <h3 className="text-xl font-bold text-gray-900">{project.title}</h3>
               <span className="text-sm text-gray-500">{project.year}</span>
             </div>
             <p className="text-gray-600 mb-4 line-clamp-2">{project.description}</p>
             <ul className="flex flex-wrap gap-2">
               {project.technologies.map((tech, index) => (
                 <li 
                   key={index}
                   className={`px-3 py-1 rounded-full text-sm ${tech.color}`}
                 >
                   {tech.name}
                 </li>
               ))}
             </ul>
           </div>
         </article>
         
          ))}
        </div>
      </section>
   
  );
};

export default Projets; 