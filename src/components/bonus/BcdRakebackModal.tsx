import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface BcdRakebackModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onOpenWager: () => void;
}

export function BcdRakebackModal({
    open,
    onOpenChange,
    onOpenWager,
}: BcdRakebackModalProps) {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const toggleAccordion = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const accordionItems = [
        {
            title: "How to unlock BCD?",
            content:
                "Locked BCD is earned through specific bonuses, such as deposit bonuses and lucky spins Unlocking BCD is simple! It works like rakeback and is gradually unlocked as you place wagersbets. For every bet you place, a portion of your Locked BCD will be released based on this formula",
        },
        {
            title: "What is unlock rate%?",
            content:
                "Unlock rate is determined by your VIP level or promotion. Higher rate means faster BCD unlocking.",
        },
        {
            title: "How to claim BCD?",
            content:
                "Unlocked BCD will automatically move to your available balance. No manual claim required.",
        },
        {
            title: "Can BCD be exchanged to any other currency?",
            content:
                "BCD is equivalent to USD and can be used for betting or withdrawn based on platform rules.",
        },
        {
            title: "What is special about BCD?",
            content:
                "BCD acts like instant rakeback. The more you wager, the more value you unlock over time.",
        },
    ];

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto rounded-xl">
                <DialogHeader>
                    <div className="flex items-center justify-center">
                        <DialogTitle>Rakeback Rules</DialogTitle>
                    </div>
                </DialogHeader>

                {/* Banner */}
                <div className="bg-[#213744] text-white text-center p-3 rounded-lg text-sm font-medium">
                    1 BCD = 1 USD ($)
                </div>

                {/* Accordion Section */}
                <div className="mt-4 border-t pt-4 space-y-2">
                    {accordionItems.map((item, index) => {
                        const isOpen = activeIndex === index;

                        return (
                            <div
                                key={index}
                                className="border rounded-lg overflow-hidden"
                            >
                                <button
                                    onClick={() => toggleAccordion(index)}
                                    className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium bg-card"
                                >
                                    {item.title}

                                    <ChevronDown
                                        className={cn(
                                            "h-5 w-5 transition-transform duration-300 bg-[#1A2C38]",
                                            isOpen && "rotate-180"
                                        )}
                                    />
                                </button>

                                <div
                                    className={cn(
                                        "px-4 text-sm text-muted-foreground transition-all duration-300 overflow-hidden",
                                        isOpen ? "max-h-40 py-3" : "max-h-0"
                                    )}
                                >
                                    {item.content}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </DialogContent>
        </Dialog>
    );
}
