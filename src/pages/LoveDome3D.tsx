  import { Link } from "react-router-dom";
  import { ArrowLeft, Heart, Sparkles } from "lucide-react";
  import { Button } from "@/components/ui/button";
  import DomeGallery from "@/components/ui/DomeGallery";
import img1 from "@/assets/IMG-20250517-WA0031.jpg?url";
import img2 from "@/assets/IMG-20250520-WA0032.jpg?url";
import img3 from "@/assets/IMG-20250521-WA0003.jpg?url";
import img4 from "@/assets/IMG-20250522-WA0012.jpg?url";
import img5 from "@/assets/IMG-20250527-WA0010.jpg?url";
import img6 from "@/assets/IMG-20250527-WA0011.jpg?url";
import img7 from "@/assets/IMG-20250528-WA0006.jpg?url";
import img8 from "@/assets/IMG-20250529-WA0003.jpg?url";
import img9 from "@/assets/IMG-20250531-WA0011.jpg?url";
import img10 from "@/assets/IMG-20250615-WA0024.jpg?url";
import img11 from "@/assets/IMG-20250702-WA0023.jpg?url";
import img12 from "@/assets/IMG-20250703-WA0043.jpg?url";
import img13 from "@/assets/IMG-20250705-WA0040.jpg?url";
import img14 from "@/assets/IMG-20250705-WA0041.jpg?url";
import img15 from "@/assets/IMG-20250713-WA0003.jpg?url";
import img16 from "@/assets/IMG-20250716-WA0001.jpg?url";
import img17 from "@/assets/IMG-20250725-WA0038.jpg?url";
import img18 from "@/assets/IMG-20250725-WA0042.jpg?url";
import img19 from "@/assets/IMG-20250726-WA0053.jpg?url";
import img20 from "@/assets/IMG-20250726-WA0057.jpg?url";
import img21 from "@/assets/IMG-20250730-WA0033.jpg?url";
import img22 from "@/assets/IMG-20250730-WA0036.jpg?url";
import img23 from "@/assets/IMG-20250731-WA0024.jpg?url";
import img24 from "@/assets/IMG-20250731-WA0028.jpg?url";
import img25 from "@/assets/IMG-20250806-WA0003.jpg?url";
import img26 from "@/assets/IMG-20250806-WA0006.jpg?url";
import img27 from "@/assets/IMG-20250809-WA0014.jpg?url";
import img28 from "@/assets/IMG-20250809-WA0015.jpg?url";
import img29 from "@/assets/IMG-20250812-WA0039.jpg?url";
import img30 from "../assets/IMG-20250813-WA0067.jpg";
import img31 from "../assets/IMG-20250813-WA0069.jpg";
import img32 from "../assets/IMG-20250813-WA0070.jpg";
import img33 from "../assets/IMG-20250813-WA0074.jpg";
import img34 from "../assets/IMG-20250814-WA0055.jpg";
import img35 from "../assets/IMG-20250819-WA0052.jpg";
import img36 from "../assets/IMG-20250819-WA0053.jpg";
import img37 from "../assets/IMG-20250824-WA0059.jpg";
import img38 from "../assets/IMG-20250824-WA0060.jpg";
import img39 from "../assets/IMG-20250824-WA0064.jpg";
import img40 from "../assets/IMG-20250828-WA0003.jpg";
import img41 from "../assets/IMG-20250828-WA0010.jpg";
import img42 from "../assets/IMG-20250902-WA0029.jpg";
import img43 from "../assets/IMG-20250912-WA0126.jpg";
import img44 from "../assets/IMG-20250912-WA0127.jpg";
import img45 from "../assets/IMG-20250914-WA0044.jpg";
import img46 from "../assets/IMG-20250918-WA0013.jpg";
import img47 from "../assets/IMG-20250921-WA0020.jpg";
import img48 from "../assets/IMG-20250926-WA0007.jpg";
import img49 from "../assets/IMG-20250926-WA0008.jpg";
import img50 from "../assets/IMG-20250926-WA0030.jpg";
import img51 from "../assets/IMG-20250926-WA0031.jpg";


// --- Continuation from img52 to img64 (from image_b79fa9.png) ---
import img52 from "../assets/IMG-20250926-WA0037.jpg";
import img53 from "../assets/IMG-20250927-WA0004.jpg";
import img54 from "../assets/IMG-20250929-WA0002.jpg";
import img55 from "../assets/IMG-20250930-WA0001.jpg";
import img56 from "../assets/IMG-20251001-WA0068.jpg";
import img57 from "../assets/IMG-20251001-WA0070.jpg";
import img58 from "../assets/IMG-20251001-WA0074.jpg";
import img59 from "../assets/IMG-20251001-WA0084.jpg";
import img60 from "../assets/IMG-20251001-WA0088.jpg";
import img61 from "../assets/IMG-20251002-WA0054.jpg";
import img62 from "../assets/IMG-20251002-WA0057.jpg";
import img63 from "../assets/IMG-20251002-WA0069.jpg";

