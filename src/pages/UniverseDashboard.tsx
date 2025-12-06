import { Link } from "react-router-dom";
import { FloatingHearts } from "@/components/FloatingHearts";
import {
  ArrowLeft,
  Heart,
  Star,
  Clock,
  Map,
  Music,
  Palette,
  BookOpen,
  Atom,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlowingEffect } from "@/components/ui/glowing-effect";

const universeLinks = [
  {
    to: "/constellation",
    icon: Star,
    title: "Love Constellation",
    description: "Connect stars across our universe",
    gradient: "from-indigo-500 to-purple-600",
  },
  {
    to: "/our-date-book",
    icon: BookOpen,
    title: "Our Date Book",
    description: "Turn pages through our romantic journey",
    gradient: "from-amber-500 to-rose-500",
  },
  {
    to: "/hot-cold",
    icon: Heart,
    title: "Hot & Cold Game",
    description: "Find my heart again",
    gradient: "from-rose-500 to-red-600",
  },
  {
    to: "/elevator",
    icon: Map,
    title: "Memory Elevator",
    description: "Journey through our memories",
    gradient: "from-red-500 to-orange-600",
  },
  {
    to: "/taylor-concert",
    icon: Music,
    title: "Taylor's Eras Tour",
    description: "Control your own Taylor Swift concert",
    gradient: "from-pink-400 to-purple-400",
  },
  {
    to: "/coupons",
    icon: Heart,
    title: "Love Coupons",
    description: "Sweet gestures waiting to be redeemed",
    gradient: "from-rose-500 to-pink-500",
  },
  {
    to: "/love-story",
    icon: BookOpen,
    title: "Our Love Story",
    description: "3D carousel of our beautiful chapters",
    gradient: "from-violet-500 to-fuchsia-500",
  },
  {
    to: "/quantum-playground",
    icon: Atom,
    title: "Love Energy Portal",
    description: "Interactive love particles & energy",
    gradient: "from-pink-600 to-rose-600",
  },
  {
    to: "/love-scroll-journey",
    icon: Palette,
    title: "Love Scroll Journey",
    description: "Beautiful scrolling experience of our love",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    to: "/infinite-memories",
    icon: Heart,
    title: "Infinite Memories ✨",
    description: "Interactive sphere of endless love",
    gradient: "from-pink-600 to-purple-600",
  },
];

const UniverseDashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-cosmic relative overflow-hidden">
      <FloatingHearts />

      {/* Background stars */}
      <div className="absolute inset-0">
        {Array.from({ length: 100 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              opacity: Math.random() * 0.7 + 0.3,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12">
        <div className="text-center space-y-6 mb-12">
          <Link to="/">
            <Button
              variant="outline"
              size="lg"
              className="mb-4 bg-card/50 backdrop-blur-sm border-rose-light/30 hover:bg-rose/10"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <h1 className="text-4xl sm:text-6xl font-elegant font-bold text-white animate-glow">
            Unnati's Universe 🌌
          </h1>
          <p className="text-xl font-romantic text-white/90 max-w-2xl mx-auto">
            Your personal control center of our infinite love
          </p>
        </div>

        {/* Numpad layout: 3x3 grid + 1 centered at bottom */}
        <div className="max-w-6xl mx-auto grid grid-cols-3 gap-6">
          {universeLinks.slice(0, 9).map((link) => {
            const Icon = link.icon;
            return (
              <Link key={link.to} to={link.to}>
                <div className="group relative bg-card/80 backdrop-blur-md rounded-3xl p-2 border border-white/20 shadow-glow hover:scale-105 transition-all duration-300 overflow-hidden h-full">
                  <GlowingEffect
                    spread={40}
                    glow={true}
                    disabled={false}
                    proximity={64}
                    inactiveZone={0.01}
                    borderWidth={2}
                  />
                  
                  {/* Gradient overlay */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${link.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-3xl`}
                  />

                  {/* Content */}
                  <div className="relative z-10 space-y-4 p-6">
                    <div
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${link.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-elegant font-bold text-foreground mb-2">
                        {link.title}
                      </h3>
                      <p className="text-sm font-romantic text-muted-foreground">
                        {link.description}
                      </p>
                    </div>
                  </div>

                  {/* Hover particles */}
                  <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {Array.from({ length: 10 }).map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-1 h-1 bg-white rounded-full animate-twinkle"
                        style={{
                          left: `${Math.random() * 100}%`,
                          top: `${Math.random() * 100}%`,
                          animationDelay: `${Math.random() * 2}s`,
                        }}
                      />
                    ))}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Centered 10th item (Infinite Memories - below Love Energy Portal) */}
        <div className="max-w-6xl mx-auto mt-6 flex justify-center">
          <div className="w-full max-w-[calc(33.333%-1rem)] md:max-w-[calc(33.333%-1rem)]">
            {(() => {
              const link = universeLinks[9];
              const Icon = link.icon;
              return (
                <Link to={link.to}>
                  <div className="group relative bg-card/80 backdrop-blur-md rounded-3xl p-2 border border-white/20 shadow-glow hover:scale-105 transition-all duration-300 overflow-hidden h-full">
                    <GlowingEffect
                      spread={40}
                      glow={true}
                      disabled={false}
                      proximity={64}
                      inactiveZone={0.01}
                      borderWidth={2}
                    />
                    
                    {/* Gradient overlay */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${link.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-3xl`}
                    />

                    {/* Content */}
                    <div className="relative z-10 space-y-4 p-6">
                      <div
                        className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${link.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                      >
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-elegant font-bold text-foreground mb-2">
                          {link.title}
                        </h3>
                        <p className="text-sm font-romantic text-muted-foreground">
                          {link.description}
                        </p>
                      </div>
                    </div>

                    {/* Hover particles */}
                    <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {Array.from({ length: 10 }).map((_, i) => (
                        <div
                          key={i}
                          className="absolute w-1 h-1 bg-white rounded-full animate-twinkle"
                          style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 2}s`,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </Link>
              );
            })()}
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm font-romantic text-white/70">
            Explore every corner of our infinite love universe ✨
          </p>
        </div>
      </div>
    </div>
  );
};

export default UniverseDashboard;
