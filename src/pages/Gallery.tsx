import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { DraggableCardBody, DraggableCardContainer } from "@/components/ui/draggable-card";
import { SleekLineCursor } from "@/components/SleekLineCursor";


const Gallery = () => {
  const memories = [
    {
      title: "Our First Date",
      image: "https://images.unsplash.com/photo-1518568814500-bf0f8d125f46?q=80&w=2874&auto=format&fit=crop",
      className: "absolute top-10 left-[20%] rotate-[-5deg]",
    },
    {
      title: "Sunset Together",
      image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?q=80&w=2600&auto=format&fit=crop",
      className: "absolute top-40 left-[25%] rotate-[-7deg]",
    },
    {
      title: "Stargazing Night",
      image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=2940&auto=format&fit=crop",
      className: "absolute top-5 left-[40%] rotate-[8deg]",
    },
    {
      title: "Coffee & Laughs",
      image: "https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=2787&auto=format&fit=crop",
      className: "absolute top-32 left-[55%] rotate-[10deg]",
    },
    {
      title: "Mountain Adventure",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2940&auto=format&fit=crop",
      className: "absolute top-20 right-[35%] rotate-[2deg]",
    },
    {
      title: "Beach Memories",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2946&auto=format&fit=crop",
      className: "absolute top-24 left-[45%] rotate-[-7deg]",
    },
    {
      title: "City Lights",
      image: "https://images.unsplash.com/photo-1514565131-fce0801e5785?q=80&w=2956&auto=format&fit=crop",
      className: "absolute top-8 left-[30%] rotate-[4deg]",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 dark:from-rose-950 dark:via-pink-950 dark:to-purple-950">
      <SleekLineCursor />
      <Link to="/">
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 left-4 z-50"
        >
          <ArrowLeft className="h-6 w-6" />
        </Button>
      </Link>

      <DraggableCardContainer className="relative flex min-h-screen w-full items-center justify-center overflow-clip">
        <div className="absolute top-1/2 mx-auto max-w-3xl -translate-y-1/2 text-center px-4 z-0">
          <h1 className="text-4xl md:text-6xl font-black bg-gradient-to-r from-rose-400 via-pink-400 to-purple-400 bg-clip-text text-transparent mb-4">
            Our Beautiful Moments
          </h1>
          <p className="text-lg text-neutral-600 dark:text-neutral-400">
            Drag the photos around and explore our journey together
          </p>
        </div>
        
        {memories.map((memory, index) => (
          <DraggableCardBody key={index} className={memory.className}>
            <img
              src={memory.image}
              alt={memory.title}
              className="pointer-events-none relative z-10 h-80 w-80 object-cover rounded-md"
            />
            <h3 className="mt-4 text-center text-2xl font-bold text-neutral-700 dark:text-neutral-300">
              {memory.title}
            </h3>
          </DraggableCardBody>
        ))}
      </DraggableCardContainer>
    </div>
  );
};

export default Gallery;
