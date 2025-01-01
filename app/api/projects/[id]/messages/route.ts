import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { supabaseAdmin } from '@/app/lib/supabase-admin';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    // 1. Vérification auth avec le client normal
    const { id } = await context.params;
    const supabase = createRouteHandlerClient({ cookies });
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    console.log('1. Auth check:', { 
      userId: user?.id, 
      authError 
    });

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Non authentifié' },
        { status: 401 }
      );
    }

    // 2. Vérification que le projet existe
    const { data: project, error: projectError } = await supabaseAdmin
      .from('projects')
      .select('id')
      .eq('id', id)
      .single();

    console.log('2. Project check:', { 
      projectId: id,
      project,
      projectError
    });

    if (projectError || !project) {
      return NextResponse.json(
        { error: 'Projet non trouvé' },
        { status: 404 }
      );
    }

    // 3. Vérification des droits utilisateur
    const { data: userProject, error: userProjectError } = await supabaseAdmin
      .from('user_projects')
      .select('role')
      .eq('project_id', id)
      .eq('user_id', user.id)
      .single();

    console.log('3. User rights check:', {
      userId: user.id,
      projectId: id,
      userProject,
      userProjectError
    });

    if (userProjectError) {
      return NextResponse.json(
        { 
          error: 'Erreur vérification droits', 
          details: userProjectError.message 
        },
        { status: 500 }
      );
    }

    if (!userProject) {
      return NextResponse.json(
        { error: 'Utilisateur non membre du projet' },
        { status: 403 }
      );
    }

    if (!['member', 'owner'].includes(userProject.role)) {
      return NextResponse.json(
        { 
          error: 'Rôle invalide', 
          details: `Role actuel: ${userProject.role}` 
        },
        { status: 403 }
      );
    }

    // 4. Récupération du message
    const { message } = await request.json();
    
    if (!message?.trim()) {
      return NextResponse.json(
        { error: 'Message vide' },
        { status: 400 }
      );
    }

    // 5. Insertion du message
    const { data: newMessage, error: insertError } = await supabaseAdmin
      .from('project_messages')
      .insert({
        project_id: id,
        sender_id: user.id,
        message: message.trim()
      })
      .select(`
        *,
        profiles:sender_id (
          first_name,
          last_name,
          avatar
        )
      `)
      .single();

    console.log('5. Message insertion:', {
      newMessage,
      insertError
    });

    if (insertError) {
      return NextResponse.json(
        { 
          error: 'Erreur insertion message',
          details: insertError.message
        },
        { status: 500 }
      );
    }

    return NextResponse.json({ data: newMessage });

  } catch (error) {
    console.error('Erreur générale:', error);
    return NextResponse.json(
      { 
        error: 'Erreur serveur',
        details: error instanceof Error ? error.message : 'Erreur inconnue'
      },
      { status: 500 }
    );
  }
}

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const { data: messages, error } = await supabaseAdmin
    .from('project_messages')
    .select(`
      *,
      profiles:sender_id (
        first_name,
        last_name,
        avatar
      )
    `)
    .eq('project_id', id)
    .order('created_at', { ascending: true });

  if (error) {
    return NextResponse.json(
      { error: 'Erreur récupération messages' },
      { status: 500 }
    );
  }

  return NextResponse.json({ data: messages });
} 