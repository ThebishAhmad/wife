import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FloatingHearts } from "@/components/FloatingHearts";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Star, RotateCcw } from "lucide-react";
import { toast } from "sonner";

interface StarPoint {
  id: number;
  x: number;
  y: number;
  clicked: boolean;
}

interface RealConstellation {
  name: string;
  pattern: number[][];
  message: string;
}

// Real constellation patterns (simplified)
const realConstellations: RealConstellation[] = [
  {
    name: "Orion",
    pattern: [[0, 1], [1, 2], [2, 3]],
    message: "✨ You discovered Orion — the Hunter of the Night Sky! Just like this mighty constellation, our love is bold and unmistakable. 🏹",
  },
  {
    name: "Ursa Major",
    pattern: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6]],
    message: "✨ You discovered Ursa Major — the Great Bear guiding us home! This constellation has guided travelers for centuries, just as your love guides my heart. 🐻",
  },
  {
    name: "Cassiopeia",
    pattern: [[0, 1], [1, 2], [2, 3], [3, 4]],
    message: "✨ You discovered Cassiopeia — the Queen of the Stars! You are the queen of my heart, my love. 👑",
  },
  {
    name: "Leo",
    pattern: [[0, 1], [1, 3], [3, 5], [5, 7]],
    message: "✨ You found Leo the Lion! Fierce and majestic, just like the strength of our love. 🦁",
  },
  {
    name: "Scorpius",
    pattern: [[1, 2], [2, 4], [4, 6], [6, 8]],
    message: "✨ Scorpius appears! Passionate and intense, this constellation mirrors the fire in our hearts. 🦂",
  },
  {
    name: "Cygnus",
    pattern: [[0, 2], [2, 4], [4, 6]],
    message: "✨ Cygnus, the graceful Swan! Your elegance and beauty shine brighter than any star. 🦢",
  },
  {
    name: "Andromeda",
    pattern: [[0, 3], [3, 6], [6, 9]],
    message: "✨ Andromeda, the princess! You are my fairy tale come true. 👸",
  },
  {
    name: "Pegasus",
    pattern: [[1, 3], [3, 5], [5, 7]],
    message: "✨ Pegasus, the winged horse! Our love takes flight to magical heights. 🦄",
  },
  {
    name: "Draco",
    pattern: [[0, 1], [1, 3], [3, 5], [5, 7], [7, 9]],
    message: "✨ Draco the Dragon! Legendary and eternal, just like our story. 🐉",
  },
  {
    name: "Lyra",
    pattern: [[2, 3], [3, 5], [5, 6]],
    message: "✨ Lyra the Harp! The music of the stars plays our love song. 🎵",
  },
  {
    name: "Aquila",
    pattern: [[1, 2], [2, 5], [5, 8]],
    message: "✨ Aquila the Eagle! Soaring high, our love knows no bounds. 🦅",
  },
  {
    name: "Gemini",
    pattern: [[0, 2], [2, 5], [5, 8]],
    message: "✨ Gemini the Twins! Two souls perfectly paired, forever intertwined. 👯",
  },
  {
    name: "Taurus",
    pattern: [[1, 3], [3, 6], [6, 8]],
    message: "✨ Taurus the Bull! Strong, steadfast, and devoted - that's our love. 🐂",
  },
  {
    name: "Aries",
    pattern: [[0, 4], [4, 7], [7, 9]],
    message: "✨ Aries the Ram! Bold and adventurous, ready to conquer the world together. 🐏",
  },
  {
    name: "Sagittarius",
    pattern: [[2, 4], [4, 7], [7, 9]],
    message: "✨ Sagittarius the Archer! Aiming straight for eternal happiness together. 🏹",
  },
  {
    name: "Cancer",
    pattern: [[1, 4], [4, 6], [6, 8]],
    message: "✨ Cancer the Crab! Nurturing and protective, our love is a safe harbor. 🦀",
  },
  {
    name: "Virgo",
    pattern: [[0, 3], [3, 5], [5, 8]],
    message: "✨ Virgo! Pure, perfect, and precious - that's what you are to me. 💫",
  },
  {
    name: "Capricorn",
    pattern: [[2, 5], [5, 7], [7, 9]],
    message: "✨ Capricorn the Sea-Goat! Ambitious and enduring, climbing to new heights together. 🐐",
  },
  {
    name: "Aquarius",
    pattern: [[1, 5], [5, 8], [8, 9]],
    message: "✨ Aquarius the Water Bearer! Unique and visionary, our love is one of a kind. 🌊",
  },
  {
    name: "Pisces",
    pattern: [[3, 5], [5, 7], [7, 9]],
    message: "✨ Pisces the Fish! Swimming through the stars, dreaming together forever. 🐟",
  },
];

const generateRandomStars = (count: number): StarPoint[] => {
  const stars: StarPoint[] = [];
  for (let i = 0; i < count; i++) {
    stars.push({
      id: i,
      x: Math.random() * 80 + 10, // Keep stars away from edges
      y: Math.random() * 80 + 10,
      clicked: false,
    });
  }
  return stars;
};

