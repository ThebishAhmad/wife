import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Music, Sparkles, Heart, Star, Zap, Play, Pause, Users, Flame, Camera, Wand2, Infinity as InfinityIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { FloatingHearts } from "@/components/FloatingHearts";
import { motion } from "framer-motion";
import FallingText from "@/components/ui/FallingText";

const eras = [
  { name: "Lover", color: "255, 105, 180", bg: "from-pink-400 via-rose-400 to-purple-400", audioFile: "/src/assets/daylightLOVER.mp3" },
  { name: "1989", color: "56, 189, 248", bg: "from-cyan-400 via-blue-400 to-indigo-400", audioFile: "/src/assets/1898slut.mp3" },
  { name: "Reputation", color: "100, 116, 139", bg: "from-gray-800 via-slate-700 to-black", audioFile: "/src/assets/Call It What You Want_REPUTATION.mp3" },
  { name: "Red", color: "239, 68, 68", bg: "from-red-600 via-rose-500 to-pink-500", audioFile: "/src/assets/NothingNew_RED.mp3" },
  { name: "Folklore", color: "203, 213, 225", bg: "from-gray-400 via-slate-300 to-gray-200", audioFile: "/src/assets/cardigan_FLOKLORE.mp3" },
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
  }, [currentEra]); // Restart loop params if needed, mostly color refs

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

      {/* Canvas Layer */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0 pointer-events-none"
      />

      {/* Lighting Overlay - Modulated by slider too */}
      <div
        className={`absolute inset-0 bg-gradient-to-b ${era.bg} transition-all duration-1000 z-0`}
        style={{ opacity: (lights[0] / 100) * 0.8, mixBlendMode: 'overlay' }}
      />
      {/* Dimmer overlay for low lights */}
      <div
        className="absolute inset-0 bg-black pointer-events-none z-0 transition-opacity duration-300"
        style={{ opacity: 1 - (lights[0] / 100) }}
      />

      {/* UI Layer */}
      <div className="relative z-10 container mx-auto px-4 py-8 pointer-events-none"> {/* Disable pointer events for layout, re-enable for buttons */}
        <div className="pointer-events-auto">
          <Link to="/universe">
            <Button variant="outline" size="lg" className="mb-6 bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </Link>
        </div>

        <div className="text-center mb-8 pointer-events-auto">
          <motion.h1
            key={era.name}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-6xl font-elegant font-bold text-white mb-4 animate-glow drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]"
          >
            {era.name} Era 🎤
          </motion.h1>

          <div className="flex items-center justify-center gap-4">
            <button
              onClick={togglePlay}
              disabled={!era.audioFile}
              className={`backdrop-blur-sm rounded-full p-4 transition-all ${era.audioFile
                  ? 'bg-white/20 hover:bg-white/30 hover:scale-110 shadow-[0_0_20px_rgba(255,255,255,0.4)]'
                  : 'bg-gray-500/20 cursor-not-allowed'
                }`}
            >
              {isPlaying ? <Pause className="w-8 h-8 text-white fill-white" /> : <Play className="w-8 h-8 text-white fill-white" />}
            </button>
          </div>
          <audio ref={audioRef} onEnded={() => setIsPlaying(false)} />
        </div>

        {/* Falling Text */}
        <div className="max-w-4xl mx-auto mb-12 h-40 pointer-events-auto">
          <FallingText
            text="You make my world feel real in a way nothing else does."
            highlightWords={["world", "real", "nothing"]}
            trigger="hover"
            backgroundColor="transparent"
            wireframes={false}
            gravity={0.56}
            fontSize="2rem"
            mouseConstraintStiffness={0.9}
            className="text-white drop-shadow-md"
          />
        </div>

        {/* Era Selector */}
        <div className="max-w-4xl mx-auto mb-12 pointer-events-auto">
          <div className="grid grid-cols-5 gap-4">
            {eras.map((e, index) => (
              <button
                key={e.name}
                onClick={() => changeEra(index)}
                className={`relative p-6 rounded-2xl transition-all duration-300 transform ${currentEra === index ? "scale-110 shadow-[0_0_20px_rgba(255,255,255,0.5)] z-10" : "hover:scale-105 opacity-70"
                  }`}
              >
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${e.bg}`} />
                <div className="relative z-10 text-white font-bold text-lg drop-shadow-md">{e.name}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Control Panel */}
        <div className="max-w-3xl mx-auto bg-black/60 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl pointer-events-auto">
          <h2 className="text-2xl font-elegant font-bold text-white mb-6 text-center">Concert Control Panel 🎛️</h2>

          <div className="space-y-8">
            <div className="grid grid-cols-2 gap-8">
              <div>
                <label className="text-white font-romantic text-lg mb-2 block">Stage Lights</label>
                <Slider value={lights} onValueChange={setLights} max={100} step={1} className="w-full" />
              </div>
              <div>
                <label className="text-white font-romantic text-lg mb-2 block">Crowd Energy</label>
                <Slider value={crowdVolume} onValueChange={setCrowdVolume} max={100} step={1} className="w-full" />
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Button onClick={triggerConfetti} className="bg-pink-500/80 hover:bg-pink-600 h-14"><Sparkles className="w-5 h-5 mr-2" /> Confetti</Button>
              <Button onClick={triggerPyrotechnics} className="bg-orange-500/80 hover:bg-orange-600 h-14"><Flame className="w-5 h-5 mr-2" /> Pyro</Button>
              <Button onClick={() => toggleEffect('spotlight')} className="bg-yellow-500/80 hover:bg-yellow-600 h-14"><Zap className="w-5 h-5 mr-2" /> Spotlight</Button>
              <Button onClick={() => toggleEffect('lasers')} className="bg-cyan-500/80 hover:bg-cyan-600 h-14"><Zap className="w-5 h-5 mr-2" /> Lasers</Button>
              <Button onClick={() => toggleEffect('smoke')} className="bg-gray-500/80 hover:bg-gray-600 h-14"><Wand2 className="w-5 h-5 mr-2" /> Smoke</Button>
              <Button onClick={() => toggleEffect('cameraFlash')} className="bg-blue-400/80 hover:bg-blue-500 h-14"><Camera className="w-5 h-5 mr-2" /> Flash</Button>
              <Button onClick={() => toggleEffect('love')} className="bg-rose-500/80 hover:bg-rose-600 h-14"><Heart className="w-5 h-5 mr-2" /> Love</Button>
              <Button onClick={() => toggleEffect('dancers')} className="bg-indigo-500/80 hover:bg-indigo-600 h-14"><Users className="w-5 h-5 mr-2" /> Dancers</Button>
            </div>

            <Button onClick={triggerEpicFinale} className="w-full h-16 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-xl font-bold border border-white/30 shadow-[0_0_30px_rgba(236,72,153,0.5)] animate-pulse">
              <Star className="w-6 h-6 mr-2" /> TRIGGER EPIC FINALE ✨ <Star className="w-6 h-6 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaylorConcertStage;
