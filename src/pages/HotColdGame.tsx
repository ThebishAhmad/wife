import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FloatingHearts } from "@/components/FloatingHearts";
import { ArrowLeft, Heart, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import Crosshair from "@/components/ui/Crosshair";
import { motion } from "framer-motion";

const HotColdGame = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [targetPos, setTargetPos] = useState({
    x: Math.random() * 80 + 10,
    y: Math.random() * 60 + 20,
  });
  const [decoyHearts, setDecoyHearts] = useState<Array<{ x: number; y: number; id: number }>>([]);
  const [distance, setDistance] = useState(100);
  const [found, setFound] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120);
  const [obstacles, setObstacles] = useState<Array<{ x: number; y: number; size: number }>>([]);
  const [attempts, setAttempts] = useState(0);
  const [hints, setHints] = useState(3);
  const [showHint, setShowHint] = useState(false);
  const [pulseIntensity, setPulseIntensity] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [trail, setTrail] = useState<Array<{ x: number; y: number; id: number }>>([]);

  // Initialize decoy hearts and obstacles
  useEffect(() => {
    const decoys = Array.from({ length: 8 }, (_, i) => ({
      x: Math.random() * 80 + 10,
      y: Math.random() * 60 + 20,
      id: i
    }));
    setDecoyHearts(decoys);

    const obs = Array.from({ length: 15 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 15 + 10
    }));
    setObstacles(obs);
  }, []);

  // Timer countdown
  useEffect(() => {
    if (found || timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [found, timeLeft]);

  // Move target occasionally to make it harder
  useEffect(() => {
    if (found) return;
    const moveInterval = setInterval(() => {
      setTargetPos({
        x: Math.random() * 80 + 10,
        y: Math.random() * 60 + 20,
      });
    }, 15000); // Move every 15 seconds
    return () => clearInterval(moveInterval);
  }, [found]);

  // Mouse trail effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      
      // Add trail particle
      setTrail(prev => [...prev.slice(-8), { x, y, id: Date.now() }]);
      
      setMousePos({ x, y });

      const dist = Math.sqrt(
        Math.pow(x - targetPos.x, 2) + Math.pow(y - targetPos.y, 2)
      );
      setDistance(dist);

      // Set pulse intensity based on distance
      setPulseIntensity(Math.max(0, 1 - dist / 50));

      // Made harder: smaller detection radius
      if (dist < 2.5 && !found) {
        setFound(true);
        setAttempts((prev) => prev + 1);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [targetPos, found]);

  const getTemperature = () => {
    if (distance < 5) return { text: "🔥 BURNING HOT!", color: "from-red-500 to-orange-500" };
    if (distance < 15) return { text: "🌡️ Very Warm", color: "from-orange-400 to-yellow-400" };
    if (distance < 30) return { text: "☀️ Warm", color: "from-yellow-300 to-amber-300" };
    if (distance < 50) return { text: "🌤️ Cool", color: "from-blue-300 to-cyan-300" };
    return { text: "❄️ Freezing Cold", color: "from-blue-500 to-purple-500" };
  };

  const useHint = () => {
    if (hints > 0 && !found) {
      setHints(prev => prev - 1);
      setShowHint(true);
      setTimeout(() => setShowHint(false), 2000);
    }
  };

  const temp = getTemperature();

  return (
    <div
      ref={containerRef}
      className="min-h-screen relative overflow-hidden transition-all duration-500"
      style={{
        background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, 
                     ${distance < 20 ? "hsl(0, 100%, 50%)" : 
                       distance < 40 ? "hsl(30, 100%, 50%)" : 
                       "hsl(220, 80%, 30%)"} 0%, 
                     hsl(250, 70%, 20%) 100%)`,
        transform: distance < 10 ? `scale(${1 + pulseIntensity * 0.02})` : 'scale(1)',
      }}
    >
      <Crosshair containerRef={containerRef} color={distance < 20 ? "#ff6b6b" : "#ffffff"} />
      <FloatingHearts />

      {/* Mouse trail particles */}
      {trail.map((point, i) => (
        <motion.div
          key={point.id}
          initial={{ opacity: 0.6, scale: 1 }}
          animate={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed w-3 h-3 rounded-full pointer-events-none"
          style={{
            left: `${point.x}%`,
            top: `${point.y}%`,
            background: distance < 20 ? "rgba(255, 107, 107, 0.6)" : "rgba(255, 255, 255, 0.3)",
            transform: "translate(-50%, -50%)",
            zIndex: 1,
          }}
        />
      ))}

      <div className="relative z-10 container mx-auto px-4 py-12">
        <div className="text-center space-y-4 mb-8">
          <Link to="/universe">
            <Button
              variant="outline"
              size="lg"
              className="mb-4 bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Universe
            </Button>
          </Link>
          <h1 className="text-4xl sm:text-5xl font-elegant font-bold text-white animate-glow">
            Hot & Cold Love Hunt 💝
          </h1>
          <p className="text-lg font-romantic text-white/90 max-w-2xl mx-auto">
            Find my hidden heart before time runs out!
          </p>
          <div className="flex gap-4 justify-center mt-4 flex-wrap">
            <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
              <p className="text-white font-romantic">⏰ Time: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
              <p className="text-white font-romantic">🎯 Attempts: {attempts}</p>
            </div>
            <Button
              onClick={useHint}
              disabled={hints === 0 || found}
              className="bg-white/10 backdrop-blur-sm border border-white/30 text-white hover:bg-white/20"
              size="sm"
            >
              <Zap className="w-4 h-4 mr-1" />
              Hints: {hints}
            </Button>
          </div>
        </div>

        {/* Temperature Display */}
        <div className="flex justify-center mb-8">
          <motion.div
            animate={{ 
              scale: distance < 10 ? [1, 1.1, 1] : 1,
              rotate: distance < 5 ? [0, 5, -5, 0] : 0
            }}
            transition={{ 
              duration: 0.5, 
              repeat: distance < 10 ? Infinity : 0 
            }}
            className={`bg-gradient-to-r ${temp.color} px-8 py-4 rounded-full shadow-romantic`}
          >
            <p className="text-2xl font-elegant font-bold text-white">
              {temp.text}
            </p>
          </motion.div>
        </div>

        {/* Hint Arrow */}
        {showHint && !found && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50"
            style={{
              transform: `translate(-50%, -50%) rotate(${Math.atan2(targetPos.y - mousePos.y, targetPos.x - mousePos.x)}rad)`,
            }}
          >
            <div className="text-white text-6xl animate-pulse">→</div>
          </motion.div>
        )}

        {/* Obstacles - confusing visual noise */}
        {obstacles.map((obs, i) => (
          <div
            key={i}
            className="fixed rounded-full bg-white/5 backdrop-blur-sm animate-pulse"
            style={{
              left: `${obs.x}%`,
              top: `${obs.y}%`,
              width: `${obs.size}px`,
              height: `${obs.size}px`,
              transform: "translate(-50%, -50%)",
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}

        {/* Decoy hearts - misleading */}
        {decoyHearts.map((decoy) => (
          <Heart
            key={decoy.id}
            className="fixed w-8 h-8 fill-pink-400/30 text-pink-400/30 animate-pulse"
            style={{
              left: `${decoy.x}%`,
              top: `${decoy.y}%`,
              transform: "translate(-50%, -50%)",
              animationDuration: `${1 + Math.random()}s`,
            }}
          />
        ))}

        {/* Hidden Heart Target (invisible until found) */}
        {found && (
          <Heart
            className="fixed w-20 h-20 fill-rose text-rose animate-heartbeat"
            style={{
              left: `${targetPos.x}%`,
              top: `${targetPos.y}%`,
              transform: "translate(-50%, -50%)",
              filter: "drop-shadow(0 0 30px hsl(340, 82%, 65%))",
              zIndex: 100,
            }}
          />
        )}

        {/* Time's up overlay */}
        {timeLeft === 0 && !found && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center">
            <div className="bg-card/90 backdrop-blur-md border-rose-light/30 shadow-romantic rounded-2xl p-8 max-w-md">
              <h2 className="text-3xl font-elegant text-gradient-romantic text-center mb-4">
                Time's Up! ⏰
              </h2>
              <p className="text-xl font-romantic text-center text-foreground leading-relaxed">
                My heart was too well hidden this time. But don't worry, I'll always be here waiting for you to find me again. 
              </p>
              <Button 
                onClick={() => window.location.reload()} 
                className="w-full mt-6 bg-gradient-to-r from-rose-500 to-pink-500"
              >
                Try Again
              </Button>
            </div>
          </div>
        )}
      </div>

      <Dialog open={found} onOpenChange={setFound}>
        <DialogContent className="bg-card/95 backdrop-blur-md border-rose-light/30 shadow-romantic">
          <DialogHeader>
            <DialogTitle className="text-2xl font-elegant text-gradient-romantic text-center">
              You Found My Heart Again! 💖
            </DialogTitle>
          </DialogHeader>
          <div className="py-6">
            <p className="text-xl font-romantic text-center text-foreground leading-relaxed">
              No matter where I hide it, you always find your way to my heart. Thats because it's always been yours.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default HotColdGame;
