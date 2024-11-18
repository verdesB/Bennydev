'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

// Import des slides
import { WelcomeSlide } from './slides/WelcomeSlide';
import { IntroductionSlide } from './slides/IntroductionSlide';
import { ServiceChoiceSlide } from './slides/ServiceChoiceSlide';
import { WebsiteSlide } from './slides/specific/WebsiteSlide';
import { EcommerceSlide } from './slides/specific/EcommerceSlide';
import { WebAppSlide } from './slides/specific/WebAppSlide';
import { RedesignSlide } from './slides/specific/RedesignSlide';
import { SEOSlide } from './slides/specific/SEOSlide';
import { APISlide } from './slides/specific/APISlide';
import { BudgetTimelineSlide } from './slides/BudgetTimelineSlide';
import { FinalizationSlide } from './slides/FinalizationSlide';

type ProjectType = 'website' | 'ecommerce' | 'webapp' | 'redesign' | 'seo' | 'api' | null;

interface FormData {
  step: number;
  projectType: ProjectType;
  // Autres champs selon les besoins
}

const STORAGE_KEY = 'project_form_data';

// Ajoutez cette interface pour définir le type des slides
interface SlideProps {
  formData: FormData;
  setFormData: (data: FormData | ((prev: FormData) => FormData)) => void;
  onNext: () => void;
  onPrevious: () => void;
  onSubmit: () => void;
}

export default function ProjectForm() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    step: 0,
    projectType: null,
  });

  // Chargement des données sauvegardées
  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      try {
        setFormData(JSON.parse(savedData));
      } catch (e) {
        console.error('Erreur lors du chargement des données:', e);
      }
    }
  }, []);

  // Sauvegarde automatique
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  }, [formData]);

  const getSpecificSlide = () => {
    switch (formData.projectType) {
      case 'website':
        return WebsiteSlide;
      case 'ecommerce':
        return EcommerceSlide;
      case 'webapp':
        return WebAppSlide;
      case 'redesign':
        return RedesignSlide;
      case 'seo':
        return SEOSlide;
      case 'api':
        return APISlide;
      default:
        return null;
    }
  };

  const slides = [
    {
      id: 'welcome',
      component: WelcomeSlide as React.FC<SlideProps>,
    },
    {
      id: 'introduction',
      component: IntroductionSlide as React.FC<SlideProps>,
    },
    {
      id: 'service-choice',
      component: ServiceChoiceSlide as React.FC<SlideProps>,
    },
    {
      id: 'specific',
      component: getSpecificSlide() as React.FC<SlideProps> | null,
      condition: () => formData.projectType !== null,
    },
    {
      id: 'budget',
      component: BudgetTimelineSlide as React.FC<SlideProps>,
    },
    {
      id: 'finalization',
      component: FinalizationSlide as React.FC<SlideProps>,
    },
  ].filter(slide => !slide.condition || slide.condition());

  const handleNext = () => {
    if (formData.step < slides.length - 1) {
      setFormData(prev => ({ ...prev, step: prev.step + 1 }));
    }
  };

  const handlePrevious = () => {
    if (formData.step > 0) {
      setFormData(prev => ({ ...prev, step: prev.step - 1 }));
    }
  };

  const handleSubmit = async () => {
    try {
      // Envoi des données au serveur
      const response = await fetch('/api/submit-project', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de l\'envoi du formulaire');
      }

      // Nettoyage du stockage local
      localStorage.removeItem(STORAGE_KEY);

      // Redirection vers la page de confirmation
      router.push('/project/confirmation');
    } catch (error) {
      console.error('Erreur:', error);
      // Gérer l'erreur (afficher un message à l'utilisateur)
    }
  };

  // Animation variants pour Framer Motion
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 relative z-30">
      {/* Barre de progression */}
      <div className="mb-8 bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`flex items-center ${
                index !== slides.length - 1 ? 'flex-1' : ''
              }`}
            >
              <div
                className={`w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center text-sm md:text-base ${
                  index <= formData.step
                    ? 'bg-violet-600 text-white'
                    : 'bg-gray-200 text-gray-400'
                }`}
              >
                {index + 1}
              </div>
              {index !== slides.length - 1 && (
                <div
                  className={`flex-1 h-1 mx-2 md:mx-4 ${
                    index < formData.step ? 'bg-violet-600' : 'bg-gray-200'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between">
          {slides.map((slide, index) => (
            <div
              key={`label-${slide.id}`}
              className={`text-sm hidden md:block ${
                index <= formData.step ? 'text-violet-600' : 'text-gray-400'
              }`}
            >
              {slide.id.charAt(0).toUpperCase() + slide.id.slice(1)}
            </div>
          ))}
        </div>
      </div>

      {/* Container pour le slide actif */}
      <div className="bg-white rounded-lg shadow-lg p-8 min-h-[600px]  flex flex-col">
        {slides[formData.step]?.component?.({
          formData,
          setFormData,
          onNext: handleNext,
          onPrevious: handlePrevious,
          onSubmit: handleSubmit,
        })}
      </div>
    </div>
  );
} 