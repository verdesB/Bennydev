import { memo } from 'react'
import { TicketCard } from './TicketCard'

type StatusType = 'open' | 'in_progress' | 'resolved' | 'closed'

type TicketsListProps = {
  tickets: Array<{
    id: string
    status: StatusType
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
  }>
  loading: boolean
}

export const TicketsList = memo(({ tickets, loading }: TicketsListProps) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(6)].map((_, index) => (
          <div 
            key={index}
            className="h-40 bg-gray-100 animate-pulse rounded-lg"
          />
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {tickets.map((ticket) => (
        <TicketCard key={ticket.id} ticket={ticket} />
      ))}
    </div>
  )
})

TicketsList.displayName = 'TicketsList' 