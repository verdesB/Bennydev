import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function DELETE(request: Request) {
  try {
    // Vérification de l'authentification
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
    
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    
    if (sessionError || !session) {
      return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
    }

    // Vérification du rôle admin
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', session.user.id)
      .single();

    if (profileError || profile?.role !== 'admin') {
      return NextResponse.json({ error: 'Accès non autorisé' }, { status: 403 });
    }

    // Récupération du code projet depuis le body
    const { projectIdentifier } = await request.json();

    if (!projectIdentifier) {
      return NextResponse.json(
        { error: 'Identifiant du projet requis' },
        { status: 400 }
      );
    }

    console.log('Recherche de fichier contenant:', projectIdentifier);

    // Création du client admin Supabase
    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // Liste tous les fichiers du bucket
    const { data: files, error: listError } = await supabaseAdmin
      .storage
      .from('bennydev.projets')
      .list();

    if (listError) {
      console.error('Erreur lors de la recherche du fichier:', listError);
      return NextResponse.json(
        { error: 'Erreur lors de la recherche du fichier' },
        { status: 500 }
      );
    }

    // Recherche le fichier qui contient le projectIdentifier
    const fileToDelete = files.find(file => file.name.includes(projectIdentifier));

    if (!fileToDelete) {
      return NextResponse.json(
        { error: 'Fichier non trouvé' },
        { status: 404 }
      );
    }

    console.log('Fichier trouvé:', fileToDelete.name);

    // Suppression du fichier trouvé
    const { error: deleteError } = await supabaseAdmin
      .storage
      .from('bennydev.projets')
      .remove([fileToDelete.name]);

    if (deleteError) {
      console.error('Erreur lors de la suppression:', deleteError);
      return NextResponse.json(
        { error: 'Erreur lors de la suppression du fichier' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Fichier supprimé avec succès'
    });

  } catch (error) {
    console.error('Erreur complète:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la suppression du fichier' },
      { status: 500 }
    );
  }
} 