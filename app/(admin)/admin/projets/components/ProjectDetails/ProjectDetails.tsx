import { Project, ProjectImage, ProjectStatus } from '../../types/project.types';
import { ProjectHeader } from './ProjectHeader';
import { BasicInfo } from './BasicInfo';
import { StatusSection } from './StatusSection';
import { ImagesSection } from './ImagesSection';
import { UrlsSection } from './UrlsSection';
import { SparklesCore } from '@/app/components/ui/sparkles';

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
    <div className="h-full p-6 overflow-auto">
      <ProjectHeader 
        name={selectedProject.name}
        status={selectedProject.status}
        PROJECT_STATUSES={PROJECT_STATUSES}
      />

      <div className="grid grid-cols-4 gap-4 mt-6 ">
        {/* Basic Info Card - Span 2 columns */}
        <div className="col-span-2 bg-card rounded-2xl border shadow-sm p-4 relative h-full">
          {/* SparklesCore en arrière-plan */}
          <div className="absolute inset-0 rounded-2xl overflow-hidden">
            <div className="w-full h-full">
              <SparklesCore 
                className="w-full h-full absolute inset-0 w-full h-full rounded-2xl  "
              
                background="rgba(244,242,255,0.015)"
                particleColor="#8b5cf6"
                particleDensity={100}
                speed={2}
                minSize={0.6}
                maxSize={1.4}
              />
            </div>
          </div>
          <div className="relative z-10">
          <BasicInfo project={selectedProject} />
          </div>
        </div>

        {/* Status Card */}
        <div className="col-span-2 bg-card rounded-2xl border shadow-sm p-4 relative h-full">
          {/* SparklesCore en arrière-plan */}
          <div className="absolute inset-0 rounded-2xl overflow-hidden">
            <div className="w-full h-full">
              <SparklesCore 
                className="w-full h-full absolute inset-0 w-full h-full rounded-2xl  "
              
                background="rgba(244,242,255,0.015)"
                particleColor="#8b5cf6"
                particleDensity={100}
                speed={2}
                minSize={0.6}
                maxSize={1.4}
              />
            </div>
          </div>
          
          {/* StatusSection au premier plan */}
          <div className="relative z-10 h-full">
            <StatusSection
              selectedProject={selectedProject}
              tempStatus={tempStatus}
              setTempStatus={setTempStatus}
              handleUpdateStatus={handleUpdateStatus}
              PROJECT_STATUSES={PROJECT_STATUSES}
            />
          </div>
        </div>

        {/* URLs Card - Span full width */}
        <div className="col-span-2 bg-card rounded-2xl border shadow-sm p-4 relative h-full">
          {/* SparklesCore en arrière-plan */}
          <div className="absolute inset-0 rounded-2xl overflow-hidden">
            <div className="w-full h-full">
              <SparklesCore 
                className="w-full h-full absolute inset-0 w-full h-full rounded-2xl  "
              
                background="rgba(244,242,255,0.015)"
                particleColor="#8b5cf6"
                particleDensity={100}
                speed={2}
                minSize={0.6}
                maxSize={1.4}
              />
            </div>
          </div>
          
          {/* StatusSection au premier plan */}
          <div className="relative z-10">
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

        {/* Images Section - Span full width */}
        <div className="col-span-2 bg-card rounded-2xl border shadow-sm p-4 relative h-full">
          {/* SparklesCore en arrière-plan */}
          <div className="absolute inset-0 rounded-2xl overflow-hidden">
            <div className="w-full h-full">
              <SparklesCore 
                className="w-full h-full absolute inset-0 w-full h-full rounded-2xl  "
              
                background="rgba(244,242,255,0.015)"
                particleColor="#8b5cf6"
                particleDensity={100}
                speed={2}
                minSize={0.6}
                maxSize={1.4}
              />
            </div>
          </div>
          
          {/* StatusSection au premier plan */}
          <div className="relative z-10 h-full">
          <ImagesSection projectImages={projectImages} />
        </div>
        </div>

       
      </div>
    </div>
  );
}; 