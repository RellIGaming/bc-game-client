import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

const banners = [
  { size: "728 × 90", label: "Leaderboard" },
  { size: "300 × 250", label: "Medium Rectangle" },
  { size: "160 × 600", label: "Wide Skyscraper" },
  { size: "320 × 50", label: "Mobile Banner" },
  { size: "970 × 90", label: "Large Leaderboard" },
  { size: "468 × 60", label: "Full Banner" },
];

export default function DownloadBannersTab() {
  return (
    <div className="space-y-4">
      <div className="bg-card rounded-xl p-5">
        <h3 className="font-bold text-lg mb-4">Download Banners</h3>
        <p className="text-sm text-muted-foreground mb-6">
          Use these banners to promote your referral link on your website, blog, or social media.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {banners.map((b, i) => (
            <div key={i} className="bg-secondary rounded-xl p-4 space-y-3">
              <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg flex items-center justify-center border border-border">
                <span className="text-xs text-muted-foreground">{b.size}</span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">{b.label}</p>
                  <p className="text-xs text-muted-foreground">{b.size} px</p>
                </div>
                <Button size="sm" variant="outline" className="gap-1.5">
                  <Download className="w-3.5 h-3.5" /> Download
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
