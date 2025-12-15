import React, { useState, useRef, useEffect, Suspense, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, Stars, Float, Text, Center, OrbitControls, useTexture, MeshTransmissionMaterial, Sparkles as DreiSparkles, MeshReflectorMaterial, Circle } from '@react-three/drei';
import * as THREE from 'three';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Mic, Sparkles, Heart, Gift, Wind, Camera } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { toast } from 'sonner';
import birthdayPhoto from '@/assets/birthday.jpg';

// --- ERROR BOUNDARY ---
class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() { return { hasError: true }; }
  componentDidCatch(error: any, info: any) { console.error("Cake Error:", error, info); }
  render() {
    if (this.state.hasError) return <div className="text-white p-10 flex flex-col items-center"><h2>Oops! The party crashed.</h2><Button onClick={() => window.location.reload()} variant="outline" className="mt-4">Reset</Button></div>;
    return this.props.children;
  }
}

// --- AUDIO HOOK ---
const useMicrophone = (active: boolean) => {
  const [volume, setVolume] = useState(0);
  const audioContext = useRef<AudioContext | null>(null);
  const analyser = useRef<AnalyserNode | null>(null);
  const dataArray = useRef<Uint8Array | null>(null);
  const source = useRef<MediaStreamAudioSourceNode | null>(null);
  const rafId = useRef<number>();

  useEffect(() => {
    if (!active) return;
    async function startMic() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        audioContext.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        analyser.current = audioContext.current.createAnalyser();
        analyser.current.fftSize = 256;
        source.current = audioContext.current.createMediaStreamSource(stream);
        source.current.connect(analyser.current);
        dataArray.current = new Uint8Array(analyser.current.frequencyBinCount);
        function update() {
          if (!analyser.current || !dataArray.current) return;
          analyser.current.getByteFrequencyData(dataArray.current);
          const avg = dataArray.current.reduce((a, b) => a + b, 0) / dataArray.current.length;
          setVolume(Math.min(avg / 40, 1));
          rafId.current = requestAnimationFrame(update);
        }
        update();
      } catch (err) {
        console.error("Mic Error:", err);
      }
    }
    startMic();
    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      if (audioContext.current) audioContext.current.close();
    };
  }, [active]);
  return volume;
};

// --- FIREWORKS ---
const Firework = ({ position, color, delay }: { position: [number, number, number], color: string, delay: number }) => {
  const count = 150;
  const mesh = useRef<THREE.InstancedMesh>(null);
  const [exploded, setExploded] = useState(false);
  const time = useRef(0);
  const particles = useMemo(() => new Array(count).fill(0).map(() => ({
    vel: new THREE.Vector3((Math.random() - 0.5) * 20, (Math.random() - 0.5) * 20, (Math.random() - 0.5) * 20),
    life: 0.5 + Math.random() * 2
  })), []);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state, delta) => {
    if (!exploded && state.clock.elapsedTime > delay && state.clock.elapsedTime < delay + 0.1) setExploded(true);
    if (!exploded || !mesh.current) return;
    time.current += delta;
    particles.forEach((p, i) => {
      const speed = 1 - (time.current / p.life);
      if (speed < 0 || time.current > p.life) dummy.scale.set(0, 0, 0);
      else {
        const currentPos = p.vel.clone().multiplyScalar(time.current).add(new THREE.Vector3(...position));
        currentPos.y -= 2 * time.current * time.current;
        dummy.position.copy(currentPos);
        dummy.scale.setScalar(speed * 0.15);
      }
      dummy.updateMatrix();
      mesh.current!.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]} frustumCulled={false}>
      <sphereGeometry args={[0.5, 8, 8]} />
      <meshBasicMaterial color={color} toneMapped={false} />
    </instancedMesh>
  );
};

// --- SCENE COMPONENTS ---

