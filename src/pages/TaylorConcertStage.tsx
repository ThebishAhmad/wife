import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Music, Sparkles, Heart, Star, Zap, Play, Pause, Users, Flame, Camera, Wand2, Infinity as InfinityIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { FloatingHearts } from "@/components/FloatingHearts";
import { motion, AnimatePresence } from "framer-motion";
import FallingText from "@/components/ui/FallingText";

const eras = [
  { name: "Lover", color: "from-pink-400 via-rose-400 to-purple-400", audioFile: "/src/assets/our-song.mp3" },
  { name: "1989", color: "from-cyan-400 via-blue-400 to-indigo-400", audioFile: "/src/assets/our-song.mp3" },
  { name: "Reputation", color: "from-gray-800 via-slate-700 to-black", audioFile: "/src/assets/our-song.mp3" },
  { name: "Red", color: "from-red-600 via-rose-500 to-pink-500", audioFile: "/src/assets/our-song.mp3" },
  { name: "Folklore", color: "from-gray-400 via-slate-300 to-gray-200", audioFile: "/src/assets/our-song.mp3" },
];

const TaylorConcertStage = () => {
  const [currentEra, setCurrentEra] = useState(0);
  const [lights, setLights] = useState([80]);
  const [confetti, setConfetti] = useState(false);
  const [crowdVolume, setCrowdVolume] = useState([70]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [pyrotechnics, setPyrotechnics] = useState(false);
  const [spotlight, setSpotlight] = useState(false);
  const [dancers, setDancers] = useState(false);
  const [cameraFlash, setCameraFlash] = useState(false);
  const [smokeEffect, setSmokeEffect] = useState(false);
  const [laserShow, setLaserShow] = useState(false);
  const [loveMode, setLoveMode] = useState(false);
  const [timeFreezeEffect, setTimeFreezeEffect] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const era = eras[currentEra];

  const triggerConfetti = () => {
    setConfetti(true);
    setTimeout(() => setConfetti(false), 3000);
  };

  const triggerPyrotechnics = () => {
    setPyrotechnics(true);
    setTimeout(() => setPyrotechnics(false), 2000);
  };

  const triggerCameraFlash = () => {
    setCameraFlash(true);
    setTimeout(() => setCameraFlash(false), 500);
  };

  const triggerEpicFinale = () => {
    setLights([100]);
    setCrowdVolume([100]);
    triggerConfetti();
    triggerPyrotechnics();
    setSpotlight(true);
    setDancers(true);
    setSmokeEffect(true);
    setLaserShow(true);
    setLoveMode(true);
    
    // Sequence of effects
    setTimeout(() => triggerCameraFlash(), 500);
    setTimeout(() => triggerConfetti(), 1000);
    setTimeout(() => triggerPyrotechnics(), 1500);
    setTimeout(() => triggerCameraFlash(), 2000);
    setTimeout(() => triggerConfetti(), 2500);
    
    // Reset after finale
    setTimeout(() => {
      setSpotlight(false);
      setSmokeEffect(false);
      setLaserShow(false);
      setLoveMode(false);
    }, 5000);
  };

  const triggerTimeFreeze = () => {
    setTimeFreezeEffect(true);
    setTimeout(() => setTimeFreezeEffect(false), 3000);
  };

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      if (era.audioFile) {
        audio.src = era.audioFile;
        audio.play();
      }
    }
    setIsPlaying(!isPlaying);
  };

  const changeEra = (index: number) => {
    if (isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(false);
    }
    setCurrentEra(index);
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <FloatingHearts />

      {/* Stage lighting effect */}
      <div
        className={`absolute inset-0 bg-gradient-to-b ${era.color} transition-all duration-1000`}
        style={{ opacity: lights[0] / 100 }}
      />

      {/* Confetti effect */}
      <AnimatePresence>
        {confetti && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden z-40">
            {Array.from({ length: 150 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ 
                  top: "-10%", 
                  left: `${Math.random() * 100}%`,
                  rotate: 0,
                  scale: Math.random() * 0.5 + 0.5,
                }}
                animate={{ 
                  top: "110%",
                  rotate: 360 * (Math.random() > 0.5 ? 1 : -1),
                }}
                exit={{ opacity: 0 }}
                transition={{ 
                  duration: Math.random() * 2 + 2,
                  ease: "linear",
                }}
                className="absolute w-3 h-3"
                style={{
                  background: `hsl(${Math.random() * 360}, 100%, 70%)`,
                  borderRadius: Math.random() > 0.5 ? "50%" : "0",
                }}
              />
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Pyrotechnics effect */}
      <AnimatePresence>
        {pyrotechnics && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {Array.from({ length: 50 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ 
                  bottom: "0%", 
                  left: `${Math.random() * 100}%`,
                  scale: 0,
                }}
                animate={{ 
                  bottom: `${50 + Math.random() * 50}%`,
                  scale: [0, 1, 0],
                }}
                exit={{ opacity: 0 }}
                transition={{ 
                  duration: 1 + Math.random(),
                  ease: "easeOut",
                }}
                className="absolute w-2 h-8 bg-gradient-to-t from-orange-500 via-yellow-400 to-transparent"
              />
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Spotlight effect */}
      {spotlight && (
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            animate={{
              x: ["30%", "70%", "30%"],
              y: ["20%", "40%", "20%"],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute w-64 h-64 bg-white/30 rounded-full blur-3xl"
          />
        </div>
      )}

      {/* Camera flash effect */}
      {cameraFlash && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 bg-white pointer-events-none z-50"
        />
      )}

      {/* Time freeze effect */}
      {timeFreezeEffect && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 10, opacity: 0.3 }}
          transition={{ duration: 3, ease: "easeOut" }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-50"
        >
          <InfinityIcon className="w-64 h-64 text-white" />
        </motion.div>
      )}

      {/* Love mode hearts */}
      {loveMode && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 100 }).map((_, i) => (
            <motion.div
              key={`love-${i}`}
              initial={{ 
                bottom: "-10%", 
                left: `${Math.random() * 100}%`,
                scale: Math.random() * 0.5 + 0.5,
              }}
              animate={{ 
                bottom: "110%",
                x: [0, Math.sin(i) * 100, 0],
              }}
              transition={{ 
                duration: Math.random() * 3 + 2,
                ease: "linear",
                repeat: Infinity,
              }}
              className="absolute"
            >
              <Heart className="text-pink-400 fill-pink-400" style={{ width: `${10 + Math.random() * 20}px` }} />
            </motion.div>
          ))}
        </div>
      )}

      {/* Laser show effect */}
      {laserShow && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={`laser-${i}`}
              animate={{
                rotate: [0, 360],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.1,
              }}
              className="absolute w-1 h-screen bg-gradient-to-t from-transparent via-cyan-400 to-transparent"
              style={{
                left: `${(i / 20) * 100}%`,
                transformOrigin: 'bottom',
              }}
            />
          ))}
        </div>
      )}

      {/* Smoke effect */}
      {smokeEffect && (
        <div className="absolute bottom-0 left-0 right-0 h-64 pointer-events-none">
          {Array.from({ length: 15 }).map((_, i) => (
            <motion.div
              key={`smoke-${i}`}
              animate={{
                y: [-50, -200],
                opacity: [0.6, 0],
                scale: [1, 2],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: i * 0.3,
              }}
              className="absolute w-32 h-32 bg-white/20 rounded-full blur-3xl"
              style={{
                left: `${(i / 15) * 100}%`,
              }}
            />
          ))}
        </div>
      )}

      {/* Backup dancers effect */}
      {dancers && (
        <div className="absolute bottom-20 left-0 right-0 flex justify-center gap-8 pointer-events-none">
          {Array.from({ length: 5 }).map((_, i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -30, 0],
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.1,
              }}
              className="w-8 h-20 bg-gradient-to-t from-white/40 to-transparent rounded-full"
            />
          ))}
        </div>
      )}

      {/* Crowd wave effect */}
      <div className="absolute bottom-0 left-0 right-0 h-32 overflow-hidden">
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -20, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 1 + Math.random() * 0.5,
              repeat: Infinity,
              delay: i * 0.05,
            }}
            className="absolute bottom-0 w-4 h-16 bg-gradient-to-t from-white/40 to-transparent"
            style={{
              left: `${(i / 50) * 100}%`,
              opacity: crowdVolume[0] / 100,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        <Link to="/universe">
          <Button
            variant="outline"
            size="lg"
            className="mb-6 bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Universe
          </Button>
        </Link>

        <div className="text-center mb-8">
          <motion.h1
            key={era.name}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-6xl font-elegant font-bold text-white mb-4 animate-glow"
          >
            {era.name} Era 🎤
          </motion.h1>
          <div className="flex items-center justify-center gap-4">
            <p className="text-2xl font-romantic text-white/90 drop-shadow-lg">
              {era.audioFile ? "Ready to play" : "Add your song file!"}
            </p>
            <button
              onClick={togglePlay}
              disabled={!era.audioFile}
              className={`backdrop-blur-sm rounded-full p-3 transition-all ${
                era.audioFile 
                  ? 'bg-white/20 hover:bg-white/30 hover:scale-110' 
                  : 'bg-gray-500/20 cursor-not-allowed'
              }`}
            >
              {isPlaying ? (
                <Pause className="w-6 h-6 text-white fill-white" />
              ) : (
                <Play className="w-6 h-6 text-white fill-white" />
              )}
            </button>
          </div>
          <audio ref={audioRef} preload="auto" onEnded={() => setIsPlaying(false)} />
        </div>

        {/* Falling Text Animation */}
        <div className="max-w-4xl mx-auto mb-12 h-64">
          <FallingText
            text="You make my world feel real in a way nothing else does."
            highlightWords={["world", "real", "nothing"]}
            trigger="hover"
            backgroundColor="transparent"
            wireframes={false}
            gravity={0.56}
            fontSize="2rem"
            mouseConstraintStiffness={0.9}
            className="text-white"
          />
        </div>

        {/* Era selector */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="grid grid-cols-5 gap-4">
            {eras.map((e, index) => (
              <button
                key={e.name}
                onClick={() => changeEra(index)}
                className={`relative p-6 rounded-2xl transition-all duration-300 ${
                  currentEra === index
                    ? "scale-110 shadow-2xl"
                    : "hover:scale-105 opacity-70"
                }`}
              >
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${e.color}`} />
                <div className="relative z-10 text-white font-bold text-lg">
                  {e.name}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Control panel */}
        <div className="max-w-3xl mx-auto bg-black/50 backdrop-blur-xl rounded-3xl p-8 border-2 border-white/20">
          <h2 className="text-2xl font-elegant font-bold text-white mb-6 text-center">
            Concert Control Panel 🎛️
          </h2>

          <div className="space-y-8">
            {/* Stage Lights */}
            <div>
              <div className="flex items-center gap-3 mb-3">
                <Zap className="w-6 h-6 text-yellow-400" />
                <label className="text-white font-romantic text-lg">Stage Lights</label>
              </div>
              <Slider
                value={lights}
                onValueChange={setLights}
                max={100}
                step={1}
                className="w-full"
              />
              <p className="text-white/70 text-sm mt-2">{lights[0]}% brightness</p>
            </div>

            {/* Crowd Volume */}
            <div>
              <div className="flex items-center gap-3 mb-3">
                <Music className="w-6 h-6 text-pink-400" />
                <label className="text-white font-romantic text-lg">Crowd Energy</label>
              </div>
              <Slider
                value={crowdVolume}
                onValueChange={(value) => {
                  setCrowdVolume(value);
                  // Crowd energy now affects the wave animation speed
                }}
                max={100}
                step={1}
                className="w-full"
              />
              <p className="text-white/70 text-sm mt-2">{crowdVolume[0]}% volume - {crowdVolume[0] > 80 ? "Going wild!" : crowdVolume[0] > 50 ? "Getting excited!" : "Warming up..."}</p>
            </div>

            {/* Special Effects */}
            <div className="grid grid-cols-2 gap-4">
              <Button
                onClick={triggerConfetti}
                className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 h-16"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Launch Confetti
              </Button>
              <Button
                onClick={triggerPyrotechnics}
                className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 h-16"
              >
                <Flame className="w-5 h-5 mr-2" />
                Pyrotechnics
              </Button>
              <Button
                onClick={() => setSpotlight(!spotlight)}
                className={`bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 h-16 ${spotlight ? 'ring-2 ring-white' : ''}`}
              >
                <Zap className="w-5 h-5 mr-2" />
                Spotlight {spotlight ? 'ON' : 'OFF'}
              </Button>
              <Button
                onClick={() => setDancers(!dancers)}
                className={`bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 h-16 ${dancers ? 'ring-2 ring-white' : ''}`}
              >
                <Users className="w-5 h-5 mr-2" />
                Dancers {dancers ? 'ON' : 'OFF'}
              </Button>
              <Button
                onClick={triggerCameraFlash}
                className="bg-gradient-to-r from-blue-400 to-cyan-500 hover:from-blue-500 hover:to-cyan-600 h-16"
              >
                <Camera className="w-5 h-5 mr-2" />
                Camera Flash
              </Button>
              <Button
                onClick={() => setSmokeEffect(!smokeEffect)}
                className={`bg-gradient-to-r from-gray-400 to-slate-500 hover:from-gray-500 hover:to-slate-600 h-16 ${smokeEffect ? 'ring-2 ring-white' : ''}`}
              >
                <Wand2 className="w-5 h-5 mr-2" />
                Smoke {smokeEffect ? 'ON' : 'OFF'}
              </Button>
              <Button
                onClick={() => setLaserShow(!laserShow)}
                className={`bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 h-16 ${laserShow ? 'ring-2 ring-white' : ''}`}
              >
                <Zap className="w-5 h-5 mr-2" />
                Lasers {laserShow ? 'ON' : 'OFF'}
              </Button>
              <Button
                onClick={triggerTimeFreeze}
                className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 h-16"
              >
                <InfinityIcon className="w-5 h-5 mr-2" />
                Time Freeze
              </Button>
              <Button
                onClick={() => setLoveMode(!loveMode)}
                className={`bg-gradient-to-r from-pink-400 to-rose-500 hover:from-pink-500 hover:to-rose-600 h-16 ${loveMode ? 'ring-2 ring-white' : ''}`}
              >
                <Heart className="w-5 h-5 mr-2" />
                Love Mode {loveMode ? 'ON' : 'OFF'}
              </Button>
              <Button
                onClick={triggerEpicFinale}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 h-16 col-span-2"
              >
                <Star className="w-5 h-5 mr-2" />
                Epic Finale ✨
              </Button>
            </div>
          </div>

          <div className="mt-8 p-6 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-2xl border border-white/20">
            <Heart className="w-8 h-8 text-rose-400 mx-auto mb-3 animate-pulse" />
            <p className="text-white text-center font-romantic">
              You're the director of this love story concert, Unnati. 
              Every moment with you feels like the most magical era of my life. 💕
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaylorConcertStage;
