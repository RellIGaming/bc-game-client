
import GameCarousel from "./GameCarousel";
import { useEffect, useState } from "react";
import { getGames } from "@/services/api";

const Slots = () => {
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