const FloatingHearts = () => {
  const count = 50;
  const mesh = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const particles = useMemo(() => new Array(count).fill(0).map(() => ({
    pos: new THREE.Vector3((Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 5 - 2),
    speed: 0.2 + Math.random() * 0.5,
    scale: 0.2 + Math.random() * 0.3
  })), []);

  const heartShape = useMemo(() => {
    const shape = new THREE.Shape();
    const x = 0, y = 0;
    shape.moveTo(x + 0.25, y + 0.25);
    shape.bezierCurveTo(x + 0.25, y + 0.25, x + 0.2, y, x, y);
    shape.bezierCurveTo(x - 0.3, y, x - 0.3, y + 0.35, x - 0.3, y + 0.35);
    shape.bezierCurveTo(x - 0.3, y + 0.55, x - 0.1, y + 0.77, x + 0.25, y + 0.95);
    shape.bezierCurveTo(x + 0.6, y + 0.77, x + 0.8, y + 0.55, x + 0.8, y + 0.35);
    shape.bezierCurveTo(x + 0.8, y + 0.35, x + 0.8, y, x + 0.5, y);
    shape.bezierCurveTo(x + 0.35, y, x + 0.25, y + 0.25, x + 0.25, y + 0.25);
    return shape;
  }, []);

  useFrame((state, delta) => {
    if (!mesh.current) return;
    particles.forEach((p, i) => {
      p.pos.y += p.speed * delta;
      if (p.pos.y > 6) p.pos.y = -4;
      dummy.position.copy(p.pos);
      dummy.scale.set(p.scale, p.scale, p.scale);
      dummy.rotation.z = Math.sin(state.clock.elapsedTime + i) * 0.2;
      dummy.updateMatrix();
      mesh.current!.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <extrudeGeometry args={[heartShape, { depth: 0.1, bevelEnabled: true, bevelSegments: 2, steps: 2, bevelSize: 0.05, bevelThickness: 0.05 }]} />
      <meshStandardMaterial color="#ff69b4" emissive="#ff1493" emissiveIntensity={0.2} />
    </instancedMesh>
  );
};

const GiftBox = ({ position, delay, type = "heart" }: { position: [number, number, number], delay: number, type?: "heart" | "ring" }) => {
  const [opened, setOpened] = useState(false);
  const lidRef = useRef<THREE.Group>(null);
  const itemRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (opened && lidRef.current && itemRef.current) {
      lidRef.current.position.y += delta * 2;
      lidRef.current.rotation.x += delta * 2;
      lidRef.current.position.x += delta;
      itemRef.current.position.y = THREE.MathUtils.lerp(itemRef.current.position.y, 1.5, delta * 3);
      itemRef.current.rotation.y += delta * 2;
    }
  });

  const handleOpen = (e: any) => {
    e.stopPropagation();
    if (!opened) {
      setOpened(true);
      toast.success(type === "ring" ? "A Promise Ring!" : "My Heart is Yours!", { icon: type === "ring" ? "💍" : "💖" });
    }
  };

  return (
    <group position={position} onClick={handleOpen}>
      <mesh castShadow position={[0, 0.25, 0]}>
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial color="#ff4081" />
      </mesh>
      <mesh position={[0, 0.25, 0]} scale={[1.01, 1, 1.01]}>
        <boxGeometry args={[0.1, 0.51, 0.51]} />
        <meshStandardMaterial color="gold" metalness={0.8} roughness={0.2} />
      </mesh>
      <group ref={itemRef} position={[0, 0.5, 0]} scale={0}>
        {opened && (
          <>
            <Float speed={5} rotationIntensity={1} floatIntensity={1}>
              {type === "heart" ? (
                <mesh scale={0.4}>
                  <sphereGeometry args={[0.5, 16, 16]} />
                  <meshStandardMaterial color="red" emissive="red" emissiveIntensity={2} />
                </mesh>
              ) : (
                <mesh rotation={[Math.PI / 2, 0, 0]}>
                  <torusGeometry args={[0.3, 0.05, 16, 32]} />
                  <meshStandardMaterial color="gold" metalness={1} roughness={0.1} />
                </mesh>
              )}
              <Text position={[0, 0.8, 0]} fontSize={0.3} color="white">
                {type === "ring" ? "For You" : "Love You"}
              </Text>
            </Float>
            <DreiSparkles count={30} scale={2} size={3} speed={2} color="gold" />
          </>
        )}
      </group>
      {opened && <mesh position={[0, 0, 0]} visible={false} onUpdate={(self) => itemRef.current?.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1)} />}
      <group ref={lidRef} position={[0, 0.5, 0]}>
        <mesh castShadow position={[0, 0.05, 0]}>
          <boxGeometry args={[0.55, 0.1, 0.55]} />
          <meshStandardMaterial color="#ff4081" />
        </mesh>
      </group>
    </group>
  );
};

const Balloon = ({ position, color }: { position: [number, number, number], color: string }) => {
  const [popped, setPopped] = useState(false);
  const ref = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (!popped && ref.current) {
      const t = clock.elapsedTime + position[0];
      ref.current.position.y = position[1] + Math.sin(t) * 0.1;
    }
  });

  if (popped) {
    return (
      <group position={position}>
        <DreiSparkles count={20} color={color} size={10} speed={2} />
        <Float speed={5} floatIntensity={2}>
          <Text fontSize={0.5} color="white" outlineColor={color} outlineWidth={0.05}>POP!</Text>
        </Float>
      </group>
    );
  }

  return (
    <group ref={ref} position={position} onClick={(e) => { e.stopPropagation(); setPopped(true); }}>
      <mesh castShadow>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshPhysicalMaterial color={color} transmission={0.2} roughness={0.1} thickness={0.1} clearcoat={1} />
      </mesh>
      <mesh position={[0, -1, 0]}>
        <cylinderGeometry args={[0.005, 0.005, 2]} />
        <meshBasicMaterial color="white" opacity={0.5} transparent />
      </mesh>
    </group>
  );
};

