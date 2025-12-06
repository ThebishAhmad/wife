import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FloatingHearts } from "@/components/FloatingHearts";
import { ArrowLeft, Flower2, Droplets, Sun, Cloud, CloudRain, Sparkles, Bug } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

type FlowerType = 'rose' | 'tulip' | 'sunflower' | 'lotus' | 'daisy';

type Flower = {
  id: number;
  memory: string;
  position: { top: string; left: string };
  growth: number;
  watered: boolean;
  type: FlowerType;
  color: string;
};

type Particle = {
  id: number;
  x: number;
  y: number;
  type: 'water' | 'sparkle' | 'petal';
};

type Butterfly = {
  id: number;
  x: number;
  y: number;
  angle: number;
};

const flowerTypes: { type: FlowerType; color: string; emoji: string }[] = [
  { type: 'rose', color: 'hsl(340 82% 65%)', emoji: '🌹' },
  { type: 'tulip', color: 'hsl(270 70% 75%)', emoji: '🌷' },
  { type: 'sunflower', color: 'hsl(45 100% 60%)', emoji: '🌻' },
  { type: 'lotus', color: 'hsl(300 70% 80%)', emoji: '🪷' },
  { type: 'daisy', color: 'hsl(0 0% 100%)', emoji: '🌼' },
];

const initialMemories = [
  { id: 1, memory: "Our first date - I was so nervous, but you made everything perfect 💕", position: { top: "20%", left: "15%" }, type: 'rose' as FlowerType },
  { id: 2, memory: "The day you first said 'I love you' - my heart hasn't stopped racing since ❤️", position: { top: "35%", left: "45%" }, type: 'tulip' as FlowerType },
  { id: 3, memory: "Late night talks under the stars - where I learned your dreams and secrets 🌟", position: { top: "55%", left: "25%" }, type: 'lotus' as FlowerType },
  { id: 4, memory: "Dancing in the rain with you - the most magical moment of my life 🌧️", position: { top: "70%", left: "60%" }, type: 'sunflower' as FlowerType },
  { id: 5, memory: "Your smile when you wake up - the most beautiful sight in the world ☀️", position: { top: "25%", left: "75%" }, type: 'daisy' as FlowerType },
  { id: 6, memory: "The way you hold my hand - it makes me feel safe and loved 🤝", position: { top: "50%", left: "70%" }, type: 'rose' as FlowerType },
  { id: 7, memory: "Cooking together and burning the food - but laughing all the way 🍳", position: { top: "65%", left: "35%" }, type: 'tulip' as FlowerType },
  { id: 8, memory: "Every 'good morning' text from you brightens my entire day 📱", position: { top: "40%", left: "55%" }, type: 'lotus' as FlowerType },
  { id: 9, memory: "Your laugh is my favorite sound in the entire universe 🎵", position: { top: "30%", left: "85%" }, type: 'sunflower' as FlowerType },
  { id: 10, memory: "The first time I saw you, time stopped and I knew you were special ⏰", position: { top: "75%", left: "15%" }, type: 'daisy' as FlowerType },
  { id: 11, memory: "Our inside jokes that nobody else understands 😄", position: { top: "45%", left: "30%" }, type: 'rose' as FlowerType },
  { id: 12, memory: "How you know exactly what I need without me saying a word 💭", position: { top: "60%", left: "80%" }, type: 'tulip' as FlowerType },
];

