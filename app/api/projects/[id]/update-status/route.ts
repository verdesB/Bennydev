import { supabaseAdmin } from '@/app/lib/supabase-admin';
import { NextResponse } from 'next/server';

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { status } = await request.json();
    
    // Récupérer le projet avec les informations du client
    const { error: projectError } = await supabaseAdmin
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

   

    return NextResponse.json({ data: data[0] });

  } catch (error: Error | unknown) {
    console.error('Erreur complète:', error);
    return NextResponse.json({ 
      error: error instanceof Error ? error.message : 'Erreur lors de la mise à jour du statut',
      details: error
    }, { status: 500 });
  }
} 