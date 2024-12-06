

interface BasicInfoProps {
  project: {
    users: Array<{
      role: string;
      displayName: string;
    }>;
    startDate: string;
    budget: number;
    description: string;
    endDate: string;
  };
}

export const BasicInfo = ({ project }: BasicInfoProps) => (
  <div className="space-y-6">
    <div className="flex items-center space-x-3 pb-4 border-b">
      <h3 className="text-lg font-semibold text-gray-900">Informations de base</h3>
    </div>

    <div className="space-y-5">
      <div className="bg-gray-50/50 rounded-xl p-4 hover:bg-gray-50 transition-colors">
        <label className="text-sm font-medium text-gray-500">Client</label>
        <p className="mt-1 text-base font-semibold text-gray-900">
          {project.users.find(u => u.role === 'member')?.displayName || 'Non assigné'}
        </p>
      </div>

      <div className="bg-gray-50/50 rounded-xl p-4 hover:bg-gray-50 transition-colors">
        <label className="text-sm font-medium text-gray-500">Description</label>
        <p className="mt-1 text-base text-gray-900">
          {project.description || 'Aucune description'}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-50/50 rounded-xl p-4 hover:bg-gray-50 transition-colors">
          <label className="text-sm font-medium text-gray-500">Date de début</label>
          <p className="mt-1 text-base font-semibold text-gray-900">
            {new Date(project.startDate).toLocaleDateString('fr-FR')}
          </p>
        </div>

        <div className="bg-gray-50/50 rounded-xl p-4 hover:bg-gray-50 transition-colors">
          <label className="text-sm font-medium text-gray-500">Date de fin</label>
          <p className="mt-1 text-base font-semibold text-gray-900">
            {new Date(project.endDate).toLocaleDateString('fr-FR')}
          </p>
        </div>
      </div>
    </div>
  </div>
); 