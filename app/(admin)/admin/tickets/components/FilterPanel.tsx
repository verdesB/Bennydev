import { Filter } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type FilterPanelProps = {
  stats: { 
    total: number
    open: number 
  }
  selectedStatus: string
  selectedProject: string
  setSelectedStatus: (status: string) => void
  setSelectedProject: (projectId: string) => void
  projects: Array<{ id: string; name: string }>
}

export const FilterPanel = ({
  stats,
  selectedStatus,
  selectedProject,
  setSelectedStatus,
  setSelectedProject,
  projects
}: FilterPanelProps) => {
  return (
    <div className="w-80 border-r border-gray-200 bg-white p-6 overflow-y-auto rounded-2xl">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <Filter className="w-5 h-5 text-purple-500" />
        Filtres
      </h2>

      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">
            Statut
          </label>
          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger>
              <SelectValue placeholder="Filtrer par statut" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les statuts</SelectItem>
              <SelectItem value="open">Ouvert</SelectItem>
              <SelectItem value="in_progress">En cours</SelectItem>
              <SelectItem value="resolved">Résolu</SelectItem>
              <SelectItem value="closed">Fermé</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">
            Projet
          </label>
          <Select value={selectedProject} onValueChange={setSelectedProject}>
            <SelectTrigger>
              <SelectValue placeholder="Filtrer par projet" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les projets</SelectItem>
              {projects?.length > 0 ? (
                projects.map((project) => (
                  <SelectItem key={project.id} value={project.id}>
                    {project.name}
                  </SelectItem>
                ))
              ) : (
                <SelectItem value="no-projects" disabled>
                  Aucun projet disponible
                </SelectItem>
              )}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-gray-200">
        <h3 className="text-sm font-medium text-gray-700 mb-2">
          Statistiques
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-purple-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">
              {stats.total}
            </div>
            <div className="text-sm text-purple-600">Total tickets</div>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-yellow-600">
              {stats.open}
            </div>
            <div className="text-sm text-yellow-600">En attente</div>
          </div>
        </div>
      </div>
    </div>
  )
} 