import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ArrowLeft, Heart, Sparkles, Star, Lock, Activity, Trophy, MessageSquare } from "lucide-react";
import VaporizeTextCycle, { Tag } from "@/components/ui/vapour-text-effect";
import { MagnetizeButton } from "@/components/ui/magnetize-button";

interface Milestone {
  id: number;
  title: string;
  date: string;
  description: string;
  emoji: string;
}

interface Memory {
  id: number;
  title: string;
  content: string;
  date: string;
}

interface Secret {
  id: number;
  message: string;
  unlocked: boolean;
  requiredEnergy: number;
}

const QuantumPlayground = () => {
  const [thoughtIndex, setThoughtIndex] = useState(0);
  const [loveEnergy, setLoveEnergy] = useState(0);
  const [pulseIntensity, setPulseIntensity] = useState(50);
  const [selectedMilestone, setSelectedMilestone] = useState<Milestone | null>(null);
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null);
  const [secrets, setSecrets] = useState<Secret[]>([
    { id: 1, message: "The first time I saw you, time stopped. Everything else faded away.", unlocked: false, requiredEnergy: 10 },
    { id: 2, message: "Your laugh is my favorite sound in the entire universe.", unlocked: false, requiredEnergy: 25 },
    { id: 3, message: "I love the way you scrunch your nose when you're thinking hard.", unlocked: false, requiredEnergy: 50 },
    { id: 4, message: "Every day with you feels like coming home.", unlocked: false, requiredEnergy: 75 },
    { id: 5, message: "You're not just my love - you're my best friend, my adventure, my everything.", unlocked: false, requiredEnergy: 100 },
    { id: 6, message: "Your smile has the power to light up even my darkest days.", unlocked: false, requiredEnergy: 150 },
    { id: 7, message: "I could listen to you talk about your dreams for hours and never get bored.", unlocked: false, requiredEnergy: 200 },
    { id: 8, message: "The way you hold my hand makes me feel like I can conquer the world.", unlocked: false, requiredEnergy: 250 },
    { id: 9, message: "You've taught me what it truly means to love and be loved unconditionally.", unlocked: false, requiredEnergy: 300 },
    { id: 10, message: "In a universe of infinite possibilities, finding you was my greatest fortune.", unlocked: false, requiredEnergy: 500 },
  ]);

  const loveThoughts = [
    ["Every", "Moment", "Together"],
    ["Love", "Grows", "Stronger"],
    ["Hearts", "Beat", "As One"],
    ["Forever", "And", "Always"],
    ["Our", "Love", "Story"],
  ];

  const milestones: Milestone[] = [
    { id: 1, title: "First Message", date: "Day 1", description: "The moment our story began with a simple hello", emoji: "💌" },
    { id: 2, title: "First Date", date: "Week 2", description: "Coffee, nervous laughter, and stolen glances", emoji: "☕" },
    { id: 3, title: "First Kiss", date: "Month 1", description: "Under the stars, time stood still", emoji: "💋" },
    { id: 4, title: "Said I Love You", date: "Month 3", description: "Three words that changed everything", emoji: "❤️" },
    { id: 5, title: "This Website", date: "Today", description: "Created this quantum space of love for us", emoji: "🌌" },
  ];

  const memoryJar: Memory[] = [
    { id: 1, title: "Stargazing Night", content: "We laid under the stars and you said constellations look like they're dancing", date: "Summer 2024" },
    { id: 2, title: "Rainy Day Dance", content: "Dancing in the rain without music, just us and the rhythm of raindrops", date: "Fall 2024" },
    { id: 3, title: "Breakfast Surprise", content: "You made me pancakes shaped like hearts (even the burnt ones were perfect)", date: "Winter 2024" },
    { id: 4, title: "Late Night Talk", content: "We talked until 4 AM about everything and nothing", date: "Spring 2025" },
  ];

  const handleHeartClick = () => {
    const newEnergy = loveEnergy + 1;
    setLoveEnergy(newEnergy);
    setThoughtIndex((thoughtIndex + 1) % loveThoughts.length);
    
    // Unlock secrets based on energy
    setSecrets(secrets.map(secret => 
      secret.requiredEnergy <= newEnergy ? { ...secret, unlocked: true } : secret
    ));

    // Increase pulse when clicking heart
    setPulseIntensity(Math.min(100, pulseIntensity + 5));
  };

  const handlePulseClick = () => {
    setPulseIntensity(Math.min(100, pulseIntensity + 10));
    setTimeout(() => setPulseIntensity(50), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-950 via-pink-950 to-purple-900 text-white overflow-hidden">
      <Link to="/universe">
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 left-4 z-50 text-white hover:bg-white/10"
        >
          <ArrowLeft className="h-6 w-6" />
        </Button>
      </Link>

      <div className="absolute top-4 right-4 z-50 flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
        <Heart className="h-4 w-4 text-pink-400 fill-pink-400 animate-pulse" />
        <span className="text-sm font-medium">Love Energy: {loveEnergy}</span>
      </div>

      <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-screen gap-12">
        <div className="text-center space-y-4 animate-fade-in">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-pink-400 via-rose-400 to-purple-400 bg-clip-text text-transparent">
            Love Energy Portal
          </h1>
          <p className="text-lg text-white/70">
            Watch our love story vaporize and materialize
          </p>
        </div>

        <div className="w-full max-w-4xl h-64 relative">
          <VaporizeTextCycle
            texts={loveThoughts[thoughtIndex]}
            font={{
              fontFamily: "Inter, sans-serif",
              fontSize: "80px",
              fontWeight: 700,
            }}
            color="rgb(255, 182, 193)"
            spread={7}
            density={6}
            animation={{
              vaporizeDuration: 2.5,
              fadeInDuration: 1.2,
              waitDuration: 0.8,
            }}
            direction="left-to-right"
            alignment="center"
            tag={Tag.H1}
          />
        </div>

        {/* Main interactive sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl">
          {/* Milestones */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <div className="flex items-center gap-3 mb-4">
              <Trophy className="w-6 h-6 text-yellow-400" />
              <h3 className="text-2xl font-bold">Our Milestones</h3>
            </div>
            <div className="space-y-3">
              {milestones.map((milestone) => (
                <button
                  key={milestone.id}
                  onClick={() => setSelectedMilestone(milestone)}
                  className="w-full text-left p-4 bg-white/5 hover:bg-white/10 rounded-lg transition-all border border-white/10 hover:border-pink-500/50"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{milestone.emoji}</span>
                    <div>
                      <p className="font-semibold">{milestone.title}</p>
                      <p className="text-sm text-white/60">{milestone.date}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Memory Jar */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <div className="flex items-center gap-3 mb-4">
              <Sparkles className="w-6 h-6 text-rose-400" />
              <h3 className="text-2xl font-bold">Memory Jar</h3>
            </div>
            <div className="space-y-3">
              {memoryJar.map((memory) => (
                <button
                  key={memory.id}
                  onClick={() => setSelectedMemory(memory)}
                  className="w-full text-left p-4 bg-white/5 hover:bg-white/10 rounded-lg transition-all border border-white/10 hover:border-rose-500/50"
                >
                  <p className="font-semibold">{memory.title}</p>
                  <p className="text-sm text-white/60">{memory.date}</p>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Secret Messages */}
        <div className="w-full max-w-5xl bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
          <div className="flex items-center gap-3 mb-4">
            <MessageSquare className="w-6 h-6 text-purple-400" />
            <h3 className="text-2xl font-bold">Secret Messages</h3>
            <p className="text-sm text-white/60">(Unlock with Love Energy)</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {secrets.map((secret) => (
              <div
                key={secret.id}
                className={`p-4 rounded-lg border transition-all ${
                  secret.unlocked
                    ? 'bg-gradient-to-br from-pink-500/20 to-purple-500/20 border-pink-500/50 animate-fade-in'
                    : 'bg-white/5 border-white/10'
                }`}
              >
                {secret.unlocked ? (
                  <div className="space-y-2">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <p className="text-sm italic">{secret.message}</p>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2 py-4">
                    <Lock className="w-5 h-5 text-white/40" />
                    <p className="text-sm text-white/60">Requires {secret.requiredEnergy} energy</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Love Pulse Monitor */}
        <div className="w-full max-w-5xl bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
          <div className="flex items-center gap-3 mb-4">
            <Activity className="w-6 h-6 text-red-400" />
            <h3 className="text-2xl font-bold">Love Pulse Monitor</h3>
          </div>
          <div className="flex items-center justify-center gap-8">
            <div className="relative">
              <div 
                className="w-32 h-32 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 flex items-center justify-center transition-all duration-300"
                style={{ 
                  transform: `scale(${1 + pulseIntensity / 200})`,
                  boxShadow: `0 0 ${pulseIntensity}px rgba(244, 114, 182, 0.8)`
                }}
              >
                <Heart className="w-16 h-16 text-white fill-white animate-pulse" />
              </div>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold mb-2">{pulseIntensity}%</p>
              <p className="text-white/70 mb-4">Pulse Intensity</p>
              <Button
                onClick={handlePulseClick}
                className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600"
              >
                Send Love Pulse 💓
              </Button>
            </div>
          </div>
        </div>

        {/* Main energy button */}
        <div className="flex flex-col items-center gap-6">
          <p className="text-white/60 text-sm">Click to amplify our love</p>
          <MagnetizeButton
            particleCount={16}
            attractRadius={60}
            onClick={handleHeartClick}
            className="text-lg px-8 py-6 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 border-pink-400"
          >
            {loveEnergy === 0 ? "Feel The Love" : `Love: ${loveEnergy} ❤️`}
          </MagnetizeButton>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-2xl">
          {[...Array(4)].map((_, i) => (
            <MagnetizeButton
              key={i}
              particleCount={8}
              className="w-full bg-gradient-to-r from-pink-500/20 to-rose-500/20 hover:from-pink-500/30 hover:to-rose-500/30 border-pink-400/50"
              onClick={() => setLoveEnergy(loveEnergy + 1)}
            >
              +1 ❤️
            </MagnetizeButton>
          ))}
        </div>
      </div>

      {/* Milestone Dialog */}
      <Dialog open={!!selectedMilestone} onOpenChange={() => setSelectedMilestone(null)}>
        <DialogContent className="bg-gradient-to-br from-pink-900 to-purple-900 text-white border-pink-500/50">
          <DialogHeader>
            <DialogTitle className="text-3xl flex items-center gap-3">
              <span className="text-4xl">{selectedMilestone?.emoji}</span>
              {selectedMilestone?.title}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-lg text-white/90">{selectedMilestone?.description}</p>
            <p className="text-sm text-pink-300">{selectedMilestone?.date}</p>
          </div>
        </DialogContent>
      </Dialog>

      {/* Memory Dialog */}
      <Dialog open={!!selectedMemory} onOpenChange={() => setSelectedMemory(null)}>
        <DialogContent className="bg-gradient-to-br from-rose-900 to-pink-900 text-white border-rose-500/50">
          <DialogHeader>
            <DialogTitle className="text-3xl">{selectedMemory?.title}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-lg text-white/90 italic">{selectedMemory?.content}</p>
            <p className="text-sm text-rose-300">{selectedMemory?.date}</p>
          </div>
        </DialogContent>
      </Dialog>

      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-pink-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-rose-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>
    </div>
  );
};

export default QuantumPlayground;
