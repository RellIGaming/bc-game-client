import React from 'react';

interface Game {
  id: number;
  name: string;
  provider: string;
  color: string;
  icon: string;
  players: number;
  multiplier?: string | null;
  category: string;
  image?: string;
}
const categoryTitles: Record<string, string> = {
  "soccer": "Soccer",
  "cricket": "Cricket",
  "tennis": "Tennis",
  "basketball": "Basketball",
  "counter-strike": "Counter-Strike",
  "dota2": "Dota 2",
  "league-of-legends": "League of Legends",
  "volleyball": "Volleyball",
  "table-tennis": "Table Tennis",
  "ice-hockey": "Ice Hockey",
};

const SportsCategory = () => {
    return (
        <div>
            
        </div>
    );
};

export default SportsCategory;