'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { SparklesCore } from '@/app/components/ui/sparkles'
import { Filter } from 'lucide-react'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useAdminTickets } from '@/hooks/useAdminTickets'
import { TicketStatus } from '../../../../components/TicketStatus'

const TicketsPage = () => {
  const [mounted, setMounted] = useState(false)
  const router = useRouter()
  const {
    tickets,
    projects,
    loading,
    error,
    stats,
    selectedStatus,
    setSelectedStatus,
    selectedProject,
    setSelectedProject
  } = useAdminTickets()

  useEffect(() => {
    setMounted(true)
  }, [])

  // Ajout de la logique de filtrage
  const filteredTickets = tickets.filter(ticket => {
    const statusMatch = selectedStatus === 'all' || ticket.status === selectedStatus;
    const projectMatch = selectedProject === 'all' || ticket.project?.id === selectedProject;
    return statusMatch && projectMatch;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
        <div className="text-red-500">Une erreur est survenue: {error}</div>
      </div>
    )
  }

  return (
    <div className="flex h-[calc(100vh-4rem)] bg-gray-50/50 shadow-xl rounded-2xl">
      {/* Panneau de filtres */}
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

      {/* Section principale */}
      <div className="flex-1 p-6 relative">
        <div className="absolute inset-0 overflow-hidden">
          {mounted && (
            <SparklesCore 
              className="w-full h-full"
              background="transparent"
              particleColor="#8b5cf6"
              particleDensity={100}
              speed={0.5}
              minSize={0.6}
              maxSize={1.4}
            />
          )}
        </div>

        <div className="relative z-10 w-full px-4">
          <h1 className="text-2xl font-semibold text-gray-900 mb-6">
            Gestion des tickets
          </h1>

          {/* Grille des tickets */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTickets.map((ticket) => (
              <div key={ticket.id} className="relative flex">
                <div className="flex-1 bg-white rounded-l-lg shadow-sm border border-purple-100 hover:shadow-md transition-shadow duration-200 cursor-pointer"
                     onClick={() => router.push(`/admin/tickets/${ticket.id}`)}>
                  <div className="absolute right-0 top-0 h-full flex flex-col justify-between py-2">
                    {[...Array(6)].map((_, i) => (
                      <div 
                        key={`right-${i}`}
                        className="w-2 h-2 -mr-1 rounded-full bg-gray-50 border border-purple-200"
                      />
                    ))}
                  </div>

                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <TicketStatus status={ticket.status || 'open'} />
                      <span className="text-xs text-gray-500">
                        {new Date(ticket.created_at).toLocaleDateString('fr-FR')}
                      </span>
                    </div>
                    
                    <h3 className="font-medium text-gray-900 mb-1">{ticket.title}</h3>
                    <p className="text-sm text-gray-500 line-clamp-2 mb-2">
                      {ticket.description}
                    </p>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-purple-600 font-medium">
                        {ticket.project?.name}
                      </span>
                      <span className="text-xs text-gray-500">
                        Par: {ticket.user ? `${ticket.user.first_name} ${ticket.user.last_name}` : 'Utilisateur inconnu'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="w-6 bg-purple-50/50 rounded-r-lg border-t border-r border-b border-purple-100">
                  <div className="h-full flex items-center justify-center">
                    <div className="transform -rotate-90 text-purple-300 whitespace-nowrap text-xs font-mono">
                      #{String(ticket.id).substring(0, 6)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TicketsPage
