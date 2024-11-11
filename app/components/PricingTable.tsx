'use client'
import React, { useState } from 'react';

interface Plan {
  id: string;
  name: string;
  price: string;
}

interface FeatureValue {
  [key: string]: string | boolean;
}

interface Feature {
  name: string;
  values: FeatureValue;
}

interface PricingTableProps {
  plans: Plan[];
  features: Feature[];
}

const PricingTable: React.FC<PricingTableProps> = ({ plans, features }) => {
  const [currentPlanIndex, setCurrentPlanIndex] = useState(0);

  const nextPlan = () => {
    setCurrentPlanIndex((prev) => (prev + 1) % plans.length);
  };

  const prevPlan = () => {
    setCurrentPlanIndex((prev) => (prev - 1 + plans.length) % plans.length);
  };

  return (
    <div className="max-w-6xl mx-auto relative z-20 rounded-lg">
      {/* Version Desktop - visible uniquement sur md et plus */}
      <div className="hidden md:block rounded-lg">
        <table className="w-full divide-y divide-gray-200 bg-white rounded-lg shadow-lg">
          <thead>
            <tr className="divide-x divide-gray-200">
              <th className="py-6 px-6 text-left bg-gray-50 min-w-[200px]">
                <span className="text-sm font-semibold text-gray-900">Caractéristiques</span>
              </th>
              {plans.map((plan) => (
                <th key={plan.id} className="py-6 px-6 bg-gray-50">
                  <span className="text-sm font-semibold text-gray-900">{plan.name}</span>
                  <div className="mt-2 text-2xl font-bold text-blue-600">{plan.price}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {features.map((feature) => (
              <tr 
                key={feature.name}
                className={`divide-x divide-gray-200 hover:bg-gray-50 transition-colors`}
              >
                <td className="py-4 px-6 text-sm font-medium text-gray-900">
                  {feature.name}
                </td>
                {plans.map((plan) => (
                  <td 
                    key={`${feature.name}-${plan.id}`}
                    className="py-4 px-6 text-sm text-center text-gray-500"
                  >
                    {typeof feature.values[plan.id] === 'boolean' ? (
                      feature.values[plan.id] ? (
                        <span className="text-green-500 text-lg">✓</span>
                      ) : (
                        <span className="text-red-500 text-lg">✗</span>
                      )
                    ) : (
                      feature.values[plan.id]
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Version Mobile - carrousel */}
      <div className="md:hidden relative z-20">
        <div className="w-full px-6">
          <div className="bg-white rounded-lg shadow-lg p-6 animate-fade-in">
            {/* Header avec les boutons de navigation */}
            <div className="flex items-center justify-between mb-4">
              <button 
                onClick={prevPlan}
                className="p-2 bg-white rounded-full shadow-lg"
                aria-label="Offre précédente"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <h3 className="text-xl font-bold text-center">
                {plans[currentPlanIndex].name}
              </h3>

              <button 
                onClick={nextPlan}
                className="p-2 bg-white rounded-full shadow-lg"
                aria-label="Offre suivante"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            <div className="text-center mb-6 pb-4 border-b border-gray-200">
              <span className="text-4xl font-bold text-blue-600">
                {plans[currentPlanIndex].price}
              </span>
            </div>

            <div className="border border-gray-200 rounded-lg">
              {features.map((feature, index) => (
                <div 
                  key={feature.name} 
                  className={`grid grid-cols-2 ${
                    index !== features.length - 1 ? 'border-b border-gray-200' : ''
                  }`}
                >
                  <div className="p-4 border-r border-gray-200 text-sm text-gray-900">
                    {feature.name}
                  </div>
                  <div className="p-4 text-center">
                    {typeof feature.values[plans[currentPlanIndex].id] === 'boolean' ? (
                      feature.values[plans[currentPlanIndex].id] ? (
                        <span className="text-green-500 text-lg">✓</span>
                      ) : (
                        <span className="text-red-500 text-lg">✗</span>
                      )
                    ) : (
                      feature.values[plans[currentPlanIndex].id]
                    )}
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full mt-6 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
              Choisir ce plan
            </button>
          </div>
        </div>

        {/* Indicateurs de position */}
        <div className="flex justify-center space-x-2 mt-4">
          {plans.map((_, index) => (
            <button
              key={index}
              className={`h-2 rounded-full transition-all ${
                index === currentPlanIndex ? 'w-4 bg-blue-600' : 'w-2 bg-gray-300'
              }`}
              onClick={() => setCurrentPlanIndex(index)}
              aria-label={`Voir l'offre ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PricingTable; 