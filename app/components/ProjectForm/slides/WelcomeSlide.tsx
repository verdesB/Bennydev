import { SlideWrapper } from "./SlideWrapper";

interface WelcomeSlideProps {
  onNext: () => void;
}

export function WelcomeSlide({ onNext }: WelcomeSlideProps) {
  return (
    <SlideWrapper
      title="Bienvenue dans votre espace projet"
      subtitle="Nous sommes ravis de vous accompagner dans la réalisation de votre projet digital."
      onNext={onNext}
      onPrevious={() => {}}
     
    >
      <div className="flex flex-col items-center justify-center text-center min-h-[300px]">
        <p className="text-lg text-gray-600 max-w-2xl mb-8">
          Pour vous offrir la solution la plus adaptée à vos besoins, nous vous invitons à 
          suivre ce questionnaire interactif en quelques étapes.
        </p>
        <p className="text-sm text-gray-500 mb-8">
          Temps estimé : 5-10 minutes
        </p>
      </div>
    </SlideWrapper>
  );
} 