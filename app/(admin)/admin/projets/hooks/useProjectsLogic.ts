import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { ChatWebSocket } from '@/lib/websocket';
import { useUser } from '@/hooks/useUser';
import { Project, ChatMessage, ProjectImage } from '../types/project.types';

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
  const [chatWebSocket, setChatWebSocket] = useState<ChatWebSocket | null>(null);
  const { user, profile } = useUser();

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
          users: project.user_projects?.map(up => ({
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
          setMessages((prevMessages) => [...prevMessages, newMessage]);
        });
      }, 1000);

      setChatWebSocket(ws);

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
      
    } catch (error: any) {
      console.error('Erreur envoi message:', error);
      toast.error(error.message || 'Erreur lors de l\'envoi du message');
    }
  };

  const handleUpdateStatus = async () => {
    if (!selectedProject) return; // Vérification importante
    
    try {
      // Debug logs
      console.log('Selected Project:', selectedProject);
      console.log('Project ID being sent:', selectedProject.id);
      console.log('New Status:', tempStatus);
  
      const response = await fetch(`/api/projects/${selectedProject.id}/update-status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: tempStatus })
      });
  
      const data = await response.json();
      
      // Si on reçoit une erreur 404
      if (response.status === 404) {
        toast.error('Projet non trouvé');
        return;
      }
  
      if (!response.ok) {
        throw new Error(data.error);
      }
  
      toast.success('Statut mis à jour avec succès');
      // Rafraîchir les données ou mettre à jour l'état local
    } catch (error: any) {
      console.error('Erreur complète:', error);
      toast.error(error.message || 'Erreur lors de la mise à jour');
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
      const { data, error } = await response.json();
      if (error) throw error;
      
      setSelectedProject(prev => prev ? {
        ...prev,
        figmaUrl: tempFigmaUrl || prev.figma_link,
        stagingUrl: tempStagingUrl || prev.pre_prod_url
      } : null);
      
      setTempFigmaUrl('');
      setTempStagingUrl('');
      toast.success('URLs mises à jour avec succès');
    } catch (error) {
      console.error(error);
      toast.error('Erreur lors de la mise à jour des URLs');
    }
  };

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
    setSelectedProject,
    setNewMessage,
    setTempStagingUrl,
    setTempFigmaUrl,
    setTempStatus,
    sendMessage,
    handleUpdateStatus,
    handleUpdateUrls
  };
};

export const PROJECT_STATUSES = [
  { value: 'MAQUETTE', label: 'Maquettage en cours', color: 'bg-purple-100 text-purple-800' },
  { value: 'VALIDATION_MAQUETTE', label: 'En attente de validation maquette', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'DEVELOPMENT', label: 'En développement', color: 'bg-blue-100 text-blue-800' },
  { value: 'REVIEW', label: 'En révision', color: 'bg-orange-100 text-orange-800' },
  { value: 'TESTING', label: 'En phase de test', color: 'bg-indigo-100 text-indigo-800' },
  { value: 'CLIENT_VALIDATION', label: 'Validation client', color: 'bg-pink-100 text-pink-800' },
  { value: 'COMPLETED', label: 'Terminé', color: 'bg-green-100 text-green-800' }
]; 