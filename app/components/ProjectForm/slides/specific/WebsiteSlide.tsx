import { SlideWrapper } from "../SlideWrapper";

interface WebsiteSlideProps {
  formData: any;
  setFormData: (data: any) => void;
  onNext: () => void;
  onPrevious: () => void;
}

export function WebsiteSlide({ formData, setFormData, onNext, onPrevious }: WebsiteSlideProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement;
      setFormData({
        ...formData,
        website: {
          ...formData.website,
          features: {
            ...(formData.website?.features || {}),
            [name]: checkbox.checked
          }
        }
      });
    } else {
      setFormData({
        ...formData,
        website: {
          ...formData.website,
          [name]: value
        }
      });
    }
  };

  const features = [
    { id: 'blog', label: 'Blog' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'testimonials', label: 'Témoignages' },
    { id: 'newsletter', label: 'Newsletter' }
  ];

  return (
    <SlideWrapper
      title="Site Web Vitrine"
      subtitle="Précisons les détails de votre site web vitrine pour vous proposer la meilleure solution"
      onNext={onNext}
      onPrevious={onPrevious}
    >
      <div className="space-y-6">
        <div className="bg-gray-50 p-6 rounded-lg">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nombre de pages approximatif souhaité
          </label>
          <input
            type="number"
            name="pageCount"
            min="1"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500"
            value={formData.website?.pageCount || ''}
            onChange={handleChange}
          />
        </div>

        <div className="bg-gray-50 p-6 rounded-lg">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Fonctionnalités souhaitées
          </label>
          <div className="grid grid-cols-2 gap-4">
            {features.map(feature => (
              <label key={feature.id} className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  name={feature.id}
                  checked={formData.website?.features?.[feature.id] || false}
                  onChange={handleChange}
                  className="rounded border-gray-300 text-violet-600 focus:ring-violet-500"
                />
                <span>{feature.label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
} 