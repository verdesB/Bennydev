
import { Metadata } from 'next'




//@ts-ignore
export default function Page({ params }: { params: { id: string } }) {
    return <p>Demande {params.id}</p>
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
    return {
        title: `Demande ${params.id}`,
    }
}