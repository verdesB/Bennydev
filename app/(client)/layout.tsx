"use client"

import { Sidebar } from "@/components/ui/sidebar"
import { SidebarNav } from "@/components/sidebar-nav"
import { User2, MessageSquare, FolderOpen, HelpCircle, LogOut, Ticket } from "lucide-react"
import { useAuth } from "@/lib/auth"

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { signOut } = useAuth()

  const sidebarNavItems = [
    {
      title: "Mes Projets",
      href: "/client",
      icon: <FolderOpen className="h-4 w-4" />,
    },
    {
      title: "Support",
      href: "/client/support",
      icon: <MessageSquare className="h-4 w-4" />,
    },
    {
      title: "Ticket",
      href: "/client/tickets",
      icon: <Ticket className="h-4 w-4" />,
    },
    {
      title: "Aide",
      href: "/client/help",
      icon: <HelpCircle className="h-4 w-4" />,
    },
    {
      title: "Déconnexion",
      href: "#",
      icon: <LogOut className="h-4 w-4" />,
      onClick: signOut,
    },
  ]

  return (
    <div className="flex min-h-screen relative z-30">
      <Sidebar title="Espace Client">
        <div className="flex flex-col h-[calc(100vh-4rem)]">
          <div className="flex-1 py-4">
            <SidebarNav items={sidebarNavItems} />
          </div>
          
          <div className="border-t p-4">
            <SidebarNav 
              items={[{
                title: "Client",
                href: "#",
                icon: <User2 className="h-4 w-4" />,
                subtitle: "client@example.com"
              }]} 
            />
          </div>
        </div>
      </Sidebar>
      <main className="flex-1">
        <div className="h-full bg-gradient-to-b from-purple-50 to-white p-8">
          {children}
        </div>
      </main>
    </div>
  )
} 