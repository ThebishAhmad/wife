import { HeroParallaxDemo } from "@/components/hero-parallax-demo";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HeroParallaxPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 dark:from-rose-950 dark:via-purple-950 dark:to-indigo-950">
      <div className="fixed top-6 left-6 z-50">
        <Button
          onClick={() => navigate("/universe")}
          variant="outline"
          size="lg"
          className="bg-card/80 backdrop-blur-sm border-rose-light/30 hover:bg-rose/10"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Universe
        </Button>
      </div>

      {/* Romantic Header */}
      <div className="relative pt-20 pb-8 text-center px-4">
        <h1 className="text-5xl sm:text-7xl font-elegant font-bold text-gradient-romantic mb-6 animate-glow">
          Our Beautiful Journey Together 💕
        </h1>
        <p className="text-xl sm:text-2xl font-romantic text-foreground/80 max-w-3xl mx-auto mb-4">
          Every moment with you is a treasure, every memory a precious gem in the story of Us
        </p>
        <p className="text-lg font-romantic text-rose-500 dark:text-rose-400 animate-pulse">
          Scroll through our adventure of love 
        </p>
      </div>
      
      <HeroParallaxDemo />

      {/* Bottom love note */}
      <div className="relative py-16 text-center px-4">
        <div className="max-w-2xl mx-auto bg-card/60 backdrop-blur-sm rounded-3xl p-8 border border-rose-light/30 shadow-romantic">
          <p className="text-2xl font-romantic text-foreground mb-4">
            "With you, every chapter is magical, every page filled with love" 💖
          </p>
          <p className="text-lg font-elegant text-muted-foreground">
            Here's to all the memories we've made and all the adventures still to come
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeroParallaxPage;
