import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import flag from "../../assets/images/costume-6.png"

const lotteries = [
  {
    id: 1,
    name: "Greece KENO",
    country: flag,
    frequency: "20/80",
    prize: "$38,000.00",
    nextDraw: { hours: 0, minutes: 0, seconds: 43 },
  },
  {
    id: 2,
    name: "Italy 10e Lotto",
    country: flag,
    frequency: "20/90",
    prize: "$4,000.00",
    nextDraw: { hours: 0, minutes: 0, seconds: 43 },
  },
  {
    id: 3,
    name: "Poland Keno",
    country: flag,
    frequency: "20/70",
    prize: "$1,500.00",
    nextDraw: { hours: 0, minutes: 1, seconds: 43 },
  },
  {
    id: 4,
    name: "Slovakia EKlub Keno",
    country: flag,
    frequency: "20/80",
    prize: "$10,000.00",
    nextDraw: { hours: 0, minutes: 1, seconds: 43 },
  },
  {
    id: 5,
    name: "Spanish Express",
    country: flag,
    frequency: "20/70",
    prize: "$1,500.00",
    nextDraw: { hours: 0, minutes: 1, seconds: 43 },
  },
];

const UpcomingLottery = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [timers, setTimers] = useState(
    lotteries.map((l) => ({ ...l.nextDraw }))
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTimers((prev) =>
        prev.map((timer) => {
          let { hours, minutes, seconds } = timer;
          seconds--;
          if (seconds < 0) {
            seconds = 59;
            minutes--;
            if (minutes < 0) {
              minutes = 59;
              hours--;
              if (hours < 0) {
                hours = 0;
                minutes = 0;
                seconds = 0;
              }
            }
          }
          return { hours, minutes, seconds };
        })
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -300 : 300,
        behavior: "smooth",
      });
    }
  };

  const formatTime = (val: number) => String(val).padStart(2, "0");

  return (
    <section className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-foreground">Upcoming Lottery Draw</h2>
        <div className="flex items-center gap-2">
          <span className="text-sm text-primary hover:underline cursor-pointer">All</span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => scroll("left")}
              className="p-1.5 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
            >
              <ChevronLeft className="w-4 h-4 text-muted-foreground" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="p-1.5 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
            >
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>
        </div>
      </div>

      {/* Lottery Cards */}
      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto scrollbar-hide pb-2"
      >
        {lotteries.map((lottery, idx) => (
          <div
            key={lottery.id}
            className="flex-shrink-0 w-52 lg:w-56 rounded-xl bg-card p-4 cursor-pointer gaming-card-hover"
          >
            {/* Header */}
            <div className="flex items-center gap-2 mb-3">
              <img className="w-10" src={lottery.country} alt="logo"/>
              <div>
                <h3 className="text-sm font-bold text-foreground">{lottery.name}</h3>
                <p className="text-[10px] text-muted-foreground">{lottery.frequency}</p>
              </div>
            </div>

            {/* Prize */}
            <p className="text-xl font-bold text-foreground mb-3">{lottery.prize}</p>

            {/* Bet Button */}
            <Button className="w-full mb-3 text-sm">Bet Now</Button>

            {/* Timer */}
            <div className="text-center">
              <p className="text-[10px] text-muted-foreground mb-1">Next Draw Starts In</p>
              <div className="flex items-center justify-center gap-1 text-xs">
                <span className="bg-secondary px-1.5 py-0.5 rounded font-mono">
                  {formatTime(timers[idx].hours)}h
                </span>
                <span className="text-muted-foreground">:</span>
                <span className="bg-secondary px-1.5 py-0.5 rounded font-mono">
                  {formatTime(timers[idx].minutes)}m
                </span>
                <span className="text-muted-foreground">:</span>
                <span className="bg-secondary px-1.5 py-0.5 rounded font-mono">
                  {formatTime(timers[idx].seconds)}s
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default UpcomingLottery;
