'use client';

import { useState, useEffect } from 'react';


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
import {  FormData } from './types';

const STORAGE_KEY = 'project_form_data';



export default function ProjectForm() {
  // Tous les useState au début
  const [formData, setFormData] = useState<FormData>({
    step: 0,
    projectType: null,
    company: '',
    businessSector: '',
    website: 'no',
    contact: {
      name: '',
      email: '',
      preferredContact: 'email'
    },
    captchaToken: null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [csrfToken, setCsrfToken] = useState<string>('');

  // Tous les useEffect ensuite
  useEffect(() => {
    const fetchCsrfToken = async () => {
      try {
        const response = await fetch('/api/csrf');
        const data = await response.json();
        setCsrfToken(data.csrfToken);
      } catch (error) {
        console.error('Erreur lors de la récupération du CSRF token:', error);
      }
    };
    fetchCsrfToken();
  }, []);

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
      id: 'Bonjour',
      component: WelcomeSlide,
    },
    {
      id: 'introduction',
      component: IntroductionSlide,
    },
    {
      id: 'Type de projet',
      component: ServiceChoiceSlide,
    },
    {
      id: 'Détails du projet',
      component: getSpecificSlide(),
      condition: () => formData.projectType !== null,
    },
    {
      id: 'Budget',
      component: BudgetTimelineSlide,
    },
    {
      id: 'Validation',
      component: FinalizationSlide,
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
      setIsSubmitting(true);

      if (!formData.captchaToken) {
        throw new Error('Veuillez valider le captcha');
      }

      const transformedData = {
        ...formData,
        website_details: formData.website_details ? {
          ...formData.website_details,
          features: Object.keys(formData.website_details.features).filter(key => 
            formData.website_details?.features[key]
          )
        } : undefined,
        csrfToken
      };

      const response = await fetch('/api/demandes/projet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrfToken
        },
        body: JSON.stringify(transformedData)
      });

      if (!response.ok) {
        throw new Error('Erreur lors de l\'envoi du formulaire');
      }

      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-4 mb-8 relative z-30 px-4 xl:px-0">
      {/* Barre de progression améliorée */}
      <div className="mb-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm p-5">
        <div className="flex items-center justify-between mb-3">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`flex items-center ${
                index !== slides.length - 1 ? 'flex-1' : ''
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-medium transition-all duration-300 ${
                  index <= formData.step
                    ? 'bg-violet-600 text-white scale-110'
                    : 'bg-gray-100 text-gray-400'
                }`}
              >
                {index + 1}
              </div>
              {index !== slides.length - 1 && (
                <div
                  className={`flex-1 h-0.5 mx-2 transition-all duration-300 ${
                    index < formData.step ? 'bg-violet-600' : 'bg-gray-100'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between pt-">
          {slides.map((slide, index) => (
            <div
              key={`label-${slide.id}`}
              className={`text-xs font-medium tracking-wide hidden md:block transition-all duration-300 ${
                index <= formData.step ? 'text-violet-600' : 'text-gray-400'
              }`}
            >
              {slide.id.charAt(0).toUpperCase() + slide.id.slice(1)}
            </div>
          ))}
        </div>
      </div>

      {/* Container principal amélioré */}
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 min-h-[500px] flex flex-col transition-all duration-300">
        <div className="max-w-2xl mx-auto w-full py-12">
          {slides[formData.step]?.component?.({
            formData,
            setFormData,
            onNext: handleNext,
            onPrevious: handlePrevious,
            onSubmit: handleSubmit,
            isSubmitting: isSubmitting
          })}

         
        </div>
      </div>
    </div>
  );
} 