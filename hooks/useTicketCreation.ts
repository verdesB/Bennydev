import { useState, useEffect } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'


interface Project {
  id: string
  name: string
  description: string
  state: string
  created_at: string
}

interface TicketFormData {
  title: string
  description: string
  project_id: string
}

type TicketStatus = 'open' | 'in_progress' | 'resolved' | 'closed'

interface Ticket {
  id: string
  title: string
  description: string
  status: string
  created_at: string
  project: {
    name: string
  }
}

export function useTicketCreation() {
  const supabase = createClientComponentClient()
  const [projects, setProjects] = useState<Project[]>([])
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [tickets, setTickets] = useState<Ticket[]>([])

  // Récupérer les projets terminés
  const fetchClosedProjects = async () => {
    try {
      setLoading(true)
      setError(null)

      // Récupérer la session depuis le middleware
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        throw new Error('Session non trouvée')
      }

      // Récupérer le profil de l'utilisateur
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', session.user.id)
        .single()

      if (profileError) {
        throw profileError
      }

      // Récupérer les projets COMPLETED
      const { data: projectsData, error: projectsError } = await supabase
        .from('projects')
        .select('id, name, description, state, created_at')
        .eq('state', 'COMPLETED')

      if (projectsError) {
        console.error('Erreur Supabase:', projectsError)
        throw projectsError
      }

      setProjects(projectsData || [])

    } catch (error) {
      console.error('Erreur complète:', error)
      setError(error instanceof Error ? error.message : 'Une erreur est survenue')
      setProjects([])
    } finally {
      setLoading(false)
    }
  }

  // Créer un nouveau ticket
  const createTicket = async (formData: TicketFormData) => {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        throw new Error('Session non trouvée')
      }

      const { data: ticketData, error: ticketError } = await supabase
        .from('tickets')
        .insert([
          {
            title: formData.title,
            description: formData.description,
            project_id: formData.project_id,
            profile_id: session.user.id,
            status: 'open' as TicketStatus
          }
        ])
        .select()
        .single()

      if (ticketError) {
        throw ticketError
      }

      return ticketData
    } catch (error) {
      console.error('Erreur lors de la création du ticket:', error)
      throw error
    }
  }

  // Fonction pour récupérer les tickets
  const fetchTickets = async () => {
    const { data, error } = await supabase
      .from('tickets')
      .select(`
        *,
        project:projects(name)
      `)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Erreur lors de la récupération des tickets:', error)
      return
    }

    setTickets(data)
  }

  useEffect(() => {
    fetchClosedProjects()
    fetchTickets()

    // Configuration des canaux realtime
    const ticketsChannel = supabase
      .channel('tickets-changes')
      .on(
        'postgres_changes',
        {
          event: '*', // écoute tous les événements (insert, update, delete)
          schema: 'public',
          table: 'tickets'
        },
        (payload) => {
          console.log('Changement sur tickets:', payload)
          fetchTickets() // Recharger les tickets
        }
      )
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'ticket_comments'
        },
        (payload) => {
          console.log('Changement sur comments:', payload)
          fetchTickets() // Recharger les tickets pour avoir les derniers commentaires
        }
      )
      .subscribe()

    // Cleanup à la destruction du composant
    return () => {
      supabase.removeChannel(ticketsChannel)
    }
  }, [])

  return {
    projects,
    selectedProject,
    setSelectedProject,
    loading,
    error,
    createTicket,
    fetchClosedProjects,
    tickets,
    fetchTickets
  }
} 