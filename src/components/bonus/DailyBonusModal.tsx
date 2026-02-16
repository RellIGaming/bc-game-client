import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface DailyBonusModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onOpenWager: () => void;
}

export function DailyBonusModal({
    open,
    onOpenChange,
    onOpenWager,
}: DailyBonusModalProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-md rounded-lg">
                <DialogHeader >
                    <div className="flex items-center justify-center">
                        <DialogTitle>
                            Daily Bonus Rules
                        </DialogTitle>
                    </div>
                </DialogHeader>

                <div className="text-sm text-muted-foreground">
                    <ul className="list-disc pl-5 space-y-2">
                        <li>Earn extra rewards on every bet, win or lose.</li>

                        <li className="text-[#ffffff]">Daily Bonus = wager × 5% × 1%(HE)</li>

                        <li>The wager amount is updated every 10 minutes.</li>

                        <li>
                            After meeting the wagering requirement, the reward will be available
                            the next day. The bonus amount is calculated daily at UTC 00:00 and
                            distributed at UTC 3:30.
                        </li>

                        <li>
                            You can check wagering contribution details{" "}
                            <button
                                onClick={onOpenWager}
                                className="text-primary underline"
                            >
                                here
                            </button>.
                        </li>
                    </ul>
                </div>

            </DialogContent>
        </Dialog>
    );
}
