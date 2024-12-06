
import { NextPage } from 'next'
import DemandeDetailClient from './DemandeDetailClient'

type PageProps = {
    params: { id: string }
}

const Page: NextPage<PageProps> = async ({ params }) => {
    return <DemandeDetailClient params={params} />
}

export default Page