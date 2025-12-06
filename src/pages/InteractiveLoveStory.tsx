import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Heart, Calendar, MapPin, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FloatingHearts } from "@/components/FloatingHearts";
import { Carousel3D } from "@/components/ui/3d-carousel";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { motion, AnimatePresence } from "framer-motion";
import Ballpit from "@/components/ui/Ballpit";

interface StoryChapter {
  title: string;
  content: string;
  image: string;
  date: string;
  location?: string;
  fullStory: string;
  highlights: string[];
  mood: string;
}

const chapters: StoryChapter[] = [
  {
    title: "The Beginning",
    content: "Every love story has a beautiful beginning, and ours started with a spark that would light up our entire world.",
    fullStory: "From the moment we met, I knew something special was about to unfold. There was an instant connection, a magnetic pull that drew us together. Your eyes sparkled with curiosity and warmth, and when you smiled, the entire world seemed to pause. That first conversation flowed so naturally, as if we'd known each other for years. Little did I know that this moment would be the start of the most beautiful journey of my life.",
    image: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=800",
    date: "The First Hello",
    location: "Where Our Story Began",
    highlights: [
      "First eye contact that lasted forever",
      "The nervous excitement in the air",
      "That unforgettable first smile",
      "Instant connection we both felt"
    ],
    mood: "✨ Magical & Electric"
  },
  {
    title: "Getting to Know You",
    content: "Each conversation revealed another layer of your beautiful soul. Your laugh became my favorite sound.",
    fullStory: "As days turned into weeks, every conversation brought new discoveries. I learned about your dreams, your fears, your passions. The way you light up when talking about things you love, the thoughtful pauses before you speak, the kindness in your words - everything about you captivated me. Your laugh became the melody I wanted to hear every day, and your presence became the comfort I craved. We shared stories, secrets, and silences that spoke volumes.",
    image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800",
    date: "The Discovery Phase",
    location: "Coffee Shops & Park Benches",
    highlights: [
      "Late-night conversations that lasted till dawn",
      "Discovering shared dreams and passions",
      "Learning your favorite everything",
      "The moment I realized I was falling"
    ],
    mood: "💫 Curious & Enchanted"
  },
  {
    title: "The First Date",
    content: "Nervous excitement filled the air. Time seemed to stop when we were together.",
    fullStory: "I remember every detail of that day - from planning the perfect moment to the butterflies in my stomach as I waited for you. When you arrived, looking absolutely radiant, my heart skipped several beats. We walked, we talked, we laughed until our sides hurt. There was something about being with you that felt like coming home to a place I'd been searching for all my life. The world faded away, and it was just us, in our own perfect bubble of happiness.",
    image: "https://images.unsplash.com/photo-1464047736614-af63643285bf?w=800",
    date: "Our First Official Date",
    location: "A Place We'll Never Forget",
    highlights: [
      "The nervous excitement before seeing you",
      "How stunning you looked",
      "Our first official kiss",
      "Walking hand in hand for the first time"
    ],
    mood: "💖 Romantic & Dreamy"
  },
  {
    title: "Falling Deeper",
    content: "Every day I discovered new reasons to love you. You became my favorite thought, my sweetest dream.",
    fullStory: "I found myself thinking about you constantly - during work, before sleep, in every quiet moment. The way you bite your lip when you're concentrating, how you sing off-key when you're happy, the gentle way you care for everyone around you. These little things weren't just cute - they were the pieces that made me fall impossibly, irreversibly in love with you. I realized that love wasn't just a feeling; it was choosing you, every single day.",
    image: "https://images.unsplash.com/photo-1518568814500-bf0f8d125f46?w=800",
    date: "The Falling Phase",
    location: "In My Heart",
    highlights: [
      "Realizing I couldn't imagine life without you",
      "Learning all your little quirks and loving them",
      "The way my day brightens when I see you",
      "Falling asleep and waking up thinking of you"
    ],
    mood: "💝 Deeply In Love"
  },
  {
    title: "First Challenge",
    content: "Not everything was perfect, but facing our first challenge together made us stronger.",
    fullStory: "They say you don't truly know someone until you face difficulties together. Our first real challenge tested us, but instead of breaking us apart, it brought us closer. We learned to communicate better, to listen with empathy, to support each other even when we didn't fully understand. That moment taught me that real love isn't about perfection - it's about choosing each other even when things get hard.",
    image: "https://images.unsplash.com/photo-1516589091380-5d8e87df6999?w=800",
    date: "Growing Pains",
    location: "Through the Storm",
    highlights: [
      "Learning to communicate through difficulties",
      "Choosing love over being right",
      "Discovering your strength and resilience",
      "Emerging stronger together"
    ],
    mood: "🌧️ Weathering the Storm"
  },
  {
    title: "Adventures Together",
    content: "We created countless memories - some planned, most spontaneous, all treasured forever.",
    fullStory: "From road trips to nowhere in particular, to trying new restaurants, to dancing in the kitchen at midnight - every adventure with you became my favorite memory. It didn't matter what we were doing; being with you turned ordinary moments into extraordinary ones. You taught me that adventure isn't always about grand gestures - sometimes it's found in the quiet moments, the inside jokes, the comfortable silences.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800",
    date: "Making Memories",
    location: "Everywhere We Go",
    highlights: [
      "Spontaneous road trips at 2 AM",
      "Getting lost and finding new places",
      "Creating traditions unique to us",
      "Every moment becoming a cherished memory"
    ],
    mood: "🎒 Adventurous & Free"
  },
  {
    title: "Meeting the Families",
    content: "Bringing our worlds together, watching the people we love most embrace our love.",
    fullStory: "I was nervous when you first met my family, but you charmed them effortlessly with your genuine warmth and kindness. When I met yours, I understood even more where your beautiful heart came from. Seeing our families blend together, watching them grow to love you as much as I do, made me realize this wasn't just about us anymore - we were building something bigger, creating a future together.",
    image: "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800",
    date: "Merging Worlds",
    location: "Family Gatherings",
    highlights: [
      "Nervous first impressions turning into love",
      "Holiday celebrations together",
      "Inside jokes spanning both families",
      "Feeling like you belong"
    ],
    mood: "👨‍👩‍👧‍👦 United & Blessed"
  },
  {
    title: "Growing Together",
    content: "Through laughter and tears, adventures and quiet moments, we built something beautiful.",
    fullStory: "Our relationship blossomed into something extraordinary. We've shared countless adventures - some big, some small, all meaningful. We've faced challenges that made us stronger, celebrated victories that brought us closer, and weathered storms that proved our love could withstand anything. Every experience, whether joyful or difficult, has woven another thread into the tapestry of our love. Together, we're not just a couple - we're a team, partners in this beautiful journey of life.",
    image: "https://images.unsplash.com/photo-1518391846015-55a9cc003b25?w=800",
    date: "Our Journey Together",
    location: "Every Moment, Every Place",
    highlights: [
      "Adventures that created lasting memories",
      "Supporting each other through challenges",
      "Building traditions unique to us",
      "Growing individually and as a couple"
    ],
    mood: "🌟 Strong & United"
  },
  {
    title: "The Little Things",
    content: "I fell in love with you not just for the big moments, but for all the little things in between.",
    fullStory: "It's the way you remember my coffee order, how you text me random thoughts throughout the day, the way you hold my hand while driving. It's your terrible dad jokes that make me laugh anyway, how you always save me the last bite of dessert, the way you look at me like I'm the only person in the room. These tiny, seemingly insignificant moments are actually everything - they're the foundation of our love, the proof that you choose me every single day.",
    image: "https://images.unsplash.com/photo-1492571350019-22de08371fd3?w=800",
    date: "Every Day",
    location: "In the Details",
    highlights: [
      "Morning texts that brighten my day",
      "Remembering the small things I mention",
      "Random acts of thoughtfulness",
      "Making ordinary moments special"
    ],
    mood: "🎈 Sweet & Thoughtful"
  },
  {
    title: "Dreams and Plans",
    content: "We started dreaming together, painting pictures of our future with words and wishes.",
    fullStory: "Late at night, we'd talk about our future - where we'd live, what our home would look like, the adventures we'd have, maybe even the family we'd build. These weren't just fantasies; they were blueprints, promises we were making to each other. With every shared dream, I became more certain that I wanted to spend my life making those dreams come true with you. You're not just part of my future - you are my future.",
    image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=800",
    date: "Planning Forever",
    location: "In Our Imaginations",
    highlights: [
      "Late night talks about our future",
      "Planning adventures we'll take",
      "Dreaming about our home together",
      "Making promises for tomorrow"
    ],
    mood: "🌠 Hopeful & Excited"
  },
  {
    title: "Forever & Always",
    content: "This is not the end, but a beautiful continuation. Every day I choose you.",
    fullStory: "As I look back on our journey and forward to our future, my heart overflows with gratitude and love. Every day with you is a gift I never take for granted. You've shown me what it means to truly love and be loved. Our story continues to unfold, each chapter more beautiful than the last. I promise to keep choosing you, to keep loving you, to keep growing with you. This isn't the end of our story - it's just the beginning of forever. And I can't wait for all the chapters yet to come.",
    image: "https://images.unsplash.com/photo-1519834785169-98be25ec3f84?w=800",
    date: "Today, Tomorrow, Always",
    location: "Wherever We Are Together",
    highlights: [
      "Every sunrise we'll share",
      "Adventures waiting to be lived",
      "Dreams we'll achieve together",
      "A lifetime of love and happiness"
    ],
    mood: "💕 Eternal & Infinite"
  }
];

