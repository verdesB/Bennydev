import { SlideWrapper } from "../SlideWrapper";
import { ProjectFormData } from "../../types";

interface WebAppData {
  appType: 'internal' | 'customer' | 'collaborative' | 'other';
  appTypeOther?: string;
  userCount: number;
  accessLevel: 'mixed' | 'public' | 'private';
  keyFeatures: {
    authentication?: boolean;
    rightsManagement?: boolean;
    notifications?: boolean;
    externalApi?: boolean;
  };
  integrations: {
    crm?: boolean;
    erp?: boolean;
    externalTools?: boolean;
  };
  technicalNeeds: {
    realtime?: boolean;
    dataStorage?: boolean;
    heavyProcessing?: boolean;
    mobileFirst?: boolean;
  };
}

interface WebAppSlideProps {
  formData: ProjectFormData;
  setFormData: (data: ProjectFormData | ((prev: ProjectFormData) => ProjectFormData)) => void;
  onNext: () => void;
  onPrevious: () => void;
  isSubmitting: boolean;
}

export function WebAppSlide({ formData, setFormData, onNext, onPrevious, isSubmitting }: WebAppSlideProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;

    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement;
      const category = name as keyof WebAppData;
      
      setFormData(prev => ({
        ...prev,
        webapp: {
          appType: prev.webapp?.appType || 'internal',
          userCount: prev.webapp?.userCount || 0,
          accessLevel: prev.webapp?.accessLevel || 'private',
          keyFeatures: prev.webapp?.keyFeatures || {},
          integrations: prev.webapp?.integrations || {},
          technicalNeeds: prev.webapp?.technicalNeeds || {},
          [category]: {
            ...(prev.webapp?.[category] as Record<string, boolean> || {}),
            [checkbox.value]: checkbox.checked
          }
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        webapp: {
          ...prev.webapp,
          [name]: value
        }
      }));
    }
  };

  const appTypes = [
    { id: 'internal', label: 'Gestion interne' },
    { id: 'customer', label: 'Service client' },
    { id: 'collaborative', label: 'Plateforme collaborative' },
    { id: 'other', label: 'Autre' }
  ];

  const accessLevels = [
    { id: 'public', label: 'Public' },
    { id: 'private', label: 'Privé' },
    { id: 'mixed', label: 'Mixte' }
  ];

  const keyFeatures = [
    { id: 'authentication', label: 'Authentification' },
    { id: 'rightsManagement', label: 'Gestion de droits' },
    { id: 'notifications', label: 'Notifications' },
    { id: 'externalApi', label: 'API externe' }
  ];

  const integrations = [
    { id: 'crm', label: 'CRM' },
    { id: 'erp', label: 'ERP' },
    { id: 'externalTools', label: 'Outils externes' }
  ];

  const technicalNeeds = [
    { id: 'realtime', label: 'Temps réel' },
    { id: 'dataStorage', label: 'Stockage de données' },
    { id: 'heavyProcessing', label: 'Traitement lourd' },
    { id: 'mobileFirst', label: 'Mobile-first' }
  ];

  return (
    <SlideWrapper
      title="Application Web"
      subtitle="Définissons ensemble les caractéristiques de votre application web."
      onNext={onNext}
      onPrevious={onPrevious}
      isSubmitting={isSubmitting}
    >
      <div className="space-y-8">
        {/* Type d'application */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Type d&apos;application
          </label>
          <div className="grid grid-cols-2 gap-4">
            {appTypes.map(type => (
              <label key={type.id} className="flex items-center space-x-3">
                <input
                  type="radio"
                  name="appType"
                  value={type.id}
                  checked={formData.webapp?.appType === type.id}
                  onChange={handleChange}
                  className="rounded-full border-gray-300 text-violet-600 focus:ring-violet-500"
                />
                <span>{type.label}</span>
              </label>
            ))}
          </div>
          {formData.webapp?.appType === 'other' && (
            <input
              type="text"
              name="appTypeOther"
              placeholder="Précisez le type d'application"
              className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500"
              value={formData.webapp?.appTypeOther || ''}
              onChange={handleChange}
            />
          )}
        </div>

        {/* Nombre d'utilisateurs */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Nombre d&apos;utilisateurs estimé
          </label>
          <input
            type="number"
            name="userCount"
            min="1"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500"
            value={formData.webapp?.userCount || ''}
            onChange={handleChange}
          />
        </div>

        {/* Niveau d'accès */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Niveau d&apos;accès requis
          </label>
          <div className="grid grid-cols-3 gap-4">
            {accessLevels.map(level => (
              <label key={level.id} className="flex items-center space-x-3">
                <input
                  type="radio"
                  name="accessLevel"
                  value={level.id}
                  checked={formData.webapp?.accessLevel === level.id}
                  onChange={handleChange}
                  className="rounded-full border-gray-300 text-violet-600 focus:ring-violet-500"
                />
                <span>{level.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Fonctionnalités clés */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Fonctionnalités clés
          </label>
          <div className="grid grid-cols-2 gap-4">
            {keyFeatures.map(feature => (
              <label key={feature.id} className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  name="keyFeatures"
                  value={feature.id}
                  checked={formData.webapp?.keyFeatures?.[feature.id] || false}
                  onChange={handleChange}
                  className="rounded border-gray-300 text-violet-600 focus:ring-violet-500"
                />
                <span>{feature.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Intégrations */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Intégrations nécessaires
          </label>
          <div className="grid grid-cols-2 gap-4">
            {integrations.map(integration => (
              <label key={integration.id} className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  name="integrations"
                  value={integration.id}
                  checked={formData.webapp?.integrations?.[integration.id] || false}
                  onChange={handleChange}
                  className="rounded border-gray-300 text-violet-600 focus:ring-violet-500"
                />
                <span>{integration.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Besoins techniques */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Besoins techniques
          </label>
          <div className="grid grid-cols-2 gap-4">
            {technicalNeeds.map(need => (
              <label key={need.id} className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  name="technicalNeeds"
                  value={need.id}
                  checked={formData.webapp?.technicalNeeds?.[need.id] || false}
                  onChange={handleChange}
                  className="rounded border-gray-300 text-violet-600 focus:ring-violet-500"
                />
                <span>{need.label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
} 