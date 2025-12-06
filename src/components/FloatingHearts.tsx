import { Heart } from "lucide-react";
import { useMemo } from "react";

interface FloatingHeart {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
}

export const FloatingHearts = () => {
  const hearts = useMemo<FloatingHeart[]>(() => 
    Array.from({ length: 8 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 8 + Math.random() * 4,
      size: 20 + Math.random() * 16,
    })),
    []
  );

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute bottom-0 animate-float-slow opacity-20"
          style={{
            left: `${heart.left}%`,
            animationDelay: `${heart.delay}s`,
            animationDuration: `${heart.duration}s`,
          }}
        >
          <Heart
            className="fill-rose text-rose"
            size={heart.size}
          />
        </div>
      ))}
    </div>
  );
};
