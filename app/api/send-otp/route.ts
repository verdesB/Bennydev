import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { email, code } = await request.json();

    if (!email || !code) {
      return NextResponse.json(
        { error: 'Email et code requis' },
        { status: 400 }
      );
    }

    await resend.emails.send({
      from: 'contact@bennydev.fr',
      to: email,
      subject: 'Code de vérification',
      html: `
        <h1>Code de vérification</h1>
        <p>Votre code de vérification est : <strong>${code}</strong></p>
        <p>Ce code est valable pendant 5 minutes.</p>
      `
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erreur envoi email:', error);
    return NextResponse.json(
      { error: 'Erreur d\'envoi du code' },
      { status: 500 }
    );
  }
} 