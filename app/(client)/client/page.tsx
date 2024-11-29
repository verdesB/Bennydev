'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function ClientPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [profile, setProfile] = useState<any>(null)
  const [projects, setProjects] = useState<any[]>([])

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
      } catch (error) {
        setError('Impossible de charger les données du dashboard')
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  const handleProjectClick = (projectId: string) => {
    router.push(`/client/${projectId}`)
  }

  if (loading) {
    return <div className="p-6">Chargement...</div>
  }

  if (error) {
    return <div className="p-6 text-red-500">{error}</div>
  }

  return (
    <div className="h-[calc(100vh-4rem)] bg-gray-50 rounded-2xl shadow-lg p-4 md:p-6 lg:p-8">
      <div className="max-w-4xl space-y-4 md:space-y-6 lg:space-y-8">
        <div className="bg-white rounded-xl lg:rounded-2xl shadow-sm p-4 md:p-6 lg:p-8 border border-gray-100">
          <div className="flex items-center gap-4 mb-4 lg:mb-6">
            {profile?.avatar_url && (
              <img 
                src={profile.avatar_url} 
                alt="Profile" 
                className="w-16 h-16 rounded-full object-cover border-2 border-purple-100"
              />
            )}
            <div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-medium text-gray-900">
                Bienvenue, {profile?.first_name || 'Client'}
              </h1>
              <p className="text-base md:text-lg text-gray-600 mt-2">
                {profile?.role || 'Client'} - {profile?.company || 'Entreprise non spécifiée'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-purple-50 p-4 md:p-6 rounded-lg lg:rounded-xl border border-purple-100">
              <h3 className="text-base md:text-lg font-medium text-gray-900 mb-2">Projets actifs</h3>
              <p className="text-2xl md:text-3xl font-medium text-purple-600">{projects.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl lg:rounded-2xl shadow-sm p-4 md:p-6 lg:p-8 border border-gray-100">
          <h2 className="text-xl md:text-2xl font-medium text-gray-900 mb-4 lg:mb-6">Mes projets</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {projects.map((project) => (
              <div 
                key={project.id} 
                className="group flex flex-col p-4 md:p-6 bg-white rounded-lg lg:rounded-xl border border-gray-200 hover:border-purple-300 hover:shadow-md transition-all duration-200"
              >
                <h3 className="text-lg md:text-xl font-medium text-gray-900">{project.name}</h3>
                <p className="text-gray-600 mt-2">{project.description}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className={`px-3 py-1.5 rounded-full text-xs md:text-sm font-medium ${
                    project.state === 'active' 
                      ? 'bg-green-50 text-green-700 border border-green-200' 
                      : 'bg-gray-50 text-gray-700 border border-gray-200'
                  }`}>
                    {project.state}
                  </span>
                  <button 
                    onClick={() => handleProjectClick(project.id)} 
                    className="text-sm md:text-base text-purple-600 hover:text-purple-700 font-medium"
                  >
                    Voir le projet →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 