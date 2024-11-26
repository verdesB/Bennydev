import { Resend } from 'resend'
import { supabaseAdmin } from '@/lib/supabase-admin'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
    try {
        const { email, userId } = await request.json()

        // Mettre à jour les champs de confirmation directement
        const { error: updateError } = await supabaseAdmin.auth.admin.updateUserById(
            userId,
            { 
                email_confirmed_at: new Date().toISOString(),
                confirmed_at: new Date().toISOString(),
                raw_user_meta_data: {
                    email_verified: true,
                    phone_verified: false,
                    email: email
                }
            }
        )

        if (updateError) {
            console.error('Erreur mise à jour utilisateur:', updateError)
            throw updateError
        }

        // Envoyer l'email avec Resend
        const { error } = await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: email,
            subject: 'Votre compte a été créé',
            html: `
                <h2>Bienvenue !</h2>
                <p>Votre compte a été créé avec succès.</p>
                <p>Vous pouvez maintenant vous connecter avec votre email et votre mot de passe.</p>
                <a href="${process.env.NEXT_PUBLIC_SITE_URL}/login" style="background-color: #0070f3; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 20px 0;">
                    Se connecter
                </a>
            `
        })

        if (error) throw error

        return Response.json({ success: true })
    } catch (error) {
        console.error('Erreur complète:', error)
        return Response.json({ error: 'Erreur lors de l\'envoi de l\'email' }, { status: 500 })
    }
} 