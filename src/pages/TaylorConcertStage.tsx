import { useState, useRef, useEffect } from "react";
import { usePerformance } from "@/context/PerformanceContext";
import { Link } from "react-router-dom";
import { ArrowLeft, Music, Sparkles, Heart, Star, Zap, Play, Pause, Users, Flame, Camera, Wand2, Infinity as InfinityIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { FloatingHearts } from "@/components/FloatingHearts";
import { motion } from "framer-motion";
import FallingText from "@/components/ui/FallingText";

import daylightLover from "@/assets/daylightLOVER.mp3";
import slut1989 from "@/assets/1898slut.mp3";
import callItReputation from "@/assets/Call It What You Want_REPUTATION.mp3";
import nothingNewRed from "@/assets/NothingNew_RED.mp3";
import cardiganFolklore from "@/assets/cardigan_FLOKLORE.mp3";

const eras = [
  { name: "Lover", color: "255, 105, 180", bg: "from-pink-400 via-rose-400 to-purple-400", audioFile: daylightLover },
  { name: "1989", color: "56, 189, 248", bg: "from-cyan-400 via-blue-400 to-indigo-400", audioFile: slut1989 },
  { name: "Reputation", color: "100, 116, 139", bg: "from-gray-800 via-slate-700 to-black", audioFile: callItReputation },
  { name: "Red", color: "239, 68, 68", bg: "from-red-600 via-rose-500 to-pink-500", audioFile: nothingNewRed },
  { name: "Folklore", color: "203, 213, 225", bg: "from-gray-400 via-slate-300 to-gray-200", audioFile: cardiganFolklore },
];

// --- Particle Classes ---

class Particle {
  x: number; y: number; vx: number; vy: number; life: number; color: string; size: number;
  constructor(w: number, h: number) {
    this.x = Math.random() * w;
    this.y = Math.random() * h;
    this.vx = 0; this.vy = 0;
    this.life = 1; this.color = 'white'; this.size = 2;
  }
  update() { this.x += this.vx; this.y += this.vy; }
  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.color;
    ctx.globalAlpha = this.life;
    ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); ctx.fill();
    ctx.globalAlpha = 1;
  }
}

