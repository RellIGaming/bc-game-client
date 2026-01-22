import applePay from "../../assets/images/apple_pay.png";
import gPay from "../../assets/images/google_pay-icon.jpg";
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
  const paymentMethods = [
    { img: applePay, name: "Apple Pay" },
    { img: visaPay, name: "Visa" },
    { img: gPay, name: "Google Pay" },
    { img: picPay, name: "PicPay" },
  ];
  
  const cryptos = [ADA, bnb, doge, eth, sql, trx, usdc, usdt, xpr];

  return (
<section className="rounded-xl bg-gradient-to-r from-card via-card to-primary/5 p-4 lg:p-5">
  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">

    {/* Crypto Icons - TOP in mobile */}
    <div className="flex items-center justify-center order-1 sm:order-3 gap-2">
      {cryptos.map((crypto, i) => (
        <img
          key={i}
          src={crypto}
          alt="logo"
          className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded"
        />
      ))}
    </div>

    {/* Payment Methods - MIDDLE in mobile */}
    <div className="flex items-center justify-center gap-2 order-2 sm:order-2">
      {paymentMethods.map((method, i) => (
        <img
          key={i}
          src={method.img}
          alt="logo"
          className="w-10 h-4"
        />
      ))}
    </div>

    {/* 300% Bonus - BOTTOM in mobile */}
    <div className="flex items-center justify-center gap-2 order-3 sm:order-1">
      <span className="text-lg lg:text-xl font-bold text-primary">300%</span>
      <span className="text-sm lg:text-base font-bold text-foreground">
        Deposit Bonus
      </span>
    </div>

  </div>
</section>



  );
};

export default DepositBonus;
