import { X, ArrowLeft } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";

type Props = { open: boolean; onClose: () => void };

const steps = [
  {
    title: "Step 1: Select a Cryptocurrency",
    desc: "In the deposit pop-up window, choose the crypto you want to deposit (e.g., BTC, ETH, USDT).",
  },
  {
    title: "Step 2: Choose the Network",
    desc: "For tokens like USDT, you'll need to select the correct network (e.g., ERC20, TRC20, BEP20).\nNote: Make sure the network you choose matches the one used in your external wallet or exchange.",
  },
  {
    title: "Step 3: Copy the Deposit Address or Scan the QR Code",
    desc: "You'll see a unique deposit address generated for your account.\nClick \"Copy Address\" or scan the QR code with your wallet app.",
  },
  {
    title: "Step 4: Send Crypto from Your External Wallet",
    desc: "Choose the same network selected when copying the \"Deposit address\", and paste the copied address into your external wallet when sending or withdrawing cryptos there.",
  },
  {
    title: "Step 5: Wait for Blockchain Confirmation",
    desc: "Deposits will be credited after the required number of blockchain confirmations.\nNote: Most transactions are processed within a few minutes, but this can vary.",
  },
  {
    title: "Step 6: Check Your Wallet Balance",
    desc: "Once the transaction succeeded, the funds will appear in your wallet automatically — ready to play!",
  },
];

const Content = ({ onClose, isMobile }: { onClose: () => void; isMobile: boolean }) => (
  <div className="p-5 space-y-5 max-h-[80vh] overflow-y-auto">
    {isMobile ? (
      <div className="flex items-center gap-3 mb-2">
        <button onClick={onClose}><ArrowLeft className="w-5 h-5" /></button>
        <h3 className="font-semibold text-lg">How to Deposit Crypto</h3>
      </div>
    ) : (
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-lg">How to Deposit Crypto</h3>
        <button onClick={onClose}><X className="w-5 h-5 text-muted-foreground" /></button>
      </div>
    )}
    <div className="space-y-6">
      {steps.map((step, i) => (
        <div key={i} className="space-y-2">
          <h4 className="font-semibold text-foreground">{step.title}</h4>
          <p className="text-sm text-muted-foreground whitespace-pre-line">{step.desc}</p>
        </div>
      ))}
    </div>
  </div>
);

export default function HowToDepositModal({ open, onClose }: Props) {
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
