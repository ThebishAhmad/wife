import { useParams, Link } from "react-router-dom";
import { FloatingHearts } from "@/components/FloatingHearts";
import { Heart, ArrowLeft, Sparkles, Volume2, Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useRef } from "react";
import ourSong from "@/assets/our-song.mp3";

const letterContent: Record<string, { title: string; message: string; surprise: string; quote: string }> = {
  h: {
    title: "How could I ever explain...",
    message: "How could I ever explain what you mean to me? You're not just a part of my life — you ARE my life. Every heartbeat whispers your name, every breath carries thoughts of you. The way you smile lights up my entire world, and the sound of your laughter is my favorite melody. You've taught me what it means to truly love someone, to care so deeply that their happiness becomes more important than your own. How blessed am I to have found someone who makes every ordinary moment feel magical?",
    surprise: "You make my heart race and my soul peaceful all at once 💕",
    quote: "Home is wherever I'm with you"
  },
  a: {
    title: "All the stars in the sky...",
    message: "All the stars in the sky remind me of your eyes — bright, mesmerizing, and full of wonder. When I look at you, I see infinity. I see late-night conversations and early morning coffee. I see adventures waiting to happen and quiet moments of peace. You are absolutely everything I never knew I needed and everything I'll never let go. Your presence in my life has transformed ordinary days into extraordinary memories. Every moment with you feels like a gift I never want to unwrap too quickly because I want it to last forever.",
    surprise: "Your eyes hold galaxies, and I'm lost in them willingly ✨",
    quote: "In all the world, there is no heart for me like yours"
  },
  p: {
    title: "Perhaps destiny knew...",
    message: "Perhaps destiny knew what it was doing when it brought you to me. Some people say soulmates are rare, but I know I found mine in you. You're my person, my safe space, my greatest adventure. In a world full of temporary things, you are my constant. You've shown me that love isn't just a feeling — it's a choice we make every single day, and I choose you today, tomorrow, and always. Thank you for being patient with my flaws, for celebrating my victories, and for holding my hand through every storm.",
    surprise: "We were written in the stars long before we met 🌟",
    quote: "You are my today and all of my tomorrows"
  },
  y: {
    title: "You are my everything...",
    message: "You are my sunshine on cloudy days, my anchor in rough seas, my peace in chaos. You've given me a love so pure and beautiful that sometimes I wonder if I'm dreaming. But then you smile at me, and I know this is real — this magical, wonderful, extraordinary thing we share. You inspire me to be better, to dream bigger, to love harder. With you, I've learned that home isn't a place; it's a person. And you, my darling, are my forever home.",
    surprise: "You make me believe in magic and fairy tales 🧚‍♀️",
    quote: "Every love story is beautiful, but ours is my favorite"
  },
  b: {
    title: "Beautiful doesn't begin to describe you...",
    message: "Beautiful doesn't begin to describe you. You're poetry in motion, grace personified, love made tangible. Your beauty radiates from within — from your kind heart, your gentle spirit, your infectious joy. You have this incredible way of making everyone around you feel special, but you make me feel like the luckiest person alive. I love how your eyes crinkle when you laugh, how you scrunch your nose when you're thinking, how you light up when you talk about things you're passionate about. Every detail, every quirk — I'm in love with all of it.",
    surprise: "Your inner beauty outshines the brightest stars 💫",
    quote: "You are altogether beautiful, my darling"
  },
  i: {
    title: "In your arms, I've found my paradise...",
    message: "In your arms, I've found my paradise — a place where all my worries fade away and nothing else matters but this moment with you. You make me feel safe, cherished, and deeply loved. I love how we can talk about everything and nothing, how silence with you feels comfortable, how your presence alone brings me peace. You've turned my life into the greatest love story I could have ever imagined. Thank you for choosing me, for loving me, for being the incredible person you are.",
    surprise: "In your embrace, I find my strength and my serenity 🕊️",
    quote: "In your arms is where I belong"
  },
  r: {
    title: "Remember when we first met?",
    message: "Remember when we first met? I knew right then that you were special. Little did I know you'd become my entire world. Every moment we've shared since then has been a treasure — from silly inside jokes to deep conversations at 2 AM, from adventures in new places to cozy nights at home. You've filled my life with so much laughter, love, and happiness. I find myself falling for you more deeply every single day. You're not just my girlfriend — you're my best friend, my confidant, my greatest blessing.",
    surprise: "Every memory with you is my favorite memory ❤️",
    quote: "I fell in love the way you fall asleep: slowly, and then all at once"
  },
  t: {
    title: "Together, we can conquer anything...",
    message: "Together, we can conquer anything life throws our way. You make me brave when I'm scared, strong when I'm weak, hopeful when I'm doubtful. Our love is a force that nothing can break. I dream of all the tomorrows we'll share — building a life full of love, laughter, and endless adventures. I want to wake up next to you every morning, hold your hand through every season, and love you more fiercely with each passing year. Thank you for being my partner in this beautiful journey called life.",
    surprise: "With you by my side, I'm invincible 💪",
    quote: "Together is my favorite place to be"
  },
  d: {
    title: "Darling, you deserve the world...",
    message: "Darling, you deserve the world, and I promise to spend every day trying to give it to you. You deserve all the happiness, all the love, all the beautiful moments life has to offer. I want to be the reason you smile, the one who makes you feel cherished, the person who reminds you every day how extraordinary you are. You've given me so much — your time, your trust, your heart — and I don't take any of it for granted. I will always strive to be worthy of your love and to make you as happy as you make me.",
    surprise: "You deserve every star in the sky, and I'll keep reaching for them 🌠",
    quote: "You are my sun, my moon, and all my stars"
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
              Or explore all letters from the beginning...
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
