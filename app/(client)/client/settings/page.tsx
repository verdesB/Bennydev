"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"


import { ProfileForm } from "./components/profile-form"
import { AccountForm } from "./components/account-form"
import { NotificationForm } from "./components/notifications-form"
import { SecurityForm } from "./components/security-form"

export default function SettingsPage() {
  return (
    <div>
      <div className="max-w-[1000px] mr-auto py-10">
        <div className="space-y-0.5 mb-8">
          <h2 className="text-2xl font-medium tracking-tight text-gray-900 dark:text-gray-100">Paramètres</h2>
          <p className="text-muted-foreground text-sm">
            Gérez les paramètres de votre compte et définissez vos préférences.
          </p>
        </div>
        
        <div className="backdrop-blur-sm bg-white/30 dark:bg-gray-900/30 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="w-full justify-start gap-2 rounded-none border-b border-gray-200 dark:border-gray-800 px-4 h-16">
              <TabsTrigger 
                value="profile"
                className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-gray-900 dark:data-[state=active]:border-gray-100 rounded-none"
              >
                Profil
              </TabsTrigger>
              <TabsTrigger 
                value="account"
                className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-gray-900 dark:data-[state=active]:border-gray-100 rounded-none"
              >
                Compte
              </TabsTrigger>
              <TabsTrigger 
                value="notifications"
                className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-gray-900 dark:data-[state=active]:border-gray-100 rounded-none"
              >
                Notifications
              </TabsTrigger>
              <TabsTrigger 
                value="security"
                className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-gray-900 dark:data-[state=active]:border-gray-100 rounded-none"
              >
                Sécurité
              </TabsTrigger>
            </TabsList>

            <div className="p-6">
              <TabsContent value="profile">
                <ProfileForm />
              </TabsContent>

              <TabsContent value="account">
                <AccountForm />
              </TabsContent>

              <TabsContent value="notifications">
                <NotificationForm />
              </TabsContent>

              <TabsContent value="security">
                <SecurityForm />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  )
}