import { useState } from "react";
import { X, ArrowLeft, Mail } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface EmailVerifyModalProps {
  open: boolean;
  onClose: () => void;
}

const EmailVerifyModal = ({ open, onClose }: EmailVerifyModalProps) => {
  const isMobile = useIsMobile();
  const [code, setCode] = useState("");
  const [sent, setSent] = useState(false);

  const handleSendCode = () => {
    setSent(true);
    toast.success("Verification code sent to your email!");
  };

  const handleVerify = () => {
    if (code.length === 6) {
      toast.success("Email verified successfully!");
      onClose();
    } else {
      toast.error("Please enter a valid 6-digit code");
    }
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
        <h3 className="font-semibold text-foreground">Email Verification</h3>
        {!isMobile && (
          <button onClick={onClose} className="p-1 rounded-full hover:bg-secondary">
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        )}
      </div>

      {/* Icon */}
      <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
        <Mail className="w-10 h-10 text-primary" />
      </div>

      {!sent ? (
        <>
          <p className="text-sm text-muted-foreground text-center">
            We'll send a verification code to your registered email address to create your Cwallet account.
          </p>
          <Button
            onClick={handleSendCode}
            className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
          >
            Send Verification Code
          </Button>
        </>
      ) : (
        <>
          <p className="text-sm text-muted-foreground text-center">
            Enter the 6-digit code sent to your email
          </p>
          <input
            type="text"
            maxLength={6}
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
            placeholder="000000"
            className="w-full text-center text-2xl tracking-[0.5em] py-3 bg-secondary rounded-lg border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <Button
            onClick={handleVerify}
            className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
          >
            Verify & Create Account
          </Button>
          <button onClick={handleSendCode} className="text-sm text-primary hover:underline">
            Resend Code
          </button>
        </>
      )}
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
      <DialogContent className="max-w-[400px] p-0 gap-0">
        {content}
      </DialogContent>
    </Dialog>
  );
};

export default EmailVerifyModal;
