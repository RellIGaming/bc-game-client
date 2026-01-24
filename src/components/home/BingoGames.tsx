import { originalGames } from "@/lib/game";
import GameCarousel from "./GameCarousel";
import { useEffect, useState } from "react";
import { getGames } from "@/services/api";

const BingoGames = () => {
  const [games, setGames] = useState([]);
  
    useEffect(() => {
      const loadGames = async () => {
        try {
          const data = await getGames("originals");
          setGames(data);
        } catch (err) {
          console.error("Failed to load games", err);
        }
      };
       loadGames();
    }, []);
  return (
    <GameCarousel
      title="Bingo Games"
      games={games}
      categoryPath="/category/bingoGames"
      labelText="ORIGINAL GAME"
      desktopCount={8}
      tabletCount={6}
      mobileCount={3}
    />
  );
};

export default BingoGames;
