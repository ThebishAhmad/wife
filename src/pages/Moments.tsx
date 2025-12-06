import { Heart, Camera, MessageCircle, Music, Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

import OurSong from "@/assets/our-song.mp3"; // 🔥 GLOBAL SONG IMPORT


const moments = [
  "That time your laugh made everything make sense.",
  "When you looked at me and I forgot every word I knew.",
  "The day I realized home isn't a place, it's you.",
  "Every quiet moment when your presence spoke louder than words.",
  "When your smile turned my ordinary day into magic.",
  "The moment I knew my heart had found its forever.",
  "Every time you said my name and it sounded like a prayer.",
  "When your hand found mine and the world felt complete.",
  "That sunset when I realized you're my favorite view.",
  "Every goodbye that made me count the seconds until hello.",
];

const Moments = () => {
  const navigate = useNavigate();
  const [selectedCard, setSelectedCard] = useState<number | null>(null);

  // 🔊 AUDIO PLAYER
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const playPause = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  // Stop when dialog closes
  useEffect(() => {
    if (selectedCard === null && audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  }, [selectedCard]);

  // 🔥 All songs can be changed later
  const cardDetails = [
    {
      title: "First Date",
      fullStory:
        "The nervousness, the excitement, the butterflies. Everything felt magical.",
      song: OurSong, // 🔥 This plays
      songName: "Perfect by Ed Sheeran", // 🔥 Shown to user
      memory: "You wore that smile that made my heart skip."
    },
    {
      title: "Sunset Together",
      fullStory:
        "As the sky painted itself in shades of orange and pink, I realized something.",
      song: OurSong,
      songName: "Photograph by Ed Sheeran",
      memory: "The way the light caught your eyes - unforgettable."
    },
    {
      title: "Stargazing",
      fullStory:
        "Under a blanket of stars, the world felt smaller when I was with you.",
      song: OurSong,
      songName: "A Sky Full of Stars by Coldplay",
      memory: "You said you made a wish, but wouldn't tell me what it was."
    },
    {
      title: "Coffee Time",
      fullStory: "Simple moments over coffee became my favorite moments.",
      song: OurSong,
      songName: "Coffee by Miguel",
      memory: "You had foam on your nose for 5 minutes."
    },
    {
      title: "Adventure",
      fullStory:
        "Getting lost with you always felt better than being found alone.",
      song: OurSong,
      songName: "Adventure of a Lifetime by Coldplay",
      memory: "We took the wrong trail but found the best view."
    },
    {
      title: "Beach Day",
      fullStory:
        "Sand between our toes, waves at our feet, your hand in mine.",
      song: OurSong,
      songName: "Island in the Sun by Weezer",
      memory: "You collected seashells and said each one told a story."
    },
  ];

  const cards = [
    {
      title: "First Date",
      src: "https://images.unsplash.com/photo-1518568814500-bf0f8d125f46?q=80&w=800&auto=format&fit=crop"
    },
    {
      title: "Sunset Together",
      src: "https://images.unsplash.com/photo-1501854140801-50d01698950b?q=80&w=800&auto=format&fit=crop"
    },
    {
      title: "Stargazing",
      src: "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=800&auto=format&fit=crop"
    },
    {
      title: "Coffee Time",
      src: "https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=800&auto=format&fit=crop"
    },
    {
      title: "Adventure",
      src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=800&auto=format&fit=crop"
    },
    {
      title: "Beach Day",
      src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop"
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-soft relative overflow-hidden">

      {/* FLOATING HEARTS */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <Heart
            key={i}
            className="absolute animate-float-slow opacity-10 fill-rose-light text-rose-light"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${20 + Math.random() * 30}px`,
              height: `${20 + Math.random() * 30}px`,
              animationDelay: `${Math.random() * 5}s`
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

        <h1 className="text-4xl sm:text-6xl font-elegant font-bold text-center mb-4 text-gradient-romantic animate-glow">
          Moments That Made Us
        </h1>

        <p className="text-center font-romantic text-lg text-foreground/80 mb-12 max-w-2xl mx-auto">
          Each memory, a heartbeat. Each heartbeat, a promise of forever.
        </p>

        {/* MOMENTS */}
        <div className="max-w-3xl mx-auto space-y-8">
          {moments.map((moment, index) => (
            <div
              key={index}
              className="bg-card/60 backdrop-blur-sm rounded-2xl p-8 shadow-romantic border border-rose-light/20 animate-fade-in"
            >
              <div className="flex items-start gap-4">
                <Heart className="w-6 h-6 fill-rose text-rose animate-pulse" />
                <p className="font-romantic text-xl text-foreground leading-relaxed">
                  {moment}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* PHOTO GALLERY */}
        <div className="mt-20 mb-12">
          <h2 className="text-3xl font-elegant font-bold text-center mb-8 text-gradient-romantic">
            Our Photo Gallery
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cards.map((card, index) => (
              <button
                key={index}
                onClick={() => setSelectedCard(index)}
                className="group relative overflow-hidden rounded-2xl shadow-romantic hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                <img src={card.src} className="w-full h-64 object-cover" />

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-white text-2xl font-bold mb-2">{card.title}</h3>
                    <div className="flex items-center gap-3 text-white/80">
                      <Camera className="w-5 h-5" />
                      <MessageCircle className="w-5 h-5" />
                      <Music className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* DIALOG */}
        <Dialog open={selectedCard !== null} onOpenChange={() => setSelectedCard(null)}>
          <DialogContent className="max-w-2xl bg-gradient-to-br from-pink-50 to-rose-50 border-rose-200 p-6">

            {selectedCard !== null && (
              <>
                <DialogHeader>
                  <DialogTitle className="text-3xl font-elegant text-gradient-romantic">
                    {cardDetails[selectedCard].title}
                  </DialogTitle>
                </DialogHeader>

                {/* SONG FILE USED: cardDetails[selectedCard].song */}
                <audio ref={audioRef} src={cardDetails[selectedCard].song}></audio>

                <div className="space-y-6">
                  
                  <img
                    src={cards[selectedCard].src}
                    className="w-full h-80 object-cover rounded-xl shadow-lg"
                  />

                  <div className="space-y-4 p-6 bg-white/60 backdrop-blur-sm rounded-xl">

                    {/* STORY */}
                    <div className="flex items-start gap-3">
                      <MessageCircle className="w-6 h-6 text-rose-500" />
                      <div>
                        <h4 className="font-bold text-gray-800 mb-2">Our Story</h4>
                        <p className="text-gray-700 font-romantic leading-relaxed">
                          {cardDetails[selectedCard].fullStory}
                        </p>
                      </div>
                    </div>

                    {/* MEMORY */}
                    <div className="flex items-start gap-3">
                      <Heart className="w-6 h-6 text-rose-500 fill-rose-500" />
                      <div>
                        <h4 className="font-bold text-gray-800 mb-2">Special Memory</h4>
                        <p className="text-gray-700 font-romantic italic">
                          {cardDetails[selectedCard].memory}
                        </p>
                      </div>
                    </div>

                    {/* SONG (VARIABLE) + PLAY BUTTON */}
                    <div className="flex flex-col gap-3">

                      <div className="flex items-center gap-2">
                        <Music className="w-6 h-6 text-rose-500" />
                        <h4 className="font-bold text-gray-800">Our Song</h4>
                      </div>

                      <p className="text-gray-700 font-romantic">
                        {cardDetails[selectedCard].songName}
                      </p>

                      <Button
                        variant="outline"
                        onClick={playPause}
                        className="w-fit flex items-center gap-2 border-rose-300 text-rose-600 hover:bg-rose-100"
                      >
                        {isPlaying ? (
                          <>
                            <Pause className="w-5 h-5" /> Pause
                          </>
                        ) : (
                          <>
                            <Play className="w-5 h-5" /> Play
                          </>
                        )}
                      </Button>
                    </div>

                  </div>
                </div>

              </>
            )}

          </DialogContent>
        </Dialog>

        <div className="text-center mt-16">
          <p className="font-romantic text-lg text-foreground/60">
            Every moment with you is a memory I treasure ✨
          </p>
        </div>

      </div>
    </div>
  );
};

export default Moments;
