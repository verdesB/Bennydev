"use client";

import { useProjectImages } from "@/app/(admin)/admin/projets/hooks/useProjectImages";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, Upload, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Image from 'next/image';

interface FilesSharingViewProps {
  projectId: string;
}

// Définir une interface pour le type d'image
interface ProjectImage {
  id: string;
  title: string;
  description?: string;
  image_url: string;
  size: number;
}

export function FilesSharingView({ projectId }: FilesSharingViewProps) {
  const { images, loading } = useProjectImages(projectId);
  const [selectedImage, setSelectedImage] = useState<ProjectImage | null>(null);

  return (
    <div className="flex min-h-[calc(100vh-4rem)] bg-gradient-to-b from-gray-50 to-white overflow-hidden rounded-2xl shadow-lg">
      {/* Menu latéral gauche */}
      <div className="w-64 bg-white shadow-md rounded-r-xl p-4">
        <ul className="space-y-2">
          <li>
            <Link 
              href={`/admin/projets`}
              className="text-xs text-gray-500 hover:text-gray-900 inline-flex items-center transition-colors duration-200"
            >
              <ChevronLeft className="w-3 h-3 mr-1" />
              Retour aux projets
            </Link>
          </li>
          <li>
            <h1 className="text-lg font-medium text-gray-900 tracking-tight">Fichiers partagés</h1>
          </li>
        </ul>
      </div>

      {/* Container principal avec position relative */}
      <div className="flex-1 p-4 md:p-6 relative">
        {/* Grille de fichiers */}
        <div className="max-w-none">
          {loading ? (
            <div className="flex flex-wrap gap-4">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="w-24 space-y-2">
                  <Card className="aspect-square animate-pulse bg-gray-200" />
                  <div className="h-3 w-20 mx-auto animate-pulse bg-gray-200 rounded" />
                </div>
              ))}
            </div>
          ) : images.length === 0 ? (
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-12 text-center">
              <div className="w-20 h-20 mx-auto bg-gray-50 rounded-2xl flex items-center justify-center">
                <Upload className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">Aucun fichier</h3>
              <p className="mt-2 text-gray-500">Commencez par ajouter un fichier au projet.</p>
            </div>
          ) : (
            <motion.div 
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {images.map((image) => (
                <motion.div
                  key={image.id}
                  whileHover={{ scale: 1.02 }}
                  className="w-24 cursor-pointer space-y-2"
                  onClick={() => setSelectedImage(image as unknown as ProjectImage)}
                >
                  <Card className="aspect-square relative group bg-white shadow-sm border border-gray-100 overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 rounded-lg">
                    <div className="aspect-square relative overflow-hidden bg-gray-50">
                      <Image
                        src={image.image_url}
                        alt={image.title}
                        className="object-cover"
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-200 flex items-center justify-center">
                        <span className="text-white text-xs">Voir</span>
                      </div>
                    </div>
                  </Card>
                  <div className="text-center">
                    <p className="text-xs font-medium text-gray-900 truncate">
                      {image.title || 'Sans titre'}
                    </p>
                    
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>

        {/* Panel latéral personnalisé */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute top-4 right-4 bottom-4 w-[400px] sm:w-[540px] bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden"
            >
              <div className="h-full flex flex-col">
                {/* En-tête */}
                <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                  <h3 className="font-medium">Détails du fichier</h3>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setSelectedImage(null)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                {/* Contenu défilable */}
                <div className="flex-1 overflow-y-auto p-4">
                  <div className="space-y-6">
                    <div className="aspect-square w-full overflow-hidden rounded-lg">
                      <Image
                        src={selectedImage.image_url}
                        alt={selectedImage.title}
                        className="object-cover"
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>

                    <div className="space-y-4">
                      <div>
                        <Label>Titre</Label>
                        <Input defaultValue={selectedImage.title} />
                      </div>
                      <div>
                        <Label>Description</Label>
                        <Input defaultValue={selectedImage.description} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Pied de page avec actions */}
                <div className="p-4 border-t border-gray-100 bg-gray-50">
                  <div className="flex justify-end gap-2">
                    <Button variant="outline">Supprimer</Button>
                    <Button>Sauvegarder</Button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
} 