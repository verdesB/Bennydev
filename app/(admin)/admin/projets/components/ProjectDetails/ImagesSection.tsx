import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { PencilIcon, TrashIcon, Upload } from "lucide-react";
import Link from "next/link";
import { useProjectImages } from "../../hooks/useProjectImages";
import { Skeleton } from "@/components/ui/skeleton";

interface ImagesSectionProps {
  projectId: string;  // uuid
}

export const ImagesSection = ({ projectId }: ImagesSectionProps) => {
  const { images, loading, error } = useProjectImages(projectId);

  return (
    <Card className="border-t pt-6 bg-white p-4 shadow-[0_4px_20px_-1px_rgba(147,51,234,0.2)] hover:shadow-[0_4px_20px_-1px_rgba(147,51,234,0.3)] transition-shadow h-full flex flex-col flex-1">
      <div className="flex-1 flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <Label className="text-sm text-gray-500">
            Fichiers du projet
          </Label>
          <Link href={`/admin/projet/partage-de-fichier/${projectId}`}>
            <Button variant="outline" size="sm" className="text-xs gap-2">
              <Upload className="h-3 w-3" />
              Accéder à l'espace fichiers
            </Button>
          </Link>
        </div>
        
        {loading ? (
          // État de chargement
          <div className="flex-1 grid grid-cols-8 gap-2">
            {[...Array(8)].map((_, index) => (
              <Skeleton key={index} className="aspect-square w-full" />
            ))}
          </div>
        ) : error ? (
          // État d'erreur
          <div className="flex-1 flex items-center justify-center text-red-500">
            {error}
          </div>
        ) : images.length === 0 ? (
          // État vide
          <div className="flex-1 flex items-center justify-center text-gray-500">
            Aucune image disponible
          </div>
        ) : (
          // Affichage des images
          <div className="flex-1 grid grid-cols-8 gap-2 overflow-y-auto">
            {images.map((image) => (
              <Card key={image.id} className="overflow-hidden aspect-square relative group">
                <img
                  src={image.image_url}
                  alt={image.title || 'Image du projet'}
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 text-white hover:text-white hover:bg-white/20"
                    onClick={() => {
                      // Logique pour éditer
                      console.log('Éditer image:', image.id);
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
                      console.log('Supprimer image:', image.id);
                    }}
                  >
                    <TrashIcon className="h-3 w-3" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
}; 