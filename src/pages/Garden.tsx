import { useState, useRef, useEffect, useMemo, Suspense } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Heart, Sparkles, Wind } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Environment,
  MeshTransmissionMaterial,
  Float,
  AccumulativeShadows,
  RandomizedLight,
  useCursor,
  Html,
  CameraControls,
  Sparkles as R3FSparkles
} from "@react-three/drei";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";

// --- DATA ---
type MemoryCrystal = {
  id: number;
  memory: string;
  position: [number, number, number];
  color: string;
  scale: number;
  hanging: boolean;
};

// PRECISE ALIGNMENT RETAINED
const initialMemories = [
  { id: 1, memory: "The way you laugh moving your upper body forward is so.", color: "#ff69b4", position: [3, 6, 0], scale: 1 },
  { id: 2, memory: "Your hazel eyes, I actually can take a deep dive into them.", color: "#ffd700", position: [0.92, 6, 2.85], scale: 1.2 },
  { id: 3, memory: "Holding hands in the cinema, while walking. Staring at you while you're eating.", color: "#da70d6", position: [-2.42, 6, 1.76], scale: 0.9 },
  { id: 4, memory: "When you lose a game, but you never lose, so you never lost.", color: "#ffb6c1", position: [-2.42, 6, -1.76], scale: 1.1 },
  { id: 5, memory: "Singing random songs while we're walking.", color: "#ff1493", position: [0.92, 6, -2.85], scale: 1 },
  { id: 6, memory: "The way you look at me when I crack a bad joke.", color: "#e6e6fa", position: [4.5, 8, 0], scale: 1.4 },
  { id: 7, memory: "The snickers you give that always come in clutch.", color: "#db7093", position: [-3.6, 8, 2.6], scale: 1 },
  { id: 8, memory: "Every time you look at me with those eyes.", color: "#dda0dd", position: [-3.6, 8, -2.6], scale: 0.8 },
];

// --- 3D COMPONENTS ---

// 1. Crystal Heart Geometry & Material
const CrystalHeart = ({
  position,
  color,
  scale,
  onClick,
  isHanging,
  windStrength
}: {
  position: [number, number, number],
  color: string,
  scale: number,
  onClick: () => void,
  isHanging: boolean,
  windStrength: number
}) => {
  const meshRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const [clickedTime, setClickedTime] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useCursor(hovered);

  const handleClick = () => {
    setIsAnimating(true);
    setClickedTime(Date.now());
    onClick();
    setTimeout(() => setIsAnimating(false), 1000);
  };

  useFrame((state) => {
    if (!meshRef.current) return;

    const time = state.clock.elapsedTime;

    if (isAnimating) {
      meshRef.current.rotation.y += 0.5;
      const pulse = Math.sin((Date.now() - clickedTime) * 0.02) * 0.5 + 1;
      const animScale = scale * 0.25 * (pulse > 1 ? pulse : 1);
      meshRef.current.scale.set(animScale, animScale, animScale);
      meshRef.current.position.y += 0.01;
    } else if (isHanging) {
      const windX = Math.sin(time * 2 + position[0]) * (0.05 + windStrength * 0.1);
      const windZ = Math.cos(time * 1.5 + position[2]) * (0.05 + windStrength * 0.1);
      const pushScale = hovered ? 1.2 : 1.0;

      meshRef.current.rotation.z = THREE.MathUtils.lerp(meshRef.current.rotation.z, windX, 0.1);
      meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, windZ, 0.1);
      meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, position[1], 0.1);

      const finalScale = scale * 0.25 * pushScale;
      meshRef.current.scale.lerp(new THREE.Vector3(finalScale, finalScale, finalScale), 0.1);
    }
  });

  const heartShape = useMemo(() => {
    const x = 0, y = 0;
    const shape = new THREE.Shape();
    shape.moveTo(x + 0.5, y + 0.5);
    shape.bezierCurveTo(x + 0.5, y + 0.5, x + 0.4, y, x, y);
    shape.bezierCurveTo(x - 0.6, y, x - 0.6, y + 0.7, x - 0.6, y + 0.7);
    shape.bezierCurveTo(x - 0.6, y + 1.1, x - 0.3, y + 1.54, x + 0.5, y + 1.9);
    shape.bezierCurveTo(x + 1.2, y + 1.54, x + 1.6, y + 1.1, x + 1.6, y + 0.7);
    shape.bezierCurveTo(x + 1.6, y + 0.7, x + 1.6, y, x + 1.0, y);
    shape.bezierCurveTo(x + 0.7, y, x + 0.5, y + 0.5, x + 0.5, y + 0.5);
    return shape;
  }, []);

  const gemColor = useMemo(() => new THREE.Color(color).convertSRGBToLinear(), [color]);

  return (
    <group
      ref={meshRef}
      position={position}
      onClick={(e) => { e.stopPropagation(); handleClick(); }}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {isHanging && !isAnimating && (
        <mesh position={[0, 1, 0]}>
          <cylinderGeometry args={[0.005, 0.005, 2]} />
          <meshStandardMaterial color="#d4af37" metalness={1} roughness={0.2} />
        </mesh>
      )}

      <mesh rotation={[0, 0, Math.PI]} position={[0, -0.5, 0]}>
        <extrudeGeometry args={[heartShape, { depth: 0.4, bevelEnabled: true, bevelSegments: 2, steps: 1, bevelSize: 0.05, bevelThickness: 0.05 }]} />
        <MeshTransmissionMaterial
          backside samples={2} thickness={0.5} roughness={0.2}
          transmission={1} color={gemColor} anisotropy={0.1} resolution={256}
          chromaticAberration={0.03} ior={1.4} distortion={0.1} distortionScale={0.3} temporalDistortion={0.1}
        />
      </mesh>

      <pointLight distance={1} intensity={isAnimating ? 5 : 2} color={color} />

      {(hovered || isAnimating) && (
        <R3FSparkles
          count={isAnimating ? 20 : 5}
          scale={isAnimating ? 3 : 1.5}
          size={isAnimating ? 5 : 2}
          speed={0.4}
          opacity={1}
          color="#fff"
        />
      )}
    </group>
  );
};

