const WorldMapCard = () => {
  const topCountries = [
    { rank: 1, flag: "🇺🇸", name: "USA" },
    { rank: 2, flag: "🇬🇧", name: "UK" },
    { rank: 3, flag: "🇩🇪", name: "Germany" },
  ];

  return (
    <div className="bg-card border border-border rounded-xl p-4 lg:p-6">
      <h3 className="font-semibold text-foreground mb-4">Total Players per Country</h3>

      {/* World Map Placeholder */}
      <div className="relative h-40 mb-4 bg-gradient-to-br from-primary/10 to-secondary/30 rounded-lg overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <svg
            viewBox="0 0 800 400"
            className="w-full h-full opacity-30"
            fill="currentColor"
          >
            {/* Simplified world map shape */}
            <ellipse cx="400" cy="200" rx="350" ry="150" className="text-primary/20" />
            <circle cx="200" cy="150" r="8" className="text-primary" />
            <circle cx="350" cy="120" r="6" className="text-primary" />
            <circle cx="450" cy="180" r="10" className="text-primary" />
            <circle cx="550" cy="160" r="5" className="text-primary" />
            <circle cx="600" cy="200" r="7" className="text-primary" />
          </svg>
        </div>
        
        {/* Hotspots */}
        {[
          { top: "30%", left: "25%", size: "w-3 h-3" },
          { top: "25%", left: "45%", size: "w-4 h-4" },
          { top: "40%", left: "55%", size: "w-2 h-2" },
          { top: "50%", left: "70%", size: "w-3 h-3" },
        ].map((spot, index) => (
          <div
            key={index}
            className={`absolute ${spot.size} bg-primary rounded-full animate-pulse`}
            style={{ top: spot.top, left: spot.left }}
          />
        ))}
      </div>

      {/* Top Countries */}
      <div className="space-y-2">
        {topCountries.map((country) => (
          <div
            key={country.rank}
            className="flex items-center justify-between p-2 bg-secondary/30 rounded-lg"
          >
            <div className="flex items-center gap-3">
              <span className="text-primary font-bold">#{country.rank}</span>
              <span className="text-lg">{country.flag}</span>
            </div>
            <div className="w-8 h-1 bg-primary/50 rounded" />
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
        <span>Refer: Konsani: Thanur</span>
        <span className="text-primary">→</span>
      </div>
    </div>
  );
};

export default WorldMapCard;