const LoveConstellation = () => {
  const [stars, setStars] = useState<StarPoint[]>(() => generateRandomStars(10));
  const [clickedOrder, setClickedOrder] = useState<number[]>([]);
  const [theme, setTheme] = useState<"serenity" | "desire">("serenity");

  const handleStarClick = (starId: number) => {
    // Allow clicking the same star again
    const newOrder = [...clickedOrder, starId];
    setClickedOrder(newOrder);

    setStars(stars.map(s => 
      s.id === starId ? { ...s, clicked: true } : s
    ));

    // Check if pattern matches real constellation after 2+ connections (made easier)
    if (newOrder.length >= 2) {
      checkConstellation(newOrder);
    }
  };

  const checkConstellation = (order: number[]) => {
    // Create pattern from clicked order
    const connections: number[][] = [];
    for (let i = 0; i < order.length - 1; i++) {
      connections.push([order[i], order[i + 1]]);
    }

    // Check against real constellations with more lenient matching
    for (const constellation of realConstellations) {
      // Allow partial matches - if at least 60% of the pattern matches
      const minMatches = Math.ceil(constellation.pattern.length * 0.6);
      let matchCount = 0;

      for (let i = 0; i < Math.min(connections.length, constellation.pattern.length); i++) {
        const conn = connections[i];
        const pattern = constellation.pattern[i];
        
        if (conn && pattern) {
          if (
            (conn[0] === pattern[0] && conn[1] === pattern[1]) ||
            (conn[0] === pattern[1] && conn[1] === pattern[0])
          ) {
            matchCount++;
          }
        }
      }

      if (matchCount >= minMatches) {
        toast.success(constellation.message, {
          duration: 5000,
        });
        return;
      }
    }

    // If no match and pattern is complete-ish
    if (order.length >= 5) {
      toast("💖 You just created your own Love Constellation!", {
        duration: 4000,
      });
    }
  };

  const reset = () => {
    setClickedOrder([]);
    setStars(stars.map(s => ({ ...s, clicked: false })));
  };

  const toggleTheme = () => {
    setTheme(theme === "serenity" ? "desire" : "serenity");
  };

  const themeStyles = {
    serenity: {
      bg: "from-indigo-900 via-purple-900 to-blue-900",
      glow: "rgba(147, 197, 253, 0.3)",
      lineColor: "#93c5fd",
      starGlow: "shadow-[0_0_20px_rgba(147,197,253,0.6)]",
    },
    desire: {
      bg: "from-rose-900 via-red-900 to-pink-900",
      glow: "rgba(251, 113, 133, 0.3)",
      lineColor: "#fb7185",
      starGlow: "shadow-[0_0_20px_rgba(251,113,133,0.8)]",
    },
  };

  const currentTheme = themeStyles[theme];

  return (
    <div className={`min-h-screen bg-gradient-to-br ${currentTheme.bg} relative overflow-hidden transition-all duration-1000`}>
      <FloatingHearts />

      {/* Optimized background stars (reduced from 100 to 50) */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              opacity: Math.random() * 0.7 + 0.3,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-6">
          <Link to="/universe">
            <Button
              variant="outline"
              size="lg"
              className="bg-card/50 backdrop-blur-sm border-rose-light/30 hover:bg-rose/10"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Universe
            </Button>
          </Link>

          <Button
            onClick={toggleTheme}
            size="lg"
            className={`font-romantic text-lg transition-all duration-500 ${
              theme === "serenity"
                ? "bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
                : "bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600"
            }`}
          >
            {theme === "serenity" ? "Serenity ✨" : "Desire 🔥"} 
            <span className="ml-2">↔</span>
          </Button>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-5xl font-elegant font-bold text-white mb-4 animate-glow">
            ✨ Constellation Canvas
          </h1>
          <p className="text-xl font-romantic text-white/90 max-w-2xl mx-auto">
            Click the stars to connect them and create constellations
          </p>
        </div>

        {/* Interactive star canvas */}
        <div className="relative max-w-5xl mx-auto h-[600px] bg-black/30 backdrop-blur-sm rounded-3xl border border-white/20 mb-8 overflow-hidden">
          {/* SVG for drawing lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {clickedOrder.map((starId, idx) => {
              if (idx === 0) return null;
              const prevStar = stars.find(s => s.id === clickedOrder[idx - 1]);
              const currStar = stars.find(s => s.id === starId);
              if (!prevStar || !currStar) return null;

              return (
                <line
                  key={`line-${idx}`}
                  x1={`${prevStar.x}%`}
                  y1={`${prevStar.y}%`}
                  x2={`${currStar.x}%`}
                  y2={`${currStar.y}%`}
                  stroke={currentTheme.lineColor}
                  strokeWidth="2"
                  className="animate-fade-in"
                  style={{
                    filter: `drop-shadow(0 0 8px ${currentTheme.glow})`,
                  }}
                />
              );
            })}
          </svg>

          {/* Clickable stars */}
          {stars.map((star) => (
            <button
              key={star.id}
              onClick={() => handleStarClick(star.id)}
              className={`absolute transition-all duration-300 ${
                star.clicked ? "scale-150" : "hover:scale-125"
              }`}
              style={{
                left: `${star.x}%`,
                top: `${star.y}%`,
                transform: "translate(-50%, -50%)",
              }}
            >
              <Star
                className={`w-8 h-8 ${
                  star.clicked
                    ? `fill-current text-yellow-300 ${currentTheme.starGlow} animate-pulse`
                    : "fill-white text-white"
                }`}
                style={{
                  filter: star.clicked 
                    ? `drop-shadow(0 0 12px ${currentTheme.glow})`
                    : "none",
                }}
              />
            </button>
          ))}
        </div>

        {/* Reset button */}
        <div className="text-center">
          <Button
            onClick={reset}
            size="lg"
            variant="outline"
            className="bg-card/50 backdrop-blur-sm border-rose-light/30 hover:bg-rose/10 font-romantic text-lg"
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            Reset
          </Button>
          <p className="mt-4 text-sm font-romantic text-white/70">
            {clickedOrder.length} stars connected
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoveConstellation;
