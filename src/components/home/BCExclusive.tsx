import { originalGames } from "@/lib/game";
import GameCarousel from "./GameCarousel";

const BCExclusive = () => {
  return (
    <GameCarousel
      title="BC Exclusive"
      games={originalGames}
      categoryPath="/category/exclusive"
      labelText="ORIGINAL GAME"
      desktopCount={8}
      tabletCount={6}
      mobileCount={3}
    />
  );
};

export default BCExclusive;
