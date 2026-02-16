import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface WagerContributionModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

const wagerList = [
    {
        provider: "1Spin4Win",
        games: [
            "10 Lucky Spins (70%)",
            "All Ways Egypt (70%)",
            "Allways Egypt Fortune (100%)",
        ],
    },
    {
        provider: "7Mojos",
        games: [
            "Golden Vegas 3x3 (100%)",
            "Lucky Slots 777 (80%)",
        ],
    },
];

export function WagerContributionModal({
    open,
    onOpenChange,
}: WagerContributionModalProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-lg max-h-[80vh] overflow-y-auto rounded-lg">
                <DialogHeader>
                    <div className="flex items-center justify-center">
                        <DialogTitle>Wager Contribution</DialogTitle>
                    </div>
                </DialogHeader>

                <div className="text-xs text-muted-foreground space-y-3">
                    <p className="font-medium text-foreground">
                        Wager Contribution for Bonus Balance Details
                    </p>

                    {wagerList.map((section) => (
                        <div key={section.provider}>
                            <p className="font-semibold mt-3">{section.provider}:</p>
                            {section.games.map((game, index) => (
                                <p key={index}>{game}</p>
                            ))}
                        </div>
                    ))}
                </div>
            </DialogContent>
        </Dialog>
    );
}
