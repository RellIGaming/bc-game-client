import { Gamepad2, Trophy, Spade, Flag, Ticket, TrendingUp, Grid3X3 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import card2 from "@/assets/images/card-2.png";
import card3 from "@/assets/images/card-3.png";

const categories = [
  {
    id: "casino",
    title: "CASINO",
    description: "Dive into our in-house games, live casino and slots",
    icon: Gamepad2,
    color: "text-primary",
    bgGradient: "from-emerald-900/80 to-emerald-950/80",
    image: card2,
    emoji: "🎰",
  },
  {
    id: "sports",
    title: "SPORTS",
    description: "Bet on Football, Cricket, NFL, eSports & over 80 sports!",
    icon: Trophy,
    color: "text-vip",
    bgGradient: "from-blue-900/80 to-blue-950/80",
    image: card3,
    emoji: "⚽",
  },
];

const subCategories = [
  { id: "poker", title: "POKER", icon: Spade, emoji: "🃏" },
  { id: "racing", title: "RACING", icon: Flag, emoji: "🏇" },
  { id: "lottery", title: "LOTTERY", icon: Ticket, emoji: "🎟️" },
  // { id: "updown", title: "UPDOWN", icon: TrendingUp, emoji: "📊" },
  // { id: "bingo", title: "BINGO", icon: Grid3X3, emoji: "🎱" },
];

const CategoryCards = () => {
  const navigate = useNavigate();

  return (
    <section className="space-y-4">
      {/* Main Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {categories.map((cat) => (
          <div
            key={cat.id}
            onClick={() => navigate(`/category/${cat.id}`)}
            className="relative overflow-hidden rounded-xl bg-card cursor-pointer group gaming-card-hover min-h-[120px]"
          >
            {/* Background Image */}
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-40"
              style={{ backgroundImage: `url(${cat.image})` }}
            />
            <div className={`absolute inset-0 bg-gradient-to-r ${cat.bgGradient}`} />
            
            {/* Content */}
            <div className="relative flex items-center justify-between p-5 h-full">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <cat.icon className={`w-5 h-5 ${cat.color}`} />
                  <h3 className="text-lg font-bold text-foreground">{cat.title}</h3>
                </div>
                <p className="text-xs text-muted-foreground max-w-[180px]">
                  {cat.description}
                </p>
              </div>
              <div className="w-20 h-20 lg:w-24 lg:h-24 flex items-center justify-center">
                <span className="text-5xl lg:text-6xl">{cat.emoji}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Sub Categories */}
      <div className="grid grid-cols-3 sm:grid-cols-3 gap-3">
        {subCategories.map((cat) => (
          <div
            key={cat.id}
            onClick={() => navigate(`/category/${cat.id}`)}
            className="flex flex-col items-center gap-2 p-4 rounded-xl bg-card cursor-pointer gaming-card-hover"
          >
            <div className="w-12 h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-secondary to-transparent rounded-xl flex items-center justify-center">
              <span className="text-2xl lg:text-3xl">{cat.emoji}</span>
            </div>
            <div className="flex items-center gap-1">
              <cat.icon className="w-4 h-4 text-primary" />
              <span className="text-xs font-semibold text-foreground">{cat.title}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoryCards;
