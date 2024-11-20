import { SlideWrapper } from "./SlideWrapper";
import { FormData } from "../types";

interface FinalizationSlideProps {
  formData: FormData;
  setFormData: (data: FormData) => void;
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
            name="name"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500"
            value={formData.contact?.name || ''}
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

        <div className="bg-gray-50 p-6 rounded-lg">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Méthode de contact préférée
          </label>
          <select
            name="preferredContact"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500"
            value={formData.contact?.preferredContact || 'email'}
            onChange={handleChange}
          >
            <option value="email">Email</option>
            <option value="phone">Téléphone</option>
          </select>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Rôle dans l'entreprise
          </label>
          <input
            type="text"
            name="role"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500"
            value={formData.contact?.role || ''}
            onChange={handleChange}
          />
        </div>
      </div>
    </SlideWrapper>
  );
} 