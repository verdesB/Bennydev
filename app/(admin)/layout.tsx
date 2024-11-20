"use client"

import { Sidebar } from "@/components/ui/sidebar"
import { SidebarNav } from "@/components/sidebar-nav"
import { User2, Settings, LayoutDashboard, Users, FileText, LogOut } from "lucide-react"
import { useAuth } from "@/lib/auth"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { signOut } = useAuth()

  const sidebarNavItems = [
    {
      title: "Dashboard",
      href: "/admin",
      icon: <LayoutDashboard className="h-4 w-4" />,
    },
    {
      title: "Clients",
      href: "/admin/clients",
      icon: <Users className="h-4 w-4" />,
    },
    {
      title: "Projets",
      href: "/admin/projets",
      icon: <FileText className="h-4 w-4" />,
    },
    {
      title: "Paramètres",
      href: "/admin/settings",
      icon: <Settings className="h-4 w-4" />,
    },
    {
      title: "Déconnexion",
      href: "#",
      icon: <LogOut className="h-4 w-4" />,
      onClick: signOut,
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
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  )
} 