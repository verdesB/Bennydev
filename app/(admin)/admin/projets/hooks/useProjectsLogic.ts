"use client"

import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { ChatWebSocket } from '@/lib/websocket';
import { useUser } from '@/hooks/useUser';
import { Project, ChatMessage, ProjectImage } from '../types/project.types';
export interface UserProject {
  profile: Profile;
  user_id: string;
  role: string;
  // Ajoutez d'autres propriétés si nécessaire
} 
export interface Profile {
  id: string;
  first_name: string;
  last_name: string;
}
export const useProjectsLogic = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      sender_id: "John Doe",
      message: "Premier message concernant le projet",
      created_at: new Date().toISOString(),
      profiles: {
        id: "1",
        first_name: "John",
        last_name: "Doe"
      }
    },
    // ... autres messages
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [tempStagingUrl, setTempStagingUrl] = useState<string>('');
  const [tempFigmaUrl, setTempFigmaUrl] = useState<string>('');
  const [tempStatus, setTempStatus] = useState<string>('');
  const [projectImages, setProjectImages] = useState<ProjectImage[]>([
    {
      id: 1,
      url: "/Bd.webp",
      caption: "Logo principal",
      location: "header",
      order: 1
    },
    {
      id: 2,
      url: "/Bd.webp",
      caption: "Image bannière d'accueil",
      location: "hero-section",
      order: 2
    },
    // ... autres images
  ]);
  const { user } = useUser();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/get-all-projects');
        const { data, error } = await response.json();
        
        if (error) throw new Error(error);
        
        console.log('Données reçues:', data);
        
        if (!Array.isArray(data)) {
          console.error('Les données ne sont pas un tableau:', data);
          return;
        }

        const formattedProjects = data.map(project => ({
          id: project.id,
          name: project.name,
          description: project.description,
          type: project.type,
          status: project.state,
          startDate: project.starter_date,
          endDate: project.focus_date,
          budget: project.budget,
          figma_link: project.figma_link,
          pre_prod_url: project.prod_test_url,
          users: project.user_projects?.map((up: UserProject) => ({
            id: up.user_id,
            role: up.role,
            displayName: up.role === 'member' && up.profile 
              ? `${up.profile.first_name || "bennydev"} ${up.profile.last_name || "bennydev"}`
              : 'Inconnu'
          })) || []
        }));

        console.log('Projets formatés:', formattedProjects);
        setProjects(formattedProjects);
      } catch (error) {
        console.error('Erreur lors de la récupération des projets:', error);
      }
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    if (selectedProject) {
      const loadMessages = async () => {
        try {
          const response = await fetch(`/api/projects/${selectedProject.id}/messages`, {
            credentials: 'include'
          });
          
          if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error);
          }
          
          const { data } = await response.json();
          setMessages(data || []);
        } catch (error) {
          console.error('Erreur chargement messages:', error);
          toast.error('Erreur lors du chargement des messages');
        }
      };

      loadMessages();

      const ws = new ChatWebSocket();
      
      setTimeout(() => {
        ws.subscribeToProject(selectedProject.id, (newMessage) => {
          console.log('Message reçu via WebSocket:', newMessage);
          
          if (isChatMessage(newMessage)) {
            setMessages((prevMessages) => [...prevMessages, newMessage]);
          } else {
            console.error('Le message reçu n\'est pas du type ChatMessage:', newMessage);
          }
        });
      }, 1000);

      return () => {
        if (ws) {
          ws.unsubscribe();
          ws.close();
        }
      };
    }
  }, [selectedProject]);

  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedProject) return;

    try {
      const response = await fetch(`/api/projects/${selectedProject.id}/messages`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ message: newMessage.trim() })
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Erreur lors de l\'envoi du message');
      }

      setNewMessage('');
      
    } catch (error: Error | unknown) {
      console.error('Erreur envoi message:', error);
      toast.error(error instanceof Error ? error.message : 'Erreur lors de l\'envoi du message');
    }
  };

  const handleUpdateStatus = async () => {
    if (!selectedProject) return;
    
    try {
      const response = await fetch(`/api/projects/${selectedProject.id}/update-status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: tempStatus })
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error);
      }

      setSelectedProject(prev => prev ? {
        ...prev,
        status: tempStatus
      } : null);

      const client = selectedProject.users.find(user => user.role === 'member');
      if (client) {
        console.log('ID du client:', client.user_id);

        try {
          const statusLabel = PROJECT_STATUSES.find(
            status => status.value === tempStatus
          )?.label || tempStatus;

          const response = await fetch('/api/create-notification', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              user_id: client.user_id,
              title: 'Mise à jour du statut',
              message: `Le statut du projet ${selectedProject.name} a été mis à jour vers "${statusLabel}"`,
              type: 'STATUS_UPDATE',
              project_id: selectedProject.id
            })
          });

          const data = await response.json();
          
          if (!response.ok) {
            throw new Error(data.error || 'Erreur lors de la création de la notification');
          }

          console.log('Notification créée avec succès:', data);
        } catch (error) {
          console.error('Erreur détaillée:', error);
          toast.error('Erreur lors de l\'envoi de la notification');
        }
      
      }
      setTempStatus('');
      toast.success('Statut mis à jour avec succès');
    } catch (error: Error | unknown) {
      console.error('Erreur complète:', error);
      toast.error(error instanceof Error ? error.message : 'Erreur lors de la mise à jour');
    }
  };

  const handleUpdateUrls = async () => {
    if (!selectedProject) return;

    try {
      const response = await fetch(`/api/projects/${selectedProject.id}/update-urls`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          figmaUrl: tempFigmaUrl || selectedProject?.figma_link,
          stagingUrl: tempStagingUrl || selectedProject?.pre_prod_url
        })
      });
      const { error } = await response.json();
      if (error) throw error;

      setSelectedProject(prev => prev ? {
        ...prev,
        figmaUrl: tempFigmaUrl || prev.figma_link,
        stagingUrl: tempStagingUrl || prev.pre_prod_url
      } : null);

      // Trouver le client (membre) du projet
      const client = selectedProject.users.find(user => user.role === 'member');
      if (client) {
        console.log('ID du client:', client.user_id );

        try {
          const response = await fetch('/api/create-notification', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              user_id: client.user_id,
              title: 'Ajout des URLs du projet',
              message: `Les URLs du projet ${selectedProject.name} ont été mises à jour.`,
              type: 'URL_UPDATE',
              project_id: selectedProject.id
            })
          });

          const data = await response.json();
          
          if (!response.ok) {
            throw new Error(data.error || 'Erreur lors de la création de la notification');
          }

          console.log('Notification créée avec succès:', data);
        } catch (error) {
          console.error('Erreur détaillée:', error);
          toast.error('Erreur lors de l\'envoi de la notification');
        }
      }

      setTempFigmaUrl('');
      setTempStagingUrl('');
      toast.success('URLs mises à jour avec succès');
    } catch (error) {
      console.error(error);
      toast.error('Erreur lors de la mise à jour des URLs');
    }
  };

  const PROJECT_STATUSES = [
    { value: 'MAQUETTE', label: 'Maquettage en cours', color: 'bg-purple-100 text-purple-800' },
    { value: 'VALIDATION_MAQUETTE', label: 'En attente de validation maquette', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'DEVELOPMENT', label: 'En développement', color: 'bg-blue-100 text-blue-800' },
    { value: 'REVIEW', label: 'En révision', color: 'bg-orange-100 text-orange-800' },
    { value: 'TESTING', label: 'En phase de test', color: 'bg-indigo-100 text-indigo-800' },
    { value: 'CLIENT_VALIDATION', label: 'Validation client', color: 'bg-pink-100 text-pink-800' },
    { value: 'COMPLETED', label: 'Terminé', color: 'bg-green-100 text-green-800' }
  ];

  return {
    projects,
    selectedProject,
    messages,
    newMessage,
    tempStagingUrl,
    tempFigmaUrl,
    tempStatus,
    projectImages,
    user,
    PROJECT_STATUSES,
    setSelectedProject,
    setNewMessage,
    setTempStagingUrl,
    setTempFigmaUrl,
    setTempStatus,
    sendMessage,
    handleUpdateStatus,
    handleUpdateUrls,
    setProjectImages
  };
}; 

// Fonction utilitaire pour vérifier le type
function isChatMessage(message: unknown): message is ChatMessage {
  return (
    typeof message === 'object' &&
    message !== null &&
    'sender_id' in message &&
    'message' in message &&
    typeof (message as ChatMessage).sender_id === 'string' &&
    typeof (message as ChatMessage).message === 'string'
  );
} 