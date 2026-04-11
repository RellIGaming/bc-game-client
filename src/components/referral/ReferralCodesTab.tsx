import { useState } from "react";
import { Copy, ChevronRight, X, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";
import { toast } from "sonner";

const sampleCodes = [
  { name: "--", code: "47fsv73u0", link: "https://relbet.game/i-47fsv73u0-n/", rate: "25%", date: "2025-12-12 19:19:26", referrals: 0 },
];

export default function ReferralCodesTab({ referralDashboard }: { referralDashboard: any }) {
  const [createOpen, setCreateOpen] = useState(false);
  const [campaignName, setCampaignName] = useState("");
  const isMobile = useIsMobile();

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  const CreateCodeContent = ({ onClose }: { onClose: () => void }) => (
    <div className="flex flex-col">
      {isMobile ? (
        <div className="flex items-center gap-3 p-4 border-b border-border">
          <button onClick={onClose}><ArrowLeft className="w-5 h-5" /></button>
          <h3 className="font-bold">Create Code</h3>
        </div>
      ) : (
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h3 className="font-bold">Create Code</h3>
          <button onClick={onClose}><X className="w-5 h-5 text-muted-foreground" /></button>
        </div>
      )}
      <div className="p-5 space-y-4">
        <div>
          <label className="text-sm text-muted-foreground mb-2 block">Campaign Name (Optional)</label>
          <input
            value={campaignName}
            onChange={(e) => setCampaignName(e.target.value)}
            placeholder="Enter Campaign Name"
            className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-sm outline-none focus:border-primary transition-colors"
          />
        </div>
        <Button className="w-full bg-primary text-primary-foreground py-6 text-base font-semibold" onClick={() => { toast.success("Campaign created!"); onClose(); }}>
          Create campaign
        </Button>
      </div>
    </div>
  );

  return (
    <div className="space-y-4">
      {/* Summary */}
      <div className="bg-card rounded-xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex gap-12">
          <div>
            <p className="text-xs text-muted-foreground mb-1">Referral Code Created</p>
            <p className="text-3xl font-bold">1<span className="text-muted-foreground text-lg">/20</span></p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">Friends</p>
            <p className="text-3xl font-bold">0</p>
          </div>
        </div>
        <Button className="bg-primary text-primary-foreground px-8 py-5 text-base font-semibold" onClick={() => setCreateOpen(true)}>
          Create Code
        </Button>
      </div>

      {/* Table */}
      <div className="bg-card rounded-xl overflow-x-auto">
        <div className="min-w-[700px]">
          <div className="grid grid-cols-6 text-xs text-muted-foreground px-4 py-3 border-b border-border">
            <span>Name</span>
            <span>Code</span>
            <span>Link</span>
            <span>Commission Rate</span>
            <span>Date Created</span>
            <span className="text-right">Referrals</span>
          </div>

          {sampleCodes.map((c, i) => (
            <div key={i} className="grid grid-cols-6 px-4 py-3.5 border-b border-border text-sm items-center">
              <span className="text-muted-foreground">{c.name}</span>
              <span className="flex items-center gap-1.5">
                {c.code}
                <button onClick={() => handleCopy(c.code)} className="text-muted-foreground hover:text-foreground">
                  <Copy className="w-3.5 h-3.5" />
                </button>
              </span>
              <span className="flex items-center gap-1.5 text-xs truncate">
                {c.link}
                <button onClick={() => handleCopy(c.link)} className="text-muted-foreground hover:text-foreground flex-shrink-0">
                  <Copy className="w-3.5 h-3.5" />
                </button>
              </span>
              <span>{c.rate}</span>
              <span className="text-muted-foreground text-xs">{c.date}</span>
              <span className="text-right flex items-center justify-end gap-1">
                {c.referrals} <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Create Code Modal */}
      {isMobile ? (
        <Sheet open={createOpen} onOpenChange={setCreateOpen}>
          <SheetContent side="right" className="w-full sm:max-w-md p-0">
            <CreateCodeContent onClose={() => setCreateOpen(false)} />
          </SheetContent>
        </Sheet>
      ) : (
        <Dialog open={createOpen} onOpenChange={setCreateOpen}>
          <DialogContent className="max-w-md p-0">
            <CreateCodeContent onClose={() => setCreateOpen(false)} />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
