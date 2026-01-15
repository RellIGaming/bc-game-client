const DepositBonus = () => {
  const paymentMethods = ["ApplePay", "VISA", "GPay", "PicPay"];
  const cryptos = ["🔵", "🟠", "🟢", "🔴", "⚫", "🟡", "🟣", "⬛"];

  return (
    <section className="rounded-xl bg-gradient-to-r from-card via-card to-primary/5 p-4 lg:p-5">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Left Side */}
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="text-lg lg:text-xl font-bold text-primary">300%</span>
            <span className="text-sm lg:text-base font-bold text-foreground">Deposit Bonus</span>
          </div>
          <div className="flex items-center gap-2">
            {paymentMethods.map((method, i) => (
              <span 
                key={i} 
                className="text-[10px] lg:text-xs text-muted-foreground bg-secondary px-2 py-1 rounded"
              >
                {method}
              </span>
            ))}
          </div>
        </div>

        {/* Right Side - Crypto Icons */}
        <div className="flex items-center gap-1.5">
          {cryptos.map((crypto, i) => (
            <span key={i} className="text-base lg:text-lg">{crypto}</span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DepositBonus;
