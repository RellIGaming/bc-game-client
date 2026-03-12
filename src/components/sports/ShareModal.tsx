import { X, Copy } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";
import { toast } from "sonner";
interface ShareModalProps {
  open: boolean;
  onClose: () => void;
  gameName: string;
  amount: string;
}
const socialLinks = [
  { name: "Facebook", icon: "🔵", color: "bg-blue-600" },
  { name: "X", icon: "✖", color: "bg-black" },
  { name: "Telegram", icon: "✈️", color: "bg-blue-500" },
  { name: "VK", icon: "VK", color: "bg-blue-700" },
  { name: "LINE", icon: "💬", color: "bg-green-500" },
  { name: "Skype", icon: "📞", color: "bg-blue-400" },
  { name: "OK", icon: "OK", color: "bg-orange-500" },
  { name: "LinkedIn", icon: "in", color: "bg-blue-700" },
  { name: "WhatsApp", icon: "📱", color: "bg-green-600" },
];
const ShareModal = ({ open, onClose, gameName, amount }: ShareModalProps) => {
  const isMobile = useIsMobile();
  const shareUrl = `https://rellbet.com/share/bet/${Date.now()}`;
  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    toast.success("Link copied to clipboard!");
  };
  const handleShare = (platform: string) => {
    const text = encodeURIComponent(`Winning tastes sweet! ${gameName} - Won ${amount}!`);
    const url = encodeURIComponent(shareUrl);
    let shareLink = "";
    switch (platform) {
      case "Facebook": shareLink = `https://www.facebook.com/sharer/sharer.php?u=${url}`; break;
      case "X": shareLink = `https://twitter.com/intent/tweet?text=${text}&url=${url}`; break;
      case "Telegram": shareLink = `https://t.me/share/url?url=${url}&text=${text}`; break;
      case "WhatsApp": shareLink = `https://wa.me/?text=${text}%20${url}`; break;
      case "LinkedIn": shareLink = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`; break;
      default: shareLink = `https://www.google.com/search?q=${text}`;
    }
    window.open(shareLink, "_blank");
  };
  const content = (
    <div className="p-5 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-3xl">👑</span>
          <div>
            <p className="font-semibold text-foreground">Winning tastes sweet!</p>
            <p className="text-sm text-muted-foreground">{gameName} Wow Moment</p>
          </div>
        </div>
        <button onClick={onClose} className="p-1 rounded-full hover:bg-secondary">
          <X className="w-5 h-5 text-muted-foreground" />
        </button>
      </div>
      {/* Social Grid */}
      <div className="bg-secondary rounded-xl p-4">
        <p className="text-sm font-medium text-foreground text-center mb-4">Share on social media</p>
        <div className="grid grid-cols-5 gap-3 justify-items-center">
          {socialLinks.map((social) => (
            <button
              key={social.name}
              onClick={() => handleShare(social.name)}
              className={`w-11 h-11 rounded-full ${social.color} flex items-center justify-center text-white text-sm font-bold hover:opacity-80 transition-opacity`}
            >
              {social.icon}
            </button>
          ))}
        </div>
      </div>
      {/* Copy Link */}
      <button
        onClick={handleCopyLink}
        className="w-full py-3 bg-secondary rounded-xl text-foreground font-semibold text-sm hover:bg-secondary/80 transition-colors flex items-center justify-center gap-2"
      >
        <Copy className="w-4 h-4" />
        Copy link
      </button>
    </div>
  );
  if (isMobile) {
    return (
      <Sheet open={open} onOpenChange={onClose}>
        <SheetContent side="right" className="w-full sm:max-w-sm p-0">
          {content}
        </SheetContent>
      </Sheet>
    );
  }
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-[400px] p-0 gap-0">
        {content}
      </DialogContent>
    </Dialog>
  );
};
export default ShareModal;
