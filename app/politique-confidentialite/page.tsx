import Hero2 from '@/app/components/Hero2';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ChatButton from '../components/ChatButton';

export const metadata = {
  title: 'Politique de Confidentialité',
  description: 'Politique de confidentialité et protection des données personnelles de BennyDev.',
};

export default function PolitiqueConfidentialite() {
  return (
    <>
      <Header pathname={'/politique-confidentialite'} />
      <main className="relative bg-gradient-to-b from-purple-50 to-white min-h-screen">
        <Hero2 
          title="Politique de Confidentialité"
          subtitle="Protection de vos données personnelles"
        />
        
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-0 py-16 z-10">
          <div className="grid grid-cols-4 gap-6">
            {/* Introduction */}
            <section className="col-span-4 bg-white/80 backdrop-blur-2xl rounded-xl p-8 shadow-[0_0_20px_rgba(0,0,0,0.08)] hover:shadow-[0_0_60px_rgba(0,0,0,0.12)] transition-all duration-500">
              <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
              <div className="space-y-4 text-gray-600">
                <p>Chez BennyDev, nous accordons une grande importance à la protection de vos données personnelles. Cette politique de confidentialité explique comment nous collectons, utilisons et protégeons vos informations personnelles.</p>
              </div>
            </section>

            {/* Collecte des données */}
            <section className="col-span-2 bg-white/80 backdrop-blur-2xl rounded-xl p-8 shadow-[0_0_20px_rgba(0,0,0,0.08)] hover:shadow-[0_0_60px_rgba(0,0,0,0.12)] transition-all duration-500">
              <h2 className="text-2xl font-semibold mb-4">Données collectées</h2>
              <div className="space-y-4 text-gray-600">
                <p>Nous collectons les informations suivantes :</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Informations de contact (nom, email, téléphone)</li>
                  <li>Messages envoyés via le formulaire de contact</li>
                  <li>Données de navigation anonymisées</li>
                  <li>Informations relatives à votre projet via le formulaire de création de projet :
                    <ul className="list-circle pl-5 mt-2 space-y-1">
                      <li>Type de projet</li>
                      <li>Budget estimé</li>
                      <li>Délais souhaités</li>
                      <li>Description détaillée du projet</li>
                      <li>Références et inspirations</li>
                    </ul>
                  </li>
                </ul>
                <p className="mt-4 text-sm">
                  <strong>Important :</strong> Les informations de votre projet ne sont pas stockées dans une base de données. 
                  Elles sont temporairement conservées sous forme de fichiers markdown (.md) uniquement dans le but de traiter 
                  votre demande. Ces fichiers sont automatiquement supprimés après le traitement de votre demande.
                </p>
              </div>
            </section>

            {/* Utilisation des données */}
            <section className="col-span-2 bg-white/80 backdrop-blur-2xl rounded-xl p-8 shadow-[0_0_20px_rgba(0,0,0,0.08)] hover:shadow-[0_0_60px_rgba(0,0,0,0.12)] transition-all duration-500">
              <h2 className="text-2xl font-semibold mb-4">Utilisation des données</h2>
              <div className="space-y-4 text-gray-600">
                <p>Vos données sont utilisées pour :</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Répondre à vos demandes</li>
                  <li>Établir des devis personnalisés</li>
                  <li>Analyser vos besoins en développement web</li>
                  <li>Améliorer nos services</li>
                  <li>Vous recontacter concernant votre projet</li>
                </ul>
                <p className="mt-4 text-sm">
                  Les informations de votre projet sont uniquement utilisées pour comprendre vos besoins 
                  et vous proposer une solution adaptée. Elles ne sont jamais partagées avec des tiers 
                  et sont supprimées une fois le projet traité.
                </p>
              </div>
            </section>

            {/* Protection des données */}
            <section className="col-span-4 bg-white/80 backdrop-blur-2xl rounded-xl p-8 shadow-[0_0_20px_rgba(0,0,0,0.08)] hover:shadow-[0_0_60px_rgba(0,0,0,0.12)] transition-all duration-500">
              <h2 className="text-2xl font-semibold mb-4">Protection des données</h2>
              <div className="space-y-4 text-gray-600">
                <p>Nous mettons en œuvre des mesures de sécurité appropriées pour protéger vos données personnelles contre tout accès, modification, divulgation ou destruction non autorisée.</p>
                <p>Vos données sont stockées sur des serveurs sécurisés et ne sont accessibles qu'aux personnes autorisées.</p>
              </div>
            </section>

            {/* Droits des utilisateurs */}
            <section className="col-span-2 bg-white/80 backdrop-blur-2xl rounded-xl p-8 shadow-[0_0_20px_rgba(0,0,0,0.08)] hover:shadow-[0_0_60px_rgba(0,0,0,0.12)] transition-all duration-500">
              <h2 className="text-2xl font-semibold mb-4">Vos droits</h2>
              <div className="space-y-4 text-gray-600">
                <p>Conformément au RGPD, vous disposez des droits suivants :</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Droit d'accès à vos données</li>
                  <li>Droit de rectification</li>
                  <li>Droit à l'effacement</li>
                  <li>Droit à la portabilité</li>
                </ul>
              </div>
            </section>

            {/* Contact */}
            <section className="col-span-2 bg-white/80 backdrop-blur-2xl rounded-xl p-8 shadow-[0_0_20px_rgba(0,0,0,0.08)] hover:shadow-[0_0_60px_rgba(0,0,0,0.12)] transition-all duration-500">
              <h2 className="text-2xl font-semibold mb-4">Nous contacter</h2>
              <div className="space-y-4 text-gray-600">
                <p>Pour toute question concernant vos données personnelles :</p>
                <p>Email : verdes.benjamin@bennydev.fr</p>
                <p>Adresse : 7 place des érables, 78260 Achères, France</p>
              </div>
            </section>
          </div>
        </div>

        <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] -z-1" />
      </main>
      <Footer />
      <ChatButton />
    </>
  );
} 