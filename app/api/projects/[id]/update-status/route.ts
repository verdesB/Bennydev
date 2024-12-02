import { supabaseAdmin } from '@/app/lib/supabase-admin';
import { NextResponse } from 'next/server';

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { status } = await request.json();
    
    // Récupérer le projet avec les informations du client
    const { data: project, error: projectError } = await supabaseAdmin
      .from('projects')
      .select(`
        *,
        user_projects!inner (
          user_id,
          role
        )
      `)
      .eq('id', params.id)
      .single();

    if (projectError) {
      return NextResponse.json({ error: projectError.message }, { status: 500 });
    }

    // Mettre à jour le statut
    const { data, error } = await supabaseAdmin
      .from('projects')
      .update({ state: status })
      .eq('id', params.id)
      .select();

    if (error) {
      console.log('Erreur mise à jour:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Trouver le client du projet
    const clientUser = project.user_projects.find(up => up.role === 'member');
    
    if (clientUser?.user_id) {
      // Créer la notification pour le client (user_id du profile est le même que l'auth.users)
      const { error: notificationError } = await supabaseAdmin
        .from('notifications')
        .insert({
          user_id: clientUser.user_id, // Utilisation directe du user_id qui est le même que l'id du profile
          message: `Le statut du projet "${project.name}" a été mis à jour vers "${status}"`,
          is_read: false
        });

      if (notificationError) {
        console.log('Erreur création notification:', notificationError);
      }
    }

    return NextResponse.json({ data: data[0] });

  } catch (error: any) {
    console.error('Erreur complète:', error);
    return NextResponse.json({ 
      error: error.message || 'Erreur lors de la mise à jour du statut',
      details: error
    }, { status: 500 });
  }
} 