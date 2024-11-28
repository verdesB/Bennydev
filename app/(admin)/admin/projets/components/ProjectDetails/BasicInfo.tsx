import { Card } from "@/components/ui/card";

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
  <Card className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white  p-4  shadow-[0_4px_20px_-1px_rgba(147,51,234,0.2)] hover:shadow-[0_4px_20px_-1px_rgba(147,51,234,0.3)] transition-shadow">
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
  </Card>
); 