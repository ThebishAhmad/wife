import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import ScrollExpandMedia from "@/components/ui/scroll-expansion-hero";

import scene from "@/assets/scene.png";
import front from "@/assets/front.jpg";


const StardustMemories = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen">
      <Link to="/" className="fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="lg"
          className="bg-card/50 backdrop-blur-sm border-rose-light/30 hover:bg-rose/10"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>
      </Link>
      <ScrollExpandMedia
        mediaType="image"
        mediaSrc={front}
        bgImageSrc= {scene}
        title="Our Love Story"
        date="Every Moment Together"
        scrollToExpand="Scroll to explore our memories"
        textBlend={true}
      >
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center">
            <h2 className="text-4xl font-elegant font-bold mb-6 text-foreground">
              Every Memory Shines Like Stardust 
            </h2>
            <p className="text-xl font-romantic text-foreground/80 leading-relaxed">
              From the first moment we met to every laugh, every adventure, every quiet moment together,
              each memory we create is like a star in our personal constellation. Together, we're creating 
              a universe of beautiful moments that shine forever.
            </p>
          </div>

          <div className="grid gap-8">
            <div className="bg-card/60 backdrop-blur-sm rounded-2xl p-8 border border-rose-light/20">
              <h3 className="text-2xl font-elegant font-semibold mb-4 text-foreground">
                The Beginning 💖
              </h3>
              <p className="font-romantic text-foreground/70 leading-relaxed">
                Every story has a beautiful beginning, ours had two. The first time we met and the second time
                our paths crossed again.
                The way you smiled, the way you laughed, I knew you were special from day one.
              </p>
            </div>

            <div className="bg-card/60 backdrop-blur-sm rounded-2xl p-8 border border-rose-light/20">
              <h3 className="text-2xl font-elegant font-semibold mb-4 text-foreground">
                Growing Together 🌱
              </h3>
              <p className="font-romantic text-foreground/70 leading-relaxed">
                Through ups and downs, we've grown stronger together. Every challenge we've faced has only 
                brought us closer. You're not just my love, you're my best friend, my partner in everything.
              </p>
            </div>

          </div>
        </div>
      </ScrollExpandMedia>
    </div>
  );
};

export default StardustMemories;
