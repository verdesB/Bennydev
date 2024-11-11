import React from 'react';

interface EtapeProps {
  numero: string;
  titre: string;
  description: string;
}

interface OffreDepartProps {
  titre: string;
  sousTitre: string;
  prix: string;
  etapes: EtapeProps[];
  inclus: string[];
}

const Etape: React.FC<EtapeProps> = ({ numero, titre, description }) => (
  <div className="flex gap-6 items-start">
    <div className="flex-shrink-0 w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center text-xl font-bold">
      {numero}
    </div>
    <div>
      <h3 className="text-xl font-semibold mb-2">{titre}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  </div>
);

export default function OffreDepart({ titre, sousTitre, prix, etapes, inclus }: OffreDepartProps) {
  return (
    <section className="py-16 px-4 max-w-6xl mx-auto">
      <div className="max-w-6xl bg-gradient-to-br from-purple-600 to-purple-800 text-white py-12 mx-auto rounded-2xl mb-16 shadow-xl">
        <h2 className="text-4xl font-bold text-center mb-6">{titre}</h2>
        <p className="text-purple-100 text-center mb-8 max-w-2xl mx-auto text-lg">
          {sousTitre}
        </p>
        <div className="flex justify-center">
          <div className="bg-white text-purple-800 px-6 py-3 rounded-full font-semibold hover:bg-purple-100 transition-colors cursor-pointer">
            {prix}
          </div>
        </div>
      </div>
      
      <div className="grid gap-12 mt-8">
        {etapes.map((etape, index) => (
          <div key={index} className="transform hover:scale-105 transition-transform duration-300">
            <Etape {...etape} />
          </div>
        ))}
      </div>

      <div className="relative z-20 mt-16 bg-gradient-to-br from-purple-50 to-white p-8 rounded-2xl shadow-lg border border-purple-100">
        <h3 className="text-2xl font-semibold mb-6 text-center text-purple-800">La solution dans ces grands axes :</h3>
        <ul className="grid md:grid-cols-2 gap-6">
          {inclus.map((item, index) => (
            <li key={index} className="flex items-center gap-3 bg-white p-4 rounded-lg shadow-sm">
              <svg className="w-6 h-6 text-purple-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-gray-700">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
} 