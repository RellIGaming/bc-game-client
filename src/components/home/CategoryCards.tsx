import { Gamepad2, Trophy, Spade, Flag, Ticket, TrendingUp, Grid3X3 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import casino from "@/assets/images/Casino-Logo-png.png";
import sports from "@/assets/images/Casino-Logo-sportsv2-png.png";
import poker from "@/assets/images/poker-big-logo.png";
import racing from "@/assets/images/Casino-Logo-racing-png.png";
import lottery from "@/assets/images/Casino-Logo-ticket-png.png";

const categories = [
  {
    id: "casino",
    title: "CASINO",
    description: "Dive into our in-house games, live casino and slots",
    icon: Gamepad2,
    color: "text-primary",
    // bgGradient: "from-emerald-900/80 to-emerald-950/80",
    image: casino,
    emoji: "🎰",
  },
  {
    id: "sports",
    title: "SPORTS",
    description: "Bet on Football, Cricket, NFL, eSports & over 80 sports!",
    icon: Trophy,
    color: "text-vip",
    // bgGradient: "from-blue-900/80 to-blue-950/80",
    image: sports,
    emoji: "⚽",
  },
];

const subCategories = [
  { id: "poker", title: "POKER", icon: Spade, image: poker },
  { id: "racing", title: "RACING", icon: Flag, image: racing },
  { id: "lottery", title: "LOTTERY", icon: Ticket, image: lottery },
  // { id: "updown", title: "UPDOWN", icon: TrendingUp, emoji: "📊" },
  // { id: "bingo", title: "BINGO", icon: Grid3X3, emoji: "🎱" },
];

const CategoryCards = () => {
  const navigate = useNavigate();

  return (
    <section className="space-y-4">
      {/* Main Categories */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4">

        {categories.map((cat) => (
          <div
            key={cat.id}
            onClick={() => navigate(`/category/${cat.id}`)}
            className="relative overflow-hidden b-radius bg-card cursor-pointer group gaming-card-hover min-h-[120px]"
          >
            {/* Background Image */}
            {/* <div 
              className="absolute inset-0 bg-cover bg-center opacity-40"
              style={{ backgroundImage: `url(${cat.image})` }}
            /> */}

            {/* Content */}
            <div className="relative flex  justify-between p-5 h-full">
              <div className="flex gap-2 mb-2">
                <cat.icon className={`w-5 h-5 ${cat.color}`} />
                <h3 className="text-sm sm:text-base lg:text-lg font-bold">
                  {cat.title}
                </h3>

              </div>
              {/* <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <cat.icon className={`w-5 h-5 ${cat.color}`} />
                  <h3 className="text-lg font-bold text-foreground">{cat.title}</h3>
                </div>
                <p className="text-xs text-muted-foreground max-w-[180px]">
                  {cat.description}
                </p>
              </div> */}
              <div className=" flex items-center justify-center">
                <img
                  className="w-20 h-20 sm:w-24 sm:h-24 lg:w-36 lg:h-36"
                  src={cat.image}
                  alt="logo"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Sub Categories */}
      {/* <div className="grid grid-cols-3 gap-2 sm:gap-3">
        {subCategories.map((cat) => (
          <div
            key={cat.id}
            onClick={() => navigate(`/category/${cat.id}`)}
            className="flex flex-col items-center gap-2 p-4 rounded-xl bg-card cursor-pointer gaming-card-hover"
          >
            <div className=" rounded-xl flex items-center justify-center">
              <img className="w-12 h-12 lg:w-14 lg:h-14" src={cat.image} alt="logo" />
            </div>
            <div className="flex items-center gap-1">
              <span className="text-xs font-semibold text-foreground">{cat.title}</span>
            </div>
          </div>
        ))}
      </div> */}
    </section>
  );
};

export default CategoryCards;
