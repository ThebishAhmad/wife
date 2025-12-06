import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

interface LetterCardProps {
  letter: string;
  index: number;
}

export const LetterCard = ({ letter, index }: LetterCardProps) => {
  const colors = [
    "from-rose to-rose-light",
    "from-lavender to-lavender-light",
    "from-rose-dark to-rose",
    "from-lavender-light to-cream",
  ];

  const colorClass = colors[index % colors.length];

  return (
    <Link
      to={`/letter/${letter.toLowerCase()}`}
      className="group relative"
    >
      <div className="relative w-24 h-24 sm:w-32 sm:h-32 transition-all duration-500 hover:scale-110 hover:-translate-y-2">
        <div
          className={`absolute inset-0 bg-gradient-to-br ${colorClass} rounded-3xl shadow-romantic group-hover:shadow-glow transition-all duration-500`}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-4xl sm:text-5xl font-elegant font-bold text-white animate-glow">
              {letter}
            </span>
          </div>
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Heart className="w-4 h-4 fill-white text-white animate-pulse" />
          </div>
        </div>
      </div>
    </Link>
  );
};
