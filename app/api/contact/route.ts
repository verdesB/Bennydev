import { NextResponse } from 'next/server'
import { z } from 'zod'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  try {
    const csrfToken = req.headers.get('X-CSRF-Token')
    const cookies = req.headers.get('cookie')
    const cookieToken = cookies?.split(';')
      .find(c => c.trim().startsWith('csrf='))
      ?.split('=')[1]
    
    if (!csrfToken || !cookieToken || csrfToken !== cookieToken) {
      return NextResponse.json(
        { message: 'Token CSRF invalide' },
        { status: 403 }
      )
    }

    console.log('Début du traitement de la requête')

    const body = await req.json()
    console.log('Données reçues:', body)

    // Validation avec Zod
    const contactSchema = z.object({
      name: z.string().min(2).max(100),
      email: z.string().email(),
      subject: z.string().min(2).max(200),
      message: z.string().min(10).max(1000)
    })

    const validatedData = contactSchema.parse(body)
    console.log('Données validées:', validatedData)

    try {
        await resend.emails.send({
        from: 'contact@bennydev.fr',
        to: 'verdesb.devacc@gmail.com',
        subject: `Nouveau message de contact: ${validatedData.subject}`,
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
            </head>
            <body style="background-image: url('https://iskqpfzwkuwtheuclxjq.supabase.co/storage/v1/object/sign/bennydev/Frame-1-_1_.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJiZW5ueWRldi9GcmFtZS0xLV8xXy53ZWJwIiwiaWF0IjoxNzMzOTUxNDExLCJleHAiOjE3NjU0ODc0MTF9.y6Pmoo4jk_qQMk7F6OJwUB18Zyex_Af42cBRH_LXx6k&t=2024-12-11T21%3A13%3A36.395Z'); background-size: cover; background-position: center; margin: 0; padding: 0; background-color: #111111; color: #ffffff; font-family: Arial, sans-serif; position: relative; min-height: 100vh;">
            
            <div style="position: relative; z-index: 2; max-width: 600px; margin: 0 auto; padding: 10px;">
              <div style="text-align: center; margin-bottom: 30px;">
                <img src="https://iskqpfzwkuwtheuclxjq.supabase.co/storage/v1/object/sign/bennydev/Bennydev.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJiZW5ueWRldi9CZW5ueWRldi53ZWJwIiwiaWF0IjoxNzMzOTQzOTc0LCJleHAiOjE4OTE2MjM5NzR9.J2CwmEiujaTloqGzTkLRaElbAZmhT2K7IgSxKsI1gX0&t=2024-12-11T19%3A09%3A39.789Z" alt="BennyDev Logo" style="width: 150px; height: auto; border-radius: 2rem; border: 1px solid rgba(138, 43, 226, 0.6);">
              </div>
              
              <div style="background: linear-gradient(145deg, rgba(30, 30, 30, 0.9), rgba(20, 20, 20, 0.9)); backdrop-filter: blur(10px); padding: 30px; border-radius: 15px; box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2); border: 1px solid rgba(255, 255, 255, 0.1);">
                <h2 style="color: #ffffff; margin-bottom: 20px; text-align: center; font-size: 24px; text-transform: uppercase; letter-spacing: 2px;">Nouveau message de contact</h2>

                <div style="background: rgba(40, 40, 40, 0.5); padding: 15px; border-radius: 10px; margin-bottom: 15px; border: 1px solid rgba(255, 255, 255, 0.05);">
                  <p style="color: #888888; margin-bottom: 5px; font-size: 14px; text-transform: uppercase;">Nom:</p>
                  <p style="color: #ffffff; margin-top: 0; font-size: 16px;">${validatedData.name}</p>
                </div>
                
                <div style="background: rgba(40, 40, 40, 0.5); padding: 15px; border-radius: 10px; margin-bottom: 15px; border: 1px solid rgba(255, 255, 255, 0.05);">
                  <p style="color: #888888; margin-bottom: 5px; font-size: 14px; text-transform: uppercase;">Email:</p>
                  <p style="color: #ffffff; margin-top: 0; font-size: 16px;">${validatedData.email}</p>
                </div>
                
                <div style="background: rgba(40, 40, 40, 0.5); padding: 15px; border-radius: 10px; margin-bottom: 15px; border: 1px solid rgba(255, 255, 255, 0.05);">
                  <p style="color: #888888; margin-bottom: 5px; font-size: 14px; text-transform: uppercase;">Sujet:</p>
                  <p style="color: #ffffff; margin-top: 0; font-size: 16px;">${validatedData.subject}</p>
                </div>
                
                <div style="background: rgba(40, 40, 40, 0.5); padding: 15px; border-radius: 10px; border: 1px solid rgba(255, 255, 255, 0.05);">
                  <p style="color: #888888; margin-bottom: 5px; font-size: 14px; text-transform: uppercase;">Message:</p>
                  <p style="color: #ffffff; margin-top: 0; font-size: 16px; line-height: 1.6;">${validatedData.message}</p>
                </div>
              </div>
              
              <div style="text-align: center; margin-top: 20px; color: #666666; border: 1px solid rgba(138, 43, 226, 0.6); border-radius: 1rem; background: linear-gradient(145deg, rgba(30, 30, 30, 0.9), rgba(20, 20, 20, 0.9)); backdrop-filter: blur(10px);">
                <p style="font-size: 14px;">© ${new Date().getFullYear()} BennyDev. Tous droits réservés.</p>
              </div>
            </div>
          </body>
        </html>
      `
      })

      return NextResponse.json({ 
        status: 'success',
        message: 'Email envoyé avec succès' 
      })
    } catch (error) {
      console.error('Erreur d\'envoi:', error)
      return NextResponse.json(
        { 
          status: 'error',
          message: 'Erreur lors de l\'envoi de l\'email' 
        },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Erreur d\'envoi:', error)
    return NextResponse.json(
      { 
        status: 'error',
        message: 'Erreur lors de l\'envoi de l\'email' 
      },
      { status: 500 }
    )
  }
} 