// page.tsx
import { Metadata } from 'next'
import DemandeDetailClient from './DemandeDetailClient'

type Props = {
    params: { id: string }
    searchParams: { [key: string]: string | string[] | undefined }
}

export default function Page({ params }: Props) {
    return <DemandeDetailClient params={params} />
}

// Optionnel : Vous pouvez aussi ajouter des métadonnées dynamiques
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    return {
        title: `Demande ${params.id}`,
    }
}