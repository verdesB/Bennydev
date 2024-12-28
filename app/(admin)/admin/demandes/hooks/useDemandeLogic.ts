import { useState, useEffect } from 'react'


interface FileObject {
    name: string
    created_at: string
    id: string
    size: number
    content?: string
    isNew?: boolean
    isUnread?: boolean
}

export default function useDemandeLogic() {
    const [files, setFiles] = useState<FileObject[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [expandedFiles, setExpandedFiles] = useState<Set<string>>(new Set())
    const [viewedFiles, setViewedFiles] = useState<Set<string>>(new Set())
   

    useEffect(() => {
        const loadViewedFiles = () => {
            const saved = localStorage.getItem('viewedFiles')
            if (saved) {
                setViewedFiles(new Set(JSON.parse(saved)))
            }
        }
        loadViewedFiles()
    }, [])

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
            markFileAsViewed(fileId)
        }
        setExpandedFiles(newExpanded)
    }


    useEffect(() => {
        const fetchFiles = async () => {
            try {
                const response = await fetch('/api/demande', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        credentials: 'include',
                    }
                })
                const data = await response.json()
                
                if (!response.ok) {
                    throw new Error(data.error)
                }
                
                const filesWithContent = await Promise.all(
                    data.files.map(async (file: FileObject) => {
                        const contentResponse = await fetch(`/api/demande/${file.name}`)
                        const contentData = await contentResponse.json()
                        
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

   

    return {
        files,
        loading,
        error,
        expandedFiles,
      
        toggleExpand,
        markFileAsViewed
    }
} 