import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(
  request: Request,
  context: { params: { id: string } }
) {
  try {
    // Vérifier l'authentification
    const cookieStore = await  cookies()
    const supabase = createRouteHandlerClient({ cookies: async () => cookieStore })
    
    const { data: { session } } = await supabase.auth.getSession()
    
    if (!session) {
      return NextResponse.json({ error: 'Non authentifié' }, { status: 401 })
    }

    const params = await context.params
    const ticketId = parseInt(params.id)
    const { content } = await request.json()

    // Ajouter le commentaire avec l'ID de l'utilisateur connecté
    const { data: comment, error } = await supabase
      .from('ticket_comments')
      .insert({
        ticket_id: ticketId,
        content,
        profile_id: session.user.id,
        created_at: new Date().toISOString()
      })
      .select(`
        *,
        profiles!ticket_comments_profile_id_fkey (
          first_name,
          last_name
        )
      `)
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ comment })
  } catch (error: Error | unknown) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Erreur serveur' }, { status: 500 })
  }
} 