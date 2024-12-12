import { SlideWrapper } from "../SlideWrapper";
import { ProjectFormData} from "../../types";

interface RedesignSlideProps {
  formData: ProjectFormData;
  setFormData: (data: ProjectFormData) => void;
  onNext: () => void;
  onPrevious: () => void;
  isSubmitting: boolean;
}

export function RedesignSlide({ 
  formData, 
  setFormData, 
  onNext, 
  onPrevious,
  isSubmitting 
}: RedesignSlideProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement;
      setFormData({
        ...formData,
        redesign_details: {
          ...formData.redesign_details,
          title: formData.redesign_details?.title ?? '',
          description: formData.redesign_details?.description ?? '',
          currentUrl: formData.redesign_details?.currentUrl ?? '',
          improvements: name === 'brandGuidelines' 
            ? (formData.redesign_details?.improvements ?? {})
            : {
                ...(formData.redesign_details?.improvements ?? {}),
                [checkbox.value]: checkbox.checked
              },
          painPoints: formData.redesign_details?.painPoints ?? [],
          desiredFeatures: formData.redesign_details?.desiredFeatures ?? [],
          brandGuidelines: name === 'brandGuidelines' ? checkbox.checked : (formData.redesign_details?.brandGuidelines ?? false)
        }
      });
    } else {
      setFormData({
        ...formData,
        redesign_details: {
          ...formData.redesign_details,
          title: formData.redesign_details?.title ?? '',
          description: formData.redesign_details?.description ?? '',
          currentUrl: formData.redesign_details?.currentUrl ?? '',
          improvements: formData.redesign_details?.improvements ?? {},
          painPoints: formData.redesign_details?.painPoints ?? [],
          desiredFeatures: formData.redesign_details?.desiredFeatures ?? [],
          brandGuidelines: formData.redesign_details?.brandGuidelines ?? false,
          [name]: value
        }
      });
    }
  };

  return (
    <SlideWrapper
      title="Refonte de Site Web"
      subtitle="Précisons les aspects à améliorer de votre site actuel"
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
            value={formData.redesign_details?.title || ''}
            onChange={handleChange}
            placeholder="Titre de votre projet de refonte"
          />
        </div>

        <div className="bg-gray-50 p-6 rounded-lg">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description du projet
          </label>
          <textarea
            name="description"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500"
            value={formData.redesign_details?.description || ''}
            onChange={handleChange}
            placeholder="Décrivez votre projet de refonte"
            rows={4}
          />
        </div>

        <div className="bg-gray-50 p-6 rounded-lg">
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              name="brandGuidelines"
              checked={formData.redesign_details?.brandGuidelines || false}
              onChange={handleChange}
              className="rounded border-gray-300 text-violet-600 focus:ring-violet-500"
            />
            <span>Guide de marque disponible</span>
          </label>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            URL du site actuel
          </label>
          <input
            type="url"
            name="currentUrl"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500"
            value={formData.redesign_details?.currentUrl || ''}
            onChange={handleChange}
            placeholder="https://www.votresite.com"
          />
        </div>

        <div className="bg-gray-50 p-6 rounded-lg">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Points à améliorer
          </label>
          <div className="grid grid-cols-2 gap-4">
            {[
              { id: 'design', label: 'Design moderne' },
              { id: 'performance', label: 'Performance' },
              { id: 'mobile', label: 'Adaptation mobile' },
              { id: 'seo', label: 'SEO' },
            ].map(improvement => (
              <label key={improvement.id} className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  name={improvement.id}
                  value={improvement.id}
                  checked={formData.redesign_details?.improvements?.[improvement.id as keyof typeof formData.redesign_details.improvements] || false}
                  onChange={handleChange}
                  className="rounded border-gray-300 text-violet-600 focus:ring-violet-500"
                />
                <span>{improvement.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Points d&apos;amélioration spécifiques
          </label>
          <textarea
            name="painPoints"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500"
            value={formData.redesign_details?.painPoints?.join('\n') || ''}
            onChange={(e) => {
              setFormData({
                ...formData,
                redesign_details: {
                  title: formData.redesign_details?.title ?? '',
                  description: formData.redesign_details?.description ?? '',
                  currentUrl: formData.redesign_details?.currentUrl ?? '',
                  improvements: formData.redesign_details?.improvements ?? {},
                  painPoints: e.target.value.split('\n').filter(point => point.trim() !== ''),
                  desiredFeatures: formData.redesign_details?.desiredFeatures ?? [],
                  brandGuidelines: formData.redesign_details?.brandGuidelines ?? false
                }
              });
            }}
            placeholder="Listez vos points d'amélioration (un par ligne)"
            rows={4}
          />
        </div>

        <div className="bg-gray-50 p-6 rounded-lg">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Fonctionnalités souhaitées
          </label>
          <textarea
            name="desiredFeatures"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500"
            value={formData.redesign_details?.desiredFeatures?.join('\n') || ''}
            onChange={(e) => {
              setFormData({
                ...formData,
                redesign_details: {
                  title: formData.redesign_details?.title ?? '',
                  description: formData.redesign_details?.description ?? '',
                  currentUrl: formData.redesign_details?.currentUrl ?? '',
                  improvements: formData.redesign_details?.improvements ?? {},
                  painPoints: formData.redesign_details?.painPoints ?? [],
                  desiredFeatures: e.target.value.split('\n').filter(feature => feature.trim() !== ''),
                  brandGuidelines: formData.redesign_details?.brandGuidelines ?? false
                }
              });
            }}
            placeholder="Listez les nouvelles fonctionnalités souhaitées (une par ligne)"
            rows={4}
          />
        </div>
      </div>
    </SlideWrapper>
  );
} 