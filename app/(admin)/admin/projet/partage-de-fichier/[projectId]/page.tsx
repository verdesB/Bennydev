import { FilesSharingView } from "./components/FilesSharingView";

interface PageProps {
  params: {
    projectId: string;
  };
}

export default function FileSharingPage({ params }: PageProps) {
  return <FilesSharingView projectId={params.projectId} />;
} 