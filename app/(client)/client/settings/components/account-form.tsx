"use client"

import { useState } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useRouter } from "next/navigation"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"

export function AccountForm() {
  const router = useRouter()
  const supabase = createClientComponentClient()
  const [isLoading, setIsLoading] = useState(false)

  const handleDeleteAccount = async () => {
    try {
      setIsLoading(true)
      
      const response = await fetch('/api/delete-account', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.details || data.error)
      }

      await supabase.auth.signOut()
      router.push('/login')
    } catch (error) {
      console.error('Erreur détaillée:', error)
      alert(`Erreur lors de la suppression du compte: ${error instanceof Error ? error.message : String(error)}`)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Compte</h3>
        <p className="text-sm text-muted-foreground">
          Gérez les paramètres de votre compte et supprimez votre compte si nécessaire.
        </p>
      </div>

      <div className="border-t pt-6">
        <h4 className="text-sm font-medium text-destructive mb-4">Zone de danger</h4>
        
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive">
              Supprimer mon compte
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Êtes-vous absolument sûr ?</AlertDialogTitle>
              <AlertDialogDescription className="space-y-2">
                <span>Cette action est irréversible. Elle supprimera définitivement votre compte
                et toutes les données associées.</span>
                
                <span className="font-medium text-destructive">
                  ATTENTION : La suppression de votre compte pendant la période de développement 
                  du projet et après l&apos;engagement contractuel ne met pas fin au contrat en cours. 
                  Vos obligations contractuelles restent en vigueur.
                </span>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Annuler</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDeleteAccount}
                className="bg-destructive hover:bg-destructive/90"
                disabled={isLoading}
              >
                {isLoading ? "Suppression..." : "Supprimer mon compte"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  )
}