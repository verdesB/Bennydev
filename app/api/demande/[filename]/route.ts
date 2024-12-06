
import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/app/lib/supabase-admin';

export async function GET(
  request: Request,
  { params }: { params: { filename: string } }
) {
  try {
    console.log('Tentative de récupération du fichier:', params.filename);

    // Téléchargement du contenu du fichier
    const { data, error: downloadError } = await supabaseAdmin
      .storage
      .from('bennydev.projets')
      .download(params.filename);

    if (downloadError) {
      console.error('Erreur lors du téléchargement du fichier:', downloadError);
      return NextResponse.json({ error: downloadError.message }, { status: 500 });
    }

    if (!data) {
      console.error('Aucune donnée reçue pour le fichier:', params.filename);
      return NextResponse.json({ error: 'Fichier non trouvé' }, { status: 404 });
    }

    // Conversion du contenu en texte
    const content = await data.text();
    console.log('Contenu récupéré avec succès pour:', params.filename);

    return NextResponse.json({ content });

  } catch (error) {
    console.error('Erreur complète:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération du contenu du fichier' },
      { status: 500 }
    );
  }
} 