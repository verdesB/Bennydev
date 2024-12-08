import { Mail, MapPin, Linkedin, Github, Clock } from 'lucide-react';
import { siteConfig } from '../lib/site-config';
import { sendEmail } from './actions';
import Hero2 from '@/app/components/Hero2';
import Header from '../components/Header';
import ChatButton from '../components/ChatButton';
import Footer from '../components/Footer';

export const metadata = {
  title: 'Contact',
  description: 'Contactez-moi pour discuter de vos projets de développement web. Disponible pour des missions freelance en développement front-end et back-end.',
};

export default function ContactPage() {
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

      <div className="relative z-20 flex flex-col gap-12 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        {/* Formulaire */}
        <div className="bg-white rounded-2xl p-8 shadow-[0_0_50px_rgba(139,92,246,0.1)]">
          <form action={sendEmail} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Nom complet
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                Sujet
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              />
            </div>

            <button
              type="submit"
              className="w-full px-8 py-4 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transform hover:scale-105 transition-all duration-200"
            >
              Envoyer le message
            </button>
          </form>
        </div>

        {/* Informations de contact */}
        <div className="space-y-8">
          <div className="bg-white rounded-2xl p-8 shadow-[0_0_50px_rgba(139,92,246,0.1)]">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              Autres moyens de me contacter
            </h3>
            <div className="space-y-4">
              <a href={`mailto:${siteConfig.companyInfo.contact.email}`} className="flex items-center space-x-3 text-gray-600 hover:text-purple-600">
                <Mail className="w-5 h-5" />
                <span>{siteConfig.companyInfo.contact.email}</span>
              </a>
              <div className="flex items-center space-x-3 text-gray-600">
                <MapPin className="w-5 h-5" />
                <span>{siteConfig.companyInfo.location}</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-600">
                <Clock className="w-5 h-5" />
                <span>{siteConfig.companyInfo.contact.supportHours}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-[0_0_50px_rgba(139,92,246,0.1)]">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              Réseaux sociaux
            </h3>
            <div className="flex space-x-4">
              <a title='Linkedin' href={siteConfig.companyInfo.contact.linkedin} target="_blank" rel="noopener noreferrer" className="p-3 bg-gray-100 rounded-lg hover:bg-purple-100 transition-colors">
                <Linkedin className="w-6 h-6 text-gray-600 hover:text-purple-600" />
              </a>
              <a title='Github' href={siteConfig.companyInfo.contact.github} target="_blank" rel="noopener noreferrer" className="p-3 bg-gray-100 rounded-lg hover:bg-purple-100 transition-colors">
                <Github className="w-6 h-6 text-gray-600 hover:text-purple-600" />
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