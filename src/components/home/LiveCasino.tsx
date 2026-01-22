
import { originalGames } from "@/lib/game";
import GameCarousel from "./GameCarousel";


const LiveCasino = () => {
  return (
    <GameCarousel
      title="Live Casino"
     games={originalGames}
      categoryPath="/category/live-casino"
      labelText=""
      showLabel={false}
      desktopCount={8}
      tabletCount={6}
      mobileCount={3}
    />
  );
};

export default LiveCasino;
