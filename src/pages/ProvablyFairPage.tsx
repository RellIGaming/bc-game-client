import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
const sidebarItems = [
  "Provably Fair", "Privacy Policy", "Terms of Service", "Terms Of Sports", "Bonus Terms",
  "Tacoback Bonus", "Law Enforcement", "Coin Accuracy Limit", "Support", "Fee",
  "Google Authenticator", "FAQs", "Currency", "Registration and Login", "Passkey",
  "Swap Policy", "18+ Gamble Aware", "App Check-in Q&A", "Protecting Minors", "Providers", "AML"
];
const ProvablyFairPage = () => {
  const [activeItem, setActiveItem] = useState("Provably Fair");
  const [selectedGame, setSelectedGame] = useState("Crash");
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Help Center</h1>
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <div className="lg:w-64 shrink-0">
            <div className="bg-card rounded-lg p-2 space-y-0.5 lg:sticky lg:top-20">
              {sidebarItems.map((item) => (
                <button
                  key={item}
                  onClick={() => setActiveItem(item)}
                  className={cn(
                    "w-full text-left px-4 py-2.5 rounded-lg text-sm transition-colors",
                    activeItem === item
                      ? "bg-primary/20 text-primary font-medium"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                  )}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          {/* Content */}
          <div className="flex-1">
            <div className="bg-card rounded-lg p-6 space-y-6">
              {activeItem === "Provably Fair" && (
                <>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-sm font-medium">Game</span>
                    <select
                      value={selectedGame}
                      onChange={(e) => setSelectedGame(e.target.value)}
                      className="bg-secondary border border-border rounded-lg px-3 py-1.5 text-sm"
                    >
                      <option>Crash</option>
                      <option>Dice</option>
                      <option>Limbo</option>
                    </select>
                  </div>
                  <h2 className="text-xl font-bold">Fairness</h2>
                  <h3 className="font-bold">Is The Game Fair?</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    We are a fair and impartial prediction and guessing platform. Our goal is to eliminate all unfair factors and make players feel comfortable and have fun.
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    We have generated a total of 10 million hashes (the generation chain is verifiable), and each hash corresponds to a Crash multiplier.
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    We release these 10 million numbers in reverse order, each corresponding to one turn of the game (i.e. we have 10 million turns in total).
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    In other words, the crash number of each turn already exists and is not calculated after the game starts. Players can therefore place their bets without concern.
                  </p>
                  <h3 className="font-bold mt-6">Will The Game Be Manipulated By The Platform?
                    <button className="text-primary text-sm ml-2">GitHub</button>
                    <button className="text-primary text-sm ml-2">Verify</button>
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    The integrity check value is key to verifying whether there is any official manipulation; The test algorithm is provided as follows.
                  </p>
                  <div className="bg-secondary rounded-lg p-4 text-xs font-mono text-muted-foreground break-all">
                    Example: 6b5f24897c3c48d0e46cc924f908c7e5607924591fbadf1f7f24643b5d2be231
                  </div>
                  <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                    <p>Take a random value in the 2^52 range, namely 16^13, i.e. a 13-bit hexadecimal number (because the hash value is hexadecimal, 2^52 === 16^13).</p>
                    <p>Distribute the random value to 0-1, by dividing it by the maximum value of 13 fs, namely 0x6b5f24897c3c4/0x10000000000000.</p>
                    <p>Note the house edge 1%. Further to calculate 99/(1-X), where X is the random value calculated at Step 2.</p>
                    <p>Conclusion: The overall random number distribution is 99 to positive infinite; and when the random number distribution is 0-0.01, result is less than 100.</p>
                  </div>
                  <p className="text-sm text-muted-foreground font-mono">
                    99/(1-0.499206889692064) = 170.45656748150867
                  </p>
                  <p className="text-sm text-muted-foreground">
                    All values less than 100 will be set to 100. In other words, there is a probability of 1% that 100 will appear. Round off the number and divide it by 100 to get the final result.
                  </p>
                  <p className="text-sm text-muted-foreground font-mono">170/100 = 1.70</p>
                  <Button className="bg-primary text-primary-foreground mt-4">Validate</Button>
                </>
              )}
              {activeItem !== "Provably Fair" && (
                <div className="text-center py-12">
                  <div className="text-5xl mb-4">📄</div>
                  <h3 className="text-lg font-bold mb-2">{activeItem}</h3>
                  <p className="text-muted-foreground text-sm">Content for {activeItem} will be displayed here.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProvablyFairPage;