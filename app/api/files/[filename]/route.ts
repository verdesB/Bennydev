import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(
  request: Request,
  { params }: { params: { filename: string } }
) {
  try {
    const filename = await params.filename

    const { data, error } = await supabase
      .storage
      .from('bennydev.projets')
      .download(filename)

    if (error) {
      console.error('Erreur Supabase:', error)
      return Response.json({ error: error.message }, { status: 500 })
    }

    const content = await data.text()
    return Response.json({ content })
  } catch (error) {
    console.error('Erreur complète:', error)
    return Response.json({ error: 'Erreur serveur' }, { status: 500 })
  }
} 