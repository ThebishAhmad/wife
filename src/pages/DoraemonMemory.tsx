import { useState } from "react";
import { Link } from "react-router-dom";
import { FloatingHearts } from "@/components/FloatingHearts";
import { ArrowLeft, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const gadgets = [
  {
    name: "The Day I Met You Camera",
    effect: "shows first photo",
    message: "This is the moment everything changed. The day I met the love of my life.",
    animation: "camera-flash",
  },
  {
    name: "Future Hug Simulator",
    effect: "screen hug",
    message: "Even through the screen, I can feel your warmth. One day, I'll hold you forever.",
    animation: "hug-compress",
  },
  {
    name: "Anywhere Door",
    effect: "portal teleport",
    message: "If I had this door, I'd walk through it every second just to see your smile.",
    animation: "portal-spin",
  },
  {
    name: "Time Cloth",
    effect: "time memory",
    message: "Wrapping us in memories of yesterday, today, and all our tomorrows.",
    animation: "time-ripple",
  },
];

const DoraemonMemory = () => {
  const [selectedGadget, setSelectedGadget] = useState<typeof gadgets[0] | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleGadgetClick = (gadget: typeof gadgets[0]) => {
    setSelectedGadget(gadget);
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-50 to-pink-100 dark:from-blue-950 dark:via-blue-900 dark:to-pink-950 relative overflow-hidden">
      <FloatingHearts />

      <div className="relative z-10 container mx-auto px-4 py-12">
        <div className="text-center space-y-4 mb-12">
          <Link to="/universe">
            <Button
              variant="outline"
              size="lg"
              className="mb-4 bg-card/50 backdrop-blur-sm border-blue-light/30 hover:bg-blue/10"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Universe
            </Button>
          </Link>
          <h1 className="text-4xl sm:text-5xl font-elegant font-bold text-gradient-romantic animate-glow">
            Doraemon's Memory Pocket 🩵
          </h1>
          <p className="text-lg font-romantic text-foreground/80 max-w-2xl mx-auto">
            Reach into the magic pocket and pull out a memory gadget...
          </p>
        </div>

        {/* Doraemon's Pocket */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative aspect-square max-w-md mx-auto">
            {/* Pocket visualization */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full shadow-glow animate-pulse-glow" />
            <div className="absolute inset-8 bg-gradient-to-br from-blue-900 to-black rounded-full flex items-center justify-center">
              <Package className="w-24 h-24 text-blue-200 animate-bounce" />
            </div>
          </div>
        </div>

        {/* Gadget Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {gadgets.map((gadget) => (
            <button
              key={gadget.name}
              onClick={() => handleGadgetClick(gadget)}
              className="group bg-card/80 backdrop-blur-md rounded-3xl p-8 border border-blue-light/30 shadow-soft hover:shadow-glow hover:scale-105 transition-all duration-300"
            >
              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-400 to-pink-400 rounded-2xl flex items-center justify-center group-hover:rotate-12 transition-transform">
                  <Package className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-elegant font-bold text-foreground">
                  {gadget.name}
                </h3>
                <p className="text-sm text-muted-foreground italic">
                  Click to activate gadget
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Gadget Effect Dialog */}
      <Dialog open={!!selectedGadget} onOpenChange={() => setSelectedGadget(null)}>
        <DialogContent className="bg-gradient-to-br from-blue-100 to-pink-100 dark:from-blue-950 dark:to-pink-950 backdrop-blur-md border-blue-light/30 shadow-romantic max-w-2xl">
          {selectedGadget && (
            <div className="relative min-h-[400px] flex flex-col items-center justify-center text-center space-y-8 p-8">
              {/* Animation effects */}
              {isAnimating && selectedGadget.animation === "camera-flash" && (
                <div className="absolute inset-0 bg-white animate-ping" />
              )}
              {isAnimating && selectedGadget.animation === "hug-compress" && (
                <div className="absolute inset-0 bg-gradient-radial from-pink-500/50 to-transparent animate-pulse" />
              )}
              {isAnimating && selectedGadget.animation === "portal-spin" && (
                <div className="absolute inset-0 bg-gradient-conic from-blue-500 via-pink-500 to-blue-500 animate-spin opacity-30" />
              )}
              {isAnimating && selectedGadget.animation === "time-ripple" && (
                <div className="absolute inset-0">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div
                      key={i}
                      className="absolute inset-0 border-4 border-blue-400 rounded-full animate-ping"
                      style={{ animationDelay: `${i * 0.5}s` }}
                    />
                  ))}
                </div>
              )}

              <div className="relative z-10 space-y-6">
                <div className="w-24 h-24 mx-auto bg-gradient-to-br from-blue-400 to-pink-400 rounded-2xl flex items-center justify-center animate-bounce">
                  <Package className="w-12 h-12 text-white" />
                </div>
                <h2 className="text-3xl font-elegant text-gradient-romantic">
                  {selectedGadget.name}
                </h2>
                <p className="text-xl font-romantic text-foreground leading-relaxed max-w-md">
                  {selectedGadget.message}
                </p>
              </div>

              {/* Nostalgic particles */}
              <div className="absolute inset-0 pointer-events-none">
                {Array.from({ length: 20 }).map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-2 h-2 bg-blue-400 rounded-full animate-twinkle"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      animationDelay: `${Math.random() * 2}s`,
                    }}
                  />
                ))}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DoraemonMemory;
