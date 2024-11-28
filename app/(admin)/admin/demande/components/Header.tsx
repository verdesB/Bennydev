import React from 'react'

const Header = ({ files }) => (
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
            <span className="badge">
                {files.length} fichier{files.length > 1 ? 's' : ''}
            </span>
            {files.some(f => f.isUnread) && (
                <span className="badge badge-secondary">
                    {files.filter(f => f.isUnread).length} non lu{files.filter(f => f.isUnread).length > 1 ? 's' : ''}
                </span>
            )}
        </div>
    </div>
)

export default Header 