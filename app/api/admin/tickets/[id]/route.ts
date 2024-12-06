import { supabaseAdmin } from '@/app/lib/supabase-admin'
import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  context: { params: { id: string } }
) {
  try {
    const params = await context.params // Attendre les paramètres
    const ticketId = parseInt(params.id)
    
    // Récupérer le ticket
    const { data: ticket, error } = await supabaseAdmin
      .from('tickets')
      .select(`
        *,
        project:projects(id, name),
        profile:profiles!tickets_profile_id_fkey(first_name, last_name)
      `)
      .eq('id', ticketId)
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ ticket })
  } catch (error: Error | unknown) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Erreur serveur' }, { status: 500 })
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { status } = await request.json()
    const ticketId = parseInt(params.id) // Convertir en nombre
    
    const { data, error } = await supabaseAdmin
      .from('tickets')
      .update({ 
        status,
        updated_at: new Date().toISOString()
      })
      .eq('id', ticketId)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ ticket: data })
  } catch (error) {
    console.error('Erreur:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
} 