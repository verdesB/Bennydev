import { siteConfig } from '../lib/site-config';
import { ChevronDown, Code, Bolt, Star, TrendingUp, Check, X, HelpCircle } from 'lucide-react';

interface ServiceStatus {
  statut: string;
  details: string;
}

// Objet pour mapper les noms d'icônes aux composants Lucide
const IconMap = {
  code: Code,
  bolt: Bolt,
  star: Star,
  trendingUp: TrendingUp,
};

// Types pour la configuration du site
interface FormuleDetails {
  icon: keyof typeof IconMap;
  titre: string;
  description: string;
  avantages: string[];
  isHighlighted: boolean;
}

interface StepDetails {
  description: string;
  points: string[];
}

interface PhaseSteps {
  [stepName: string]: StepDetails;
}

interface Processus {
  [phaseName: string]: PhaseSteps;
}

interface Garanties {
  duree: string;
  inclus: string[];
  support: {
    avantages: string[];
  };
}

interface PostDevelopment {
  formules: {
    [key: string]: FormuleDetails;
  };
}

// Composant pour afficher le statut
const StatusBadge = ({ status }: { status: string }) => {
  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Premium':
        return 'bg-purple-100 text-purple-800';
      case 'Avancé':
        return 'bg-blue-100 text-blue-800';
      case 'Standard':
        return 'bg-green-100 text-green-800';
      case 'Basique':
        return 'bg-yellow-100 text-yellow-800';
      case 'Limité':
        return 'bg-orange-100 text-orange-800';
      case 'Non inclus':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusStyle(status)}`}>
      {status}
    </span>
  );
};

export default function ProcessusSteps() {
  return (
    <section className="relative py-16 px-4 z-20 max-w-6xl mx-auto">
      <div className="max-w-6xl mx-auto">
        {Object.entries(siteConfig.processus as Processus).map(([phaseName, phaseSteps], phaseIndex) => (
          <div key={phaseIndex} className="mb-16 last:mb-0">
            {/* En-tête de phase */}
            <div className="flex items-center gap-4 mb-8">
              <div className="flex-shrink-0 w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center text-xl font-bold">
                {phaseIndex + 1}
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                {phaseName}
              </h2>
            </div>

            {/* Étapes de la phase */}
            <div className="grid gap-4">
              {Object.entries(phaseSteps).map(([stepName, stepDetails]: [string, StepDetails], stepIndex) => (
                <details 
                  key={stepIndex}
                  className="group bg-white rounded-xl shadow-[0_0_50px_rgba(139,92,246,0.1)] hover:shadow-[0_0_50px_rgba(139,92,246,0.2)] transition-all duration-300"
                >
                  <summary className="flex items-center gap-4 p-6 cursor-pointer list-none">
                    <div className="flex-shrink-0 w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center font-semibold">
                      {stepIndex + 1}
                    </div>
                    <span className="text-gray-900 font-medium flex-grow">
                      {stepName}
                    </span>
                    <ChevronDown 
                      className="w-5 h-5 text-purple-600 transition-transform duration-300 group-open:rotate-180"
                    />
                  </summary>

                  <div className="px-6 pb-6 pt-2 ml-14">
                    <div className="space-y-4">
                      {/* Description principale */}
                      <p className="text-gray-700">
                        {stepDetails.description}
                      </p>
                      
                      {/* Points clés */}
                      <ul className="bg-purple-50 rounded-lg p-4 space-y-2">
                        {stepDetails.points.map((point, index) => (
                          <li key={index} className="flex items-start gap-2 text-gray-700">
                            <svg className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </details>
              ))}
            </div>
          </div>
        ))}

        {/* Section des garanties */}
        <article className="mt-20 bg-gradient-to-br from-purple-600 to-purple-800 text-white p-8 rounded-2xl">
          <h3 className="text-2xl font-bold mb-6">Mes Garanties</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-xl font-semibold mb-4">Support et Maintenance</h4>
              <p className="text-purple-100 mb-4">
                Durée : {siteConfig.garanties.duree}
              </p>
              <ul className="space-y-3">
                {(siteConfig.garanties as Garanties).inclus.map((garantie: string, index: number) => (
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
              <h4 className="text-xl font-semibold mb-4">Support Bennydev</h4>
              <ul className="space-y-3">
                {(siteConfig.garanties as Garanties).support.avantages.map((avantage: string, index: number) => (
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
        </article>

        {/* Section Post-développement avec version mobile adaptée */}
        <article className="mt-20">
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center tracking-tight">
            Et après le développement, qu'est-ce qu'il se passe pour votre projet ?
          </h3>

          {/* Version Desktop */}
          <div className="hidden md:block overflow-x-auto rounded-2xl">
            <table className="w-full border-collapse table-fixed">
              <colgroup>
                <col/>
                {Object.entries(siteConfig.postDevelopment.formules).map(([key, formule]) => (
                  <col key={key}/>
                ))}
              </colgroup>
              <thead>
                <tr>
                  <th className="p-4 text-left bg-gray-50 border-b-2 border-gray-200"></th>
                  {Object.entries(siteConfig.postDevelopment.formules).map(([key, formule]) => {
                    const IconComponent = IconMap[formule.icon as keyof typeof IconMap];
                    return (
                      <th 
                        key={key}
                        className={`p-6 border-b-2 border-gray-200 ${
                          ('isHighlighted' in formule && formule.isHighlighted) ? 'bg-purple-50' : 'bg-gray-50'
                        }`}
                      >
                        <div className="flex flex-col items-center text-center gap-2">
                        <IconComponent className={`w-8 h-8 ${('isHighlighted' in formule && formule.isHighlighted) ? 'text-purple-600' : 'text-gray-600'}`} />
                          <h4 className="font-bold text-lg">{formule.titre}</h4>
                          <p className="text-sm text-gray-600 min-h-[40px]">{formule.description}</p>
                          <p className="font-bold text-xl mt-2">{('prixMensuel' in formule && formule.prixMensuel as string) || ''}</p>
                          <p className="text-sm text-gray-500">{('pourQui' in formule && formule.pourQui as string) || ''}</p>
                        </div>
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {Object.entries(siteConfig.postDevelopment.services).map(([serviceKey, service]) => (
                  <tr key={serviceKey} className="border-b border-gray-200">
                    <td className="py-6 px-6 bg-gray-50 font-medium align-top">
                      <div className="flex items-start gap-2">
                        {service.titre}
                        <HelpCircle className="w-4 h-4 text-gray-400 cursor-help flex-shrink-0" />
                      </div>
                    </td>
                    {['autoGeree', 'maintenance', 'toutInclus', 'evolution'].map((formuleKey) => (
                      <td 
                        key={formuleKey}
                        className={`py-6 px-6 align-top ${
                          formuleKey === 'toutInclus' ? 'bg-purple-50' : ''
                        }`}
                      >
                        <div className="space-y-3">
                          <StatusBadge status={
                            (typeof service[formuleKey as keyof typeof service] !== 'string' && 
                            'statut' in (service[formuleKey as keyof typeof service] as object) && 
                            ((service[formuleKey as keyof typeof service] as ServiceStatus).statut)) || ''
                          } />
                          <p className="text-sm text-gray-600 whitespace-pre-line">
                            {(() => {
                              const serviceValue = service[formuleKey as keyof typeof service];
                              return (typeof serviceValue === 'object' && serviceValue && 'details' in serviceValue) 
                                ? (serviceValue as ServiceStatus).details 
                                : '';
                            })()}
                          </p>
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Version Mobile - Une offre par carte */}
          <div className="md:hidden space-y-8">
            {Object.entries(siteConfig.postDevelopment.formules).map(([key, formule]) => {
              const IconComponent = IconMap[formule.icon as keyof typeof IconMap];
              return (
                <div 
                  key={key}
                  className={`rounded-xl overflow-hidden shadow-lg ${
                    ('isHighlighted' in formule && formule.isHighlighted) ? 'border-2 border-purple-200' : 'border border-gray-200'
                  }`}
                >
                  {/* En-tête de la formule */}
                  <div className={`p-6 ${('isHighlighted' in formule && formule.isHighlighted) ? 'bg-purple-50' : 'bg-gray-50'}`}>
                    <div className="flex flex-col items-center text-center gap-3">
                      <IconComponent className={`w-8 h-8 ${('isHighlighted' in formule && formule.isHighlighted) ? 'text-purple-600' : 'text-gray-600'}`} />
                      <h4 className="font-bold text-xl">{formule.titre}</h4>
                      <p className="text-gray-600">{formule.description}</p>
                      <p className="font-bold text-2xl text-purple-600">{('prixMensuel' in formule && formule.prixMensuel as string) || ''}</p>
                      <p className="text-sm text-gray-500">{('pourQui' in formule && formule.pourQui as string) || ''}</p>
                    </div>
                  </div>

                  {/* Liste des services */}
                  <div className="divide-y divide-gray-200">
                    {Object.entries(siteConfig.postDevelopment.services).map(([serviceKey, service]) => (
                      <div key={serviceKey} className="p-4 space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{service.titre}</span>
                            <HelpCircle className="w-4 h-4 text-gray-400" />
                          </div>
                          <StatusBadge status={
                            (typeof service[key as keyof typeof service] !== 'string' && 
                            'statut' in (service[key as keyof typeof service] as object) && 
                            ((service[key as keyof typeof service] as ServiceStatus).statut)) || ''
                          } />
                        </div>
                        <p className="text-sm text-gray-600">
                          {(() => {
                            const serviceValue = service[key as keyof typeof service];
                            return (typeof serviceValue === 'object' && serviceValue && 'details' in serviceValue) 
                              ? (serviceValue as ServiceStatus).details 
                              : '';
                          })()}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Pied de carte */}
                  <div className="p-4 bg-gray-50 text-center">
                    <button className="bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700 transition-colors">
                      En savoir plus
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Note de bas de tableau */}
          <p className="mt-4 text-sm text-gray-500 italic text-center">
            * Les prix indiqués sont HT et peuvent varier selon vos besoins spécifiques.
            N'hésitez pas à me contacter pour obtenir un devis personnalisé.
          </p>
        </article>
      </div>
    </section>
  );
}