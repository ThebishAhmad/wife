import { useState, useRef, useEffect } from "react";
import { Heart, Music, Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import ourSong from "@/assets/our-song.mp3";

const OurSong = () => {
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => setIsPlaying(false);
    audio.addEventListener('ended', handleEnded);
    return () => audio.removeEventListener('ended', handleEnded);
  }, []);

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

  return (
    <div className="min-h-screen bg-gradient-soft relative overflow-hidden flex items-center justify-center">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        {isPlaying && [...Array(30)].map((_, i) => (
          <Heart
            key={i}
            className="absolute animate-float-slow fill-rose-light/20 text-rose-light/20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${15 + Math.random() * 25}px`,
              height: `${15 + Math.random() * 25}px`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
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

        <div className="max-w-2xl mx-auto text-center space-y-8">
          <div>
            <h1 className="text-4xl sm:text-6xl font-elegant font-bold mb-4 text-gradient-romantic animate-glow">
              Our Song 🎵
            </h1>
            <p className="font-romantic text-lg text-foreground/80">
              Every beat, every note, every lyric reminds me of us...
            </p>
          </div>

          {/* Music Player */}
          <div className="bg-card/60 backdrop-blur-sm rounded-3xl p-12 shadow-romantic border border-rose-light/20 space-y-8">
            <div className="relative">
              <div className="w-48 h-48 mx-auto bg-gradient-romantic rounded-full shadow-glow flex items-center justify-center">
                <Music className="w-20 h-20 text-white" />
              </div>
              
              {isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-56 h-56 border-4 border-rose/30 rounded-full animate-ping"></div>
                </div>
              )}
            </div>

            <div>
              <h3 className="font-elegant text-2xl text-foreground mb-2">
                Our Special Song
              </h3>
              <p className="font-romantic text-foreground/60">
                The melody of our love story 💕
              </p>
            </div>

            <audio ref={audioRef} src={ourSong} preload="auto" />

            <Button
              size="lg"
              onClick={togglePlay}
              className="bg-rose hover:bg-rose-dark text-white font-romantic text-lg px-8"
            >
              {isPlaying ? (
                <>
                  <Pause className="w-6 h-6 mr-2 fill-white" />
                  Pause
                </>
              ) : (
                <>
                  <Play className="w-6 h-6 mr-2 fill-white" />
                  Play Our Song
                </>
              )}
            </Button>

            {/* Romantic Quote */}
            <div className="pt-6 border-t border-rose-light/20">
              <p className="font-romantic text-xl text-foreground/80 leading-relaxed italic">
                "Where words fail, music speaks. And this song speaks of us." 💕
              </p>
            </div>
          </div>

          {/* Additional Messages */}
          <div className="space-y-4">
            <div className="bg-card/40 backdrop-blur-sm rounded-2xl p-6 border border-rose-light/20">
              <p className="font-romantic text-lg text-foreground">
                Every time I hear this song, I think of you. It's become the soundtrack of my heart,
                playing on repeat, reminding me of every beautiful moment we've shared.
              </p>
            </div>
            
            <div className="bg-card/40 backdrop-blur-sm rounded-2xl p-6 border border-rose-light/20">
              <p className="font-romantic text-lg text-foreground">
                One day, we'll dance to this at our wedding, and I'll hold you close,
                knowing that every note was leading us to that perfect moment. 💃🕺
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurSong;
