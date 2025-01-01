import { NextResponse } from 'next/server'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export async function PATCH(req: Request) {
  try {
    const { username } = await req.json()
    
    // Création du client Supabase
    const supabase = createRouteHandlerClient({ cookies })
    
    // Récupération de la session utilisateur
    const { data: { session } } = await supabase.auth.getSession()
    
    if (!session) {
      return NextResponse.json(
        { error: 'Non autorisé' },
        { status: 401 }
      )
    }

    console.log('Username à mettre à jour:', username)
    const { data, error } = await supabase.auth.updateUser({
      data: {
        display_name: username
      }
    })
    console.log('Réponse de la mise à jour:', data, error)

    if (error) {
      console.error('Erreur de mise à jour:', error)
      throw error
    }

    console.log('Mise à jour réussie:', data)
    
    return NextResponse.json({ message: 'Nom d\'utilisateur mis à jour' })
  } catch (error) {
    return NextResponse.json(
      { error: 'Erreur lors de la mise à jour du nom d\'utilisateur' },
      { status: 500 }
    )
  }
} 