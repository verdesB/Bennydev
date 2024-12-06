import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

    const payload = await request.json();
    console.log('Payload reçu:', payload);

    const { user_id, title, message, project_id } = payload;

    // Validation des données requises
    if (!user_id || !title || !message) {
      console.log('Données manquantes:', { user_id, title, message });
      return NextResponse.json(
        { error: 'Données manquantes' },
        { status: 400 }
      );
    }

    // Si project_id est fourni, récupérer le nom du projet
    let finalMessage = message;
    if (project_id) {
      const { data: project } = await supabase
        .from('projects')
        .select('name')
        .eq('id', project_id)
        .single();

      if (project) {
        finalMessage = message.replace('${selectedProject.name}', project.name);
      }
    }

    // Création de la notification
    const { data: notification, error } = await supabase
      .from('notifications')
      .insert({
        user_id,
        title,
        message: finalMessage,
       
        is_read: false,
        created_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) {
      console.error('Erreur Supabase détaillée:', {
        code: error.code,
        message: error.message,
        details: error.details
      });
      return NextResponse.json(
        { error: `Erreur lors de la création de la notification: ${error.message}` },
        { status: 500 }
      );
    }

    return NextResponse.json({ data: notification });
  } catch (error) {
    console.error('Erreur serveur détaillée:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Erreur serveur inconnue' },
      { status: 500 }
    );
  }
} 