// --- Continuation from img64 to img77 (from image_b79f82.png) ---
import img64 from "../assets/IMG-20251002-WA0079.jpg";
import img65 from "../assets/IMG-20251002-WA0087.jpg";
import img66 from "../assets/IMG-20251002-WA0088.jpg";
import img67 from "../assets/IMG-20251002-WA0095.jpg";
import img68 from "../assets/IMG-20251003-WA0015.jpg";
import img69 from "../assets/IMG-20251003-WA0016.jpg";
import img70 from "../assets/IMG-20251003-WA0018.jpg";
import img71 from "../assets/IMG-20251003-WA0117.jpg";
import img72 from "../assets/IMG-20251003-WA0118.jpg";
import img73 from "../assets/IMG-20251004-WA0038.jpg";
import img74 from "../assets/IMG-20251004-WA0042.jpg";
import img75 from "../assets/IMG-20251004-WA0046.jpg";
import img76 from "../assets/IMG-20251004-WA0048.jpg";
// --- Continuation from img77 to img102 (from image_b79b66.png) ---
import img77 from "../assets/IMG-20251005-WA0107.jpg";
import img78 from "../assets/IMG-20251006-WA0003.jpg";
import img79 from "../assets/IMG-20251006-WA0076.jpg";
import img80 from "../assets/IMG-20251006-WA0077.jpg";
import img81 from "../assets/IMG-20251008-WA0004.jpg";
import img82 from "../assets/IMG-20251008-WA0005.jpg";
import img83 from "../assets/IMG-20251010-WA0032.jpg";
import img84 from "../assets/IMG-20251011-WA0024.jpg";
import img85 from "../assets/IMG-20251011-WA0025.jpg";
import img86 from "../assets/IMG-20251017-WA0008.jpg";
import img87 from "../assets/IMG-20251017-WA0018.jpg";
import img88 from "../assets/IMG-20251017-WA0020.jpg";
import img89 from "../assets/IMG-20251017-WA0026.jpg";
import img90 from "../assets/IMG-20251017-WA0037.jpg";
import img91 from "../assets/IMG-20251017-WA0049.jpg";
import img92 from "../assets/IMG-20251017-WA0113.jpg";
import img93 from "../assets/IMG-20251017-WA0117.jpg";
import img94 from "../assets/IMG-20251019-WA0027.jpg";
import img95 from "../assets/IMG-20251019-WA0033.jpg";
import img96 from "../assets/IMG-20251021-WA0003.jpg";
import img97 from "../assets/IMG-20251021-WA0006.jpg";
import img98 from "../assets/IMG-20251021-WA0007.jpg";
import img99 from "../assets/IMG-20251021-WA0033.jpg";
import img100 from "../assets/IMG-20251021-WA0044.jpg";
import img101 from "../assets/IMG-20251021-WA0049.jpg";


