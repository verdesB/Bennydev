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
    <div className="flex flex-col h-[calc(100%-60px)]">
      {/* Messages avec scroll */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div 
            key={msg.id}
            className={`flex ${
              msg.sender_id === user?.id ? "justify-end" : "justify-start"
            }`}
          >
            <div className={`
              max-w-[320px] px-4 py-2 rounded-full
              ${msg.sender_id === user?.id 
                ? "bg-purple-600 text-white" 
                : "bg-gray-200 text-gray-800"
              }
            `}>
              <p className="text-[15px]">{msg.message}</p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Footer chat */}
      <div className="p-4 bg-white border-t">
        <form 
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage();
          }} 
          className="flex gap-2"
        >
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
        </form>
      </div>
    </div>
  );
};