import { TabType } from '@/types/sports';
import { cn } from '@/lib/utils';
import { LayoutGrid, Zap, List } from 'lucide-react';

interface SportsTabsProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const tabs: { id: TabType; label: string; icon: React.ReactNode }[] = [
  { id: 'highlights', label: 'HIGHLIGHTS', icon: <LayoutGrid className="w-4 h-4" /> },
  { id: 'event-builder', label: 'EVENT BUILDER', icon: <Zap className="w-4 h-4" /> },
  { id: 'bets-feed', label: 'BETS FEED', icon: <List className="w-4 h-4" /> },
];

export function SportsTabs({ activeTab, onTabChange }: SportsTabsProps) {
  return (
    <div className="flex items-center gap-1 p-1 bg-secondary rounded-lg">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={cn(
            'flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200',
            activeTab === tab.id
              ? 'bg-primary text-primary-foreground'
              : 'text-muted-foreground hover:text-foreground hover:bg-muted'
          )}
        >
          {tab.icon}
          <span className="hidden sm:inline">{tab.label}</span>
        </button>
      ))}
    </div>
  );
}
