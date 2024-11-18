import { SlideWrapper } from "../SlideWrapper";

interface SEOSlideProps {
  formData: any;
  setFormData: (data: any) => void;
  onNext: () => void;
  onPrevious: () => void;
}

export function SEOSlide({ formData, setFormData, onNext, onPrevious }: SEOSlideProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement;
      setFormData({
        ...formData,
        seo: {
          ...formData.seo,
          services: {
            ...(formData.seo?.services || {}),
            [name]: checkbox.checked
          }
        }
      });
    } else {
      setFormData({
        ...formData,
        seo: {
          ...formData.seo,
          [name]: value
        }
      });
    }
  };

  return (
    <SlideWrapper
      title="Optimisation SEO"
      subtitle="Définissons vos besoins en référencement naturel"
      onNext={onNext}
      onPrevious={onPrevious}
    >
      <div className="space-y-6">
        <div className="bg-gray-50 p-6 rounded-lg">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Type de service souhaité
          </label>
          <div className="grid grid-cols-2 gap-4">
            {[
              { id: 'audit', label: 'Audit SEO' },
              { id: 'optimization', label: 'Optimisation technique' },
              { id: 'content', label: 'Stratégie de contenu' },
              { id: 'local', label: 'SEO Local' },
              { id: 'monitoring', label: 'Suivi et reporting' }
            ].map(service => (
              <label key={service.id} className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  name={service.id}
                  checked={formData.seo?.services?.[service.id] || false}
                  onChange={handleChange}
                  className="rounded border-gray-300 text-violet-600 focus:ring-violet-500"
                />
                <span>{service.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            URL du site à optimiser
          </label>
          <input
            type="url"
            name="websiteUrl"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500"
            value={formData.seo?.websiteUrl || ''}
            onChange={handleChange}
            placeholder="https://www.votresite.com"
          />
        </div>

        <div className="bg-gray-50 p-6 rounded-lg">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Objectifs principaux
          </label>
          <textarea
            name="objectives"
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500"
            value={formData.seo?.objectives || ''}
            onChange={handleChange}
            placeholder="Décrivez vos objectifs en termes de référencement..."
          />
        </div>
      </div>
    </SlideWrapper>
  );
} 