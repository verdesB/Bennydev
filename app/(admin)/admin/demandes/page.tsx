'use client'

import useDemandeLogic from './hooks/useDemandeLogic'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import { useState, Suspense } from 'react'

import { Card } from '@/components/ui/card'
import { Tabs,TabsList, TabsTrigger } from "@/components/ui/tabs"

import Error from './Error'
import DemandeContent from './components/DemandeContent'

const DemandePage = () => {
    const {
        files,
        loading,
        error,
        expandedFiles,

        toggleExpand,
        markFileAsViewed
    } = useDemandeLogic()

    const [searchQuery, setSearchQuery] = useState('')
    const [selectedDemande, setSelectedDemande] = useState<string | null>(null)

    if (error) return <Error error={error} />

    const filteredFiles = files.filter(file => 
        file.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (file.content && file.content.toLowerCase().includes(searchQuery.toLowerCase()))
    )

    return (
        <div className="h-[calc(100vh-4rem)] flex overflow-hidden rounded-2xl shadow-[0_4px_20px_-1px_rgba(147,51,234,0.2)] hover:shadow-[0_4px_20px_-1px_rgba(147,51,234,0.3)] transition-shadow">
            {/* Panneau latéral gauche */}
            <aside className="w-[300px] border-r border-[#E7E7E7] bg-white flex flex-col">
                <div className="shrink-0 p-6 border-b border-[#E7E7E7]">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#919191]" />
                        <Input
                            placeholder="Rechercher une demande..."
                            className="pl-10 h-9 bg-[#F5F5F7] border-none rounded-lg text-sm"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                {/* Liste des demandes */}
                <div className="flex-1 overflow-y-auto p-4">
                    {loading ? (
                        <div className="space-y-3">
                            {[1, 2, 3].map((i) => (
                                <Card key={i} className="p-4 animate-pulse">
                                    <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
                                    <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
                                    <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
                                    <div className="h-2 bg-gray-200 rounded w-1/4 mt-2"></div>
                                </Card>
                            ))}
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {filteredFiles.map((file) => (
                                <Card 
                                    key={file.id}
                                    className={`p-4 cursor-pointer transition-all hover:shadow-md ${
                                        selectedDemande === file.id ? 'border-purple-500 shadow-md' : ''
                                    }`}
                                    onClick={() => setSelectedDemande(file.id)}
                                >
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-medium">Demande #{file.name.slice(-7, -3)}</h3>
                                       
                                    </div>
                                    <p className="text-sm text-muted-foreground line-clamp-2">
                                        {file.content?.slice(0, 100)}...
                                    </p>
                                    <div className="text-xs text-muted-foreground mt-2">
                                        {file.created_at ? new Date(file.created_at).toLocaleDateString('fr-FR') : 'Date inconnue'}
                                    </div>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
            </aside>

            {/* Contenu principal */}
            <main className="flex-1 bg-white">
                <Suspense fallback={<div>Chargement...</div>}>
                    {selectedDemande ? (
                        <Tabs defaultValue="apercu" className="w-full h-full">
                            <div className="p-6 border-b border-[#E7E7E7]">
                                <TabsList className="grid w-full max-w-[400px] grid-cols-2">
                                    <TabsTrigger value="apercu">Aperçu</TabsTrigger>
                                    
                                    <TabsTrigger value="actions">Actions</TabsTrigger>
                                </TabsList>
                            </div>

                            <div className="p-6 overflow-y-scroll h-[calc(100vh-10rem)]">
                                {selectedDemande && files.find(f => f.id === selectedDemande) && (
                                    <DemandeContent 
                                        file={files.find(f => f.id === selectedDemande)!}
                                        expandedFiles={expandedFiles}
                                        toggleExpand={toggleExpand}
                                        markFileAsViewed={markFileAsViewed}
                                    
                                    />
                                )}
                            </div>
                        </Tabs>
                    ) : (
                        <div className="flex items-center justify-center h-full text-muted-foreground">
                            Sélectionnez une demande pour voir les détails
                        </div>
                    )}
                </Suspense>
            </main>
        </div>
    )
}

export default DemandePage
