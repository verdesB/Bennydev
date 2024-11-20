import { SlideWrapper } from "../SlideWrapper";

interface WebsiteSlideProps {
  formData: any;
  setFormData: (data: any) => void;
  onNext: () => void;
  onPrevious: () => void;
}

export function WebsiteSlide({ formData, setFormData, onNext, onPrevious }: WebsiteSlideProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement;
      setFormData({
        ...formData,
        website_details: {
          ...formData.website_details,
          features: {
            ...formData.website_details?.features || [],
            [name]: checkbox.checked
          }
        }
      });
    } else {
      setFormData({
        ...formData,
        website_details: {
          ...formData.website_details,
          [name]: value
        }
      });
    }
  };

  const handleFeatureChange = (featureId: string, checked: boolean) => {
    const currentFeatures = formData.website_details?.features || [];
    const newFeatures = checked 
      ? [...currentFeatures, featureId]
      : currentFeatures.filter(f => f !== featureId);
    
    setFormData({
      ...formData,
      website_details: {
        ...formData.website_details,
        features: newFeatures
      }
    });
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
            Titre du projet
          </label>
          <input
            type="text"
            name="title"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500"
            value={formData.website_details?.title || ''}
            onChange={handleChange}
          />
        </div>

        <div className="bg-gray-50 p-6 rounded-lg">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description du projet
          </label>
          <textarea
            name="description"
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500"
            value={formData.website_details?.description || ''}
            onChange={handleChange}
          />
        </div>

        <div className="bg-gray-50 p-6 rounded-lg">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nombre de pages approximatif
          </label>
          <input
            type="number"
            name="pages"
            min="1"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500"
            value={formData.website_details?.pages || ''}
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
                  checked={formData.website_details?.features?.includes(feature.id) || false}
                  onChange={(e) => {
                    handleFeatureChange(feature.id, e.target.checked);
                  }}
                  className="rounded border-gray-300 text-violet-600 focus:ring-violet-500"
                />
                <span>{feature.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Avez-vous déjà un design ?
          </label>
          <div className="flex items-center space-x-4">
            <input
              type="checkbox"
              name="hasDesign"
              checked={formData.website_details?.hasDesign || false}
              onChange={handleChange}
              className="rounded border-gray-300 text-violet-600 focus:ring-violet-500"
            />
            <span>Oui, j'ai déjà un design</span>
          </div>
          {formData.website_details?.hasDesign && (
            <input
              type="url"
              name="designUrl"
              placeholder="URL du design (Figma, Adobe XD, etc.)"
              className="mt-4 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500"
              value={formData.website_details?.designUrl || ''}
              onChange={handleChange}
            />
          )}
        </div>
      </div>
    </SlideWrapper>
  );
} 