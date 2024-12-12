import { ProjectType, SlideProps } from "../types";
import { SlideWrapper } from "./SlideWrapper";

interface ServiceOption {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export function ServiceChoiceSlide({ 
  formData, 
  setFormData, 
  onNext, 
  onPrevious,
  isSubmitting
}: SlideProps) {
  const serviceOptions: ServiceOption[] = [
    {
      id: 'website',
      icon: '🌐',
      title: 'Site Web Vitrine',
      description: 'Présentez votre activité avec élégance'
    },
    {
      id: 'ecommerce',
      icon: '🛍️',
      title: 'E-commerce',
      description: 'Vendez vos produits en ligne'
    },
    {
      id: 'webapp',
      icon: '💻',
      title: 'Application Web',
      description: 'Créez une solution sur mesure'
    },
    {
      id: 'redesign',
      icon: '🔄',
      title: 'Refonte de Site',
      description: 'Modernisez votre présence en ligne'
    },
    {
      id: 'seo',
      icon: '📈',
      title: 'SEO',
      description: 'Optimisez votre visibilité'
    },
    {
      id: 'api',
      icon: '🔌',
      title: 'API',
      description: 'Connectez vos services'
    }
  ];

  const handleServiceSelect = (serviceId: string) => {
    setFormData({
      ...formData,
      projectType: serviceId as ProjectType
    });
    onNext();
  };

  return (
    <SlideWrapper
      title="Choisissez un service"
      subtitle="Nous avons une variété de services pour répondre à tous vos besoins"
      onNext={onNext}
      onPrevious={onPrevious}
      isSubmitting={isSubmitting}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {serviceOptions.map(service => (
          <button
            key={service.id}
            onClick={() => handleServiceSelect(service.id)}
            className="flex flex-col items-center p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            <div className="text-4xl mb-4">{service.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
            <p className="text-gray-600 text-center">{service.description}</p>
          </button>
        ))}
      </div>
    </SlideWrapper>
  );
} 