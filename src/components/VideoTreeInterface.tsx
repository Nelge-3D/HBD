import React, { useState, useEffect } from 'react';
import { Play, Heart, Gift, Star, Users, Sparkles, Cake, PartyPopper, Music } from 'lucide-react';

interface VideoData {
  id: string;
  name: string;
  message: string;
  videoUrl: string;
  icon: React.ElementType;
  color: string;
  bgGradient: string;
}

// Couleurs et icônes festives pour chaque vidéo
const videoStyles = [
  { icon: Heart, color: 'bg-pink-500', bgGradient: 'from-pink-400 to-pink-600' },
  { icon: Star, color: 'bg-yellow-500', bgGradient: 'from-yellow-400 to-orange-500' },
  { icon: Users, color: 'bg-blue-500', bgGradient: 'from-blue-400 to-blue-600' },
  { icon: Gift, color: 'bg-purple-500', bgGradient: 'from-purple-400 to-purple-600' },
  { icon: Cake, color: 'bg-green-500', bgGradient: 'from-green-400 to-green-600' },
  { icon: PartyPopper, color: 'bg-red-500', bgGradient: 'from-red-400 to-red-600' },
  { icon: Sparkles, color: 'bg-indigo-500', bgGradient: 'from-indigo-400 to-indigo-600' },
  { icon: Music, color: 'bg-orange-500', bgGradient: 'from-orange-400 to-orange-600' },
  { icon: Heart, color: 'bg-pink-600', bgGradient: 'from-pink-500 to-rose-600' },
  { icon: Star, color: 'bg-yellow-600', bgGradient: 'from-yellow-500 to-amber-600' }
];

// Données vidéos pour Orly
export const videos = [
  {
    id: "1",
    name: "Personne 1",
    message: "Joyeux anniversaire Orly ! ❤️",
    videoUrl: "/videos/1.mp4",
  },
  {
    id: "2",
    name: "Personne 2",
    message: "Gros bisous pour ton jour spécial 🎉",
    videoUrl: "/videos/2.mp4",
  },
  {
    id: "3",
    name: "Personne 3",
    message: "On t'aime beaucoup Orly !",
    videoUrl: "/videos/3.mp4",
  },
  {
    id: "4",
    name: "Personne 4",
    message: "Passe une super journée ma chérie",
    videoUrl: "/videos/4.mp4",
  },
  {
    id: "5",
    name: "Personne 5",
    message: "Meilleurs vœux pour cette nouvelle année !",
    videoUrl: "/videos/5.mp4",
  },
  {
    id: "6",
    name: "Personne 6",
    message: "Que du bonheur pour Orly !",
    videoUrl: "/videos/6.mp4",
  },
  {
    id: "7",
    name: "Personne 7",
    message: "Tous nos souhaits les plus tendres",
    videoUrl: "/videos/7.mp4",
  },
  {
    id: "8",
    name: "Personne 8",
    message: "Bonne fête ma belle Orly !",
    videoUrl: "/videos/8.mp4",
  },
  {
    id: "9",
    name: "Personne 9",
    message: "Plein de bonnes choses t'attendent",
    videoUrl: "/videos/9.mp4",
  },
  {
    id: "10",
    name: "Personne 10",
    message: "À toi de briller maintenant Orly !",
    videoUrl: "/videos/10.mp4",
  },
];

// Fusion des données avec les styles
const videoData: VideoData[] = videos.map((video, index) => ({
  ...video,
  ...videoStyles[index % videoStyles.length]
}));

// Composant d'étoiles flottantes
const FloatingStars: React.FC = () => {
  const [stars, setStars] = useState<Array<{id: number, x: number, y: number, size: number, delay: number}>>([]);

  useEffect(() => {
    const newStars = Array.from({length: 20}, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 8 + 4,
      delay: Math.random() * 3
    }));
    setStars(newStars);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {stars.map(star => (
        <div
          key={star.id}
          className="absolute animate-pulse"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            animationDelay: `${star.delay}s`,
            fontSize: `${star.size}px`
          }}
        >
          ✨
        </div>
      ))}
    </div>
  );
};

