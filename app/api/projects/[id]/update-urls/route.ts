import { supabaseAdmin } from '@/app/lib/supabase-admin';
import { NextResponse } from 'next/server';

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { figmaUrl, stagingUrl } = await request.json();
    const { id } = await context.params;
    console.log('ID reçu:', id);
    console.log('URLs reçues:', { figmaUrl, stagingUrl });

    // Vérifions d'abord si on peut trouver le projet
    const { data: checkProject } = await supabaseAdmin
      .from('projects')
      .select('*')
      .eq('id', id);
    
    console.log('Résultat de la vérification:', checkProject);

    if (checkProject && checkProject.length > 0) {
      const { data, error } = await supabaseAdmin
        .from('projects')
        .update({ 
          figma_link: figmaUrl,
          prod_test_url: stagingUrl 
        })
        .eq('id', id)
        .select();

      if (error) {
        console.log('Erreur mise à jour:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
      }

      return NextResponse.json({ data: data[0] });
    }

    return NextResponse.json({ 
      error: 'Projet non trouvé',
      debugInfo: {
        idRecherche: id,
        resultatRecherche: checkProject
      }
    }, { status: 404 });

  } catch (error: Error | unknown) {
    console.error('Erreur complète:', error);
    return NextResponse.json({ 
      error: error instanceof Error ? error.message : 'Erreur lors de la mise à jour des URLs',
      details: error
    }, { status: 500 });
  }
} 