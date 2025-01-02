'use client'
import { useState, useEffect, useRef } from 'react'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
import { supabase } from '../../app/lib/supabase'
import Image from 'next/image'

interface Message {
  id: string | number
  message: string
  created_at: string
  sender_id: string
  profiles: {
    first_name: string | null
    last_name: string | null
    avatar: string | null
  }
}

interface ChatComponentProps {
  projectId: string
}

export default function ChatComponent({ projectId }: ChatComponentProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentUserId, setCurrentUserId] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Récupérer l'ID de l'utilisateur courant
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await fetch('/api/auth/me')
        const data = await response.json()
        setCurrentUserId(data.user.id)
      } catch (error) {
        console.error('Erreur récupération utilisateur:', error)
      }
    }
    fetchCurrentUser()
  }, [])

  // Charger les messages initiaux
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await fetch(`/api/projects/${projectId}/messages`)
        const responseData = await response.json()
        setMessages(responseData.data || [])
      } catch (error) {
        console.error('Erreur lors de la récupération des messages:', error)
        setError('Erreur lors du chargement des messages')
      } finally {
        setLoading(false)
      }
    }

    fetchMessages()
  }, [projectId])

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Configuration Supabase Realtime
  useEffect(() => {
    console.log('Configuration du canal pour le projet:', projectId)
    
    const channel = supabase
      .channel('messages')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `project_id=eq.${projectId}`
        },
        (payload) => {
          console.log('Changement détecté:', payload)
          const newMessage = payload.new as Message
          setMessages(prev => {
            if (prev.some(msg => msg.id === newMessage.id)) {
              return prev
            }
            return [...prev, newMessage]
          })
        }
      )
      .subscribe((status) => {
        console.log('Statut de la subscription:', status)
      })

    return () => {
      console.log('Désinscription du canal')
      supabase.removeChannel(channel)
    }
  }, [projectId])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    try {
      const response = await fetch(`/api/projects/${projectId}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: newMessage.trim() })
      })

      if (!response.ok) {
        throw new Error('Erreur envoi message')
      }

      const data = await response.json()
      const newMessageData = data.data

      setMessages(prev => [...prev, newMessageData])
      setNewMessage('')
    } catch (error) {
      console.error('Erreur:', error)
    }
  }

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="p-4 bg-white border-b">
        <h2 className="text-lg tracking-tight font-medium text-gray-800">Messages</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <div className="animate-pulse text-gray-500">Chargement des messages...</div>
          </div>
        ) : error ? (
          <div className="flex justify-center items-center h-full text-red-500">
            {error}
          </div>
        ) : messages.length === 0 ? (
          <div className="flex justify-center items-center h-full">
            <span className="text-gray-500">Aucun message pour le moment</span>
          </div>
        ) : (
          <div className="space-y-6">
            {messages.map((message) => {
              if (!message) return null;
              const isCurrentUser = message.sender_id === currentUserId;
              const displayName = isCurrentUser ? 'Moi' : 'BennyDev';
              const initial = message.profiles?.first_name?.charAt(0)?.toUpperCase() || 'U';
              
              return (
                <div 
                  key={message.id} 
                  className={`flex items-start gap-3 ${isCurrentUser ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  <div className="flex-shrink-0">
                    {message.profiles?.avatar ? (
                      <Image
                        src={message.profiles.avatar}
                        alt={`Avatar de ${displayName}`}
                        width={32}
                        height={32}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    ) : (
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        isCurrentUser ? 'bg-purple-200' : 'bg-blue-200'
                      }`}>
                        <span className={`text-sm font-medium ${
                          isCurrentUser ? 'text-purple-700' : 'text-blue-700'
                        }`}>
                          {initial}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col gap-1 max-w-[60%]">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-900">
                        {displayName}
                      </span>
                      <span className="text-xs text-gray-500">
                        {format(new Date(message.created_at), 'HH:mm', { locale: fr })}
                      </span>
                    </div>

                    <div className={`
                      rounded-2xl px-4 py-2
                      ${isCurrentUser 
                        ? 'bg-purple-600 text-white rounded-tr-none' 
                        : 'bg-white text-gray-800 rounded-tl-none border border-gray-200'
                      }
                    `}>
                      <p className="text-sm">{message.message}</p>
                    </div>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      <form onSubmit={handleSendMessage} className="p-4 bg-white border-t">
        <div className="flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Votre message..."
            className="flex-1 px-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
          <button
            type="submit"
            disabled={!newMessage.trim()}
            className="px-6 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Envoyer
          </button>
        </div>
      </form>
    </div>
  )
}