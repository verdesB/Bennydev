import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
)

export async function GET(
    request: Request,
    { params }: { params: { projectId: string } }
  ) {
    try {
      const projectId = params.projectId;
      
      const { data: filesData, error: filesError } = await supabase
        .from('files')
        .select('*')
        .eq('project_id', projectId)
        .order('created_at', { ascending: false });
  
      if (filesError) {
        console.error('Erreur récupération fichiers:', filesError);
        return NextResponse.json({ error: filesError.message }, { status: 500 });
      }
  
      // Vérifier que les URLs sont valides
      const validatedFiles = filesData?.map(file => ({
        ...file,
        image_url: file.image_url || '/placeholder-image.webp' // URL par défaut si manquante
      }));
  
      return NextResponse.json(validatedFiles || []);
  
    } catch (error: any) {
      console.error('Erreur complète:', error);
      return NextResponse.json(
        { error: `Erreur serveur: ${error.message}` }, 
        { status: 500 }
      );
    }
  }