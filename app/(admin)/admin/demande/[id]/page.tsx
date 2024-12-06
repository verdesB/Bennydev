import DemandeDetailClient from './DemandeDetailClient'

type Props = {
    params: {
        id: string
    }
}

export default function Page(props: Props) {
    return <DemandeDetailClient {...props} />
} 