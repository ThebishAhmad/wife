import { Heart, Camera, MessageCircle, Music, Play, Pause, ArrowLeft, Cloud } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect, Suspense, useMemo } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, ContactShadows, Text, useGLTF } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import * as THREE from "three";

import FirstImage from "@/assets/first.jpg";
import StuckTogetherImage from "@/assets/stucktogether.jpg";
import DelhiImage from "@/assets/delhi.jpg";
import TrainTimeImage from "@/assets/traintime.jpg";
import MovieImage from "@/assets/movie.jpg";
import MissingTrainImage from "@/assets/missingtrain.jpg";


import AnyoneElseButYou from "@/assets/theatre_anyoneelsebutyou.mp3";
import MissingTrainRun from "@/assets/missingtrain_run_.mp3";
import TraintimeGoldrush from "@/assets/traintime_goldrush.mp3";
import PaperringsFirstDate from "@/assets/paperrings_firstdate.mp3";
import LoverDelhi from "@/assets/Lover_Delhi.mp3";
import YouAreInLove from "@/assets/youareinlove_stucktogether.mp3";

// --- 3D COMPONENTS (V2: Bright & Playful) ---

// A cute bubbly custom 3D Heart geometry
const BubblyHeart = ({ position, color, scale, speed, rotationIntensity }: any) => {
  const meshRef = useRef<THREE.Mesh>(null);

  // Create a heart shape
  const heartShape = useMemo(() => {
    const x = 0, y = 0;
    const heartShape = new THREE.Shape();
    heartShape.moveTo(x + 0.5, y + 0.5);
    heartShape.bezierCurveTo(x + 0.5, y + 0.5, x + 0.4, y, x, y);
    heartShape.bezierCurveTo(x - 0.6, y, x - 0.6, y + 0.7, x - 0.6, y + 0.7);
    heartShape.bezierCurveTo(x - 0.6, y + 1.1, x - 0.3, y + 1.54, x + 0.5, y + 1.9);
    heartShape.bezierCurveTo(x + 1.2, y + 1.54, x + 1.6, y + 1.1, x + 1.6, y + 0.7);
    heartShape.bezierCurveTo(x + 1.6, y + 0.7, x + 1.6, y, x + 1.0, y);
    heartShape.bezierCurveTo(x + 0.7, y, x + 0.5, y + 0.5, x + 0.5, y + 0.5);
    return heartShape;
  }, []);

  return (
    <Float speed={speed} rotationIntensity={rotationIntensity} floatIntensity={1.5} floatingRange={[-0.2, 0.2]}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <extrudeGeometry args={[heartShape, { depth: 0.4, bevelEnabled: true, bevelSegments: 2, steps: 2, bevelSize: 0.1, bevelThickness: 0.1 }]} />
        <meshPhysicalMaterial
          color={color}
          roughness={0.2}
          clearcoat={1}
          clearcoatRoughness={0.1}
          metalness={0.1}
        />
      </mesh>
    </Float>
  );
};

const CloudPuff = ({ position, scale, opacity = 0.8 }: any) => {
  return (
    <Float speed={0.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh position={position} scale={scale}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshStandardMaterial color="white" transparent opacity={opacity} roughness={0.9} />
      </mesh>
    </Float>
  )
}

const BackgroundSceneV2 = () => {
  return (
    <>
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 10, 5]} intensity={1.5} color="#fff0f5" />
      
      {/* Simple gradient background instead of Environment preset */}
      <color attach="background" args={["#fff0f5"]} />

      {/* Playful Floating Hearts */}
      <BubblyHeart position={[-2, 1, -4]} color="#ff6b95" scale={0.5} speed={2} rotationIntensity={1} />
      <BubblyHeart position={[2.5, -0.5, -3]} color="#ff9eb5" scale={0.4} speed={2.5} rotationIntensity={1.5} />
      <BubblyHeart position={[0, 2, -6]} color="#ff3366" scale={0.6} speed={1.5} rotationIntensity={0.5} />
      <BubblyHeart position={[-3, -2, -5]} color="#ffb7c5" scale={0.45} speed={1.8} rotationIntensity={1.2} />
      <BubblyHeart position={[3, 2.5, -7]} color="#ff8da1" scale={0.7} speed={1} rotationIntensity={0.8} />

      {/* Fluffy Clouds Background */}
      <CloudPuff position={[-4, -1, -8]} scale={1.5} opacity={0.4} />
      <CloudPuff position={[4, 1, -10]} scale={2} opacity={0.3} />
      <CloudPuff position={[0, -3, -5]} scale={1.2} opacity={0.2} />

      <ContactShadows position={[0, -4, 0]} opacity={0.4} scale={20} blur={2} far={4.5} />
    </>
  );
};

// --- DATA ---

