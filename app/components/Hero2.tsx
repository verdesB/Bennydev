import Image from 'next/image';

export default function Hero2({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <article className="max-w-6xl  mx-auto px-4 mx-4 sm:px-4 lg:px-4 xl:px-0 pt-28  relative z-20">
      <div className="relative rounded-lg overflow-hidden">
        {/* Image d'arrière-plan optimisée */}
        <Image
          src="/gradient.webp"
          alt="Background gradient"
          width={1200}
      
          height={400}
          priority
          className="absolute inset-0 w-full h-full object-cover"
          quality={90}
        />
        
        {/* Overlay pour assurer la lisibilité du texte */}
        

        {/* Contenu */}
        <div className="relative z-10 p-8">
          <div className="text-center">
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2 tracking-tight">{title}</h1>
            <p className="text-sm md:text-base text-gray-200">{subtitle}</p>
          </div>
        </div>
      </div>
    </article>
  );
} 