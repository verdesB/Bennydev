import { siteConfig } from '../lib/site-config';
import { ChevronDown } from 'lucide-react';
import { processusDetails } from '../data/processus-details';
type ProcessusStep = {
    description: string;
    points: string[];
  };
  
  type ProcessusPhase = {
    [key: string]: ProcessusStep;
  };
  
  type ProcessusDetails = {
    [key: string]: ProcessusPhase;
  };
export default function ProcessusSteps() {
  return (
    <section className="relative py-16 px-4 z-20 max-w-6xl mx-auto">
      <div className="max-w-6xl mx-auto">
        {siteConfig.processus.phases.map((phase, phaseIndex) => (
          <div key={phaseIndex} className="mb-16 last:mb-0">
            {/* En-tête de phase */}
            <div className="flex items-center gap-4 mb-8">
              <div className="flex-shrink-0 w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center text-xl font-bold">
                {phaseIndex + 1}
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                {phase.name}
              </h2>
            </div>

            {/* Étapes de la phase */}
            <div className="grid gap-4 ml-16">
              {phase.steps.map((step, stepIndex) => (
                <details 
                  key={stepIndex}
                  className="group bg-white rounded-xl shadow-[0_0_50px_rgba(139,92,246,0.1)] hover:shadow-[0_0_50px_rgba(139,92,246,0.2)] transition-all duration-300"
                >
                  <summary className="flex items-center gap-4 p-6 cursor-pointer list-none">
                    <div className="flex-shrink-0 w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center font-semibold">
                      {stepIndex + 1}
                    </div>
                    <span className="text-gray-900 font-medium flex-grow">
                      {step}
                    </span>
                    <ChevronDown 
                      className="w-5 h-5 text-purple-600 transition-transform duration-300 group-open:rotate-180"
                    />
                  </summary>

                  <div className="px-6 pb-6 pt-2 ml-14">
                    {processusDetails[phase.name as keyof typeof processusDetails]?.[
                      step as keyof (typeof processusDetails)[keyof typeof processusDetails]
                    ] && (
                      <div className="space-y-4">
                        {/* Description principale */}
                        <p className="text-gray-700">
                          {processusDetails[phase.name as keyof typeof processusDetails][step as string].description}
                        </p>
                        
                        {/* Points clés */}
                        <ul className="bg-purple-50 rounded-lg p-4 space-y-2">
                          {processusDetails[phase.name as keyof typeof processusDetails][step as string].points.map((point, index) => (
                            <li key={index} className="flex items-start gap-2 text-gray-700">
                              <svg className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </details>
              ))}
            </div>
          </div>
        ))}

        {/* Section des garanties */}
        <div className="mt-20 bg-gradient-to-br from-purple-600 to-purple-800 text-white p-8 rounded-2xl">
          <h3 className="text-2xl font-bold mb-6">Nos Garanties</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-xl font-semibold mb-4">Support et Maintenance</h4>
              <p className="text-purple-100 mb-4">
                Durée : {siteConfig.garanties.duree}
              </p>
              <ul className="space-y-3">
                {siteConfig.garanties.inclus.map((garantie, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{garantie}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-4">Support Discord</h4>
              <ul className="space-y-3">
                {siteConfig.garanties.support.avantages.map((avantage, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{avantage}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}