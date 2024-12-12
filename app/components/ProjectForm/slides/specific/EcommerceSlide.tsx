import { SlideProps } from "../../types";
import { SlideWrapper } from "../SlideWrapper";

interface EcommerceDetails {
  productType?: string;
  productCount?: number;
  features?: {
    [key: string]: boolean;
  };
  paymentMethods?: string[];
  shippingRegions?: string[];
}



type FeatureId = 'stockManagement' | 'loyaltyProgram' | 'promoCodes' | 'multiCurrency' | 'multiLanguage';

const features: Array<{ id: FeatureId; label: string }> = [
  { id: 'stockManagement', label: 'Gestion des stocks' },
  { id: 'loyaltyProgram', label: 'Programme de fidélité' },
  { id: 'promoCodes', label: 'Codes promotionnels' },
  { id: 'multiCurrency', label: 'Multi-devise' },
  { id: 'multiLanguage', label: 'Multi-langue' }
];

export function EcommerceSlide({ 
  formData, 
  setFormData, 
  onNext, 
  onPrevious,
  isSubmitting ,

}: SlideProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement;
      setFormData(prev => ({
        ...prev,
        ecommerce_details: {
          title: prev.ecommerce_details?.title || '',
          description: prev.ecommerce_details?.description || '',
          productType: prev.ecommerce_details?.productType || 'physical',
          productCount: prev.ecommerce_details?.productCount || 0,
          features: {
            ...(prev.ecommerce_details?.features || {}),
            [checkbox.value]: checkbox.checked
          },
          paymentMethods: prev.ecommerce_details?.paymentMethods || [],
          hasInventory: prev.ecommerce_details?.hasInventory || false,
          shippingRegions: prev.ecommerce_details?.shippingRegions || []
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        ecommerce_details: {
          ...prev.ecommerce_details,
          [name]: value
        }
      }));
    }
  };

  return (
    <SlideWrapper
      title="Site E-commerce"
      subtitle="Précisons les détails de votre boutique en ligne pour vous proposer la meilleure solution"
      onNext={onNext}
      onPrevious={onPrevious}
      isSubmitting={isSubmitting}
    >
      <div className="space-y-6">
        <div className="bg-gray-50 p-6 rounded-lg">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Type de produits
          </label>
          <select
            name="productType"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500"
            value={formData.ecommerce_details?.productType || ''}
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
            value={formData.ecommerce_details?.productCount || ''}
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
                  checked={formData.ecommerce_details?.features?.[feature.id] || false}
                  onChange={handleChange}
                  className="rounded border-gray-300 text-violet-600 focus:ring-violet-500"
                />
                <span>{feature.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Méthodes de paiement souhaitées
          </label>
          <div className="grid grid-cols-2 gap-4">
            {[
              { id: 'creditCard', label: 'Carte bancaire' },
              { id: 'paypal', label: 'PayPal' },
              { id: 'stripe', label: 'Stripe' },
              { id: 'bankTransfer', label: 'Virement bancaire' }
            ].map(method => (
              <label key={method.id} className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  name={`paymentMethods.${method.id}`}
                  checked={formData.ecommerce_details?.paymentMethods?.includes(method.id) || false}
                  onChange={(e) => {
                    const currentMethods = formData.ecommerce_details?.paymentMethods || [];
                    const updatedMethods = e.target.checked
                      ? [...currentMethods, method.id]
                      : currentMethods.filter(m => m !== method.id);
                    
                    setFormData({
                      ...formData,
                      ecommerce_details: {
                        title: formData.ecommerce_details?.title || '',
                        description: formData.ecommerce_details?.description || '',
                        productType: formData.ecommerce_details?.productType || 'physical',
                        productCount: formData.ecommerce_details?.productCount || 0,
                        features: formData.ecommerce_details?.features || {},
                        paymentMethods: updatedMethods,
                        hasInventory: formData.ecommerce_details?.hasInventory || false,
                        shippingRegions: formData.ecommerce_details?.shippingRegions || []
                      }
                    });
                  }}
                  className="rounded border-gray-300 text-violet-600 focus:ring-violet-500"
                />
                <span>{method.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Zones de livraison
          </label>
          <div className="grid grid-cols-2 gap-4">
            {[
              { id: 'france', label: 'France' },
              { id: 'europe', label: 'Europe' },
              { id: 'worldwide', label: 'Monde entier' },
              { id: 'local', label: 'Local uniquement' }
            ].map(region => (
              <label key={region.id} className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  name={`shippingRegions.${region.id}`}
                  checked={formData.ecommerce_details?.shippingRegions?.includes(region.id) || false}
                  onChange={(e) => {
                    const currentRegions = formData.ecommerce_details?.shippingRegions || [];
                    const updatedRegions = e.target.checked
                      ? [...currentRegions, region.id]
                      : currentRegions.filter(r => r !== region.id);
                    
                    setFormData({
                      ...formData,
                      ecommerce_details: {
                        title: formData.ecommerce_details?.title || '',
                        description: formData.ecommerce_details?.description || '',
                        productType: formData.ecommerce_details?.productType || 'physical',
                        productCount: formData.ecommerce_details?.productCount || 0,
                        features: formData.ecommerce_details?.features || {},
                        paymentMethods: formData.ecommerce_details?.paymentMethods || [],
                        hasInventory: formData.ecommerce_details?.hasInventory || false,
                        shippingRegions: updatedRegions
                      }
                    });
                  }}
                  className="rounded border-gray-300 text-violet-600 focus:ring-violet-500"
                />
                <span>{region.label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
} 