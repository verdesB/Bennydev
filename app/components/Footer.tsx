import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin, Linkedin, Github } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black/90 backdrop-blur-sm text-gray-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo et Description */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center">
              <Image
                src="/Bennydev.webp"
                alt="BennyDev Logo"
                width={100}
                height={100}
                className="object-contain"
              />
              
            </Link>
            <p className="mt-4 text-gray-400">
              Création de sites web et d&apos;applications sur mesure. 
              Expert en développement web moderne et performant.
            </p>
            <div className="mt-6 flex space-x-4">
              <a 
                href="https://linkedin.com/in/votre-profil" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-purple-500 transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a 
                href="https://github.com/votre-profil" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-purple-500 transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Navigation Rapide */}
          <div>
            <h3 className="text-white font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2">
              {['Accueil', 'À propos', 'Services', 'Projets', 'Contact'].map((item) => (
                <li key={item}>
                  <Link 
                    href={item === 'Accueil' ? '/' : `/${item.toLowerCase().replace('à ', '')}`}
                    className="text-gray-400 hover:text-purple-500 transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-3">
              <li>
                <a 
                  href="mailto:contact@bennydev.fr"
                  className="flex items-center text-gray-400 hover:text-purple-500 transition-colors"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  contact@bennydev.fr
                </a>
              </li>
              <li>
                <a 
                  href="tel:+33612345678"
                  className="flex items-center text-gray-400 hover:text-purple-500 transition-colors"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  +33 6 12 34 56 78
                </a>
              </li>
              <li className="flex items-center text-gray-400">
                <MapPin className="w-4 h-4 mr-2" />
                Montpellier, France
              </li>
            </ul>
          </div>
        </div>

        {/* Séparateur */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {currentYear} BennyDev. Tous droits réservés.
            </p>
            <div className="mt-4 md:mt-0 flex space-x-6 text-sm">
              <Link 
                href="/mentions-legales" 
                className="text-gray-400 hover:text-purple-500 transition-colors"
              >
                Mentions légales
              </Link>
              <Link 
                href="/politique-confidentialite" 
                className="text-gray-400 hover:text-purple-500 transition-colors"
              >
                Politique de confidentialité
              </Link>
              <Link 
                href="/cgv" 
                className="text-gray-400 hover:text-purple-500 transition-colors"
              >
                CGV
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 