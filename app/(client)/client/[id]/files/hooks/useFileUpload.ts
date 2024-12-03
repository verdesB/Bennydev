import { useState } from 'react'
import { toast } from 'sonner'

export const useFileUpload = (projectId: string, onSuccess: () => void) => {
  const [isUploading, setIsUploading] = useState(false)

  const uploadFile = async (file: File, title: string, description: string) => {
    console.log('Début upload avec:', { file, title, description });
    setIsUploading(true)

    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('projectId', projectId)
      formData.append('title', title || file.name)
      formData.append('description', description || '')

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Erreur lors de l\'upload')
      }

      console.log('Upload réussi:', data);
      toast.success('Fichier uploadé avec succès')
      onSuccess()
    } catch (error) {
      console.error('Erreur upload:', error)
      toast.error('Erreur lors de l\'upload')
    } finally {
      setIsUploading(false)
    }
  }

  return { uploadFile, isUploading }
} 