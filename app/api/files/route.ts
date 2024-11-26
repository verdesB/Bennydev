import { createClient } from '@supabase/supabase-js'

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

export async function GET() {
  try {
    const { data, error } = await supabase
      .storage
      .from('bennydev.projets')
      .list()

    if (error) {
      console.error('Erreur Supabase:', error)
      return Response.json({ error: error.message }, { status: 500 })
    }

    const mdFiles = data?.filter(file => file.name.endsWith('.md')) || []
    return Response.json({ files: mdFiles })
  } catch (error) {
    console.error('Erreur complète:', error)
    return Response.json({ error: 'Erreur serveur' }, { status: 500 })
  }
} 