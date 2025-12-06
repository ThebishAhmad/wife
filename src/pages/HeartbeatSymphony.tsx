import { useState, useEffect } from "react";
import { Music, Heart, Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { EvervaultCard } from "@/components/ui/evervault-card";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const HeartbeatSymphony = () => {
  const [playingHeart, setPlayingHeart] = useState(false);
  const [currentSong, setCurrentSong] = useState<number | null>(null);

  /* hearts animation */
  const [hearts, setHearts] = useState<{ id: number; x: number; delay: number }[]>([]);

  useEffect(() => {
    if (playingHeart) {
      const interval = setInterval(() => {
        const newHeart = {
          id: Date.now(),
          x: Math.random() * 100,
          delay: Math.random() * 0.5,
        };
        setHearts((prev) => [...prev, newHeart]);

        setTimeout(() => {
          setHearts((prev) => prev.filter((h) => h.id !== newHeart.id));
        }, 4000);
      }, 300);

      return () => clearInterval(interval);
    }
  }, [playingHeart]);

  /* SONG LIST — text only for now */
  const songs = [
    { title: "Our Song", emoji: "🎵", file: "Song1 (placeholder)" },
    { title: "First Dance", emoji: "💃", file: "Song2 (placeholder)" },
    { title: "Midnight Memories", emoji: "🌙", file: "Song3 (placeholder)" },
    { title: "Forever Yours", emoji: "💖", file: "Song4 (placeholder)" },
    { title: "Love Story", emoji: "📖", file: "Song5 (placeholder)" },
  ];

  const toggleSong = (index: number) => {
    if (currentSong === index) {
      setCurrentSong(null); // pause
    } else {
      setCurrentSong(index); // start playing placeholder
    }
  };

  return (
    <div className="min-h-screen bg-gradient-soft relative overflow-hidden">
      <div className="container mx-auto px-4 py-12 relative z-10">
        <Link to="/" className="inline-block mb-6">
          <Button variant="outline" size="sm">← Back Home</Button>
        </Link>

        <div className="text-center mb-12">
          <h1 className="text-5xl font-elegant font-bold text-gradient-romantic mb-4">
            Heartbeat Symphony 🎵
          </h1>
          <p className="text-xl font-romantic text-foreground/80">
            Music that makes our hearts beat as one
          </p>
        </div>

        {/* ❤️ MAIN HEART ANIMATION */}
        <div className="max-w-2xl mx-auto">
          <Card className="bg-gradient-rose-gold p-8 mb-8 text-center">
            <motion.div
              animate={playingHeart ? { scale: [1, 1.1, 1] } : {}}
              transition={{ duration: 0.6, repeat: Infinity }}
            >
              <Heart className="w-24 h-24 mx-auto text-white fill-white mb-6" />
            </motion.div>

            <h3 className="text-white text-2xl font-elegant font-semibold mb-4">
              Now Playing: Heartbeat Animation
            </h3>

            <Button
              onClick={() => setPlayingHeart(!playingHeart)}
              size="lg"
              variant="outline"
              className="bg-white/20 border-white text-white hover:bg-white/30"
            >
              {playingHeart ? (
                <>
                  <Pause className="w-5 h-5 mr-2" /> Pause Heartbeat
                </>
              ) : (
                <>
                  <Play className="w-5 h-5 mr-2" /> Start Heartbeat
                </>
              )}
            </Button>
          </Card>

          {/* 🎵 SONG LIST WITH PLAY BUTTONS */}
          <div className="grid gap-4">
            {songs.map((song, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className="p-4 bg-card/60 backdrop-blur-sm transition-colors">
                  <div className="flex items-center gap-4">
                    <span className="text-3xl">{song.emoji}</span>

                    <div>
                      <p className="font-elegant text-lg">{song.title}</p>
                      <p className="text-sm text-muted-foreground font-romantic">
                        {song.file}
                      </p>
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleSong(idx)}
                      className="ml-auto flex items-center gap-2"
                    >
                      {currentSong === idx ? (
                        <>
                          <Pause className="w-4 h-4" /> Pause
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4" /> Play
                        </>
                      )}
                    </Button>
                  </div>

                  {currentSong === idx && (
                    <p className="text-rose-500 font-romantic mt-2">
                      ▶ Now Playing (placeholder only)
                    </p>
                  )}
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Frequency Visual */}
          <div className="mt-12">
            <h3 className="text-center text-2xl font-elegant font-bold mb-6 text-foreground">
              Our Love Frequency 🎵
            </h3>
            <div className="h-[300px]">
              <EvervaultCard text="♫" />
            </div>
          </div>
        </div>
      </div>

      {/* Floating animated hearts */}
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          initial={{ y: "100vh", opacity: 1, scale: 0.5 }}
          animate={{ y: "-10vh", opacity: 0, scale: 1.5 }}
          transition={{ duration: 4, delay: heart.delay }}
          style={{
            position: "fixed",
            left: `${heart.x}%`,
            bottom: 0,
            zIndex: 0,
          }}
        >
          <Heart className="w-8 h-8 text-rose fill-rose" />
        </motion.div>
      ))}
    </div>
  );
};

export default HeartbeatSymphony;
