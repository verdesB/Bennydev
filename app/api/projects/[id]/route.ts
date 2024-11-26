import { supabaseAdmin } from '@/app/lib/supabase-admin'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Vérifier l'authentification
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore })
    
    const { data: { session }, error: sessionError } = await supabase.auth.getSession()
    
    if (sessionError || !session) {
      return NextResponse.json({ error: 'Non authentifié' }, { status: 401 })
    }

    // Récupérer les détails du projet
    const { data: projectData, error: projectError } = await supabaseAdmin
      .from('user_projects')
      .select(`
        role,
        projects:project_id (
          id,
          name,
          description,
          state,
          figma_link,
          prod_test_url,
          created_at,
          updated_at
        )
      `)
      .eq('project_id', params.id)
      .eq('user_id', session.user.id)
      .single()

    if (projectError) {
      console.error('Erreur projet:', projectError)
      return NextResponse.json({ error: 'Projet non trouvé' }, { status: 404 })
    }

    return NextResponse.json({
      ...projectData.projects,
      userRole: projectData.role
    })

  } catch (error) {
    console.error('Erreur:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
} 