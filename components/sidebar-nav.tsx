"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useSidebar } from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"

interface NavItem {
  title: string
  href: string
  icon: React.ReactNode
  onClick?: (e: React.MouseEvent) => void
  subtitle?: string
}

interface SidebarNavProps {
  items: NavItem[]
}

export function SidebarNav({ items }: SidebarNavProps) {
  const pathname = usePathname()
  const { isCollapsed } = useSidebar()

  return (
    <nav className="space-y-1 px-2">
      {items.map((item) => {
        const Component = item.onClick ? 'button' : Link
        return (
          <Component
            key={item.href}
            href={item.onClick ? undefined : item.href}
            onClick={item.onClick}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors w-full",
              pathname === item.href 
                ? "bg-secondary text-secondary-foreground" 
                : "hover:bg-secondary/80",
              isCollapsed && "justify-center px-2"
            )}
          >
            {item.icon}
            {!isCollapsed && (
              <div className="flex flex-col flex-1">
                <span>{item.title}</span>
                {item.subtitle && (
                  <span className="text-xs text-muted-foreground">
                    {item.subtitle}
                  </span>
                )}
              </div>
            )}
          </Component>
        )
      })}
    </nav>
  )
}