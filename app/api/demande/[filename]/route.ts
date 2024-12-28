import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/app/lib/supabase-admin';

export async function GET(
  request: Request,
  context: { params: Promise<{ filename: string }> }
) {
  try {
    const { filename } = await context.params;

    // Téléchargement du contenu du fichier
    const { data, error: downloadError } = await supabaseAdmin
      .storage
      .from('bennydev.projets')
      .download(filename);

    if (downloadError) {
      return NextResponse.json({ error: downloadError.message }, { status: 500 });
    }

    if (!data) {
      return NextResponse.json({ error: 'Fichier non trouvé' }, { status: 404 });
    }

    // Conversion du contenu en texte
    const content = await data.text();

    return NextResponse.json({ content });

  } catch (err) {
    return NextResponse.json(
      { error: 'Erreur lors de la récupération du contenu du fichier' },
      { status: 500 }
    );
  }
} 