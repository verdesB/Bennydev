'use server'

import { Resend } from 'resend';
import { redirect } from 'next/navigation';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(formData: FormData) {
  try {
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');

    if (!name || !email || !subject || !message) {
      return;
    }

    if (!process.env.RESEND_API_KEY) {
      throw new Error('La clé API Resend n\'est pas configurée');
    }

    const result = await resend.emails.send({
      from: 'verdesb.devacc@gmail.com',
      to: ['verdesb.devacc@gmail.com'],
      subject: `Nouveau message de ${name}: ${subject}`,
      html: `
        <h2>Nouveau message de contact</h2>
        <p><strong>Nom:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Sujet:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    if (result.error) {
      console.error("Une erreur est survenue lors de l'envoi du message");
    }

  } catch (error) {
    console.error('Erreur lors de l\'envoi:', error);
  }
}