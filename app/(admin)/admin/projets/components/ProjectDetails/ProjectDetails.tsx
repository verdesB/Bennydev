import { Project, ProjectImage, ProjectStatus } from '../../types/project.types';
import { ProjectHeader } from './ProjectHeader';
import { BasicInfo } from './BasicInfo';
import { StatusSection } from './StatusSection';
import { ImagesSection } from './ImagesSection';
import { UrlsSection } from './UrlsSection';

interface ProjectDetailsProps {
  selectedProject: Project;
  PROJECT_STATUSES: ProjectStatus[];
  tempStatus: string;
  setTempStatus: (status: string) => void;
  handleUpdateStatus: () => void;
  projectImages: ProjectImage[];
  tempFigmaUrl: string;
  tempStagingUrl: string;
  setTempFigmaUrl: (url: string) => void;
  setTempStagingUrl: (url: string) => void;
  handleUpdateUrls: () => void;
}

export const ProjectDetails = ({
  selectedProject,
  PROJECT_STATUSES,
  tempStatus,
  setTempStatus,
  handleUpdateStatus,
  projectImages,
  tempFigmaUrl,
  tempStagingUrl,
  setTempFigmaUrl,
  setTempStagingUrl,
  handleUpdateUrls
}: ProjectDetailsProps) => {
  return (
    <div className="overflow-y-scroll border-r h-full">
      <div className="p-6">
        <ProjectHeader 
          name={selectedProject.name}
          status={selectedProject.status}
          PROJECT_STATUSES={PROJECT_STATUSES}
        />

        <div className="space-y-6">
          <BasicInfo project={selectedProject} />
          
          <StatusSection
            selectedProject={selectedProject}
            tempStatus={tempStatus}
            setTempStatus={setTempStatus}
            handleUpdateStatus={handleUpdateStatus}
            PROJECT_STATUSES={PROJECT_STATUSES}
          />
          
          <ImagesSection projectImages={projectImages} />
          
          <UrlsSection
            selectedProject={selectedProject}
            tempFigmaUrl={tempFigmaUrl}
            tempStagingUrl={tempStagingUrl}
            setTempFigmaUrl={setTempFigmaUrl}
            setTempStagingUrl={setTempStagingUrl}
            handleUpdateUrls={handleUpdateUrls}
          />
        </div>
      </div>
    </div>
  );
}; 