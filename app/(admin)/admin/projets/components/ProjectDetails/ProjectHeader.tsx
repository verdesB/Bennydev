interface ProjectHeaderProps {
  name: string;
  status: string;
  PROJECT_STATUSES: any[];
}

export const ProjectHeader = ({ name, status, PROJECT_STATUSES }: ProjectHeaderProps) => (
  <div className="flex items-center justify-between mb-6">
    <h2 className="text-2xl font-semibold text-gray-900">{name}</h2>
    <span className={`px-3 py-1 rounded-full text-sm font-medium
      ${PROJECT_STATUSES.find(s => s.value === status)?.color || 'bg-gray-100 text-gray-800'}`}
    >
      {PROJECT_STATUSES.find(s => s.value === status)?.label || status}
    </span>
  </div>
); 