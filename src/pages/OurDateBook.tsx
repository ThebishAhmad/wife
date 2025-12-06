import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Heart, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { PageFlip } from "page-flip";
import LightRays from "@/components/ui/LightRays";

interface DateStory {
  title: string;
  date: string;
  story: string;
  spicy: string;
  image: string;
}

const dates: DateStory[] = [
  {
    title: "The First Glance",
    date: "Where It All Began",
    story: "The moment our eyes met, time froze. Your smile made my heart race like never before. I knew right then that you were someone extraordinary, someone who would change my life forever.",
    spicy: "The electricity between us was undeniable. Every accidental touch sent shivers down my spine. I couldn't stop thinking about getting closer to you...",
    image: "https://images.unsplash.com/photo-1518568814500-bf0f8d125f46?w=800",
  },
  {
    title: "Coffee & Chemistry",
    date: "Our First Date",
    story: "We talked for hours, and it felt like minutes. Your laugh became my favorite sound. The way you looked at me made me feel like the only person in the world.",
    spicy: "Sitting so close, I could smell your perfume. When our hands touched reaching for the sugar, the tension was palpable. I wanted that moment to last forever...",
    image: "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800",
  },
  {
    title: "Moonlit Magic",
    date: "That Starry Night",
    story: "Under the stars, everything felt perfect. Your hand in mine, the gentle breeze, your head on my shoulder. I realized I was falling deeply, madly in love with you.",
    spicy: "The moonlight danced across your skin. When you looked up at me, I couldn't resist anymore. Our first kiss under the stars was pure magic, passionate and perfect...",
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800",
  },
  {
    title: "Sunset Promises",
    date: "The Golden Hour",
    story: "Watching the sunset together, painting the sky in shades of love. You whispered secrets, dreams, and hopes. I promised to be there for all of them, for all of you.",
    spicy: "The golden light made you glow. Every curve, every feature looked even more irresistible. I pulled you close, our bodies fitting together perfectly as the sun disappeared...",
    image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800",
  },
  {
    title: "Rainy Day Romance",
    date: "When We Got Soaked",
    story: "Caught in the rain, laughing like crazy. We danced in the puddles, completely soaked and completely happy. It's my favorite memory of pure, uninhibited joy with you.",
    spicy: "Your wet clothes clung to you, drops of water sliding down your neck. I couldn't take my eyes off you. We rushed inside, breathless, hearts pounding, completely lost in the moment...",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
  },
  {
    title: "Forever Starts Now",
    date: "Every Day Together",
    story: "Every moment with you is a page in our never-ending love story. You're my best friend, my partner, my everything. Here's to countless more chapters, my love.",
    spicy: "The way you look at me still gives me butterflies. Every touch is electric. Every kiss leaves me wanting more. You're intoxicating, addictive, and absolutely mine... 💕",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800",
  },
];

