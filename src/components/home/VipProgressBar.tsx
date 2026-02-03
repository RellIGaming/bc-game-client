

type ProgressBarProps = {
  currentXP: number;
  requiredXP: number;
};


const VipProgressBar = ({ currentXP, requiredXP }: ProgressBarProps) => {
  const progress = Math.min(
    Math.max((currentXP / requiredXP) *70, 0),
    100
  );

  return (
    <div className="">
      <div className="relative h-1.5 bg-[#1A2C38] rounded-full overflow-visible mt-3">
        {/* Progress bar */}
        <div
          className="absolute left-0 top-0 h-full bg-primary rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 w-5 h-5 bg-primary rounded-full transition-all duration-300"
          style={{
            left: `calc(${progress}% - 8px)`,
          }}
        />
      </div>

      <div className="text-right text-xs text-white/40 mt-3">
        {Math.max(requiredXP - currentXP, 0).toLocaleString()} XP to VIP 2
      </div>
    </div>
  );
};




export default VipProgressBar;