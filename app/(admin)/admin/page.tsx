'use client'

import { Card } from "@/components/ui/card"
import { 
  CircleUserRound, 
  Briefcase, 
  TicketCheck, 
  TrendingUp, 
  Clock, 

  ChevronRight
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useAdminStats } from "@/hooks/useAdminStats"

export default function AdminPage() {
  const stats = useAdminStats()

  return (
    <div className="h-[calc(100vh-80px)] p-6 bg-gradient-to-b from-background to-muted/20">
      <div className="max-w-7xl mr-auto space-y-8">
        {/* En-tête */}
        <div className="flex items-end justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
              Tableau de bord
            </h1>
            <p className="text-muted-foreground mt-1">
              Bienvenue, voici un aperçu de votre activité
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-sm text-muted-foreground">Mise à jour en temps réel</span>
          </div>
        </div>

        {/* Métriques principales avec données réelles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 cursor-pointer group">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Projets actifs</p>
                <h2 className="text-3xl font-bold">{stats.activeProjects}</h2>
              </div>
              <div className="p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                <Briefcase className="h-5 w-5 text-primary" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-green-500">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span>+{stats.growth}% ce mois</span>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 cursor-pointer group">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Clients actifs</p>
                <h2 className="text-3xl font-bold">{stats.activeClients}</h2>
              </div>
              <div className="p-3 rounded-full bg-blue-500/10 group-hover:bg-blue-500/20 transition-colors">
                <CircleUserRound className="h-5 w-5 text-blue-500" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-green-500">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span>Actifs</span>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 cursor-pointer group">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Tickets support</p>
                <h2 className="text-3xl font-bold">{stats.supportTickets}</h2>
              </div>
              <div className="p-3 rounded-full bg-orange-500/10 group-hover:bg-orange-500/20 transition-colors">
                <TicketCheck className="h-5 w-5 text-orange-500" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-orange-500">
              <Clock className="h-4 w-4 mr-1" />
              <span>En attente</span>
            </div>
          </Card>
        </div>

        {/* Projets récents avec données réelles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="overflow-hidden">
            <div className="p-6 border-b border-border">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Projets récents</h3>
                <Button variant="ghost" size="sm" className="text-primary">
                  Voir tout
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </div>
            <div className="divide-y divide-border">
              {stats.recentProjects && stats.recentProjects.length > 0 ? (
                stats.recentProjects.map((project) => (
                  <div key={project.id} className="p-4 hover:bg-muted/50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">
                          {project.project_code ? `Projet #${project.project_code}` : 'Projet sans code'}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {project.company || 'Entreprise non spécifiée'}
                        </p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <Badge variant="default">
                          Actif
                        </Badge>
                        <Button variant="ghost" size="icon">
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-4 text-center text-muted-foreground">
                  Aucun projet récent trouvé
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
} 