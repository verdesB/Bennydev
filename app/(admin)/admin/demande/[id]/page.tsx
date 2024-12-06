// page.tsx
import { Metadata } from 'next'


type Props = {
    params: { id: string }
    searchParams: { [key: string]: string | string[] | undefined }
}

export default function Page({ params }: Props) {
    return <p>Demande {params.id}</p>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    return {
        title: `Demande ${params.id}`,
    }
}