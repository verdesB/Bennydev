import { useState, useEffect } from 'react';

interface ProjectImage {
  id: number;
  project_id: string;
  image_url: string;
  title: string;
  description: string | null;
  type: string | null;
  created_at: string;
  updated_at: string;
}

export const useProjectImages = (projectId: string) => {
  const [images, setImages] = useState<ProjectImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        console.log('Fetching images for project:', projectId);
        const response = await fetch(`/api/files/${projectId}`);
        
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des images');
        }
        
        const data = await response.json();
        console.log('Images récupérées:', data);
        setImages(data);
      } catch (error) {
        console.error('Erreur:', error);
        setError(error instanceof Error ? error.message : 'Erreur inconnue');
      } finally {
        setLoading(false);
      }
    };

    if (projectId) {
      fetchImages();
    }
  }, [projectId]);

  return { images, loading, error };
}; 