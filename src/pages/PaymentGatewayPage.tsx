

import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Copy } from "lucide-react";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import bkash from "../assets/images/bkash-logo.png";
import rocket from "../assets/images/roket.png";
import nagad from "../assets/images/nagad.png";
import LanguageToggle from "@/components/LanguageToggle";
import { useWalletStore } from "@/store/walletStore";

export default function PaymentGatewayPage() {
  const submitDeposit = useWalletStore((state) => state.submitDeposit);
  const [params] = useSearchParams();
  const { t } = useTranslation();
  const amount = params.get("amount") || "150";
  const currency = params.get("currency") || "BDT";
  const method = (params.get("method") || "bkash").toUpperCase();
  const orderId = params.get("orderId") || Date.now().toString();
  const wallet = "01718533990";
  const [trxId, setTrxId] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    document.title = `${currency} ${amount} - ${method} Deposit`;
  }, [amount, currency, method]);

  const copyWallet = () => {
    navigator.clipboard.writeText(wallet);
    toast.success(t("payment.copied"));
  };
const handleSubmit = async () => {
  if (!trxId.trim()) {
    toast.error("Enter transaction ID");
    return;
  }

  try {
    await submitDeposit({
     orderId,
  trxId
    });

    toast.success("Deposit submitted successfully");

    if (window.opener) {
      window.opener.postMessage(
        { type: "DEPOSIT_SUBMITTED", orderId },
        "*"
      );
    }

    setTimeout(() => window.close(), 1500);

  } catch (err) {
    toast.error("Submission failed");
  }
};

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-emerald-700 text-white p-5 flex items-start justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold">{currency} {amount}</h1>
            <p className="text-sm mt-1 opacity-90">{t("payment.subtitle")}</p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <div className="flex items-center gap-1">
              <span className="bg-white text-emerald-700 px-2 py-0.5 text-xs font-bold rounded">PAY</span>
              <span className="text-sm font-semibold">SERVICE</span>
            </div>
            <LanguageToggle variant="dark" />
          </div>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          <p className="text-red-600 font-bold text-sm">
            {t("payment.warning_amount", { currency, amount })}
          </p>

          <div className="grid sm:grid-cols-2 gap-5">
            {/* Wallet No */}
            <div>
              <label className="text-sm font-bold text-gray-800">
                {t("payment.wallet_no")} <span className="text-red-500">*</span>
              </label>
              <p className="text-xs text-gray-600 mt-1 mb-2">
                {t("payment.wallet_only", { method })}
              </p>
              <div className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded px-3 py-2">
                <span className="font-mono text-gray-800">{wallet}</span>
                <button onClick={copyWallet} className="text-emerald-600 hover:text-emerald-700">
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Wallet Provider */}
            <div>
              <label className="text-sm font-bold text-gray-800">{t("payment.wallet_provider")}</label>
              <div className="mt-2 bg-pink-600 rounded-lg p-3 flex items-center gap-3">
                <img src={bkash} alt={method} className="h-8 w-auto object-contain bg-white rounded p-1" />
                <span className="text-white font-bold">{t("payment.method_deposit", { method })}</span>
              </div>
            </div>
          </div>

          {/* TrxID */}
          <div>
            <label className="text-sm font-bold text-gray-800">
              {t("payment.trxid_label")}
              <span className="text-red-500">{t("payment.required")}</span>
            </label>
            <input
              value={trxId}
              onChange={(e) => setTrxId(e.target.value)}
              placeholder={t("payment.trxid_placeholder")}
              className="w-full mt-2 px-4 py-3 bg-white border-2 border-red-400 rounded-lg outline-none text-gray-800 placeholder:text-red-400"
            />
          </div>

          {/* Confirm Button */}
          <div className="flex justify-center">
            <button
              onClick={handleSubmit}
              disabled={submitted}
              className="px-12 py-2.5 border-2 border-gray-300 rounded-lg font-semibold text-gray-800 hover:bg-gray-50 disabled:opacity-50"
            >
              {submitted ? t("payment.submitted") : t("payment.confirm_btn")}
            </button>
          </div>

          {/* Warning */}
          <div className="border-t pt-4 space-y-2">
            <p className="text-sm font-bold text-gray-800">{t("payment.warning_title")}</p>
            <p className="text-sm font-bold text-red-600">
              {t("payment.warning_msg")}
            </p>
            <p className="text-xs text-gray-600">
              {t("payment.warning_note", { method })}
            </p>
          </div>

          <div className="text-center text-xs text-gray-500 pt-2 border-t">
            {t("payment.order_id")}: <span className="font-mono">{orderId}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

