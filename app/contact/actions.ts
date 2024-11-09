'use server'

import { Resend } from 'resend';
import { redirect } from 'next/navigation';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(formData: FormData) {
  try {
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const subject = formData.get('subject') as string;
    const message = formData.get('message') as string;

    if (!name || !email || !subject || !message) {
      throw new Error('Tous les champs sont requis');
    }

    await resend.emails.send({
      from: 'Contact Form <onboarding@resend.dev>',
      to: ['votre-email@example.com'],
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

    // Rediriger vers une page de succès
    redirect('/contact/success');

  } catch (error) {
    console.log(error)
    // Rediriger vers une page d'erreur
    redirect('/contact/error');
  }
} 