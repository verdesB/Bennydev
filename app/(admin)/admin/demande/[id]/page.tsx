import DemandeDetailClient from './DemandeDetailClient'

interface PageProps {
    params: { id: string };
    searchParams?: { [key: string]: string | string[] | undefined };
}

export default async function Page({ params, searchParams }: PageProps) {
    return <DemandeDetailClient params={params} searchParams={searchParams}  />
} 