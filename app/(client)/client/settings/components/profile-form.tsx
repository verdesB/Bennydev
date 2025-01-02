"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useState, useEffect } from "react"
import { toast } from "sonner"
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

const profileFormSchema = z.object({
  username: z.string().min(2, {
    message: "Le nom d'utilisateur doit faire au moins 2 caractères.",
  }),
  email: z.string().email({
    message: "Veuillez entrer une adresse email valide.",
  }),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

export function ProfileForm() {
  const [displayName, setDisplayName] = useState("")
  const [avatarUrl, setAvatarUrl] = useState("")
  
  const supabase = createClientComponentClient()

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      username: "",
      email: "",
    },
  })

  useEffect(() => {
    async function fetchUserData() {
      try {
        const response = await fetch('/api/profile')
        const data = await response.json()
        setDisplayName(data.displayName)
        setAvatarUrl(data.avatar || '')
        
        form.reset({
          username: data.displayName,
          email: data.email,
        })
        console.log('Données utilisateur:', data)
      } catch (error) {
        console.error('Erreur lors du chargement du profil:', error)
      }
    }
    fetchUserData()
  }, [])

  async function onSubmitUsername(data: { username: string }) {
    try {
      await fetch('/api/profile/username', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      toast.success("Nom d'utilisateur mis à jour avec succès")
    } catch (error) {
      console.error('Erreur lors de la mise à jour du nom d\'utilisateur:', error)
      toast.error("Erreur lors de la mise à jour du nom d'utilisateur")
    }
  }

  async function onSubmitEmail(data: { email: string }) {
    try {
      await fetch('/api/profile/email', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      toast.success("Email mis à jour avec succès")
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l\'email:', error)
      toast.error("Erreur lors de la mise à jour de l'email")
    }
  }

  async function handleAvatarUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (!file) return

    if (file.size > 5 * 1024 * 1024) {
      toast.error("L'image ne doit pas dépasser 5MB")
      return
    }

    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Non authentifié')

      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random()}.${fileExt}`
      
      const { data: profile } = await supabase
        .from('profiles')
        .select('project_code')
        .eq('id', user.id)
        .single()

      if (!profile?.project_code) {
        throw new Error('Code projet non trouvé')
      }

      const filePath = `avatar/${fileName}`

      const { error: uploadError } = await supabase.storage
        .from(`Bennydev.${profile.project_code}`)
        .upload(filePath, file)

      if (uploadError) throw uploadError

      const { data: urlData } = await supabase.storage
        .from(`Bennydev.${profile.project_code}`)
        .createSignedUrl(filePath, 31536000)

      if (!urlData?.signedUrl) throw new Error('Impossible d\'obtenir l\'URL signée')

      setAvatarUrl(urlData.signedUrl)

      await fetch('/api/profile/avatar', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ avatarUrl: urlData.signedUrl }),
      })

      toast.success("Avatar mis à jour avec succès")
    } catch (error) {
      console.error('Erreur:', error)
      toast.error("Impossible de mettre à jour l'avatar")
    }
  }

  return (
    <Form {...form}>
      <div className="space-y-8 ">
        <div className="flex items-center gap-x-2">
          <Avatar className="h-20 w-20">
            <AvatarImage src={avatarUrl} alt="Avatar" />
            <AvatarFallback>
              {displayName
                ? displayName
                    .split(' ')
                    .map(n => n[0])
                    .join('')
                    .toUpperCase()
                    .slice(0, 2)
                : 'CN'}
            </AvatarFallback>
          </Avatar>
          <input
            type="file"
            accept="image/*"
            onChange={handleAvatarUpload}
            className="hidden"
            id="avatar-upload"
          />
          <Button 
            variant="outline" 
            onClick={() => document.getElementById('avatar-upload')?.click()}
          >
            Changer l&apos;avatar
          </Button>
        </div>

        <div className="space-y-4">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom d&apos;utilisateur</FormLabel>
                <div className="flex gap-2">
                  <FormControl>
                    <Input placeholder="Votre nom d'utilisateur" {...field} value={displayName} />
                  </FormControl>
                  <Button onClick={() => onSubmitUsername({ username: field.value })}>
                    Sauvegarder
                  </Button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <div className="flex gap-2">
                  <FormControl>
                    <Input placeholder="exemple@email.com" {...field} />
                  </FormControl>
                  <Button onClick={() => onSubmitEmail({ email: field.value })}>
                    Sauvegarder
                  </Button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </Form>
  )
}