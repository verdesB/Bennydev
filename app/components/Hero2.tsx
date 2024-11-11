export default function Hero2({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    
      <article className="max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-32 bg-transparent relative z-20">
        <div className="bg-purple-900  rounded-lg p-8">
          <div className="text-center">
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">{title}</h1>
            <p className="text-sm md:text-base text-gray-200">{subtitle}</p>
           
          </div>
        </div>
      </article>
   
  );
} 