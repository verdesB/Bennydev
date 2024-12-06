import { supabaseAdmin } from "@/app/lib/supabase-admin"

export async function GET(
    request: Request,
    context: { params: Promise<{ token: string }> }
) {
    try {
        const { token } = await context.params;
        console.log('Vérification du token:', token)

        // Récupérer uniquement la session
        const { data: session, error: sessionError } = await supabaseAdmin
            .from('sessions')
            .select('*')
            .eq('token', token)
            .single()

        console.log('Session trouvée:', session)
        console.log('Erreur session:', sessionError)

        if (sessionError || !session) {
            console.error('Erreur session:', sessionError)
            return Response.json({ error: 'Session invalide' }, { status: 404 })
        }

        // Vérifier si la session n'est pas expirée
        if (new Date(session.expires_at) < new Date()) {
            console.error('Session expirée pour le token:', token)
            return Response.json({ error: 'Session expirée' }, { status: 401 })
        }

        if (request.method === 'POST') {
            const body = await request.json()
            
            // Vérifier que l'email correspond à celui de la session
            if (session.email !== body.email) {
                return Response.json({ error: 'Email non autorisé pour cette session' }, { status: 401 })
            }

            // Tenter de se connecter avec les identifiants fournis
            const { data: signInData, error: signInError } = await supabaseAdmin.auth.signInWithPassword({
                email: body.email,
                password: body.tempPassword
            })

            if (signInError || !signInData.user) {
                return Response.json({ error: 'Email ou mot de passe incorrect' }, { status: 401 })
            }
        }

        return Response.json({ 
            data: {
                email: session.email,
                expires_at: session.expires_at
            } 
        })
    } catch (error) {
        console.error('Erreur complète:', error)
        return Response.json({ error: 'Erreur serveur' }, { status: 500 })
    }
} 