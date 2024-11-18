export default function ClientPage() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-semibold mb-4">Mon tableau de bord</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-purple-50 p-4 rounded-lg">
            <h3 className="font-medium mb-2">Mes projets en cours</h3>
            <p className="text-gray-600">2 projets actifs</p>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-lg">
            <h3 className="font-medium mb-2">Support</h3>
            <p className="text-gray-600">Aucun ticket en attente</p>
          </div>
        </div>
      </div>

      {/* Autres sections... */}
    </div>
  );
} 