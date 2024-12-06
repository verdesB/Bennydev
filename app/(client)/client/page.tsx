'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import Image from 'next/image'

interface Profile {
  id: string;
  first_name?: string;
  avatar_url?: string;
  role?: string;
  company?: string;
}

interface Project {
  id: string;
  name: string;
  state: 'active' | 'inactive';
  description: string;
  lastUpdate?: string;
  tasksCount?: number;
  type?: string;
}

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'warning' | 'error' | 'info';
  is_read: boolean;
  created_at: string;
  date?: string;
  user_id: string;
}

interface Ticket {
  id: string;
  status: 'open' | 'closed';
}

type DatabaseNotificationPayload = {
  eventType: 'INSERT' | 'DELETE' | 'UPDATE';
  new: Notification;
  old: Notification;
}

export default function ClientPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [projects, setProjects] = useState<Project[]>([])
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [showAllNotifications, setShowAllNotifications] = useState(false)

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch('/api/dashboard')
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des données')
        }
        
        const data = await response.json()
        setProfile(data.profile)
        setProjects(data.projects)
        setTickets(data.tickets)
      } catch (error) {
        setError('Impossible de charger les données du dashboard')
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  useEffect(() => {
    let isMounted = true;

    // Créer la souscription aux notifications
    const supabase = createClientComponentClient();
    
    const notificationsSubscription = supabase
      .channel('notifications')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'notifications',
          filter: `user_id=eq.${profile?.id}`
        },
        (payload: DatabaseNotificationPayload) => {
          if (isMounted) {
            // Mettre à jour les notifications en fonction du type d'événement
            if (payload.eventType === 'INSERT') {
              setNotifications(prev => [payload.new, ...prev])
            } else if (payload.eventType === 'DELETE') {
              setNotifications(prev => prev.filter(notif => notif.id !== payload.old.id))
            } else if (payload.eventType === 'UPDATE') {
              setNotifications(prev => prev.map(notif => 
                notif.id === payload.new.id ? payload.new : notif
              ))
            }
          }
        }
      )
      .subscribe()

    // Charger les notifications initiales
    const fetchInitialNotifications = async () => {
      const { data: notifications } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', profile?.id)
        .order('created_at', { ascending: false })

      if (isMounted && notifications) {
        setNotifications(notifications)
      }
    }

    fetchInitialNotifications()

    return () => {
      isMounted = false
      supabase.removeChannel(notificationsSubscription)
    }
  }, [profile?.id]) // Dépendance au profile.id pour s'assurer que nous avons l'ID de l'utilisateur

  const handleProjectClick = (projectId: string) => {
    router.push(`/client/${projectId}`)
  }

  const markNotificationAsRead = async (notificationId: string) => {
    try {
      const supabase = createClientComponentClient();
      
      // Correction : utiliser 'is_read' au lieu de 'read'
      const { error } = await supabase
        .from('notifications')
        .update({ is_read: true })
        .eq('id', notificationId);

      if (error) {
        console.error('Erreur Supabase:', error);
        throw error;
      }

      // Mise à jour locale de l'état uniquement si la requête a réussi
      setNotifications(prev => 
        prev.map(notif => 
          notif.id === notificationId ? { ...notif, is_read: true } : notif
        )
      );

      // Revenir à l'affichage des non lues
      setShowAllNotifications(false);
    } catch (error) {
      console.error('Erreur lors du marquage de la notification:', error);
    }
  }

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  const groupNotificationsByDate = (notifications: Notification[]) => {
    return notifications.reduce((acc, notif) => {
      const date = formatDate(notif.created_at);
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(notif);
      return acc;
    }, {} as Record<string, Notification[]>);
  };

  if (loading) {
    return <div className="p-6">Chargement...</div>
  }

  if (error) {
    return <div className="p-6 text-red-500">{error}</div>
  }

  const filteredNotifications = showAllNotifications 
    ? notifications 
    : notifications.filter(notif => !notif.is_read);

  const groupedNotifications = groupNotificationsByDate(filteredNotifications);

  return (
    <div className="h-[calc(100vh-4rem)] bg-[#F5F5F7] p-6 lg:p-8 rounded-2xl shadow-[0_4px_20px_-1px_rgba(147,51,234,0.2)] hover:shadow-[0_4px_20px_-1px_rgba(147,51,234,0.3)] transition-shadow">
      <div className="flex gap-8 h-full">
        <div className="flex-grow max-w-[70%] space-y-6">
          <div className="bg-white rounded-2xl shadow-sm p-8 backdrop-blur-lg bg-opacity-80">
            <div className="flex items-center gap-4 mb-4 lg:mb-6">
              {profile?.avatar_url && (
                <Image 
                  src={profile.avatar_url} 
                  alt="Profile" 
                  width={64}
                  height={64}
                  className="rounded-full object-cover border-2 border-purple-100"
                />
              )}
              <div>
                <h1 className="text-2xl md:text-3xl lg:text-4xl tracking-tight font-medium text-gray-900">
                  Bienvenue, {profile?.first_name || 'Client'}
                </h1>
                <p className="text-base md:text-lg text-gray-600 mt-2">
                  {profile?.role || 'Client'} - {profile?.company || 'Entreprise non spécifiée'}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-purple-50 p-4 md:p-6 rounded-lg lg:rounded-xl border border-purple-100">
                <h3 className="text-base md:text-lg tracking-tight font-medium text-gray-900 mb-2">Projets actifs</h3>
                <p className="text-2xl md:text-3xl font-medium text-purple-600">{projects?.length || 0}</p>
              </div>
              
              <div className="bg-orange-50 p-4 md:p-6 rounded-lg lg:rounded-xl border border-orange-100">
                <h3 className="text-base md:text-lg tracking-tight font-medium text-gray-900 mb-2">Tickets en attente</h3>
                <p className="text-2xl md:text-3xl font-medium text-orange-600">
                  {tickets?.filter(ticket => ticket.status === 'open')?.length || 0}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-8 backdrop-blur-lg bg-opacity-80">
            <h2 className="text-2xl tracking-tight font-medium text-gray-900 mb-6">Mes Projets</h2>
            <div className="grid grid-cols-2 gap-6">
              <div 
                onClick={() => router.push('/client/new-project')}
                className="group cursor-pointer border-2 border-dashed border-purple-200 rounded-xl p-6 hover:border-purple-400 hover:bg-purple-50/50 transition-all duration-300 flex flex-col items-center justify-center min-h-[200px]"
              >
                <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center mb-4 group-hover:bg-purple-200 transition-colors">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-purple-600 group-hover:text-purple-700">Nouveau Projet</h3>
                <p className="text-purple-400 text-sm text-center mt-2">Cliquez ici pour créer un nouveau projet</p>
              </div>

              {projects.map((project) => (
                <div 
                  key={project.id} 
                  onClick={() => handleProjectClick(project.id)}
                  className="group cursor-pointer bg-white rounded-xl p-6 hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-purple-200 relative overflow-hidden"
                >
                  <div className={`absolute top-0 right-0 w-20 h-20 transform translate-x-10 translate-y-[-10px] rotate-45 ${
                    project.state === 'active' ? 'bg-green-500' : 'bg-gray-300'
                  }`} />

                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-xl font-medium text-gray-900 mb-1">{project.name}</h3>
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                          project.state === 'active' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-gray-100 text-gray-700'
                        }`}>
                          <span className={`w-2 h-2 rounded-full mr-2 ${
                            project.state === 'active' ? 'bg-green-500' : 'bg-gray-500'
                          }`} />
                          {project.state}
                        </span>
                      </div>
                    </div>

                    <p className="text-gray-600 line-clamp-2">{project.description}</p>

                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {project.lastUpdate || 'Mis à jour récemment'}
                      </div>
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                        {project.tasksCount || '0'} tâches
                      </div>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {project.type || 'Non spécifié'}
                      </span>
                    </div>

                    <div className="flex items-center justify-end text-purple-600 font-medium group-hover:translate-x-2 transition-transform">
                      Voir les détails
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex-shrink-0 w-[30%] space-y-6 h-full">
          <div className="bg-white rounded-2xl shadow-sm py-8 pl-8 backdrop-blur-lg bg-opacity-80 h-full overflow-hidden">
            <div className="flex justify-between items-center mb-4 lg:mb-6 pr-8">
              <h2 className="text-xl md:text-2xl tracking-tight font-medium text-gray-900">Notifications</h2>
              <button
                onClick={() => setShowAllNotifications(!showAllNotifications)}
                className="text-xs text-gray-500 hover:text-gray-700"
              >
                {showAllNotifications ? 'Voir les non lus' : 'Voir toutes les notifications'}
              </button>
            </div>
            <div className="space-y-4 overflow-y-scroll max-h-[calc(100%-4rem)] pr-8">
              {!filteredNotifications?.length ? (
                <p className="text-gray-500 text-center py-4">
                  {showAllNotifications ? 'Aucune notification' : 'Aucune notification non lue'}
                </p>
              ) : (
                Object.entries(groupedNotifications).map(([date, notifs]) => (
                  <div key={date} className="space-y-4">
                    <h3 className="text-sm font-medium text-gray-500 tracking-tight">{date}</h3>
                    {notifs.map((notif) => (
                      <div 
                        key={notif.id} 
                        className={`group p-4 rounded-lg border ${
                          notif.is_read ? 'bg-white' : 'bg-purple-50'
                        } hover:shadow-md transition-all duration-200`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`w-2 h-2 mt-2 rounded-full flex-shrink-0 ${
                            notif.type === 'success' ? 'bg-green-500' :
                            notif.type === 'warning' ? 'bg-yellow-500' :
                            notif.type === 'error' ? 'bg-red-500' : 'bg-purple-500'
                          }`} />
                          <div className="flex-grow">
                            <h3 className="text-sm font-medium text-gray-900">{notif.title}</h3>
                            <p className="text-sm text-gray-600 mt-1">{notif.message}</p>
                            <div className="flex items-center justify-between mt-2">
                              <span className="text-xs text-gray-500">{notif.date}</span>
                              {!notif.is_read && (
                                <button 
                                  onClick={() => markNotificationAsRead(notif.id)}
                                  className="text-xs text-purple-600 hover:text-purple-700"
                                >
                                  Marquer comme lu
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 