const VideoTreeInterface: React.FC = () => {
  const [selectedVideo, setSelectedVideo] = useState<VideoData | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [animatedCards, setAnimatedCards] = useState<Set<string>>(new Set());

  useEffect(() => {
    // Animation séquentielle des cartes
    videoData.forEach((video, index) => {
      setTimeout(() => {
        setAnimatedCards(prev => new Set(prev).add(video.id));
      }, index * 200);
    });
  }, []);

  const handleVideoSelect = (video: VideoData) => {
    setSelectedVideo(video);
    setIsPlaying(true);
  };

  const closeVideo = () => {
    setSelectedVideo(null);
    setIsPlaying(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 via-purple-100 to-blue-200 p-4 md:p-8 relative overflow-hidden">
      <FloatingStars />
      
      {/* En-tête festif */}
      <div className="text-center mb-8 md:mb-12 relative z-10">
        <div className="animate-bounce mb-4">
          <span className="text-6xl md:text-8xl">🎂</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent mb-4 animate-pulse">
          Joyeux Anniversaire Orly ! 🎉
        </h1>
        <p className="text-lg md:text-2xl text-gray-700 max-w-3xl mx-auto font-medium">
          Des messages pleins d&apos;amour pour ton jour magique ✨
        </p>
        <div className="mt-4 text-2xl md:text-3xl">
          🎈 🎁 🌟 🎊 🎵
        </div>
      </div>

      {/* Arbre de vidéos */}
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="relative">
          {/* Tronc central animé - caché sur mobile */}
          <div className="hidden md:block absolute left-1/2 top-0 w-3 h-full bg-gradient-to-b from-amber-600 via-amber-700 to-amber-900 transform -translate-x-1/2 rounded-full shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-pulse"></div>
          </div>
          
          {/* Branches et vidéos */}
          <div className="space-y-8 md:space-y-16">
            {videoData.map((video, index) => {
              const isEven = index % 2 === 0;
              const IconComponent = video.icon;
              const isAnimated = animatedCards.has(video.id);
              
              return (
                <div key={video.id} className="relative">
                  {/* Branche animée - cachée sur mobile */}
                  <div className={`hidden md:block absolute top-8 w-32 h-2 bg-gradient-to-r from-amber-500 to-green-500 rounded-full shadow-md ${
                    isEven ? 'left-1/2 ml-1' : 'right-1/2 mr-1'
                  } ${isAnimated ? 'animate-pulse' : ''}`}>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-40 animate-pulse"></div>
                  </div>
                  
                  {/* Feuilles décoratives */}
                  <div className={`hidden md:block absolute top-6 text-2xl ${
                    isEven ? 'left-1/2 ml-20' : 'right-1/2 mr-20'
                  } animate-bounce`} style={{animationDelay: `${index * 0.2}s`}}>
                    🍃
                  </div>
                  
                  {/* Carte vidéo améliorée */}
                  <div className={`flex ${isEven ? 'justify-start md:pl-40' : 'justify-end md:pr-40'}`}>
                    <div 
                      className={`group cursor-pointer transform transition-all duration-500 ${
                        isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                      } hover:scale-110 ${
                        isEven ? 'hover:translate-x-3 hover:rotate-1' : 'hover:-translate-x-3 hover:-rotate-1'
                      } hover:z-10`}
                      onClick={() => handleVideoSelect(video)}
                    >
                      <div className={`bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-2xl p-4 md:p-6 w-full max-w-xs md:max-w-sm hover:shadow-3xl transition-all duration-300 border-2 border-transparent hover:border-white relative overflow-hidden`}>
                        {/* Effet de brillance */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-300 transform -skew-x-12 translate-x-full group-hover:translate-x-full"></div>
                        
                        <div className="flex items-center mb-4 relative z-10">
                          <div className={`p-3 rounded-full bg-gradient-to-br ${video.bgGradient} mr-4 shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
                            <IconComponent className="w-5 h-5 md:w-6 md:h-6 text-white" />
                          </div>
                          <div>
                            <h3 className="font-bold text-gray-800 text-base md:text-lg group-hover:text-purple-700 transition-colors">
                              {video.message.split(' ').slice(0, 3).join(' ')}...
                            </h3>
                            <p className="text-gray-600 text-sm font-medium">{video.name}</p>
                          </div>
                        </div>
                        
                        {/* Aperçu vidéo amélioré */}
                        <div className="relative bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl aspect-video mb-4 overflow-hidden group-hover:shadow-inner">
                          <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 to-pink-400/20 flex items-center justify-center">
                            <div className="relative">
                              <Play className="w-10 h-10 md:w-14 md:h-14 text-white opacity-80 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-125" />
                              <div className="absolute inset-0 rounded-full bg-white/20 animate-ping"></div>
                            </div>
                          </div>
                          <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
                            🎥 Vidéo
                          </div>
                          <div className="absolute top-2 left-2 text-xl">
                            {index % 2 === 0 ? '💝' : '🌟'}
                          </div>
                        </div>
                        
                        <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg p-3">
                          <p className="text-gray-700 italic text-xs md:text-sm text-center font-medium">
                            &quot;{video.message}&quot;
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Modal vidéo améliorée */}
      {selectedVideo && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-2 md:p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl md:rounded-3xl w-full max-w-2xl md:max-w-4xl max-h-[95vh] overflow-y-auto shadow-3xl border-4 border-white/20 transform animate-scaleIn">
            <div className="p-4 md:p-8">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center">
                  <div className={`p-3 rounded-full bg-gradient-to-br ${selectedVideo.bgGradient} mr-4 shadow-lg animate-pulse`}>
                    <selectedVideo.icon className="w-6 h-6 md:w-8 md:h-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl md:text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      {selectedVideo.message}
                    </h2>
                    <p className="text-gray-600 text-sm md:text-lg font-medium">Par {selectedVideo.name}</p>
                  </div>
                </div>
                <button
                  onClick={closeVideo}
                  className="text-gray-400 hover:text-gray-600 text-3xl font-bold hover:rotate-90 transition-all duration-300 bg-gray-100 hover:bg-gray-200 rounded-full w-10 h-10 flex items-center justify-center"
                  aria-label="Fermer la vidéo"
                >
                  ×
                </button>
              </div>
              
              {/* Player vidéo avec bordure festive */}
              <div className="relative bg-gradient-to-br from-gray-800-to-gray-900 rounded-xl overflow-hidden mb-6 shadow-2xl border-4 border-gradient-to-r from-pink-400 to-purple-400">
                <video
                  className="w-full h-auto max-h-[50vh] md:max-h-96"
                  controls
                  autoPlay={isPlaying}
                  src={selectedVideo.videoUrl}
                >
                  Votre navigateur ne supporte pas la lecture vidéo.
                </video>
                <div className="absolute top-4 right-4 text-2xl animate-bounce">
                  🎬
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-pink-50 via-purple-50 to-blue-50 rounded-xl p-4 md:p-6 border-l-4 border-pink-400">
                <p className="text-gray-700 italic text-base md:text-lg text-center font-medium leading-relaxed">
                  &quot;{selectedVideo.message}&quot;
                </p>
                <div className="text-center mt-4 text-2xl">
                  💝 ✨ 🎉
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CSS personnalisé pour les animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes scaleIn {
          from { 
            opacity: 0;
            transform: scale(0.8) translateY(20px);
          }
          to { 
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        
        .animate-scaleIn {
          animation: scaleIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        
        .shadow-3xl {
          box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
        }
      `}</style>
    </div>
  );
};

export default VideoTreeInterface;