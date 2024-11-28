import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Calendar, FileText, ChevronDown, ChevronUp, ChevronRight } from 'lucide-react'
import ReactMarkdown from 'react-markdown'

import { FileCardProps } from '../types'

const FileCard = ({ file, expandedFiles, toggleExpand, markFileAsViewed, takenRequests }: FileCardProps) => {
    const projectCode = file.name.slice(-7, -3)

    return (
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
                <div className="p-6 flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-primary/10 scrollbar-track-transparent hover:scrollbar-thumb-primary/20">
                    <ReactMarkdown 
                        className="prose prose-sm dark:prose-invert max-w-none
                            prose-headings:font-bold 
                            prose-h1:text-lg 
                            prose-h2:text-base 
                            prose-h3:text-sm
                            prose-p:my-1
                            prose-ul:my-1
                            prose-ul:pl-4
                            prose-li:my-0
                            prose-strong:text-primary"
                    >
                        {file.content || 'Aucun contenu disponible'}
                    </ReactMarkdown>
                </div>
            )}

            <div className="flex-1 flex flex-col justify-end p-5 space-y-3">
                {takenRequests.has(projectCode) ? (
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
                            window.location.href = `/admin/demande/${projectCode}`;
                        }}
                    >
                        Voir la demande
                        <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                )}
            </div>
        </Card>
    )
}

export default FileCard 