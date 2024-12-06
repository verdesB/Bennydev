import { supabaseAdmin } from '@/app/lib/supabase-admin';
import { NextResponse } from 'next/server';

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { figmaUrl, stagingUrl } = await request.json();
    
    console.log('ID reçu:', params.id);
    console.log('URLs reçues:', { figmaUrl, stagingUrl });

    // Vérifions d'abord si on peut trouver le projet
    const { data: checkProject } = await supabaseAdmin
      .from('projects')
      .select('*')
      .eq('id', params.id);
    
    console.log('Résultat de la vérification:', checkProject);

    if (checkProject && checkProject.length > 0) {
      const { data, error } = await supabaseAdmin
        .from('projects')
        .update({ 
          figma_link: figmaUrl,
          prod_test_url: stagingUrl 
        })
        .eq('id', params.id)
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
        idRecherche: params.id,
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