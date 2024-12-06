"use client"

import { Sidebar } from "@/components/ui/sidebar"
import { SidebarNav } from "@/components/sidebar-nav"
import { User2, Settings, LayoutDashboard, Users, FileText, LogOut } from "lucide-react"
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { toast } from "sonner"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const supabase = createClientComponentClient()

  const handleSignOut = async (e: React.MouseEvent) => {
    e.preventDefault()
    try {
      const { error } = await supabase.auth.signOut()
      if (error) {
        throw error
      }
      toast.success('Déconnexion réussie')
      router.push('/login')
      router.refresh()
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error)
      toast.error('Erreur lors de la déconnexion')
    }
  }

  const sidebarNavItems = [
    {
      title: "Dashboard",
      href: "/admin",
      icon: <LayoutDashboard className="h-4 w-4" />,
    },
    {
      title: "Projets",
      href: "/admin/projets",
      icon: <FileText className="h-4 w-4" />,
    },
    {
      title: "Clients",
      href: "/admin/clients",
      icon: <Users className="h-4 w-4" />,
    },
    {
      title: "Demandes",
      href: "/admin/demandes",
      icon: <FileText className="h-4 w-4" />,
    },
    {
      title: "Tickets",
      href: "/admin/tickets",
      icon: <FileText className="h-4 w-4" />,
    },
    {
      title: "Paramètres",
      href: "/admin/parametres",
      icon: <Settings className="h-4 w-4" />,
    },
    {
      title: "Déconnexion",
      href: "#",
      icon: <LogOut className="h-4 w-4" />,
      onClick: handleSignOut,
    },
  ]

  return (
    <div className="flex min-h-screen relative z-30 overflow-hidden">
      <Sidebar title="Administration">
        <div className="flex flex-col h-[calc(100vh-4rem)]">
          <div className="flex-1 py-4">
            <SidebarNav items={sidebarNavItems} />
          </div>
          <div className="border-t p-4">
            <SidebarNav 
              items={[{
                title: "Admin",
                href: "#",
                icon: <User2 className="h-4 w-4" />,
                subtitle: "admin@example.com"
              }]} 
            />
          </div>
        </div>
      </Sidebar>
      <main className="flex-1 p-8 overflow-hidden">
        {children}
      </main>
    </div>
  )
} 