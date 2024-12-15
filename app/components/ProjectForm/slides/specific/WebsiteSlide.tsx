import { SlideProps } from '../../types';
import { SlideWrapper } from "../SlideWrapper";

export function WebsiteSlide({ 
  formData, 
  setFormData, 
  onNext, 
  onPrevious,
  isSubmitting 
}: SlideProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    const currentWebsiteDetails = formData.website_details || {
      title: '',
      description: '',
      features: {},
      pages: [],
      hasDesign: false,
      designUrl: ''
    };

    if (name === 'hasDesign') {
      const checkbox = e.target as HTMLInputElement;
      setFormData({
        ...formData,
        website_details: {
          ...currentWebsiteDetails,
          hasDesign: checkbox.checked
        }
      });
    } else if (name === 'pages') {
      const pagesArray = value.split(',').map(page => page.trim()).filter(page => page !== '');
      setFormData({
        ...formData,
        website_details: {
          ...currentWebsiteDetails,
          pages: pagesArray
        }
      });
    } else if (type === 'checkbox' && name !== 'hasDesign') {
      const checkbox = e.target as HTMLInputElement;
      setFormData({
        ...formData,
        website_details: {
          ...currentWebsiteDetails,
          features: {
            ...currentWebsiteDetails.features,
            [name]: checkbox.checked
          }
        }
      });
    } else {
      setFormData({
        ...formData,
        website_details: {
          ...currentWebsiteDetails,
          [name]: value
        }
      });
    }
  };

  const handleFeatureChange = (featureId: string, checked: boolean) => {
    const currentWebsiteDetails = formData.website_details || {
      title: '',
      description: '',
      features: {},
      pages: [],
      hasDesign: false,
      designUrl: ''
    };

    setFormData({
      ...formData,
      website_details: {
        ...currentWebsiteDetails,
        features: {
          ...currentWebsiteDetails.features,
          [featureId]: checked
        }
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
      isSubmitting={isSubmitting}
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
            Pages du site (séparées par des virgules)
          </label>
          <input
            type="text"
            name="pages"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500"
            value={formData.website_details?.pages?.join(', ') || ''}
            onChange={handleChange}
            placeholder="Accueil, À propos, Contact"
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
                  checked={Boolean(formData.website_details?.features?.[feature.id as keyof typeof formData.website_details.features]) || false}
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
            <span>Oui, j&apos;ai déjà un design</span>
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