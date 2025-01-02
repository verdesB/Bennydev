import { NextResponse } from "next/server"
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

export async function PUT(request: Request) {
  try {
    const supabase = createRouteHandlerClient({ cookies })
    
    // Vérifier si l'utilisateur est connecté
    const { data: { session } } = await supabase.auth.getSession()
    
    if (!session) {
      return new NextResponse("Non autorisé", { status: 401 })
    }

    const body = await request.json()
    const { currentPassword, newPassword } = body

    // Vérifier le mot de passe actuel
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: session.user.email!,
      password: currentPassword
    })

    if (signInError) {
      return new NextResponse("Mot de passe actuel incorrect", { status: 400 })
    }

    // Mettre à jour le mot de passe avec Supabase
    const { error } = await supabase.auth.updateUser({
      password: newPassword
    })

    if (error) {
      console.error(error)
      return new NextResponse("Erreur lors de la mise à jour du mot de passe", { status: 400 })
    }

    return new NextResponse("Mot de passe mis à jour avec succès", { status: 200 })
  } catch (error) {
    console.error(error)
    return new NextResponse("Erreur interne du serveur", { status: 500 })
  }
} 