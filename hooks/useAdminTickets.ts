'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

interface Ticket {
  id: string
  title: string
  description: string
  status: 'open' | 'in_progress' | 'resolved' | 'closed'
  created_at: string
  project_id: string
  user_id: string
  project?: {
    name: string
    id: string
  }
  user?: {
    first_name: string
    last_name: string
    id: string
  }
}

interface Project {
  id: string
  name: string
  description: string
}

export function useAdminTickets() {
  const supabase = createClientComponentClient()
  const router = useRouter()
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedStatus, setSelectedStatus] = useState<string>('all')
  const [selectedProject, setSelectedProject] = useState<string>('all')
  const [stats, setStats] = useState({ total: 0, open: 0 })

  const fetchTickets = async () => {
    try {
      setLoading(true)
      const response = await fetch(
        `/api/admin/tickets?status=${selectedStatus}&projectId=${selectedProject}`,
        {
          credentials: 'include',
          headers: {
            'Cache-Control': 'no-cache',
          }
        }
      )

      if (!response.ok) {
        const errorData = await response.json()
        if (response.status === 401) {
          router.push('/login')
          return
        }
        throw new Error(errorData.error || 'Erreur lors de la récupération des tickets')
      }

      const { tickets: ticketsData } = await response.json()
      setTickets(ticketsData)

      // Calculer les stats
      setStats({
        total: ticketsData.length,
        open: ticketsData.filter((t: Ticket) => t.status === 'open').length
      })
    } catch (err) {
      console.error('Erreur:', err)
      setError(err instanceof Error ? err.message : 'Erreur inconnue')
    } finally {
      setLoading(false)
    }
  }

  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/admin/projects', {
        credentials: 'include',
        headers: {
          'Cache-Control': 'no-cache',
        }
      })

      if (!response.ok) {
        const errorData = await response.json()
        if (response.status === 401) {
          router.push('/login')
          return
        }
        throw new Error(errorData.error || 'Erreur lors de la récupération des projets')
      }

      const { projects: projectsData } = await response.json()
      setProjects(projectsData)
    } catch (err) {
      console.error('Erreur:', err)
      setError(err instanceof Error ? err.message : 'Erreur inconnue')
    }
  }

  useEffect(() => {
    fetchTickets()
    fetchProjects()

    // Mise en place des souscriptions realtime
    const ticketsChannel = supabase
      .channel('tickets-changes')
      .on(
        'postgres_changes',
        {
          event: '*', // écoute INSERT, UPDATE, et DELETE
          schema: 'public',
          table: 'tickets'
        },
        (payload) => {
          console.log('Changement détecté sur tickets:', payload)
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
          console.log('Changement détecté sur comments:', payload)
          fetchTickets() // Recharger les tickets pour avoir les derniers commentaires
        }
      )
      .subscribe()

    // Cleanup de la souscription
    return () => {
      supabase.removeChannel(ticketsChannel)
    }
  }, [selectedStatus, selectedProject]) // Ajout des dépendances pour les filtres

  return {
    tickets,
    projects,
    loading,
    error,
    stats,
    selectedStatus,
    setSelectedStatus,
    selectedProject,
    setSelectedProject
  }
} 