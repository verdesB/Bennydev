import Header from "../components/Header";
import Hero2 from "../components/Hero2";

export default function ClientPage() {
  return (
    <>
      <Header pathname={'/client'} />
      <main className="relative bg-gradient-to-b from-purple-50 to-white min-h-screen">
        <Hero2 
          title="Espace Client"
          subtitle="Gérez vos projets et suivez leur avancement"
        />
        
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-semibold mb-6">Tableau de bord client</h2>
            
            {/* Section Projets en cours */}
            <div className="mb-8">
              <h3 className="text-xl font-medium mb-4">Vos projets en cours</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-600">Connectez-vous pour voir vos projets</p>
              </div>
            </div>

            {/* Section Support */}
            <div className="mb-8">
              <h3 className="text-xl font-medium mb-4">Support technique</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-600">Service disponible 24/7</p>
              </div>
            </div>

            {/* Section Documents */}
            <div>
              <h3 className="text-xl font-medium mb-4">Vos documents</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-600">Accédez à vos factures et documents</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
} 