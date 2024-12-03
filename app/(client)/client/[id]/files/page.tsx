'use client'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { useFileUpload } from './hooks/useFileUpload'
import { Progress } from '@/components/ui/progress'
import { toast } from 'sonner'

interface File {
  id: number
  project_id: string
  image_url: string
  title: string
  description: string | null
  type: string | null
  created_at: string
}

export default function ProjectFilesPage() {
  const params = useParams()
  const [images, setImages] = useState<File[]>([])
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [filePreview, setFilePreview] = useState<string>('')
  const [fileTitle, setFileTitle] = useState('')
  const [fileDescription, setFileDescription] = useState('')

  const { uploadFile, uploadProgress, isUploading } = useFileUpload(
    params.id as string,
    () => {
      fetchImages()
      setIsUploadModalOpen(false)
      setSelectedFile(null)
      setFilePreview('')
      setFileTitle('')
      setFileDescription('')
    }
  )

  const handleFileUpload = async () => {
    if (!selectedFile) {
      toast.error("Aucun fichier sélectionné")
      return
    }

    try {
      // Récupérer d'abord le code_project du projet
      const projectResponse = await fetch(`/api/projects/${params.id}`)
      if (!projectResponse.ok) {
        throw new Error('Erreur lors de la récupération du projet')
      }
      const projectData = await projectResponse.json()
      
      const formData = new FormData()
      formData.append('file', selectedFile)
      formData.append('projectId', params.id as string)
      formData.append('title', fileTitle)
      formData.append('description', fileDescription || '')
      formData.append('codeProject', projectData.code_project) // Ajout du code_project

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Erreur lors de l\'upload')
      }

      await fetchImages() // Rafraîchir la liste après upload
      setIsUploadModalOpen(false)
      setSelectedFile(null)
      setFilePreview('')
      setFileTitle('')
      setFileDescription('')
      toast.success('Fichier uploadé avec succès')
    } catch (error) {
      console.error('Erreur upload:', error)
      toast.error('Erreur lors de l\'upload')
    }
  }

  const fetchImages = async () => {
    try {
      console.log('Fetching images for project:', params.id);
      const response = await fetch(`/api/files/${params.id}`);
      
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des images');
      }
      
      const data = await response.json();
      console.log('URLs des images:', data.map((file: File) => file.image_url));
      setImages(data);
    } catch (error) {
      console.error('Erreur:', error);
      toast.error('Erreur lors de la récupération des images');
    }
  };

  useEffect(() => {
    fetchImages()
  }, [params.id])

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragActive(false)
    
    const file = e.dataTransfer.files[0]
    if (file) {
      setSelectedFile(file)
      setFileTitle(file.name)
      
      // Prévisualisation pour les images
      if (file.type.startsWith('image/')) {
        const reader = new FileReader()
        reader.onloadend = () => {
          setFilePreview(reader.result as string)
        }
        reader.readAsDataURL(file)
      }
    }
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-gray-50 to-white p-4 md:p-6">
      {/* En-tête plus compact */}
      <div className="sticky top-0 z-10 mb-6 backdrop-blur-md bg-white/60 rounded-xl shadow-sm border border-white/50 p-4">
        <div className=" flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <Link 
              href={`/client/${params.id}`}
              className="text-xs text-gray-500 hover:text-gray-900 mb-1 inline-flex items-center transition-colors duration-200"
            >
              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Retour au projet
            </Link>
            <h1 className="text-2xl font-medium text-gray-900 tracking-tight">Fichiers partagés</h1>
          </div>
          
          <button
            className="group inline-flex items-center px-4 py-2 bg-gray-900 text-white text-sm rounded-lg transition-all duration-200 hover:bg-gray-800"
            onClick={() => setIsUploadModalOpen(true)}
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Ajouter un fichier
          </button>
        </div>
      </div>

      {/* Grille de fichiers */}
      <div className="max-w-none">
        {images.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-12 text-center">
            <div className="w-20 h-20 mx-auto bg-gray-50 rounded-2xl flex items-center justify-center">
              <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="mt-4 text-lg font-medium text-gray-900">Aucun fichier</h3>
            <p className="mt-2 text-gray-500">Commencez par ajouter un fichier au projet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 justify-start">
            {images.map((file) => (
              <div 
                key={file.id} 
                className="group relative bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
              >
                <div className="aspect-square relative overflow-hidden bg-gray-50">
                  <Image
                    src={file.image_url}
                    alt={file.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-2.5">
                  <p className="text-sm font-medium text-gray-900 truncate">{file.title}</p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {formatFileSize(file.size)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Transition appear show={isUploadModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => setIsUploadModalOpen(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all">
                  <Dialog.Title as="h3" className="text-2xl font-medium text-gray-900 mb-4">
                    Ajouter un fichier
                  </Dialog.Title>

                  <div 
                    className={`mt-4 p-8 border-2 border-dashed rounded-xl transition-colors duration-200 ${
                      dragActive ? 'border-gray-900 bg-gray-50' : 'border-gray-200'
                    }`}
                    onDragOver={(e) => { e.preventDefault(); setDragActive(true) }}
                    onDragLeave={() => setDragActive(false)}
                    onDrop={handleDrop}
                  >
                    {!selectedFile ? (
                      <div className="text-center">
                        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v6" />
                        </svg>
                        <p className="mt-2 text-sm text-gray-500">
                          Déposez un fichier ici ou cliquez pour sélectionner
                        </p>
                      </div>
                    ) : (
                      <div className="mt-4">
                        {filePreview && (
                          <img 
                            src={filePreview} 
                            alt="Prévisualisation" 
                            className="max-h-48 mx-auto rounded-lg mb-4"
                          />
                        )}
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Titre
                            </label>
                            <input
                              type="text"
                              value={fileTitle}
                              onChange={(e) => setFileTitle(e.target.value)}
                              className="w-full border rounded-lg p-2"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Description (optionnelle)
                            </label>
                            <textarea
                              value={fileDescription}
                              onChange={(e) => setFileDescription(e.target.value)}
                              className="w-full border rounded-lg p-2"
                              rows={3}
                            />
                          </div>

                          <button
                            onClick={handleFileUpload}
                            className="w-full flex items-center justify-center px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors duration-200"
                            disabled={isUploading}
                          >
                            {isUploading ? (
                              <span>Upload en cours...</span>
                            ) : (
                              <>
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                </svg>
                                <span>Téléverser le fichier</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  )
}