import { useEffect, useState } from "react";
import { Heart } from "lucide-react";

const loveMessages = [
  "You're my everything 💖",
  "Forever yours 💕",
  "My heart beats for you ❤️",
  "You complete me 💗",
  "Endless love 💝",
  "You're my forever 💞",
  "My soul knows yours 💓",
  "Love you infinitely ∞",
  "You're my dream come true ✨",
  "My heart is yours 💘",
];

interface Message {
  id: number;
  text: string;
  x: number;
  y: number;
}

export const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    let rafId: number;
    
    const handleMouseMove = (e: MouseEvent) => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        setPosition({ x: e.clientX, y: e.clientY });
      });
    };

    const handleClick = (e: MouseEvent) => {
      // Only show messages 30% of the time to reduce clutter
      if (Math.random() < 0.3) {
        const randomMessage = loveMessages[Math.floor(Math.random() * loveMessages.length)];
        const newMessage: Message = {
          id: Date.now(),
          text: randomMessage,
          x: e.clientX,
          y: e.clientY,
        };
        
        setMessages((prev) => [...prev, newMessage]);
        
        setTimeout(() => {
          setMessages((prev) => prev.filter((msg) => msg.id !== newMessage.id));
        }, 2000);
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("click", handleClick);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <>
      <style>{`
        * {
          cursor: none !important;
        }
      `}</style>
      
      <div
        className="fixed pointer-events-none z-[9999]"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: "translate(-50%, -50%)",
          willChange: 'transform',
        }}
      >
        <Heart className="w-6 h-6 fill-rose text-rose" />
      </div>

      {messages.map((message) => (
        <div
          key={message.id}
          className="fixed pointer-events-none z-[9998] animate-fade-in font-romantic text-rose text-sm"
          style={{
            left: `${message.x}px`,
            top: `${message.y - 30}px`,
            animation: "fadeOut 3s ease-out forwards",
          }}
        >
          {message.text}
        </div>
      ))}

      <style>{`
        @keyframes fadeOut {
          0% {
            opacity: 1;
            transform: translateY(0);
          }
          100% {
            opacity: 0;
            transform: translateY(-30px);
          }
        }
      `}</style>
    </>
  );
};