class Wristband {
  x: number; y: number; blinkRate: number; offset: number; color: string; baseY: number;
  constructor(w: number, h: number, colorRGB: string) {
    this.x = Math.random() * w;
    this.y = h - (Math.random() * (h * 0.3)); // Bottom 30%
    this.baseY = this.y;
    this.blinkRate = 0.05 + Math.random() * 0.1;
    this.offset = Math.random() * Math.PI * 2;
    this.color = colorRGB;
  }
  draw(ctx: CanvasRenderingContext2D, time: number, energy: number) {
    // Energy affects blink speed (1x to 5x) and "jump" height
    const speedMultiplier = 1 + (energy * 4);
    const alpha = (Math.sin(time * this.blinkRate * speedMultiplier + this.offset) + 1) / 2;

    // Simulating jumping crowd - Jitter Y based on energy
    const jumpY = energy > 0.5 ? Math.sin(time * 0.5 + this.offset) * (energy * 5) : 0;

    if (alpha > 0.8) {
      ctx.fillStyle = `rgba(${this.color}, ${alpha})`;
      ctx.beginPath();
      ctx.arc(this.x, this.baseY - jumpY, 1.5, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}

class Confetti {
  x: number; y: number; vx: number; vy: number; rotation: number; dr: number; color: string;
  constructor(w: number) {
    this.x = Math.random() * w;
    this.y = -10;
    this.vx = (Math.random() - 0.5) * 2;
    this.vy = Math.random() * 3 + 2;
    this.rotation = Math.random() * 360;
    this.dr = (Math.random() - 0.5) * 10;
    this.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
  }
  update() { this.x += this.vx; this.y += this.vy; this.rotation += this.dr; }
  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate((this.rotation * Math.PI) / 180);
    ctx.fillStyle = this.color;
    ctx.fillRect(-3, -3, 6, 6);
    ctx.restore();
  }
}

class PyroParticle {
  x: number; y: number; vx: number; vy: number; life: number; color: string;
  constructor(x: number, y: number, color: string) {
    this.x = x; this.y = y;
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 6 + 2;
    this.vx = Math.cos(angle) * speed;
    this.vy = Math.sin(angle) * speed;
    this.life = 1;
    this.color = color;
  }
  update() {
    this.x += this.vx; this.y += this.vy;
    this.vy += 0.1; // gravity
    this.vx *= 0.95; this.vy *= 0.95; // drag
    this.life -= 0.02;
  }
  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.color;
    ctx.globalAlpha = this.life;
    ctx.beginPath(); ctx.arc(this.x, this.y, 2, 0, Math.PI * 2); ctx.fill();
    ctx.globalAlpha = 1;
  }
}

// --- Main Component ---

const TaylorConcertStage = () => {
  const { highPerformanceMode } = usePerformance();
  const [currentEra, setCurrentEra] = useState(0);
  const [lights, setLights] = useState([80]);
  const [crowdVolume, setCrowdVolume] = useState([70]);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Ref to pass live params to the loop
  const paramsRef = useRef({ lights: 80, energy: 0.7 });

  // Update refs when state changes
  useEffect(() => {
    paramsRef.current.lights = lights[0] / 100;
  }, [lights]);

  useEffect(() => {
    paramsRef.current.energy = crowdVolume[0] / 100;
  }, [crowdVolume]);

  // Effect States (Refs for direct Canvas access)
  const effects = useRef({
    confetti: false,
    pyro: false,
    spotlight: false,
    dancers: false,
    smoke: false,
    lasers: false,
    love: false,
    wristbands: true, // Always on
    cameraFlash: false,
    timeFreeze: false,
  });

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef({
    confetti: [] as Confetti[],
    pyro: [] as PyroParticle[],
    wristbands: [] as Wristband[],
    lasers: [] as number[], // angle offsets
    smoke: [] as Particle[], // utilizing base particle for smoke puffs
  });

  const era = eras[currentEra];

  // --- Animation Loop ---
  useEffect(() => {
    if (highPerformanceMode) return; // Skip the entire render loop in perf mode
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Resize
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      // Re-init wristbands on resize
      particlesRef.current.wristbands = Array.from({ length: 2000 }, () =>
        new Wristband(canvas.width, canvas.height, era.color)
      );
    };
    window.addEventListener('resize', resize);
    resize();

    let animationId: number;
    let time = 0;

    const render = () => {
      time++;
      const lightingLevel = paramsRef.current.lights; // 0 to 1
      const crowdEnergy = paramsRef.current.energy; // 0 to 1

      ctx.clearRect(0, 0, canvas.width, canvas.height); // Standard clear

      // 0. Camera Flash Overlay
      if (effects.current.cameraFlash) {
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.abs(Math.sin(time * 0.5))})`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        if (time % 20 === 0) effects.current.cameraFlash = false; // Auto turn off
      }

      // 1. Wristbands (Crowd)
      if (effects.current.wristbands) {
        // Update color if era changed
        if (particlesRef.current.wristbands.length > 0 && particlesRef.current.wristbands[0].color !== era.color) {
          particlesRef.current.wristbands.forEach(w => w.color = era.color);
        }
        // Pass crowd energy to draw
        particlesRef.current.wristbands.forEach(w => w.draw(ctx, time, crowdEnergy));
      }

      // 2. Lasers
      if (effects.current.lasers) {
        ctx.globalCompositeOperation = 'lighter';
        const numLasers = 8;
        const center = canvas.width / 2;
        for (let i = 0; i < numLasers; i++) {
          const angle = (Math.sin(time * 0.02 + i) * 0.5) - Math.PI / 2;
          // Laser intensity modulated by stage lights slider
          ctx.strokeStyle = `hsla(${180 + Math.sin(time * 0.1) * 50}, 100%, 70%, ${0.6 * lightingLevel})`;
          ctx.lineWidth = 5 * lightingLevel;
          ctx.beginPath();
          ctx.moveTo(center, canvas.height); // Stage source
          ctx.lineTo(center + Math.cos(angle) * canvas.width * 1.5, canvas.height + Math.sin(angle) * canvas.height * 1.5);
          ctx.stroke();
        }
        ctx.globalCompositeOperation = 'source-over';
      }

      // 3. Smoke
      if (effects.current.smoke) {
        if (time % 5 === 0) {
          const p = new Particle(canvas.width, canvas.height);
          p.x = Math.random() * canvas.width;
          p.y = canvas.height + 50;
          p.vy = -1 - Math.random();
          p.life = 0.6;
          p.size = 50 + Math.random() * 50;
          particlesRef.current.smoke.push(p);
        }
        particlesRef.current.smoke.forEach((p, i) => {
          p.update();
          p.life -= 0.002;
          // Smoke visibility modulated by lighting
          ctx.fillStyle = `rgba(200, 200, 200, ${p.life * 0.2 * lightingLevel})`;
          ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2); ctx.fill();
          if (p.life <= 0) particlesRef.current.smoke.splice(i, 1);
        });
      }

      // 4. Confetti
      if (effects.current.confetti) {
        if (particlesRef.current.confetti.length < 500) {
          particlesRef.current.confetti.push(new Confetti(canvas.width));
          particlesRef.current.confetti.push(new Confetti(canvas.width));
        }
      }
      particlesRef.current.confetti.forEach((p, i) => {
        p.update();
        p.draw(ctx);
        if (p.y > canvas.height) particlesRef.current.confetti.splice(i, 1);
      });

      // 5. Pyro
      if (effects.current.pyro) {
        // Burst generator handled by trigger function, just logic here
      }
      particlesRef.current.pyro.forEach((p, i) => {
        p.update();
        p.draw(ctx);
        if (p.life <= 0) particlesRef.current.pyro.splice(i, 1);
      });

      // 6. Spotlight
      if (effects.current.spotlight) {
        const x = canvas.width / 2 + Math.sin(time * 0.02) * 300;
        const y = canvas.height / 2 + Math.cos(time * 0.03) * 100;
        const grad = ctx.createRadialGradient(x, y, 0, x, y, 300);
        // Spotlight brightness
        grad.addColorStop(0, `rgba(255, 255, 255, ${0.4 * lightingLevel})`);
        grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.fillStyle = grad;
        ctx.beginPath(); ctx.arc(x, y, 300, 0, Math.PI * 2); ctx.fill();
      }

      // 7. Love Hearts
      if (effects.current.love) {
        // Can just piggyback on confetti logic logic but with heart shapes?
        // For now, simple pink circles for perf
        if (time % 5 === 0) {
          const p = new Particle(canvas.width, canvas.height);
          p.y = canvas.height;
          p.color = 'pink';
          p.vy = -2 - Math.random() * 2;
          particlesRef.current.smoke.push(p); // Reuse array 
        }
      }

      animationId = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, [currentEra, highPerformanceMode]);

  // --- Triggers ---

  const triggerConfetti = () => {
    effects.current.confetti = true;
    setTimeout(() => effects.current.confetti = false, 3000);
  };

  const triggerPyrotechnics = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    for (let i = 0; i < 5; i++) { // 5 explosions
      const cx = Math.random() * canvas.width;
      const cy = canvas.height * (0.5 + Math.random() * 0.3);
      const color = `hsl(${Math.random() * 60}, 100%, 50%)`; // Fire colors
      for (let j = 0; j < 50; j++) {
        particlesRef.current.pyro.push(new PyroParticle(cx, cy, color));
      }
    }
  };

  const triggerEpicFinale = () => {
    setLights([100]);
    setCrowdVolume([100]);
    effects.current.confetti = true;
    effects.current.spotlight = true;
    effects.current.lasers = true;
    effects.current.smoke = true;
    effects.current.wristbands = true;
    triggerPyrotechnics();

    // Sequence
    setTimeout(() => effects.current.cameraFlash = true, 500);
    setTimeout(() => triggerPyrotechnics(), 1500);
    setTimeout(() => triggerPyrotechnics(), 3000);

    // End
    setTimeout(() => {
      effects.current.spotlight = false;
      effects.current.lasers = false;
      effects.current.confetti = false;
      effects.current.smoke = false;
    }, 6000);
  };

  const toggleEffect = (key: keyof typeof effects.current) => {
    // @ts-ignore
    effects.current[key] = !effects.current[key];
  };

  // --- Render Helpers ---

  const changeEra = (index: number) => {
    if (isPlaying) { audioRef.current?.pause(); setIsPlaying(false); }
    setCurrentEra(index);
  };

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) audio.pause();
    else if (era.audioFile) {
      audio.src = era.audioFile;
      audio.play().catch(e => console.log('Audio error:', e));
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <FloatingHearts />

      {/* === CONCERT VENUE BACKGROUND === */}
      {/* Deep gradient base — dark venue ceiling to stage floor */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#050510] via-[#0a0a1a] to-[#0d0d0d]" />

      {/* Radial stage glow — emanates from center stage */}
      <div
        className="absolute inset-0 z-0 transition-all duration-1000"
        style={{
          background: `radial-gradient(ellipse 80% 60% at 50% 70%, rgba(${era.color}, ${0.15 * (lights[0] / 100)}) 0%, transparent 70%)`,
        }}
      />

      {/* Overhead spot beams — two sweeping cones */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 z-0 opacity-40 transition-opacity duration-1000"
        style={{
          width: 0,
          height: 0,
          borderLeft: '180px solid transparent',
          borderRight: '180px solid transparent',
          borderTop: `${Math.min(window.innerHeight * 0.7, 600)}px solid rgba(${era.color}, ${0.12 * (lights[0] / 100)})`,
          filter: 'blur(40px)',
        }}
      />
      <div
        className="absolute top-0 z-0 opacity-30 transition-opacity duration-1000"
        style={{
          left: '30%',
          width: 0,
          height: 0,
          borderLeft: '120px solid transparent',
          borderRight: '120px solid transparent',
          borderTop: `${Math.min(window.innerHeight * 0.55, 450)}px solid rgba(255, 255, 255, ${0.08 * (lights[0] / 100)})`,
          filter: 'blur(30px)',
          transform: 'rotate(-8deg)',
        }}
      />
      <div
        className="absolute top-0 z-0 opacity-30 transition-opacity duration-1000"
        style={{
          left: '60%',
          width: 0,
          height: 0,
          borderLeft: '120px solid transparent',
          borderRight: '120px solid transparent',
          borderTop: `${Math.min(window.innerHeight * 0.55, 450)}px solid rgba(255, 255, 255, ${0.08 * (lights[0] / 100)})`,
          filter: 'blur(30px)',
          transform: 'rotate(8deg)',
        }}
      />

      {/* === STAGE PLATFORM === */}
      {/* Stage surface */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[90%] max-w-6xl z-[1]">
        {/* Stage deck */}
        <div
          className="h-48 transition-all duration-1000"
          style={{
            background: `linear-gradient(180deg, rgba(${era.color}, ${0.08 * (lights[0] / 100)}) 0%, #111 30%, #0a0a0a 100%)`,
            clipPath: 'polygon(5% 0%, 95% 0%, 100% 100%, 0% 100%)',
          }}
        />
        {/* Stage front edge — metallic strip */}
        <div
          className="absolute top-0 left-[5%] right-[5%] h-[3px] transition-all duration-1000"
          style={{
            background: `linear-gradient(90deg, transparent 0%, rgba(${era.color}, ${0.6 * (lights[0] / 100)}) 20%, rgba(255,255,255,${0.4 * (lights[0] / 100)}) 50%, rgba(${era.color}, ${0.6 * (lights[0] / 100)}) 80%, transparent 100%)`,
            boxShadow: `0 0 20px rgba(${era.color}, ${0.4 * (lights[0] / 100)}), 0 0 60px rgba(${era.color}, ${0.15 * (lights[0] / 100)})`,
          }}
        />
        {/* Neon underglow */}
        <div
          className="absolute top-[3px] left-[5%] right-[5%] h-1 transition-all duration-1000"
          style={{
            background: `linear-gradient(90deg, transparent, rgba(${era.color}, ${0.5 * (lights[0] / 100)}), transparent)`,
            filter: `blur(4px)`,
          }}
        />
      </div>

      {/* === CROWD SILHOUETTES === */}
      <div className="absolute bottom-0 left-0 right-0 h-44 z-[2] pointer-events-none overflow-hidden">
        {/* Crowd layer 1 (back row — darker, smaller) */}
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="absolute bottom-10 left-0 w-full h-28 opacity-60">
          <path d={`M0,120 ${Array.from({ length: 60 }, (_, i) => {
            const x = i * 20;
            const h = 50 + Math.sin(i * 0.7) * 15 + Math.random() * 10;
            return `L${x},${120 - h} Q${x + 5},${120 - h - 12} ${x + 10},${120 - h}`;
          }).join(' ')} L1200,120 Z`} fill="#0a0a0a" />
        </svg>
        {/* Crowd layer 2 (front row — darker, taller) */}
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="absolute bottom-0 left-0 w-full h-32 opacity-80">
          <path d={`M0,120 ${Array.from({ length: 80 }, (_, i) => {
            const x = i * 15;
            const h = 55 + Math.sin(i * 0.5) * 18 + Math.cos(i * 0.3) * 8;
            return `L${x},${120 - h} Q${x + 4},${120 - h - 14} ${x + 8},${120 - h}`;
          }).join(' ')} L1200,120 Z`} fill="#060606" />
        </svg>
        {/* Phone glow dots in crowd */}
        <div className="absolute inset-0">
          {[...Array(25)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1.5 rounded-sm"
              style={{
                left: `${5 + (i * 3.8)}%`,
                bottom: `${15 + Math.sin(i) * 18}px`,
                backgroundColor: `rgba(${era.color}, ${0.6 + Math.sin(i * 1.3) * 0.3})`,
                boxShadow: `0 0 6px rgba(${era.color}, 0.5)`,
                animation: `pulse ${1.5 + Math.random() * 2}s ease-in-out ${Math.random() * 3}s infinite`,
              }}
            />
          ))}
        </div>
      </div>

