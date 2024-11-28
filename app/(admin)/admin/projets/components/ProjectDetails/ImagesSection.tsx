import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { PencilIcon, TrashIcon, ChevronUpIcon, ChevronDownIcon, Upload } from "lucide-react";
import Link from "next/link";

interface ProjectImage {
  id: number;
  url: string;
  caption: string;
  location: string;
  order: number;
}

interface ImagesSectionProps {
  projectImages: ProjectImage[];
}

export const ImagesSection = ({ projectImages }: ImagesSectionProps) => (
  <Card className="border-t pt-6 bg-white p-4 shadow-[0_4px_20px_-1px_rgba(147,51,234,0.2)] hover:shadow-[0_4px_20px_-1px_rgba(147,51,234,0.3)] transition-shadow h-full flex flex-col flex-1">
    <div className="flex-1 flex flex-col space-y-4">
      <div className="flex items-center justify-between">
        <Label className="text-sm text-gray-500">
          Images du projet
        </Label>
        <Link href="/admin/files-sharing">
          <Button variant="outline" size="sm" className="text-xs gap-2">
            <Upload className="h-3 w-3" />
            Espace fichiers
          </Button>
        </Link>
      </div>
      
      <div className="flex-1 grid grid-cols-8 gap-2 overflow-y-auto">
        {projectImages.map((image) => (
          <Card key={image.id} className="overflow-hidden aspect-square relative group">
            <img
              src={image.url}
              alt={image.caption}
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 text-white hover:text-white hover:bg-white/20"
                onClick={() => {
                  // Logique pour éditer
                }}
              >
                <PencilIcon className="h-3 w-3" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 text-white hover:text-white hover:bg-white/20"
                onClick={() => {
                  // Logique pour supprimer
                }}
              >
                <TrashIcon className="h-3 w-3" />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  </Card>
); 