// --- CAKE COMPONENT (Mics Tuned) ---
const Cake = ({ onBlowOut }: { onBlowOut: () => void }) => {
  const [micActive, setMicActive] = useState(false);
  const volume = useMicrophone(micActive);
  const [candlesLit, setCandlesLit] = useState(true);
  const blowDuration = useRef(0);

  useEffect(() => { setMicActive(true); }, []);

  useFrame((state, delta) => {
    // INCREASED THRESHOLD to 0.4 to prevent false triggers
    if (candlesLit && volume > 0.4) {
      blowDuration.current += delta;
      if (blowDuration.current > 1.0) { // Require 1 second of blowing
        setCandlesLit(false);
        onBlowOut();
        toast.success("MAKE A WISH! ✨");
      }
    } else {
      blowDuration.current = Math.max(0, blowDuration.current - delta);
    }
  });

  return (
    <group position={[0, -0.5, 0]}>
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
        <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[1.5, 1.5, 1, 64]} />
          <meshStandardMaterial color="#FFB7B2" roughness={0.3} />
        </mesh>
        <mesh position={[0, 1.5, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[1, 1, 1, 64]} />
          <meshStandardMaterial color="#FFDAC1" roughness={0.3} />
        </mesh>
        <mesh position={[0, 2.5, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.6, 0.6, 1, 64]} />
          <meshStandardMaterial color="#E2F0CB" roughness={0.3} />
        </mesh>
        <Center position={[0, 3.5, 0]}>
          <Text fontSize={0.5} color="#d14d72">Happy Birthday!</Text>
        </Center>
        <group position={[0, 3, 0]}>
          {candlesLit &&
            [...Array(5)].map((_, i) => (
              <pointLight key={i} position={[Math.sin(i) * 0.4, 0.5, Math.cos(i) * 0.4]} color="orange" intensity={0.5} />
            ))
          }
          {[...Array(5)].map((_, i) => (
            <group key={i} position={[Math.sin(i) * 0.4, 0, Math.cos(i) * 0.4]}>
              <mesh position={[0, 0.25, 0]}>
                <cylinderGeometry args={[0.04, 0.04, 0.5]} />
                <meshStandardMaterial color="white" />
              </mesh>
              {candlesLit && (
                <mesh position={[0, 0.6, 0]}>
                  <sphereGeometry args={[0.08]} />
                  <meshBasicMaterial color="orange" />
                </mesh>
              )}
            </group>
          ))}
        </group>
      </Float>
    </group>
  );
};

