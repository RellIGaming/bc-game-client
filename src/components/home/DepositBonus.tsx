import { CreditCard } from "lucide-react";

const DepositBonus = () => {
  return (
    <section className="rounded-xl bg-gradient-to-r from-card via-card to-primary/10 p-4 lg:p-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <span className="text-xl font-bold text-foreground">300% Deposit Bonus</span>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Pay with:</span>
            <div className="flex items-center gap-1">
              {["💳", "💵", "🅿️", "💰"].map((icon, i) => (
                <span key={i} className="text-lg">{icon}</span>
              ))}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 text-sm font-medium text-muted-foreground">
            <span>🎰</span>
            <span>🎲</span>
            <span>🃏</span>
            <span>⚽</span>
            <span>🏀</span>
            <span>🎯</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DepositBonus;
