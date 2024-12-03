import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/app/lib/supabase-admin';

export async function GET() {
  try {
    // Vérification de l'authentification
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
    
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    
    if (sessionError || !session) {
      return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
    }

    // Vérification du rôle admin
    const { data: profile, error: profileError } = await supabaseAdmin
      .from('profiles')
      .select('role')
      .eq('id', session.user.id)
      .single();

    if (profileError || profile?.role !== 'admin') {
      return NextResponse.json({ error: 'Accès non autorisé' }, { status: 403 });
    }

    // Récupération des fichiers MD depuis le bucket Supabase
    const { data: files, error: filesError } = await supabaseAdmin
      .storage
      .from('bennydev.projets') // Assurez-vous que le nom du bucket est correct
      .list();

    if (filesError) {
      console.error('Erreur lors de la récupération des fichiers:', filesError);
      return NextResponse.json({ error: filesError.message }, { status: 500 });
    }

    console.log('Fichiers récupérés:', files); // Log pour vérifier les fichiers récupérés

    // Filtrer uniquement les fichiers .md
    const mdFiles = files.filter(file => file.name.endsWith('.md'));

    // Formater les données des fichiers
    const formattedFiles = mdFiles.map(file => ({
      id: file.id,
      name: file.name,
      created_at: file.created_at,
      size: file.metadata?.size || 0
    }));

    return NextResponse.json({ files: formattedFiles });

  } catch (error) {
    console.error('Erreur complète:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des fichiers' },
      { status: 500 }
    );
  }
} 