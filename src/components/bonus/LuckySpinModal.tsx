import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface LuckySpinModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function LuckySpinModal({
  open,
  onOpenChange,
}: LuckySpinModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md rounded-xl">
        <DialogHeader>
             <div className="flex items-center justify-center">
          <DialogTitle>Lucky Spin Rules</DialogTitle>
          </div>
        </DialogHeader>

        <div className="space-y-4 text-sm text-muted-foreground">
          <p className="text-foreground font-medium">
            You can earn Lucky Spin chances through two ways:
          </p>

          {/* Level Up Reward */}
          <div className="space-y-1">
            <p className="font-semibold text-foreground">
              Level-Up Reward
            </p>
            <p>
              Starting from VIP Level 8, each level-up automatically grants
              1 Lucky Spin chance.
            </p>
          </div>

          {/* Daily Wagering Reward */}
          <div className="space-y-1">
            <p className="font-semibold text-foreground">
              Daily Wagering Reward
            </p>
            <p>
              From VIP Level 2 onwards, reaching the required daily wagering
              amount for your VIP level grants 1 Lucky Spin chance.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
