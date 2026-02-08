import * as React from "react";
import { ArrowLeft } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useMediaQuery } from "@/hooks/use-media-query";
import Deposit from "../walet/Deposit";

type Props = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  trigger: React.ReactNode;
};

const DepositPopover = ({ open, onOpenChange, trigger }: Props) => {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  // 🖥 Desktop → Popover
  if (isDesktop) {
    return (
      <Popover open={open} onOpenChange={onOpenChange}>
        <PopoverTrigger asChild>
          {trigger}
        </PopoverTrigger>

        <PopoverContent
          align="end"
          side="bottom"
          sideOffset={8}
          className="w-[420px] p-0 shadow-xl border bg-background"
        >
          <Deposit variant="modal" />
        </PopoverContent>

      </Popover>
    );
  }

  // 📱 Mobile → Drawer
  return (
    <Drawer open={open} onOpenChange={onOpenChange} direction="right">
      {/* ✅ THIS WAS MISSING */}
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
        <div className="lg:p-4 overflow-y-auto h-[calc(100vh-64px)]">
          <Deposit variant="modal" />
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default DepositPopover;