const moments = [
  "The time you entered the door to Peddler's, I knew this was it.",
  "When you looked at me and I forgot every word I knew.",
  "When we laughed at nothing and everything.",
  "When we went to restricted areas just to be together.",
  "When we got caught by the Police and taken to the Police station.",
  "The moment where we went to a restricted door, shouted 'HELLO' and ran away laughing.",
  "Every time you said my name and it sounded like a prayer.",
  "When you missed the train but we had our first dinner.",
  "The first video call we had and we were just laughing non stop.",
  "All the goodbyes that led to the next hello.",
  "When we met in PU and you had no clue."
];

const cardDetails = [
  {
    title: "First Date",
    fullStory: "The nervousness, the excitement, the butterflies. Everything felt magical.",
    song: PaperringsFirstDate,
    songName: "Paper Rings",
    memory: "The day I learned the color of your eyes, unforgettable."
  },
  {
    title: "Stuck in CU",
    fullStory: "Surprise you in PU? Surprised to see you. Surprised in CU.",
    song: YouAreInLove,
    songName: "You Are In Love",
    memory: "I was stuck, but you were by my side."
  },
  {
    title: "Train Ride together?",
    fullStory: "From a few hours date to an entire journey together. We never knew where we'd be the next minute.",
    song: TraintimeGoldrush,
    songName: "Gold Rush",
    memory: "Only we know what was said that day."
  },
  {
    title: "Missed the Train",
    fullStory: "No one knew and no one got to know? That's crazy. You literally boarded a different train and no one had a clue.",
    song: MissingTrainRun,
    songName: "Run",
    memory: "The Dinner Date."
  },
  {
    title: "Watching a movie together",
    fullStory: "I don't ever remember the movie name. You looked cute though. You were the movie to me.",
    song: AnyoneElseButYou,
    songName: "Anyone Else But You",
    memory: "The texts during the movie"
  },
  {
    title: "The Delhi surprise",
    fullStory: "Only 10 minutes but not a second wasted.",
    song: LoverDelhi,
    songName: "Lover",
    memory: "Maybe that was the beauty of it?"
  },
];

const cards = [
  { title: "First Date", src: FirstImage },
  { title: "Stuck Together", src: StuckTogetherImage },
  { title: "Train Time", src: TrainTimeImage },
  { title: "Missing Train", src: MissingTrainImage },
  { title: "Theatre", src: MovieImage },
  { title: "Delhi", src: DelhiImage },
];

