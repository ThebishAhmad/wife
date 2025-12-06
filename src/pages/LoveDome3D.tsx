import { Link } from "react-router-dom";
import { ArrowLeft, Heart, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import DomeGallery from "@/components/ui/DomeGallery";

// Generate unique romantic images for each segment
const generateRomanticImages = () => {
  const topics = [
    "romantic-couple-sunset", "love-heart-hands", "couple-kissing", "romantic-dinner",
    "couple-dancing", "wedding-rings", "love-letters", "couple-beach",
    "romantic-paris", "couple-mountains", "love-roses", "couple-rain",
    "romantic-candlelight", "couple-holding-hands", "love-balloons", "couple-stargazing",
    "romantic-venice", "couple-picnic", "love-coffee", "couple-walk",
    "romantic-garden", "couple-sunset-silhouette", "love-lock-bridge", "couple-winter",
    "romantic-boat", "couple-forest", "love-chocolate", "couple-city",
    "romantic-fireworks", "couple-bike", "love-tulips", "couple-snow",
    "romantic-lighthouse", "couple-ferris-wheel", "love-champagne", "couple-rooftop",
    "romantic-countryside", "couple-tent", "love-guitar", "couple-metro",
    "romantic-lavender", "couple-desert", "love-origami", "couple-waterfall",
    "romantic-bookstore", "couple-motorcycle", "love-lanterns", "couple-arcade",
    "romantic-castle", "couple-carnival", "love-polaroid", "couple-bridge",
    "romantic-cherry-blossom", "couple-train", "love-vinyl", "couple-balcony",
    "romantic-vineyard", "couple-library", "love-perfume", "couple-cafe",
    "romantic-aurora", "couple-gondola", "love-jewelry", "couple-hammock",
    "romantic-cabin", "couple-cliff", "love-diary", "couple-aquarium",
    "romantic-planetarium", "couple-hot-air-balloon", "love-tea", "couple-museum",
    "romantic-fountain", "couple-dock", "love-cinema", "couple-meadow",
    "romantic-theater", "couple-subway", "love-umbrella", "couple-pier",
    "romantic-countryside-lane", "couple-bike-ride", "love-record-player", "couple-art-gallery",
    "romantic-coastal-walk", "couple-moonlight", "love-scrapbook", "couple-vintage-car",
    "romantic-jazz-club", "couple-street-art", "love-postcards", "couple-observatory",
    "romantic-wine-cellar", "couple-flower-field", "love-locket", "couple-bridge-sunset",
    "romantic-ski-lodge", "couple-ice-skating", "love-message-bottle", "couple-secret-garden",
    "romantic-old-town", "couple-cobblestone", "love-typewriter", "couple-sunset-beach",
    "romantic-countryside-cottage", "couple-autumn-leaves", "love-music-box", "couple-candlelit-path",
    "romantic-terrace", "couple-park-bench", "love-handwritten-notes", "couple-lake-reflection",
    "romantic-countryside-road", "couple-starry-night", "love-gift-box", "couple-city-lights",
    "romantic-hillside", "couple-gazebo", "love-bouquet", "couple-embrace",
    "romantic-twilight", "couple-coastal-cliffs", "love-candles", "couple-watching-sunset",
    "romantic-stone-bridge", "couple-countryside-path", "love-silk-ribbon", "couple-enchanted-forest",
    "romantic-lighthouse-view", "couple-seaside-walk", "love-crystal-heart", "couple-mountain-peak",
    "romantic-old-library", "couple-rainy-street", "love-old-photographs", "couple-vintage-cinema",
    "romantic-night-market", "couple-city-rooftop", "love-red-wine", "couple-golden-hour",
    "romantic-botanical-garden", "couple-fairy-lights", "love-antique-ring", "couple-under-stars",
    "romantic-countryside-barn", "couple-sunrise", "love-feather-quill", "couple-ivy-covered-wall",
    "romantic-cobbled-street", "couple-midnight-walk", "love-moon-phases", "couple-forest-path",
    "romantic-hilltop-sunset", "couple-wooden-pier", "love-constellation-map", "couple-field-flowers",
    "romantic-lakeside-cabin", "couple-mountain-trail", "love-vintage-camera", "couple-wildflowers",
    "romantic-stone-cottage", "couple-riverside", "love-compass-rose", "couple-secret-spot"
  ];

  return topics.map((topic, i) => ({
    src: `https://source.unsplash.com/800x800/?${topic},love,romance&sig=${i}`,
    alt: topic.replace(/-/g, ' ')
  }));
};

const LoveDome3D = () => {
  const images = generateRomanticImages();

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-950 via-pink-950 to-purple-900 relative overflow-hidden">
      {/* Ambient particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-pink-300 rounded-full opacity-30 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Floating hearts */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <Heart
            key={i}
            className="absolute text-pink-400/20 fill-pink-400/20 animate-float-slow"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${20 + Math.random() * 30}px`,
              height: `${20 + Math.random() * 30}px`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${10 + Math.random() * 10}s`,
            }}
          />
        ))}
      </div>

      {/* Header */}
      <div className="relative z-10 p-6">
        <div className="text-center mb-8">
          <Link to="/universe">
            <Button
              variant="ghost"
              className="text-white hover:bg-white/10 mb-6"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Universe
            </Button>
          </Link>
          
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="w-8 h-8 text-pink-400 animate-pulse" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-pink-300 via-rose-300 to-purple-300 bg-clip-text text-transparent">
              Our Love Dome 🌹
            </h1>
            <Sparkles className="w-8 h-8 text-pink-400 animate-pulse" />
          </div>
          <p className="text-lg text-pink-200 font-romantic">
            Drag to explore our infinite moments together
          </p>
          <p className="text-sm text-pink-300/70 mt-2">
            Click any photo to view it up close ✨
          </p>
        </div>
      </div>

      {/* 3D Dome Gallery */}
      <div className="relative z-0" style={{ width: '100vw', height: 'calc(100vh - 200px)' }}>
        <DomeGallery
          images={images}
          fit={0.6}
          segments={35}
          overlayBlurColor="#1a0514"
          grayscale={false}
          imageBorderRadius="20px"
          openedImageBorderRadius="24px"
          openedImageWidth="500px"
          openedImageHeight="600px"
          dragSensitivity={18}
          maxVerticalRotationDeg={8}
        />
      </div>

      {/* Glow effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>
    </div>
  );
};

export default LoveDome3D;
