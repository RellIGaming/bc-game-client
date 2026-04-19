import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Copy } from "lucide-react";
import { toast } from "sonner";
import bkash from "../assets/images/bkash-logo.png";
import rocket from "../assets/images/roket.png";
import nagad from "../assets/images/nagad.png";


export default function PaymentGatewayPage() {
  const [params] = useSearchParams();
  const amount = params.get("amount") || "150";
  const currency = params.get("currency") || "BDT";
  const method = (params.get("method") || "bkash").toUpperCase();
  const orderId = params.get("orderId") || Date.now().toString();
  const wallet = "01336470683";
  const [trxId, setTrxId] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    document.title = `${currency} ${amount} - ${method} Deposit`;
  }, [amount, currency, method]);

  const copyWallet = () => {
    navigator.clipboard.writeText(wallet);
    toast.success("ওয়ালেট নম্বর কপি হয়েছে");
  };

  const handleSubmit = () => {
    if (!trxId.trim()) {
      toast.error("TrxID অবশ্যই পূরণ করতে হবে!");
      return;
    }
    setSubmitted(true);
    // Notify opener window
    if (window.opener) {
      window.opener.postMessage(
        { type: "DEPOSIT_SUBMITTED", orderId, amount, currency, method, trxId },
        "*"
      );
    }
    toast.success("Submission successful! You can close this tab.");
    setTimeout(() => window.close(), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-emerald-700 text-white p-5 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">{currency} {amount}</h1>
            <p className="text-sm mt-1 opacity-90">কম বা বেশি ক্যাশআউট করবেন না</p>
          </div>
          <div className="flex items-center gap-1">
            <span className="bg-white text-emerald-700 px-2 py-0.5 text-xs font-bold rounded">PAY</span>
            <span className="text-sm font-semibold">SERVICE</span>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          <p className="text-red-600 font-bold text-sm">
            আপনি যদি টাকার পরিমাণ পরিবর্তন করেন ({currency} {amount}), আপনি ক্রেডিট পেতে সক্ষম হবেন না।
          </p>

          <div className="grid sm:grid-cols-2 gap-5">
            {/* Wallet No */}
            <div>
              <label className="text-sm font-bold text-gray-800">
                Wallet No <span className="text-red-500">*</span>
              </label>
              <p className="text-xs text-gray-600 mt-1 mb-2">
                এই {method} নম্বরে শুধুমাত্র ক্যাশআউট গ্রহণ করা হয়
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
              <label className="text-sm font-bold text-gray-800">Wallet provider</label>
              <div className="mt-2 bg-pink-600 rounded-lg p-3 flex items-center gap-3">
                <img src={bkash} alt={method} className="h-8 w-auto object-contain bg-white rounded p-1" />
                <span className="text-white font-bold">{method} Deposit</span>
              </div>
            </div>
          </div>

          {/* TrxID */}
          <div>
            <label className="text-sm font-bold text-gray-800">
              ক্যাশআউটের TrxID নাম্বারটি লিখুন
              <span className="text-red-500">(প্রয়োজন)</span>
            </label>
            <input
              value={trxId}
              onChange={(e) => setTrxId(e.target.value)}
              placeholder="TrxID অবশ্যই পূরণ করতে হবে!"
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
              {submitted ? "✓ Submitted" : "নিশ্চিত"}
            </button>
          </div>

          {/* Warning */}
          <div className="border-t pt-4 space-y-2">
            <p className="text-sm font-bold text-gray-800">সতর্কতা:</p>
            <p className="text-sm font-bold text-red-600">
              লেনদেন আইডি সঠিকভাবে পূরণ করতে হবে, অন্যথায় স্কোর ব্যর্থ হবে! !
            </p>
            <p className="text-xs text-gray-600">
              অনুগ্রহ করে নিশ্চিত হয়ে নিন যে আপনি {method} deposit ওয়ালেট নম্বরের ক্যাশ আউট করেছেন। এই নম্বরের অন্য কোন ওয়ালেট থেকে ক্যাশ আউট করলে সেই টাকা পাওয়ার কোন সম্ভাবনা নাই
            </p>
          </div>

          <div className="text-center text-xs text-gray-500 pt-2 border-t">
            Order ID: <span className="font-mono">{orderId}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
