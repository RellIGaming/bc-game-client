import { useState, useRef, useEffect } from 'react';
import { SportCategory, TimeFilter } from '@/types/sports';
import { cn } from '@/lib/utils';
import { ChevronDown, Check } from 'lucide-react';
import { sportCategories } from '@/lib/sportsData';

interface SportCategoryFilterProps {
  selectedSport: SportCategory;
  onSportChange: (sport: SportCategory) => void;
  selectedTime: TimeFilter;
  onTimeChange: (time: TimeFilter) => void;
  showTimeFilter?: boolean;
}

const timeFilters: { id: TimeFilter; label: string; count: number }[] = [
  { id: '3h', label: '3h', count: 2 },
  { id: '24h', label: '24h', count: 216 },
  { id: '48h', label: '48h', count: 532 },
  { id: 'all', label: 'All', count: 899 },
];

export function SportCategoryFilter({
  selectedSport,
  onSportChange,
  selectedTime,
  onTimeChange,
  showTimeFilter = true,
}: SportCategoryFilterProps) {
  const [isSportOpen, setIsSportOpen] = useState(false);
  const [isTimeOpen, setIsTimeOpen] = useState(false);
  const sportRef = useRef<HTMLDivElement>(null);
  const timeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (sportRef.current && !sportRef.current.contains(event.target as Node)) {
        setIsSportOpen(false);
      }
      if (timeRef.current && !timeRef.current.contains(event.target as Node)) {
        setIsTimeOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedSportData = sportCategories.find((s) => s.id === selectedSport) || sportCategories[0];
  const selectedTimeData = timeFilters.find((t) => t.id === selectedTime) || timeFilters[3];

  return (
    <div className="flex items-center gap-3 flex-wrap">
      {/* Sport Dropdown */}
      <div className="relative" ref={sportRef}>
        <button
          onClick={() => setIsSportOpen(!isSportOpen)}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-full font-medium text-sm"
        >
          <span>{selectedSportData.icon}</span>
          <span>{selectedSportData.name}</span>
          <ChevronDown className={cn('w-4 h-4 transition-transform', isSportOpen && 'rotate-180')} />
        </button>

        {isSportOpen && (
          <div className="absolute top-full left-0 mt-2 w-64 bg-card border border-border rounded-xl shadow-2xl z-50 overflow-hidden animate-fade-in">
            {sportCategories.map((sport) => (
              <button
                key={sport.id}
                onClick={() => {
                  onSportChange(sport.id);
                  setIsSportOpen(false);
                }}
                className={cn(
                  'w-full flex items-center justify-between px-4 py-3 hover:bg-muted transition-colors',
                  selectedSport === sport.id && 'bg-muted'
                )}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xs">{sport.icon}</span>
                  <span className="text-foreground text-xs">{sport.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className={cn(
                      'w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors',
                      selectedSport === sport.id
                        ? 'border-primary bg-primary'
                        : 'border-muted-foreground'
                    )}
                  >
                    {selectedSport === sport.id && <Check className="w-3 h-3 text-primary-foreground" />}
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Time Dropdown */}
      {showTimeFilter && (
        <div className="relative" ref={timeRef}>
          <button
            onClick={() => setIsTimeOpen(!isTimeOpen)}
            className="flex items-center gap-2 px-4 py-2 bg-secondary text-foreground rounded-full font-medium text-sm"
          >
            <span>{selectedTimeData.label}</span>
            <span className="px-2 py-0.5 bg-primary text-primary-foreground text-xs rounded-full">
              {selectedTimeData.count}
            </span>
            <ChevronDown className={cn('w-4 h-4 transition-transform', isTimeOpen && 'rotate-180')} />
          </button>

          {isTimeOpen && (
            <div className="absolute top-full left-0 mt-2 w-48 bg-card border border-border rounded-xl shadow-2xl z-50 overflow-hidden animate-fade-in p-2 grid grid-cols-2 gap-2">
              {timeFilters.map((time) => (
                <button
                  key={time.id}
                  onClick={() => {
                    onTimeChange(time.id);
                    setIsTimeOpen(false);
                  }}
                  className={cn(
                    'flex items-center justify-center gap-2 px-3 py-3 rounded-lg font-medium text-sm transition-colors',
                    selectedTime === time.id
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-foreground hover:bg-muted'
                  )}
                >
                  <span>{time.label}</span>
                  <span className="text-xs opacity-70">{time.count}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
