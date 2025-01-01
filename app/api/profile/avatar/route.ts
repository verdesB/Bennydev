import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function PATCH(request: Request) {
  try {
    const supabase = createRouteHandlerClient({ cookies })
    
    // Vérifier l'authentification
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Non autorisé' },
        { status: 401 }
      )
    }

    // Récupérer les données du formulaire
    const formData = await request.formData()
    const file = formData.get('avatar') as File

    if (!file) {
      return NextResponse.json(
        { error: 'Aucun fichier fourni' },
        { status: 400 }
      )
    }

    // Récupérer le project_code du profil
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('project_code')
      .eq('id', user.id)
      .single()

    if (profileError || !profile) {
      return NextResponse.json(
        { error: 'Profil non trouvé' },
        { status: 404 }
      )
    }

    // Créer un nom de fichier unique
    const fileExt = file.name.split('.').pop()
    const fileName = `${user.id}-${Date.now()}.${fileExt}`
    const filePath = `avatar/${fileName}`

    // Upload du fichier dans le bucket
    const { error: uploadError, data } = await supabase
      .storage
      .from(`Bennydev.${profile.project_code}`)
      .upload(filePath, file)

    if (uploadError) {
      return NextResponse.json(
        { error: 'Erreur lors de l\'upload de l\'image' },
        { status: 500 }
      )
    }

    // Obtenir l'URL publique
    const { data: { publicUrl } } = supabase
      .storage
      .from(`Bennydev.${profile.project_code}`)
      .getPublicUrl(filePath)

    // Mettre à jour l'avatar dans la table profiles
    const { error: updateError } = await supabase
      .from('profiles')
      .update({ avatar: publicUrl })
      .eq('id', user.id)

    if (updateError) {
      return NextResponse.json(
        { error: 'Erreur lors de la mise à jour de l\'avatar' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { message: 'Avatar mis à jour avec succès', url: publicUrl },
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