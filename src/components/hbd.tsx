'use client'

import { useEffect, useState } from 'react';
import { PartyPopper, Heart } from 'lucide-react';
import VideoTreeInterface from '@/components/VideoTreeInterface';

const IntroOverlay = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    // Démarrer l'animation après le rendu initial
    setTimeout(() => setAnimate(true), 100);
    
    // Masquer l'intro après 3 secondes
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (!showIntro) return <VideoTreeInterface />;

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 flex items-center justify-center z-50">
      <div className={`text-center transition-all duration-1000 ${animate ? 'scale-110 opacity-0' : 'scale-100 opacity-100'}`}>
        <div className="flex justify-center mb-6">
          <PartyPopper className="w-16 h-16 text-yellow-300 animate-bounce" />
          <Heart className="w-16 h-16 text-pink-300 animate-pulse" />
          <PartyPopper className="w-16 h-16 text-yellow-300 animate-bounce" />
        </div>
        <h1 className="text-6xl font-bold text-white mb-4">Joyeux Anniversaire !</h1>
        <p className="text-2xl text-white opacity-90">Prépare-toi à recevoir plein d'amour ❤️</p>
      </div>
    </div>
  );
};

export default IntroOverlay;