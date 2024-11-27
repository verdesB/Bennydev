import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface StatusSectionProps {
  selectedProject: any;
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
  <div className="border-t pt-6">
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
          className="bg-blue-600 hover:bg-blue-700 text-white whitespace-nowrap"
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
        La mise à jour de l'état enverra une notification au client
      </p>
    </div>
  </div>
); 