import { Play } from "lucide-react";


interface Game {
  _id: string; // ✅ instead of id
  name: string;
  image: string;
  multiplier?: string | null;
  players?: number;
  provider?: string;
  label?: string;
}

interface GameCardProps {
  game: Game;
  onClick?: () => void;
  showLabel?: boolean;
  labelText?: string;
}

const GameCard = ({ game, onClick, showLabel = true, labelText = "ORIGINAL GAME" }: GameCardProps) => {
  return (
    <div 
      onClick={onClick}
      className="b-radius overflow-hidden cursor-pointer group gaming-card-hover relative"
    >
      <div className="aspect-[3/4] relative">
        <img
          src={game.image}
          alt={game.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Multiplier Badge */}
        {game.multiplier && (
          <div className="absolute top-1.5 left-1.5 bg-primary/90 text-primary-foreground text-[8px] sm:text-[10px] font-bold px-1 sm:px-1.5 py-0.5 rounded">
            {game.multiplier}
          </div>
        )}

        {/* Players Badge */}
        {game.players && (
          <div className="absolute top-1.5 right-1.5 flex items-center gap-0.5 sm:gap-1 text-[8px] sm:text-[10px] text-white/80 bg-black/40 px-1 sm:px-1.5 py-0.5 rounded">
            <span>👥</span>
            <span>{game.players}</span>
          </div>
        )}

        {/* Bottom Info */}
        <div className="absolute bottom-0 left-0 right-0 p-1.5 sm:p-2 text-center">
          {showLabel && labelText && (
            <span className="text-[6px] sm:text-[8px] text-primary font-medium block">
              {labelText}
            </span>
          )}
          <h3 className="text-white font-bold text-[10px] sm:text-xs truncate">
            {game.name}
          </h3>
          {game.provider && (
            <p className="text-[8px] sm:text-[10px] text-white/60 truncate">
              {game.provider}
            </p>
          )}
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <span className="bg-primary text-primary-foreground px-2 sm:px-3 py-1 sm:py-1.5 b-radius font-medium text-[10px] sm:text-xs flex items-center gap-1">
            <Play className="w-3 h-3" />
            Play Now
          </span>
        </div>
      </div>
    </div>
  );
};

export default GameCard;
