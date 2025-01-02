'use client'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import ChatComponent from '../../../../components/chat/ChatComponent'
import { SparklesCore } from '@/app/components/ui/sparkles'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface Project {
  id: string
  name: string
  description: string
  state: string
  type: string
  figma_link?: string
  prod_test_url?: string
  created_at: string
  updated_at: string
}

interface HistoryEntry {
  id: string;
  title: string;
  description: string;
  needs_validation: boolean;
  validation_status: string;
  created_at: string;
  client_feedback?: string;
}

export default function ProjectDetailPage() {
  const params = useParams()
  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [history, setHistory] = useState<HistoryEntry[]>([])
  const [feedbacks, setFeedbacks] = useState<Record<string, string>>({})
  const supabase = createClientComponentClient()

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const response = await fetch(`/api/projects/${params.id}`)
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération du projet')
        }
        const data = await response.json()
        setProject(data)
      } catch (error) {
        setError('Impossible de charger les détails du projet')
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchProjectDetails()
  }, [params.id])

  useEffect(() => {
    const fetchHistory = async () => {
      const { data } = await supabase
        .from('project_history')
        .select('*')
        .eq('project_id', params.id)
        .order('created_at', { ascending: false });
      
      if (data) setHistory(data);
    };

    fetchHistory();
  }, [params.id]);

  const handleValidation = async (entryId: string, isApproved: boolean) => {
    const { error } = await supabase
      .from('project_history')
      .update({
        validation_status: isApproved ? 'valide' : 'refuse',
        client_feedback: feedbacks[entryId] || null
      })
      .eq('id', entryId);

    if (!error) {
      // Rafraîchir l'historique
      const { data } = await supabase
        .from('project_history')
        .select('*')
        .eq('project_id', params.id)
        .order('created_at', { ascending: false });
      
      if (data) setHistory(data);
      
      // Réinitialiser le feedback
      setFeedbacks(prev => {
        const newFeedbacks = { ...prev };
        delete newFeedbacks[entryId];
        return newFeedbacks;
      });
    }
  };

  if (loading) return <div className="p-6">Chargement...</div>
  if (error || !project) return <div className="p-6 text-red-500">{error || 'Projet non trouvé'}</div>

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-4rem)] bg-gray-50 rounded-2xl shadow-lg">
      {/* Section principale du projet */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
        <div className="max-w-4xl space-y-4 md:space-y-6 lg:space-y-8">
          {/* En-tête du projet */}
          <div className="bg-white rounded-xl lg:rounded-2xl shadow-sm p-4 md:p-6 lg:p-8 border border-gray-100">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4 lg:mb-6">
              <h1 className="text-2xl md:text-3xl lg:text-4xl tracking-tight font-medium text-gray-900">{project.name}</h1>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                <span className={`px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium ${
                  project.state === 'active' 
                    ? 'bg-green-50 text-green-700 border border-green-200' 
                    : 'bg-gray-50 text-gray-700 border border-gray-200'
                }`}>
                  {project.state}
                </span>
                <span className="px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium bg-blue-50 text-blue-700 border border-blue-200">
                  {project.type}
                </span>
              </div>
            </div>
            <p className="text-base md:text-lg text-gray-600 leading-relaxed">{project.description}</p>
          </div>

          {/* Liens et ressources */}
          <div className="bg-white rounded-xl lg:rounded-2xl shadow-sm p-4 md:p-6 lg:p-8 border border-gray-100">
            <h2 className="text-xl md:text-2xl tracking-tight font-medium text-gray-900 mb-4 lg:mb-6">Ressources & Liens</h2>
            <div className="grid grid-cols-1 gap-3 md:gap-4">
              <a
                href={`/client/${params.id}/files`}
                className="group flex items-center p-4 md:p-6 bg-white rounded-lg lg:rounded-xl border border-gray-200 hover:border-emerald-300 hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-center space-x-3 md:space-x-4 w-full">
                  <div className="p-1.5 md:p-2 bg-emerald-50 rounded-lg">
                    <svg className="w-5 h-5 md:w-6 md:h-6 text-emerald-600" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                    </svg>
                  </div>
                  <div className="flex-grow min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-base md:text-lg tracking-tight font-medium text-gray-900">Fichiers partagés</span>
                      <span className="text-xs md:text-sm text-gray-500 ml-2">Accéder →</span>
                    </div>
                    <p className="text-xs md:text-sm text-gray-500 mt-1">Gérer les fichiers du projet</p>
                  </div>
                </div>
              </a>

              {project.figma_link && (
                <a
                  href={project.figma_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center p-4 md:p-6 bg-white rounded-lg lg:rounded-xl border border-gray-200 hover:border-purple-300 hover:shadow-md transition-all duration-200"
                >
                  <div className="flex items-center space-x-3 md:space-x-4 w-full">
                    <div className="p-1.5 md:p-2 bg-purple-50 rounded-lg">
                      <svg className="w-5 h-5 md:w-6 md:h-6 text-purple-600" viewBox="0 0 38 57" fill="none">
                        <path d="M19 28.5C19 25.4624 21.4624 23 24.5 23C27.5376 23 30 25.4624 30 28.5C30 31.5376 27.5376 34 24.5 34C21.4624 34 19 31.5376 19 28.5Z" fill="currentColor"/>
                        <path d="M19 47.5C19 44.4624 21.4624 42 24.5 42C27.5376 42 30 44.4624 30 47.5C30 50.5376 27.5376 53 24.5 53C21.4624 53 19 50.5376 19 47.5Z" fill="currentColor"/>
                        <path d="M19 9.5C19 6.46243 21.4624 4 24.5 4C27.5376 4 30 6.46243 30 9.5C30 12.5376 27.5376 15 24.5 15H19V9.5Z" fill="currentColor"/>
                        <path d="M8 9.5C8 12.5376 10.4624 15 13.5 15C16.5376 15 19 12.5376 19 9.5C19 6.46243 16.5376 4 13.5 4C10.4624 4 8 6.46243 8 9.5Z" fill="currentColor"/>
                      </svg>
                    </div>
                    <div className="flex-grow min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-base md:text-lg tracking-tight font-medium text-gray-900">Maquettes Figma</span>
                        <span className="text-xs md:text-sm text-gray-500 ml-2">Ouvrir →</span>
                      </div>
                      <p className="text-xs md:text-sm text-gray-500 mt-1 truncate">{project.figma_link}</p>
                    </div>
                  </div>
                </a>
              )}

              {project.prod_test_url && (
                <a
                  href={project.prod_test_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center p-4 md:p-6 bg-white rounded-lg lg:rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-200"
                >
                  <div className="flex items-center space-x-3 md:space-x-4 w-full">
                    <div className="p-1.5 md:p-2 bg-blue-50 rounded-lg">
                      <svg className="w-5 h-5 md:w-6 md:h-6 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                      </svg>
                    </div>
                    <div className="flex-grow min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-base md:text-lg tracking-tight font-medium text-gray-900">Environnement de test</span>
                        <span className="text-xs md:text-sm text-gray-500 ml-2">Visiter →</span>
                      </div>
                      <p className="text-xs md:text-sm text-gray-500 mt-1 truncate">{project.prod_test_url}</p>
                    </div>
                  </div>
                </a>
              )}
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-white rounded-xl lg:rounded-2xl shadow-sm p-4 md:p-6 lg:p-8 border border-gray-100">
            <h2 className="text-xl md:text-2xl tracking-tight font-medium text-gray-900 mb-4 lg:mb-6">Historique</h2>
            <div className="border-l-2 border-gray-200 ml-4 space-y-8 py-2">
              {history.map((entry) => (
                <div key={entry.id} className="relative">
                  <div className={`absolute -left-[11px] mt-2 w-5 h-5 rounded-full border-4 border-white shadow-sm
                    ${entry.validation_status === 'valide' ? 'bg-green-500' : 
                      entry.validation_status === 'refuse' ? 'bg-red-500' : 
                      'bg-blue-500'}`}
                  />
                  <div className="ml-8">
                    <h3 className="text-lg font-medium text-gray-900">{entry.title}</h3>
                    <p className="text-gray-600 mt-1">{entry.description}</p>
                    <p className="text-gray-500 text-sm mt-2">
                      {new Date(entry.created_at).toLocaleDateString('fr-FR', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>

                    {entry.needs_validation && entry.validation_status === 'en_attente' && (
                      <div className="mt-4 space-y-4">
                        <Textarea
                          placeholder="Ajouter un commentaire (optionnel)"
                          value={feedbacks[entry.id] || ''}
                          onChange={(e) => setFeedbacks(prev => ({
                            ...prev,
                            [entry.id]: e.target.value
                          }))}
                          className="min-h-[100px]"
                        />
                        <div className="flex space-x-3">
                          <Button 
                            onClick={() => handleValidation(entry.id, true)}
                            className="bg-green-500 hover:bg-green-600 text-white"
                          >
                            Valider
                          </Button>
                          <Button 
                            onClick={() => handleValidation(entry.id, false)}
                            variant="outline"
                            className="text-red-500 border-red-500 hover:bg-red-50"
                          >
                            Refuser
                          </Button>
                        </div>
                      </div>
                    )}

                    {entry.validation_status !== 'en_attente' && (
                      <div className="mt-2">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm
                          ${entry.validation_status === 'valide' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'}`}
                        >
                          {entry.validation_status === 'valide' ? 'Validé' : 'Refusé'}
                        </span>
                        {entry.client_feedback && (
                          <p className="mt-2 text-gray-600 text-sm italic">
                            "{entry.client_feedback}"
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {/* Entrée création projet */}
              <div className="relative">
                <div className="absolute -left-[11px] mt-2 w-5 h-5 rounded-full bg-green-500 border-4 border-white shadow-sm"></div>
                <div className="ml-8">
                  <h3 className="text-lg font-medium text-gray-900">Projet créé</h3>
                  <p className="text-gray-500 mt-1">
                    {new Date(project.created_at).toLocaleDateString('fr-FR', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section chat */}
      <div className="min-w-[500px] max-w-[600px] border-l border-gray-200 bg-white p-6 rounded-2xl relative shadow-inner">
      <div className="absolute inset-0 rounded-2xl overflow-hidden z-0">
                  <SparklesCore 
                    className="w-full h-full"
                    background="rgba(244,242,255,0.015)"
                    particleColor="#8b5cf6"
                    particleDensity={100}
                    speed={0.5}
                    minSize={0.6}
                    maxSize={1.4}
                    particleSize={1}
                  />
                </div>
        <div className="h-full rounded-2xl bg-gray-50 overflow-hidden border border-gray-200 z-20 relative 
        shadow-[0_4px_20px_-1px_rgba(147,51,234,0.2)] hover:shadow-[0_4px_20px_-1px_rgba(147,51,234,0.3)] transition-shadow">
          <ChatComponent projectId={params.id as string} />
        </div>
      </div>
    </div>
  )
} 