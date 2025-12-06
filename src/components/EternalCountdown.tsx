import { useState, useEffect } from "react";
import { Heart } from "lucide-react";

// Set the date you first met or started loving her (adjust this!)
const START_DATE = new Date("2023-01-01T00:00:00");

export const EternalCountdown = () => {
  const [timeElapsed, setTimeElapsed] = useState({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date();
      const diff = now.getTime() - START_DATE.getTime();

      const seconds = Math.floor(diff / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);
      const months = Math.floor(days / 30.44);
      const years = Math.floor(days / 365.25);

      setTimeElapsed({
        years,
        months: months % 12,
        days: days % 30,
        hours: hours % 24,
        minutes: minutes % 60,
        seconds: seconds % 60,
      });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-card/80 backdrop-blur-md rounded-2xl p-6 shadow-romantic border border-rose-light/30">
      <h3 className="text-2xl font-elegant font-bold text-center text-gradient-romantic mb-4">
        Loving You For ∞
      </h3>
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-4 text-center">
        {[
          { label: "Years", value: timeElapsed.years },
          { label: "Months", value: timeElapsed.months },
          { label: "Days", value: timeElapsed.days },
          { label: "Hours", value: timeElapsed.hours },
          { label: "Minutes", value: timeElapsed.minutes },
          { label: "Seconds", value: timeElapsed.seconds },
        ].map((item) => (
          <div key={item.label} className="space-y-1">
            <div className="text-3xl font-bold text-foreground">{item.value}</div>
            <div className="text-xs font-romantic text-muted-foreground">{item.label}</div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-4">
        <Heart className="w-6 h-6 fill-rose text-rose animate-heartbeat" />
      </div>
      <p className="text-sm font-romantic text-center text-muted-foreground mt-2">
        Every second with you is a gift 💖
      </p>
    </div>
  );
};
