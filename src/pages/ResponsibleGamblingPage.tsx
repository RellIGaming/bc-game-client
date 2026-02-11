import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle, Shield, Clock, Calculator } from "lucide-react";
const sidebarTabs = [
  { id: "faqs", label: "FAQ's", icon: "❓" },
  { id: "self-assessment", label: "Self-Assessment", icon: "📋" },
  { id: "gambling-limits", label: "Gambling Limits", icon: "📊" },
  { id: "self-exclusion", label: "Self-exclusion", icon: "🔒" },
  { id: "budget-calculator", label: "Budget Calculator", icon: "🧮" },
];
const selfAssessmentQuestions = [
  "Have there been periods lasting two weeks or longer when you spent a lot of time thinking about your gambling experiences, planning out future gambling ventures or bets, or thinking about ways of getting money to gamble with?",
  "Have there been periods when you needed to gamble with increasing amounts of money or with larger bets than before in order to get the same feeling of excitement?",
  "Have you ever felt restless or irritable when trying to stop, cut down, or control your gambling?",
  "Have you tried and not succeeded in stopping, cutting down, or controlling your gambling three or more times in your life?",
  "Have you ever gambled to escape from personal problems, or to relieve uncomfortable feelings such as guilt, anxiety, helplessness, or depression?",
  "Has there ever been a period when, if you lost money gambling one day, you would often return another day to get even?",
  "Have you lied to family members, friends, or others about how much you gamble, and/or about how much money you lost on gambling, on at least three occasions?",
  "Have you ever written a bad cheque or taken money that didn't belong to you from family members, friends, or anyone else in order to pay for your gambling?",
  "Has your gambling ever caused serious or repeated problems in your relationships with any of your family members or friends? Or, has your gambling ever caused you problems at work or your studies?",
  "Have you ever needed to ask family members, friends, a lending institution, or anyone else to loan you money or otherwise bail you out of a desperate money situation that was largely caused by your gambling?",
];
const budgetFields = {
  income: [
    { label: "Wages after deductions", key: "wages" },
    { label: "Pensions", key: "pensions" },
    { label: "Benefits", key: "benefits" },
    { label: "Other income", key: "otherIncome" },
    { label: "Total income", key: "totalIncome", readonly: true },
  ],
  expenses: [
    { label: "Rent/mortgage", key: "rent" },
    { label: "Utility bills", key: "utilities" },
    { label: "Loans/credit", key: "loans" },
    { label: "Other expenses", key: "otherExpenses" },
    { label: "Total expenses", key: "totalExpenses", readonly: true },
  ],
};
const ResponsibleGamblingPage = () => {
  const [activeTab, setActiveTab] = useState("faqs");
  const [budgetValues, setBudgetValues] = useState<Record<string, number>>({});
  const updateBudget = (key: string, val: string) => {
    setBudgetValues((prev) => ({ ...prev, [key]: Number(val) || 0 }));
  };
  const totalIncome = (budgetValues.wages || 0) + (budgetValues.pensions || 0) + (budgetValues.benefits || 0) + (budgetValues.otherIncome || 0);
  const totalExpenses = (budgetValues.rent || 0) + (budgetValues.utilities || 0) + (budgetValues.loans || 0) + (budgetValues.otherExpenses || 0);
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-5xl mx-auto px-1 py-8">
        <h1 className="text-2xl font-bold text-primary mb-6">Responsible Gambling</h1>
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <div className="lg:w-56 shrink-0">
            <div className="bg-card rounded-lg p-2 space-y-0.5 lg:sticky lg:top-20">
              {sidebarTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "w-full text-left px-4 py-3 rounded-lg text-sm transition-colors flex items-center gap-2",
                    activeTab === tab.id
                      ? "bg-primary/20 text-primary font-medium"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                  )}
                >
                  <span>{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
          {/* Content */}
          <div className="flex-1">
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="flex-1">
                {activeTab === "faqs" && (
                  <div className="bg-card rounded-lg p-6 space-y-6">
                    <h2 className="text-xl font-bold">Responsible Gambling At rellbet.GAME</h2>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      At rellbet.GAME, it is strictly forbidden for individuals under the age of 18 to engage in gambling activities.
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Online gambling can be a fun and potentially rewarding way to spend your time. At rellbet.GAME, we prioritize our players' best interests and support responsible gambling.
                    </p>
                    <h3 className="font-bold">Responsible Gambling</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      rellbet.GAME is here to provide an excellent and enjoyable gaming experience and recognize our responsibility in preventing problematic activity. We advise all players to take into account the following, and not game irresponsibly:
                    </p>
                    <ul className="list-disc pl-6 text-sm text-muted-foreground space-y-1">
                      <li>Play for entertainment, not to make money.</li>
                      <li>Avoid chasing losses.</li>
                      <li>Establish limits for yourself.</li>
                      <li>Do not let gambling interfere with your daily responsibilities.</li>
                      <li>Never gamble unless you can cover losses.</li>
                      <li>Take breaks.</li>
                    </ul>
                    <h3 className="font-bold">Underage Gambling</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Players must be at least legal gambling age in their jurisdiction (at least 18+) in order to play at rellbet.GAME. It is their responsibility to be aware of the age restrictions where they reside and play, and to confirm their legitimacy when creating an account at rellbet.GAME.
                    </p>
                    <h3 className="font-bold">Where to Get Help</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">If you need assistance, please contact:</p>
                    <ul className="list-disc pl-6 text-sm text-muted-foreground space-y-1">
                      <li>Gamblers Anonymous International Service Office</li>
                      <li className="text-primary">Website: https://www.gamblersanonymous.org/ga/</li>
                      <li>National Council On Problem Gambling</li>
                      <li className="text-primary">Website: https://www.ncpgambling.org/</li>
                      <li>Gamcare</li>
                      <li className="text-primary">Website: https://www.gamcare.org.uk/</li>
                    </ul>
                  </div>
                )}
                {activeTab === "self-assessment" && (
                  <div className="bg-card rounded-lg p-6 space-y-4">
                    <h2 className="text-xl font-bold">Self-Assessment</h2>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Gambling can be an enjoyable pastime for many people, providing entertainment and the thrill of taking a risk. However, for some individuals, gambling can become more than just a harmless activity. Recognizing the signs of problem gambling is the first step towards addressing this issue.
                    </p>
                    <h3 className="font-bold">Do you have a gambling problem? Ask yourself the following questions:</h3>
                    <ul className="list-disc pl-6 text-sm text-muted-foreground space-y-3">
                      {selfAssessmentQuestions.map((q, i) => (
                        <li key={i}>{q}</li>
                      ))}
                    </ul>
                    <p className="text-sm text-muted-foreground italic">
                      *REMINDER: this self-assessment will help you figure out if there is, or you are developing a problem. If you answered yes to one or more of the above questions, you should seek help.
                    </p>
                  </div>
                )}
                {activeTab === "gambling-limits" && (
                  <div className="bg-card rounded-lg p-6 space-y-4">
                    <h2 className="text-xl font-bold">Gambling Limits</h2>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Gain control over your play or betting by using loss or wagering limits. These limits allow you to control the maximum loss or wagered amount over a daily, weekly or monthly period.
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Your limit will apply within 15 minutes and will reset when that time is reached. E.g. If you set a $100 daily loss limit at 2pm today, the limit will reset at 0:00 (UTC+0) tomorrow.
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      The changes to remove your limits will updated at 0:00(UTC+0) of the next day.
                    </p>
                    <Button className="w-full bg-primary text-primary-foreground text-lg py-6">Set Gambling Limit</Button>
                  </div>
                )}
                {activeTab === "self-exclusion" && (
                  <div className="bg-card rounded-lg p-6 space-y-4">
                    <h2 className="text-xl font-bold">Self-Exclusion</h2>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Are you seeking a break from rellbet.GAME? Initiate the automated self-exclusion process by establishing a limit, and you will be temporarily barred from accessing your account for the selected period.
                    </p>
                    <p className="text-sm text-muted-foreground">You will receive an email to confirm your request.</p>
                    <div className="space-y-4 mt-4">
                      <div className="bg-secondary rounded-lg p-5 flex items-start gap-4">
                        <Clock className="w-8 h-8 text-muted-foreground shrink-0 mt-1" />
                        <div>
                          <h4 className="font-bold text-sm mb-1">Step 1: Take a 24 Hours Cooldown</h4>
                          <p className="text-xs text-muted-foreground">Take a 24 hours cooldown from betting from both casino and sports. You will still be able to access the platform and you can earn and claim rewards.</p>
                        </div>
                      </div>
                      <div className="bg-secondary rounded-lg p-5 flex items-start gap-4">
                        <Shield className="w-8 h-8 text-muted-foreground shrink-0 mt-1" />
                        <div>
                          <h4 className="font-bold text-sm mb-1">Step 2: Self-Exclusion</h4>
                          <p className="text-xs text-muted-foreground">After your 24 hours cooldown ends, you have 24 hours to extend your self-exclusion period by 1 day, 1 week, 1 month, 6 months or permanently. Self-exclusion is a STRICTLY IRREVERSIBLE process.</p>
                        </div>
                      </div>
                    </div>
                    <label className="flex items-start gap-2 mt-4 text-sm text-muted-foreground">
                      <input type="checkbox" className="mt-1 rounded" />
                      <span>By requesting self-exclusion, I acknowledge the <span className="text-primary">rules of self-exclusion</span> and take full responsibility</span>
                    </label>
                    <Button className="w-full bg-primary text-primary-foreground text-lg py-6">Continue</Button>
                  </div>
                )}
                {activeTab === "budget-calculator" && (
                  <div className="bg-card rounded-lg p-6 space-y-6">
                    <h2 className="text-xl font-bold">Budget Calculator</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Income */}
                      <div className="space-y-4">
                        <h3 className="font-bold">Income</h3>
                        {budgetFields.income.map((field) => (
                          <div key={field.key}>
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-muted-foreground">{field.label}</span>
                              <span>₹{field.key === "totalIncome" ? totalIncome.toFixed(2) : (budgetValues[field.key] || 0).toFixed(2)}</span>
                            </div>
                            <div className="flex items-center gap-2 bg-secondary rounded-lg px-3 py-2">
                              <span className="text-orange-500">🪙</span>
                              <input
                                type="number"
                                value={field.key === "totalIncome" ? totalIncome : (budgetValues[field.key] || 0)}
                                readOnly={field.readonly}
                                onChange={(e) => updateBudget(field.key, e.target.value)}
                                className="bg-transparent w-full text-sm focus:outline-none"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                      {/* Expenses */}
                      <div className="space-y-4">
                        <h3 className="font-bold">Expenses</h3>
                        {budgetFields.expenses.map((field) => (
                          <div key={field.key}>
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-muted-foreground">{field.label}</span>
                              <span>₹{field.key === "totalExpenses" ? totalExpenses.toFixed(2) : (budgetValues[field.key] || 0).toFixed(2)}</span>
                            </div>
                            <div className="flex items-center gap-2 bg-secondary rounded-lg px-3 py-2">
                              <span className="text-orange-500">🪙</span>
                              <input
                                type="number"
                                value={field.key === "totalExpenses" ? totalExpenses : (budgetValues[field.key] || 0)}
                                readOnly={field.readonly}
                                onChange={(e) => updateBudget(field.key, e.target.value)}
                                className="bg-transparent w-full text-sm focus:outline-none"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="border-t border-border pt-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-bold">Disposable income</span>
                      </div>
                      <div className="flex items-center gap-2 bg-secondary rounded-lg px-3 py-2">
                        <span className="text-orange-500">🪙</span>
                        <span className="text-sm font-bold">{(totalIncome - totalExpenses).toFixed(0)}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              {/* Need Help Sidebar - only on gambling-limits and self-exclusion */}
              {(activeTab === "gambling-limits" || activeTab === "self-exclusion") && (
                <div className="lg:w-64 shrink-0">
                  <div className="bg-card rounded-lg p-6 text-center">
                    <div className="w-16 h-16 mx-auto rounded-lg bg-primary/20 flex items-center justify-center mb-4">
                      <MessageCircle className="w-8 h-8 text-primary" />
                    </div>
                    <h4 className="font-bold mb-2">Need Help?</h4>
                    <p className="text-xs text-muted-foreground mb-4">Have questions or concerns regarding your account? Our experts are here to help!</p>
                    <Button className="w-full bg-primary text-primary-foreground">Chat with us</Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ResponsibleGamblingPage;