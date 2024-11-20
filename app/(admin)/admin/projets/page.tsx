'use client';

import { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Label } from "@/components/ui/label";
import { PencilIcon, TrashIcon, ChevronUpIcon, ChevronDownIcon } from "lucide-react";

interface Project {
  id: number;
  name: string;
  client: string;
  description: string;
  status: string;
  startDate: string;
  endDate: string;
  budget: number;
  figmaUrl?: string;
  stagingUrl?: string;
}

interface ChatMessage {
  id: number;
  sender: string;
  message: string;
  timestamp: Date;
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
  const projects: Project[] = [
    {
      id: 1,
      name: "Website Redesign",
      client: "ABC Company",
      description: "Complete modernization of corporate website",
      status: "In Progress",
      startDate: "2024-01-15",
      endDate: "2024-06-30",
      budget: 2000
    },
    // ... other projects
  ];

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      sender: "John Doe",
      message: "Premier message concernant le projet",
      timestamp: new Date()
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

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    
    setMessages([...messages, {
      id: messages.length + 1,
      sender: "Vous",
      message: newMessage,
      timestamp: new Date()
    }]);
    setNewMessage('');
  };

  const handleUpdateStagingUrl = () => {
    console.log('Mise à jour de l\'URL:', tempStagingUrl);
    // updateProject({ ...selectedProject, stagingUrl: tempStagingUrl })
  };

  const handleUpdateFigmaUrl = () => {
    console.log('Mise à jour du lien Figma:', tempFigmaUrl);
    // updateProject({ ...selectedProject, figmaUrl: tempFigmaUrl })
  };

  const handleUpdateStatus = () => {
    if (!tempStatus) return;
    console.log('Mise à jour du statut:', tempStatus);
    // updateProject({ ...selectedProject, status: tempStatus })
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between p-6">
        <h1 className="text-3xl font-bold">Gestion des Projets</h1>
        
        {/* Project Selector */}
        <div className="w-[300px]">
          <Select
            onValueChange={(value) => {
              const project = projects.find(p => p.id.toString() === value);
              setSelectedProject(project || null);
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Sélectionnez un projet" />
            </SelectTrigger>
            <SelectContent>
              {projects.map((project) => (
                <SelectItem key={project.id} value={project.id.toString()}>
                  {project.name} - {project.client}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-6 pt-0">
        {selectedProject ? (
          <Card className="h-full">
            <div className="grid grid-cols-[1fr,400px] h-full">
              {/* Project Details - Scrollable */}
              <div className="border-r overflow-y-scroll h-[calc(100vh-12rem)]">
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
                          <p className="font-medium text-gray-900">{selectedProject.client}</p>
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

                    {/* Figma Link Section */}
                    <div className="border-t pt-6">
                      <div className="space-y-2">
                        <Label htmlFor="figmaUrl" className="text-sm text-gray-500">
                          Lien Figma (Maquette)
                        </Label>
                        <div className="flex gap-3">
                          <Input
                            id="figmaUrl"
                            placeholder="https://figma.com/file/..."
                            value={tempFigmaUrl || selectedProject.figmaUrl || ''}
                            onChange={(e) => setTempFigmaUrl(e.target.value)}
                            className="flex-1"
                          />
                          <Button
                            onClick={handleUpdateFigmaUrl}
                            className="bg-blue-600 hover:bg-blue-700 text-white"
                          >
                            Enregistrer
                          </Button>
                          {selectedProject.figmaUrl && (
                            <Button
                              variant="outline"
                              onClick={() => window.open(selectedProject.figmaUrl, '_blank')}
                              className="whitespace-nowrap"
                            >
                              Voir Figma
                            </Button>
                          )}
                        </div>
                        <p className="text-xs text-gray-500">
                          Lien vers la maquette Figma du projet
                        </p>
                      </div>
                    </div>

                    {/* Staging URL Section */}
                    <div className="border-t pt-6">
                      <div className="space-y-2">
                        <Label htmlFor="stagingUrl" className="text-sm text-gray-500">
                          Lien de préproduction
                        </Label>
                        <div className="flex gap-3">
                          <Input
                            id="stagingUrl"
                            placeholder="https://staging.votreprojet.com"
                            value={tempStagingUrl || selectedProject.stagingUrl || ''}
                            onChange={(e) => setTempStagingUrl(e.target.value)}
                            className="flex-1"
                          />
                          <Button
                            onClick={handleUpdateStagingUrl}
                            className="bg-blue-600 hover:bg-blue-700 text-white"
                          >
                            Enregistrer
                          </Button>
                          {selectedProject.stagingUrl && (
                            <Button
                              variant="outline"
                              onClick={() => window.open(selectedProject.stagingUrl, '_blank')}
                              className="whitespace-nowrap"
                            >
                              Voir le site
                            </Button>
                          )}
                        </div>
                        <p className="text-xs text-gray-500">
                          Entrez l'URL complète du site en préproduction
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Chat Section - Fixed */}
              <div className="flex flex-col h-full bg-gray-50">
                <div className="p-4 border-b bg-white">
                  <h3 className="font-semibold text-lg">Discussion du projet</h3>
                </div>
                
                <ScrollArea className="flex-1">
                  <div className="p-6 space-y-6">
                    {messages.map((msg) => (
                      <div 
                        key={msg.id}
                        className={`flex flex-col ${
                          msg.sender === "Vous" ? "items-end" : "items-start"
                        }`}
                      >
                        <div className="flex flex-col space-y-1">
                          <span className="text-sm text-gray-500 mx-2">
                            {msg.sender}
                          </span>
                          <div className={`
                            max-w-[320px] rounded-2xl p-4 shadow-sm
                            ${msg.sender === "Vous" 
                              ? "bg-blue-600 text-white rounded-tr-none" 
                              : "bg-white rounded-tl-none"
                            }
                          `}>
                            <p className="text-[15px] leading-relaxed">{msg.message}</p>
                            <p className={`text-xs mt-2 ${
                              msg.sender === "Vous" 
                                ? "text-blue-100" 
                                : "text-gray-500"
                            }`}>
                              {msg.timestamp.toLocaleTimeString('fr-FR', {
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>

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
    </div>
  );
};

export default ProjectsPage;
