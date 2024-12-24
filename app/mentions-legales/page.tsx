import Hero2 from '@/app/components/Hero2';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ChatButton from '../components/ChatButton';

export const metadata = {
  title: 'Mentions Légales',
  description: 'Mentions légales et informations juridiques de BennyDev, développeur web freelance.',
};

export default function MentionsLegales() {
  return (
    <>
      <Header pathname={'/mentions-legales'} />
      <main className="relative bg-gradient-to-b from-purple-50 to-white min-h-screen">
        <Hero2 
          title="Mentions Légales"
          subtitle="Informations juridiques et légales"
        />
        
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-0 pt-16 z-10">
          <div className="grid grid-cols-4 gap-6">
            {/* Identité - Span 2 colonnes */}
            <section className="md:col-span-2 bg-white/80 backdrop-blur-2xl rounded-xl p-8 shadow-[0_0_20px_rgba(0,0,0,0.08)] hover:shadow-[0_0_60px_rgba(0,0,0,0.12)] transition-all duration-500">
              <h2 className="text-2xl font-semibold mb-4">Identité</h2>
              <div className="space-y-2 text-gray-600">
                <p>Nom : Verdès Benjamin</p>
                <p>Statut : Micro-entreprise</p>
                <p>SIRET : En cours de création</p>
                <p>Adresse : 7 place des érables, 78260 Achères, France</p>
                <p>Email : verdes.benjamin@bennydev.fr</p>
              </div>
            </section>

            {/* Hébergement */}
            <section className="col-span-2 bg-white/80 backdrop-blur-2xl rounded-xl p-8 shadow-[0_0_20px_rgba(0,0,0,0.08)] hover:shadow-[0_0_60px_rgba(0,0,0,0.12)] transition-all duration-500">
              <h2 className="text-2xl font-semibold mb-4">Hébergement</h2>
              <div className="space-y-2 text-gray-600">
                <p>Ce site est hébergé par :</p>
                <p>Vercel Inc.</p>
                <p>440 N Barranca Ave #4133</p>
                <p>Covina, CA 91723</p>
                <p>États-Unis</p>
              </div>
            </section>

            {/* Propriété intellectuelle */}
            <section className="col-span-4 bg-white/80 backdrop-blur-2xl rounded-xl p-8 shadow-[0_0_20px_rgba(0,0,0,0.08)] hover:shadow-[0_0_60px_rgba(0,0,0,0.12)] transition-all duration-500">
              <h2 className="text-2xl font-semibold mb-4">Propriété intellectuelle</h2>
              <div className="space-y-4 text-gray-600">
                <p>L&apos;ensemble de ce site relève de la législation française et internationale sur le droit d&apos;auteur et la propriété intellectuelle. Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.</p>
                <p>La reproduction de tout ou partie de ce site sur quelque support que ce soit est formellement interdite sauf autorisation expresse de BennyDev.</p>
              </div>
            </section>

            {/* Données personnelles - Span 2 colonnes */}
            <section className="md:col-span-2 bg-white/80 backdrop-blur-2xl rounded-xl p-8 shadow-[0_0_20px_rgba(0,0,0,0.08)] hover:shadow-[0_0_60px_rgba(0,0,0,0.12)] transition-all duration-500">
              <h2 className="text-2xl font-semibold mb-4">Protection des données personnelles</h2>
              <div className="space-y-4 text-gray-600">
                <p>Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez d&apos;un droit d&apos;accès, de rectification et de suppression des données vous concernant.</p>
                <p>Pour exercer ces droits ou pour toute question sur le traitement de vos données, vous pouvez nous contacter à l&apos;adresse : contact@bennydev.fr</p>
              </div>
            </section>

            {/* Cookies */}
            <section className="md:col-span-2 bg-white/80 backdrop-blur-2xl rounded-xl p-8 shadow-[0_0_20px_rgba(0,0,0,0.08)] hover:shadow-[0_0_60px_rgba(0,0,0,0.12)] transition-all duration-500">
              <h2 className="text-2xl font-semibold mb-4">Cookies</h2>
              <div className="space-y-4 text-gray-600">
                <p>Ce site utilise des cookies pour améliorer l&apos;expérience utilisateur. En continuant à naviguer sur ce site, vous acceptez leur utilisation.</p>
                <p>Les cookies sont utilisés uniquement à des fins techniques et analytiques.</p>
              </div>
            </section>
          </div>
        </div>

        <div className="absolute inset- bg-[linear-gradient(rgba(139,92,246,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] -z-1" />
      </main>
      <Footer />
      <ChatButton />
    </>
  );
}