const InteractiveLoveStory = () => {
  const carouselImages = chapters.map(chapter => chapter.image);

  return (
    <div className="min-h-screen bg-gradient-cosmic relative overflow-hidden">
      <FloatingHearts />
      
      <div className="relative z-10 container mx-auto px-4 py-12">
        <Link to="/universe">
          <Button variant="outline" size="lg" className="mb-8 bg-card/50 backdrop-blur-sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Universe
          </Button>
        </Link>

        <div className="text-center mb-8">
          <h1 className="text-4xl sm:text-6xl font-elegant font-bold text-white mb-4 animate-glow">
            Our Love Story 📖
          </h1>
          <p className="text-xl font-romantic text-white/80 mb-4">
            Drag to explore our beautiful chapters in 3D
          </p>
          <p className="text-sm font-romantic text-white/60">
            ← Swipe or drag to rotate →
          </p>
        </div>

        <Carousel3D 
          items={carouselImages} 
          width={400}
          height={550}
          containerClassName="mb-12"
        />

        <div className="max-w-3xl mx-auto grid md:grid-cols-5 gap-4">
          {chapters.map((chapter, index) => (
            <div 
              key={index}
              className="bg-card/80 backdrop-blur-sm rounded-xl p-4 border border-white/20 hover:border-rose/50 transition-all hover:scale-105"
            >
              <p className="text-xs font-romantic text-muted-foreground mb-1">
                {chapter.date}
              </p>
              <h3 className="text-sm font-elegant font-bold text-foreground mb-2">
                {chapter.title}
              </h3>
              <p className="text-xs font-romantic text-muted-foreground line-clamp-3">
                {chapter.content}
              </p>
            </div>
          ))}
        </div>

        {/* Interactive Ballpit Section */}
        <div className="mt-16 mb-8">
          <h2 className="text-3xl font-elegant font-bold text-white text-center mb-6 animate-glow">
            Our Love in Motion ✨
          </h2>
          <p className="text-center text-white/80 font-romantic mb-6">
            Drag your cursor through our floating love bubbles
          </p>
          <div className="relative overflow-hidden rounded-3xl border border-white/20 shadow-2xl" 
               style={{ minHeight: '500px', maxHeight: '500px', width: '100%' }}>
            <Ballpit
              count={200}
              gravity={0.7}
              friction={0.8}
              wallBounce={0.95}
              followCursor={true}
            />
          </div>
        </div>

        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-pink-500/20 to-rose-500/20 rounded-3xl p-8 max-w-2xl mx-auto border border-white/20">
            <Heart className="w-12 h-12 text-rose-400 mx-auto mb-4 animate-pulse" />
            <p className="text-xl font-romantic text-white">
              Every chapter of our story is magical, Unnati. 
              This 3D carousel represents how our love story unfolds beautifully from every angle. 💕
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveLoveStory;
