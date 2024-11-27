'use client';

import { useEffect, useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from "@/components/ui/label";
import { PencilIcon, TrashIcon, ChevronUpIcon, ChevronDownIcon } from "lucide-react";
import { toast } from 'sonner';
import { ChatWebSocket } from '@/lib/websocket';
import { useUser } from '@/hooks/useUser';

interface Project {
  id: string;
  name: string;
  description: string;
  type: string;
  status: string;
  startDate: string;
  endDate: string;
  budget: number;
  figma_link: string;
  pre_prod_url: string;
  users: {
    role: string;
    displayName: string;
  }[];
}

interface ChatMessage {
  id: number;
  sender_id: string;
  message: string;
  created_at: string;
  profiles: {
    first_name?: string | null;
    last_name?: string | null;
  };
}

interface ProjectImage {
  id: number;
  url: string;
  caption: string;
  location: string;
  order: number;
}

const PROJECT_STATUSES = [
  { value: 'MAQUETTE', label: 'Maquettage en cours', color: 'bg-purple-100 text-purple-800' },
  { value: 'VALIDATION_MAQUETTE', label: 'En attente de validation maquette', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'DEVELOPMENT', label: 'En développement', color: 'bg-blue-100 text-blue-800' },
  { value: 'REVIEW', label: 'En révision', color: 'bg-orange-100 text-orange-800' },
  { value: 'TESTING', label: 'En phase de test', color: 'bg-indigo-100 text-indigo-800' },
  { value: 'CLIENT_VALIDATION', label: 'Validation client', color: 'bg-pink-100 text-pink-800' },
  { value: 'COMPLETED', label: 'Terminé', color: 'bg-green-100 text-green-800' }
];

const ProjectsPage = () => {
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
          figma_link: tempFigmaUrl || selectedProject?.figma_link,
          pre_prod_url: tempStagingUrl || selectedProject?.pre_prod_url
        })
      });
      const { data, error } = await response.json();
      if (error) throw error;
      
      setSelectedProject(prev => prev ? {
        ...prev,
        figma_link: tempFigmaUrl || prev.figma_link,
        pre_prod_url: tempStagingUrl || prev.pre_prod_url
      } : null);
      
      setTempFigmaUrl('');
      setTempStagingUrl('');
      toast.success('URLs mises à jour avec succès');
    } catch (error) {
      console.error(error);
      toast.error('Erreur lors de la mise à jour des URLs');
    }
  };

  return (
    <div className="max-h-screen flex flex-col overflow-hidden">
      {/* Header - hauteur fixe */}
      <div className="flex items-center justify-between px-6 py-4 h-16">
        <h1 className="text-3xl font-bold">Gestion des Projets</h1>
        <div className="w-[300px]">
          <Select
            onValueChange={(value) => {
              const project = projects.find(p => p.id === value);
              setSelectedProject(project || null);
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Sélectionnez un projet" />
            </SelectTrigger>
            <SelectContent>
              {projects.map((project) => (
                <SelectItem key={project.id} value={project.id}>
                  {project.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Contenu principal - prend le reste de l'espace */}
      
        {selectedProject ? (
          <Card className="h-[calc(100vh-8rem)] mx-6">
            <div className="grid grid-cols-[1fr,600px] h-full">
              {/* Partie gauche avec scroll */}
              <div className="overflow-y-scroll border-r h-full ">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-semibold text-gray-900">
                      {selectedProject.name}
                    </h2>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium
                      ${PROJECT_STATUSES.find(s => s.value === selectedProject.status)?.color || 'bg-gray-100 text-gray-800'}`}
                    >
                      {PROJECT_STATUSES.find(s => s.value === selectedProject.status)?.label || selectedProject.status}
                    </span>
                  </div>

                  <div className="space-y-6">
                    {/* Informations de base */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm text-gray-500">Client</label>
                          <p className="font-medium text-gray-900">
                            {selectedProject.users.find(u => u.role === 'member')?.displayName}
                          </p>
                        </div>
                        <div>
                          <label className="text-sm text-gray-500">Date de début</label>
                          <p className="font-medium text-gray-900">
                            {new Date(selectedProject.startDate).toLocaleDateString('fr-FR')}
                          </p>
                        </div>
                        <div>
                          <label className="text-sm text-gray-500">Budget</label>
                          <p className="font-medium text-gray-900">
                            {selectedProject.budget.toLocaleString('fr-FR')} €
                          </p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <label className="text-sm text-gray-500">Description</label>
                          <p className="font-medium text-gray-900">{selectedProject.description}</p>
                        </div>
                        <div>
                          <label className="text-sm text-gray-500">Date de fin</label>
                          <p className="font-medium text-gray-900">
                            {new Date(selectedProject.endDate).toLocaleDateString('fr-FR')}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Status Section */}
                    <div className="border-t pt-6">
                      <div className="space-y-2">
                        <Label htmlFor="projectStatus" className="text-sm text-gray-500">
                          État du projet
                        </Label>
                        <div className="flex gap-3">
                          <Select
                            value={tempStatus || selectedProject.status}
                            onValueChange={setTempStatus}
                          >
                            <SelectTrigger className="flex-1">
                              <SelectValue placeholder="Sélectionnez l'état du projet" />
                            </SelectTrigger>
                            <SelectContent>
                              {PROJECT_STATUSES.map((status) => (
                                <SelectItem 
                                  key={status.value} 
                                  value={status.value}
                                  className="flex items-center gap-2"
                                >
                                  <span className={`w-2 h-2 rounded-full ${status.color.replace('bg-', 'bg-')}`} />
                                  {status.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <Button
                            onClick={handleUpdateStatus}
                            className="bg-blue-600 hover:bg-blue-700 text-white whitespace-nowrap"
                            disabled={!tempStatus || tempStatus === selectedProject.status}
                          >
                            Mettre à jour
                          </Button>
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-sm text-gray-500">État actuel:</span>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            PROJECT_STATUSES.find(s => s.value === selectedProject.status)?.color || 'bg-gray-100 text-gray-800'
                          }`}>
                            {PROJECT_STATUSES.find(s => s.value === selectedProject.status)?.label || selectedProject.status}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500">
                          La mise à jour de l'état enverra une notification au client
                        </p>
                      </div>
                    </div>

                    {/* Images Section */}
                    <div className="border-t pt-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <Label className="text-sm text-gray-500">
                            Images du projet
                          </Label>
                          <Button variant="outline" size="sm" className="text-xs">
                            Ajouter une image
                          </Button>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                          {projectImages.map((image) => (
                            <Card key={image.id} className="overflow-hidden">
                              <div className="aspect-square relative group">
                                <img
                                  src={image.url}
                                  alt={image.caption}
                                  className="object-cover w-full h-full"
                                />
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2">
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="text-white hover:text-white hover:bg-white/20"
                                    onClick={() => {
                                      // Logique pour éditer
                                    }}
                                  >
                                    <PencilIcon className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="text-white hover:text-white hover:bg-white/20"
                                    onClick={() => {
                                      // Logique pour supprimer
                                    }}
                                  >
                                    <TrashIcon className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                              <div className="p-3 space-y-1">
                                <p className="font-medium text-sm truncate">
                                  {image.caption}
                                </p>
                                <div className="flex items-center justify-between">
                                  <span className="text-xs text-gray-500">
                                    Emplacement: {image.location}
                                  </span>
                                  <div className="flex items-center gap-1">
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="h-6 w-6"
                                      disabled={image.order === 1}
                                      onClick={() => {
                                        // Logique pour monter l'ordre
                                      }}
                                    >
                                      <ChevronUpIcon className="h-4 w-4" />
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="h-6 w-6"
                                      disabled={image.order === projectImages.length}
                                      onClick={() => {
                                        // Logique pour descendre l'ordre
                                      }}
                                    >
                                      <ChevronDownIcon className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </Card>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Figma and Staging URL Section */}
                    <div className="border-t pt-6 space-y-6">
                      <div className="grid grid-cols-1 gap-6">
                        {/* Figma URL */}
                        <div className="bg-white p-4 rounded-lg shadow-sm">
                          <Label htmlFor="figmaUrl" className="text-sm font-medium mb-2 block">
                            Lien Figma (Maquette)
                          </Label>
                          <div className="flex gap-3">
                            <Input
                              id="figmaUrl"
                              placeholder="https://figma.com/file/..."
                              value={tempFigmaUrl || selectedProject.figma_link || ''}
                              onChange={(e) => setTempFigmaUrl(e.target.value)}
                              className="flex-1"
                            />
                            <Button
                              onClick={handleUpdateUrls}
                              className="bg-blue-600 hover:bg-blue-700 text-white"
                              disabled={!tempFigmaUrl && !tempStagingUrl}
                            >
                              Enregistrer
                            </Button>
                          </div>
                        </div>

                        {/* Staging URL */}
                        <div className="bg-white p-4 rounded-lg shadow-sm">
                          <Label htmlFor="stagingUrl" className="text-sm font-medium mb-2 block">
                            Lien de préproduction
                          </Label>
                          <div className="flex gap-3">
                            <Input
                              id="stagingUrl"
                              placeholder="https://staging.votreprojet.com"
                              value={tempStagingUrl || selectedProject.pre_prod_url || ''}
                              onChange={(e) => setTempStagingUrl(e.target.value)}
                              className="flex-1"
                            />
                            <Button
                              onClick={handleUpdateUrls}
                              className="bg-blue-600 hover:bg-blue-700 text-white"
                              disabled={!tempFigmaUrl && !tempStagingUrl}
                            >
                              Enregistrer
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section chat - hauteur fixe */}
              <div className="flex flex-col h-full">
                {/* Header chat */}
                <div className="p-4 border-b bg-white">
                  <h3 className="font-semibold text-lg">Discussion du projet</h3>
                </div>
                
                {/* Messages avec scroll */}
                <div className="flex-1 overflow-y-scroll p-6 space-y-6 max-h-[calc(100vh-18rem)]">
                  {messages.map((msg) => (
                    <div 
                      key={msg.id}
                      className={`flex flex-col ${
                        msg.sender_id === user?.id ? "items-end" : "items-start"
                      }`}
                    >
                      <div className="flex flex-col space-y-1">
                        <span className="text-sm text-gray-500 mx-2">
                          {msg.sender_id === user?.id ? "Vous" : 
                           msg.profiles ? `${msg.profiles.first_name || ''} ${msg.profiles.last_name || ''}` : 'Utilisateur'}
                        </span>
                        <div className={`
                          max-w-[320px] rounded-2xl p-4 shadow-sm
                          ${msg.sender_id === user?.id 
                            ? "bg-blue-600 text-white rounded-tr-none" 
                            : "bg-white rounded-tl-none"
                          }
                        `}>
                          <p className="text-[15px] leading-relaxed">{msg.message}</p>
                          <p className={`text-xs mt-2 ${
                            msg.sender_id === user?.id 
                              ? "text-blue-100" 
                              : "text-gray-500"
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
                </div>

                {/* Footer chat */}
                <div className="p-4 border-t bg-white">
                  <form 
                    onSubmit={(e) => {
                      e.preventDefault();
                      sendMessage();
                    }} 
                    className="flex gap-2"
                  >
                    <Input
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Votre message..."
                      className="flex-1"
                    />
                    <Button type="submit">Envoyer</Button>
                  </form>
                </div>
              </div>
            </div>
          </Card>
        ) : (
          <div className="h-full flex items-center justify-center text-gray-500">
            Sélectionnez un projet pour voir les détails
          </div>
        )}
      
    </div>
  );
};

export default ProjectsPage;
