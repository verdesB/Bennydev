'use client';

import { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import Image from 'next/image';

interface GalleryImage {
  image: string;
  caption: string;
}

interface ProjectGalleryProps {
  images: GalleryImage[];
}

export default function ProjectGallery({ images }: ProjectGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  return (
    <section className="py-20 relative z-20">
      <h2 className="text-3xl font-semibold mb-12">Galerie du Projet</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {images?.map((image, index) => (
          <div
            key={index}
            onClick={() => setSelectedImage(image)}
            className="group relative aspect-square rounded-lg overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 border-2 border-purple-200"
          >
            <img
              src={image.image}
              alt={image.caption}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
              <p className="text-white text-sm font-medium">{image.caption}</p>
            </div>
          </div>
        ))}
      </div>

      <Dialog.Root
        open={selectedImage !== null}
        onOpenChange={(open) => !open && setSelectedImage(null)}
      >
        {selectedImage && (
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 bg-black/90 backdrop-blur-sm animate-fade-in z-50" />
            <Dialog.Content className="fixed inset-0 flex items-center justify-center p-4 z-50">
              <Dialog.Title className="sr-only">
                {selectedImage.caption || "Image du projet"}
              </Dialog.Title>
              <div className="relative max-w-6xl w-full bg-white/10 rounded-xl p-2 animate-scale-up">
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute -top-10 right-0 text-white hover:text-gray-300 text-xl p-2"
                  aria-label="Fermer"
                >
                  ✕
                </button>
                <Image
                  src={selectedImage?.image}
                  alt={selectedImage?.caption}
                  width={1920}
                  height={1080}
                  className="w-full h-auto rounded-lg object-contain max-h-[80vh]"
                  priority
                  quality={90}
                />
                {selectedImage?.caption && (
                  <p className="text-white text-center mt-4 text-lg">{selectedImage.caption}</p>
                )}
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </Dialog.Root>
    </section>
  );
}