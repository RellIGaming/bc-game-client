import * as React from "react";
import { X, ArrowLeft } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import Deposit from "../walet/Deposit";
import { useMediaQuery } from '@/hooks/use-media-query';

type DepositModalProps = {
  open: boolean;
  onClose: () => void;
};

const DepositModal = ({ open, onClose }: DepositModalProps) => {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  // 🖥 Desktop → Modal
  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent
          className="
    w-full
    max-w-[520px]
    p-0
    overflow-hidden
    bg-background
  "
        >
          <Deposit variant="modal" />
        </DialogContent>

      </Dialog>
    );
  }

  // 📱 Mobile → Right Drawer
  return (
    <Drawer open={open} onOpenChange={onClose} direction="right">
      <DrawerContent className="h-full w-full max-w-full rounded-none">
        {/* Header */}
        <div className="flex items-center gap-3 p-4 border-b">
          <button onClick={onClose}>
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h3 className="font-medium">Deposit</h3>
        </div>

        {/* Body */}
        <div className="p-4 overflow-y-auto h-[calc(100vh-64px)]">
          <Deposit variant="modal" />
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default DepositModal;
