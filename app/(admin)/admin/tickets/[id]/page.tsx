'use client'

import { useState, useEffect, useCallback } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Clock, ArrowLeft, MessageSquare } from 'lucide-react'
import { Textarea } from '@/components/ui/textarea'
import { TicketStatus } from '../../../../../components/TicketStatus'
import { supabase } from '@/app/lib/supabase'

interface Profile {
  first_name: string;
  last_name: string;
}

interface Project {
  name: string;
}

interface Ticket {
  id: number;
  title: string;
  description: string;
  status: string;
  created_at: string;
  project?: Project;
  profile?: Profile;
}

interface TicketComment {
  id: number;
  content: string;
  created_at: string;
  profile_id: string;
  profiles?: Profile;
}

const TicketDetailPage = () => {
  const params = useParams()
  const router = useRouter()
  const [ticket, setTicket] = useState<Ticket | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [comments, setComments] = useState<TicketComment[]>([])
  const [newComment, setNewComment] = useState('')
  const [currentUserId, setCurrentUserId] = useState<string | null>(null)

  const fetchTicketDetails = useCallback(async () => {
    try {
      setLoading(true)
      const ticketId = parseInt(params.id as string)
      
      const [ticketResponse, commentsResponse] = await Promise.all([
        fetch(`/api/admin/tickets/${ticketId}`),
        supabase
          .from('ticket_comments')
          .select(`
            *,
            profiles!ticket_comments_profile_id_fkey (
              first_name,
              last_name
            )
          `)
          .eq('ticket_id', ticketId)
          .order('created_at', { ascending: false })
      ])
      
      console.log('Comments Response:', commentsResponse.data)

      if (!ticketResponse.ok) {
        throw new Error('Erreur lors de la récupération du ticket')
      }

      const { ticket } = await ticketResponse.json()
      setTicket(ticket)
      setComments(commentsResponse.data || [])
    } catch (err: unknown) {
      console.error('Erreur:', err)
      setError(err instanceof Error ? err.message : 'Une erreur inconnue est survenue')
    } finally {
      setLoading(false)
    }
  }, [params.id])

  useEffect(() => {
    fetchTicketDetails()
  }, [params.id, fetchTicketDetails])

  useEffect(() => {
    const getCurrentUser = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (session) {
        setCurrentUserId(session.user.id)
      }
    }
    getCurrentUser()
  }, [])

  const updateStatus = async (newStatus: string) => {
    try {
      const ticketId = parseInt(params.id as string)
      const response = await fetch(`/api/admin/tickets/${ticketId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      })

      if (!response.ok) {
        throw new Error('Erreur lors de la mise à jour du statut')
      }

      const { ticket } = await response.json()
      setTicket(ticket)
    } catch (err) {
      console.error('Erreur:', err)
    }
  }

  const addComment = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.trim()) return

    try {
      const response = await fetch(`/api/admin/tickets/${params.id}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: newComment }),
      })

      if (!response.ok) {
        throw new Error('Erreur lors de l\'ajout du commentaire')
      }

      setNewComment('')
      fetchTicketDetails()
    } catch (err) {
      console.error('Erreur:', err)
    }
  }

  if (loading) {
    return <div>Chargement...</div>
  }

  if (error) {
    return <div>Erreur: {error}</div>
  }

  if (!ticket) {
    return <div>Ticket non trouvé</div>
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <Button
        onClick={() => router.back()}
        variant="ghost"
        className="mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Retour
      </Button>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl font-bold mb-2">{ticket.title}</h1>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span>Projet: {ticket.project?.name}</span>
              <span>Par: {`${ticket.profile?.first_name} ${ticket.profile?.last_name}`}</span>
              <span>
                <Clock className="w-4 h-4 inline mr-1" />
                {new Date(ticket.created_at).toLocaleDateString('fr-FR')}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <TicketStatus status={ticket.status} />
            <Select
              value={ticket.status}
              onValueChange={updateStatus}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Changer le statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="open">Ouvert</SelectItem>
                <SelectItem value="in_progress">En cours</SelectItem>
                <SelectItem value="resolved">Résolu</SelectItem>
                <SelectItem value="closed">Fermé</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="prose max-w-none mb-8">
          <p>{ticket.description}</p>
        </div>

        <div className="border-t pt-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            Commentaires
          </h2>

          <form onSubmit={addComment} className="mb-6">
            <Textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Ajouter un commentaire..."
              className="mb-2"
            />
            <Button type="submit">
              Envoyer
            </Button>
          </form>

          <div className="space-y-4">
            {comments.map((comment) => {
              console.log('Comment:', comment);
              return (
                <div key={comment.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">
                      {comment.profile_id === currentUserId 
                        ? 'Bennydev'
                        : comment.profiles 
                          ? `${comment.profiles.first_name} ${comment.profiles.last_name}`
                          : 'Utilisateur inconnu'}
                    </span>
                    <span className="text-sm text-gray-500">
                      {new Date(comment.created_at).toLocaleDateString('fr-FR')}
                    </span>
                  </div>
                  <p>{comment.content}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TicketDetailPage 