import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const {  newPassword } = await request.json()
    
    const supabase = createRouteHandlerClient({ cookies })
    
    // Mettre à jour le mot de passe
    const { error } = await supabase.auth.updateUser({
      password: newPassword
    })

    if (error) {
      return NextResponse.json(
        { error: "Erreur lors de la modification du mot de passe" },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { message: "Mot de passe mis à jour avec succès" },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur serveur", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    )
  }
} 