import { useState, useEffect } from "react";
import { Heart } from "lucide-react";

// 19th May 2025, 11:50 PM
const START_DATE = new Date("2025-05-19T23:50:00");

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
      let start = new Date(START_DATE);

      let years = now.getFullYear() - start.getFullYear();
      let months = now.getMonth() - start.getMonth();
      let days = now.getDate() - start.getDate();
      let hours = now.getHours() - start.getHours();
      let minutes = now.getMinutes() - start.getMinutes();
      let seconds = now.getSeconds() - start.getSeconds();

      // Borrow seconds
      if (seconds < 0) {
        seconds += 60;
        minutes--;
      }

      // Borrow minutes
      if (minutes < 0) {
        minutes += 60;
        hours--;
      }

      // Borrow hours
      if (hours < 0) {
        hours += 24;
        days--;
      }

      // Borrow days (from previous month)
      if (days < 0) {
        const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        days += prevMonth.getDate();
        months--;
      }

      // Borrow months
      if (months < 0) {
        months += 12;
        years--;
      }

      setTimeElapsed({
        years,
        months,
        days,
        hours,
        minutes,
        seconds,
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
            <div className="text-3xl font-bold text-foreground">
              {item.value}
            </div>
            <div className="text-xs font-romantic text-muted-foreground">
              {item.label}
            </div>
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
