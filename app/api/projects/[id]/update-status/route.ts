import { supabaseAdmin } from '@/app/lib/supabase-admin';
import { NextResponse } from 'next/server';

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { status } = await request.json();
    
    // Debug logs détaillés
    console.log('ID reçu:', params.id);
    console.log('Type de ID:', typeof params.id);
    
    // Vérifions d'abord si on peut trouver le projet
    const { data: checkProject, error: checkError } = await supabaseAdmin
      .from('projects')
      .select('*')
      .eq('id', params.id);
    
    console.log('Résultat de la vérification:', checkProject);
    console.log('Erreur de la vérification:', checkError);

    // Si on trouve le projet, procédons à la mise à jour
    if (checkProject && checkProject.length > 0) {
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
    }

    // Si on ne trouve pas le projet
    return NextResponse.json({ 
      error: 'Projet non trouvé',
      debugInfo: {
        idRecherche: params.id,
        resultatRecherche: checkProject
      }
    }, { status: 404 });

  } catch (error: any) {
    console.error('Erreur complète:', error);
    return NextResponse.json({ 
      error: error.message || 'Erreur lors de la mise à jour du statut',
      details: error
    }, { status: 500 });
  }
} 