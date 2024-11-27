interface BasicInfoProps {
  project: {
    users: any[];
    startDate: string;
    budget: number;
    description: string;
    endDate: string;
  };
}

export const BasicInfo = ({ project }: BasicInfoProps) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div className="space-y-4">
      <div>
        <label className="text-sm text-gray-500">Client</label>
        <p className="font-medium text-gray-900">
          {project.users.find(u => u.role === 'member')?.displayName}
        </p>
      </div>
      <div>
        <label className="text-sm text-gray-500">Date de début</label>
        <p className="font-medium text-gray-900">
          {new Date(project.startDate).toLocaleDateString('fr-FR')}
        </p>
      </div>
      <div>
        <label className="text-sm text-gray-500">Budget</label>
        <p className="font-medium text-gray-900">
          {project.budget.toLocaleString('fr-FR')} €
        </p>
      </div>
    </div>
    <div className="space-y-4">
      <div>
        <label className="text-sm text-gray-500">Description</label>
        <p className="font-medium text-gray-900">{project.description}</p>
      </div>
      <div>
        <label className="text-sm text-gray-500">Date de fin</label>
        <p className="font-medium text-gray-900">
          {new Date(project.endDate).toLocaleDateString('fr-FR')}
        </p>
      </div>
    </div>
  </div>
); 