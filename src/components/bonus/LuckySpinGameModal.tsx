import { useState, useRef } from "react";
import { ArrowLeft, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";
interface LuckySpinGameModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}
const prizes = [
  { label: "0.1 USDT", color: "#2d7a3a" },
  { label: "50 USDT", color: "#1a5c28" },
  { label: "BTC", color: "#2d7a3a" },
  { label: "x10", color: "#1a5c28" },
  { label: "XP Booster", color: "#2d7a3a" },
  { label: "Free Spin", color: "#1a5c28" },
  { label: "USDT 5", color: "#2d7a3a" },
  { label: "Free Spin 10", color: "#1a5c28" },
  { label: "LUCK WIN", color: "#2d7a3a" },
  { label: "0.5 USDT", color: "#1a5c28" },
];
export function LuckySpinGameModal({ open, onOpenChange }: LuckySpinGameModalProps) {
  const isMobile = useIsMobile();
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [result, setResult] = useState<string | null>(null);
  const handleSpin = () => {
    if (spinning) return;
    setSpinning(true);
    setResult(null);
    const extraSpins = 5 * 360;
    const randomAngle = Math.floor(Math.random() * 360);
    const totalRotation = rotation + extraSpins + randomAngle;
    setRotation(totalRotation);
    setTimeout(() => {
      const finalAngle = totalRotation % 360;
      const segmentAngle = 360 / prizes.length;
      const index = Math.floor((360 - finalAngle + segmentAngle / 2) % 360 / segmentAngle);
      setResult(prizes[index % prizes.length].label);
      setSpinning(false);
    }, 4000);
  };
  const content = (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-4 border-b border-border">
        <button onClick={() => onOpenChange(false)}>
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h2 className="font-bold text-lg">Lucky Spin</h2>
        <Settings className="w-5 h-5 text-muted-foreground" />
      </div>
      <div className="p-4 space-y-4 flex-1 overflow-y-auto">
        {/* Tier badges */}
        <div className="flex items-center gap-2 justify-center">
          <div className="flex gap-1">
            {["🎰", "🎲", "🃏", "🎯"].map((e, i) => (
              <span key={i} className="text-2xl">{e}</span>
            ))}
          </div>
          <div className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-bold">
            Bronze — LV 2 or Above
          </div>
        </div>
        <p className="text-center text-xs text-primary underline cursor-pointer">Bonus Details</p>
        {/* Spin Wheel */}
        <div className="relative mx-auto w-[280px] h-[280px] sm:w-[320px] sm:h-[320px]">
          {/* Outer ring with dots */}
          <div className="absolute inset-0 rounded-full border-4 border-primary/30" />
          
          {/* Wheel */}
          <svg
            viewBox="0 0 300 300"
            className="w-full h-full"
            style={{
              transform: `rotate(${rotation}deg)`,
              transition: spinning ? "transform 4s cubic-bezier(0.17, 0.67, 0.12, 0.99)" : "none",
            }}
          >
            {prizes.map((prize, i) => {
              const angle = (360 / prizes.length) * i;
              const startAngle = (angle - 90) * (Math.PI / 180);
              const endAngle = (angle + 360 / prizes.length - 90) * (Math.PI / 180);
              const x1 = 150 + 140 * Math.cos(startAngle);
              const y1 = 150 + 140 * Math.sin(startAngle);
              const x2 = 150 + 140 * Math.cos(endAngle);
              const y2 = 150 + 140 * Math.sin(endAngle);
              const largeArc = 360 / prizes.length > 180 ? 1 : 0;
              const midAngle = (angle + 360 / prizes.length / 2 - 90) * (Math.PI / 180);
              const textX = 150 + 90 * Math.cos(midAngle);
              const textY = 150 + 90 * Math.sin(midAngle);
              const textRotation = angle + 360 / prizes.length / 2;
              return (
                <g key={i}>
                  <path
                    d={`M150,150 L${x1},${y1} A140,140 0 ${largeArc},1 ${x2},${y2} Z`}
                    fill={prize.color}
                    stroke="#0d3320"
                    strokeWidth="1"
                  />
                  <text
                    x={textX}
                    y={textY}
                    fill="white"
                    fontSize="10"
                    fontWeight="bold"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    transform={`rotate(${textRotation}, ${textX}, ${textY})`}
                  >
                    {prize.label}
                  </text>
                </g>
              );
            })}
            {/* Center circle */}
            <circle cx="150" cy="150" r="35" fill="#1a5c28" stroke="#ffd700" strokeWidth="3" />
            <text x="150" y="145" fill="#ffd700" fontSize="9" fontWeight="bold" textAnchor="middle">LUCK</text>
            <text x="150" y="160" fill="#ffd700" fontSize="9" fontWeight="bold" textAnchor="middle">WIN</text>
          </svg>
          {/* Pointer */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 z-10">
            <div className="w-0 h-0 border-l-[12px] border-r-[12px] border-t-[20px] border-l-transparent border-r-transparent border-t-primary" />
          </div>
        </div>
        {/* Spin Button */}
        <div className="text-center">
          <Button
            onClick={handleSpin}
            disabled={spinning}
            className="bg-primary text-primary-foreground font-bold px-8 py-3 text-lg"
          >
            {spinning ? "Spinning..." : "🎰 SPIN NOW"}
          </Button>
        </div>
        {result && (
          <div className="text-center bg-primary/20 rounded-lg p-3">
            <p className="text-primary font-bold">🎉 You won: {result}!</p>
          </div>
        )}
        <p className="text-center text-sm text-muted-foreground">Available at: VIP 2</p>
        {/* Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-secondary rounded-lg p-3 text-center">
            <p className="text-xs text-muted-foreground">SPIN BONUS TOTAL</p>
            <p className="text-primary font-bold">₹2,254,365.27K</p>
          </div>
          <div className="bg-secondary rounded-lg p-3 text-center flex items-center justify-center gap-2">
            <span className="text-lg">👤</span>
            <div className="text-left">
              <p className="text-xs text-muted-foreground">ionvaleriu28</p>
              <p className="text-primary text-sm font-medium">Win: ₹181.43</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  if (isMobile) {
    return (
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent side="right" className="p-0 w-full sm:max-w-md [&>button]:hidden">
          {content}
        </SheetContent>
      </Sheet>
    );
  }
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md p-0 max-h-[90vh] overflow-y-auto [&>button]:hidden">
        {content}
      </DialogContent>
    </Dialog>
  );
}