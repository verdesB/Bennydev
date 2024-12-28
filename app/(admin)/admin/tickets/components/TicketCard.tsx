import { useRouter } from 'next/navigation'
import { TicketStatus } from '@/components/TicketStatus'

type TicketCardProps = {
  ticket: {
    id: string
    status: string
    created_at: string
    title: string
    description: string
    project?: { 
      id: string
      name: string 
    }
    user?: { 
      first_name: string
      last_name: string 
    }
  }
}

export const TicketCard = ({ ticket }: TicketCardProps) => {
  const router = useRouter()

  return (
    <div className="relative flex">
      <div 
        className="flex-1 bg-white rounded-l-lg shadow-sm border border-purple-100 hover:shadow-md transition-shadow duration-200 cursor-pointer"
        onClick={() => router.push(`/admin/tickets/${ticket.id}`)}
      >
        <div className="absolute right-0 top-0 h-full flex flex-col justify-between py-2">
          {[...Array(6)].map((_, i) => (
            <div 
              key={`right-${i}`}
              className="w-2 h-2 -mr-1 rounded-full bg-gray-50 border border-purple-200"
            />
          ))}
        </div>

        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <TicketStatus status={ticket.status || 'open'} />
            <span className="text-xs text-gray-500">
              {new Date(ticket.created_at).toLocaleDateString('fr-FR')}
            </span>
          </div>
          
          <h3 className="font-medium text-gray-900 mb-1">{ticket.title}</h3>
          <p className="text-sm text-gray-500 line-clamp-2 mb-2">
            {ticket.description}
          </p>
          
          <div className="flex justify-between items-center">
            <span className="text-xs text-purple-600 font-medium">
              {ticket.project?.name}
            </span>
            <span className="text-xs text-gray-500">
              Par: {ticket.user ? `${ticket.user.first_name} ${ticket.user.last_name}` : 'Utilisateur inconnu'}
            </span>
          </div>
        </div>
      </div>

      <div className="w-6 bg-purple-50/50 rounded-r-lg border-t border-r border-b border-purple-100">
        <div className="h-full flex items-center justify-center">
          <div className="transform -rotate-90 text-purple-300 whitespace-nowrap text-xs font-mono">
            #{String(ticket.id).substring(0, 6)}
          </div>
        </div>
      </div>
    </div>
  )
} 