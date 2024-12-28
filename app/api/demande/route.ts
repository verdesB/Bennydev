import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/app/lib/supabase-admin';

// Create a middleware function to handle cookie store
function getSupabaseClient(requestCookies: ReturnType<typeof cookies>) {
  return createRouteHandlerClient({ 
    cookies: () => requestCookies
  });
}

export async function GET() {
  try {
    // Utilisation des cookies de la requête avec await
    const cookieStore = cookies();
    const supabase = getSupabaseClient(cookieStore);
    
    // Get and verify session
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    
    if (sessionError || !session) {
      console.error('Erreur de session:', sessionError);
      return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
    }

    // Ajout de vérification supplémentaire pour session.user
    if (!session.user) {
      return NextResponse.json({ error: 'Données utilisateur manquantes' }, { status: 401 });
    }

    // Verify admin role
    const { data: profile, error: profileError } = await supabaseAdmin
      .from('profiles')
      .select('role')
      .eq('id', session.user.id)
      .single();

    if (profileError) {
      console.error('Erreur de profil:', profileError);
      return NextResponse.json({ error: 'Erreur lors de la vérification du profil' }, { status: 500 });
    }

    if (!profile || profile.role !== 'admin') {
      return NextResponse.json({ error: 'Accès non autorisé' }, { status: 403 });
    }

    // Get files from Supabase bucket
    const { data: files, error: filesError } = await supabaseAdmin
      .storage
      .from('bennydev.projets')
      .list();

    if (filesError) {
      return NextResponse.json({ error: filesError.message }, { status: 500 });
    }

    // Filter and format MD files
    const mdFiles = files
      .filter(file => file.name.endsWith('.md'))
      .map(file => ({
        id: file.id,
        name: file.name,
        created_at: file.created_at,
        size: file.metadata?.size || 0
      }));

    return NextResponse.json({ files: mdFiles });

  } catch (error) {
    console.error('Route handler error:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des fichiers' },
      { status: 500 }
    );
  }
}