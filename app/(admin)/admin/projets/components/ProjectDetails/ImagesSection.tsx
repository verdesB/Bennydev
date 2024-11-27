import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { PencilIcon, TrashIcon, ChevronUpIcon, ChevronDownIcon } from "lucide-react";

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
  <div className="border-t pt-6">
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label className="text-sm text-gray-500">
          Images du projet
        </Label>
        <Button variant="outline" size="sm" className="text-xs">
          Ajouter une image
        </Button>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        {projectImages.map((image) => (
          <Card key={image.id} className="overflow-hidden">
            <div className="aspect-square relative group">
              <img
                src={image.url}
                alt={image.caption}
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:text-white hover:bg-white/20"
                  onClick={() => {
                    // Logique pour éditer
                  }}
                >
                  <PencilIcon className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:text-white hover:bg-white/20"
                  onClick={() => {
                    // Logique pour supprimer
                  }}
                >
                  <TrashIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="p-3 space-y-1">
              <p className="font-medium text-sm truncate">
                {image.caption}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">
                  Emplacement: {image.location}
                </span>
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    disabled={image.order === 1}
                    onClick={() => {
                      // Logique pour monter l'ordre
                    }}
                  >
                    <ChevronUpIcon className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    disabled={image.order === projectImages.length}
                    onClick={() => {
                      // Logique pour descendre l'ordre
                    }}
                  >
                    <ChevronDownIcon className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  </div>
); 