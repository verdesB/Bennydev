'use client'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

interface File {
  id: string
  name: string
  size: number
  type: string
  uploaded_at: string
  url: string
  preview_url: string
}

export default function ProjectFilesPage() {
  const params = useParams()
  const mockFiles: File[] = [
    {
      id: '1',
      name: 'exemple.jpg',
      size: 1024 * 1024 * 2.5,
      type: 'image/jpeg',
      uploaded_at: new Date().toISOString(),
      url: '/Bennydev.webp',
      preview_url: '/Bennydev.webp'
    },
    {
      id: '2',
      name: 'design-system.jpg',
      size: 1024 * 1024 * 1.8,
      type: 'image/jpeg',
      uploaded_at: new Date().toISOString(),
      url: '/Bennydev.webp',
      preview_url: '/Bennydev.webp'
    }
  ]

  const [files] = useState<File[]>(mockFiles)

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
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
            onClick={() => alert('Fonctionnalité à implémenter')}
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
        {files.length === 0 ? (
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
            {files.map((file) => (
              <div 
                key={file.id} 
                className="group relative bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 w-full max-w-[200px]"
              >
                {/* Aperçu de l'image */}
                <div className="aspect-square relative overflow-hidden bg-gray-50">
                  <Image
                    src={file.preview_url}
                    alt={file.name}
                    fill
                    className="object-cover"
                  />
                  {/* Overlay avec actions */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2">
                    <button
                      onClick={() => alert('Téléchargement à implémenter')}
                      className="p-1.5 bg-white/10 rounded-lg hover:bg-white/20 transition-colors duration-200"
                      title="Télécharger"
                    >
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                    </button>
                    <button
                      onClick={() => alert('Suppression à implémenter')}
                      className="p-1.5 bg-white/10 rounded-lg hover:bg-white/20 transition-colors duration-200"
                      title="Supprimer"
                    >
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
                {/* Informations du fichier plus compactes */}
                <div className="p-2.5">
                  <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {formatFileSize(file.size)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}