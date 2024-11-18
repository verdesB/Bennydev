import { SlideWrapper } from "../SlideWrapper";

interface RedesignSlideProps {
  formData: any;
  setFormData: (data: any) => void;
  onNext: () => void;
  onPrevious: () => void;
}

export function RedesignSlide({ formData, setFormData, onNext, onPrevious }: RedesignSlideProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement;
      setFormData({
        ...formData,
        redesign: {
          ...formData.redesign,
          improvements: {
            ...(formData.redesign?.improvements || {}),
            [name]: checkbox.checked
          }
        }
      });
    } else {
      setFormData({
        ...formData,
        redesign: {
          ...formData.redesign,
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
    >
      <div className="space-y-6">
        <div className="bg-gray-50 p-6 rounded-lg">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            URL du site actuel
          </label>
          <input
            type="url"
            name="currentUrl"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500"
            value={formData.redesign?.currentUrl || ''}
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
                  name="improvements"
                  value={improvement.id}
                  checked={formData.redesign?.improvements?.[improvement.id] || false}
                  onChange={handleChange}
                />
                <span>{improvement.label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
} 