      {/* === LIGHTING RIG (top truss) === */}
      <div className="absolute top-0 left-0 right-0 h-12 z-[1] pointer-events-none">
        {/* Truss bar */}
        <div className="absolute top-2 left-[10%] right-[10%] h-1 bg-gradient-to-r from-transparent via-zinc-700 to-transparent opacity-40" />
        {/* Rig lights */}
        <div className="absolute top-3 left-[10%] right-[10%] flex justify-between">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="relative"
            >
              {/* Light fixture */}
              <div className="w-2 h-3 bg-zinc-600 rounded-b-sm" />
              {/* Light glow */}
              <div
                className="absolute top-3 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full transition-all duration-1000"
                style={{
                  backgroundColor: i % 3 === 0 ? `rgba(${era.color}, ${0.8 * (lights[0] / 100)})` : `rgba(255, 255, 255, ${0.4 * (lights[0] / 100)})`,
                  boxShadow: i % 3 === 0
                    ? `0 0 8px rgba(${era.color}, ${0.6 * (lights[0] / 100)})`
                    : `0 0 4px rgba(255,255,255, ${0.3 * (lights[0] / 100)})`,
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* === SPEAKER STACKS (sides) === */}
      <div className="absolute left-4 bottom-48 z-[1] opacity-30 pointer-events-none">
        {[0, 1, 2].map(i => (
          <div key={i} className="w-10 h-10 bg-zinc-900 border border-zinc-700 rounded-sm mb-1 flex items-center justify-center">
            <div className="w-5 h-5 rounded-full border border-zinc-600 bg-zinc-800" />
          </div>
        ))}
      </div>
      <div className="absolute right-4 bottom-48 z-[1] opacity-30 pointer-events-none">
        {[0, 1, 2].map(i => (
          <div key={i} className="w-10 h-10 bg-zinc-900 border border-zinc-700 rounded-sm mb-1 flex items-center justify-center">
            <div className="w-5 h-5 rounded-full border border-zinc-600 bg-zinc-800" />
          </div>
        ))}
      </div>

      {/* === SMOKE HAZE (bottom) === */}
      <div
        className="absolute bottom-36 left-0 right-0 h-24 z-[1] pointer-events-none transition-opacity duration-1000"
        style={{
          background: `linear-gradient(0deg, rgba(${era.color}, ${0.05 * (lights[0] / 100)}) 0%, transparent 100%)`,
          filter: 'blur(20px)',
        }}
      />

      {/* Canvas Layer (particles, lasers, etc) */}
      {!highPerformanceMode && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 z-[3] pointer-events-none"
        />
      )}

