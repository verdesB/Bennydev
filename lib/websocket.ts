import { RealtimeChannel } from '@supabase/supabase-js';
import { supabase } from '@/app/lib/supabase';
import type { ProjectMessage } from '@/components/chat/ChatComponent'

export class ChatWebSocket {
  private channel: RealtimeChannel | null = null;

  subscribeToProject(projectId: string, callback: (message: ProjectMessage) => void) {
    if (this.channel) {
      this.unsubscribe();
    }

    this.channel = supabase
      .channel(`project_messages:${projectId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'project_messages',
          filter: `project_id=eq.${projectId}`
        },
        (payload) => {
          console.log('Nouveau message reçu:', payload);
          callback(payload.new as ProjectMessage);
        }
      )
      .subscribe((status) => {
        console.log('Statut subscription:', status);
      });
  }

  unsubscribe() {
    if (this.channel) {
      try {
        this.channel.unsubscribe();
        this.channel = null;
      } catch (error) {
        console.error('Erreur lors de la désinscription:', error);
      }
    }
  }

  close() {
    this.unsubscribe();
  }

  async sendMessage(projectId: string, message: string) {
    if (!this.channel) return;

    await this.channel.send({
      type: 'broadcast',
      event: 'new_message',
      payload: { message }
    });
  }
} 