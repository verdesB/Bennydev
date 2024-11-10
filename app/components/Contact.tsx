"use client";
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

import { SparklesCore } from './ui/sparkles';

export default function CTA() {
  return (
    <div className="relative overflow-hidden max-w-6xl mx-4 xl:mx-auto rounded-2xl my-16  h-full">
      {/* SparklesCore avec le z-index le plus bas */}
      <SparklesCore
        className="absolute inset-0 w-full h-full rounded-2xl pointer-events-none z-10 "
        background="rgba(0,0,0,0.85)"
        particleColor="#8b5cf6"
        particleDensity={100}
        speed={2}
        minSize={0.6}
        maxSize={1.4}
      />

      {/* Div avec les effets violets en z-index intermédiaire */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
        <div className="absolute top-[50%] w-[600px] h-[600px] bg-purple-500/40 blur-[80px] rounded-full" />
        <div className="absolute top-[50%] w-[400px] h-[400px] bg-purple-400/50 blur-[60px] rounded-full" />
      </div>

      {/* Contenu et bouton avec le z-index le plus élevé */}
      <div className="max-w-6xl rounded-2xl mb-24 mx-auto px-6 py-20 relative overflow-hidden backdrop-blur-s z-30">
        <div className="relative text-center rounded-2xl">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
            Prêt à démarrer votre prochain projet ?
          </h2>
          
          <p className="text-xl md:text-2xl text-gray-200 mb-10">
            Discutons de vos idées et transformons-les en réalité.
          </p>

          <Link 
            href="/contact"
            className="group relative inline-flex items-center gap-2 bg-white text-purple-700 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
          >
            Contactez-moi
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}