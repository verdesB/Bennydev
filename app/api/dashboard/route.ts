import { supabaseAdmin } from '@/app/lib/supabase-admin'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    console.log('1. Début de la requête')
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore })
    
    const { data: { session }, error: sessionError } = await supabase.auth.getSession()
    
    if (sessionError || !session) {
      console.error('2. Erreur session:', sessionError)
      return NextResponse.json({ error: 'Non authentifié' }, { status: 401 })
    }

    console.log('3. Session OK:', session.user.id)

    const { data: profile, error: profileError } = await supabaseAdmin
      .from('profiles')
      .select('*')
      .eq('id', session.user.id)
      .single()

    if (profileError) {
      console.error('4. Erreur profil:', profileError)
      return NextResponse.json({ error: 'Erreur profil: ' + profileError.message }, { status: 500 })
    }

    console.log('5. Profil OK:', profile)

    const { data: tickets, error: ticketsError } = await supabaseAdmin
      .from('tickets')
      .select('*')
      .eq('profile_id', session.user.id)

    if (ticketsError) {
      console.error('6. Erreur tickets:', ticketsError)
      return NextResponse.json({ error: 'Erreur tickets: ' + ticketsError.message }, { status: 500 })
    }

    console.log('7. Tickets OK:', tickets?.length)

    const { data: userProjects, error: projectsError } = await supabaseAdmin
      .from('user_projects')
      .select(`
        project_id,
        role,
        projects:project_id (
          id,
          name,
          description,
          state,
          type
        )
      `)
      .eq('user_id', session.user.id)
    
    if (projectsError) {
      console.error('8. Erreur projets:', projectsError)
      return NextResponse.json({ error: 'Erreur projets: ' + projectsError.message }, { status: 500 })
    }

    console.log('9. Projets OK:', userProjects?.length)

    return NextResponse.json({
      profile,
      user: {
        email: session.user.email,
        id: session.user.id
      },
      tickets: tickets || [],
      projects: userProjects?.map(item => ({
        ...item.projects,
        userRole: item.role
      })) || []
    })

  } catch (error) {
    console.error('Erreur API Dashboard complète:', error)
    return NextResponse.json(
      { error: 'Erreur serveur détaillée: ' + error.message },
      { status: 500 }
    )
  }
} 