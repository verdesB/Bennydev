import { Mail, MapPin, Linkedin, Clock } from 'lucide-react';
import { siteConfig } from '../lib/site-config';
import Hero2 from '@/app/components/Hero2';
import Header from '../components/Header';
import ChatButton from '../components/ChatButton';
import Footer from '../components/Footer';
 
import ContactForm from '@/app/components/ContactForm';
import { SparklesCore } from '../components/ui/sparkles';

export const metadata = {
  title: 'Contact',
  description: 'Contactez-moi pour discuter de vos projets de développement web. Disponible pour des missions freelance en développement front-end et back-end.',
};

export default async function ContactPage() {
  return (
    <>
    <Header pathname={'/contact'} />  
    <main className="relative bg-gradient-to-b from-purple-50 to-white min-h-screen">

      <div className="mb-16">
        <Hero2 
          title="Contactez-moi"
          subtitle="Une idée de projet ? N'hésitez pas à me contacter pour en discuter"
        />
      </div>

      <div className="relative z-20 grid grid-cols-1 lg:grid-cols-[1.8fr,1fr] gap-12 max-w-6xl mx-auto px-4 sm:px-6 lg:px-0 pb-32">
        {/* Formulaire à gauche */}
        <div className="bg-white/80 backdrop-blur-2xl rounded-xl p-8 sm:p-16 shadow-[0_0_50px_rgba(0,0,0,0.08)] hover:shadow-[0_0_60px_rgba(0,0,0,0.12)] transition-all duration-500">
          <h2 className="text-2xl sm:text-3xl font-medium text-gray-900 mb-2">Parlons de votre projet</h2>
          <p className="text-gray-500 mb-8 sm:mb-12">Remplissez le formulaire ci-dessous, je vous répondrai dans les plus brefs délais.</p>
          <ContactForm />
        </div>

        {/* Section contact à droite */}
        <div className="grid grid-cols-2 sm:grid-cols-1 gap-8">
          <div className="col-span-2 sm:col-span-1 bg-white/80 backdrop-blur-2xl rounded-xl p-8 sm:p-10 shadow-[0_0_50px_rgba(0,0,0,0.08)] hover:shadow-[0_0_60px_rgba(0,0,0,0.12)] transition-all duration-500">
            <h3 className="text-lg sm:text-xl font-medium text-gray-900 mb-6 sm:mb-8">
              Contact direct
            </h3>
            <div className="space-y-6 sm:space-y-8">
              <a 
                href={`mailto:${siteConfig.companyInfo.contact.email}`} 
                className="flex items-center space-x-4 text-gray-600 hover:text-gray-900 transition-colors p-4 rounded-xl hover:bg-gray-50/50"
              >
                <div className="p-3 bg-gray-100 rounded-lg">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Email</p>
                  <span className="text-sm">{siteConfig.companyInfo.contact.email}</span>
                </div>
              </a>
              
              <div className="flex items-center space-x-4 text-gray-600 p-4 rounded-xl">
                <div className="p-3 bg-gray-100 rounded-lg">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Localisation</p>
                  <span className="text-sm">{siteConfig.companyInfo.location}</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 text-gray-600 p-4 rounded-xl">
                <div className="p-3 bg-gray-100 rounded-lg">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Disponibilité</p>
                  <span className="text-sm">{siteConfig.companyInfo.contact.supportHours}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-2 sm:col-span-1 bg-white/80 backdrop-blur-2xl rounded-xl p-8 sm:p-10 shadow-[0_0_50px_rgba(0,0,0,0.08)] hover:shadow-[0_0_60px_rgba(0,0,0,0.12)] transition-all duration-500">
            <h3 className="text-lg sm:text-xl font-medium text-gray-900 mb-6 sm:mb-8">
              Réseaux sociaux
            </h3>
            <div className="flex space-x-4">
              <a 
                title='Linkedin' 
                href={siteConfig.companyInfo.contact.linkedin} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-4 bg-gray-50 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-all duration-300"
              >
                <Linkedin className="w-6 h-6" />
              </a>
              
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-0 pb-32 relative z-20">
        <div className="bg-gradient-to-r from-black to-purple-900 rounded-2xl p-8 sm:p-12 relative overflow-hidden">
          {/* Effet de lumière violette */}
          <div className="absolute -right-36 bottom-0 w-64 h-64 bg-pink-500/100 rounded-full blur-[80px] z-9"></div>
          
          {/* Déplacer SparklesCore avant le backdrop-blur */}
          <SparklesCore
        className="absolute inset-0 w-full h-full rounded-2xl pointer-events-none z-10 "
        background="transparent"
        particleColor="#8b5cf6"
        particleDensity={100}
        speed={2}
        minSize={0.6}
        maxSize={1.4}
      />
          
          {/* Effet de blur/glow */}
          <div className="absolute inset-0 bg-purple-500/20 backdrop-blur-xl"></div>
          
          {/* Contenu */}
          <div className="relative z-30">
            <h3 className="text-2xl sm:text-3xl font-medium text-white mb-4">
              Démarrez un projet
            </h3>
            <p className="text-purple-100 text-lg max-w-2xl mb-8">
              Remplissez le formulaire &quot;Démarrer un projet&quot; pour me permettre de bien comprendre vos besoins et vous proposer une solution adaptée à votre projet.
            </p>
            <a 
              href="/demarrer-un-projet" 
              className="inline-flex items-center px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors duration-200"
            >
              Démarrer un projet
              <svg className="w-5 h-5 ml-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </main>
    <Footer />
    <ChatButton />
    </>
  );
} 