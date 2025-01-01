import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const supabase = createRouteHandlerClient({ cookies })
    
    // Récupérer la session de l'utilisateur
    const { data: { session } } = await supabase.auth.getSession()

    if (!session) {
      return new NextResponse("Non autorisé", { status: 401 })
    }

    // Récupérer l'avatar depuis la table profile
    const { data: profileData, error } = await supabase
      .from('profiles')
      .select('avatar')
      .eq('id', session.user.id)
      .single()

    if (error) {
      console.error("[PROFILE_GET]", error)
      return new NextResponse("Erreur lors de la récupération du profil", { status: 500 })
    }

    // Les données sont directement dans user_metadata
    const { user } = session
    const userData = {
      email: user.email,
      displayName: user.user_metadata.displayName || user.user_metadata.display_name,
      avatar: profileData?.avatar || null
    }

    return NextResponse.json(userData)
  } catch (error) {
    console.error("[PROFILE_GET]", error)
    return new NextResponse("Erreur interne", { status: 500 })
  }
} 