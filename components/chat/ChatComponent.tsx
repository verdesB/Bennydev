'use client'
import { useState, useEffect, useRef } from 'react'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
import { ChatWebSocket } from '@/lib/websocket'

interface Message {
  id: string | number
  message: string
  created_at: string
  sender_id: string
  profiles: {
    first_name: string | null
    last_name: string | null
  }
}

interface ChatComponentProps {
  projectId: string
}

// Ajout de l'interface pour les messages WebSocket
interface WebSocketMessage {
  id: string | number
  message: string
  created_at: string
  sender_id: string
  profiles: {
    first_name: string | null
    last_name: string | null
  }
}

export interface ProjectMessage {
  id: string | number
  message: string
  created_at: string
  sender_id: string
  profiles: {
    first_name: string | null
    last_name: string | null
  }
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

  // Ajout de la configuration WebSocket
  useEffect(() => {
    console.log('Initialisation WebSocket pour le projet:', projectId)
    
    const ws = new ChatWebSocket()
    
    setTimeout(() => {
      try {
        ws.subscribeToProject(projectId, (newMessage: ProjectMessage) => {
          console.log('Nouveau message reçu via WebSocket:', newMessage)
          setMessages(prev => [...prev, {
            id: newMessage.id,
            message: newMessage.message,
            created_at: newMessage.created_at,
            sender_id: newMessage.sender_id,
            profiles: newMessage.profiles
          }])
        })
      } catch (error) {
        console.error('Erreur WebSocket:', error)
      }
    }, 1000)

    return () => {
      console.log('Fermeture WebSocket')
      if (ws) {
        ws.unsubscribe()
        ws.close()
      }
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

      const responseData = await response.json()

      if (!response.ok) {
        throw new Error(responseData.error || 'Erreur envoi message')
      }

      // Plus besoin de mettre à jour les messages ici
      // car le WebSocket s'en chargera
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
          <div className="space-y-4">
            {messages.map((message) => {
              const isCurrentUser = message.sender_id === currentUserId
              return (
                <div 
                  key={message.id} 
                  className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`
                    max-w-[50%] 
                    ${isCurrentUser 
                      ? 'bg-purple-600 text-white' 
                      : 'bg-white text-gray-800'} 
                    rounded-lg shadow-sm p-3
                  `}>
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className={`text-sm tracking-tight font-medium ${isCurrentUser ? 'text-purple-100' : 'text-purple-600'}`}>
                        {isCurrentUser ? 'Moi' : 'BennyDev'}
                      </span>
                      <span className={`text-xs ${isCurrentUser ? 'text-purple-200' : 'text-gray-500'}`}>
                        {format(new Date(message.created_at), 'HH:mm', { locale: fr })}
                      </span>
                    </div>
                    <p className={`${isCurrentUser ? 'text-white' : 'text-gray-800'}`}>
                      {message.message}
                    </p>
                  </div>
                </div>
              )
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