'use client'

import { useEffect, useState } from 'react';
import { PartyPopper, Heart, Sparkles } from 'lucide-react';
import VideoTreeInterface from '@/components/VideoTreeInterface';
import { motion, AnimatePresence } from 'framer-motion';

const IntroOverlay = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [animationStep, setAnimationStep] = useState(0);

  useEffect(() => {
    // Séquence d'animation
    const timeline = [
      { delay: 300, action: () => setAnimationStep(1) },  // Apparition texte
      { delay: 1500, action: () => setAnimationStep(2) }, // Confettis
      { delay: 100000, action: () => setShowIntro(false) }  // Disparition
    ];

    const timers = timeline.map(({ delay, action }) => 
      setTimeout(action, delay)
    );

    return () => timers.forEach(timer => clearTimeout(timer));
  }, []);

  return (
    <>
      <AnimatePresence>
        {showIntro ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 bg-gradient-to-br from-pink-600 via-purple-600 to-blue-600 flex items-center justify-center z-50 overflow-hidden"
          >
            {/* Confettis animés */}
            {animationStep >= 2 && (
              <div className="absolute inset-0 overflow-hidden">
                {[...Array(30)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ y: -50, x: Math.random() * window.innerWidth, opacity: 0 }}
                    animate={{ 
                      y: window.innerHeight,
                      opacity: [0, 1, 0],
                      rotate: Math.random() * 360
                    }}
                    transition={{
                      duration: 2 + Math.random() * 3,
                      delay: Math.random() * 0.5,
                      repeat: Infinity
                    }}
                    className="absolute text-yellow-300 text-2xl"
                    style={{ left: `${Math.random() * 100}%` }}
                  >
                    {['🎉', '🎊', '❤️', '✨', '🎈'][Math.floor(Math.random() * 5)]}
                  </motion.div>
                ))}
              </div>
            )}

            <div className="text-center relative z-10">
              {/* Icônes */}
              <motion.div 
                className="flex justify-center mb-8"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              >
                <PartyPopper className="w-20 h-20 text-yellow-300" />
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, -10, 0]
                  }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 2,
                    delay: 0.5
                  }}
                >
                  <Heart className="w-20 h-20 text-pink-300 mx-6" />
                </motion.div>
                <PartyPopper className="w-20 h-20 text-yellow-300" />
              </motion.div>

              {/* Texte principal */}
              <motion.h1
                className="text-7xl font-bold text-white mb-6 font-serif"
                initial={{ y: 50, opacity: 0 }}
                animate={animationStep >= 1 ? { 
                  y: 0, 
                  opacity: 1,
                  textShadow: '0 0 10px rgba(255,255,255,0.5)'
                } : {}}
                transition={{ duration: 0.8, type: 'spring' }}
              >
                Joyeux Anniversaire !
              </motion.h1>

              <motion.p
                className="text-3xl text-white opacity-90 mb-10"
                initial={{ y: 30, opacity: 0 }}
                animate={animationStep >= 1 ? { y: 0, opacity: 0.9 } : {}}
                transition={{ duration: 0.8, delay: 0.3, type: 'spring' }}
              >
                Prépare-toi à recevoir plein d&apos;amour ❤️
              </motion.p>

              {/* Bouton skip (optionnel) */}
              <motion.button
                className="px-6 py-2 bg-white bg-opacity-20 rounded-full text-white text-sm hover:bg-opacity-30 transition-all"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                whileHover={{ opacity: 1, scale: 1.05 }}
                onClick={() => setShowIntro(false)}
              >
                Voir les messages
              </motion.button>
            </div>

            {/* Effet brillance */}
            {animationStep >= 1 && (
              <motion.div 
                className="absolute inset-0 pointer-events-none"
                animate={{ 
                  backgroundPosition: ['0% 0%', '100% 100%']
                }}
                transition={{
                  duration: 15,
                  repeat: Infinity,
                  ease: 'linear'
                }}
                style={{
                  background: 'radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, transparent 70%)'
                }}
              />
            )}
          </motion.div>
        ) : (
          <VideoTreeInterface />
        )}
      </AnimatePresence>
    </>
  );
};

export default IntroOverlay;