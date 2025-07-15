import React, { useState } from 'react';
import { Play, Heart, Gift, Star, Users } from 'lucide-react';

interface VideoData {
  id: string;
  name: string;
  message: string;
  videoUrl: string;
  icon: React.ElementType;
  color: string;
}

// Couleurs et icônes pour chaque vidéo
const videoStyles = [
  { icon: Heart, color: 'bg-pink-500' },
  { icon: Star, color: 'bg-yellow-500' },
  { icon: Users, color: 'bg-blue-500' },
  { icon: Gift, color: 'bg-purple-500' },
  { icon: Play, color: 'bg-green-500' },
  { icon: Heart, color: 'bg-red-500' },
  { icon: Star, color: 'bg-indigo-500' },
  { icon: Gift, color: 'bg-orange-500' }
];

// Vos données vidéos
export const videos = [
  {
    id: "1",
    name: "1",
    message: "Joyeux anniversaire ! ❤️",
    videoUrl: "/videos/1.mp4",
  },
  {
    id: "2",
    name: "2",
    message: "Gros bisous 🎉",
    videoUrl: "/videos/2.mp4",
  },
  {
    id: "3",
    name: "3",
    message: "Gros bisous 🎉",
    videoUrl: "/videos/3.mp4",
  },
  {
    id: "4",
    name: "4",
    message: "Gros bisous 🎉",
    videoUrl: "/videos/4.mp4",
  },
  {
    id: "5",
    name: "5",
    message: "Gros bisous 🎉",
    videoUrl: "/videos/5.mp4",
  },
  {
    id: "6",
    name: "6",
    message: "Gros bisous 🎉",
    videoUrl: "/videos/6.mp4",
  },
  {
    id: "7",
    name: "7",
    message: "Gros bisous 🎉",
    videoUrl: "/videos/7.mp4",
  },
  {
    id: "8",
    name: "8",
    message: "Gros bisous 🎉",
    videoUrl: "/videos/8.mp4",
  },
];

// Fusion des données avec les styles
const videoData: VideoData[] = videos.map((video, index) => ({
  ...video,
  ...videoStyles[index]
}));

const VideoTreeInterface: React.FC = () => {
  const [selectedVideo, setSelectedVideo] = useState<VideoData | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleVideoSelect = (video: VideoData) => {
    setSelectedVideo(video);
    setIsPlaying(true);
  };

  const closeVideo = () => {
    setSelectedVideo(null);
    setIsPlaying(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-blue-100 p-8">
      {/* En-tête */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-gray-800 mb-4">
          Joyeux Anniversaire ! 🎉
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Des messages pleins d&apos;amour pour ton jour spécial
        </p>
      </div>

      {/* Arbre de vidéos */}
      <div className="max-w-6xl mx-auto">
        <div className="relative">
          {/* Tronc central */}
          <div className="absolute left-1/2 top-0 w-2 h-full bg-gradient-to-b from-amber-700 to-amber-900 transform -translate-x-1/2 rounded-full shadow-lg"></div>
          
          {/* Branches et vidéos */}
          <div className="space-y-24">
            {videoData.map((video, index) => {
              const isEven = index % 2 === 0;
              const IconComponent = video.icon;
              
              return (
                <div key={video.id} className="relative">
                  {/* Branche */}
                  <div className={`absolute top-8 w-32 h-1 bg-gradient-to-r from-amber-600 to-green-600 rounded-full ${
                    isEven ? 'left-1/2 ml-1' : 'right-1/2 mr-1'
                  }`}></div>
                  
                  {/* Carte vidéo */}
                  <div className={`flex ${isEven ? 'justify-start pl-40' : 'justify-end pr-40'}`}>
                    <div 
                      className={`group cursor-pointer transform transition-all duration-300 hover:scale-105 ${
                        isEven ? 'hover:translate-x-2' : 'hover:-translate-x-2'
                      }`}
                      onClick={() => handleVideoSelect(video)}
                    >
                      <div className="bg-white rounded-2xl shadow-xl p-6 max-w-sm hover:shadow-2xl transition-shadow duration-300">
                        <div className="flex items-center mb-4">
                          <div className={`p-3 rounded-full ${video.color} mr-4`}>
                            <IconComponent className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h3 className="font-bold text-gray-800 text-lg">{video.message}</h3>
                            <p className="text-gray-600 text-sm">{video.name}</p>
                          </div>
                        </div>
                        
                        {/* Aperçu vidéo */}
                        <div className="relative bg-gray-200 rounded-lg h-32 mb-4 overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
                            <Play className="w-12 h-12 text-white opacity-70 group-hover:opacity-100 transition-opacity" />
                          </div>
                          <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                            Vidéo
                          </div>
                        </div>
                        
                        {video.message && (
                          <p className="text-gray-700 italic text-sm border-l-4 border-pink-300 pl-3">
                            {video.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Modal vidéo */}
      {selectedVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center">
                  <div className={`p-2 rounded-full ${selectedVideo.color} mr-3`}>
                    <selectedVideo.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">{selectedVideo.title}</h2>
                    <p className="text-gray-600">Par {selectedVideo.author}</p>
                  </div>
                </div>
                <button
                  onClick={closeVideo}
                  className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
                >
                  ×
                </button>
              </div>
              
              {/* Player vidéo */}
              <div className="relative bg-gray-900 rounded-lg overflow-hidden mb-4">
                <video
                  className="w-full h-auto max-h-96"
                  controls
                  autoPlay
                  src={selectedVideo.videoUrl}
                >
                  Votre navigateur ne supporte pas la lecture vidéo.
                </video>
              </div>
              
              {selectedVideo.message && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-700 italic text-center">
                    {selectedVideo.message}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoTreeInterface;