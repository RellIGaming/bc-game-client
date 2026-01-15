import { Gamepad2, Trophy, Spade, Coins, Ticket, TrendingUp, Grid3X3 } from "lucide-react";
import card2 from "../../assets/images/card-2.png"
import card3 from "../../assets/images/card-3.png"
import card4 from "../../assets/images/card-4.png"
import card5 from "../../assets/images/card-5.png"
import card6 from "../../assets/images/card-6.png"
import card7 from "../../assets/images/card-7.png"
import card8 from "../../assets/images/card-8.png"
import card9 from "../../assets/images/card-9.png"
import card10 from "../../assets/images/card-10.png"
import card11 from "../../assets/images/card-11.png"

const categories = [
  {
    id: "casino",
    title: "CASINO",
    description: "Dive into our in-house games, live casino and slots",
    icon: Gamepad2,
    color: "text-primary",
    image: card2,
  },
  {
    id: "sports",
    title: "SPORTS",
    description: "Bet on Football, Cricket, NFL, eSports & over 80 sports!",
    icon: Trophy,
    color: "text-vip",
    image: card3,
  },
];

const subCategories = [
  { id: "poker", title: "POKER", icon: Spade, emoji: "🃏" },
  { id: "racing", title: "RACING", icon: Trophy, emoji: "🏇" },
  { id: "lottery", title: "LOTTERY", icon: Ticket, emoji: "🎟️" },
  // { id: "updown", title: "UPDOWN", icon: TrendingUp, emoji: "📊" },
  // { id: "bingo", title: "BINGO", icon: Grid3X3, emoji: "🎱" },
];

const CategoryCards = () => {
  return (
    <section className="space-y-4">
      {/* Main Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="relative overflow-hidden rounded-xl bg-card p-6 cursor-pointer group gaming-card-hover"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <cat.icon className={`w-6 h-6 ${cat.color}`} />
                  <h3 className="text-xl font-bold text-foreground">{cat.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground max-w-[200px]">
                  {cat.description}
                </p>
              </div>
              <div className="w-24 h-24 lg:w-32 lg:h-32 bg-gradient-to-br from-primary/20 to-transparent rounded-full flex items-center justify-center">
                <span className="text-5xl lg:text-6xl">
                  {cat.id === "casino" ? "🎰" : "⚽"}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Sub Categories */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-3">
        {subCategories.map((cat) => (
          <div
            key={cat.id}
            className="flex items-center gap-3 p-4 rounded-xl bg-card cursor-pointer gaming-card-hover"
          >
            <div className="flex items-center gap-2">
              <span className="text-primary">
                <cat.icon className="w-5 h-5" />
              </span>
              <span className="text-sm font-semibold text-foreground">{cat.title}</span>
            </div>
            <div className="ml-auto w-12 h-12 bg-gradient-to-br from-secondary to-transparent rounded-lg flex items-center justify-center">
              <span className="text-2xl">{cat.emoji}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoryCards;
