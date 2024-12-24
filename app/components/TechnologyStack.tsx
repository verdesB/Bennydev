import Image from 'next/image';
import { Technology } from '@/app/data/technologies';

interface TechnologyStackProps {
  technologies: Technology[];
  selectedCategory?: string;
}

export default function TechnologyStack({ technologies, selectedCategory }: TechnologyStackProps) {
  const filteredTechnologies = selectedCategory 
    ? technologies.filter(tech => tech.category === selectedCategory)
    : technologies;

  return (
    <section className="grid gap-8 relative z-20 max-w-6xl mx-auto my-16 px-4 lg:px-0">
      {filteredTechnologies.map((tech) => (
        <article
          key={tech.name}
          className="bg-white rounded-2xl p-6 shadow-[0_0_50px_rgba(139,92,246,0.1)] hover:shadow-[0_0_50px_rgba(139,92,246,0.2)] transition-all duration-300"
        >
          <div className="flex items-start gap-6">
            {/* Icon et Nom */}
            <div className="flex-shrink-0">
              <Image
                src={tech.icon}
                alt={tech.name}
                width={48}
                height={48}
                className="rounded-lg"
              />
            </div>

            {/* Contenu */}
            <div className="flex-grow">
              <div className="flex items-center gap-3 mb-3">
                <h3 className="text-xl font-semibold text-gray-900">
                  {tech.name}
                </h3>
                <span className="px-3 py-1 text-sm font-medium text-purple-600 bg-purple-50 rounded-full">
                  {tech.category}
                </span>
              </div>

              <p className="text-gray-600 mb-4">
                {tech.description}
              </p>

              {/* Pourquoi utiliser cette technologie */}
              <div className="space-y-3">
                <h4 className="font-medium text-gray-900">
                  Pourquoi l&apos;utiliser ?
                </h4>
                <ul className="space-y-2">
                  {tech.whyUseIt.map((reason, index) => (
                    <li 
                      key={index}
                      className="flex items-start gap-2 text-gray-600"
                    >
                      <span className="w-1.5 h-1.5 mt-2 bg-purple-600 rounded-full flex-shrink-0" />
                      <span>{reason}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Lien vers la documentation */}
              <a
                href={tech.documentation}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-4 text-sm text-purple-600 hover:text-purple-700 transition-colors"
              >
                Documentation
                <svg 
                  className="w-4 h-4" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" 
                  />
                </svg>
              </a>
            </div>
          </div>
        </article>
      ))}
    </section>
  );
} 