import { Project, ProjectImage, ProjectStatus } from '../../types/project.types';
import { ProjectHeader } from './ProjectHeader';
import { BasicInfo } from './BasicInfo';
import { StatusSection } from './StatusSection';
import { ImagesSection } from './ImagesSection';
import { UrlsSection } from './UrlsSection';



import Link from 'next/link';
import { KanbanIcon, CreditCard as PaymentIcon, ArrowUpRight, FileIcon } from 'lucide-react';

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

  tempFigmaUrl,
  tempStagingUrl,
  setTempFigmaUrl,
  setTempStagingUrl,
  handleUpdateUrls
}: ProjectDetailsProps) => {
  return (
    <div className="min-h-screen ">
      <div className="max-w-8xl mx-auto">
        <ProjectHeader 
          name={selectedProject.name}
          status={selectedProject.status}
          PROJECT_STATUSES={PROJECT_STATUSES}
        />

        <div className="grid grid-cols-12 gap-6 mt-8">
          <div className="col-span-7">
            <div className="space-y-6">
              <div className="bg-white/90 backdrop-blur-xl rounded-3xl border border-purple-600/10 shadow-sm p-6">
                <BasicInfo project={selectedProject} />
              </div>

              <div className="flex justify-between space-x-2 h-24">
                <Link className="block w-1/3" href={`/admin/projets/kanban/${selectedProject.id}`}>
                  <div className="group bg-white rounded-2xl border border-primary/10 p-2 hover:shadow-lg transition-all duration-300 h-full">
                    <div className="flex space-x-3 flex-col gap-2">
                      <div className="flex justify-between space-x-3">
                        <KanbanIcon className="w-5 h-5 text-primary" />
                        <ArrowUpRight className="w-4 h-4 text-primary ml-auto" />
                      </div>
                      <span className="font-medium">Kanban</span>
                    </div>
                  </div>
                </Link>

                <Link className="block w-1/3" href={`/admin/projets/${selectedProject.id}/paiements`}>
                  <div className="group bg-white rounded-2xl border border-primary/10 p-2 hover:shadow-lg transition-all duration-300 h-full">
                    <div className="flex space-x-3 flex-col gap-2">
                      <div className="flex justify-between space-x-3">
                        <PaymentIcon className="w-5 h-5 text-primary" />
                        <ArrowUpRight className="w-4 h-4 text-primary ml-auto" />
                      </div>
                      <span className="font-medium">Paiements</span>
                    </div>
                  </div>
                </Link>

                <Link className="block w-1/3" href={`/admin/projets/${selectedProject.id}/cahier-des-charges`}>
                  <div className="group bg-white rounded-2xl border border-primary/10 p-2 hover:shadow-lg transition-all duration-300 h-full">
                    <div className="flex space-x-3 flex-col gap-2">
                      <div className="flex justify-between space-x-3">
                        <FileIcon className="w-5 h-5 text-primary" />
                        <ArrowUpRight className="w-4 h-4 text-primary ml-auto" />
                      </div>
                      <span className="font-medium">Cahier des charges</span>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>

          <div className="col-span-5 space-y-6">
            <div className="bg-white/90 backdrop-blur-xl rounded-3xl border border-primary/10 shadow-lg p-6">
             
                <StatusSection
                selectedProject={selectedProject}
                tempStatus={tempStatus}
                setTempStatus={setTempStatus}
                handleUpdateStatus={handleUpdateStatus}
                PROJECT_STATUSES={PROJECT_STATUSES}
              />
            </div>

            <div className="bg-white/90 backdrop-blur-xl rounded-3xl border border-primary/10 shadow-lg p-6">
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

        <div className="mt-6">
          <ImagesSection projectId={selectedProject.id} />
        </div>
      </div>
    </div>
  );
}; 