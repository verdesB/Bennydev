import Header from "../components/Header";
import Hero2 from "../components/Hero2";

export default function AdminPage() {
  return (
    <>
      <Header pathname={'/admin'} />
      <main className="relative bg-gradient-to-b from-purple-50 to-white min-h-screen">
        <Hero2 
          title="Administration"
          subtitle="Gérez vos projets et vos clients"
        />
        
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-semibold mb-6">Tableau de bord administrateur</h2>
            
            {/* Section Projets */}
            <div className="mb-8">
              <h3 className="text-xl font-medium mb-4">Gestion des projets</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-600">Vue d'ensemble des projets</p>
              </div>
            </div>

            {/* Section Clients */}
            <div className="mb-8">
              <h3 className="text-xl font-medium mb-4">Gestion des clients</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-600">Liste des clients actifs</p>
              </div>
            </div>

            {/* Section Analytics */}
            <div>
              <h3 className="text-xl font-medium mb-4">Statistiques</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-600">Analyses et rapports</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
} 