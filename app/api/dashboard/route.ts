import { supabaseAdmin } from '@/app/lib/supabase-admin'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    // 1. Utiliser le client normal pour obtenir l'ID de l'utilisateur authentifié
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore })
    
    const { data: { session }, error: sessionError } = await supabase.auth.getSession()
    
    if (sessionError || !session) {
      console.error('Erreur session:', sessionError)
      return NextResponse.json({ error: 'Non authentifié' }, { status: 401 })
    }

    // 2. Récupérer le profil avec supabaseAdmin
    const { data: profile, error: profileError } = await supabaseAdmin
      .from('profiles')
      .select('*')
      .eq('id', session.user.id)
      .single()

    if (profileError) {
      console.error('Erreur profil:', profileError)
      return NextResponse.json({ 
        error: 'Erreur lors de la récupération du profil',
        details: profileError.message 
      }, { status: 500 })
    }

    // 3. Récupérer les projets avec supabaseAdmin
    const { data: userProjects, error: projectsError } = await supabaseAdmin
      .from('user_projects')
      .select(`
        project_id,
        role,
        projects:project_id (
          id,
          name,
          description,
          state
        )
      `)
      .eq('user_id', session.user.id)
    
    if (projectsError) {
      console.error('Erreur projets:', projectsError)
      return NextResponse.json({ 
        error: 'Erreur lors de la récupération des projets',
        details: projectsError.message
      }, { status: 500 })
    }

    return NextResponse.json({
      profile,
      user: {
        email: session.user.email,
        id: session.user.id
      },
      projects: userProjects?.map(item => ({
        ...item.projects,
        userRole: item.role
      })) || []
    })

  } catch (error) {
    console.error('Erreur API Dashboard:', error)
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    )
  }
} 