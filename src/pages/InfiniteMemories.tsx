import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import InfiniteMenu, { MenuItem } from "@/components/ui/InfiniteMenu";

/* ---------------------------
   50 portrait image imports
----------------------------*/
import portraitImage1 from "@/assets/IMG-20251002-WA0074.jpg";
import portraitImage2 from "@/assets/IMG-20251004-WA0049.jpg";
import portraitImage3 from "@/assets/IMG-20251006-WA0003.jpg";
import portraitImage4 from "@/assets/IMG-20251006-WA0077.jpg";
import portraitImage5 from "@/assets/IMG-20251017-WA0008.jpg";
import portraitImage6 from "@/assets/IMG-20251017-WA0049.jpg";
import portraitImage7 from "@/assets/IMG-20251017-WA0117.jpg";
import portraitImage8 from "@/assets/IMG-20251019-WA0033.jpg";
import portraitImage9 from "@/assets/IMG-20251021-WA0052.jpg";
import portraitImage10 from "@/assets/IMG-20251021-WA0055.jpg";

import portraitImage11 from "@/assets/IMG-20251024-WA0065.jpg";
import portraitImage12 from "@/assets/IMG-20251024-WA0076.jpg";
import portraitImage13 from "@/assets/IMG-20251103-WA0650.jpg";
import portraitImage14 from "@/assets/IMG-20251109-WA0140.jpg";
import portraitImage15 from "@/assets/IMG-20251109-WA0167.jpg";
import portraitImage16 from "@/assets/IMG-20251112-WA0023.jpg";
import portraitImage17 from "@/assets/IMG-20251114-WA0024.jpg";
import portraitImage18 from "@/assets/IMG-20251129-WA0022.jpg";
import portraitImage19 from "@/assets/IMG-20251129-WA0023.jpg";
import portraitImage20 from "@/assets/motion_photo_262707953646964220.jpg";

import portraitImage21 from "@/assets/motion_photo_943609531368407995.jpg";
import portraitImage22 from "@/assets/motion_photo_1735651764702285289.jpg";
import portraitImage23 from "@/assets/motion_photo_4744201707851581888.jpg";
import portraitImage24 from "@/assets/motion_photo_8866333217215376955.jpg";
import portraitImage25 from "@/assets/motion_photo_8964294221475292857.jpg";

// --- Set 2: Repeating Images to fill 50 slots ---
import portraitImage26 from "@/assets/IMG-20251002-WA0074.jpg";
import portraitImage27 from "@/assets/IMG-20251004-WA0049.jpg";
import portraitImage28 from "@/assets/IMG-20251006-WA0003.jpg";
import portraitImage29 from "@/assets/IMG-20251006-WA0077.jpg";
import portraitImage30 from "@/assets/IMG-20251017-WA0008.jpg";

import portraitImage31 from "@/assets/IMG-20251017-WA0049.jpg";
import portraitImage32 from "@/assets/IMG-20251017-WA0117.jpg";
import portraitImage33 from "@/assets/IMG-20251019-WA0033.jpg";
import portraitImage34 from "@/assets/IMG-20251021-WA0052.jpg";
import portraitImage35 from "@/assets/IMG-20251021-WA0055.jpg";
import portraitImage36 from "@/assets/IMG-20251024-WA0065.jpg";
import portraitImage37 from "@/assets/IMG-20251024-WA0076.jpg";
import portraitImage38 from "@/assets/IMG-20251103-WA0650.jpg";
import portraitImage39 from "@/assets/IMG-20251109-WA0140.jpg";
import portraitImage40 from "@/assets/IMG-20251109-WA0167.jpg";

import portraitImage41 from "@/assets/IMG-20251112-WA0023.jpg";
import portraitImage42 from "@/assets/IMG-20251114-WA0024.jpg";
import portraitImage43 from "@/assets/IMG-20251129-WA0022.jpg";
import portraitImage44 from "@/assets/IMG-20251129-WA0023.jpg";
import portraitImage45 from "@/assets/motion_photo_262707953646964220.jpg";
import portraitImage46 from "@/assets/motion_photo_943609531368407995.jpg";
import portraitImage47 from "@/assets/motion_photo_1735651764702285289.jpg";
import portraitImage48 from "@/assets/motion_photo_4744201707851581888.jpg";
import portraitImage49 from "@/assets/motion_photo_8866333217215376955.jpg";
import portraitImage50 from "@/assets/motion_photo_8964294221475292857.jpg";

// --- Continuation from img119 to img123 (from image_b723c8.png) ---
import img119 from "../assets/IMG-20251109-WA0143.jpg";
import img120 from "../assets/IMG-20251109-WA0144.jpg";
import img121 from "../assets/IMG-20251109-WA0155.jpg";
import img122 from "../assets/IMG-20251109-WA0156.jpg";
import img123 from "../assets/IMG-20251109-WA0164.jpg";

