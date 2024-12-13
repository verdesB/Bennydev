import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendOTPEmail(email: string, code: string) {
  try {
    await resend.emails.send({
      from: 'votre-domaine@resend.dev', // utilisez votre domaine vérifié sur Resend
      to: email,
      subject: 'Code de vérification',
      html: `
        <h1>Code de vérification</h1>
        <p>Votre code de vérification est : <strong>${code}</strong></p>
        <p>Ce code est valable pendant 5 minutes.</p>
      `
    });
    return { success: true };
  } catch (error) {
    console.error('Erreur envoi email:', error);
    return { success: false, error };
  }
} 