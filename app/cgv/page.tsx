import Hero2 from '@/app/components/Hero2';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ChatButton from '../components/ChatButton';

export const metadata = {
  title: 'Conditions Générales de Vente',
  description: 'Conditions générales de vente des prestations de développement web et de maintenance de BennyDev.',
};

export default function CGV() {
  return (
    <>
      <Header pathname={'/cgv'} />
      <main className="relative bg-gradient-to-b from-purple-50 to-white min-h-screen">
        <Hero2 
          title="Conditions Générales de Vente"
          subtitle="Prestations de développement web et maintenance"
        />
        
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {/* Préambule - toujours pleine largeur */}
            <section className="col-span-1 md:col-span-2 lg:col-span-4 bg-white/80 backdrop-blur-2xl rounded-xl p-4 sm:p-8 shadow-[0_0_20px_rgba(0,0,0,0.08)] hover:shadow-[0_0_60px_rgba(0,0,0,0.12)] transition-all duration-500">
              <h2 className="text-2xl font-semibold mb-4">Article 1 - Préambule</h2>
              <div className="space-y-4 text-gray-600">
                <p>Les présentes conditions générales de vente s'appliquent à toutes les prestations de services conclues entre BennyDev, micro-entreprise représentée par M. Verdès Benjamin, et ses clients professionnels ou particuliers.</p>
                <p>Ces conditions générales de vente sont systématiquement communiquées avant toute conclusion de contrat de prestations de services.</p>
              </div>
            </section>

            {/* Services - toujours pleine largeur */}
            <section className="col-span-1 md:col-span-2 lg:col-span-4 bg-white/80 backdrop-blur-2xl rounded-xl p-4 sm:p-8 shadow-[0_0_20px_rgba(0,0,0,0.08)] hover:shadow-[0_0_60px_rgba(0,0,0,0.12)] transition-all duration-500">
              <h2 className="text-2xl font-semibold mb-4">Article 2 - Services proposés</h2>
              <div className="space-y-4 text-gray-600">
                <h3 className="text-xl font-medium mb-2">2.1 Développement web</h3>
                <p>Les prestations de développement comprennent la création de :</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Sites web sur mesure</li>
                  <li>Applications web</li>
                  <li>Interfaces utilisateur</li>
                  <li>API et services backend</li>
                </ul>

                <h3 className="text-xl font-medium mt-6 mb-2">2.2 Maintenance et suivi</h3>
                <p>Trois formules de maintenance sont proposées :</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Formule Essentielle : maintenance préventive mensuelle</li>
                  <li>Formule Avancée : maintenance préventive et corrective</li>
                  <li>Formule Premium : maintenance complète et évolutions</li>
                </ul>
              </div>
            </section>

            {/* Tarifs et Paiement - demi largeur sur desktop */}
            <section className="col-span-1 md:col-span-1 lg:col-span-2 bg-white/80 backdrop-blur-2xl rounded-xl p-4 sm:p-8 shadow-[0_0_20px_rgba(0,0,0,0.08)] hover:shadow-[0_0_60px_rgba(0,0,0,0.12)] transition-all duration-500">
              <h2 className="text-2xl font-semibold mb-4">Article 3 - Tarifs et paiement</h2>
              <div className="space-y-4 text-gray-600">
                <h3 className="text-xl font-medium mb-2">3.1 Tarifs</h3>
                <p>Les prix sont exprimés en euros, HT et TTC. Un devis détaillé est établi pour chaque projet.</p>
                
                <h3 className="text-xl font-medium mt-6 mb-2">3.2 Modalités de paiement</h3>
                <p>Pour les projets de développement :</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>30% à la commande</li>
                  <li>40% au premier livrable</li>
                  <li>30% à la livraison finale</li>
                </ul>

                <p className="mt-4">Pour les services de maintenance :</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Facturation mensuelle</li>
                  <li>Paiement à 30 jours</li>
                </ul>
              </div>
            </section>

            {/* Délais et Livraison - demi largeur sur desktop */}
            <section className="col-span-1 md:col-span-1 lg:col-span-2 bg-white/80 backdrop-blur-2xl rounded-xl p-4 sm:p-8 shadow-[0_0_20px_rgba(0,0,0,0.08)] hover:shadow-[0_0_60px_rgba(0,0,0,0.12)] transition-all duration-500">
              <h2 className="text-2xl font-semibold mb-4">Article 4 - Délais et livraison</h2>
              <div className="space-y-4 text-gray-600">
                <p>Les délais de livraison sont indiqués dans le devis et démarrent à compter de la réception du premier acompte.</p>
                <p>La livraison est considérée comme effectuée lors de la mise en ligne du projet ou du transfert des fichiers sources.</p>
                <p>Un procès-verbal de livraison sera établi et signé par les deux parties.</p>
              </div>
            </section>

            {/* Propriété intellectuelle - toujours pleine largeur */}
            <section className="col-span-1 md:col-span-2 lg:col-span-4 bg-white/80 backdrop-blur-2xl rounded-xl p-4 sm:p-8 shadow-[0_0_20px_rgba(0,0,0,0.08)] hover:shadow-[0_0_60px_rgba(0,0,0,0.12)] transition-all duration-500">
              <h2 className="text-2xl font-semibold mb-4">Article 5 - Propriété intellectuelle</h2>
              <div className="space-y-4 text-gray-600">
                <p>Le transfert des droits de propriété intellectuelle s'effectue à compter du paiement intégral du prix.</p>
                <p>Le client devient propriétaire du code source et des éléments développés spécifiquement pour son projet.</p>
                <p>Les éléments génériques, bibliothèques et frameworks utilisés restent soumis à leurs licences respectives.</p>
              </div>
            </section>

            {/* Garanties et Maintenance - toujours pleine largeur */}
            <section className="col-span-1 md:col-span-2 lg:col-span-4 bg-white/80 backdrop-blur-2xl rounded-xl p-4 sm:p-8 shadow-[0_0_20px_rgba(0,0,0,0.08)] hover:shadow-[0_0_60px_rgba(0,0,0,0.12)] transition-all duration-500">
              <h2 className="text-2xl font-semibold mb-4">Article 6 - Garanties et maintenance</h2>
              <div className="space-y-4 text-gray-600">
                <p>BennyDev garantit la qualité des prestations de services fournies. Toutefois, le client est invité à effectuer des tests approfondis avant la mise en service et à signaler tout dysfonctionnement.</p>
                <p>La maintenance est assurée pendant une période de 12 mois à compter de la mise en service du projet. Au-delà de cette période, le client peut renouveler sa maintenance.</p>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
      <ChatButton />
    </>
  );
} 