const GoldTree = () => {
  const branches = useMemo(() => {
    const b = [];
    b.push({ start: [0, -2, 0], end: [0, 6, 0], thickness: 0.25 });
    const angles = [0, 72, 144, 216, 288];
    angles.forEach(angle => {
      const rad = angle * Math.PI / 180;
      const x = Math.cos(rad) * 3;
      const z = Math.sin(rad) * 3;
      b.push({ start: [0, 6, 0], end: [x, 8, z], thickness: 0.12 });
      b.push({ start: [x, 8, z], end: [x * 1.5, 10, z * 1.5], thickness: 0.06 });
      b.push({ start: [x, 8, z], end: [x * 1.2 + 0.5, 9, z * 1.2 + 0.5], thickness: 0.05 });
    });
    return b;
  }, []);

  return (
    <group>
      {branches.map((branch, i) => {
        const start = new THREE.Vector3(...(branch.start as [number, number, number]));
        const end = new THREE.Vector3(...(branch.end as [number, number, number]));
        const mid = start.clone().add(end).multiplyScalar(0.5);
        const height = start.distanceTo(end);
        const direction = end.clone().sub(start).normalize();
        const quaternion = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction);

        return (
          <mesh key={i} position={mid} quaternion={quaternion} castShadow receiveShadow>
            <cylinderGeometry args={[branch.thickness * 0.7, branch.thickness, height, 6]} />
            <meshStandardMaterial color="#e6c288" roughness={0.2} metalness={0.8} envMapIntensity={1.5} />
          </mesh>
        );
      })}
    </group>
  );
};

