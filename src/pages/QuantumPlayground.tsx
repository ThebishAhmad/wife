import { useState, useRef, useEffect, useMemo, Suspense } from "react";
import { Link } from "react-router-dom";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Text, Float, Environment, Sparkles as DreiSparkles, PerspectiveCamera, Stars } from "@react-three/drei";
import * as THREE from "three";
import { ArrowLeft, Play, RotateCcw, Heart, Zap, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

// --- GAME CONFIG ---
const ROWS = 5;
const COLS = 8;
const ENEMY_SPACING_X = 1.5;
const ENEMY_SPACING_Y = 1.2;
const BULLET_SPEED = 15;
const PLAYER_SPEED = 10;
const FIRE_RATE = 0.2; // seconds

// --- UTILS ---
const tempObj = new THREE.Object3D();
const tempVec = new THREE.Vector3();

// --- COMPONENTS ---

// --- MAIN GAME LOGIC (Single System for Performance) ---
const InvadersGame = ({ gameState, setGameState, setScore, setLives }: any) => {
  const { mouse, viewport } = useThree();

  // REFS FOR STATE (No Re-renders)
  const playerRef = useRef<THREE.Group>(null);
  const enemiesRef = useRef<THREE.InstancedMesh>(null);
  const bulletsRef = useRef<THREE.InstancedMesh>(null);

  // GAME DATA
  const gameData = useRef({
    lastFire: 0,
    enemies: [] as { x: number, y: number, alive: boolean, direction: number }[],
    bullets: [] as { x: number, y: number, active: boolean, velocity: number }[],
    enemySpeed: 1,
    enemyDirection: 1, // 1 = right, -1 = left
    playerPos: new THREE.Vector3(),
  });

  // INITIALIZE
  useEffect(() => {
    if (gameState === 'playing') {
      // Init Enemies
      const enemies = [];
      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          enemies.push({
            x: (c - COLS / 2) * ENEMY_SPACING_X + 0.5,
            y: (r * ENEMY_SPACING_Y) + 5,
            alive: true,
            direction: 1
          });
        }
      }
      gameData.current.enemies = enemies;

      // Init Bullets Pool
      gameData.current.bullets = Array(50).fill(0).map(() => ({ x: 0, y: 0, active: false, velocity: 0 }));
      gameData.current.enemySpeed = 1;
    }
  }, [gameState]);

  useFrame((state, delta) => {
    if (gameState !== 'playing') return;
    const now = state.clock.elapsedTime;
    const data = gameData.current;

    // 1. PLAYER MOVEMENT
    if (playerRef.current) {
      const targetX = (mouse.x * viewport.width) / 2;
      playerRef.current.position.x = THREE.MathUtils.lerp(playerRef.current.position.x, targetX, delta * 10);
      // Clamp
      playerRef.current.position.x = Math.max(-8, Math.min(8, playerRef.current.position.x));
      data.playerPos.copy(playerRef.current.position);
    }

    // 2. AUTO FIRE
    if (now - data.lastFire > FIRE_RATE) {
      data.lastFire = now;
      // Find inactive bullet
      const bullet = data.bullets.find(b => !b.active);
      if (bullet) {
        bullet.active = true;
        bullet.x = data.playerPos.x;
        bullet.y = data.playerPos.y + 1;
        bullet.velocity = BULLET_SPEED;
      }
    }

    // 3. BULLET UPDATE
    if (bulletsRef.current) {
      let activeCount = 0;
      data.bullets.forEach((b, i) => {
        if (b.active) {
          b.y += b.velocity * delta;

          // Collision Check with Enemies
          let hit = false;
          data.enemies.forEach(e => {
            if (e.alive && !hit) {
              const dx = b.x - e.x;
              const dy = b.y - e.y;
              if (Math.abs(dx) < 0.5 && Math.abs(dy) < 0.5) {
                e.alive = false;
                b.active = false;
                hit = true;
                setScore((s: number) => s + 100);
                // Speed up slightly
                data.enemySpeed += 0.05;
              }
            }
          });

          // Bounds Check
          if (b.y > 10) b.active = false;

          // Render
          if (b.active) {
            tempObj.position.set(b.x, b.y, 0);
            tempObj.updateMatrix();
            bulletsRef.current!.setMatrixAt(i, tempObj.matrix);
            activeCount++;
          } else {
            // Hide
            tempObj.position.set(0, 0, 0);
            tempObj.scale.set(0, 0, 0);
            tempObj.updateMatrix();
            bulletsRef.current!.setMatrixAt(i, tempObj.matrix);
            tempObj.scale.set(1, 1, 1); // Reset
          }
        } else {
          // Ensure hidden
          tempObj.position.set(0, 0, 0);
          tempObj.scale.set(0, 0, 0);
          tempObj.updateMatrix();
          bulletsRef.current!.setMatrixAt(i, tempObj.matrix);
          tempObj.scale.set(1, 1, 1);
        }
      });
      bulletsRef.current.instanceMatrix.needsUpdate = true;
    }

    // 4. ENEMY UPDATE
    if (enemiesRef.current) {
      let livingCount = 0;
      let hitEdge = false;

      // Move block
      const moveStep = data.enemySpeed * delta * data.enemyDirection;

      data.enemies.forEach((e, i) => {
        if (e.alive) {
          livingCount++;
          e.x += moveStep;

          // Check Edge
          if (e.x > 8 || e.x < -8) hitEdge = true;

          // Render
          tempObj.position.set(e.x, e.y, 0);
          // Bobbing
          tempObj.position.y += Math.sin(now * 2 + e.x) * 0.005;
          tempObj.rotation.z = Math.sin(now * 5) * 0.1;

          tempObj.updateMatrix();
          enemiesRef.current!.setMatrixAt(i, tempObj.matrix);
        } else {
          tempObj.scale.set(0, 0, 0);
          tempObj.updateMatrix();
          enemiesRef.current!.setMatrixAt(i, tempObj.matrix);
          tempObj.scale.set(1, 1, 1);
        }
      });
      enemiesRef.current.instanceMatrix.needsUpdate = true;

      // Handle Edge Bounce & Descent
      if (hitEdge) {
        data.enemyDirection *= -1;
        data.enemies.forEach(e => {
          e.y -= 0.5; // Drop down
          if (e.alive && e.y < -5) { // Reached bottom
            setGameState('gameover');
          }
        });
      }

      if (livingCount === 0) {
        // Win / Next Wave logic (just reset grid but faster for minimal mvp)
        toast.success("WAVE CLEARED! Speed Up!");
        setScore((s: number) => s + 1000);
        // Respawn
        data.enemies.forEach((e, i) => {
          const r = Math.floor(i / COLS);
          const c = i % COLS;
          e.alive = true;
          e.x = (c - COLS / 2) * ENEMY_SPACING_X + 0.5;
          e.y = (r * ENEMY_SPACING_Y) + 5;
        });
        data.enemySpeed += 0.5;
      }
    }
  });

  return (
    <group>
      {/* Player */}
      <group ref={playerRef} position={[0, -6, 0]}>
        <mesh rotation={[Math.PI, 0, 0]} scale={0.5}>
          {/* Heart Shape Extrusion (Manual for performance/simplicity) */}
          <coneGeometry args={[1, 2, 4]} />
          <meshStandardMaterial color="#ec4899" emissive="#ec4899" emissiveIntensity={2} />
        </mesh>
        <DreiSparkles position={[0, -1, 0]} count={10} color="cyan" scale={2} speed={5} />
      </group>

      {/* Bullets */}
      <instancedMesh ref={bulletsRef} args={[undefined, undefined, 50]}>
        <capsuleGeometry args={[0.1, 0.5, 4, 8]} />
        <meshBasicMaterial color="#00ffff" />
      </instancedMesh>

      {/* Enemies */}
      <instancedMesh ref={enemiesRef} args={[undefined, undefined, ROWS * COLS]}>
        <boxGeometry args={[0.8, 0.6, 0.5]} />
        <meshStandardMaterial color="#ef4444" emissive="#7f1d1d" emissiveIntensity={0.5} roughness={0.2} metalness={0.8} />
      </instancedMesh>
    </group>
  );
};

