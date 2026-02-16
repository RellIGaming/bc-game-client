import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface VaultProModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function VaultProModal({
  open,
  onOpenChange,
}: VaultProModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md rounded-xl">
        <DialogHeader>
            <div className="flex items-center justify-center">
          <DialogTitle>Vault Pro Rules</DialogTitle>
          </div>
        </DialogHeader>

        <div className="space-y-3 text-sm text-muted-foreground">
          <p className="text-foreground font-medium">
            Place your funds in Vault Pro and enjoy a 5% APR return.
          </p>

          <p>
            Funds placed in Vault Pro can be withdrawn to your wallet at any
            time.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
