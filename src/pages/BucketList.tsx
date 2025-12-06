import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import { Trash2, Plus, Heart } from "lucide-react";
import type { User } from "@supabase/supabase-js";

interface BucketListItem {
  id: string;
  title: string;
  description: string | null;
  completed: boolean;
  created_at: string;
}

const BucketList = () => {
  const [user, setUser] = useState<User | null>(null);
  const [items, setItems] = useState<BucketListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    checkUser();
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        navigate("/auth");
      } else {
        setUser(session.user);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const checkUser = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      navigate("/auth");
      return;
    }

    setUser(session.user);
    await fetchItems();
  };

  const fetchItems = async () => {
    try {
      const { data, error } = await supabase
        .from("bucket_list")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setItems(data || []);
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

  const addItem = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newTitle.trim()) {
      toast({
        title: "Error",
        description: "Please enter a title",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase
        .from("bucket_list")
        .insert({
          title: newTitle.trim(),
          description: newDescription.trim() || null,
          created_by: user?.id,
        });

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Item added to bucket list",
      });

      setNewTitle("");
      setNewDescription("");
      await fetchItems();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const toggleComplete = async (id: string, completed: boolean) => {
    try {
      const { error } = await supabase
        .from("bucket_list")
        .update({ completed: !completed })
        .eq("id", id);

      if (error) throw error;
      await fetchItems();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const deleteItem = async (id: string) => {
    try {
      const { error } = await supabase
        .from("bucket_list")
        .delete()
        .eq("id", id);

      if (error) throw error;
      
      toast({
        title: "Deleted",
        description: "Item removed from bucket list",
      });
      
      await fetchItems();
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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-pink-100 via-rose-50 to-white">
        <p className="text-pink-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 via-rose-50 to-white p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-pink-600 mb-2 flex items-center justify-center gap-2">
            <Heart className="w-10 h-10 fill-pink-500 text-pink-500" />
            Our Bucket List
          </h1>
          <p className="text-rose-500">Dreams we'll make come true together 💕</p>
          <Button
            onClick={() => navigate("/")}
            variant="outline"
            className="mt-4"
          >
            Back to Home
          </Button>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-pink-600">Add New Dream</CardTitle>
            <CardDescription>What adventure should we add to our list?</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={addItem} className="space-y-4">
              <div>
                <Input
                  placeholder="Title (e.g., Visit Paris together)"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  maxLength={100}
                />
              </div>
              <div>
                <Textarea
                  placeholder="Description (optional)"
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  maxLength={500}
                  rows={3}
                />
              </div>
              <Button type="submit" className="w-full">
                <Plus className="w-4 h-4 mr-2" />
                Add to Bucket List
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="space-y-4">
          {items.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center text-gray-500">
                No items yet. Start adding your dreams! 🌟
              </CardContent>
            </Card>
          ) : (
            items.map((item) => (
              <Card key={item.id} className={item.completed ? "bg-green-50 border-green-200" : ""}>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <Checkbox
                      checked={item.completed}
                      onCheckedChange={() => toggleComplete(item.id, item.completed)}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <h3 className={`font-semibold text-lg ${item.completed ? "line-through text-gray-500" : "text-pink-600"}`}>
                        {item.title}
                      </h3>
                      {item.description && (
                        <p className={`text-sm mt-1 ${item.completed ? "text-gray-400" : "text-gray-600"}`}>
                          {item.description}
                        </p>
                      )}
                      {item.completed && (
                        <p className="text-xs text-green-600 mt-2">✨ Dream achieved!</p>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => deleteItem(item.id)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default BucketList;
