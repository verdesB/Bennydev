export interface FileObject {
    name: string
    created_at: string
    id: string
    size: number
    content?: string
    isNew?: boolean
    isUnread?: boolean
}

export interface FileCardProps {
    file: FileObject
    expandedFiles: Set<string>
    toggleExpand: (id: string) => void
    markFileAsViewed: (id: string) => void
    takenRequests: Set<string>
}

export interface HeaderProps {
    files: FileObject[]
}

export interface ErrorProps {
    error: string
} 