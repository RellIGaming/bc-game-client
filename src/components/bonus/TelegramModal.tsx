import { useState } from "react";
import { ArrowLeft, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";
interface TelegramModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}
export function TelegramModal({ open, onOpenChange }: TelegramModalProps) {
  const isMobile = useIsMobile();
  const [step, setStep] = useState<"connect" | "done">("connect");
  const handleConnect = () => {
    window.open("https://t.me/BCGameOfficial", "_blank");
    setStep("done");
  };
  const content = (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 border-b border-border">
        <button onClick={() => onOpenChange(false)}>
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h2 className="font-bold text-lg">Telegram Subscription</h2>
      </div>
      <div className="p-6 space-y-6 flex-1">
        {/* Telegram Icon */}
        <div className="flex justify-center">
          <div className="w-20 h-20 rounded-full bg-[#0088cc]/20 flex items-center justify-center">
            <Send className="w-10 h-10 text-[#0088cc]" />
          </div>
        </div>
        <div className="text-center space-y-2">
          <h3 className="text-xl font-bold">Earn 2 BCD Bonus</h3>
          <p className="text-sm text-muted-foreground">
            Connect your Telegram account and join our official channel to claim daily bonuses!
          </p>
        </div>
        {/* Steps */}
        <div className="space-y-4">
          <div className="flex items-start gap-3 bg-secondary rounded-lg p-4">
            <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold shrink-0">1</div>
            <div>
              <p className="text-sm font-medium">Connect Telegram</p>
              <p className="text-xs text-muted-foreground">Link your Telegram account to verify</p>
            </div>
          </div>
          <div className="flex items-start gap-3 bg-secondary rounded-lg p-4">
            <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold shrink-0">2</div>
            <div>
              <p className="text-sm font-medium">Join Channel</p>
              <p className="text-xs text-muted-foreground">Join our official TG channel</p>
            </div>
          </div>
          <div className="flex items-start gap-3 bg-secondary rounded-lg p-4">
            <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold shrink-0">3</div>
            <div>
              <p className="text-sm font-medium">Claim Bonus</p>
              <p className="text-xs text-muted-foreground">Receive 2 BCD directly to your wallet</p>
            </div>
          </div>
        </div>
        <Button onClick={handleConnect} className="w-full bg-[#0088cc] hover:bg-[#0077b5] text-white">
          <Send className="w-4 h-4 mr-2" />
          Connect Telegram
        </Button>
        {step === "done" && (
          <p className="text-xs text-center text-primary">✓ Telegram opened. Complete the steps to earn your bonus!</p>
        )}
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
      <DialogContent className="max-w-md p-0 [&>button]:hidden">
        {content}
      </DialogContent>
    </Dialog>
  );
}