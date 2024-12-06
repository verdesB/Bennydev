import DemandeDetailClient from "./DemandeDetailClient"

export default async function Page({ 
    params,
}: {
    params: { id: string }
}) {
    return <DemandeDetailClient params={params} />
}