// Use the explicit local assets for the dome gallery
const images = [
  { src: img1, alt: 'IMG-20250517' },
  { src: img2, alt: 'IMG-20250520' },
  { src: img3, alt: 'IMG-20250521' },
  { src: img4, alt: 'IMG-20250522' },
  { src: img5, alt: 'IMG-20250527' },
  { src: img6, alt: 'IMG-20250527-2' },
  { src: img7, alt: 'IMG-20250528' },
  { src: img8, alt: 'IMG-20250529' },
  { src: img9, alt: 'IMG-20250531' },
  { src: img10, alt: 'IMG-20250615' },
  { src: img11, alt: 'IMG-20250702' },
  { src: img12, alt: 'IMG-20250703' },
  { src: img13, alt: 'IMG-20250705-1' },
  { src: img14, alt: 'IMG-20250705-2' },
  { src: img15, alt: 'IMG-20250713' },
  { src: img16, alt: 'IMG-20250716' },
  { src: img17, alt: 'IMG-20250725-1' },
  { src: img18, alt: 'IMG-20250725-2' },
  { src: img19, alt: 'IMG-20250726-1' },
  { src: img20, alt: 'IMG-20250726-2' },
  { src: img21, alt: 'IMG-20250730-1' },
  { src: img22, alt: 'IMG-20250730-2' },
  { src: img23, alt: 'IMG-20250731-1' },
  { src: img24, alt: 'IMG-20250731-2' },
  { src: img25, alt: 'IMG-20250806-1' },
  { src: img26, alt: 'IMG-20250806-2' },
  { src: img27, alt: 'IMG-20250809-1' },
  { src: img28, alt: 'IMG-20250809-2' },
  { src: img29, alt: 'IMG-20250812' },
 { src: img30, alt: 'IMG-20250813-1' },
  { src: img31, alt: 'IMG-20250813-2' },
  { src: img32, alt: 'IMG-20250813-3' },
  { src: img33, alt: 'IMG-20250813-4' },
  { src: img34, alt: 'IMG-20250814' },
  { src: img35, alt: 'IMG-20250819-1' },
  { src: img36, alt: 'IMG-20250819-2' },
  { src: img37, alt: 'IMG-20250824-1' },
  { src: img38, alt: 'IMG-20250824-2' },
  { src: img39, alt: 'IMG-20250824-3' },
  { src: img40, alt: 'IMG-20250828-1' },
  { src: img41, alt: 'IMG-20250828-2' },
  { src: img42, alt: 'IMG-20250902' },
  { src: img43, alt: 'IMG-20250912-1' },
  { src: img44, alt: 'IMG-20250912-2' },
  { src: img45, alt: 'IMG-20250914' },
  { src: img46, alt: 'IMG-20250918' },
  { src: img47, alt: 'IMG-20250921' },
  { src: img48, alt: 'IMG-20250926-1' },
  { src: img49, alt: 'IMG-20250926-2' },
  { src: img50, alt: 'IMG-20250926-3' },
  { src: img51, alt: 'IMG-20250926-4' },
// --- Continuation from img52 to img76 ---
  { src: img52, alt: 'IMG-20250926-5' },
  { src: img53, alt: 'IMG-20250927' },
  { src: img54, alt: 'IMG-20250929' },
  { src: img55, alt: 'IMG-20250930' },
  { src: img56, alt: 'IMG-20251001-1' },
  { src: img57, alt: 'IMG-20251001-2' },
  { src: img58, alt: 'IMG-20251001-3' },
  { src: img59, alt: 'IMG-20251001-4' },
  { src: img60, alt: 'IMG-20251001-5' },
  { src: img61, alt: 'IMG-20251002-1' },
  { src: img62, alt: 'IMG-20251002-2' },
  { src: img63, alt: 'IMG-20251002-3' },
  { src: img64, alt: 'IMG-20251002-4' },
  { src: img65, alt: 'IMG-20251002-5' },
  { src: img66, alt: 'IMG-20251002-6' },
  { src: img67, alt: 'IMG-20251002-7' },
  { src: img68, alt: 'IMG-20251003-1' },
  { src: img69, alt: 'IMG-20251003-2' },
  { src: img70, alt: 'IMG-20251003-3' },
  { src: img71, alt: 'IMG-20251003-4' },
  { src: img72, alt: 'IMG-20251003-5' },
  { src: img73, alt: 'IMG-20251004-1' },
  { src: img74, alt: 'IMG-20251004-2' },
  { src: img75, alt: 'IMG-20251004-3' },
  { src: img76, alt: 'IMG-20251004-4' },
  // --- Continuation from img77 to img101 ---
  { src: img77, alt: 'IMG-20251005' },
  { src: img78, alt: 'IMG-20251006-1' },
  { src: img79, alt: 'IMG-20251006-2' },
  { src: img80, alt: 'IMG-20251006-3' },
  { src: img81, alt: 'IMG-20251008-1' },
  { src: img82, alt: 'IMG-20251008-2' },
  { src: img83, alt: 'IMG-20251010' },
  { src: img84, alt: 'IMG-20251011-1' },
  { src: img85, alt: 'IMG-20251011-2' },
  { src: img86, alt: 'IMG-20251017-1' },
  { src: img87, alt: 'IMG-20251017-2' },
  { src: img88, alt: 'IMG-20251017-3' },
  { src: img89, alt: 'IMG-20251017-4' },
  { src: img90, alt: 'IMG-20251017-5' },
  { src: img91, alt: 'IMG-20251017-6' },
  { src: img92, alt: 'IMG-20251017-7' },
  { src: img93, alt: 'IMG-20251017-8' },
  { src: img94, alt: 'IMG-20251019-1' },
  { src: img95, alt: 'IMG-20251019-2' },
  { src: img96, alt: 'IMG-20251021-1' },
  { src: img97, alt: 'IMG-20251021-2' },
  { src: img98, alt: 'IMG-20251021-3' },
  { src: img99, alt: 'IMG-20251021-4' },
  { src: img100, alt: 'IMG-20251021-5' },
  { src: img101, alt: 'IMG-20251021-6' }
// --- End of new images ---
// --- End of new images ---
// --- End of new images ---
];

  const LoveDome3D = () => {
    // use the `images` array imported above (local assets)

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
