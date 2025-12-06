import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Star, Sparkles, Flame, X } from "lucide-react";
import { Button } from "./ui/button";

export const TimeSurprises = () => {
  const [show136, setShow136] = useState(false);
  const [show1111, setShow1111] = useState(false);
  const [hearts, setHearts] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const [clickedHearts, setClickedHearts] = useState(0);

  useEffect(() => {
    const checkTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();

      // Check for 1:36 PM (13:36)
      if (hours === 13 && minutes === 36 && !show136) {
        setShow136(true);
        triggerBirthtimeSurprise();
      }

      // Check for 11:11 (both AM and PM)
      if (hours === 11 && minutes === 11 && !show1111) {
        setShow1111(true);
      } else if (hours === 23 && minutes === 11 && !show1111) {
        setShow1111(true);
      }

      // Auto-hide after 2 minutes
      if (hours === 13 && minutes === 38) setShow136(false);
      if ((hours === 11 && minutes === 13) || (hours === 23 && minutes === 13)) setShow1111(false);
    };

    const interval = setInterval(checkTime, 1000);
    return () => clearInterval(interval);
  }, [show136, show1111]);

  const triggerBirthtimeSurprise = () => {
    // Create floating hearts to click
    const newHearts = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
    }));
    setHearts(newHearts);
  };

  const handleHeartClick = (id: number) => {
    setHearts(hearts.filter(h => h.id !== id));
    setClickedHearts(prev => prev + 1);
  };

  return (
    <>
      {/* 1:36 PM - Birth Time Surprise */}
      <AnimatePresence>
        {show136 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-gradient-to-br from-pink-900/95 via-rose-900/95 to-red-900/95 backdrop-blur-sm"
          >
            <Button
              onClick={() => setShow136(false)}
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 text-white hover:bg-white/20"
            >
              <X className="w-6 h-6" />
            </Button>

            {/* Romantic message */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 1, type: "spring" }}
              >
                <Flame className="w-32 h-32 text-orange-400 mb-8 animate-pulse" />
              </motion.div>

              <motion.h1
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-6xl font-bold text-white mb-6"
              >
                1:36 PM ✨
              </motion.h1>

              <motion.p
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="text-3xl text-white/90 mb-4 font-romantic"
              >
                The moment you came into this world 💖
              </motion.p>

              <motion.p
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="text-xl text-white/80 mb-8 max-w-2xl font-romantic"
              >
                The universe became infinitely more beautiful at this exact time. 
                You entered this world and made it a better place. 
                Now, catch all the love I'm sending you! 💕
              </motion.p>

              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.1 }}
                className="text-4xl font-bold text-pink-300 mb-4"
              >
                Hearts Caught: {clickedHearts} / 50
              </motion.div>

              {clickedHearts === 50 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="text-2xl text-white font-romantic bg-pink-500/30 backdrop-blur-sm px-8 py-4 rounded-2xl mt-4"
                >
                  You caught all my love! You're amazing! 😍💖
                </motion.div>
              )}
            </div>

            {/* Interactive floating hearts */}
            {hearts.map((heart) => (
              <motion.button
                key={heart.id}
                onClick={() => handleHeartClick(heart.id)}
                initial={{ 
                  scale: 0, 
                  x: `${heart.x}vw`, 
                  y: `${heart.y}vh`,
                  rotate: Math.random() * 360 
                }}
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 360],
                  y: [`${heart.y}vh`, `${heart.y - 20}vh`, `${heart.y}vh`]
                }}
                transition={{ 
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                whileHover={{ scale: 1.5 }}
                whileTap={{ scale: 0 }}
                className="absolute cursor-pointer"
                style={{ left: 0, top: 0 }}
              >
                <Heart 
                  className="w-12 h-12 text-pink-400 fill-pink-400 drop-shadow-lg hover:text-rose-300 hover:fill-rose-300 transition-colors" 
                />
              </motion.button>
            ))}

            {/* Pulsing background effect */}
            <div className="absolute inset-0 pointer-events-none">
              {Array.from({ length: 20 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full bg-pink-500/20"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    width: `${50 + Math.random() * 100}px`,
                    height: `${50 + Math.random() * 100}px`,
                  }}
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                  }}
                />
              ))}
            </div>

            {/* Sensual wave animation */}
            <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none">
              <defs>
                <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ec4899" />
                  <stop offset="50%" stopColor="#f43f5e" />
                  <stop offset="100%" stopColor="#fb923c" />
                </linearGradient>
              </defs>
              {Array.from({ length: 5 }).map((_, i) => (
                <motion.path
                  key={i}
                  d={`M0,${200 + i * 100} Q${window.innerWidth / 4},${150 + i * 100} ${window.innerWidth / 2},${200 + i * 100} T${window.innerWidth},${200 + i * 100}`}
                  stroke="url(#wave-gradient)"
                  strokeWidth="3"
                  fill="none"
                  animate={{
                    d: [
                      `M0,${200 + i * 100} Q${window.innerWidth / 4},${150 + i * 100} ${window.innerWidth / 2},${200 + i * 100} T${window.innerWidth},${200 + i * 100}`,
                      `M0,${200 + i * 100} Q${window.innerWidth / 4},${250 + i * 100} ${window.innerWidth / 2},${200 + i * 100} T${window.innerWidth},${200 + i * 100}`,
                      `M0,${200 + i * 100} Q${window.innerWidth / 4},${150 + i * 100} ${window.innerWidth / 2},${200 + i * 100} T${window.innerWidth},${200 + i * 100}`,
                    ],
                  }}
                  transition={{
                    duration: 3 + i * 0.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </svg>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 11:11 - Lucky Number Surprise */}
      <AnimatePresence>
        {show1111 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-gradient-to-br from-indigo-900/95 via-purple-900/95 to-pink-900/95 backdrop-blur-sm"
          >
            <Button
              onClick={() => setShow1111(false)}
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 text-white hover:bg-white/20"
            >
              <X className="w-6 h-6" />
            </Button>

            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
              <motion.div
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <div className="text-9xl font-bold mb-8 bg-gradient-to-r from-yellow-200 via-pink-300 to-purple-300 bg-clip-text text-transparent">
                  11:11
                </div>
              </motion.div>

              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: "spring" }}
              >
                <Sparkles className="w-24 h-24 text-yellow-300 mb-6" />
              </motion.div>

              <motion.h2
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="text-5xl font-bold text-white mb-6"
              >
                Our Lucky Number! ✨
              </motion.h2>

              <motion.p
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="text-2xl text-white/90 mb-4 max-w-2xl font-romantic"
              >
                Make a wish together... 💫
              </motion.p>

              <motion.p
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.1 }}
                className="text-xl text-white/80 max-w-2xl font-romantic"
              >
                The universe is listening. Our love makes every wish come true. 
                This is our moment, our magic number, our destiny. 💖
              </motion.p>

              {/* Shooting stars */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {Array.from({ length: 30 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute"
                    initial={{
                      x: Math.random() * window.innerWidth,
                      y: -50,
                      opacity: 0,
                    }}
                    animate={{
                      x: Math.random() * window.innerWidth,
                      y: window.innerHeight + 50,
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 2 + Math.random() * 2,
                      repeat: Infinity,
                      delay: Math.random() * 3,
                      ease: "linear",
                    }}
                  >
                    <Star className="w-4 h-4 text-yellow-300 fill-yellow-300" />
                  </motion.div>
                ))}
              </div>

              {/* Lucky number animation */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                {Array.from({ length: 4 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute text-9xl font-bold text-white/10"
                    animate={{
                      scale: [1, 2, 1],
                      opacity: [0.1, 0.3, 0.1],
                      rotate: [0, 180, 360],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      delay: i * 2,
                    }}
                  >
                    11:11
                  </motion.div>
                ))}
              </div>

              {/* Sparkles rain */}
              <div className="absolute inset-0 pointer-events-none">
                {Array.from({ length: 50 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                      y: [0, -20, 0],
                      opacity: [0, 1, 0],
                      scale: [0, 1, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: Math.random() * 2,
                    }}
                  >
                    <Sparkles className="w-6 h-6 text-yellow-300" />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
