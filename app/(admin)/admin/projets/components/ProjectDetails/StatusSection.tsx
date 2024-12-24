import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Project {
  status: string;
}

interface StatusSectionProps {
  selectedProject: Project;
  tempStatus: string;
  setTempStatus: (status: string) => void;
  handleUpdateStatus: () => void;
  PROJECT_STATUSES: Array<{
    value: string;
    label: string;
    color: string;
  }>;
}

export const StatusSection = ({
  selectedProject,
  tempStatus,
  setTempStatus,
  handleUpdateStatus,
  PROJECT_STATUSES
}: StatusSectionProps) => (
  <Card className="h-full border-t pt-6 bg-white p-4 shadow-[0_4px_20px_-1px_rgba(147,51,234,0.2)] hover:shadow-[0_4px_20px_-1px_rgba(147,51,234,0.3)] transition-shadow">
    <div className="space-y-2">
      <Label htmlFor="projectStatus" className="text-sm text-gray-500">
        État du projet
      </Label>
      <div className="flex gap-3">
        <Select
          value={tempStatus || selectedProject.status}
          onValueChange={setTempStatus}
        >
          <SelectTrigger className="flex-1">
            <SelectValue placeholder="Sélectionnez l'état du projet" />
          </SelectTrigger>
          <SelectContent>
            {PROJECT_STATUSES.map((status) => (
              <SelectItem 
                key={status.value} 
                value={status.value}
                className="flex items-center gap-2"
              >
                <span className={`w-2 h-2 rounded-full ${status.color.replace('bg-', 'bg-')}`} />
                {status.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button
          onClick={handleUpdateStatus}
          className="bg-purple-600 hover:bg-purple-700 text-white whitespace-nowrap"
          disabled={!tempStatus || tempStatus === selectedProject.status}
        >
          Mettre à jour
        </Button>
      </div>
      <div className="flex items-center gap-2 mt-2">
        <span className="text-sm text-gray-500">État actuel:</span>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
          PROJECT_STATUSES.find(s => s.value === selectedProject.status)?.color || 'bg-gray-100 text-gray-800'
        }`}>
          {PROJECT_STATUSES.find(s => s.value === selectedProject.status)?.label || selectedProject.status}
        </span>
      </div>
      <p className="text-xs text-gray-500">
        La mise à jour de l&apos;état enverra une notification au client
      </p>
    </div>
  </Card>
); 