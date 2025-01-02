"use client"

import { ProfileForm } from "./components/profile-form"
import { AccountForm } from "./components/account-form"
import { NotificationForm } from "./components/notifications-form"
import { SecurityForm } from "./components/security-form"
import { useState } from "react"

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState<string>("profile")

  return (
    <div className="h-[calc(100vh-4rem)] flex overflow-hidden rounded-2xl shadow-[0_4px_20px_-1px_rgba(147,51,234,0.2)]">
      {/* Panneau latéral gauche */}
      <aside className="w-[300px] border-r border-[#E7E7E7] bg-white flex flex-col">
        <div className="shrink-0 p-6 border-b border-[#E7E7E7]">
          <h2 className="text-2xl font-medium tracking-tight">Paramètres</h2>
          <p className="text-muted-foreground text-sm">
            Gérez les paramètres de votre compte
          </p>
        </div>
        
        <nav className="flex-1 overflow-y-auto p-4">
          <div className="flex flex-col gap-1">
            <button 
              onClick={() => setActiveSection("profile")}
              className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                activeSection === "profile" ? "bg-gray-100" : "hover:bg-gray-50"
              }`}
            >
              Profil
            </button>
            
            <button 
              onClick={() => setActiveSection("notifications")}
              className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                activeSection === "notifications" ? "bg-gray-100" : "hover:bg-gray-50"
              }`}
            >
              Notifications
            </button>
            <button 
              onClick={() => setActiveSection("security")}
              className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                activeSection === "security" ? "bg-gray-100" : "hover:bg-gray-50"
              }`}
            >
              Sécurité
            </button>
            <button 
              onClick={() => setActiveSection("account")}
              className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                activeSection === "account" ? "bg-gray-100" : "hover:bg-gray-50"
              }`}
            >
              Compte
            </button>
          </div>
        </nav>
      </aside>

      {/* Contenu principal */}
      <section className="flex-1 bg-white max-w-[600px]">
        <div className="p-6 overflow-y-auto h-[calc(100vh-4rem)]">
          {activeSection === "profile" && <ProfileForm />}
          
          {activeSection === "notifications" && <NotificationForm />}
          {activeSection === "security" && <SecurityForm />}
          {activeSection === "account" && <AccountForm />}
        </div>
      </section>
    </div>
  )
}