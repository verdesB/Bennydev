"use client"

import { createContext, useContext, useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, Menu } from "lucide-react"
import { cn } from "@/lib/utils"

type SidebarContextType = {
  isCollapsed: boolean
  toggleSidebar: () => void
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined)

export function useSidebar() {
  const context = useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider")
  }
  return context
}

interface SidebarProps {
  children: React.ReactNode
  defaultCollapsed?: boolean
  title: string
}

export function Sidebar({ children, defaultCollapsed = false, title }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed)
  const toggleSidebar = () => setIsCollapsed(!isCollapsed)

  return (
    <SidebarContext.Provider value={{ isCollapsed, toggleSidebar }}>
      <aside className={cn(
        "bg-background border-r transition-all duration-300 flex flex-col",
        isCollapsed ? "w-[70px]" : "w-[240px]"
      )}>
        <div className="flex h-16 items-center justify-between px-4 border-b shrink-0">
          {!isCollapsed && <h2 className="text-lg font-semibold">{title}</h2>}
          <Button 
            variant="ghost" 
            size="icon"
            onClick={toggleSidebar}
            className="ml-auto"
          >
            {isCollapsed ? <Menu className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>
      </aside>
    </SidebarContext.Provider>
  )
}
