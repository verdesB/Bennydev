interface SlideWrapperProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  onNext: () => void;
  onPrevious: () => void;
}

export function SlideWrapper({ title, subtitle, children, onNext, onPrevious }: SlideWrapperProps) {
  return (
    <div className="flex flex-col h-full min-h-[600px]">
      {/* En-tête */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-3">{title}</h2>
        <p className="text-gray-600">{subtitle}</p>
      </div>

      {/* Contenu */}
      <div className="flex-grow ">
        {children}
      </div>

      {/* Boutons de navigation */}
      <div className="flex justify-between pt-8 mt-auto">
        <button
          type="button"
          onClick={onPrevious}
          className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 flex items-center gap-2"
        >
          <svg className="w-5 h-5 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          Retour
        </button>
        
        <button
          type="button"
          onClick={onNext}
          className="px-6 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors duration-200 flex items-center gap-2"
        >
          Suivant
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
} 