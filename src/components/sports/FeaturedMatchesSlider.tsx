import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Dot } from "lucide-react";

const matches = [
 {
    id: 1,
    league: "International · Champions League (2x6 min)",
    time: "55′ 2nd half",
    scoreHome: 0,
    scoreAway: 1,
    home: "Bayern",
    away: "Valencia CF",
    odds1: "5.7",
    oddsDraw: "2.7",
    odds2: "1.75",
  },
  {
    id: 2,
    league: "England · FA Cup (2x6 min)",
    time: "52′ 2nd half",
    scoreHome: 0,
    scoreAway: 1,
    home: "Arsenal FC",
    away: "Chelsea FC",
    odds1: "10.0",
    oddsDraw: "3.15",
    odds2: "1.20",
  },
  {
    id: 3,
    league: "International · Bundesliga",
    time: "52′ 2nd half",
    scoreHome: 0,
    scoreAway: 1,
    home: "Arsenal FC",
    away: "Chelsea FC",
    odds1: "10.0",
    oddsDraw: "3.15",
    odds2: "1.20",
  },
  {
    id: 4,
    league: "Spain · La Liga",
    time: "52′ 2nd half",
    scoreHome: 0,
    scoreAway: 1,
    home: "Arsenal FC",
    away: "Chelsea FC",
    odds1: "10.0",
    oddsDraw: "3.15",
    odds2: "1.20",
  },
  {
    id: 5,
    league: "Italy · Serie A",
    time: "52′ 2nd half",
    scoreHome: 0,
    scoreAway: 1,
    home: "Arsenal FC",
    away: "Chelsea FC",
    odds1: "10.0",
    oddsDraw: "3.15",
    odds2: "1.20",
  },
];

const FeaturedMatchesSlider = () => {
  const [index, setIndex] = useState(0);

  const cardsPerView = window.innerWidth < 640 ? 1 : 3;

  const next = () => {
    setIndex((prev) => (prev + 1) % matches.length);
  };

  const prev = () => {
    setIndex((prev) => (prev - 1 + matches.length) % matches.length);
  };

  // ✅ Auto slide
  useEffect(() => {
    const timer = setInterval(next, 3500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full overflow-hidden">
<div className="flex- flex-row mb-2">
  <p className="text-lg font-bold">Live</p>
</div>
      {/* Slider Track */}
      <div
        className="flex transition-transform duration-700 ease-in-out gap-4"
        style={{
          transform: `translateX(-${(index * 100) / cardsPerView}%)`,
        }}
      >
       {matches.map((m) => (
  <LiveMatchCard key={m.id} match={m} />
))}
      </div>

      {/* ✅ Left Arrow */}
      <button
        onClick={prev}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 p-2 rounded-full z-10"
      >
        <ChevronLeft className="w-5 h-5 text-white" />
      </button>

      {/* ✅ Right Arrow */}
      <button
        onClick={next}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 p-2 rounded-full z-10"
      >
        <ChevronRight className="w-5 h-5 text-white" />
      </button>
    </div>
  );
};

export default FeaturedMatchesSlider;

const LiveMatchCard = ({ match }: any) => {
  return (
    <div className="relative min-w-full sm:min-w-[calc(100%/3)] h-[150px] b-radius overflow-hidden bg-gradient-to-br from-[#1c2633] via-[#1a2230] to-[#141b24] border border-white/10 shadow-lg">

      {/* TOP BAR */}
      <div className="flex items-center justify-between px-3 pt-2 text-[10px] text-white/70">
        <span>{match.league}</span>
        <span className="text-green-400 font-semibold">
          {match.time}
        </span>
      </div>

      {/* SCORE ROW */}
      <div className="flex items-center justify-center gap-4 mt-2 text-white text-xs font-semibold">
        <span>{match.scoreHome}</span>
        <span className="text-white/40">:</span>
        <span>{match.scoreAway}</span>
      </div>

      {/* TEAMS */}
      <div className="flex justify-between px-3 mt-1 text-white text-sm font-medium">
        <span>{match.home}</span>
        <span>{match.away}</span>
      </div>

      {/* ODDS */}
      <div className="grid grid-cols-3 gap-2 px-3 mt-3">
        <div className="bg-[#232f3e] hover:bg-[#2b3a4d] transition rounded-md py-1.5 text-center text-xs text-white">
          <p className="text-white/50">1</p>
          <p className="font-semibold">{match.odds1}</p>
        </div>

        <div className="bg-[#232f3e] hover:bg-[#2b3a4d] transition rounded-md py-1.5 text-center text-xs text-white">
          <p className="text-white/50">draw</p>
          <p className="font-semibold">{match.oddsDraw}</p>
        </div>

        <div className="bg-[#232f3e] hover:bg-[#2b3a4d] transition rounded-md py-1.5 text-center text-xs text-white">
          <p className="text-white/50">2</p>
          <p className="font-semibold">{match.odds2}</p>
        </div>
      </div>
    </div>
  );
};

