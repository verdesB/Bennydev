'use client'

import { useTicketCreation } from '@/hooks/useTicketCreation'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { SparklesCore } from '@/app/components/ui/sparkles'
import { useState } from 'react'
import { Clock, Send, Ticket, Plus, X, CheckCircle2, Circle, AlertCircle } from 'lucide-react'
import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Composant pour le statut du ticket
const TicketStatus: React.FC<{ status: 'open' | 'in_progress' | 'resolved' | 'closed' }> = ({ status }) => {
  const statusConfig = {
    open: { icon: Circle, color: 'text-blue-500' },
    in_progress: { icon: AlertCircle, color: 'text-yellow-500' },
    resolved: { icon: CheckCircle2, color: 'text-green-500' },
    closed: { icon: CheckCircle2, color: 'text-gray-500' }
  }

  const StatusIcon = statusConfig[status as keyof typeof statusConfig].icon

  return <StatusIcon className={`w-4 h-4 ${statusConfig[status as keyof typeof statusConfig].color}`} />
}

const TicketsPage: React.FC = () => {
  const router = useRouter()
  const {
    projects,
    selectedProject,
    setSelectedProject,
    loading,
    createTicket,
    tickets
  } = useTicketCreation()

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    project_id: ''
  })

  const [isFormOpen, setIsFormOpen] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedProject) {
      console.error('Aucun projet sélectionné')
      return
    }

    try {
      await createTicket({
        ...formData,
        project_id: selectedProject.id
      })
      setFormData({ title: '', description: '', project_id: '' }) // Reset form
      setIsFormOpen(false) // Fermer le formulaire après création
      router.push('/client/tickets')
    } catch (error) {
      console.error('Erreur lors de la création du ticket:', error)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500" />
      </div>
    )
  }

  return (
    <div className="flex h-[calc(100vh-4rem)] bg-gray-50/50 shadow-[0_4px_20px_-1px_rgba(147,51,234,0.2)] hover:shadow-[0_4px_20px_-1px_rgba(147,51,234,0.3)] transition-shadow rounded-2xl">
      {/* Liste des projets */}
      <div className="w-80 border-r border-gray-200 bg-white p-6 overflow-y-auto rounded-2xl">
        <h2 className="text-xl tracking-tight font-medium mb-4 flex items-center gap-2">
          <Clock className="w-5 h-5 text-purple-500" />
          Projets terminés
        </h2>
        <div className="space-y-3">
          {projects.map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className={`p-4 rounded-xl cursor-pointer transition-all duration-200 border-2 ${
                selectedProject?.id === project.id
                  ? 'bg-purple-50 border-purple-300 shadow-sm'
                  : 'bg-white border-transparent hover:border-purple-200'
              }`}
            >
              <h3 className="tracking-tight font-medium text-gray-900">{project.name}</h3>
              <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                {project.description}
              </p>
              <div className="flex items-center mt-2 text-xs text-gray-500">
                <span className="px-2 py-1 rounded-full bg-purple-100 text-purple-700">
                  {new Date(project.created_at).toLocaleDateString('fr-FR')}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section principale des tickets */}
      <div className="flex-1 p-6 relative">
        <div className="absolute inset-0 overflow-hidden">
          <SparklesCore 
            className="w-full h-full"
            background="transparent"
            particleColor="#8b5cf6"
            particleDensity={100}
            speed={0.5}
            minSize={0.6}
            maxSize={1.4}
          />
        </div>

        <div className="relative z-10 w-full px-6 bg-[#FBFBFB] h-full py-6 rounded-2xl shadow-[0_4px_20px_-1px_rgba(147,51,234,0.2)] hover:shadow-[0_4px_20px_-1px_rgba(147,51,234,0.3)] transition-shadow overflow-y-auto">
          {/* En-tête avec le bouton de création */}
          <div className="mb-6 flex justify-between items-center">
            <h1 className="text-2xl tracking-tight font-medium text-gray-900">Mes tickets</h1>
            <Button
              onClick={() => setIsFormOpen(!isFormOpen)}
              className={`${
                isFormOpen ? 'bg-red-500 hover:bg-red-600' : 'bg-purple-500 hover:bg-purple-600'
              } text-white flex items-center gap-2`}
            >
              {isFormOpen ? (
                <>
                  <X className="w-4 h-4" />
                  Fermer
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  Créer un ticket
                </>
              )}
            </Button>
          </div>

          {/* Formulaire de création de ticket */}
          <AnimatePresence>
            {isFormOpen && (
              <motion.div 
                initial={{ opacity: 0, height: 0, y: -20 }}
                animate={{ opacity: 1, height: 'auto', y: 0 }}
                exit={{ opacity: 0, height: 0, y: -20 }}
                transition={{ 
                  duration: 0.3,
                  ease: "easeInOut"
                }}
                className="relative z-10 w-full flex mb-8 overflow-hidden"
              >
                {/* Ticket principal */}
                <div className="flex-1 bg-white rounded-l-lg shadow-lg border border-purple-100 transform transition-all duration-300 hover:shadow-xl relative">
                  {/* Perforations droites */}
                  <div className="absolute right-0 top-0 h-full flex flex-col justify-between py-4">
                    {[...Array(12)].map((_, i) => (
                      <div 
                        key={`right-${i}`}
                        className="w-3 h-3 -mr-1.5 rounded-full bg-gray-50 border border-purple-200"
                      />
                    ))}
                  </div>

                  {/* En-tête du ticket */}
                  <div className="border-b border-dashed border-purple-200 p-8">
                    <div className="absolute -top-4 -right-4 bg-purple-500 text-white p-3 rounded-xl shadow-lg">
                      <Ticket className="w-6 h-6" />
                    </div>
                    
                    <h1 className="text-2xl font-semibold mb-2">
                      Nouveau ticket
                    </h1>
                    <p className="text-gray-500">
                      Pour le projet : {selectedProject?.name || 'undifined'}
                    </p>
                  </div>

                  {/* Corps du ticket */}
                  <div className="p-8">
                    <form onSubmit={handleSubmit} className="space-y-8">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Titre du ticket
                        </label>
                        <Input
                          value={formData.title}
                          onChange={(e) => setFormData({...formData, title: e.target.value})}
                          required
                          className="w-full border-purple-200 focus:border-purple-500 focus:ring-purple-500"
                          placeholder="Ex: Correction bug d'affichage..."
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Description détaillée
                        </label>
                        <Textarea
                          value={formData.description}
                          onChange={(e) => setFormData({...formData, description: e.target.value})}
                          required
                          rows={8}
                          className="w-full border-purple-200 focus:border-purple-500 focus:ring-purple-500"
                          placeholder="Décrivez votre demande en détail..."
                        />
                      </div>

                      {/* Pied du ticket */}
                      <div className="pt-4 border-t border-dashed border-purple-200">
                        <Button 
                          type="submit"
                          className="w-full bg-purple-500 hover:bg-purple-600 text-white flex items-center justify-center gap-2 py-6"
                        >
                          <Send className="w-5 h-5" />
                          Créer le ticket
                        </Button>
                      </div>
                    </form>
                  </div>
                </div>

                {/* Partie détachable du ticket */}
                <div className="w-32 bg-purple-50/50 rounded-r-lg border-t border-r border-b border-purple-100">
                  <div className="h-full flex items-center justify-center">
                    <div className="transform -rotate-90 text-purple-300 whitespace-nowrap font-mono">
                      {selectedProject ? `#${String(selectedProject.id).substring(0, 8)}` : 'NO-PROJECT'}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Grille des tickets existants */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
            {tickets.map((ticket) => (
              <div key={ticket.id} className="relative flex">
                {/* Mini ticket */}
                <div className="flex-1 bg-white rounded-l-lg shadow-sm border border-purple-100 hover:shadow-md transition-shadow duration-200">
                  {/* Perforations droites */}
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
                      <TicketStatus status={['open', 'in_progress', 'resolved', 'closed'].includes(ticket.status) ? ticket.status as 'open' | 'in_progress' | 'resolved' | 'closed' : 'open'} />
                      <span className="text-xs text-gray-500">
                        {new Date(ticket.created_at).toLocaleDateString('fr-FR')}
                      </span>
                    </div>
                    
                    <h3 className="font-medium text-gray-900 mb-1 pr-4">{ticket.title}</h3>
                    <p className="text-sm text-gray-500 line-clamp-2 mb-2">
                      {ticket.description}
                    </p>
                    
                    <div className="text-xs text-purple-600 font-medium">
                      {ticket.project?.name || 'Projet non spécifié'}
                    </div>
                  </div>
                </div>

                {/* Partie détachable */}
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