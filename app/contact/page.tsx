import { Mail, MapPin, Linkedin, Github, Clock } from 'lucide-react';
import { siteConfig } from '../lib/site-config';
import Hero2 from '@/app/components/Hero2';
import Header from '../components/Header';
import ChatButton from '../components/ChatButton';
import Footer from '../components/Footer';
 
import ContactForm from '@/app/components/ContactForm';

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
              <a 
                title='Github' 
                href={siteConfig.companyInfo.contact.github} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 hover:text-gray-900 transition-all duration-300"
              >
                <Github className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
    <Footer />
    <ChatButton />
    </>
  );
} 