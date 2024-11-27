'use client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from "@/components/ui/label";
import { PencilIcon, TrashIcon, ChevronUpIcon, ChevronDownIcon } from "lucide-react";
import { useProjectsLogic, PROJECT_STATUSES } from './hooks/useProjectsLogic';
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
    handleUpdateUrls
  } = useProjectsLogic();

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
            <ChatSection
              messages={messages}
              newMessage={newMessage}
              user={user}
              setNewMessage={setNewMessage}
              sendMessage={sendMessage}
            />
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
