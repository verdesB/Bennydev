import { Resend } from 'resend'
import { supabaseAdmin } from '@/app/lib/supabase-admin'
import { cookies } from 'next/headers'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
    try {
        const cookieStore = await cookies()
        const allCookies = cookieStore.getAll()
        console.log('Tous les cookies:', allCookies)

        // Trouver le cookie d'authentification Supabase
        const supabaseCookie = allCookies.find(cookie => 
            cookie.name.includes('auth-token')
        )

        if (!supabaseCookie) {
            return Response.json({ error: 'Non autorisé - Token non trouvé' }, { status: 401 })
        }

        let parsedToken
        try {
            parsedToken = JSON.parse(supabaseCookie.value)
            console.log('Token parsé:', parsedToken)
        } catch (e) {
            console.error('Erreur parsing token:', e)
            return Response.json({ error: 'Token invalide' }, { status: 401 })
        }

        // Utiliser le premier élément du tableau comme token
        const accessToken = parsedToken[0]

        // Vérifier si l'utilisateur est admin avec le client admin
        const { data: { user }, error: userError } = await supabaseAdmin.auth.getUser(accessToken)
        
        if (userError || !user) {
            console.error('Erreur user:', userError)
            return Response.json({ error: 'Non autorisé - Utilisateur non trouvé' }, { status: 401 })
        }

        // Vérifier le rôle admin
        const { data: profile, error: profileError } = await supabaseAdmin
            .from('profiles')
            .select('role')
            .eq('id', user.id)
            .single()

        if (profileError || profile?.role !== 'admin') {
            return Response.json({ error: 'Accès réservé aux administrateurs' }, { status: 403 })
        }

        const { email, fileId, fileName } = await request.json()
        
        // En mode test, on force l'email de test
        
        
        const sessionToken = crypto.randomUUID()
        const sessionUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/session/${sessionToken}`
        
        // Créer la session
        const { error: sessionError } = await supabaseAdmin
            .from('sessions')
            .insert({
                token: sessionToken,
                file_id: fileId,
                email: email,
                created_by: user.id,
                expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24h
            })
            .select()
            .single()

        if (sessionError) {
            console.error('Erreur création session:', sessionError)
            return Response.json({ error: sessionError.message }, { status: 500 })
        }

        const { error } = await resend.emails.send({
            from: 'contact@bennydev.fr',
            to: email,
            subject: `Accès à votre session - ${fileName.split('.md')[0]}`,
            html: `
                <!DOCTYPE html>
                <html>
                    <head>
                        <meta charset="utf-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    </head>
                    <body style="margin: 0; padding: 0; font-family: Arial, sans-serif;">
                        <!-- Header avec logo -->
                        <div style="background-color: #ffffff; padding: 20px; text-align: center; border-bottom: 2px solid #eaeaea;">
                            <img src="${process.env.NEXT_PUBLIC_SITE_URL}/Bennydev.webp" alt="Logo" style="height: 60px; width: auto;">
                        </div>

                        <!-- Contenu principal -->
                        <div style="padding: 40px 20px; max-width: 600px; margin: 0 auto;">
                            <h2 style="color: #333; margin-bottom: 20px;">Accès à votre session</h2>
                            <p style="color: #666;">Email demandeur : ${email}</p>
                            <p style="color: #666;">Projet demandé : ${fileName.split('.md')[0]}</p>
                            <p style="color: #666;">Cliquez sur le lien ci-dessous pour accéder à votre session, Munissez vous des quatre derniers caractères du projet demandé :</p>
                            <a href="${sessionUrl}" style="background-color: #0070f3; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 20px 0;">
                                Accéder à ma session
                            </a>
                            <p style="color: #666;">Ce lien est valable pendant 24 heures.</p>
                        </div>

                        <!-- Footer -->
                        <div style="background-color: #f7f7f7; padding: 20px; text-align: center; border-top: 2px solid #eaeaea;">
                            <p style="color: #666; margin: 0; font-size: 14px;">© ${new Date().getFullYear()} Benjamin Verdès. Tous droits réservés.</p>
                            <p style="color: #666; margin: 10px 0 0 0; font-size: 12px;">
                                Cet email a été envoyé automatiquement, merci de ne pas y répondre.
                            </p>
                        </div>
                    </body>
                </html>
            `
        })

        if (error) {
            console.error('Erreur Resend:', error)
            return Response.json({ error: error.message }, { status: 400 })
        }

        return Response.json({ success: true, sessionToken })
    } catch (error) {
        console.error('Erreur complète:', error)
        return Response.json({ error: 'Erreur lors de l\'envoi de l\'email' }, { status: 500 })
    }
} 