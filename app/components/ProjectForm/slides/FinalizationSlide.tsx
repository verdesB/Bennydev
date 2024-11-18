import { SlideWrapper } from "./SlideWrapper";

interface FinalizationSlideProps {
  formData: any;
  setFormData: (data: any) => void;
  onSubmit: () => void;
  onPrevious: () => void;
}

export function FinalizationSlide({ formData, setFormData, onSubmit, onPrevious }: FinalizationSlideProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      contact: {
        ...formData.contact,
        [name]: value
      }
    });
  };

  return (
    <SlideWrapper
      title="Finalisation"
      subtitle="Dernière étape : vos informations de contact pour vous recontacter"
      onNext={onSubmit}
      onPrevious={onPrevious}
      submitLabel="Envoyer la demande"
    >
      <div className="space-y-6">
        <div className="bg-gray-50 p-6 rounded-lg">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nom complet
          </label>
          <input
            type="text"
            name="fullName"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500"
            value={formData.contact?.fullName || ''}
            onChange={handleChange}
          />
        </div>

        <div className="bg-gray-50 p-6 rounded-lg">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            name="email"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500"
            value={formData.contact?.email || ''}
            onChange={handleChange}
          />
        </div>

        <div className="bg-gray-50 p-6 rounded-lg">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Téléphone
          </label>
          <input
            type="tel"
            name="phone"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500"
            value={formData.contact?.phone || ''}
            onChange={handleChange}
          />
        </div>

        <div className="bg-gray-50 p-6 rounded-lg">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Commentaires additionnels
          </label>
          <textarea
            name="comments"
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500"
            value={formData.contact?.comments || ''}
            onChange={handleChange}
          />
        </div>
      </div>
    </SlideWrapper>
  );
} 