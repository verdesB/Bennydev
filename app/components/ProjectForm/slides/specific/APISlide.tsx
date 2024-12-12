import { ProjectFormData} from "../../types";
import { SlideWrapper } from "../SlideWrapper";

interface APISlideProps {
  formData: ProjectFormData;
  setFormData: (data: ProjectFormData) => void;
  onNext: () => void;
  onPrevious: () => void;
  isSubmitting: boolean;
}

export function APISlide({ 
  formData, 
  setFormData, 
  onNext, 
  onPrevious,
  isSubmitting 
}: APISlideProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement;
      setFormData({
        ...formData,
        api_details: {
          title: formData.api_details?.title || '',
          description: formData.api_details?.description || '',
          apiType: formData.api_details?.apiType || 'rest',
          endpoints: formData.api_details?.endpoints || [],
          expectedTraffic: formData.api_details?.expectedTraffic || '',
          features: {
            ...(formData.api_details?.features || {}),
            [name]: checkbox.checked
          }
        }
      });
    } else {
      setFormData({
        ...formData,
        api_details: {
          title: formData.api_details?.title || '',
          description: formData.api_details?.description || '',
          apiType: formData.api_details?.apiType || 'rest',
          endpoints: formData.api_details?.endpoints || [],
          expectedTraffic: formData.api_details?.expectedTraffic || '',
          features: formData.api_details?.features || {},
          [name]: value
        }
      });
    }
  };

  return (
    <SlideWrapper
      title="Développement d'API"
      subtitle="Précisons les détails de votre API pour vous proposer la meilleure solution"
      onNext={onNext}
      onPrevious={onPrevious}
      isSubmitting={isSubmitting}
    >
      <div className="space-y-6">
        <div className="bg-gray-50 p-6 rounded-lg">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Type d&apos;API
          </label>
          <select
            name="apiType"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500"
            value={formData.api_details?.apiType || ''}
            onChange={handleChange}
          >
            <option value="">Sélectionnez un type</option>
            <option value="rest">REST</option>
            <option value="graphql">GraphQL</option>
            <option value="soap">SOAP</option>
            <option value="websocket">WebSocket</option>
          </select>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Fonctionnalités requises
          </label>
          <div className="grid grid-cols-2 gap-4">
            {[
              { id: 'authentication', label: 'Authentification' },
              { id: 'rateLimit', label: 'Limitation de requêtes' },
              { id: 'documentation', label: 'Documentation automatique' },
              { id: 'monitoring', label: 'Monitoring' },
              { id: 'versioning', label: 'Versioning' }
            ].map(feature => (
              <label key={feature.id} className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  name={feature.id}
                  checked={formData.api_details?.features?.[feature.id as keyof typeof formData.api_details.features] || false}
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