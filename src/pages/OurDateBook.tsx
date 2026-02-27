import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Heart, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { PageFlip } from "page-flip";
import LightRays from "@/components/ui/LightRays";


import Nov8Image from "@/assets/nov8.jpg";
import Nov9Image from "@/assets/nov9.jpg";
import Nov22Image from "@/assets/nov22.jpg";
import Oct16Image from "@/assets/oct16.jpg";
import Oct17Image from "@/assets/oct17.jpg";
import Oct24Image from "@/assets/oct24.jpg";
import Oct2ndImage from "@/assets/2ndoct.jpg";
import Dec12Image from "@/assets/dec12.jpg";
import March19Image from "@/assets/march19.jpg";
import May16Image from "@/assets/may16.jpg";

interface DateStory {
  title: string;
  date: string;
  story: string;
  image: string;
}

const dates: DateStory[] = [
  {
    title: "The First Glance",
    date: "Where It All Began",
    story: "The moment our eyes met, time froze. Your smile made my heart race like never before. I knew right then that you were someone extraordinary, someone who would change my life forever.",
    image: March19Image,
  },
  {
    title: "Peddler's Day",
    date: "Our First Date",
    story: "We talked for hours, and it felt like minutes. Your laugh became my favorite sound. The way you looked at me made me feel like the only person in the world. We were in a rush, but that did not matter. The goodbye killed a part of me, but I live for the hope of it all.",
    image: May16Image,
  },
  {
    title: "The trip to her",
    date: "October 2nd, 2025",
    story: "A trip to Jaipur came down to The trip to Chandigarh, my first one. This was the first time we met after we became Us. The goodbye from Peddler's was all worth it. Every moment with you is worth it.",
    image: Oct2ndImage,
  },
  {
    title: "Happy Diwali",
    date: "October 16th, 2025",
    story: "The craziest idk-how-did-it-work-out-but-it-did-at-the-end. Our initial plan of going to Delhi actually worked out after all the chaos. All the suspense of the train's waiting list and your parents' decision, it went exactly how we wanted it to go.",
    image: Oct16Image,
  },
  {
    title: "Delhi Surprise",
    date: "October 17th, 2025",
    story: "The 10 minutes of heaven. The surprise visit to Delhi was nothing short of magical. Seeing your face light up when you saw me was priceless. Those brief moments we shared are etched in my heart forever. The snickers kept me alive after you went icl.",
    image: Oct17Image,
  },
  {
    title: "Delhi 2.0",
    date: "October 24th, 2025",
    story: "I'm glad my cousin caught us, giving birth to another story of Us. What was supposed to be a street-food date turned out to be street-eating-at-random-corners and I loved every second of it. Every moment with you is a page in our never-ending love story.",
    image: Oct24Image,
  },  
  {
    title: "Surprise Surprise",
    date: "November 8th, 2025",
    story: "The event in PU, it was good, wasn't it? That one message about the PU event changed the week. This date was so on-spot deciding everything and it was one of the best ones. Nice sneak-ins we did. And Raman Bedi ne internship de di mujhe CU mai 💀. That was actually magical. We've crossed almost every travel-vehicle-travelling (bus, train, auto, car)",
    image: Nov8Image,
  }, 
  {
    title: "How do I escape?",
    date: "November 9th, 2025",
    story: "All the planning to escape your own college was crazy. But we did it. We had so much up our sleeves but nothing solid enough and at the end the simplest trick worked. Oh, and the VR date later was. Yeah.",
    image: Nov9Image,
  }, 
  {
    title: "Cold November",
    date: "November 22nd, 2025",
    story: "We had to plan this date around your exams and it could've been hectic, but we managed it so well. Another date another VR. We had to make this date work cuz if we didnt, next one would be only a month later. Our plans are crazy. ",
    image: Nov22Image,
  }, 
  {
    title: "The Big Day",
    date: "December 12th, 2025",
    story: "The almost-cancelled date but it worked out in the end. It always does. All the train rushing, train missing, auto-driver feud, Police station, this day was packed. We did so many new things. Our first dinner date, our first maggi date. The entire day was crazy. Need to live it again.",
    image: Dec12Image,
  },
];

const OurDateBook = () => {
  const [currentPage, setCurrentPage] = useState(0);
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
