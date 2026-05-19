import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Copy } from "lucide-react";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import bkash from "../assets/images/bkash-logo.png";
import upiQr from "../assets/images/upi-qr.jpeg";
import upiLogo from "../assets/images/upi-logo.png";
import LanguageToggle from "@/components/LanguageToggle";
import { useWalletStore } from "@/store/walletStore";
import { cn } from "@/lib/utils";

const UPI_ID = "zarakhatun50-3@okaxis";
const UPI_NUMBER = "8622005855";

export default function PaymentGatewayPage() {
  const submitDeposit = useWalletStore((s) => s.submitDeposit);
  const [params] = useSearchParams();
  const { t } = useTranslation();

  const amount = params.get("amount") || "1000";
  const initialCurrency = (params.get("currency") || "BDT").toUpperCase();
  const method = (params.get("method") || "bkash").toUpperCase();
  const orderId = params.get("orderId") || Date.now().toString();

  // Toggle currency view (BDT vs INR) — defaults to URL currency
  const [currency, setCurrency] = useState<"BDT" | "INR">(
    initialCurrency === "INR" ? "INR" : "BDT"
  );

  // Shared
  const wallet = "01718533990";
  const [trxId, setTrxId] = useState("");
  const [utr, setUtr] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // Countdown for INR view
  const [secondsLeft, setSecondsLeft] = useState(10 * 60);
  useEffect(() => {
    if (currency !== "INR") return;
    const id = setInterval(() => setSecondsLeft((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(id);
  }, [currency]);

  const timer = useMemo(() => {
    const m = Math.floor(secondsLeft / 60).toString().padStart(2, "0");
    const s = (secondsLeft % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  }, [secondsLeft]);

  useEffect(() => {
    document.title = `${currency} ${amount} - Payment`;
  }, [amount, currency]);

  const copy = (text: string, msg = "Copied") => {
    navigator.clipboard.writeText(text);
    toast.success(msg);
  };

  const finishAndClose = () => {
    setSubmitted(true);
    toast.success("Deposit submitted successfully");
    if (window.opener) {
      window.opener.postMessage({ type: "DEPOSIT_SUBMITTED", orderId }, "*");
    }
    setTimeout(() => window.close(), 1500);
  };

  const handleSubmitBDT = async () => {
    if (!trxId.trim()) return toast.error("Enter transaction ID");
    try {
      await submitDeposit({ orderId, trxId });
      finishAndClose();
    } catch {
      toast.error("Submission failed");
    }
  };

  const handleSubmitINR = async () => {
    if (!utr.trim() || utr.trim().length < 6)
      return toast.error("Enter a valid UTR");
    try {
      await submitDeposit({ orderId, trxId: utr });
      finishAndClose();
    } catch {
      toast.error("Submission failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-start sm:items-center justify-center p-3 sm:p-4">
      <div className="w-full max-w-2xl space-y-3">
        {/* Currency Toggle */}
        <div className="bg-white rounded-xl shadow flex items-center justify-between p-2">
          <div className="flex rounded-lg bg-gray-100 p-1">
            {(["BDT", "INR"] as const).map((c) => (
              <button
                key={c}
                onClick={() => setCurrency(c)}
                className={cn(
                  "px-4 py-1.5 text-sm font-semibold rounded-md transition",
                  currency === c
                    ? "bg-blue-600 text-white shadow"
                    : "text-gray-600 hover:text-gray-900"
                )}
              >
                {c}
              </button>
            ))}
          </div>
          <LanguageToggle variant="dark" />
        </div>

        {currency === "BDT" ? (
          /* ===================== BDT VIEW ===================== */
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-emerald-700 text-white p-5 flex items-start justify-between gap-3">
              <div>
                <h1 className="text-2xl font-bold">BDT {amount}</h1>
                <p className="text-sm mt-1 opacity-90">{t("payment.subtitle")}</p>
              </div>
              <div className="flex items-center gap-1">
                <span className="bg-white text-emerald-700 px-2 py-0.5 text-xs font-bold rounded">
                  PAY
                </span>
                <span className="text-sm font-semibold">SERVICE</span>
              </div>
            </div>

            <div className="p-6 space-y-5">
              <p className="text-red-600 font-bold text-sm">
                {t("payment.warning_amount", { currency: "BDT", amount })}
              </p>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="text-sm font-bold text-gray-800">
                    {t("payment.wallet_no")} <span className="text-red-500">*</span>
                  </label>
                  <p className="text-xs text-gray-600 mt-1 mb-2">
                    {t("payment.wallet_only", { method })}
                  </p>
                  <div className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded px-3 py-2">
                    <span className="font-mono text-gray-800">{wallet}</span>
                    <button
                      onClick={() => copy(wallet, t("payment.copied"))}
                      className="text-emerald-600 hover:text-emerald-700"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-bold text-gray-800">
                    {t("payment.wallet_provider")}
                  </label>
                  <div className="mt-2 bg-pink-600 rounded-lg p-3 flex items-center gap-3">
                    <img
                      src={bkash}
                      alt={method}
                      className="h-8 w-auto object-contain bg-white rounded p-1"
                    />
                    <span className="text-white font-bold">
                      {t("payment.method_deposit", { method })}
                    </span>
                  </div>
                </div>
              </div>

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

              <div className="flex justify-center">
                <button
                  onClick={handleSubmitBDT}
                  disabled={submitted}
                  className="px-12 py-2.5 border-2 border-gray-300 rounded-lg font-semibold text-gray-800 hover:bg-gray-50 disabled:opacity-50"
                >
                  {submitted ? t("payment.submitted") : t("payment.confirm_btn")}
                </button>
              </div>

              <div className="border-t pt-4 space-y-2">
                <p className="text-sm font-bold text-gray-800">
                  {t("payment.warning_title")}
                </p>
                <p className="text-sm font-bold text-red-600">
                  {t("payment.warning_msg")}
                </p>
                <p className="text-xs text-gray-600">
                  {t("payment.warning_note", { method })}
                </p>
              </div>

              <div className="text-center text-xs text-gray-500 pt-2 border-t">
                {t("payment.order_id")}:{" "}
                <span className="font-mono">{orderId}</span>
              </div>
            </div>
          </div>
        ) : (
          /* ===================== INR VIEW ===================== */
          <>
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-600 via-blue-500 to-teal-400 text-white px-5 py-4 flex items-center justify-between">
                <span className="w-12" />
                <h1 className="text-xl sm:text-2xl font-bold">Payment</h1>
                <span className="text-sm font-semibold w-12 text-right">
                  {timer}
                </span>
              </div>

              {/* QR */}
              <div className="px-5 py-5 flex flex-col items-center text-center">
                <p className="text-sm text-gray-600">Amount Payable</p>
                <p className="text-3xl sm:text-4xl font-bold text-blue-600 mt-1">
                  ₹{amount}
                </p>
                <p className="font-bold mt-3 text-gray-800">
                  Use Mobile Scan code to pay
                </p>
                <img
                  src={upiQr}
                  alt="UPI QR"
                  className="w-48 h-48 sm:w-56 sm:h-56 object-contain my-3"
                />
                <p className="text-orange-600 text-sm font-medium px-2">
                  Please do not save the QR code for repeated payments,
                  otherwise the payment may not be credited.
                </p>
                <a
                  href={upiQr}
                  download="upi-qr.jpeg"
                  className="mt-3 inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg"
                >
                  ↓ Save
                </a>
              </div>
            </div>

            {/* Payment methods */}
            <div className="bg-white rounded-2xl shadow p-4">
              <p className="font-bold text-gray-800 mb-3">
                Choose a payment method to pay
              </p>
              <div className="space-y-2">
                {[
                  { name: "Paytm", color: "text-blue-600" },
                  { name: "PhonePe", color: "text-purple-700" },
                ].map((m) => (
                  <div
                    key={m.name}
                    className="flex items-center justify-between border border-gray-200 rounded-lg px-4 py-3"
                  >
                    <div className="flex items-center gap-3">
                      <img src={upiLogo} alt={m.name} className="h-7 w-auto" />
                      <span className={cn("font-bold", m.color)}>{m.name}</span>
                    </div>
                    <span className="text-orange-400 text-xl">👆</span>
                  </div>
                ))}
              </div>
            </div>

            {/* UPI ID + UTR */}
            <div className="bg-white rounded-2xl shadow p-4 space-y-4">
              <div>
                <p className="text-sm text-gray-700">
                  1. Copy the UPI below and transfer{" "}
                  <span className="text-orange-500 font-semibold">
                    ₹{amount}
                  </span>
                </p>
                <div className="mt-2 flex items-stretch gap-2">
                  <div className="flex-1 bg-gray-50 border border-gray-200 rounded px-3 py-2 flex items-center justify-center font-mono text-gray-800 text-sm overflow-hidden">
                    {UPI_ID}
                  </div>
                  <button
                    onClick={() => copy(UPI_ID, "UPI ID copied")}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 rounded"
                  >
                    Copy
                  </button>
                </div>
                <p className="text-xs text-red-500 mt-1 font-medium">
                  Tip: Don't save the upi, this upi is valid for 10 minutes
                </p>

                <div className="mt-3 flex items-stretch gap-2">
                  <div className="flex-1 bg-gray-50 border border-gray-200 rounded px-3 py-2 flex items-center font-mono text-gray-800 text-sm">
                    UPI No: {UPI_NUMBER}
                  </div>
                  <button
                    onClick={() => copy(UPI_NUMBER, "UPI number copied")}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 rounded"
                  >
                    Copy
                  </button>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-700 mb-2">
                  2. Fill TrxID after payment
                </p>
                <input
                  value={utr}
                  onChange={(e) => setUtr(e.target.value)}
                  placeholder="Please enter the 12-digit TrxID"
                  className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-800 rounded-lg outline-none text-gray-800"
                />
              </div>

              <button
                onClick={handleSubmitINR}
                disabled={submitted}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg disabled:opacity-50"
              >
                {submitted ? "✓ Submitted" : "Submit TrxID"}
              </button>

              <div className="text-center text-xs text-gray-500 pt-2 border-t">
                Order ID: <span className="font-mono">{orderId}</span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
