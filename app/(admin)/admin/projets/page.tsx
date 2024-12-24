'use client'

import { Button } from '@/components/ui/button';
import { MessageCircle, Search, X } from "lucide-react";
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useProjectsLogic } from './hooks/useProjectsLogic';
import { ProjectDetails } from './components/ProjectDetails/ProjectDetails';
import { ChatSection } from './components/ChatSection';
import { User } from './types/project.types';
import { useState } from 'react';

const ProjectsPage = () => {
  const {
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
    handleUpdateUrls,
    PROJECT_STATUSES,
  } = useProjectsLogic();

  const [searchQuery, setSearchQuery] = useState('');
  const [isChatOpen, setIsChatOpen] = useState(false);

  const filteredProjects = projects.filter(project => 
    project.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-[calc(100vh-4rem)] flex overflow-hidden rounded-2xl shadow-[0_4px_20px_-1px_rgba(147,51,234,0.2)]">
      {/* Panneau latéral gauche */}
      <aside className="w-[300px] border-r border-[#E7E7E7] bg-white flex flex-col">
        <div className="shrink-0 p-6 border-b border-[#E7E7E7]">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#919191]" />
            <Input
              placeholder="Rechercher un projet..."
              className="pl-10 h-9 bg-[#F5F5F7] border-none rounded-lg text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Liste des projets */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-3">
            {filteredProjects.map((project) => (
              <Card 
                key={project.id}
                className={`p-4 cursor-pointer transition-all hover:shadow-md ${
                  selectedProject?.id === project.id ? 'border-purple-500 shadow-md' : ''
                }`}
                onClick={() => setSelectedProject(project)}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium">{project.name}</h3>
                  <Badge variant={project.state === 'active' ? "default" : "secondary"}>
                    {project.state}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {project.description}
                </p>
                <div className="text-xs text-muted-foreground mt-2">
                  {project.company || 'Entreprise non spécifiée'}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </aside>

      {/* Contenu principal */}
      <main className="flex-1 bg-white relative">
        {selectedProject ? (
          <div className="h-full flex flex-col">
            <div className="p-6 border-b border-[#E7E7E7] flex justify-between items-center">
              <h1 className="text-2xl font-bold">Détails du projet</h1>
              <Button 
                variant="outline" 
                size="icon"
                onClick={() => setIsChatOpen(!isChatOpen)}
                className={isChatOpen ? 'bg-purple-100' : ''}
              >
                <MessageCircle className="h-5 w-5" />
              </Button>
            </div>

            <div className="flex-1 overflow-y-auto">
              <div className="w-full">
                <div className="p-6">
                  <ProjectDetails
                    selectedProject={selectedProject}
                    PROJECT_STATUSES={PROJECT_STATUSES}
                    tempStatus={tempStatus}
                    setTempStatus={setTempStatus}
                    handleUpdateStatus={handleUpdateStatus}
                    projectImages={projectImages}
                    tempFigmaUrl={tempFigmaUrl}
                    tempStagingUrl={tempStagingUrl}
                    setTempFigmaUrl={setTempFigmaUrl}
                    setTempStagingUrl={setTempStagingUrl}
                    handleUpdateUrls={handleUpdateUrls}
                  />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            Sélectionnez un projet pour voir les détails
          </div>
        )}

        {/* Section chat - Ajout des animations */}
        <div className={`fixed right-0 top-[2rem] h-[calc(100vh-4rem)] w-1/3 border-l border-gray-200 bg-white z-50
          transform transition-all duration-300 ease-in-out rounded-3xl
          ${isChatOpen ? 'translate-x-[-2rem] opacity-100' : 'translate-x-full opacity-0'}
        `}>
          <div className="p-4 border-b border-gray-200 flex justify-between items-center rounded-3xl">
            <h2 className="font-semibold">Chat du projet</h2>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setIsChatOpen(false)}
              className="hover:bg-gray-100 rounded-full"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          <div className="h-[calc(100%-60px)] rounded-3xl">
            <ChatSection
              messages={messages}
              newMessage={newMessage}
              user={user as User | null}
              setNewMessage={setNewMessage}
              sendMessage={sendMessage}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProjectsPage;
