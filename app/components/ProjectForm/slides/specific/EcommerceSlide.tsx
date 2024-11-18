import { SlideWrapper } from "../SlideWrapper";

interface EcommerceSlideProps {
  formData: any;
  setFormData: (data: any) => void;
  onNext: () => void;
  onPrevious: () => void;
}

export function EcommerceSlide({ formData, setFormData, onNext, onPrevious }: EcommerceSlideProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement;
      setFormData({
        ...formData,
        ecommerce: {
          ...formData.ecommerce,
          features: {
            ...(formData.ecommerce?.features || {}),
            [name]: checkbox.checked
          }
        }
      });
    } else {
      setFormData({
        ...formData,
        ecommerce: {
          ...formData.ecommerce,
          [name]: value
        }
      });
    }
  };

  return (
    <SlideWrapper
      title="Site E-commerce"
      subtitle="Précisons les détails de votre boutique en ligne pour vous proposer la meilleure solution"
      onNext={onNext}
      onPrevious={onPrevious}
    >
      <div className="space-y-6">
        <div className="bg-gray-50 p-6 rounded-lg">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Type de produits
          </label>
          <select
            name="productType"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500"
            value={formData.ecommerce?.productType || ''}
            onChange={handleChange}
          >
            <option value="">Sélectionnez un type</option>
            <option value="physical">Produits physiques</option>
            <option value="digital">Produits numériques</option>
            <option value="services">Services</option>
            <option value="mixed">Mixte</option>
          </select>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nombre de produits estimé
          </label>
          <input
            type="number"
            name="productCount"
            min="1"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500"
            value={formData.ecommerce?.productCount || ''}
            onChange={handleChange}
          />
        </div>

        <div className="bg-gray-50 p-6 rounded-lg">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Fonctionnalités souhaitées
          </label>
          <div className="grid grid-cols-2 gap-4">
            {[
              { id: 'stockManagement', label: 'Gestion des stocks' },
              { id: 'loyaltyProgram', label: 'Programme de fidélité' },
              { id: 'promoCodes', label: 'Codes promotionnels' },
              { id: 'multiCurrency', label: 'Multi-devise' },
              { id: 'multiLanguage', label: 'Multi-langue' }
            ].map(feature => (
              <label key={feature.id} className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  name={feature.id}
                  checked={formData.ecommerce?.features?.[feature.id] || false}
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