import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const supabase = createRouteHandlerClient({ cookies })

    const { data: projects } = await supabase
      .from('projects')
      .select('*')
      .order('name')

    return NextResponse.json({ projects })
  } catch (error) {
    return NextResponse.json(
      { message: 'Erreur lors de la récupération des projets', error },
      { status: 500 }
    )
  }
} 