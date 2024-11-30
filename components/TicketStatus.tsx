import { CheckCircle2, Circle, Clock, AlertCircle } from 'lucide-react'

type StatusType = 'open' | 'in_progress' | 'resolved' | 'closed'

interface TicketStatusProps {
  status: StatusType
}

const statusConfig = {
  open: { color: 'text-yellow-500 bg-yellow-50', icon: AlertCircle, label: 'Ouvert' },
  in_progress: { color: 'text-blue-500 bg-blue-50', icon: Clock, label: 'En cours' },
  resolved: { color: 'text-green-500 bg-green-50', icon: CheckCircle2, label: 'Résolu' },
  closed: { color: 'text-gray-500 bg-gray-50', icon: Circle, label: 'Fermé' }
}

export const TicketStatus = ({ status }: TicketStatusProps) => {
  const config = statusConfig[status]
  const Icon = config.icon

  return (
    <div className={`${config.color} rounded-md p-2 flex items-center`}>
      <Icon className="h-4 w-4" />
      <span className="ml-2">{config.label}</span>
    </div>
  )
} 