'use client'

import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'
import ReactMarkdown from 'react-markdown'
import { Calendar, FileText, ChevronDown, ChevronUp, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from "@/components/ui/input"
import { Mail } from "lucide-react"
import { toast } from "sonner"

interface FileObject {
  name: string
  created_at: string
  id: string
  size: number
  content?: string
  isNew?: boolean
  isUnread?: boolean
}

const MarkdownStyles = {
    container: `
        p-4 
        bg-gradient-to-b from-background/50 to-muted/10
        rounded-xl
        shadow-lg shadow-primary/5
        max-h-[500px]
        overflow-y-auto
        scrollbar-thin
        scrollbar-thumb-primary/20
        scrollbar-track-transparent
        border border-primary/10
    `,
    
    content: `
        prose 
        prose-sm 
        max-w-none 
        dark:prose-invert
        
        /* Titres plus compacts */
        prose-headings:font-bold
        prose-headings:mt-3
        prose-headings:mb-2
        prose-h1:text-xl
        prose-h1:text-primary
        prose-h2:text-lg
        prose-h2:text-primary/80
        prose-h3:text-base
        prose-h3:text-primary/60
        
        /* Paragraphes condensés */
        prose-p:my-2
        prose-p:leading-normal
        prose-p:text-sm
        prose-p:text-muted-foreground
        
        /* Listes compactes */
        prose-ul:my-2
        prose-ul:pl-4
        prose-ol:my-2
        prose-ol:pl-4
        prose-li:my-0.5
        prose-li:marker:text-primary
        
        /* Code inline */
        prose-code:text-xs
        prose-code:bg-muted
        prose-code:text-primary
        prose-code:px-1.5
        prose-code:py-0.5
        prose-code:rounded-md
        
        /* Blocs de code */
        prose-pre:my-2
        prose-pre:p-2
        prose-pre:text-xs
        prose-pre:bg-muted/50
        
        /* Citations */
        prose-blockquote:my-2
        prose-blockquote:py-0.5
        prose-blockquote:border-l-2
        prose-blockquote:text-sm
        
        /* Tableaux compacts */
        prose-table:text-sm
        prose-td:py-1
        prose-td:px-2
        
        /* Images */
        prose-img:my-2
    `
}

const Demande = () => {
    const [files, setFiles] = useState<FileObject[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [expandedFiles, setExpandedFiles] = useState<Set<string>>(new Set())
    const [viewedFiles, setViewedFiles] = useState<Set<string>>(new Set())
    const [sendingEmails, setSendingEmails] = useState<{ [key: string]: boolean }>({})
    const [takenRequests, setTakenRequests] = useState<Set<string>>(new Set());

    useEffect(() => {
        // Charger les fichiers vus depuis le localStorage
        const loadViewedFiles = () => {
            const saved = localStorage.getItem('viewedFiles')
            if (saved) {
                setViewedFiles(new Set(JSON.parse(saved)))
            }
        }
        loadViewedFiles()
    }, [])

    useEffect(() => {
        const fetchFiles = async () => {
            try {
                const response = await fetch('/api/files')
                const data = await response.json()
                
                if (!response.ok) {
                    throw new Error(data.error)
                }
                
                const filesWithContent = await Promise.all(
                    data.files.map(async (file: FileObject) => {
                        const contentResponse = await fetch(`/api/files/${file.name}`)
                        const contentData = await contentResponse.json()
                        
                        // Vérifier si le fichier est nouveau ET non lu
                        const isNew = isFileNew(file.created_at)
                        const isUnread = !viewedFiles.has(file.id)
                        
                        return {
                            ...file,
                            content: contentData.content,
                            isNew,
                            isUnread
                        }
                    })
                )
                
                // Trier : Nouveaux non lus > Nouveaux lus > Non lus > Autres
                const sortedFiles = filesWithContent.sort((a, b) => {
                    if (a.isNew && a.isUnread && (!b.isNew || !b.isUnread)) return -1
                    if (b.isNew && b.isUnread && (!a.isNew || !a.isUnread)) return 1
                    if (a.isUnread && !b.isUnread) return -1
                    if (b.isUnread && !a.isUnread) return 1
                    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
                })
                
                setFiles(sortedFiles)
            } catch (error) {
                setError(error instanceof Error ? error.message : 'Erreur inconnue')
            } finally {
                setLoading(false)
            }
        }

        fetchFiles()
    }, [viewedFiles])

    const isFileNew = (createdAt: string): boolean => {
        const fileDate = new Date(createdAt).getTime()
        const now = new Date().getTime()
        const hoursDiff = (now - fileDate) / (1000 * 60 * 60)
        return hoursDiff <= 24
    }

    const markFileAsViewed = (fileId: string) => {
        const newViewedFiles = new Set(viewedFiles)
        newViewedFiles.add(fileId)
        setViewedFiles(newViewedFiles)
        localStorage.setItem('viewedFiles', JSON.stringify([...newViewedFiles]))
        
        // Mettre à jour l'état isUnread du fichier
        setFiles(files.map(file => 
            file.id === fileId 
                ? { ...file, isUnread: false }
                : file
        ))
    }

    const toggleExpand = (fileId: string) => {
        const newExpanded = new Set(expandedFiles)
        if (expandedFiles.has(fileId)) {
            newExpanded.delete(fileId)
        } else {
            newExpanded.add(fileId)
            // Marquer comme lu lors de l'expansion
            markFileAsViewed(fileId)
        }
        setExpandedFiles(newExpanded)
    }

    const handleSendEmail = async (fileId: string) => {
        const email = emailInputs[fileId]
        if (!email) {
            toast.error("Veuillez entrer une adresse email")
            return
        }

        setSendingEmails(prev => ({ ...prev, [fileId]: true }))

        try {
            const file = files.find(f => f.id === fileId)
            const response = await fetch('/api/send-session', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    email,
                    fileId,
                    fileName: file?.name
                })
            })

            if (!response.ok) {
                const error = await response.json()
                throw new Error(error.error || 'Erreur lors de l\'envoi')
            }

            toast.success("Lien d'inscription envoyé !")
            setEmailInputs(prev => ({ ...prev, [fileId]: '' }))
        } catch (error) {
            console.error('Erreur:', error)
            toast.error(error.message)
        } finally {
            setSendingEmails(prev => ({ ...prev, [fileId]: false }))
        }
    }

    // Fonction pour vérifier si une demande est prise
    const checkIfRequestTaken = async (projectCode: string) => {
        try {
            const response = await fetch('/api/check-existing-user', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ projectCode })
            });

            const { data } = await response.json();
            return !!data; // Retourne true si un profil existe avec ce code
        } catch (error) {
            console.error('Erreur lors de la vérification:', error);
            return false;
        }
    };

    // Vérifier toutes les demandes au chargement
    useEffect(() => {
        const checkAllRequests = async () => {
            const takenCodes = new Set<string>();
            
            for (const file of files) {
                const projectCode = file.name.slice(-7, -3);
                const isTaken = await checkIfRequestTaken(projectCode);
                if (isTaken) {
                    takenCodes.add(projectCode);
                }
            }
            
            setTakenRequests(takenCodes);
        };

        if (files.length > 0) {
            checkAllRequests();
        }
    }, [files]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-destructive bg-destructive/10 p-4 rounded-lg">
                    <p className="font-semibold">Erreur: {error}</p>
                </div>
            </div>
        )
    }

    return (
        <div className="container mr-auto p-8 max-w-7xl">
            <div className="flex items-center justify-between mb-12">
                <div className="space-y-2">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                        Demandes de projets
                    </h1>
                    <p className="text-muted-foreground">
                        Gérez et suivez les demandes de projets entrantes
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <Badge variant="outline" className="px-4 py-1.5 text-sm rounded-full">
                        {files.length} fichier{files.length > 1 ? 's' : ''}
                    </Badge>
                    {files.some(f => f.isUnread) && (
                        <Badge variant="secondary" className="px-4 py-1.5 text-sm rounded-full bg-primary/10 text-primary">
                            {files.filter(f => f.isUnread).length} non lu{files.filter(f => f.isUnread).length > 1 ? 's' : ''}
                        </Badge>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {files.map((file) => (
                    <Card 
                        key={file.id} 
                        className={`
                            group
                            aspect-square 
                            overflow-hidden 
                            transition-all 
                            duration-300
                            hover:shadow-xl
                            hover:shadow-primary/10
                            hover:-translate-y-1
                            flex 
                            flex-col 
                            relative
                            border-primary/10
                            ${file.isUnread ? 'ring-2 ring-primary/30' : ''}
                        `}
                    >
                        {(file.isNew && file.isUnread) && (
                            <Badge 
                                className="absolute top-3 right-3 bg-primary text-primary-foreground rounded-full px-3"
                            >
                                Nouveau
                            </Badge>
                        )}
                        {(!file.isNew && file.isUnread) && (
                            <Badge 
                                variant="secondary"
                                className="absolute top-3 right-3 rounded-full px-3"
                            >
                                Non lu
                            </Badge>
                        )}
                        
                        <div className="border-b border-primary/5 flex-shrink-0 bg-gradient-to-b from-background to-muted/20">
                            <div className="p-5">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center space-x-3">
                                        <div className="p-2 rounded-full bg-primary/10">
                                            <FileText className="h-4 w-4 text-primary" />
                                        </div>
                                        <h2 className="font-semibold text-base truncate">
                                            {file.name}
                                        </h2>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => toggleExpand(file.id)}
                                        className="hover:bg-primary/10 h-8 w-8 p-0 rounded-full"
                                    >
                                        {expandedFiles.has(file.id) ? (
                                            <ChevronUp className="h-4 w-4" />
                                        ) : (
                                            <ChevronDown className="h-4 w-4" />
                                        )}
                                    </Button>
                                </div>

                                <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                                    <div className="flex items-center space-x-2 bg-muted/50 px-2 py-1 rounded-full">
                                        <Calendar className="h-3 w-3" />
                                        <span>{new Date(file.created_at).toLocaleDateString('fr-FR')}</span>
                                    </div>
                                    <div className="flex items-center space-x-2 bg-muted/50 px-2 py-1 rounded-full">
                                        <FileText className="h-3 w-3" />
                                        <span>{(file.size / 1024).toFixed(2)} KB</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {expandedFiles.has(file.id) && (
                            <div className={MarkdownStyles.container}>
                                <div className={MarkdownStyles.content}>
                                    <ReactMarkdown
                                        components={{
                                            a: ({node, ...props}) => (
                                                <a 
                                                    className="text-primary hover:underline"
                                                    target="_blank"
                                                    rel="noopener noreferrer" 
                                                    {...props}
                                                />
                                            ),
                                            code: ({node, inline, ...props}) => (
                                                inline ? 
                                                    <code className="font-mono bg-muted px-1 py-0.5 rounded text-xs" {...props} /> :
                                                    <code className="block bg-muted p-2 rounded-lg overflow-x-auto text-xs" {...props} />
                                            ),
                                            img: ({node, ...props}) => (
                                                <img 
                                                    className="rounded-lg shadow-sm my-2 mx-auto"
                                                    {...props}
                                                />
                                            ),
                                            blockquote: ({node, ...props}) => (
                                                <blockquote 
                                                    className="border-l-2 border-primary pl-4 italic text-sm text-muted-foreground"
                                                    {...props}
                                                />
                                            ),
                                        }}
                                    >
                                        {file.content || 'Aucun contenu disponible'}
                                    </ReactMarkdown>
                                </div>
                            </div>
                        )}

                        <div className="flex-1 flex flex-col justify-end p-5 space-y-3">
                            {takenRequests.has(file.name.slice(-7, -3)) ? (
                                <>
                                    <Badge 
                                        variant="secondary"
                                        className="w-fit mx-auto bg-green-500/10 text-green-500 rounded-full px-4 py-1"
                                    >
                                        Prise en charge
                                    </Badge>
                                    <Button
                                        className="w-full rounded-full"
                                        variant="secondary"
                                        disabled
                                    >
                                        Demande prise en charge
                                    </Button>
                                </>
                            ) : (
                                <Button
                                    className="w-full rounded-full bg-primary/10 hover:bg-primary/20 text-primary hover:text-primary"
                                    variant="outline"
                                    onClick={() => {
                                        const fileId = file.name.slice(-7, -3);
                                        window.location.href = `/admin/demande/${fileId}`;
                                    }}
                                >
                                    Voir la demande
                                    <ChevronRight className="ml-2 h-4 w-4" />
                                </Button>
                            )}
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    )
}

export default Demande
