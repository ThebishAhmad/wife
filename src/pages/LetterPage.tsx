import { useParams, Link } from "react-router-dom";
import { FloatingHearts } from "@/components/FloatingHearts";
import { Heart, ArrowLeft, Sparkles, Volume2, Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useRef } from "react";
import ourSong from "@/assets/happybirthday.mp3";

const letterContent: Record<string, { title: string; message: string; surprise: string; quote: string }> = {
  h: {
    title: "How could I ever",
    message: "How could I ever explain what you mean to me? You're not just a part of my life, you are my life. You've been my life ever since we met. Every heartbeat whispers your name, every breath carries thoughts of you. The way you smile lights up my entire world, and the sound of your laugh is my favorite song(yes it's better than the sailor song).",
    surprise: "You make my heart race and my soul peaceful all at once",
    quote: "Music Is Slavery (Our first quote)"
  },
  a: {
    title: "All my life",
    message: "All these years I've been living, but now if I look back, there's only one question, was I? Cuz life without U nnati is like a lassi without a pugg, it's like a pug without its loyalty. I'm sure God was preparing my future with you by not letting us meet right as we were born, cuz life with you feels just so easy.",
    surprise: "Your eyes hold galaxies, and I'm lost in them willingly",
    quote: "give and take, take and give, he gag and tick, that makes me sick"
  },
  p: {
    title: "plsplspspls be my wife",
    message: "Thanks. In a world full of temporary things, you are my constant. You've shown me that love isn't just a feeling, it's a choice we make every single day, and I choose you today, tomorrow, and always. 16th December marks the beginning of the year because life started only when you were born. I look forward to 17th December cuz that's another day with The Great Unnati.",
    surprise: "We're married!",
    quote: "You are my today and all of my tomorrows"
  },
  y: {
    title: "You are my everything",
    message: "I feel like people don't understand when I say everything, I mean everything. Every breath, every blink, every heartbeat my heart beats, it's for you. With you, I've learned that home isn't a place, it's a person. And you honey buns are that one and only 2 floored candle lit, full of books and mirrors and chandeliers, the perfect apartment.",
    surprise: "Ngl, your black magic worked. I'm yours forever",
    quote: "don't be a samosa"
  },
  b: {
    title: "Be a good-",
    message: "Thanks again. Chaque fois que tu me regardes, j'oublie ce que je voulais dire. (yes its chatgpt'd itni nai aati abhi 😞) BUTTTTTTTT it's crazy how far we've come, we never knew where we were but now I have the clearest path. It's you. Don't need no Dijkstra for it.",
    surprise: "Je vous aime",
    quote: "you're the quote"
  },
  i: {
    title: "It's impossible to fathom",
    message: "Is this not crazy? We're both 20 now, oldie. Feels like I've known you for 2 decades, whatever that equates to. Congrats on being stuck for a decade more decades and more to come. I wish you luck, you'll need it 😏",
    surprise: "Surprise you'll get in 4 days abhi aise hi baitho",
    quote: "be an inconvenience"
  },
  r: {
    title: "Remember when we first met?",
    message: "Remember when we first met? I knew right then that you were special(specially abled(joke)). Little did I know you'd become my entire world. Every moment we've shared since then has been a treasure, from silly inside jokes to deep conversations at 4 AM. From an intense every-second-counts moment to going to a Police station. I find myself falling for you more deeply every single day.",
    surprise: "The hoodie was the surprise",
    quote: "raspberry and strawberry all are berries"
  },
  t: {
    title: "The best of life we've lived together",
    message: "I look back at my best memories and all I can think of is us. Us spending normal days together doing normal stuff. I dream of all the tomorrows we'll share, building a life full of love, laughter, and endless adventures. I want to wake up next to you every morning, hold your hand through every season, and love you more fiercely with each passing day.",
    surprise: "Welcome to my College",
    quote: "i like bread and butter, you're a good nutter"
  },
  d: {
    title: "Dreamy",
    message: "You are actually dreamy. I keep dreaming about you whether I'm sleeping or not. It's kinda crazy. I feel like Ove how you add colors to my life, wife. You gotta write a book. I'd read it a thousand times over. I'll give you more chapters to add 😏",
    surprise: "Can't order dominos to your place 😔",
    quote: "I love Tabish but he loves shitting"
  },
};