// --- MAIN PAGE ---

const LoveInvaders = () => {
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'gameover'>('menu');
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);

  const startGame = () => {
    setScore(0);
    setLives(3);
    setGameState('playing');
  };

  return (
    <div className="w-full h-screen bg-[#020617] relative overflow-hidden font-mono cursor-none">

      {/* UI LAYER */}
      <div className="absolute inset-0 z-50 pointer-events-none">
        <Link to="/universe" className="pointer-events-auto absolute top-4 left-4">
          <Button variant="ghost" className="text-white hover:bg-white/10">
            <ArrowLeft className="mr-2 h-4 w-4" /> Exit Cockpit
          </Button>
        </Link>

        <div className="absolute top-4 right-4 text-right">
          <p className="text-4xl font-bold text-cyan-400 drop-shadow-[0_0_5px_cyan]">
            SCORE: {score}
          </p>
        </div>

        {gameState === 'menu' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm pointer-events-auto cursor-default">
            <h1 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-cyan-500 mb-6 drop-shadow-2xl animate-pulse">
              LOVE INVADERS
            </h1>
            <p className="text-xl text-white/70 mb-8 max-w-md text-center">
              Defend the Heart Base from the descending Glooms.<br />
              Mouse to move. Auto-fire engaged.
            </p>
            <Button
              onClick={startGame}
              className="bg-cyan-600 hover:bg-cyan-500 text-white text-2xl px-12 py-8 rounded-none border-2 border-cyan-400 shadow-[0_0_20px_cyan]"
            >
              <Play className="mr-3 h-6 w-6" /> LAUNCH MISSION
            </Button>
          </div>
        )}

        {gameState === 'gameover' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-red-900/60 backdrop-blur-md pointer-events-auto cursor-default">
            <h2 className="text-5xl font-bold text-red-500 mb-4">BASE OVERRUN</h2>
            <p className="text-3xl text-white mb-6">Final Score: {score}</p>
            <Button
              onClick={startGame}
              className="bg-white text-black hover:bg-gray-200 text-xl px-10 py-6"
            >
              <RotateCcw className="mr-2 h-5 w-5" /> REBOOT SYSTEM
            </Button>
          </div>
        )}
      </div>

      {/* 3D SCENE */}
      <Canvas shadows gl={{ antialias: false }}>
        <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={60} />
        <color attach="background" args={['#020617']} />
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={1} color="purple" />
        <pointLight position={[-10, 10, 10]} intensity={1} color="pink" />

        <Suspense fallback={null}>
          <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />
          <InvadersGame
            gameState={gameState}
            setGameState={setGameState}
            setScore={setScore}
            setLives={setLives}
          />
          <Environment preset="night" />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default LoveInvaders;
