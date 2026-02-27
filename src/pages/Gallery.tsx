import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { DraggableCardBody, DraggableCardContainer } from "@/components/ui/draggable-card";
import { SleekLineCursor } from "@/components/SleekLineCursor";

import Image1 from "@/assets/1.jpg";
import Image2 from "@/assets/2.jpg";
import Image3 from "@/assets/3.jpg";
import Image4 from "@/assets/4.jpg";
import Image5 from "@/assets/5.jpg";
import Image6 from "@/assets/6.jpg";
import Image7 from "@/assets/7.jpg";


const Gallery = () => {
  const memories = [
    {
      title: "Explain",
      image: Image1,
      className: "absolute top-10 left-[20%] rotate-[-5deg]",
    },
    {
      title: "Can I?",
      image: Image2,
      className: "absolute top-40 left-[25%] rotate-[-7deg]",
    },
    {
      title: "She needs to stop",
      image: Image3,
      className: "absolute top-5 left-[40%] rotate-[8deg]",
    },
    {
      title: "Gang Signs",
      image: Image4,
      className: "absolute top-32 left-[55%] rotate-[10deg]",
    },
    {
      title: "City Views",
      image: Image5,
      className: "absolute top-20 right-[35%] rotate-[2deg]",
    },
    {
      title: "We're fucked but who cares?",
      image: Image6,
      className: "absolute top-24 left-[45%] rotate-[-7deg]",
    },
    {
      title: "Focussed Fairy",
      image: Image7,
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
          <h1 className="">
            hint: 11 11
          </h1>
          <p className="text-4xl md:text-6xl font-black bg-gradient-to-r from-rose-400 via-pink-400 to-purple-400 bg-clip-text text-transparent mb-4">
            DO NOT DRAG THE PHOTOS
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
