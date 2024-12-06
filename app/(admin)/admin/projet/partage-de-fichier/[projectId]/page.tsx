import { FilesSharingView } from "./components/FilesSharingView";



export default async function FileSharingPage({ params }: { params: Promise<{ projectId: string }> }) {
  const resolvedParams = await params;
  return <FilesSharingView projectId={resolvedParams.projectId} />;
} 