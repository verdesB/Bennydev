'use client'

import { useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'
import FormSubmitButton from './FormSubmitButton'
import ReCAPTCHA from 'react-google-recaptcha'



export default function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null)
  const [captchaToken, setCaptchaToken] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [csrfToken, setCsrfToken] = useState<string>('')

  useEffect(() => {
    // Récupérer un nouveau token au chargement
    const fetchCsrfToken = async () => {
      const response = await fetch('/api/csrf')
      const data = await response.json()
      setCsrfToken(data.token)
    }
    
    fetchCsrfToken()
  }, [])

  

  const handleCaptchaChange = (token: string | null) => {
    setCaptchaToken(token)
  }

  const handleSubmit = async (formData: FormData) => {
    try {
      setIsSubmitting(true)

      // Récupération et vérification des données
      const name = formData.get('name') as string;
      const email = formData.get('email') as string;
      const subject = formData.get('subject') as string;
      const message = formData.get('message') as string;

      // Vérifications individuelles
      if (!name || name.length < 2) {
        toast.error('Le nom doit contenir au moins 2 caractères');
        return;
      }

      if (!email || !email.includes('@')) {
        toast.error('Veuillez entrer un email valide');
        return;
      }

      if (!subject || subject.length < 2) {
        toast.error('Le sujet doit contenir au moins 2 caractères');
        return;
      }

      if (!message || message.length < 10) {
        toast.error('Le message doit contenir au moins 10 caractères');
        return;
      }

      const data = { 
        name, 
        email, 
        subject, 
        message,
        csrfToken
      }

      console.log('Données à envoyer:', data);

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrfToken
        },
        body: JSON.stringify(data)
      })

      if (!response.ok) {
        throw new Error('Erreur lors de l\'envoi');
      }

      toast.success('Message envoyé avec succès!');
      formRef.current?.reset();

    } catch (error) {
      console.error('Erreur:', error);
      toast.error('Erreur lors de l\'envoi du message');
    } finally {
      setIsSubmitting(false);
    }

  }

  return (
    <form ref={formRef} action={handleSubmit} className="relative space-y-8 sm:space-y-10">
      <input type="hidden" name="csrf" value={csrfToken} />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <div className="group relative">
          <input
            type="text"
            id="name"
            name="name"
            required
            maxLength={100}
            autoComplete="on"
            minLength={2}
            placeholder=" "
            className="peer w-full px-4 py-3 bg-gray-50/50 rounded-xl border-2 border-gray-100 focus:border-gray-900 focus:ring-0 transition-all duration-300 placeholder-transparent"
          />
          <label 
            htmlFor="name"
            className="absolute left-4 -top-2.5 bg-white px-2 text-sm text-gray-500 transition-all duration-300 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-gray-900"
          >
            Nom complet
          </label>
        </div>

        <div className="group relative">
          <input
            type="email"
            id="email"
            name="email"
            required
            maxLength={100}
            placeholder=" "
            className="peer w-full px-4 py-3 bg-gray-50/50 rounded-xl border-2 border-gray-100 focus:border-gray-900 focus:ring-0 transition-all duration-300 placeholder-transparent"
          />
          <label 
            htmlFor="email"
            className="absolute left-4 -top-2.5 bg-white px-2 text-sm text-gray-500 transition-all duration-300 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-gray-900"
          >
            Email
          </label>
        </div>
      </div>

      <div className="group relative">
        <input
          type="text"
          id="subject"
          name="subject"
          required
          minLength={2}
          maxLength={200}
          placeholder=" "
          className="peer w-full px-4 py-3 bg-gray-50/50 rounded-xl border-2 border-gray-100 focus:border-gray-900 focus:ring-0 transition-all duration-300 placeholder-transparent"
        />
        <label 
          htmlFor="subject"
          className="absolute left-4 -top-2.5 bg-white px-2 text-sm text-gray-500 transition-all duration-300 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-gray-900"
        >
          Sujet
        </label>
      </div>

      <div className="group relative">
        <textarea
          id="message"
          name="message"
          required
          minLength={10}
          maxLength={1000}
          placeholder=" "
          className="peer w-full px-4 py-3 bg-gray-50/50 rounded-xl border-2 border-gray-100 focus:border-gray-900 focus:ring-0 transition-all duration-300 placeholder-transparent resize-none"
        />
        <label 
          htmlFor="message"
          className="absolute left-4 -top-2.5 bg-white px-2 text-sm text-gray-500 transition-all duration-300 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-gray-900"
        >
          Votre message
        </label>
      </div>

      {process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA && (
        <ReCAPTCHA
          sitekey={process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA}
          onChange={handleCaptchaChange}
        />
      )}

      <FormSubmitButton 
        formAction={handleSubmit}
        disabled={isSubmitting || !captchaToken}
      />
    </form>
  )
} 