const Moments = () => {
  const navigate = useNavigate();
  const [selectedCard, setSelectedCard] = useState<number | null>(null);

  // 🔊 AUDIO PLAYER
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const playPause = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    if (selectedCard === null && audioRef.current) {
      audioRef.current.pause();
      if (audioRef.current) audioRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  }, [selectedCard]);

  // V2 Animations - Bouncier and more playful
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const popVariants = {
    hidden: { scale: 0.8, opacity: 0, y: 30 },
    visible: {
      scale: 1,
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 200, damping: 12 }
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-rose-50 via-pink-50 to-white overflow-x-hidden font-sans">

      {/* 3D Background Canvas */}
      <div className="fixed inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 60 }} shadows>
          <Suspense fallback={null}>
            <BackgroundSceneV2 />
          </Suspense>
        </Canvas>
      </div>

      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Navbar */}
        <div className="container mx-auto px-6 py-6 flex justify-between items-center">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="text-rose-500 hover:bg-rose-100/50 hover:text-rose-600 transition-colors gap-2 rounded-full px-6 font-medium"
          >
            <ArrowLeft className="w-5 h-5 rounded-full" /> Back Home
          </Button>
        </div>

        {/* Hero Section */}
        <motion.div
          className="container mx-auto px-6 py-12 text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
        >
          <motion.h1
            className="text-6xl md:text-8xl font-black text-rose-500 tracking-tight mb-6 drop-shadow-sm"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            Moments <span className="text-pink-400">That</span> Made Us
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-rose-400 max-w-2xl mx-auto font-medium leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            A collection of our sweetest memories.
            <br /> <span className="text-rose-300 text-lg">Every heartbeat, a promise of forever.</span>
          </motion.p>
        </motion.div>

        {/* Timeline of Moments - Bubbly Cards */}
        <div className="container mx-auto px-6 py-12 max-w-4xl">
          <motion.div
            className="space-y-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {moments.map((moment, index) => (
              <motion.div
                key={index}
                variants={popVariants}
                whileHover={{ scale: 1.03, rotate: index % 2 === 0 ? 1 : -1 }}
                className="group relative bg-white/40 backdrop-blur-xl border border-white/60 rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(255,182,193,0.3)] transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="mt-1 p-3 bg-gradient-to-br from-rose-400 to-pink-400 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Heart className="w-6 h-6 text-white fill-white" />
                  </div>
                  <p className="text-xl text-rose-900/90 font-medium leading-relaxed">
                    {moment}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Photo Gallery Grid - Polaroid Style */}
        <div className="container mx-auto px-6 py-20 bg-white/30 backdrop-blur-sm mt-20 rounded-t-[3rem]">
          <motion.h2
            className="text-5xl font-black text-center text-rose-500 mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Our Gallery
          </motion.h2>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {cards.map((card, index) => (
              <motion.button
                key={index}
                variants={popVariants}
                whileHover={{ y: -15, scale: 1.02 }}
                onClick={() => setSelectedCard(index)}
                className="group relative bg-white p-4 pb-16 shadow-xl rounded-2xl rotate-1 hover:rotate-0 transition-all duration-500 ease-out border border-gray-100"
              >
                <div className="overflow-hidden rounded-xl aspect-[4/5] relative">
                  <img
                    src={card.src}
                    alt={card.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-rose-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="bg-white/90 p-3 rounded-full shadow-lg transform scale-0 group-hover:scale-100 transition-transform duration-300 delay-100">
                      <Play className="w-8 h-8 text-rose-500 fill-rose-500 ml-1" />
                    </div>
                  </div>
                </div>

                <h3 className="absolute bottom-6 left-0 right-0 text-center font-handwriting text-2xl font-bold text-gray-700 font-serif">
                  {card.title}
                </h3>
              </motion.button>
            ))}
          </motion.div>
        </div>

      </div>

      {/* Detail Modal - Clean & Elegant */}
      <Dialog open={selectedCard !== null} onOpenChange={() => setSelectedCard(null)}>
        <DialogContent className="max-w-4xl bg-white/95 backdrop-blur-2xl border-rose-100 p-0 overflow-hidden text-gray-800 rounded-3xl shadow-2xl">
          <DialogTitle className="sr-only">Memory Details</DialogTitle>
          <DialogDescription className="sr-only">View detailed story and listen to the memory</DialogDescription>
          {selectedCard !== null && (
            <div className="flex flex-col md:flex-row h-[80vh] md:h-[600px]">

              {/* Image Side */}
              <div className="w-full md:w-1/2 relative bg-rose-50">
                <img
                  src={cards[selectedCard].src}
                  className="w-full h-full object-cover mix-blend-multiply opacity-90"
                />
                <div className="absolute top-6 left-6">
                  <span className="bg-white/80 backdrop-blur px-4 py-1 rounded-full text-xs font-bold text-rose-500 uppercase tracking-widest shadow-sm">
                    Memory unlocked
                  </span>
                </div>
              </div>

              {/* Content Side */}
              <div className="w-full md:w-1/2 p-10 flex flex-col justify-center space-y-8 bg-white relative">
                <audio ref={audioRef} src={cardDetails[selectedCard].song}></audio>

                <div className="space-y-6">
                  <h2 className="text-4xl font-bold text-gray-800 mb-2 font-serif">
                    {cardDetails[selectedCard].title}
                  </h2>

                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-rose-100 rounded-xl">
                      <MessageCircle className="w-6 h-6 text-rose-500" />
                    </div>
                    <div>
                      <h4 className="text-sm uppercase tracking-wider text-gray-500 font-bold mb-1">The Story</h4>
                      <p className="text-gray-600 leading-relaxed text-lg">
                        {cardDetails[selectedCard].fullStory}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-rose-100 rounded-xl">
                      <Heart className="w-6 h-6 text-rose-500 fill-rose-500" />
                    </div>
                    <div>
                      <h4 className="text-sm uppercase tracking-wider text-gray-500 font-bold mb-1">Core Memory</h4>
                      <p className="text-rose-500 font-medium italic text-lg">
                        "{cardDetails[selectedCard].memory}"
                      </p>
                    </div>
                  </div>
                </div>

                {/* Music Player - Floating Style */}
                <div className="bg-rose-50 rounded-2xl p-4 border border-rose-100 mt-auto shadow-inner">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center border border-rose-100 animate-spin-slow">
                        <Music className="w-6 h-6 text-rose-400" />
                      </div>
                      <div>
                        <div className="text-xs text-rose-400 uppercase tracking-widest font-bold">Now Playing</div>
                        <div className="font-bold text-gray-800 line-clamp-1 text-lg">{cardDetails[selectedCard].songName}</div>
                      </div>
                    </div>

                    <Button
                      size="icon"
                      className="h-14 w-14 rounded-full bg-rose-500 hover:bg-rose-600 text-white shadow-lg shadow-rose-200 transition-all hover:scale-105"
                      onClick={playPause}
                    >
                      {isPlaying ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current ml-1" />}
                    </Button>
                  </div>
                </div>

              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Moments;
