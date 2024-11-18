export default function AdminPage() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-semibold mb-4">Tableau de bord administrateur</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-purple-50 p-4 rounded-lg">
            <h3 className="font-medium mb-2">Projets actifs</h3>
            <p className="text-2xl font-bold">12</p>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-lg">
            <h3 className="font-medium mb-2">Clients</h3>
            <p className="text-2xl font-bold">24</p>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-lg">
            <h3 className="font-medium mb-2">Tickets support</h3>
            <p className="text-2xl font-bold">5</p>
          </div>
        </div>
      </div>

      {/* Autres sections... */}
    </div>
  );
} 