'use client'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageCircle } from "lucide-react";
import { useProjectsLogic,  } from './hooks/useProjectsLogic';
import { ProjectDetails } from './components/ProjectDetails/ProjectDetails';
import { ChatSection } from './components/ChatSection';

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

  return (
    <div className="max-h-screen flex flex-col overflow-hidden">
      {/* Header - hauteur fixe */}
      <div className="flex items-center justify-between px-6 py-4 h-16">
        <h1 className="text-3xl font-bold">Gestion des Projets</h1>
        <div className="flex items-center gap-4">
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
          
          {selectedProject && (
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <MessageCircle className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent className="w-[400px] sm:w-[600px] lg:w-[70px] xl:w-[800px] bg-[rgba(147,51,234,0.1)] backdrop-blur-md">
                <SheetHeader>
                  <SheetTitle>Chat du projet</SheetTitle>
                </SheetHeader>
                <ChatSection
                  messages={messages}
                  newMessage={newMessage}
                  user={user}
                  setNewMessage={setNewMessage}
                  sendMessage={sendMessage}
                />
              </SheetContent>
            </Sheet>
          )}
        </div>
      </div>

      {/* Contenu principal - prend le reste de l'espace */}
      {selectedProject ? (
        <div className="h-[calc(100vh-9rem)] ">
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
      ) : (
        <div className="h-full flex items-center justify-center text-gray-500">
          Sélectionnez un projet pour voir les détails
        </div>
      )}
    </div>
  );
};

export default ProjectsPage;
