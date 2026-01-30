import { useEffect, useState } from "react";
import bannerImg from "../../assets/images/sports-banner.jpeg";
import { ChevronLeft, ChevronRight } from "lucide-react";

const banners = [
  {
    id: 1,
    match: {
      league: "Italy · Serie A",
      time: "Tomorrow 01:15",
      home: "Lazio Rome",
      away: "Genoa CFC",
      odds: { home: 2.14, draw: 2.88, away: 4.1 },
    },
  },
  {
    id: 2,
    match: {
      league: "England · Premier League",
      time: "Today 22:30",
      home: "Manchester City",
      away: "Arsenal",
      odds: { home: 1.75, draw: 3.2, away: 4.8 },
    },
  },
];

const LiveMatchBanner = () => {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((prev) => (prev + 1) % banners.length);
  const prev = () => setIndex((prev) => (prev - 1 + banners.length) % banners.length);

  // ✅ Auto slide always
  useEffect(() => {
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full h-[180px] sm:h-[190px] md:h-[220px] lg:h-[240px] rounded-xl overflow-hidden">

      {/* SLIDER WRAPPER */}
      <div
        className="flex h-full transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {banners.map((item) => (
          <div key={item.id} className="relative min-w-full h-full">

            {/* Background Image */}
            <img
              src={bannerImg}
              alt="banner"
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />

            {/* Content */}
            <div className="relative z-10 p-3 sm:p-4 md:p-6 lg:p-8">

              {/* LIVE MATCH CARD */}
              <div className="w-full sm:w-[420px]  p-3 sm:p-4">

                {/* Header */}
                <div className="flex items-center justify-between text-xs text-white/70 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-green-400 font-semibold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                      LIVE
                    </span>
                    <span>{item.match.league}</span>
                  </div>
                  <span>{item.match.time}</span>
                </div>

                {/* Teams */}
                <div className="space-y-2 mb-3">
                  <div className="flex items-center gap-2 text-white font-medium text-sm">
                    ⚽ {item.match.home}
                  </div>
                  <div className="flex items-center gap-2 text-white font-medium text-sm">
                    ⚽ {item.match.away}
                  </div>
                </div>

                {/* Odds */}
                <div className="grid grid-cols-4 gap-2">
                  <div className="bg-[#1f2733] hover:bg-[#263040] transition rounded-md px-2 py-2 text-xs text-white flex flex-col items-center cursor-pointer">
                    <span className="text-white/60">1</span>
                    <span className="font-semibold">{item.match.odds.home}</span>
                  </div>

                  <div className="bg-[#1f2733] hover:bg-[#263040] transition rounded-md px-2 py-2 text-xs text-white flex flex-col items-center cursor-pointer">
                    <span className="text-white/60">draw</span>
                    <span className="font-semibold">{item.match.odds.draw}</span>
                  </div>

                  <div className="bg-[#1f2733] hover:bg-[#263040] transition rounded-md px-2 py-2 text-xs text-white flex flex-col items-center cursor-pointer">
                    <span className="text-white/60">2</span>
                    <span className="font-semibold">{item.match.odds.away}</span>
                  </div>

                  <div className="bg-[#263040] hover:bg-[#2f3b4f] transition rounded-md flex items-center justify-center text-white text-xs cursor-pointer">
                    ⌄
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ✅ LEFT ARROW INSIDE IMAGE */}
      <button
        onClick={prev}
        className="absolute left-3 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-black/70 p-2 rounded-full transition"
      >
        <ChevronLeft className="w-5 h-5 text-white" />
      </button>

      {/* ✅ RIGHT ARROW INSIDE IMAGE */}
      <button
        onClick={next}
        className="absolute right-3 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-black/70 p-2 rounded-full transition"
      >
        <ChevronRight className="w-5 h-5 text-white" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-3 left-6 flex gap-2 z-20">
        {banners.map((_, i) => (
          <span
            key={i}
            className={`h-1 rounded-full transition-all ${
              i === index ? "w-6 bg-green-400" : "w-2 bg-white/40"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default LiveMatchBanner;