const LetterPage = () => {
  const { letter } = useParams<{ letter: string }>();
  const content = letter ? letterContent[letter] : null;
  const [showQuote, setShowQuote] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  
  const allLetters = Object.keys(letterContent);
  const currentIndex = letter ? allLetters.indexOf(letter) : -1;
  const prevLetter = currentIndex > 0 ? allLetters[currentIndex - 1] : null;
  const nextLetter = currentIndex < allLetters.length - 1 ? allLetters[currentIndex + 1] : null;

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

  if (!content) {
    return (
      <div className="min-h-screen bg-gradient-soft flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-elegant font-bold text-foreground mb-4">
            Letter not found
          </h1>
          <Link to="/">
            <Button variant="outline" size="lg">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-soft relative overflow-hidden">
      <FloatingHearts />
      
      {/* Floating Quote Animation */}
      {showQuote && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-5">
          <p className="font-romantic text-2xl sm:text-3xl text-rose/30 animate-fade-in italic max-w-2xl text-center px-4">
            "{content.quote}"
          </p>
        </div>
      )}
      
      <div className="relative z-10 container mx-auto px-4 py-12 max-w-4xl">
        {/* Back Button */}
        <Link to="/">
          <Button
            variant="outline"
            size="lg"
            className="mb-8 bg-card/50 backdrop-blur-sm border-rose-light/30 hover:bg-rose/10"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </Link>

        {/* Letter Content */}
        <div className="bg-card/80 backdrop-blur-md rounded-3xl p-8 sm:p-12 shadow-romantic border border-rose-light/30 space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-romantic rounded-full shadow-glow mb-4">
              <span className="text-5xl font-elegant font-bold text-white animate-pulse">
                {letter?.toUpperCase()}
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-elegant font-bold text-gradient-romantic">
              {content.title}
            </h1>
          </div>

          {/* Message */}
          <div className="prose prose-lg max-w-none">
            <p className="text-lg sm:text-xl leading-relaxed text-foreground/90 font-romantic">
              {content.message}
            </p>
          </div>

          {/* Surprise Box with Heartbeat */}
          <div className="bg-gradient-romantic p-6 rounded-2xl shadow-glow relative overflow-hidden">
            <div className="absolute inset-0 animate-pulse-glow"></div>
            <div className="relative z-10 flex items-start gap-3">
              <Sparkles className="w-6 h-6 text-white flex-shrink-0 mt-1 animate-sparkle" />
              <div>
                <h3 className="text-xl font-elegant font-semibold text-white mb-2">
                  A Little Surprise...
                </h3>
                <p className="text-white/90 font-romantic text-lg">
                  {content.surprise}
                </p>
              </div>
            </div>
          </div>

          {/* Voice Message */}
          <div className="bg-card/40 backdrop-blur-sm p-6 rounded-2xl border border-rose-light/20">
            <div className="flex items-center gap-4">
              <button 
                onClick={togglePlay}
                className="flex-shrink-0 w-12 h-12 bg-rose/20 hover:bg-rose/30 rounded-full flex items-center justify-center transition-colors"
              >
                {isPlaying ? (
                  <Pause className="w-6 h-6 text-rose fill-rose" />
                ) : (
                  <Play className="w-6 h-6 text-rose fill-rose ml-0.5" />
                )}
              </button>
              <div className="flex-1">
                <p className="font-romantic text-sm text-foreground/70 mb-1">
                  Voice Message 🎵
                </p>
                <p className="font-romantic text-xs text-foreground/50 italic">
                  A special message just for you 💕
                </p>
              </div>
            </div>
            <audio ref={audioRef} src={ourSong} preload="auto" onEnded={() => setIsPlaying(false)} />
          </div>

          {/* Hearts */}
          <div className="flex justify-center gap-4 pt-6">
            {[...Array(5)].map((_, i) => (
              <Heart
                key={i}
                className="w-8 h-8 fill-rose text-rose animate-pulse"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        </div>

        {/* Navigation to other letters */}
        <div className="mt-12 space-y-6">
          <div className="flex justify-center gap-4">
            {prevLetter && (
              <Link to={`/letter/${prevLetter}`}>
                <Button
                  variant="outline"
                  size="lg"
                  className="bg-card/50 backdrop-blur-sm border-rose-light/30 hover:bg-rose/10 font-romantic"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Previous Letter ({prevLetter.toUpperCase()})
                </Button>
              </Link>
            )}
            {nextLetter && (
              <Link to={`/letter/${nextLetter}`}>
                <Button
                  size="lg"
                  className="bg-gradient-romantic hover:shadow-glow transition-all duration-300 font-romantic"
                >
                  Next Letter ({nextLetter.toUpperCase()})
                  <Heart className="w-4 h-4 ml-2 fill-white" />
                </Button>
              </Link>
            )}
          </div>
          <div className="text-center">
            <p className="font-romantic text-sm text-foreground/70 mb-4">
              Or explore all letters from the beginning
            </p>
            <Link to="/">
              <Button
                variant="outline"
                className="bg-card/50 backdrop-blur-sm border-rose-light/30 hover:bg-rose/10 font-romantic"
              >
                <Heart className="w-4 h-4 mr-2" />
                See All Letters
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LetterPage;
