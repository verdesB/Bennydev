import { Quote } from 'lucide-react';
import Image from 'next/image';

export default function Testimonials() {
  const testimonials = [
    {
      name: "Marie Laurent",
      role: "Fondatrice de BeautySpace",
      content: "Benjamin a su transformer notre vision en un site e-commerce performant et élégant. Son expertise technique et sa capacité d&apos;écoute ont fait toute la différence.",
    },
    {
      name: "Thomas Dubois",
      role: "Directeur de RestoPro",
      content: "La refonte de notre site a eu un impact immédiat sur notre visibilité. Le SEO est excellent et le site est ultra rapide. Un vrai professionnel !",
    },
    {
      name: "Sophie Martin",
      role: "Architecte d&apos;intérieur",
      content: "Un accompagnement de qualité du début à la fin. Benjamin a su créer un portfolio qui met parfaitement en valeur mes réalisations.",
    }
  ];

  return (
    <section className="relative z-20 py-20 ">
      {/* Effet de grille */}

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-800 to-pink-700 inline-block">
            Ils ont choisi BennyDev
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Découvrez les retours d&apos;expérience de nos clients satisfaits
          </p>
        </div>

        {/* Grille de témoignages */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="relative bg-white rounded-2xl p-8 shadow-[0_0_50px_rgba(139,92,246,0.1)] hover:shadow-[0_0_50px_rgba(139,92,246,0.2)] transition-all duration-300"
            >
              {/* Icône de citation */}
              <Quote className="w-8 h-8 text-purple-200 absolute top-6 right-6" />

              {/* Contenu du témoignage */}
              <div className="relative">
                <p className="text-gray-600 mb-6 italic">
                  &quot;{testimonial.content}&quot;
                </p>

                {/* Informations client */}
                <div className="flex items-center space-x-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden">
                    <Image
                      src="/moi.webp"
                      alt={testimonial.name}
                      width={48}
                      height={48}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-purple-600">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>

              {/* Élément décoratif */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-b-2xl opacity-20" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 