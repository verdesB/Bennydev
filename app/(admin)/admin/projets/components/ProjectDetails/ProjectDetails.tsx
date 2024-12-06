import { Project, ProjectImage, ProjectStatus } from '../../types/project.types';
import { ProjectHeader } from './ProjectHeader';
import { BasicInfo } from './BasicInfo';
import { StatusSection } from './StatusSection';
import { ImagesSection } from './ImagesSection';
import { UrlsSection } from './UrlsSection';



import Link from 'next/link';
import { KanbanIcon, CreditCard as PaymentIcon, ArrowUpRight } from 'lucide-react';

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
    <div className="h-full p-6 overflow-auto">
      <div className="w-full rounded-3xl bg-gradient-to-b from-white to-gray-50/50 border shadow-lg p-8">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-5 space-y-6">
            <ProjectHeader 
              name={selectedProject.name}
              status={selectedProject.status}
              PROJECT_STATUSES={PROJECT_STATUSES}
            />

            <div className="bg-white/70 backdrop-blur-sm rounded-2xl border shadow-sm p-6 relative">
              <div className="relative z-10">
                <BasicInfo project={selectedProject} />
              </div>
            </div>
          </div>

          <div className="col-span-7 space-y-6">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl border shadow-sm p-6 relative">
              <div className="relative z-10">
                <StatusSection
                  selectedProject={selectedProject}
                  tempStatus={tempStatus}
                  setTempStatus={setTempStatus}
                  handleUpdateStatus={handleUpdateStatus}
                  PROJECT_STATUSES={PROJECT_STATUSES}
                />
              </div>
            </div>

            <div className="bg-white/70 backdrop-blur-sm rounded-2xl border shadow-sm p-6 relative">
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

            <div className="bg-white/70 backdrop-blur-sm rounded-2xl border shadow-sm p-6 relative">
              <div className="relative z-10">
                <ImagesSection projectId={selectedProject.id} />
              </div>
            </div>

            <div className="bg-white/70 backdrop-blur-sm rounded-2xl border shadow-sm p-6 relative">
              <div className="grid grid-cols-2 gap-4">
                <Link href={`/admin/projets/kanban/${selectedProject.id}`}>
                  <div className="group bg-white rounded-xl p-4 border hover:border-primary/20 transition-all duration-200 hover:shadow-lg">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-primary/10 rounded-full">
                        <KanbanIcon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">Voir Kanban</h3>
                        <p className="text-sm text-muted-foreground">Gérer les tâches du projet</p>
                      </div>
                      <ArrowUpRight className="w-5 h-5 text-primary ml-auto opacity-0 group-hover:opacity-100 transition-all" />
                    </div>
                  </div>
                </Link>

                <Link href={`/admin/projets/${selectedProject.id}/paiements`}>
                  <div className="group bg-white rounded-xl p-4 border hover:border-primary/20 transition-all duration-200 hover:shadow-lg">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-primary/10 rounded-full">
                        <PaymentIcon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">Voir Paiements</h3>
                        <p className="text-sm text-muted-foreground">Gérer les transactions</p>
                      </div>
                      <ArrowUpRight className="w-5 h-5 text-primary ml-auto opacity-0 group-hover:opacity-100 transition-all" />
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 