// --- PHOTO PARTY SCENE ---

const PhotoPartyScene = () => {
  const photoTexture = useTexture(birthdayPhoto);
  return (
    <group position={[0, 30, 0]}>
      <ambientLight intensity={1} />
      <spotLight position={[5, 10, 5]} intensity={2} color="#00ffff" />
      <spotLight position={[-5, 10, -5]} intensity={2} color="#ff00ff" />

      {/* Disco Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
        <planeGeometry args={[20, 20]} />
        <MeshReflectorMaterial
          blur={[300, 100]}
          resolution={1024}
          mixBlur={1}
          mixStrength={40}
          roughness={0.5}
          depthScale={1.2}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color="#101010"
          metalness={0.5}
          mirror={0}
        />
      </mesh>

      {/* Photo Frame */}
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
        <group position={[0, 2, 0]}>
          <mesh>
            <boxGeometry args={[6.4, 4.4, 0.2]} />
            <meshStandardMaterial color="#ffd700" metalness={0.8} roughness={0.2} />
          </mesh>
          <mesh position={[0, 0, 0.11]}>
            <planeGeometry args={[6, 4]} />
            <meshBasicMaterial map={photoTexture} />
          </mesh>
          <Text position={[0, 0, 0.2]} fontSize={0.5} color="white">
            HAPPPPYYYYY BIRTHDAYYYYY UNNATIIIIIIIIIIIIIIIII
          </Text>
        </group>
      </Float>

      <DiscoBall position={[0, 6, 0]} />
      <DancingText />
      <DreiSparkles count={500} scale={10} size={10} speed={1} opacity={1} color="#FFF" />
    </group>
  );
};

const DiscoBall = ({ position }: { position: [number, number, number] }) => {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state, delta) => {
    if (ref.current) ref.current.rotation.y += delta;
  });
  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshPhysicalMaterial color="white" metalness={1} roughness={0} clearcoat={1} />
    </mesh>
  );
};

const DancingText = () => {
  const ref = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (ref.current) {
      const t = clock.elapsedTime;
      ref.current.scale.setScalar(1 + Math.sin(t * 5) * 0.1); // Bouncing effect
      ref.current.rotation.z = Math.sin(t * 2) * 0.1; // Wobbly effect
    }
  });

  return (
    <group ref={ref}>
      <Text position={[0, 5, -2]} fontSize={1} color="#00ffff" anchorX="center" anchorY="middle">
        BEST DAY EVER!
      </Text>
    </group>
  )
}


// --- CAMERA CONTROLLER ---

const SceneController = ({ phase }: { phase: 'intro' | 'transition' | 'photo' }) => {
  const { camera } = useThree();
  const vec = new THREE.Vector3();
  const targetVec = new THREE.Vector3();

  useFrame((state, delta) => {
    // SMOOTHER CUBIC EASING
    const step = delta * 2; // Speed

    if (phase === 'intro') {
      vec.set(0, 1, 8);
      camera.position.lerp(vec, step);
      camera.lookAt(0, 0, 0);
    } else if (phase === 'transition') {
      vec.set(0, 15, 12);
      camera.position.lerp(vec, step * 0.5); // Slower start
      camera.lookAt(0, 15, 0);
    } else if (phase === 'photo') {
      vec.set(0, 30, 8); // Closer and higher
      camera.position.lerp(vec, step);

      // Smooth lookAt
      const currentLookAt = new THREE.Vector3(0, 0, -1).applyQuaternion(camera.quaternion).add(camera.position);
      targetVec.set(0, 32, 0);
      currentLookAt.lerp(targetVec, step);
      camera.lookAt(currentLookAt);
    }
  });
  return null;
}


// --- MAIN PAGE ---

