import { originalGames } from "@/lib/game";
import GameCarousel from "./GameCarousel";

const BCOriginals = () => {
  return (
    <GameCarousel
      title="BC Originals"
      games={originalGames}
      categoryPath="/category/originals"
      labelText="ORIGINAL GAME"
      desktopCount={8}
      tabletCount={6}
      mobileCount={3}
    />
  );
};

export default BCOriginals;
