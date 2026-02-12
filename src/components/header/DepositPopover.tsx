import * as React from "react";
import { ArrowLeft, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useMediaQuery } from "@/hooks/use-media-query";
import Deposit from "../walet/Deposit";
import { cn } from "@/lib/utils";

type Props = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  trigger: React.ReactNode;
};

const DepositPopover = ({ open, onOpenChange, trigger }: Props) => {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [depositTab, setDepositTab] = React.useState<"crypto" | "fiat">("crypto");
  // 🖥 DESKTOP → CENTER MODAL
  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogTrigger asChild>
          {trigger}
        </DialogTrigger>

        <DialogContent className="max-w-lg w-full p-0 bg-background">

          {/* Header */}
          <div className="relative px-4 pt-4 pb-0">

            {/* Title + Close */}
            <div className="flex items-center justify-center relative pb-3">
              <h2 className="text-lg font-semibold">Deposit</h2>

              {/* <button
                onClick={() => onOpenChange(false)}
                className="absolute right-0 top-0 p-1 rounded-md hover:bg-white/10"
              >
                <X className="w-4 h-4" />
              </button> */}
            </div>

            {/* Tabs */}
            {/* <div className="flex border-b border-white/10">

              <button
                onClick={() => setDepositTab("crypto")}
                className={cn(
                  "flex-1 py-3 text-sm font-medium border-b-2 transition-all",
                  depositTab === "crypto"
                    ? "border-emerald-400 text-white"
                    : "border-transparent text-white/60 hover:text-white"
                )}
              >
                Crypto
              </button>

              <button
                onClick={() => setDepositTab("fiat")}
                className={cn(
                  "flex-1 py-3 text-sm font-medium border-b-2 transition-all",
                  depositTab === "fiat"
                    ? "border-emerald-400 text-white"
                    : "border-transparent text-white/60 hover:text-white"
                )}
              >
                Fiat
              </button>

            </div> */}
          </div>
          {/* Body */}
          <div className=" overflow-y-auto max-h-[80vh]">
            <Deposit variant="page" />
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  // 📱 MOBILE → DRAWER (Right side)
  return (
    <Drawer open={open} onOpenChange={onOpenChange} direction="right">
      <DrawerTrigger asChild>
        {trigger}
      </DrawerTrigger>

      <DrawerContent className="h-full w-full rounded-none">

        {/* Header */}
        <div className="flex items-center gap-3 p-4 border-b">
          <button onClick={() => onOpenChange(false)}>
            <ArrowLeft className="w-5 h-5" />
          </button>
          <span className="font-medium">Deposit</span>
        </div>

        {/* Body */}
        <div className=" overflow-y-auto h-[calc(100vh-64px)]">
          <Deposit variant="drawer" />
        </div>

      </DrawerContent>
    </Drawer>
  );
};

export default DepositPopover;
