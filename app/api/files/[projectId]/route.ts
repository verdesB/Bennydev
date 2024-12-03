import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function GET(
  request: Request,
  { params }: { params: { projectId: string } }
) {
  console.log('Récupération des fichiers pour le projet:', params.projectId);

  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    console.log('Requête Supabase pour project_id:', params.projectId);

    const { data, error } = await supabase
      .from('files')
      .select('*')
      .eq('project_id', params.projectId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Erreur Supabase:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    console.log('Fichiers trouvés:', data);

    return NextResponse.json(data || []);

  } catch (error) {
    console.error('Erreur serveur:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
} 