import { originalGames } from "@/lib/game";
import GameCarousel from "./GameCarousel";

const BingoGames = () => {
  return (
    <GameCarousel
      title="Bingo Games"
      games={originalGames}
      categoryPath="/category/bingoGames"
      labelText="ORIGINAL GAME"
      desktopCount={8}
      tabletCount={6}
      mobileCount={3}
    />
  );
};

export default BingoGames;
