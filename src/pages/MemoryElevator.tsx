import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FloatingHearts } from "@/components/FloatingHearts";
import { ArrowLeft, Bell, AlertCircle, Phone, Volume2, VolumeX, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

const floors = [
  { number: 7, name: "Our Future Together", message: "A home filled with laughter, kids running around, and us still holding hands at sunset." },
  { number: 6, name: "The Day I Knew", message: "The moment I realized I wanted to spend forever with you — your laugh, your smile, everything clicked." },
  { number: 5, name: "Anniversary Magic", message: "Our anniversary, candles lit, your eyes glowing with love, and my heart completely yours." },
  { number: 4, name: "First Kiss", message: "Under the stars, nervous heartbeat, soft lips meeting mine — time stood still." },
  { number: 3, name: "Unnati's Laugh", message: "The sound that makes everything better, the melody that plays on repeat in my heart." },
  { number: 2, name: "First Date", message: "Nervous smiles, stolen glances, and the beginning of our forever story." },
  { number: 1, name: "First Hello", message: "The day our paths crossed and my world changed forever — hello, my love." },
];

const MemoryElevator = () => {
  const [currentFloor, setCurrentFloor] = useState(0);
  const [isMoving, setIsMoving] = useState(false);
  const [doorsOpen, setDoorsOpen] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);
  const [floorDisplay, setFloorDisplay] = useState(1);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [weight, setWeight] = useState(0);
  const [showCertificate, setShowCertificate] = useState(false);
  const musicRef = useRef<HTMLAudioElement | null>(null);

  // Elevator entrance animation and weight simulation
  useEffect(() => {
    const timer = setTimeout(() => {
      setDoorsOpen(true);
      setTimeout(() => {
        setHasEntered(true);
        // Simulate person entering - random weight between 120-180 lbs
        const randomWeight = Math.floor(Math.random() * 60) + 120;
        setWeight(randomWeight);
        
        // Fun overweight warning
        if (randomWeight > 170) {
          setTimeout(() => {
            toast("⚠️ Weight Limit Warning", {
              description: "Just kidding! You're perfect just the way you are 💕",
            });
          }, 2000);
        }
      }, 1000);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Background music setup
  useEffect(() => {
    const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBzWM0fPTgjMGHGq+7+OZUQ0OVK7j8bllHAc0jdLy0oE0Bh5qvu/mnVIND1Ot4/K6ZRwHNIzS8tKBNAYeat7v5p1SDQ9UreP');
    audio.loop = true;
    audio.volume = 0.3;
    musicRef.current = audio;
    
    return () => {
      if (musicRef.current) {
        musicRef.current.pause();
        musicRef.current = null;
      }
    };
  }, []);

  const toggleMusic = () => {
    if (musicRef.current) {
      if (musicPlaying) {
        musicRef.current.pause();
      } else {
        musicRef.current.play().catch(() => {});
      }
      setMusicPlaying(!musicPlaying);
    }
  };

  const moveToFloor = (index: number) => {
    if (isMoving || index === currentFloor) return;
    
    // Close doors
    setDoorsOpen(false);
    setIsMoving(true);
    
    // Animate floor numbers changing
    const startFloor = floors[currentFloor].number;
    const endFloor = floors[index].number;
    const floorDirection = endFloor > startFloor ? 1 : -1;
    const floorDifference = Math.abs(index - currentFloor);
    let step = 0;
    
    const floorInterval = setInterval(() => {
      step++;
      setFloorDisplay(startFloor + (floorDirection * step));
      
      if (step >= floorDifference) {
        clearInterval(floorInterval);
      }
    }, 400);
    
    // Arrive at floor
    setTimeout(() => {
      setCurrentFloor(index);
      setFloorDisplay(floors[index].number);
      
      // Voice announcement (silent, no beep)
      setTimeout(() => {
        toast(`🔔 Floor ${floors[index].number}`, {
          description: floors[index].name,
          duration: 3000,
        });
      }, 300);
      
      setTimeout(() => {
        setDoorsOpen(true);
        setIsMoving(false);
      }, 200);
    }, floorDifference * 400 + 600);
  };

  const handleEmergency = () => {
    toast("🚨 Emergency button pressed!", {
      description: "Just kidding! There's no emergency in our love story 💕",
    });
  };

  const handlePhone = () => {
    toast("📞 Calling...", {
      description: "Hello? Yes, I'm stuck in an elevator... stuck thinking about you! 💕",
    });
  };

  const handleCertificate = () => {
    setShowCertificate(true);
    setTimeout(() => setShowCertificate(false), 5000);
  };

  const floor = floors[currentFloor];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      {/* Elevator shaft background */}
      <div className="absolute inset-0 opacity-20">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-full h-px bg-gradient-to-r from-transparent via-white to-transparent"
            style={{ top: `${i * 5}%` }}
          />
        ))}
      </div>

      {/* Cables */}
      <div className="absolute left-[15%] top-0 bottom-0 w-1 bg-gradient-to-b from-gray-600 via-gray-500 to-gray-600 opacity-30" 
           style={{ transform: isMoving ? 'translateY(-20px)' : 'translateY(0)', transition: 'transform 0.4s ease-in-out' }} />
      <div className="absolute right-[15%] top-0 bottom-0 w-1 bg-gradient-to-b from-gray-600 via-gray-500 to-gray-600 opacity-30"
           style={{ transform: isMoving ? 'translateY(-20px)' : 'translateY(0)', transition: 'transform 0.4s ease-in-out' }} />

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        {/* Elevator Cabin */}
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ 
            y: isMoving ? [0, -2, 2, -1, 1, 0] : 0,
            opacity: 1 
          }}
          transition={{ 
            y: {
              duration: 0.5,
              repeat: isMoving ? Infinity : 0,
              repeatType: "loop",
            },
            opacity: { duration: 1, ease: "easeOut" }
          }}
          className="relative w-full max-w-5xl"
        >
          {/* Elevator Frame */}
          <div className="relative bg-gradient-to-b from-gray-800 to-gray-900 rounded-lg shadow-2xl border-4 border-gray-700 overflow-hidden">
            {/* Top indicator panel */}
            <div className="bg-gradient-to-b from-gray-900 to-gray-800 py-4 px-6 border-b-2 border-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Link to="/universe">
                    <Button variant="ghost" size="sm" className="text-white/70 hover:text-white hover:bg-white/10">
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Exit
                    </Button>
                  </Link>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={toggleMusic}
                    className="text-white/70 hover:text-white hover:bg-white/10"
                  >
                    {musicPlaying ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                  </Button>
                </div>
                
                {/* Floor Display */}
                <div className="flex items-center gap-4">
                  <div className="bg-black rounded-lg px-6 py-3 border-2 border-red-900/50">
                    <div className="text-5xl font-bold font-mono text-red-500 text-center tracking-wider" style={{ textShadow: '0 0 20px rgba(239, 68, 68, 0.8)' }}>
                      {isMoving ? floorDisplay : floor.number}
                    </div>
                  </div>
                  
                  {/* Direction indicator */}
                  <div className="flex flex-col gap-1">
                    <div className={`w-6 h-6 rounded-full ${isMoving && currentFloor < floors.findIndex(f => f.number === floorDisplay) ? 'bg-yellow-500' : 'bg-gray-700'} transition-colors`}>
                      <span className="block text-center text-xs text-gray-900 font-bold">▲</span>
                    </div>
                    <div className={`w-6 h-6 rounded-full ${isMoving && currentFloor > floors.findIndex(f => f.number === floorDisplay) ? 'bg-yellow-500' : 'bg-gray-700'} transition-colors`}>
                      <span className="block text-center text-xs text-gray-900 font-bold">▼</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-sm text-white/60">
                    Weight: <span className="text-yellow-400 font-mono">{weight} lbs</span>
                  </div>
                  <Bell className={`w-6 h-6 ${isMoving ? 'text-yellow-500 animate-bounce' : 'text-gray-600'}`} />
                </div>
              </div>
            </div>

            <div className="flex min-h-[600px]">
              {/* Control Panel */}
              <div className="w-48 bg-gradient-to-b from-gray-800 to-gray-900 border-r-2 border-gray-700 p-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-xs text-white/50 text-center font-semibold flex-1">SELECT FLOOR</div>
                    <button
                      onClick={handleCertificate}
                      className="text-yellow-500/50 hover:text-yellow-500 transition-colors"
                      title="Inspection Certificate"
                    >
                      <Award className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {floors.map((f, index) => (
                      <button
                        key={f.number}
                        onClick={() => moveToFloor(index)}
                        disabled={isMoving}
                        className={`relative w-16 h-16 rounded-full text-xl font-bold transition-all duration-300 ${
                          currentFloor === index
                            ? "bg-yellow-500 text-gray-900 shadow-lg shadow-yellow-500/50"
                            : "bg-gray-700 text-white hover:bg-gray-600 active:bg-gray-500"
                        } border-2 ${
                          currentFloor === index ? "border-yellow-600" : "border-gray-600"
                        } disabled:opacity-50 disabled:cursor-not-allowed`}
                      >
                        {f.number}
                        {currentFloor === index && (
                          <div className="absolute inset-0 rounded-full bg-yellow-400 animate-ping opacity-75" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Emergency button and Phone */}
                <div className="space-y-2">
                  <button
                    onClick={handlePhone}
                    className="w-full py-3 bg-blue-600/80 hover:bg-blue-600 active:bg-blue-700 rounded-lg text-white font-bold flex items-center justify-center gap-2 border-2 border-blue-800 transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    PHONE
                  </button>
                  <button
                    onClick={handleEmergency}
                    className="w-full py-4 bg-red-600 hover:bg-red-700 active:bg-red-800 rounded-lg text-white font-bold flex items-center justify-center gap-2 border-2 border-red-800 transition-colors"
                  >
                    <AlertCircle className="w-5 h-5" />
                    EMERGENCY
                  </button>
                </div>
              </div>

              {/* Main Display Area with Doors */}
              <div className="flex-1 relative bg-gradient-to-b from-rose-950/20 to-purple-950/20">
                {/* Elevator Doors */}
                <AnimatePresence>
                  {!doorsOpen && (
                    <>
                      <motion.div
                        initial={{ x: 0 }}
                        animate={{ x: 0 }}
                        exit={{ x: '-100%' }}
                        transition={{ duration: 0.8, ease: 'easeInOut' }}
                        className="absolute left-0 top-0 bottom-0 w-1/2 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-500 border-r border-gray-800 z-20"
                      >
                        <div className="absolute inset-y-0 right-0 w-1 bg-gradient-to-b from-transparent via-white/30 to-transparent" />
                      </motion.div>
                      <motion.div
                        initial={{ x: 0 }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ duration: 0.8, ease: 'easeInOut' }}
                        className="absolute right-0 top-0 bottom-0 w-1/2 bg-gradient-to-l from-gray-700 via-gray-600 to-gray-500 border-l border-gray-800 z-20"
                      >
                        <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-transparent via-white/30 to-transparent" />
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>

                {/* Content */}
                <AnimatePresence mode="wait">
                  {doorsOpen && hasEntered && (
                    <motion.div
                      key={currentFloor}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.4 }}
                      className="p-8 h-full flex flex-col justify-center"
                    >
                      <div className="space-y-6">
                        <div className="inline-block px-4 py-2 bg-gradient-to-r from-rose-500/20 to-purple-500/20 rounded-full border border-rose-300/30">
                          <span className="text-7xl font-elegant font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-purple-400">
                            Floor {floor.number}
                          </span>
                        </div>

                        <h2 className="text-4xl font-elegant font-bold text-white drop-shadow-lg">
                          {floor.name}
                        </h2>

                        <p className="text-xl font-romantic text-white/90 leading-relaxed max-w-2xl">
                          {floor.message}
                        </p>

                        {/* Decorative hearts */}
                        <div className="flex gap-2 pt-4">
                          {[...Array(floor.number)].map((_, i) => (
                            <motion.span
                              key={i}
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{ delay: i * 0.1 + 0.5 }}
                              className="text-2xl"
                            >
                              💖
                            </motion.span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Moving effect overlay */}
                {isMoving && (
                  <motion.div
                    initial={{ y: '100%' }}
                    animate={{ y: '-100%' }}
                    transition={{ duration: 0.6, repeat: Infinity }}
                    className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent pointer-events-none z-10"
                  />
                )}
              </div>
            </div>

            {/* Bottom frame */}
            <div className="h-4 bg-gradient-to-t from-gray-900 to-gray-800 border-t-2 border-gray-700" />
          </div>

          {/* Ambient glow */}
          <div className="absolute -inset-4 bg-gradient-to-b from-rose-500/10 to-purple-500/10 blur-3xl -z-10 opacity-50" />
        </motion.div>

        {/* Inspection Certificate Modal */}
        <AnimatePresence>
          {showCertificate && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            >
              <div className="bg-gradient-to-b from-amber-50 to-amber-100 p-8 rounded-lg shadow-2xl border-4 border-amber-800 max-w-md">
                <div className="text-center space-y-4">
                  <Award className="w-16 h-16 mx-auto text-amber-700" />
                  <h2 className="text-2xl font-bold text-amber-900">Official Certificate</h2>
                  <div className="text-amber-800 space-y-2">
                    <p className="text-sm">This Love Elevator has been certified by:</p>
                    <p className="text-xl font-elegant font-bold">The Department of Eternal Romance</p>
                    <p className="text-xs mt-4 border-t border-amber-300 pt-4">
                      Inspected: Forever Ago<br />
                      Next Inspection: Never (Perfect as is)<br />
                      Max Capacity: Infinite Love
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style>{`
        @keyframes slide-up {
          0%, 100% { transform: translateY(100%); }
          50% { transform: translateY(-100%); }
        }
        .animate-slide-up {
          animation: slide-up 0.8s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default MemoryElevator;
