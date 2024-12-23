import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, User } from 'lucide-react';

export default function Header({ pathname }: { pathname: string }) {

  const menuItems = ['Accueil', 'Processus', 'Projets', 'Solutions', 'Contact', 'Démarrer un projet'];

  const isActive = (item: string) => {
    if (item === 'Accueil') {
      return pathname === '/';
    }
    const normalizedPath = `/${item
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/ /g, '-')}`;
    return pathname === normalizedPath;
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 mt-4 px-4 before:content-[''] before:absolute before:inset-x-0 before:-top-8 before:h-10 before:bg-gradient-to-b before:from-[rgba(255,255,255,0.1)] before:to-transparent before:backdrop-blur-[12px] before:-z-10">
      <header className="max-w-6xl mx-auto bg-black/90 backdrop-blur-lg rounded-lg">
        <nav className="relative">
          <input type="checkbox" id="menu-toggle" className="peer hidden" />
          
          <div className="flex items-center justify-between py-1 px-2 sm:px-6 lg:px-8">
            <Link title='Accueil' href="/" className="text-foreground max-h-16">
              <Image
                src="/Bennydev.webp"
                alt="Logo du site"
                width={150}
                height={50}
                sizes="(max-width: 768px) 150px, 150px"
                className="h-16 w-32 object-cover rounded-lg"
                style={{ objectFit: 'cover' }}
                priority
              />
            </Link>

            <div className="hidden md:flex items-center space-x-8">
              {menuItems.map((item) => (
                <Link
                  title={item}
                  key={item}
                  href={item === 'Accueil' ? '/' : `/${item
                    .normalize('NFD')
                    .replace(/[\u0300-\u036f]/g, '')
                    .toLowerCase()
                    .replace(/ /g, '-')}`}
                  className={`relative text-gris-100 font-medium group px-4 py-2 transition-colors duration-200 rounded-md
                    ${isActive(item) ? 'bg-violet-500/20 text-violet-300' : ''}`}
                >
                  <span className="relative z-10">{item}</span>
                  <span className="absolute inset-0 w-0 bg-violet-500/20 group-hover:w-full transition-all duration-300 ease-out rounded-md" />
                </Link>
              ))}
              
              <Link
                href="/login"
                title="Connexion"
                className="relative text-gris-100 hover:text-violet-300 transition-colors duration-200 p-2 rounded-md hover:bg-violet-500/20"
              >
                <User className="w-5 h-5" />
              </Link>
            </div>

            <div className="md:hidden flex items-center gap-4">
              <Link
                href="/login"
                title="Connexion"
                className="text-gris-100 hover:text-violet-300 transition-colors duration-200"
              >
                <User className="w-5 h-5" />
              </Link>

              <label htmlFor="menu-toggle" className="cursor-pointer block w-6 h-6 relative">
                <Menu className="absolute w-6 h-6 text-gris-100 transition-opacity duration-300 peer-checked:opacity-0 opacity-100 [#menu-toggle:checked~div_&]:opacity-0" />
                <X className="absolute w-6 h-6 text-gris-100 transition-opacity duration-300 opacity-0 [#menu-toggle:checked~div_&]:opacity-100" />
              </label>
            </div>
          </div>

          <div className="grid md:hidden grid-rows-[0fr] peer-checked:grid-rows-[1fr] transition-all duration-300">
            <div className="overflow-hidden">
              <div className="px-4 pb-4 space-y-4">
                {menuItems.map((item) => {
                  const href = item === 'Accueil' ? '/' : `/${item
                    .normalize('NFD')
                    .replace(/[\u0300-\u036f]/g, '')
                    .toLowerCase()
                    .replace(/ /g, '-')}`;
                  return (
                    <div key={item} className="block">
                      <Link title={item} href={href} className={`block text-gris-100 hover:text-violet-300 transition-colors duration-200 px-4 py-2 rounded-md
                        ${isActive(item) ? 'bg-violet-500/20 text-violet-300' : ''}`}>
                        <label htmlFor="menu-toggle" className="cursor-pointer block w-full h-full">
                          {item}
                        </label>
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}