const Garden = () => {
  const [flowers, setFlowers] = useState<Flower[]>([]);
  const [selectedMemory, setSelectedMemory] = useState<string | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [wateringMode, setWateringMode] = useState(false);
  const [fullyGrown, setFullyGrown] = useState(0);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [butterflies, setButterflies] = useState<Butterfly[]>([]);
  const [weather, setWeather] = useState<'sunny' | 'cloudy' | 'rainy'>('sunny');
  const [score, setScore] = useState(0);
  const [caughtButterflies, setCaughtButterflies] = useState(0);
  const particleIdRef = useRef(0);

  useEffect(() => {
    const savedFlowers = localStorage.getItem('memory-garden-flowers-v2');
    if (savedFlowers) {
      const parsed = JSON.parse(savedFlowers);
      setFlowers(parsed);
      setFullyGrown(parsed.filter((f: Flower) => f.growth >= 100).length);
    } else {
      const newFlowers = initialMemories.map(m => {
        const flowerType = flowerTypes.find(ft => ft.type === m.type) || flowerTypes[0];
        return {
          ...m,
          growth: 0,
          watered: false,
          color: flowerType.color,
        };
      });
      setFlowers(newFlowers);
    }
  }, []);

  // Butterfly animation
  useEffect(() => {
    const initialButterflies: Butterfly[] = Array.from({ length: 5 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      angle: Math.random() * 360,
    }));
    setButterflies(initialButterflies);

    const interval = setInterval(() => {
      setButterflies(prev => prev.map(b => ({
        ...b,
        x: (b.x + Math.cos(b.angle * Math.PI / 180) * 0.5 + 100) % 100,
        y: (b.y + Math.sin(b.angle * Math.PI / 180) * 0.5 + 100) % 100,
        angle: b.angle + (Math.random() - 0.5) * 20,
      })));
    }, 50);

    return () => clearInterval(interval);
  }, []);

  // Weather cycle
  useEffect(() => {
    const weatherCycle = setInterval(() => {
      const weathers: ('sunny' | 'cloudy' | 'rainy')[] = ['sunny', 'sunny', 'cloudy', 'rainy'];
      const newWeather = weathers[Math.floor(Math.random() * weathers.length)];
      setWeather(newWeather);
      
      if (newWeather === 'rainy') {
        toast.success("It's raining! Your flowers are being watered automatically! 🌧️");
        // Auto-water all flowers
        const updatedFlowers = flowers.map(f => {
          if (f.growth < 100) {
            const newGrowth = Math.min(f.growth + 10, 100);
            return { ...f, growth: newGrowth, watered: true };
          }
          return f;
        });
        setFlowers(updatedFlowers);
        saveFlowers(updatedFlowers);
      }
    }, 20000); // Every 20 seconds

    return () => clearInterval(weatherCycle);
  }, [flowers]);

  const saveFlowers = (updatedFlowers: Flower[]) => {
    localStorage.setItem('memory-garden-flowers-v2', JSON.stringify(updatedFlowers));
  };

  const createParticles = (x: number, y: number, type: 'water' | 'sparkle' | 'petal') => {
    const newParticles: Particle[] = Array.from({ length: 8 }, () => ({
      id: particleIdRef.current++,
      x: x + (Math.random() - 0.5) * 30,
      y: y + (Math.random() - 0.5) * 30,
      type,
    }));
    
    setParticles(prev => [...prev, ...newParticles]);
    
    setTimeout(() => {
      setParticles(prev => prev.filter(p => !newParticles.find(np => np.id === p.id)));
    }, 1000);
  };

  const handleButterflyClick = (butterfly: Butterfly, e: React.MouseEvent) => {
    e.stopPropagation();
    setCaughtButterflies(prev => prev + 1);
    setScore(prev => prev + 10);
    
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    createParticles(rect.left, rect.top, 'sparkle');
    
    toast.success(`Butterfly caught! +10 points 🦋`, {
      description: `Total butterflies: ${caughtButterflies + 1}`,
    });
    
    // Respawn butterfly
    setTimeout(() => {
      setButterflies(prev => prev.map(b => 
        b.id === butterfly.id 
          ? { ...b, x: Math.random() * 100, y: Math.random() * 100 }
          : b
      ));
    }, 2000);
  };

  const handleFlowerClick = (flower: Flower, e: React.MouseEvent) => {
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    const containerRect = (e.target as HTMLElement).closest('.relative')?.getBoundingClientRect();
    
    if (wateringMode) {
      if (flower.growth < 100) {
        createParticles(rect.left - (containerRect?.left || 0), rect.top - (containerRect?.top || 0), 'water');
        
        const updatedFlowers = flowers.map(f => {
          if (f.id === flower.id) {
            const newGrowth = Math.min(f.growth + 25, 100);
            if (newGrowth === 100 && f.growth < 100) {
              toast.success("Flower fully grown! 🌸");
              setFullyGrown(prev => prev + 1);
              setScore(prev => prev + 50);
              createParticles(rect.left - (containerRect?.left || 0), rect.top - (containerRect?.top || 0), 'sparkle');
            } else {
              setScore(prev => prev + 5);
            }
            return { ...f, growth: newGrowth, watered: true };
          }
          return f;
        });
        setFlowers(updatedFlowers);
        saveFlowers(updatedFlowers);
      } else {
        toast.info("This flower is already fully grown! 🌺");
      }
    } else {
      if (flower.growth >= 100) {
        setSelectedMemory(flower.memory);
        setOpenDialog(true);
        createParticles(rect.left - (containerRect?.left || 0), rect.top - (containerRect?.top || 0), 'petal');
      } else {
        toast("Water this flower to help it grow and reveal its memory! 💧");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-soft relative overflow-hidden">
      <FloatingHearts />
      
      {/* Weather effects */}
      <div className="absolute inset-0 pointer-events-none z-5">
        {weather === 'rainy' && (
          <div className="absolute inset-0">
            {Array.from({ length: 50 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-0.5 h-4 bg-blue-400/60"
                initial={{ top: -20, left: `${Math.random() * 100}%` }}
                animate={{ 
                  top: '110%',
                  transition: { 
                    duration: Math.random() * 0.5 + 0.5, 
                    repeat: Infinity,
                    delay: Math.random() * 2 
                  }
                }}
              />
            ))}
          </div>
        )}
      </div>
      
      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <Link to="/">
            <Button
              variant="outline"
              size="lg"
              className="mb-4 bg-card/50 backdrop-blur-sm border-rose-light/30 hover:bg-rose/10"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <h1 className="text-5xl sm:text-6xl font-elegant font-bold text-gradient-romantic animate-glow">
            Enchanted Memory Garden 💐
          </h1>
          <p className="text-xl font-romantic text-foreground/80 max-w-2xl mx-auto">
            Water the flowers, catch butterflies, and unlock precious memories in this magical garden...
          </p>
          <div className="flex gap-4 justify-center items-center mt-4 flex-wrap">
            <Button
              onClick={() => setWateringMode(!wateringMode)}
              className={`${
                wateringMode
                  ? "bg-gradient-romantic shadow-romantic"
                  : "bg-card/60 border border-rose-light/30 text-foreground hover:bg-rose/10"
              }`}
            >
              <Droplets className="w-4 h-4 mr-2" />
              {wateringMode ? "Stop Watering" : "Start Watering"}
            </Button>
            <div className="flex items-center gap-2 px-4 py-2 bg-card/60 rounded-lg border border-rose-light/30">
              {weather === 'sunny' && <Sun className="w-5 h-5 text-yellow-500" />}
              {weather === 'cloudy' && <Cloud className="w-5 h-5 text-gray-400" />}
              {weather === 'rainy' && <CloudRain className="w-5 h-5 text-blue-400" />}
              <span className="text-sm font-romantic capitalize">{weather}</span>
            </div>
            <div className="px-4 py-2 bg-card/60 rounded-lg border border-rose-light/30">
              <span className="text-sm font-romantic">Score: {score} 🌟</span>
            </div>
            <div className="px-4 py-2 bg-card/60 rounded-lg border border-rose-light/30">
              <span className="text-sm font-romantic">Flowers: {fullyGrown}/{flowers.length} 🌸</span>
            </div>
            <div className="px-4 py-2 bg-card/60 rounded-lg border border-rose-light/30">
              <span className="text-sm font-romantic">Butterflies: {caughtButterflies} 🦋</span>
            </div>
          </div>
        </div>

        {/* Garden */}
        <div className="relative w-full h-[700px] bg-card/40 backdrop-blur-sm rounded-3xl shadow-romantic border border-rose-light/30 overflow-hidden">
          {/* Decorative ground with grass effect */}
          <div className="absolute bottom-0 w-full h-40 bg-gradient-to-t from-green-600/20 via-green-500/10 to-transparent">
            {Array.from({ length: 30 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute bottom-0 w-1 bg-green-600/40"
                style={{
                  left: `${(i * 3.33)}%`,
                  height: `${20 + Math.random() * 30}px`,
                }}
                animate={{
                  scaleY: [1, 1.1, 1],
                  transition: { 
                    duration: 2 + Math.random() * 2, 
                    repeat: Infinity,
                    delay: Math.random() * 2 
                  }
                }}
              />
            ))}
          </div>
          
          {/* Particles */}
          <AnimatePresence>
            {particles.map(particle => (
              <motion.div
                key={particle.id}
                className="absolute pointer-events-none"
                style={{ left: particle.x, top: particle.y }}
                initial={{ scale: 1, opacity: 1 }}
                animate={{ 
                  y: particle.type === 'water' ? 20 : -20,
                  scale: 0,
                  opacity: 0,
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
              >
                {particle.type === 'water' && <Droplets className="w-4 h-4 text-blue-400" />}
                {particle.type === 'sparkle' && <Sparkles className="w-4 h-4 text-yellow-400" />}
                {particle.type === 'petal' && <span className="text-2xl">🌸</span>}
              </motion.div>
            ))}
          </AnimatePresence>
          
          {/* Butterflies */}
          {butterflies.map(butterfly => (
            <motion.button
              key={butterfly.id}
              onClick={(e) => handleButterflyClick(butterfly, e)}
              className="absolute cursor-pointer hover:scale-125 transition-transform z-20"
              style={{
                left: `${butterfly.x}%`,
                top: `${butterfly.y}%`,
              }}
              animate={{
                rotate: [0, 10, 0, -10, 0],
                scale: [1, 1.1, 1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            >
              <Bug className="w-6 h-6 text-purple-400 drop-shadow-lg" fill="currentColor" />
            </motion.button>
          ))}
          
          {/* Flowers */}
          {flowers.map((flower, index) => {
            const size = 20 + (flower.growth / 100) * 40;
            const opacity = 0.4 + (flower.growth / 100) * 0.6;
            const flowerInfo = flowerTypes.find(ft => ft.type === flower.type) || flowerTypes[0];
            
            return (
              <motion.button
                key={flower.id}
                onClick={(e) => handleFlowerClick(flower, e)}
                className={`absolute transform transition-all duration-300 z-10 ${
                  wateringMode ? "cursor-pointer" : flower.growth >= 100 ? "cursor-pointer" : "cursor-help"
                }`}
                style={{
                  top: flower.position.top,
                  left: flower.position.left,
                }}
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 5, 0, -5, 0],
                }}
                transition={{
                  duration: 3 + index * 0.2,
                  repeat: Infinity,
                  delay: index * 0.2,
                }}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <div className="relative">
                  <motion.div
                    animate={{
                      scale: flower.growth >= 100 ? [1, 1.05, 1] : 1,
                    }}
                    transition={{
                      duration: 2,
                      repeat: flower.growth >= 100 ? Infinity : 0,
                    }}
                  >
                    <span 
                      className="text-6xl drop-shadow-lg"
                      style={{
                        fontSize: `${size}px`,
                        opacity,
                        filter: flower.growth >= 100 ? 'drop-shadow(0 0 10px rgba(255,182,193,0.8))' : 'none',
                      }}
                    >
                      {flowerInfo.emoji}
                    </span>
                  </motion.div>
                  
                  {/* Growth indicator */}
                  {flower.growth < 100 && (
                    <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
                      <div className="w-16 h-2 bg-card/80 rounded-full overflow-hidden border border-rose-light/30">
                        <motion.div 
                          className="h-full bg-gradient-romantic"
                          initial={{ width: 0 }}
                          animate={{ width: `${flower.growth}%` }}
                          transition={{ duration: 0.5 }}
                        />
                      </div>
                      <p className="text-xs font-romantic text-center mt-1 text-muted-foreground">
                        {flower.growth}%
                      </p>
                    </div>
                  )}
                  
                  {/* Watering indicator */}
                  {wateringMode && flower.growth < 100 && (
                    <motion.div
                      className="absolute -top-4 -right-4"
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      <Droplets className="w-5 h-5 text-blue-400 drop-shadow-lg" />
                    </motion.div>
                  )}
                  
                  {/* Sparkles for fully grown */}
                  {flower.growth >= 100 && (
                    <>
                      <motion.div
                        className="absolute -top-2 -left-2"
                        animate={{ 
                          scale: [1, 1.5, 1],
                          opacity: [1, 0, 1],
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <Sparkles className="w-4 h-4 text-yellow-400" />
                      </motion.div>
                      <motion.div
                        className="absolute -bottom-2 -right-2"
                        animate={{ 
                          scale: [1, 1.5, 1],
                          opacity: [1, 0, 1],
                        }}
                        transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                      >
                        <Sparkles className="w-4 h-4 text-pink-400" />
                      </motion.div>
                    </>
                  )}
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Dialog */}
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogContent className="bg-card/95 backdrop-blur-md border-rose-light/30 shadow-romantic max-w-md">
            <DialogHeader>
              <DialogTitle className="text-2xl font-elegant text-gradient-romantic text-center">
                A Precious Memory 💕
              </DialogTitle>
            </DialogHeader>
            <motion.div 
              className="py-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="mb-6 flex justify-center">
                <motion.div
                  animate={{
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <span className="text-6xl">🌸</span>
                </motion.div>
              </div>
              <p className="text-lg font-romantic text-center text-foreground leading-relaxed">
                {selectedMemory}
              </p>
              <div className="mt-6 flex justify-center gap-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className="text-2xl"
                  >
                    ✨
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Garden;