      {/* Era color overlay */}
      <div
        className={`absolute inset-0 bg-gradient-to-b ${era.bg} transition-all duration-1000 z-[4] pointer-events-none`}
        style={{ opacity: (lights[0] / 100) * 0.15, mixBlendMode: 'overlay' }}
      />
      {/* Dimmer overlay */}
      <div
        className="absolute inset-0 bg-black pointer-events-none z-[4] transition-opacity duration-300"
        style={{ opacity: Math.max(0, 0.3 - (lights[0] / 100) * 0.3) }}
      />

      {/* === UI LAYER === */}
      <div className="relative z-10 container mx-auto px-4 py-6 pointer-events-none flex flex-col min-h-screen">
        {/* Top bar */}
        <div className="pointer-events-auto flex justify-between items-center mb-4">
          <Link to="/universe">
            <Button variant="outline" size="sm" className="bg-black/40 backdrop-blur-sm border-white/20 text-white hover:bg-white/10 rounded-full px-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </Link>
          <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-full px-4 py-1.5 text-xs text-white/50 uppercase tracking-widest">
            🎵 The Eras Tour
          </div>
        </div>

        {/* Title + Play */}
        <div className="text-center mb-6 pointer-events-auto flex-shrink-0">
          <motion.h1
            key={era.name}
            initial={{ scale: 0.5, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            className="text-7xl md:text-8xl font-elegant font-bold text-white mb-3 tracking-tight"
            style={{
              textShadow: `0 0 40px rgba(${era.color}, 0.5), 0 0 100px rgba(${era.color}, 0.2)`,
            }}
          >
            {era.name}
          </motion.h1>
          <p className="text-white/40 text-sm uppercase tracking-[0.3em] mb-5">— Era —</p>

          <button
            onClick={togglePlay}
            disabled={!era.audioFile}
            className={`relative backdrop-blur-sm rounded-full p-5 transition-all ${era.audioFile
              ? 'bg-white/10 hover:bg-white/20 hover:scale-110'
              : 'bg-gray-500/10 cursor-not-allowed'
              }`}
            style={{
              boxShadow: era.audioFile ? `0 0 30px rgba(${era.color}, 0.3), inset 0 0 20px rgba(${era.color}, 0.05)` : 'none',
            }}
          >
            {isPlaying ? <Pause className="w-8 h-8 text-white fill-white" /> : <Play className="w-8 h-8 text-white fill-white ml-0.5" />}
            {/* Ring glow */}
            {isPlaying && (
              <span
                className="absolute inset-0 rounded-full animate-ping opacity-30"
                style={{ border: `2px solid rgba(${era.color}, 0.6)` }}
              />
            )}
          </button>
          <audio ref={audioRef} onEnded={() => setIsPlaying(false)} />
        </div>

        {/* Falling Text */}
        <div className="max-w-4xl mx-auto mb-8 h-32 pointer-events-auto flex-shrink-0">
          <FallingText
            text="You make my world feel real in a way nothing else does."
            highlightWords={["world", "real", "nothing"]}
            trigger="hover"
            backgroundColor="transparent"
            wireframes={false}
            gravity={0.56}
            fontSize="1.8rem"
            mouseConstraintStiffness={0.9}
            className="text-white/90 drop-shadow-md"
          />
        </div>

        {/* Era Selector */}
        <div className="max-w-3xl mx-auto mb-8 pointer-events-auto w-full flex-shrink-0">
          <div className="grid grid-cols-5 gap-3">
            {eras.map((e, index) => (
              <button
                key={e.name}
                onClick={() => changeEra(index)}
                className={`relative p-4 md:p-5 rounded-xl transition-all duration-300 transform overflow-hidden ${currentEra === index
                  ? "scale-110 z-10 ring-2 ring-white/40"
                  : "hover:scale-105 opacity-60 hover:opacity-90"
                  }`}
              >
                <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${e.bg}`} />
                <div className="relative z-10 text-white font-bold text-sm md:text-base drop-shadow-md">{e.name}</div>
                {currentEra === index && (
                  <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-white rounded-full" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Control Panel */}
        <div className="max-w-3xl mx-auto bg-black/70 backdrop-blur-xl rounded-2xl p-6 border border-white/10 shadow-2xl pointer-events-auto w-full mt-auto">
          <h2 className="text-lg font-elegant font-semibold text-white/80 mb-5 text-center uppercase tracking-widest">Concert Control 🎛️</h2>

          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="text-white/50 text-xs uppercase tracking-widest mb-2 block">Stage Lights</label>
                <Slider value={lights} onValueChange={setLights} max={100} step={1} className="w-full" />
              </div>
              <div>
                <label className="text-white/50 text-xs uppercase tracking-widest mb-2 block">Crowd Energy</label>
                <Slider value={crowdVolume} onValueChange={setCrowdVolume} max={100} step={1} className="w-full" />
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              <Button onClick={triggerConfetti} className="bg-pink-500/20 hover:bg-pink-500/40 border border-pink-500/30 h-12 text-sm"><Sparkles className="w-4 h-4 mr-1.5" /> Confetti</Button>
              <Button onClick={triggerPyrotechnics} className="bg-orange-500/20 hover:bg-orange-500/40 border border-orange-500/30 h-12 text-sm"><Flame className="w-4 h-4 mr-1.5" /> Pyro</Button>
              <Button onClick={() => toggleEffect('spotlight')} className="bg-yellow-500/20 hover:bg-yellow-500/40 border border-yellow-500/30 h-12 text-sm"><Zap className="w-4 h-4 mr-1.5" /> Spotlight</Button>
              <Button onClick={() => toggleEffect('lasers')} className="bg-cyan-500/20 hover:bg-cyan-500/40 border border-cyan-500/30 h-12 text-sm"><Zap className="w-4 h-4 mr-1.5" /> Lasers</Button>
              <Button onClick={() => toggleEffect('smoke')} className="bg-gray-500/20 hover:bg-gray-500/40 border border-gray-500/30 h-12 text-sm"><Wand2 className="w-4 h-4 mr-1.5" /> Smoke</Button>
              <Button onClick={() => toggleEffect('cameraFlash')} className="bg-blue-400/20 hover:bg-blue-400/40 border border-blue-400/30 h-12 text-sm"><Camera className="w-4 h-4 mr-1.5" /> Flash</Button>
              <Button onClick={() => toggleEffect('love')} className="bg-rose-500/20 hover:bg-rose-500/40 border border-rose-500/30 h-12 text-sm"><Heart className="w-4 h-4 mr-1.5" /> Love</Button>
              <Button onClick={() => toggleEffect('dancers')} className="bg-indigo-500/20 hover:bg-indigo-500/40 border border-indigo-500/30 h-12 text-sm"><Users className="w-4 h-4 mr-1.5" /> Dancers</Button>
            </div>

            <Button
              onClick={triggerEpicFinale}
              className="w-full h-14 text-lg font-bold border border-white/20 rounded-xl"
              style={{
                background: `linear-gradient(135deg, rgba(${era.color}, 0.4), rgba(${era.color}, 0.2))`,
                boxShadow: `0 0 30px rgba(${era.color}, 0.25)`,
              }}
            >
              <Star className="w-5 h-5 mr-2" /> EPIC FINALE <Star className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaylorConcertStage;
