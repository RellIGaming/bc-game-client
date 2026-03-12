import { useState } from "react";
import { X, Share2, Copy, ExternalLink, ChevronDown } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import ShareModal from "./ShareModal";
import { cn } from "@/lib/utils";
interface WinItem {
  id: number;
  game: string;
  user: string;
  amount: string;
  currency: string;
  image: string;
}
interface BetSlipModalProps {
  open: boolean;
  onClose: () => void;
  win: WinItem | null;
  onPlayNow?: (game: string) => void;
}
const BetSlipModal = ({ open, onClose, win, onPlayNow }: BetSlipModalProps) => {
  const isMobile = useIsMobile();
  const [shareOpen, setShareOpen] = useState(false);
  const [gameDetailOpen, setGameDetailOpen] = useState(false);

  
  if (!win) return null;
    const betId = `185920618836414${win.id}389`;
  const payout = (Math.random() * 10 + 1).toFixed(4);
  const gameId = "9045334";
  const gameHash = "a4c376b3b4ff87078eead3a84553ab769761349ab8616d0132b6";

  const content = (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <h3 className="font-semibold text-foreground text-center flex-1">Bet Slip</h3>
        {!isMobile && (
          <button onClick={onClose} className="p-1 rounded-full hover:bg-secondary">
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        )}
      </div>
      {/* Body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Profit Card */}
        <div className="bg-secondary rounded-xl p-5 text-center relative">
          <button
            onClick={() => setShareOpen(true)}
            className="absolute top-3 right-3 p-2 rounded-lg hover:bg-card transition-colors"
          >
            <Share2 className="w-4 h-4 text-muted-foreground" />
          </button>
          <p className="text-sm text-muted-foreground mb-1">Profit</p>
          <div className="flex items-center justify-center gap-2 mb-1">
            <span className="text-2xl">💰</span>
            <span className="text-2xl font-bold text-primary">
              {win.amount} {win.currency || "USDC"}
            </span>
          </div>
          <p className="text-muted-foreground text-sm">₹3,797,485.91</p>
          {/* Bet Details */}
          <div className="flex items-center justify-around mt-4 pt-4 border-t border-dashed border-border">
            <div>
              <p className="text-xs text-muted-foreground">Bet Amount</p>
              <p className="font-semibold text-foreground">₹509,872.23</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Payout</p>
              <p className="font-semibold text-foreground">{payout}x</p>
            </div>
          </div>
        </div>
        {/* User & Bet ID */}
        <div className="bg-secondary rounded-xl p-4 space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-lg">
              🐉
            </div>
            <div>
              <p className="text-sm text-foreground font-medium">
                {win.user} On {new Date().toLocaleDateString()}, {new Date().toLocaleTimeString()}
              </p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>Bet ID:</span>
                <span className="text-primary">✅</span>
                <span className="font-mono">{betId}</span>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(betId);
                    toast.success("Bet ID copied!");
                  }}
                >
                  <Copy className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
          {/* Game Info */}
          <div className="flex items-center justify-between bg-card rounded-lg p-3">
            <div className="flex items-center gap-3">
              <img src={win.image} alt={win.game} className="w-12 h-12 rounded-lg object-cover" />
              <div>
                <p className="text-sm font-medium text-foreground">{win.game}</p>
                <p className="text-xs text-muted-foreground">Pragmatic Play</p>
              </div>
            </div>
            <button
              onClick={() => onPlayNow?.(win.game)}
              className="flex items-center gap-1 text-sm text-foreground font-medium hover:text-primary transition-colors"
            >
              Play Now <ExternalLink className="w-3 h-3" />
            </button>
          </div>
        </div>
                {/* Game Detail - Collapsible */}
        <div className="bg-secondary rounded-xl overflow-hidden">
          <button
            onClick={() => setGameDetailOpen(!gameDetailOpen)}
            className="w-full flex items-center justify-between p-4"
          >
            <span className="text-sm font-semibold text-foreground">Game Detail</span>
            <ChevronDown className={cn("w-4 h-4 text-muted-foreground transition-transform", gameDetailOpen && "rotate-180")} />
          </button>
          {gameDetailOpen && (
            <div className="px-4 pb-4 space-y-4">
              {/* Result / Bet / Chance */}
              <div className="flex items-center justify-around">
                <div className="text-center">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                    <span>📊</span> Result
                  </div>
                  <p className="text-lg font-bold text-foreground">2.76x</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                    <span>🎯</span> Bet
                  </div>
                  <p className="text-lg font-bold text-foreground">Multi Bet</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                    <span>🎲</span> Chance
                  </div>
                  <p className="text-lg font-bold text-foreground">-</p>
                </div>
              </div>
              {/* Game ID */}
              <div>
                <p className="text-xs text-muted-foreground mb-1">Game ID</p>
                <div className="bg-card rounded-lg px-3 py-2.5">
                  <p className="text-sm text-foreground font-mono">{gameId}</p>
                </div>
              </div>
              {/* Game Hash */}
              <div>
                <p className="text-xs text-muted-foreground mb-1">Game Hash</p>
                <div className="bg-card rounded-lg px-3 py-2.5">
                  <p className="text-sm text-foreground font-mono break-all">{gameHash}</p>
                </div>
              </div>
            </div>
          )}
      </div>
      {/* Share Modal */}
      <ShareModal
        open={shareOpen}
        onClose={() => setShareOpen(false)}
        gameName={win.game}
        amount={`${win.amount} ${win.currency}`}
      />
    </div>
    </div>
  );
  if (isMobile) {
    return (
      <Sheet open={open} onOpenChange={onClose}>
        <SheetContent side="right" className="w-full sm:max-w-md p-0">
          {content}
        </SheetContent>
      </Sheet>
    );
  }
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-[440px] p-0 gap-0">
        {content}
      </DialogContent>
    </Dialog>
  );
};
export default BetSlipModal;