const OurDateBook = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [showSpicy, setShowSpicy] = useState<{ [key: number]: boolean }>({});
  const bookRef = useRef<HTMLDivElement>(null);
  const pageFlipRef = useRef<any>(null);

  const totalPages = dates.length;

  useEffect(() => {
    if (bookRef.current && !pageFlipRef.current) {
      const pageFlip = new PageFlip(bookRef.current, {
        width: 550,
        height: 733,
        size: "stretch",
        minWidth: 315,
        maxWidth: 1000,
        minHeight: 420,
        maxHeight: 1350,
        maxShadowOpacity: 0.5,
        showCover: true,
        mobileScrollSupport: false,
        drawShadow: true,
        flippingTime: 1000,
        usePortrait: false,
        startPage: 0,
        autoSize: true,
        clickEventForward: true,
      });

      pageFlip.loadFromHTML(
        bookRef.current.querySelectorAll(".page")
      );

      pageFlip.on("flip", (e: any) => {
        setCurrentPage(e.data);
      });

      pageFlipRef.current = pageFlip;
    }
  }, []);

  const handleNextPage = () => {
    if (pageFlipRef.current) {
      pageFlipRef.current.flipNext();
    }
  };

  const handlePrevPage = () => {
    if (pageFlipRef.current) {
      pageFlipRef.current.flipPrev();
    }
  };

  const toggleSpicy = (index: number) => {
    setShowSpicy((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-rose-50 to-pink-100 dark:from-amber-950 dark:via-rose-950 dark:to-pink-950 flex flex-col items-center justify-center p-4 overflow-hidden relative">
      {/* Light Rays Background */}
      <div className="absolute inset-0 w-full h-full">
        <LightRays
          raysOrigin="top-center"
          raysColor="#ff69b4"
          raysSpeed={1.5}
          lightSpread={0.8}
          rayLength={1.2}
          followMouse={true}
          mouseInfluence={0.1}
          noiseAmount={0.1}
          distortion={0.05}
        />
      </div>

      {/* Floating hearts background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: "100%", x: `${Math.random() * 100}%`, opacity: 0.3 }}
            animate={{
              y: "-10%",
              transition: {
                duration: 10 + Math.random() * 10,
                repeat: Infinity,
                ease: "linear",
              },
            }}
            className="absolute"
          >
            <Heart
              className="text-rose-300 dark:text-rose-700"
              fill="currentColor"
              size={20 + Math.random() * 30}
            />
          </motion.div>
        ))}
      </div>

      <Link to="/universe">
        <Button
          variant="outline"
          size="lg"
          className="absolute top-4 left-4 z-50 bg-background/80 backdrop-blur-sm"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
      </Link>

      {/* Book controls */}
      <div className="mb-6 flex items-center gap-4 z-10">
        <Button
          onClick={handlePrevPage}
          variant="outline"
          size="lg"
          className="bg-background/80 backdrop-blur-sm hover:scale-110 transition-transform"
        >
          <ChevronLeft className="w-5 h-5 mr-2" />
          Previous
        </Button>
        <div className="text-center bg-background/80 backdrop-blur-sm px-6 py-3 rounded-lg border">
          <span className="font-romantic text-lg">
            Page <span className="page-current font-bold">{currentPage + 1}</span> of{" "}
            <span className="page-total font-bold">{totalPages + 2}</span>
          </span>
        </div>
        <Button
          onClick={handleNextPage}
          variant="outline"
          size="lg"
          className="bg-background/80 backdrop-blur-sm hover:scale-110 transition-transform"
        >
          Next
          <ChevronRight className="w-5 h-5 ml-2" />
        </Button>
      </div>

      {/* Book Container */}
      <div className="flip-book-container z-10">
        <div className="flip-book" ref={bookRef}>
          {/* Cover Page */}
          <div className="page page-cover page-cover-top" data-density="hard">
            <div className="page-content">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1 }}
                className="flex flex-col items-center justify-center h-full"
              >
                <Heart className="w-20 h-20 text-rose-500 mb-6" fill="currentColor" />
                <h2 className="text-5xl font-elegant text-center mb-4 bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent">
                  Our Love Story
                </h2>
                <p className="text-xl font-romantic text-center text-muted-foreground">
                  A Journey Through Our Hearts
                </p>
                <Sparkles className="w-10 h-10 text-amber-500 mt-6 animate-pulse" />
              </motion.div>
            </div>
          </div>

          {/* Date Pages */}
          {dates.map((date, index) => (
            <div key={index} className="page">
              <div className="page-content">
                <h2 className="page-header bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent font-elegant">
                  {date.title}
                </h2>
                <div
                  className="page-image"
                  style={{
                    backgroundImage: `url(${date.image})`,
                  }}
                />
                <div className="page-text font-romantic">
                  <p className="text-sm italic text-center mb-3 text-rose-600 dark:text-rose-400">
                    {date.date}
                  </p>
                  <p className="mb-3">{date.story}</p>
                  
                  <button
                    onClick={() => toggleSpicy(index)}
                    className="w-full mt-2 py-2 px-3 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white rounded-lg font-romantic flex items-center justify-center gap-2 transition-all text-sm"
                  >
                    <Sparkles className="w-4 h-4" />
                    {showSpicy[index] ? "Hide" : "Show"} Spicy Version 🔥
                  </button>

                  <AnimatePresence>
                    {showSpicy[index] && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-2 p-3 bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-950 dark:to-pink-950 rounded-lg border-2 border-rose-300 dark:border-rose-700"
                      >
                        <p className="text-sm leading-relaxed font-romantic text-rose-900 dark:text-rose-100">
                          {date.spicy}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <div className="page-footer">{index + 2}</div>
              </div>
            </div>
          ))}

          {/* Back Cover Page */}
          <div className="page page-cover page-cover-bottom" data-density="hard">
            <div className="page-content">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="flex flex-col items-center justify-center h-full"
              >
                <Heart className="w-16 h-16 text-rose-500 mb-4 animate-pulse" fill="currentColor" />
                <h2 className="text-4xl font-elegant text-center mb-4 bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent">
                  Forever & Always
                </h2>
                <p className="text-center font-romantic text-muted-foreground px-8">
                  Every page is a memory, every memory is a treasure. Our story continues...
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurDateBook;
