import { Card } from "@/components/ui/card";

interface ProjectStatus {
  value: string;
  label: string;
  color: string;
}

interface ProjectHeaderProps {
  name: string;
  status: string;
  PROJECT_STATUSES: ProjectStatus[];
}

export const ProjectHeader = ({ name, status, PROJECT_STATUSES }: ProjectHeaderProps) => (
  <Card className="flex items-center justify-between mb-6 bg-white shadow-sm p-4">
    <h2 className="text-2xl font-semibold text-gray-900">{name}</h2>
    <span className={`px-3 py-1 rounded-full text-sm font-medium
      ${PROJECT_STATUSES.find(s => s.value === status)?.color || 'bg-gray-100 text-gray-800'}`}
    >
      {PROJECT_STATUSES.find(s => s.value === status)?.label || status}
    </span>
  </Card>
); 