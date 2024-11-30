import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useState, useEffect } from 'react'

interface AdminStats {
  activeProjects: number
  activeClients: number
  supportTickets: number
  growth: number
  recentProjects: any[]
}

export function useAdminStats() {
  const supabase = createClientComponentClient()
  const [stats, setStats] = useState<AdminStats>({
    activeProjects: 0,
    activeClients: 0,
    supportTickets: 0,
    growth: 0,
    recentProjects: []
  })

  const fetchStats = async () => {
    try {
      // Récupérer les projets actifs
      const { data: activeProjects, error: projectsError } = await supabase
        .from('projects')
        .select('*', { count: 'exact' })
        .neq('state', 'COMPLETED')

      if (projectsError) throw projectsError

      // Récupérer les clients actifs (profiles avec role 'CLIENT')
      const { data: activeClients, error: clientsError } = await supabase
        .from('profiles')
        .select('*', { count: 'exact' })
        .eq('role', 'client')

      if (clientsError) {
        console.error('Erreur clients:', clientsError)
        throw clientsError
      }

      console.log('Clients trouvés:', activeClients)

      // Récupérer uniquement les tickets 'open'
      const { data: tickets, error: ticketsError } = await supabase
        .from('tickets')
        .select('*', { count: 'exact' })
        .eq('status', 'open')

      if (ticketsError) throw ticketsError

      console.log('Tickets ouverts:', tickets?.length)

      // Récupérer les projets récents
      const { data: recentProjects, error: recentProjectsError } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5)

      if (recentProjectsError) throw recentProjectsError

      // Calculer la croissance (exemple simple)
      const growth = 15 // À remplacer par votre logique de calcul

      // Mettre à jour toutes les stats
      setStats({
        activeProjects: activeProjects?.length || 0,
        activeClients: activeClients?.length || 0,
        supportTickets: tickets?.length || 0,
        growth,
        recentProjects: recentProjects || []
      })

    } catch (error) {
      console.error('Erreur lors de la récupération des statistiques:', error)
    }
  }

  useEffect(() => {
    fetchStats()

    // Mettre en place un rafraîchissement en temps réel pour toutes les tables
    const channel = supabase
      .channel('db_changes')
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'tickets' 
        }, 
        () => fetchStats()
      )
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'projects' 
        }, 
        () => fetchStats()
      )
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'profiles' 
        }, 
        () => fetchStats()
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  return stats
} 