// --- Continuation from img124 to img133 (from image_b723e5.png) ---
import img124 from "../assets/IMG-20251109-WA0169.jpg";
import img125 from "../assets/IMG-20251109-WA0181.jpg";
import img126 from "../assets/IMG-20251109-WA0188.jpg";
import img127 from "../assets/IMG-20251109-WA0191.jpg";
import img128 from "../assets/IMG-20251109-WA0194.jpg";
import img129 from "../assets/IMG-20251109-WA0234.jpg";
import img130 from "../assets/IMG-20251109-WA0255.jpg";
import img131 from "../assets/IMG-20251110-WA0051.jpg";
import img132 from "../assets/IMG-20251110-WA0053.jpg";

// --- Continuation from img134 to img160 (from image_b72403.png) ---
import img133 from "../assets/IMG-20251116-WA0065.jpg";
import img134 from "../assets/IMG-20251116-WA0066.jpg";
import img135 from "../assets/IMG-20251118-WA0004.jpg";
import img136 from "../assets/IMG-20251118-WA0015.jpg";
import img137 from "../assets/IMG-20251119-WA0002.jpg";
import img138 from "../assets/IMG-20251119-WA0003.jpg";
import img139 from "../assets/IMG-20251121-WA0062.jpg";
import img141 from "../assets/IMG-20251123-WA0017.jpg";
import img142 from "../assets/IMG-20251123-WA0041.jpg";
import img143 from "../assets/IMG-20251123-WA0043.jpg";
import img144 from "../assets/IMG-20251124-WA0002.jpg";
import img145 from "../assets/IMG-20251124-WA0003.jpg";
import img146 from "../assets/IMG-20251124-WA0006.jpg";
import img147 from "../assets/IMG-20251124-WA0007.jpg";
import img148 from "../assets/IMG-20251124-WA0008.jpg";
import img149 from "../assets/IMG-20251124-WA0009.jpg";
import img150 from "../assets/IMG-20251125-WA0008.jpg";
import img151 from "../assets/IMG-20251125-WA0010.jpg";
import img152 from "../assets/IMG-20251125-WA0011.jpg";
import img153 from "../assets/IMG-20251125-WA0013.jpg";
import img154 from "../assets/IMG-20251125-WA0052.jpg";
import img155 from "../assets/IMG-20251125-WA0060.jpg";
import img156 from "../assets/IMG-20251126-WA0003.jpg";
import img157 from "../assets/IMG-20251127-WA0025.jpg";
import img158 from "../assets/IMG-20251129-WA0019.jpg";
import img159 from "../assets/IMG-20251129-WA0021.jpg";


/* ------------------------------------------------------
   Generate Memory Photos (Your 50 portrait images used)
-------------------------------------------------------*/
const generateMemoryPhotos = (): MenuItem[] => {
  const images = [
    portraitImage2, portraitImage3, portraitImage4, portraitImage5,
    portraitImage6, portraitImage7, portraitImage8, portraitImage9, portraitImage10,
    portraitImage11, portraitImage12, portraitImage13, portraitImage14, portraitImage15,
    portraitImage16, portraitImage17, portraitImage18, portraitImage19, portraitImage20,
    portraitImage21, portraitImage22, portraitImage23, portraitImage24, portraitImage25,
    portraitImage26, portraitImage27, portraitImage28, portraitImage29, portraitImage30,
    portraitImage31, portraitImage32, portraitImage33, portraitImage34, portraitImage35,
    portraitImage36, portraitImage37, portraitImage38, portraitImage39, portraitImage40,
    portraitImage41, portraitImage42, portraitImage43, portraitImage44, portraitImage45,
    portraitImage46, portraitImage47, portraitImage48, portraitImage49, portraitImage50, portraitImage1, img129, img130, img131, img132, img133, img134, img135, img136, img137, img138, img139, img141, img142, img143, img144, img145, img146, img147, img148, img149, img150, img151, img152, img153, img154, img155, img156, img157, img158, img159
  ];
 
  return images.map((img, i) => ({
    image: img,
    link: "#",
    title: `Memory ${i + 1}`,
    description: `A precious moment – ${i + 1}`
  }));
};

const InfiniteMemories = () => {
  const items = generateMemoryPhotos();

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-950 via-rose-950 to-purple-950 relative overflow-hidden">

      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-pink-900/20 via-transparent to-transparent" />
      
      {/* Header */}
      <div className="absolute top-6 left-6 z-50">
        <Link to="/universe">
          <Button
            variant="ghost"
            className="text-white hover:bg-white/10"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Universe
          </Button>
        </Link>
      </div>

      {/* Title */}
      <div className="absolute top-6 right-6 left-6 text-center z-40 pointer-events-none">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-300 via-rose-300 to-purple-300 bg-clip-text text-transparent animate-glow">
          Infinite Memories Sphere ✨
        </h1>
        <p className="text-pink-200 mt-2 text-sm md:text-base">
          Drag to explore our endless moments • {items.length} precious memories
        </p>
      </div>

      {/* 3D Infinite Menu */}
      <div style={{ width: '100vw', height: '100vh' }}>
        <InfiniteMenu items={items} />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-pink-300 rounded-full opacity-40 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default InfiniteMemories;
