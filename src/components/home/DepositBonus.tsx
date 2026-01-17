
import applePay from "../../assets/images/apple_pay.png";
import  gPay from "../../assets/images/google_pay-icon.jpg";
import visaPay from "../../assets/images/visacard-icon.jpg";
import picPay from "../../assets/images/pic_pay-icon.jpg";
import ADA from "../../assets/images/ADA-icon.png";
import bnb from "../../assets/images/BNB-icon.png";
import doge from "../../assets/images/DOGE-icon.png";
import eth from "../../assets/images/ETH-icon.png";
import sql from "../../assets/images/SOL-icon.png";
import trx from "../../assets/images/TRX-icon.png";
import usdc from "../../assets/images/USDC-icon.png";
import usdt from "../../assets/images/USDT-icon.png";
import xpr from "../../assets/images/XRP-icon.png";

const DepositBonus = () => {
  const paymentMethods = [applePay, visaPay, gPay, picPay];
  const cryptos = [ADA ,bnb, doge, eth, sql, trx, usdc, usdt, xpr];

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
              <img
                key={i} 
                className="w-10 h-4 "
                src={method} alt="logo"
              />
            ))}
          </div>
        </div>

        {/* Right Side - Crypto Icons */}
        <div className="flex items-center gap-1.5">
          {cryptos.map((crypto, i) => (
            <img  key={i} className="w-10 h-10 rounded" src={crypto} alt="logo"/>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DepositBonus;
