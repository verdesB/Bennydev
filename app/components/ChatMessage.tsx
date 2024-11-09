import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';

interface ChatMessageProps {
  content: string;
  role: 'user' | 'assistant';
}

export default function ChatMessage({ content, role }: ChatMessageProps) {
  const paragraphs = content.split('\n\n');
  
  return (
    <div className={`flex ${role === 'assistant' ? 'justify-start' : 'justify-end'} mb-4`}>
      <div className={`
        max-w-[80%] p-4 rounded-2xl
        ${role === 'assistant' 
          ? 'bg-gray-200 text-gray-800' 
          : 'bg-blue-500 text-white'
        }
      `}>
        {paragraphs.map((paragraph, index) => {
          // Si c'est un titre (contient ----------------)
          if (paragraph.includes('----------------')) {
            const title = paragraph.split('----------------')[0];
            return (
              <h3 key={index} className="text-xl font-bold mt-6 mb-4 first:mt-0">
                {title.trim()}
              </h3>
            );
          }
          // Si c'est une liste (contient des puces •)
          else if (paragraph.includes('•')) {
            return (
              <ul key={index} className="list-none space-y-2 mb-6">
                {paragraph.split('\n').map((item, i) => (
                  <li key={i} className="ml-4">
                    {item.trim()}
                  </li>
                ))}
              </ul>
            );
          }
          // Texte normal
          return (
            <p key={index} className="mb-4 last:mb-0">
              {paragraph}
            </p>
          );
        })}
      </div>
    </div>
  );
} 