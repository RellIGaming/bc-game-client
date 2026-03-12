import { useState } from "react";
import { X, ArrowLeft } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import EmailVerifyModal from "./EmailVerifyModal";

interface CWalletModalProps {
  open: boolean;
  onClose: () => void;
}

const CWalletModal = ({ open, onClose }: CWalletModalProps) => {
  const isMobile = useIsMobile();
  const [emailVerifyOpen, setEmailVerifyOpen] = useState(false);

  const handleCreateNew = () => {
    setEmailVerifyOpen(true);
  };

  const handleConnectExisting = () => {
    window.open("https://cwallet.com", "_blank");
  };

  const content = (
    <div className="flex flex-col items-center p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between w-full">
        {isMobile ? (
          <button onClick={onClose} className="p-1">
            <ArrowLeft className="w-5 h-5 text-muted-foreground" />
          </button>
        ) : <div />}
        <div />
        {!isMobile && (
          <button onClick={onClose} className="p-1 rounded-full hover:bg-secondary">
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        )}
      </div>

      {/* Logos */}
      <div className="flex items-center gap-3">
        <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-xl">
          R
        </div>
        <div className="flex items-center gap-1 text-muted-foreground">
          <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground" />
          <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground" />
          <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground" />
        </div>
        <div className="w-14 h-14 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-xl">
          C
        </div>
      </div>

      {/* Email */}
      <p className="text-primary text-sm">user@gmail.com</p>

      {/* Description */}
      <div className="text-center space-y-2">
        <p className="text-sm text-muted-foreground">
          You are authorizing the use of your Rellbet account to register and connect to Cwallet.
        </p>
        <p className="text-xs text-muted-foreground">
          Authorize Cwallet to sync Rellbet account information
        </p>
      </div>

      {/* Actions */}
      <div className="w-full space-y-3">
        <Button
          onClick={handleCreateNew}
          className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
        >
          Create New Cwallet Account
        </Button>

        <p className="text-center text-sm text-muted-foreground">Or</p>

        <Button
          onClick={handleConnectExisting}
          variant="outline"
          className="w-full h-12 border-border hover:bg-secondary font-semibold"
        >
          Connect to Existing Cwallet Account
        </Button>
      </div>

      <EmailVerifyModal open={emailVerifyOpen} onClose={() => setEmailVerifyOpen(false)} />
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
      <DialogContent className="max-w-[420px] p-0 gap-0 [&>button]:hidden">
        {content}
      </DialogContent>
    </Dialog>
  );
};

export default CWalletModal;
