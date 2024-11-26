"use client"

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { useCallback } from 'react'

export const useAuth = () => {
  const supabase = createClientComponentClient()
  const router = useRouter()

  const signOut = useCallback(async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) {
        console.error('Erreur lors de la déconnexion:', error)
        throw error
      }
      
      // Rediriger vers la page de connexion
      router.push('/login')
      router.refresh() // Force le rafraîchissement pour mettre à jour l'état d'authentification
      
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error)
      throw error
    }
  }, [supabase, router])

  return {
    signOut
  }
} 