export default function BirthdayCelebration() {
  const navigate = useNavigate();
  const [phase, setPhase] = useState<'intro' | 'celebrating' | 'transition' | 'photo'>('intro');
  const [started, setStarted] = useState(false);



  const onBlowOut = () => {
    if (phase === 'intro') {
      setPhase('celebrating');
      setTimeout(() => setPhase('transition'), 4000);
      setTimeout(() => setPhase('photo'), 7000); // More time for fly up
    }
  }

  return (
    <div className="w-full h-screen bg-gradient-to-br from-pink-200 to-rose-300 relative overflow-hidden">

      {/* FLASH OVERLAY */}
      <div className={`absolute inset-0 bg-white z-[60] pointer-events-none transition-opacity duration-1000 ${phase === 'celebrating' || phase === 'transition' ? 'opacity-50' : 'opacity-0'}`}></div>

      {!started && (
        <div
          className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/40 backdrop-blur-md cursor-pointer text-center"
          onClick={() => setStarted(true)}
        >
          <Heart className="w-20 h-20 text-pink-500 mb-6 animate-pulse fill-pink-500" />
          <h1 className="text-6xl font-bold text-white mb-4 drop-shadow-lg font-serif">A Birthday Surprise</h1>
          <p className="text-white/90 text-xl mb-8 max-w-md">Turn up your volume & Allow Microphone Access<br />Click anywhere to begin</p>
          <Button size="lg" className="bg-pink-500 hover:bg-pink-600 border-none text-xl px-8 py-6 rounded-full shadow-xl hover:scale-105 transition-transform">
            Start Celebration
          </Button>
        </div>
      )}

      <div className="absolute top-4 left-4 z-40 pointer-events-none">
        <div className="bg-white/30 backdrop-blur px-6 py-3 rounded-full border border-white/40 flex items-center gap-3 text-pink-900 shadow-sm">
          <Mic className="w-5 h-5 text-pink-600" />
          <span className="font-semibold">{phase === 'intro' ? "Blow into mic to light up the party!" : "CELEBRATE!"}</span>
        </div>
      </div>



      <div className="absolute top-4 right-4 z-50">
        <Button onClick={() => navigate(-1)} variant="outline" className="bg-white/20 border-white/40 text-pink-900 hover:bg-white/40">
          <ArrowLeft className="mr-2 h-4 w-4" /> Exit
        </Button>
      </div>

      <ErrorBoundary>
        <Canvas shadows camera={{ position: [0, 1, 8], fov: 45 }}>
          <Suspense fallback={null}>
            <SceneController phase={phase as any} />
            <Environment preset="sunset" />
            <ambientLight intensity={0.5} />
            <spotLight position={[5, 10, 5]} intensity={1} castShadow color="#ffd700" />

            <group position={[0, -1, 0]}>
              {started && <Cake onBlowOut={onBlowOut} />}
              <GiftBox position={[-2.5, 0, 1]} delay={0} type="ring" />
              <GiftBox position={[2.5, 0, 1]} delay={0.5} type="heart" />
              <Balloon position={[-3, 2, -2]} color="#ff4081" />
              <Balloon position={[3, 2.5, -1]} color="#8e24aa" />
              <FloatingHearts />
            </group>

            <PhotoPartyScene />

            <group position={[0, 0, 0]}>
              {(phase === 'celebrating' || phase === 'transition' || phase === 'photo') && (
                <group>
                  <Firework position={[-2, 3, -5]} color="#ff0000" delay={0} />
                  <Firework position={[2, 4, -5]} color="#ffd700" delay={0.5} />
                  <Firework position={[0, 5, -8]} color="#ffffff" delay={1.0} />
                  <Firework position={[-4, 2, -4]} color="#ff4081" delay={1.5} />
                  <Firework position={[4, 5, -6]} color="#00ffff" delay={2.0} />
                </group>
              )}
            </group>

            {phase === 'intro' && (
              <OrbitControls enableZoom={false} minPolarAngle={Math.PI / 4} maxPolarAngle={Math.PI / 2} />
            )}
          </Suspense>
        </Canvas>
      </ErrorBoundary>
    </div>
  );
}
