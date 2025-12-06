import { Heart, Sparkles, Star, Music, Calendar, Gift } from "lucide-react";
import RadialOrbitalTimeline from "@/components/ui/radial-orbital-timeline";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const journeyData = [
  {
    id: 1,
    title: "First Meeting",
    date: "The Beginning",
    content: "The moment our paths crossed and everything changed. A serendipitous encounter that marked the start of something beautiful.",
    category: "Memory",
    icon: Heart,
    relatedIds: [2],
    status: "completed" as const,
    energy: 100,
  },
  {
    id: 2,
    title: "First Date",
    date: "Magic Moments",
    content: "Our first date was filled with laughter, butterflies, and the exciting promise of what was to come.",
    category: "Memory",
    icon: Sparkles,
    relatedIds: [1, 3],
    status: "completed" as const,
    energy: 95,
  },
  {
    id: 3,
    title: "Special Moments",
    date: "Growing Together",
    content: "All the little moments that made us realize this was something truly special and worth cherishing.",
    category: "Memory",
    icon: Star,
    relatedIds: [2, 4],
    status: "completed" as const,
    energy: 90,
  },
  {
    id: 4,
    title: "Our Song",
    date: "Soundtrack of Us",
    content: "The song that became ours, playing in the background of our most precious memories.",
    category: "Memory",
    icon: Music,
    relatedIds: [3, 5],
    status: "in-progress" as const,
    energy: 85,
  },
  {
    id: 5,
    title: "Adventures",
    date: "Exploring Together",
    content: "All the adventures we've shared and the ones we're planning. Every journey is better with you.",
    category: "Memory",
    icon: Calendar,
    relatedIds: [4, 6],
    status: "in-progress" as const,
    energy: 75,
  },
  {
    id: 6,
    title: "Future Plans",
    date: "Forever Ahead",
    content: "All the dreams we're building together, the future we're creating side by side.",
    category: "Memory",
    icon: Gift,
    relatedIds: [5],
    status: "pending" as const,
    energy: 60,
  },
];

export default function OurJourneyTimeline() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-rose-950">
      <Link to="/universe">
        <Button variant="outline" className="absolute top-4 left-4 z-50 bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20">
          ← Back to Universe
        </Button>
      </Link>
      
      {/* Interactive center element */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
        <div className="relative w-32 h-32 animate-pulse">
          <div className="absolute inset-0 bg-gradient-to-br from-pink-500 to-rose-500 rounded-full animate-ping opacity-20" />
          <div className="relative w-full h-full bg-gradient-to-br from-pink-400 to-rose-400 rounded-full flex items-center justify-center shadow-2xl">
            <Heart className="w-16 h-16 text-white fill-white animate-bounce" />
          </div>
        </div>
      </div>

      <RadialOrbitalTimeline timelineData={journeyData} />
    </div>
  );
}
