import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 mt-8 px-4">
      <header className="max-w-6xl mx-auto bg-black/90 backdrop-blur-sm rounded-lg">
        <nav className="flex items-center justify-between py-4 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center">
            <Link href="/" className="text-foreground">
              <Image
                src="/bd.webp"
                alt="Logo du site"
                width={50}
                height={50}
                className="object-contain rounded-lg"
                priority
              />
            </Link>
          </div>
          
          {/* Menu pour desktop */}
          <div className="hidden md:flex items-center space-x-8">
            {['Accueil', 'À propos', 'Projets','Solutions', 'Contact'].map((item) => (
              <Link
                key={item}
                href={item === 'Accueil' ? '/' : `/${item.toLowerCase().replace('à ', '')}`}
                className="relative text-gris-100 font-medium group px-4 py-2 hover:text-white transition-colors duration-200"
              >
                <span className="relative z-10">{item}</span>
                <span className="absolute inset-0 w-0 bg-gris-700 group-hover:w-full transition-all duration-300 ease-out rounded-md opacity-30" />
              </Link>
            ))}
          </div>

          {/* Menu burger pour mobile */}
          <button className="md:hidden text-gris-100 hover:text-white transition-colors duration-200">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </nav>
      </header>
    </div>
  );
} 