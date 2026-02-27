import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart, Sparkles, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface Coupon {
  id: string;
  title: string;
  description: string;
  redeemed: boolean;
  redeemed_at: string | null;
}

const LoveCoupons = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuthAndFetchCoupons();
  }, []);

  const checkAuthAndFetchCoupons = async () => {
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    
    if (sessionError || !session) {
      navigate("/auth");
      return;
    }
    
    fetchCoupons();
  };

  const fetchCoupons = async () => {
    try {
      const { data, error } = await supabase
        .from("love_coupons")
        .select("*")
        .order("created_at", { ascending: true });

      if (error) throw error;
      setCoupons(data || []);
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

  const redeemCoupon = async (id: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      const { error } = await supabase
        .from("love_coupons")
        .update({ 
          redeemed: true, 
          redeemed_at: new Date().toISOString(),
          redeemed_by: user?.id 
        })
        .eq("id", id);

      if (error) throw error;

      setCoupons(coupons.map(coupon => 
        coupon.id === id 
          ? { ...coupon, redeemed: true, redeemed_at: new Date().toISOString() }
          : coupon
      ));

      toast({
        title: "Coupon Redeemed! 💝",
        description: "Time to make this special moment happen!",
      });
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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-rose-100 to-purple-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600 mx-auto mb-4"></div>
          <p className="text-pink-600">Loading your coupons</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-rose-100 to-purple-100 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <Heart
            key={i}
            className="absolute animate-float-slow opacity-20 fill-rose-300 text-rose-300"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${20 + Math.random() * 40}px`,
              height: `${20 + Math.random() * 40}px`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12">
        <Button
          variant="outline"
          onClick={() => navigate("/universe")}
          className="mb-8 bg-white/70 backdrop-blur-sm border-rose-300"
        >
          ← Back to Universe
        </Button>

        <div className="text-center mb-12">
          <h1 className="text-5xl font-elegant font-bold text-gradient-romantic mb-4 animate-glow">
            Love Coupons 💝
          </h1>
          <p className="text-lg text-foreground/80 font-romantic">
            Redeem these special moments whenever you want. I know im so nice like so so nice.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {coupons.map((coupon) => (
            <div
              key={coupon.id}
              className={`relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-romantic border-2 transition-all duration-300 ${
                coupon.redeemed
                  ? "border-gray-300 opacity-70"
                  : "border-rose-300 hover:scale-105 hover:shadow-xl group"
              }`}
            >
              {!coupon.redeemed && (
                <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Sparkles className="w-8 h-8 text-yellow-400 animate-pulse" />
                </div>
              )}

              <div className="flex items-start gap-3 mb-4">
                <Heart
                  className={`w-6 h-6 flex-shrink-0 ${
                    coupon.redeemed
                      ? "fill-gray-400 text-gray-400"
                      : "fill-rose-500 text-rose-500 animate-pulse"
                  }`}
                />
                <h3 className="text-xl font-bold text-gray-800">{coupon.title}</h3>
              </div>

              <p className="text-gray-700 mb-6 font-romantic">{coupon.description}</p>

              {coupon.redeemed ? (
                <div className="text-center py-3 bg-gray-100 rounded-lg">
                  <p className="text-gray-600 font-semibold">✓ Redeemed</p>
                  {coupon.redeemed_at && (
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(coupon.redeemed_at).toLocaleDateString()}
                    </p>
                  )}
                </div>
              ) : (
                <Button
                  onClick={() => redeemCoupon(coupon.id)}
                  className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white"
                >
                  Redeem Now ❤️
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoveCoupons;
