import Header from '../components/Header'
import Footer from '../components/Footer'
import { Button } from '../../components/ui/button'
import Link from 'next/link'
import Hero2 from '../components/Hero2'
import ChatButton from '../components/ChatButton'

export default function ContactSuccessPage() {
  return (
    <>
      <Header pathname={'/contact-success'} />
      <main className="relative bg-gradient-to-b from-purple-50 to-white min-h-screen">
        <Hero2 
          title="Message envoyé !"
          subtitle="Merci de m'avoir contacté"
        />
        
        <div className="max-w-6xl mx-auto px-4 lg:px-0 py-24 relative z-30">
          <div className="bg-white/90 backdrop-blur-3xl rounded-2xl p-12 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_40px_rgb(0,0,0,0.16)] transition-all duration-500">
            <div className="flex flex-col items-center">
              {/* Icône de succès */}
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-8">
                <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>

              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Merci pour votre message !
              </h1>
              
              <div className="w-16 h-1 bg-purple-500 rounded mb-6"></div>
              
              <p className="text-lg text-gray-600 text-center mb-8 max-w-2xl">
                Je vous remercie de m&apos;avoir contacté. Je m&apos;engage à vous répondre dans les plus brefs délais, généralement sous 24-48 heures ouvrées.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 w-full max-w-md">
                <Link href="/" className="flex-1">
                  <Button variant="outline" className="w-full group">
                    <span className="mr-2">←</span>
                    Retour à l&apos;accueil
                  </Button>
                </Link>
               
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <ChatButton />
    </>
  )
} 