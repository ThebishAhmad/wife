import { Heart, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Reflection = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-soft relative overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <Sparkles
            key={i}
            className="absolute animate-sparkle text-rose-light/30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${10 + Math.random() * 20}px`,
              height: `${10 + Math.random() * 20}px`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12">
        <Button
          variant="outline"
          onClick={() => navigate("/")}
          className="mb-8 bg-card/50 backdrop-blur-sm border-rose-light/30"
        >
          ← Back Home
        </Button>

        <div className="max-w-4xl mx-auto text-center space-y-12">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-romantic blur-3xl opacity-20 animate-pulse-glow"></div>
            <h1
              className="relative text-4xl sm:text-6xl md:text-7xl font-elegant font-bold animate-glow"
              style={{
                background: "linear-gradient(135deg, hsl(var(--rose)) 0%, hsl(var(--lavender)) 50%, hsl(var(--rose)) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                backgroundSize: "200% 200%",
                animation: "gradient 3s ease infinite, glow 2s ease-in-out infinite alternate",
              }}
            >
              Look at you.
            </h1>
          </div>

          <div className="bg-card/40 backdrop-blur-sm rounded-3xl p-12 shadow-romantic border border-rose-light/20 space-y-6">
            <Heart className="w-16 h-16 fill-rose text-rose mx-auto animate-pulse" />
            
            <p className="font-romantic text-2xl sm:text-3xl text-foreground leading-relaxed">
              You are the reason I believe in something greater than time.
            </p>

            <p className="font-romantic text-xl text-foreground/80 leading-relaxed">
              You are galaxies and stardust. <br />
              You are every poem I'll never finish writing. <br />
              You are the answer to questions I didn't know I was asking.
            </p>

            <div className="pt-8 border-t border-rose-light/20">
              <p className="font-romantic text-lg text-foreground/70 italic">
                "In your eyes, I see everything I've ever needed. <br />
                In your smile, I find home. <br />
                In your heart, I discovered my forever."
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <p className="font-romantic text-xl text-rose">
              You are extraordinary, Unnati.
            </p>
            <p className="font-romantic text-lg text-foreground/60">
              Never forget how deeply you are loved ✨
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
};

export default Reflection;
