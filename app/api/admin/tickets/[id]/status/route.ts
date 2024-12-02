import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Initialiser le client Supabase avec authentification
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore })
    
    // Vérifier la session et le rôle admin
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      return NextResponse.json({ error: 'Non authentifié' }, { status: 401 })
    }

    // Vérifier le rôle admin
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', session.user.id)
      .single()

    if (profile?.role !== 'admin') {
      return NextResponse.json({ error: 'Accès non autorisé' }, { status: 403 })
    }

    // Récupérer le nouveau statut depuis le body
    const { status } = await request.json()
    const ticketId = parseInt(params.id)

    // Récupérer les informations du ticket et son propriétaire
    const { data: ticketData, error: ticketError } = await supabase
      .from('tickets')
      .select(`
        *,
        profile:profiles!tickets_profile_id_fkey(id)
      `)
      .eq('id', ticketId)
      .single()

    if (ticketError) {
      return NextResponse.json({ error: ticketError.message }, { status: 500 })
    }

    // Mettre à jour le statut du ticket
    const { data: ticket, error } = await supabase
      .from('tickets')
      .update({ 
        status,
        updated_at: new Date().toISOString()
      })
      .eq('id', ticketId)
      .select(`
        *,
        project:projects(id, name),
        profile:profiles!tickets_profile_id_fkey(first_name, last_name)
      `)
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // Créer une notification pour le propriétaire du ticket
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/create-notification`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: ticketData.profile.id,
          title: 'Mise à jour du statut',
          message: `Le statut de votre ticket "${ticket.title}" a été mis à jour vers "${status}"`,
          type: 'TICKET_STATUS',
          ticket_id: ticketId
        })
      })

      if (!response.ok) {
        console.error('Erreur lors de la création de la notification')
      }
    } catch (notifError) {
      console.error('Erreur notification:', notifError)
    }

    return NextResponse.json({ ticket })
  } catch (error) {
    console.error('Erreur:', error)
    return NextResponse.json({ 
      error: 'Erreur lors de la mise à jour du statut',
      details: error instanceof Error ? error.message : 'Erreur inconnue'
    }, { status: 500 })
  }
} 