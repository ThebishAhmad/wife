import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Heart, Sparkles } from "lucide-react";

interface WelcomePopupProps {
  userEmail: string;
}

export const WelcomePopup = ({ userEmail }: WelcomePopupProps) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Show popup only for the special email
    if (userEmail.toLowerCase() === "unnatimall1612@gmail.com") {
      // Check if popup was already shown in this session
      const popupShown = sessionStorage.getItem("welcomePopupShown");
      if (!popupShown) {
        setTimeout(() => setOpen(true), 500);
        sessionStorage.setItem("welcomePopupShown", "true");
      }
    }
  }, [userEmail]);

  if (userEmail.toLowerCase() !== "unnatimall1612@gmail.com") {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md bg-gradient-to-br from-pink-50 to-rose-50 border-pink-200">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-center gap-2 text-3xl text-pink-600">
            <Heart className="w-8 h-8 fill-pink-500 text-pink-500 animate-pulse" />
            <Sparkles className="w-6 h-6 text-yellow-500" />
            Welcome, My Love!
            <Sparkles className="w-6 h-6 text-yellow-500" />
          </DialogTitle>
          <div className="text-center text-lg pt-4 text-rose-400">
            <div className="space-y-4">
              <p className="font-semibold text-xl">✨ You're finally here! ✨</p>
              <p>This entire website was made just for you, with all my love and care.</p>
              <p className="text-pink-600">
                Every pixel, every animation, every memory captured here is a celebration of us. 💕
              </p>
              <p className="font-medium">
                Explore, enjoy, and know that you're the most special person in my world. 🌟
              </p>
            </div>
          </div>
        </DialogHeader>
        <div className="flex justify-center pt-4">
          <button
            onClick={() => setOpen(false)}
            className="px-6 py-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full hover:from-pink-600 hover:to-rose-600 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Let's Explore Together! 💖
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
