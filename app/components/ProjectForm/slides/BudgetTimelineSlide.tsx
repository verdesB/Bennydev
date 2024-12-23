import { SlideWrapper } from "./SlideWrapper";
import { ProjectFormData } from "../types";

interface BudgetTimelineSlideProps {
  formData: ProjectFormData;
  setFormData: (data: ProjectFormData) => void;
  onNext: () => void;
  onPrevious: () => void;
  isSubmitting: boolean;
}

export function BudgetTimelineSlide({ formData, setFormData, onNext, onPrevious, isSubmitting }: BudgetTimelineSlideProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    setFormData({
      ...formData,
      [name]: name === 'budget' ? Number(value) : value
    });
  };

  const budgetRanges = [
    { value: 1000, label: '1 000€ - 3 000€' },
    { value: 3000, label: '3 000€ - 5 000€' },
    { value: 5000, label: '5 000€ - 10 000€' },
    { value: 10000, label: 'Plus de 10 000€' }
  ];

  const timelineOptions = [
    { value: 'urgent', label: 'Urgent (< 1 mois)' },
    { value: 'normal', label: 'Normal (1-2 mois)' },
    { value: 'flexible', label: 'Flexible (2-3 mois)' },
    { value: 'notDefined', label: 'Pas encore défini' }
  ];

  return (
    <SlideWrapper
      title="Budget et Délais"
      subtitle="Pour mieux vous accompagner, parlons de vos contraintes budgétaires et temporelles."
      onNext={onNext}
      onPrevious={onPrevious}
      isSubmitting={isSubmitting}
    >
      <div className="space-y-6">
        {/* Budget */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Budget envisagé
          </label>
          <select
            name="budget"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500"
            value={formData.budget || ''}
            onChange={handleChange}
            required
          >
            <option value="">Sélectionnez une fourchette de budget</option>
            {budgetRanges.map(range => (
              <option key={range.value} value={range.value}>
                {range.label}
              </option>
            ))}
          </select>
        </div>

        {/* Délais */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Délai souhaité
          </label>
          <select
            name="deadline"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500"
            value={formData.deadline || ''}
            onChange={handleChange}
            required
          >
            <option value="">Sélectionnez un délai</option>
            {timelineOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </SlideWrapper>
  );
} 