import { originalGames } from "@/lib/game";
import GameCarousel from "./GameCarousel";

const HotGames = () => {
  return (
    <GameCarousel
      title="Hot Games"
      games={originalGames}
      categoryPath="/category/hotGames"
      labelText="ORIGINAL GAME"
      desktopCount={8}
      tabletCount={6}
      mobileCount={3}
    />
  );
};

export default HotGames;
