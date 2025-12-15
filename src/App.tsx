import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CustomCursor } from "./components/CustomCursor";
import AuthGuard from "./components/AuthGuard";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import LetterPage from "./pages/LetterPage";
import Garden from "./pages/Garden";
import Diary from "./pages/Diary";
import Gallery from "./pages/Gallery";
import Moments from "./pages/Moments";
import Reflection from "./pages/Reflection";
import OurSong from "./pages/OurSong";
import LoveConstellation from "./pages/LoveConstellation";
import HotColdGame from "./pages/HotColdGame";
import LoveCoupons from "./pages/LoveCoupons";
import MemoryElevator from "./pages/MemoryElevator";
import UniverseDashboard from "./pages/UniverseDashboard";
import DoraemonMemory from "./pages/DoraemonMemory";
import TaylorConcertStage from "./pages/TaylorConcertStage";
import BirthdayCelebration from "./pages/BirthdayCelebration";
import OurJourneyTimeline from "./pages/OurJourneyTimeline";
import QuantumPlayground from "./pages/QuantumPlayground";
import PixelatedPortrait from "./pages/PixelatedPortrait";
import OurDateBook from "./pages/OurDateBook";
import StardustMemories from "./pages/StardustMemories";
import HeroParallaxPage from "./pages/HeroParallaxPage";
import LoveScrollJourney from "./pages/LoveScrollJourney";
import Auth from "./pages/Auth";
import BucketList from "./pages/BucketList";
import LoveDome3D from "./pages/LoveDome3D";
import InfiniteMemories from "./pages/InfiniteMemories";
import InteractiveParticles from "./pages/InteractiveParticles";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CustomCursor />
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path="/" element={<AuthGuard><Index /></AuthGuard>} />
          <Route path="/bucket-list" element={<AuthGuard><BucketList /></AuthGuard>} />
          <Route path="/letter/:letter" element={<AuthGuard><LetterPage /></AuthGuard>} />
          <Route path="/garden" element={<AuthGuard><Garden /></AuthGuard>} />
          <Route path="/diary" element={<AuthGuard><Diary /></AuthGuard>} />
          <Route path="/gallery" element={<AuthGuard><Gallery /></AuthGuard>} />
          <Route path="/moments" element={<AuthGuard><Moments /></AuthGuard>} />
          <Route path="/reflection" element={<AuthGuard><Reflection /></AuthGuard>} />
          <Route path="/our-song" element={<AuthGuard><OurSong /></AuthGuard>} />
          <Route path="/constellation" element={<AuthGuard><LoveConstellation /></AuthGuard>} />
          <Route path="/hot-cold" element={<AuthGuard><HotColdGame /></AuthGuard>} />
          <Route path="/coupons" element={<AuthGuard><LoveCoupons /></AuthGuard>} />
          <Route path="/elevator" element={<AuthGuard><MemoryElevator /></AuthGuard>} />
          <Route path="/universe" element={<AuthGuard><UniverseDashboard /></AuthGuard>} />
          <Route path="/doraemon" element={<AuthGuard><DoraemonMemory /></AuthGuard>} />
          <Route path="/taylor-concert" element={<AuthGuard><TaylorConcertStage /></AuthGuard>} />
          <Route path="/birthday-celebration" element={<AuthGuard><BirthdayCelebration /></AuthGuard>} />

          <Route path="/quantum-playground" element={<AuthGuard><QuantumPlayground /></AuthGuard>} />
          <Route path="/pixelated-portrait" element={<AuthGuard><PixelatedPortrait /></AuthGuard>} />
          <Route path="/our-date-book" element={<AuthGuard><OurDateBook /></AuthGuard>} />
          <Route path="/stardust-memories" element={<AuthGuard><StardustMemories /></AuthGuard>} />
          <Route path="/hero-parallax" element={<AuthGuard><HeroParallaxPage /></AuthGuard>} />
          <Route path="/love-scroll-journey" element={<AuthGuard><LoveScrollJourney /></AuthGuard>} />
          <Route path="/love-dome-3d" element={<AuthGuard><LoveDome3D /></AuthGuard>} />
          <Route path="/infinite-memories" element={<AuthGuard><InfiniteMemories /></AuthGuard>} />
          <Route path="/particles" element={<AuthGuard><InteractiveParticles /></AuthGuard>} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
