import DemandeDetailClient from './DemandeDetailClient'

type Props = {
    params: {
        id: string
    },
    searchParams: { [key: string]: string | string[] | undefined }
}

export default async function Page({ params }: Props) {
    return <DemandeDetailClient params={params} />
} 