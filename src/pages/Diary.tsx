import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Heart, BookOpen, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { FloatingHearts } from "@/components/FloatingHearts";

interface DiaryEntry {
  id: string;
  content: string;
  created_at: string;
}

const Diary = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [diaryEntry, setDiaryEntry] = useState("");
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    try {
      const { data, error } = await supabase
        .from("diary_entries")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setEntries(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!diaryEntry.trim()) {
      toast({
        title: "Empty entry",
        description: "Please write something before saving.",
        variant: "destructive",
      });
      return;
    }

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      const { error } = await supabase
        .from("diary_entries")
        .insert({
          content: diaryEntry,
          created_by: user?.id,
        });

      if (error) throw error;

      toast({
        title: "Saved! 💕",
        description: "Your thoughts have been saved to our shared diary.",
      });

      setDiaryEntry("");
      fetchEntries();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600 mx-auto mb-4"></div>
          <p className="text-pink-600">Loading diary...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50 relative overflow-hidden">
      <FloatingHearts />

      <div className="relative z-10 container mx-auto px-4 py-12 max-w-4xl">
        <Button
          variant="outline"
          onClick={() => navigate("/universe")}
          className="mb-8 bg-white/70 backdrop-blur-sm border-rose-300"
        >
          ← Back to Universe
        </Button>

        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <BookOpen className="w-10 h-10 text-rose-500" />
            <h1 className="text-5xl font-elegant font-bold text-gradient-romantic animate-glow">
              Secret Diary 📖
            </h1>
          </div>
          <p className="text-lg text-foreground/70 font-romantic">
            Our private space to share thoughts, dreams, and feelings
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-romantic border-2 border-rose-200 mb-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center gap-2">
            <Heart className="w-6 h-6 text-rose-500 fill-rose-500" />
            Write Your Thoughts
          </h2>
          <Textarea
            value={diaryEntry}
            onChange={(e) => setDiaryEntry(e.target.value)}
            placeholder="Share what's in your heart today..."
            className="min-h-[200px] text-lg font-romantic bg-white/50 border-rose-200 focus:border-rose-400 resize-none"
          />
          <div className="flex justify-end mt-4">
            <Button
              onClick={handleSave}
              className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white"
            >
              <Send className="w-4 h-4 mr-2" />
              Save My Thoughts
            </Button>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <Heart className="w-6 h-6 text-rose-500 fill-rose-500" />
            Our Diary Entries
          </h2>
          {entries.length === 0 ? (
            <div className="text-center py-12 bg-white/50 rounded-2xl">
              <p className="text-gray-500 font-romantic">
                No entries yet. Start writing your first thought! ✨
              </p>
            </div>
          ) : (
            entries.map((entry) => (
              <div
                key={entry.id}
                className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-md border border-rose-100"
              >
                <p className="text-gray-700 font-romantic text-lg whitespace-pre-wrap mb-3">
                  {entry.content}
                </p>
                <p className="text-sm text-gray-500">
                  {new Date(entry.created_at).toLocaleString()}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Diary;
