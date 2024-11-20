import { SlideWrapper } from "./SlideWrapper";

interface IntroductionSlideProps {
  formData: any;
  setFormData: (data: any) => void;
  onNext: () => void;
  onPrevious: () => void;
}

export function IntroductionSlide({ formData, setFormData, onNext, onPrevious }: IntroductionSlideProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  return (
    <SlideWrapper
      title="Parlons de vous"
      subtitle="Quelques informations pour mieux vous connaître"
      onNext={onNext}
      onPrevious={onPrevious}
    >
      <div className="space-y-6">
        <div className="bg-gray-50 p-6 rounded-lg">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nom de l'entreprise
          </label>
          <input
            type="text"
            name="company"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500"
            value={formData.company || ''}
            onChange={handleChange}
          />
        </div>

        <div className="bg-gray-50 p-6 rounded-lg">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Secteur d'activité
          </label>
          <input
            type="text"
            name="businessSector"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500"
            value={formData.businessSector || ''}
            onChange={handleChange}
          />
        </div>

        <div className="bg-gray-50 p-6 rounded-lg">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Avez-vous déjà un site web ?
          </label>
          <div className="flex gap-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="website"
                value="yes"
                checked={formData.website === 'yes'}
                onChange={handleChange}
                className="mr-2"
              />
              Oui
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="website"
                value="no"
                checked={formData.website === 'no'}
                onChange={handleChange}
                className="mr-2"
              />
              Non
            </label>
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
} 