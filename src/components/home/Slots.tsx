import card2 from "@/assets/images/card-2.png";
import card3 from "@/assets/images/card-3.png";
import card4 from "@/assets/images/card-4.png";
import card5 from "@/assets/images/card-5.png";
import card6 from "@/assets/images/card-6.png";
import card7 from "@/assets/images/card-7.png";
import card8 from "@/assets/images/card-8.png";
import card9 from "@/assets/images/card-9.png";
import GameCarousel from "./GameCarousel";

const games = [
  { id: 1, name: "CRASH", multiplier: "999x", players: 2304, image: card7 },
  { id: 2, name: "LIMBO", multiplier: "500×", players: 218, image: card6 },
  { id: 3, name: "PLINKO", multiplier: "2×160", players: 2543, image: card4 },
  { id: 4, name: "TWIST", multiplier: "12×254", players: 77, image: card5 },
  { id: 5, name: "TOWER LEGEND", multiplier: null, players: 350, image: card8 },
  { id: 6, name: "CLASSIC DICE", multiplier: null, players: 200, image: card3 },
  { id: 7, name: "KENO", multiplier: "12", players: 510, image: card2 },
  { id: 8, name: "MINES", multiplier: "163", players: 863, image: card9 },
];

const Slots = () => {
  return (
    <GameCarousel
      title="Slots"
      games={games}
      categoryPath="/category/slots"
      labelText="SLOT GAME"
      desktopCount={8}
      tabletCount={6}
      mobileCount={3}
    />
  );
};

export default Slots;
