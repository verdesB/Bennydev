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
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="mb-6 flex items-center gap-4">
          {profile?.avatar_url && (
            <img 
              src={profile.avatar_url} 
              alt="Profile" 
              className="w-16 h-16 rounded-full object-cover"
            />
          )}
          <div>
            <h2 className="text-3xl font-bold text-gray-800">
              Bienvenue, {profile?.first_name || 'Client'}
            </h2>
            <p className="text-gray-600 mt-2">
              {profile?.role || 'Client'} - {profile?.company || 'Entreprise non spécifiée'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-purple-50 p-6 rounded-lg">
            <h3 className="font-medium mb-2">Projets actifs</h3>
            <p className="text-2xl font-bold text-purple-600">{projects.length}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg">
          <h3 className="font-semibold text-xl mb-4">Mes projets</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {projects.map((project) => (
              <div key={project.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <h4 className="font-medium">{project.name}</h4>
                <p className="text-sm text-gray-600 mt-1">{project.description}</p>
                <div className="mt-3 flex items-center justify-between">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    project.state === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {project.state}
                  </span>
                  <span className="text-sm text-purple-600">
                    {project.userRole}
                  </span>
                </div>
                <button onClick={() => handleProjectClick(project.id)} className="mt-2 text-sm text-purple-600">
                  Voir le projet
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 