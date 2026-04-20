import { X, ShieldCheck, AlertTriangle, ArrowLeft } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";

type Props = { open: boolean; onClose: () => void };

const Content = ({ onClose, isMobile }: { onClose: () => void; isMobile: boolean }) => (
  <div className="p-6 space-y-6">
    {isMobile && (
      <div className="flex items-center gap-3 mb-2">
        <button onClick={onClose}><ArrowLeft className="w-5 h-5" /></button>
        <h3 className="font-semibold text-lg">Trust & Compensation</h3>
      </div>
    )}
    {!isMobile && (
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-10 h-10 text-primary" />
          <h3 className="font-bold text-xl">Trust & Compensation</h3>
        </div>
        <button onClick={onClose}><X className="w-5 h-5 text-muted-foreground" /></button>
      </div>
    )}
    <div className="space-y-4">
      <div className="flex items-start gap-3">
        <span className="text-primary text-xl mt-0.5">✅</span>
        <div>
          <p className="font-semibold text-foreground">Dual Guarantee:</p>
          <p className="text-sm text-muted-foreground">Still waiting after 30 minutes? We'll Reward you with delay bonus after your deposit is successfully arrived - no questions asked.</p>
        </div>
      </div>
      <div className="flex items-start gap-3">
        <span className="text-primary text-xl mt-0.5">✅</span>
        <div>
          <p className="font-semibold text-foreground">7-Day Full Guarantee:</p>
          <p className="text-sm text-muted-foreground">If your deposit hasn't arrived within 7 days of submission, the system will automatically issue full compensation.</p>
        </div>
      </div>
      <div className="flex items-start gap-3 bg-primary/10 rounded-lg p-3">
        <AlertTriangle className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
        <p className="text-sm text-muted-foreground">Compensation is only available to users who have completed KYC verification and passed KYC-time system checks.</p>
      </div>
    </div>
  </div>
);

const DepositProgressModal=({ open, onClose }: Props)=> {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <Sheet open={open} onOpenChange={onClose}>
        <SheetContent side="right" className="w-full sm:max-w-md p-0">
          <Content onClose={onClose} isMobile />
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg p-0">
        <Content onClose={onClose} isMobile={false} />
      </DialogContent>
    </Dialog>
  );
}

export default DepositProgressModal;