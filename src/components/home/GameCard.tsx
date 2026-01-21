import React from 'react';
import card2 from "@/assets/images/card-2.png";
import card3 from "@/assets/images/card-3.png";
import card4 from "@/assets/images/card-4.png";
import card5 from "@/assets/images/card-5.png";
import card6 from "@/assets/images/card-6.png";
import card7 from "@/assets/images/card-7.png";
import card8 from "@/assets/images/card-8.png";
import card9 from "@/assets/images/card-9.png";
import { useState } from "react";

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
const GameCard = ({ game }: { game: any }) => {
    return (
        <div className="rounded-xl overflow-hidden cursor-pointer group relative">
            <div className="aspect-[3/4] relative">
                <img
                    src={game.image}
                    alt={game.name}
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-2 text-center">
                    <span className="text-[8px] text-primary font-medium">
                        ORIGINAL GAME
                    </span>
                    <h3 className="text-white font-bold text-xs truncate">
                        {game.name}
                    </h3>
                </div>
            </div>
        </div>
    );
};

export default GameCard;