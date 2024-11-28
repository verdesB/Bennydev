import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChatMessage, User } from '../types/project.types';

interface ChatSectionProps {
  messages: ChatMessage[];
  newMessage: string;
  user: User | null;
  setNewMessage: (message: string) => void;
  sendMessage: () => void;
}

export const ChatSection = ({
  messages,
  newMessage,
  user,
  setNewMessage,
  sendMessage
}: ChatSectionProps) => {
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className="flex flex-col h-full mt-4">
      {/* Messages avec scroll */}
      <div className="flex-1 overflow-y-scroll p-6 space-y-6 max-h-[calc(100vh-10rem)] scrollbar-thin scrollbar-track-transparent scrollbar-thumb-purple-300/20 hover:scrollbar-thumb-purple-400/30">
        {messages.map((msg) => (
          <div 
            key={msg.id}
            className={`flex flex-col ${
              msg.sender_id === user?.id ? "items-end" : "items-start"
            }`}
          >
            <div className="flex flex-col space-y-1">
              <span className="text-sm text-gray-500/80 mx-2">
                {msg.sender_id === user?.id ? "Vous" : 
                 msg.profiles ? `${msg.profiles.first_name || ''} ${msg.profiles.last_name || ''}` : 'Utilisateur'}
              </span>
              <div className={`
                max-w-[320px] rounded-2xl p-4
                ${msg.sender_id === user?.id 
                  ? "bg-purple-600/90 backdrop-blur-sm text-white rounded-tr-none" 
                  : "bg-white/80 backdrop-blur-sm rounded-tl-none"
                }
              `}>
                <p className="text-[15px] leading-relaxed">{msg.message}</p>
                <p className={`text-xs mt-2 ${
                  msg.sender_id === user?.id 
                    ? "text-purple-100/70" 
                    : "text-gray-500/70"
                }`}>
                  {new Date(msg.created_at).toLocaleTimeString('fr-FR', {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Footer chat */}
      <div className="p-4 border-t border-purple-200/20 bg-white/5 backdrop-blur-md rounded-2xl overflow-hidden">
        <form 
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage();
          }} 
          className="flex gap-2 rounded-2xl"
        >
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Votre message..."
            className="flex-1 bg-white"
          />
          <Button type="submit">Envoyer</Button>
        </form>
      </div>
    </div>
  );
};