const Garden = () => {
  const [memories, setMemories] = useState(initialMemories);
  const [selectedMemory, setSelectedMemory] = useState<MemoryCrystal | null>(null);
  const [windStrength, setWindStrength] = useState(0);

  const cameraRef = useRef<CameraControls>(null);

  const handleCrystalClick = (id: number) => {
    const memory = memories.find(m => m.id === id);
    if (memory) {
      setSelectedMemory(memory as any);
      cameraRef.current?.setLookAt(
        memory.position[0] * 1.2, memory.position[1], memory.position[2] * 2,
        memory.position[0], memory.position[1], memory.position[2],
        true
      );
    }
  };

  const handleClose = () => {
    setSelectedMemory(null);
    cameraRef.current?.setLookAt(0, 8, 16, 0, 4, 0, true);
  };

  return (
    <div className="relative w-full h-screen bg-[#2c1810] overflow-hidden font-serif">
      {/* NEW BACKGROUND: Magic Hour Gradient (Peachy/Purple/Blue) */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a0b2e] via-[#4a1c40] to-[#762036] opacity-100 z-0"></div>

      <Canvas shadows camera={{ position: [0, 8, 16], fov: 45 }} dpr={[1, 2]}>
        {/* Matches the Gradient Bottom */}
        <fog attach="fog" args={['#762036', 10, 35]} />

        <ambientLight intensity={0.8} color="#ffd700" />
        <spotLight position={[10, 15, 5]} angle={0.25} penumbra={1} intensity={2.5} castShadow color="#ff69b4" />
        <spotLight position={[-10, 8, -5]} angle={0.25} penumbra={1} intensity={2.5} color="#ffd700" />

        <Environment preset="city" />

        <group position={[0, -4, 0]}>
          <GoldTree />

          {memories.map(m => (
            <CrystalHeart
              key={m.id}
              position={m.position as [number, number, number]}
              color={m.color}
              scale={m.scale}
              isHanging={true}
              onClick={() => handleCrystalClick(m.id)}
              windStrength={windStrength}
            />
          ))}

          {/* Floor Material: Reflective Pool (Not Maroon) */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} receiveShadow>
            <planeGeometry args={[100, 100]} />
            <MeshTransmissionMaterial
              backside samples={2} thickness={0.5} roughness={0.1}
              transmission={0.8} color="#ffdddd" anisotropy={0.1} resolution={256}
            />
          </mesh>

          <R3FSparkles count={80} scale={15} size={3} speed={0.2} opacity={0.6} color="#ffeebb" />
        </group>

        <CameraControls ref={cameraRef} minPolarAngle={0} maxPolarAngle={Math.PI / 2} />
      </Canvas>

      {/* --- UI OVERLAY --- */}
      <div className="absolute inset-0 pointer-events-none p-8 z-10 flex flex-col justify-between">
        <div className="w-full flex justify-between items-start">
          <Link to="/" className="pointer-events-auto inline-block">
            <Button variant="ghost" className="text-rose-100 hover:bg-white/20 hover:text-white gap-2 border border-white/20 rounded-full px-6">
              <ArrowLeft className="w-4 h-4" /> Exit
            </Button>
          </Link>

          <div className="text-right">
            <h1 className="text-4xl text-transparent bg-clip-text bg-gradient-to-br from-white to-rose-200 drop-shadow-lg tracking-widest font-thin">
              CRYSTAL MEMORIES
            </h1>
            <p className="text-rose-200/70 text-xs uppercase tracking-[0.3em] mt-2">
              Touch a heart to remember
            </p>
          </div>
        </div>

        <div className="pointer-events-auto flex items-center justify-center gap-4 mb-4">
          <div className="bg-white/10 backdrop-blur-md p-4 rounded-full border border-white/20 flex items-center gap-4 text-white shadow-lg">
            <Wind className="w-5 h-5 text-rose-200" />
            <span className="text-xs uppercase tracking-widest font-sans w-20">Wind Power</span>
            <Slider
              defaultValue={[0]}
              max={5}
              step={1}
              className="w-32"
              onValueChange={(vals) => setWindStrength(vals[0])}
            />
            <span className="text-xs font-mono font-bold w-4 text-center">{windStrength}</span>
          </div>
        </div>
      </div>

      <Dialog open={selectedMemory !== null} onOpenChange={handleClose}>
        <DialogContent className="border-none bg-transparent shadow-none max-w-lg">
          {selectedMemory && (
            <motion.div
              initial={{ rotateX: 90, opacity: 0 }}
              animate={{ rotateX: 0, opacity: 1 }}
              exit={{ rotateX: -90, opacity: 0 }}
              className="bg-black/60 backdrop-blur-2xl border border-rose-400/30 p-10 rounded-sm text-center shadow-[0_0_50px_rgba(255,105,180,0.3)]"
            >
              <div className="flex justify-center mb-6">
                <Heart className="w-12 h-12 text-rose-300 fill-rose-400/20 drop-shadow-[0_0_15px_rgba(255,105,180,0.8)]" />
              </div>

              <p className="text-2xl font-light leading-relaxed text-white font-serif italic">
                "{selectedMemory.memory}"
              </p>

              <div className="mt-8 w-full h-[1px] bg-gradient-to-r from-transparent via-rose-400/50 to-transparent"></div>
            </motion.div>
          )}
        </DialogContent>
      </Dialog>

    </div>
  );
};

export default Garden;
