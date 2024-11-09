"use client";
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function CTA() {
  return (
    <div className="relative">
      {/* Effet Aurora avec gradient */}
      <div className="max-w-6xl rounded-2xl mb-24 mx-auto px-6 py-20 relative">
        <div className={cn(`
          [--white-gradient:repeating-linear-gradient(100deg,var(--purple-600)_0%,var(--purple-600)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--purple-900)_16%)]
          [--dark-gradient:repeating-linear-gradient(100deg,var(--purple-800)_0%,var(--purple-800)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--purple-900)_16%)]
          [--aurora:repeating-linear-gradient(100deg,var(--purple-700)_10%,var(--purple-600)_15%,var(--purple-500)_20%,var(--purple-400)_25%,var(--purple-700)_30%)]
          [background-image:var(--white-gradient),var(--aurora)]
          dark:[background-image:var(--dark-gradient),var(--aurora)]
          [background-size:300%,_200%]
          [background-position:50%_50%,50%_50%]
          filter blur-[15px]
          after:content-[""] after:absolute after:inset-0 
          after:[background-image:var(--white-gradient),var(--aurora)] 
          after:dark:[background-image:var(--dark-gradient),var(--aurora)]
          after:[background-size:200%,_100%] 
          after:animate-aurora after:[background-attachment:fixed] 
          after:mix-blend-overlay
          pointer-events-none
          absolute inset-0 opacity-99 will-change-transform rounded-2xl
          [mask-image:radial-gradient(ellipse_at_100%_100%,black_90%,var(--transparent)_100%)]
        `)} />

        {/* Contenu */}
        <div className="relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
            Prêt à démarrer votre prochain projet ?
          </h2>
          
          <p className="text-xl md:text-2xl text-gray-200 mb-10">
            Discutons de vos idées et transformons-les en réalité.
          </p>

          <Link 
            href="/contact"
            className="group inline-flex items-center gap-2 bg-white text-purple-700 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
          >
            Contactez-moi
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
} 