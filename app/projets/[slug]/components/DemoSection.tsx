'use client'
import React, { useState } from 'react';

interface Video {
  title: string;
  url: string;
}

interface DemoSectionProps {
  videos: Video[];
}

export default function DemoSection({ videos }: DemoSectionProps) {
  const [selectedVideo, setSelectedVideo] = useState<string>(videos[0]?.url);

  return (
    <section className="py-20 relative z-20">
      <h2 className="text-3xl font-semibold mb-12">Voir en Action</h2>
      
      {/* Sélecteur de vidéos */}
      <div className="flex gap-4 mb-8 overflow-x-auto pb-4">
        {videos.map((video, index) => (
          <button
            key={index}
            onClick={() => setSelectedVideo(video.url)}
            className={`px-4 py-2 rounded-full whitespace-nowrap ${
              selectedVideo === video.url
                ? 'bg-black text-white'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            {video.title}
          </button>
        ))}
      </div>

      {/* Lecteur vidéo */}
      <div className="relative aspect-video rounded-2xl overflow-hidden bg-gray-100">
        <iframe
          className="absolute inset-0 w-full h-full"
          src={selectedVideo}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </section>
  );
} 