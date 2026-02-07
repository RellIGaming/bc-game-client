import { X } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import Deposit from "../walet/Deposit";
import { useMediaQuery } from "@/hooks/use-media-query";

type Props = {
  open: boolean;
  onClose: () => void;
};

const DepositModal = ({ open, onClose }: Props) => {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (!isDesktop) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        className="
          p-0
          max-w-[520px]
          h-[80vh]
          flex
          flex-col
        "
      >
        {/* HEADER */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-4 py-3 border-b bg-background">
          <h3 className="font-medium">Deposit</h3>
          <button onClick={onClose}>
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {/* BODY (SCROLLS) */}
        <div className="flex-1 overflow-y-auto px-4 py-3">
          <Deposit variant="modal" />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DepositModal;
