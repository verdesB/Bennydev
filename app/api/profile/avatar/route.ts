import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function PATCH(request: Request) {
  try {
    const supabase = createRouteHandlerClient({ cookies })
    
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Non autorisé' },
        { status: 401 }
      )
    }

    const { avatarUrl } = await request.json()

    // Mettre à jour l'avatar dans la table profiles avec l'URL signée
    const { error: updateError } = await supabase
      .from('profiles')
      .update({ avatar: avatarUrl })
      .eq('id', user.id)

    if (updateError) {
      return NextResponse.json(
        { error: 'Erreur lors de la mise à jour de l\'avatar' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { message: 'Avatar mis à jour avec succès', url: avatarUrl },
      { status: 200 }
    )

  } catch (error) {
    console.error('Erreur:', error)
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    )
  }
} 