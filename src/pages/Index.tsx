import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import type { User } from "@supabase/supabase-js";
import { LetterCard } from "@/components/LetterCard";
import { EternalCountdown } from "@/components/EternalCountdown";
import { WelcomePopup } from "@/components/WelcomePopup";
import { TimeSurprises } from "@/components/TimeSurprises";
import { Heart, Sparkles, Image, Star, Music, Layout, LogOut, List, Play, Pause, Hand } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { Dock, DockIcon, DockItem, DockLabel } from "@/components/ui/dock";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import ourSong from "@/assets/FuckitIloveyou.mp3";
import LiquidEther from "@/components/ui/LiquidEther";

const Index = () => {
  const letters = "HAPPYBIRTHDAY".split("");
  const hexagonRef = useRef<HTMLDivElement>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check authentication
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth");
        return;
      }
      setUser(session.user);
      setLoading(false);
    };

    checkAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        navigate("/auth");
      } else {
        setUser(session.user);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      if (!hexagonRef.current) return;
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 30;
      const y = (e.clientY / innerHeight - 0.5) * 30;

      hexagonRef.current.style.transform = `translate(${x}px, ${y}px)`;
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Logged out",
      description: "See you soon! 💕",
    });
    navigate("/auth");
  };

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-pink-100 via-rose-50 to-white">
        <p className="text-pink-600 text-xl">Loading your magical world...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {user && <WelcomePopup userEmail={user.email || ""} />}
      <TimeSurprises />
      {/* LiquidEther Background */}
      <div className="absolute inset-0 w-full h-full">
        <LiquidEther
          colors={['#ec4899', '#f472b6', '#fda4af']}
          mouseForce={10}
          cursorSize={60}
          isViscous={false}
          viscous={20}
          iterationsViscous={8}
          iterationsPoisson={8}
          resolution={0.2}
          isBounce={false}
          autoDemo={true}
          autoSpeed={0.3}
          autoIntensity={1.5}
          takeoverDuration={0.2}
          autoResumeDelay={4000}
          autoRampDuration={0.4}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Logout Button */}
        <div className="absolute top-4 right-4 flex gap-2">
          <Link to="/bucket-list">
            <Button
              variant="outline"
              size="sm"
              className="bg-white/80 backdrop-blur-sm border-pink-200 hover:bg-pink-50"
            >
              <List className="w-4 h-4 mr-2" />
              Our Bucket List
            </Button>
          </Link>
          <Button
            onClick={handleLogout}
            variant="outline"
            size="sm"
            className="bg-white/80 backdrop-blur-sm border-pink-200 hover:bg-pink-50"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>

        {/* Header */}
        <div className="text-center space-y-6 mb-16">
          <div className="inline-flex items-center gap-2 bg-card/50 backdrop-blur-sm px-6 py-2 rounded-full shadow-soft border border-rose-light/30">
            <Heart className="w-5 h-5 fill-rose text-rose animate-pulse" />
            <span className="font-romantic text-rose text-lg">
              Made with endless love by Tabish Ahmad
            </span>
            <Heart className="w-5 h-5 fill-rose text-rose animate-pulse" />
          </div>

          <h1 className="text-5xl sm:text-7xl md:text-8xl font-elegant font-bold text-gradient-romantic animate-glow">
            Happy Birthday, Unnati 💖
          </h1>

          <p className="text-lg sm:text-xl font-romantic text-foreground/80 max-w-2xl mx-auto leading-relaxed">
            Welcome to your magical birthday world, my gorgeous goose. Each letter holds a piece of my heart,
            a story of us, and a thousand reasons why you make every day special.
            Click on any letter to discover what's inside
          </p>
        </div>

        {/* Eternal Countdown */}
        <div className="mb-12 max-w-3xl mx-auto">
          <EternalCountdown />
        </div>

        {/* Music Player */}
        <div className="flex justify-center gap-4 mb-12 flex-wrap">
          <Button
            onClick={togglePlay}
            variant="outline"
            size="lg"
            className="bg-card/50 backdrop-blur-sm border-rose-light/30 hover:bg-rose/10 hover:border-rose transition-all duration-300 shadow-soft font-romantic text-lg"
          >
            {isPlaying ? (
              <>
                <Pause className="w-5 h-5 mr-2 fill-rose" />
                Pause Our Song
              </>
            ) : (
              <>
                <Play className="w-5 h-5 mr-2 fill-rose" />
                Play Our Song
              </>
            )}
          </Button>
          <audio ref={audioRef} src={ourSong} preload="auto" onEnded={() => setIsPlaying(false)} />
        </div>

        {/* Interactive Letters */}
        <div className="mb-16">
          <h2 className="text-3xl font-elegant font-semibold text-center mb-8 text-foreground">
            Click Each Letter to Explore 💕
          </h2>
          <div className="flex flex-wrap justify-center gap-6 sm:gap-8">
            {letters.map((letter, index) => (
              <LetterCard key={`${letter}-${index}`} letter={letter} index={index} />
            ))}
          </div>
        </div>


        {/* Quick Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {[
            { title: "Memory Garden", emoji: "💐", path: "/garden" },
            { title: "Secret Diary", emoji: "📖", path: "/diary" },
            { title: "Moments That Made Us", emoji: "✨", path: "/moments" },
            { title: "Unnati's Universe", emoji: "🌌", path: "/universe", special: true },
          ].map((item) => (
            <a
              key={item.path}
              href={item.path}
              className="relative block"
            >
              <div className="relative h-full rounded-2xl border border-rose-light/20 p-2">
                <GlowingEffect
                  spread={40}
                  glow={true}
                  disabled={false}
                  proximity={64}
                  inactiveZone={0.01}
                  borderWidth={2}
                />
                <div
                  className={`relative group h-full rounded-xl p-6 text-center transition-all duration-300 shadow-soft hover:shadow-romantic hover:-translate-y-1 ${item.special
                    ? 'bg-gradient-rose-gold border-2 border-rose animate-pulse-glow'
                    : 'bg-card/60 backdrop-blur-sm hover:bg-card'
                    }`}
                >
                  <div className={`text-5xl mb-3 transition-transform duration-300 ${item.special ? 'animate-heartbeat' : 'group-hover:scale-110'
                    }`}>
                    {item.emoji}
                  </div>
                  <h3 className={`text-xl font-elegant font-semibold ${item.special ? 'text-white' : 'text-foreground'
                    }`}>
                    {item.title}
                  </h3>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center mt-16 pt-8 border-t border-rose-light/20">
          <p className="font-romantic text-lg text-foreground/60 mb-2">
            This entire universe was created just for you, Unnati ✨
          </p>
          <p className="font-romantic text-sm text-muted-foreground mt-2">
            Every pixel, every word, every animation — all filled with my love 💖
          </p>
          <p className="font-romantic text-xs text-muted-foreground/70 mt-4 italic">
            Made with eternal love by Tabish Ahmad ❤️
          </p>
        </div>
      </div>

      {/* Apple-style Dock Navigation */}
      <div className='fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-full flex justify-center'>
        <Dock className='items-end pb-3'>
          <Link to="/gallery">
            <DockItem className='aspect-square rounded-full bg-gradient-to-br from-red-500 to-pink-500'>
              <DockLabel>Gallery</DockLabel>
              <DockIcon>
                <Heart className='h-full w-full text-white' />
              </DockIcon>
            </DockItem>
          </Link>

          <Link to="/pixelated-portrait">
            <DockItem className='aspect-square rounded-full bg-gradient-to-br from-fuchsia-500 to-pink-500'>
              <DockLabel>Portrait Art</DockLabel>
              <DockIcon>
                <Image className='h-full w-full text-white' />
              </DockIcon>
            </DockItem>
          </Link>

          <Link to="/stardust-memories">
            <DockItem className='aspect-square rounded-full bg-gradient-to-br from-purple-500 to-indigo-500'>
              <DockLabel>Stardust Memories</DockLabel>
              <DockIcon>
                <Star className='h-full w-full text-white' />
              </DockIcon>
            </DockItem>
          </Link>

          <Link to="/hero-parallax">
            <DockItem className='aspect-square rounded-full bg-gradient-to-br from-cyan-500 to-blue-500'>
              <DockLabel>Our Journey</DockLabel>
              <DockIcon>
                <Layout className='h-full w-full text-white' />
              </DockIcon>
            </DockItem>
          </Link>

          <Link to="/love-dome-3d">
            <DockItem className='aspect-square rounded-full bg-gradient-to-br from-rose-500 to-pink-500'>
              <DockLabel>Love Dome 🌹</DockLabel>
              <DockIcon>
                <Sparkles className='h-full w-full text-white' />
              </DockIcon>
            </DockItem>
          </Link>



          <Link to="/particles">
            <DockItem className='aspect-square rounded-full bg-gradient-to-br from-teal-500 to-emerald-500'>
              <DockLabel>Magic Particles</DockLabel>
              <DockIcon>
                <Hand className='h-full w-full text-white' />
              </DockIcon>
            </DockItem>
          </Link>
        </Dock>
      </div>

      {/* Slow heartbeat animation */}
      <style>{`
        @keyframes softPulse {
          0%, 100% {
            opacity: 0.7;
            transform: scale(1);
          }
          50% {
            opacity: 0.9;
            transform: scale(1.01);
          }
        }
        .animate-softPulse {
          animation: softPulse 12s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Index;
