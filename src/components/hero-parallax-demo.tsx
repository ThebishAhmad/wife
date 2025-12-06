import { HeroParallax } from "@/components/ui/hero-parallax";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

// ----------------------------------------------------------------------
// IMPORT YOUR MEMORIES (Files from your src/assets folder)
// ----------------------------------------------------------------------

// --- October Memories ---
import img1 from "@/assets/IMG-20251002-WA0074.jpg";
import img2 from "@/assets/IMG-20251004-WA0049.jpg";
import img3 from "@/assets/IMG-20251006-WA0003.jpg";
import img4 from "@/assets/IMG-20251006-WA0077.jpg";
import img5 from "@/assets/IMG-20251017-WA0008.jpg";
import img6 from "@/assets/IMG-20251017-WA0049.jpg";
import img7 from "@/assets/IMG-20251017-WA0117.jpg";
import img8 from "@/assets/IMG-20251019-WA0033.jpg";
import img9 from "@/assets/IMG-20251021-WA0052.jpg";
import img10 from "@/assets/IMG-20251021-WA0055.jpg";
import img11 from "@/assets/IMG-20251024-WA0065.jpg";
import img12 from "@/assets/IMG-20251024-WA0076.jpg";

// --- November Memories ---
import img13 from "@/assets/IMG-20251103-WA0650.jpg";
import img14 from "@/assets/IMG-20251109-WA0140.jpg";
import img15 from "@/assets/IMG-20251109-WA0167.jpg";
import img16 from "@/assets/IMG-20251112-WA0023.jpg";
import img17 from "@/assets/IMG-20251114-WA0024.jpg";
import img18 from "@/assets/IMG-20251129-WA0022.jpg";
import img19 from "@/assets/IMG-20251129-WA0023.jpg";

// --- Motion Photos / Special Moments ---
import motion1 from "@/assets/motion_photo_262707953646964220.jpg";
import motion2 from "@/assets/motion_photo_943609531368407995.jpg";
import motion3 from "@/assets/motion_photo_1735651764702285289.jpg";
import motion4 from "@/assets/motion_photo_4744201707851581888.jpg";
import motion5 from "@/assets/motion_photo_8866333217215376955.jpg";
import motion6 from "@/assets/motion_photo_8964294221475292857.jpg";

interface Product {
  title: string;
  link: string;
  thumbnail: string;
}

export function HeroParallaxDemo() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const products = [
    {
      title: "October 2nd - The Beginning",
      link: "#", // Keep as #, we will intercept the click
      thumbnail: img1,
    },
    {
      title: "October 4th - Sweet Moments",
      link: "#",
      thumbnail: img2,
    },
    {
      title: "October 6th - Adventure",
      link: "#",
      thumbnail: img3,
    },
    {
      title: "October 6th - Us",
      link: "#",
      thumbnail: img4,
    },
    {
      title: "October 17th - Special Day",
      link: "#",
      thumbnail: img5,
    },
    {
      title: "October 17th - Smiles",
      link: "#",
      thumbnail: img6,
    },
    {
      title: "October 17th - Forever",
      link: "#",
      thumbnail: img7,
    },
    {
      title: "October 19th - Memories",
      link: "#",
      thumbnail: img8,
    },
    {
      title: "October 21st - Together",
      link: "#",
      thumbnail: img9,
    },
    {
      title: "October 21st - Love",
      link: "#",
      thumbnail: img10,
    },
    {
      title: "October 24th - Vibes",
      link: "#",
      thumbnail: img11,
    },
    {
      title: "October 24th - Happiness",
      link: "#",
      thumbnail: img12,
    },
    {
      title: "November 3rd - Journey",
      link: "#",
      thumbnail: img13,
    },
    {
      title: "November 9th - Outing",
      link: "#",
      thumbnail: img14,
    },
    {
      title: "November 9th - Laughs",
      link: "#",
      thumbnail: img15,
    },
    {
      title: "November 12th - Precious",
      link: "#",
      thumbnail: img16,
    },
    {
      title: "November 14th - Magic",
      link: "#",
      thumbnail: img17,
    },
    {
      title: "November 29th - Cozy",
      link: "#",
      thumbnail: img18,
    },
    {
      title: "November 29th - Warmth",
      link: "#",
      thumbnail: img19,
    },
    {
      title: "Motion Memory - One",
      link: "#",
      thumbnail: motion1,
    },
    {
      title: "Motion Memory - Two",
      link: "#",
      thumbnail: motion2,
    },
    {
      title: "Motion Memory - Three",
      link: "#",
      thumbnail: motion3,
    },
    {
      title: "Motion Memory - Four",
      link: "#",
      thumbnail: motion4,
    },
    {
      title: "Motion Memory - Five",
      link: "#",
      thumbnail: motion5,
    },
    {
      title: "Motion Memory - Six",
      link: "#",
      thumbnail: motion6,
    },
  ];

  // Logic to intercept clicks on the images
  const handleContainerClick = (e: React.MouseEvent) => {
    // Find the closest anchor tag or image that was clicked
    const target = e.target as HTMLElement;
    const anchor = target.closest('a');
    const img = target.closest('img');
    
    // If we clicked an image inside an anchor
    if (anchor && img) {
        e.preventDefault(); // Stop the page jump
        
        // Find the product data based on the image src
        // (Using endsWith to match local file paths which might have hashes)
        const src = (img as HTMLImageElement).src;
        const product = products.find(p => src.includes(p.thumbnail) || p.thumbnail.includes(src));
        
        // If exact match fails, fallback to title logic or just show clicked image
        if (product) {
            setSelectedProduct(product);
        } else {
            // Fallback object if mapping fails
            setSelectedProduct({
                title: "Our Memory",
                link: "#",
                thumbnail: src
            });
        }
    }
  };

  return (
    <>
      <div onClickCapture={handleContainerClick}>
        <HeroParallax products={products} />
      </div>

      {/* Creative Lightbox Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={() => setSelectedProduct(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative max-w-4xl w-full bg-white dark:bg-neutral-900 rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()} // Don't close when clicking content
            >
              <button 
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 z-10 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="flex flex-col md:flex-row">
                {/* Image Side */}
                <div className="w-full md:w-2/3 max-h-[70vh] md:max-h-[80vh] bg-neutral-100 dark:bg-neutral-950 flex items-center justify-center overflow-hidden">
                  <img 
                    src={selectedProduct.thumbnail} 
                    alt={selectedProduct.title}
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Content Side */}
                <div className="w-full md:w-1/3 p-8 flex flex-col justify-center bg-white dark:bg-neutral-900">
                  <motion.h3 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-2xl font-bold font-elegant text-neutral-800 dark:text-neutral-100 mb-4"
                  >
                    {selectedProduct.title}
                  </motion.h3>
                  
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-neutral-600 dark:text-neutral-300 font-romantic text-lg leading-relaxed italic"
                  >
                    "A moment frozen in time, a memory that beats in my heart forever."
                  </motion.p>

                  <div className="mt-8 flex gap-2">
                     <span className="px-3 py-1 rounded-full text-xs font-medium bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400">
                       #Memories
                     </span>
                     <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
                       #Love
                     </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}