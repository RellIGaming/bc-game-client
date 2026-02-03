import { X } from "lucide-react";

export default function WithdrawGuideModal({ open, onClose }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">

      {/* Modal Box */}
      <div className="w-[420px] max-h-[80vh] bg-[#242828] rounded-xl shadow-lg overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#3a3f3f]">
          <h2 className="text-white font-semibold text-sm">
            How to withdraw crypto
          </h2>
          <button onClick={onClose}>
            <X className="w-4 h-4 text-gray-400 hover:text-white" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4 overflow-y-auto max-h-[70vh] text-sm text-gray-300">

          {/* Step 1 */}
          <div>
            <h3 className="text-white font-medium mb-1">
              Step 1: Select Cryptocurrency
            </h3>
            <p className="mb-2">
              Choose the cryptocurrency you want to withdraw (e.g. BTC, ETH, USDT).
            </p>
            <img
              src="/images/withdraw-step-1.png"
              alt="Step 1"
              className="rounded-lg border border-[#3a3f3f]"
            />
          </div>

          {/* Step 2 */}
          <div>
            <h3 className="text-white font-medium mb-1">
              Step 2: Choose Network
            </h3>
            <p className="mb-2">
              Select the correct blockchain network (ERC20, TRC20, BEP20, etc.).
            </p>
            <img
              src="/images/withdraw-step-2.png"
              alt="Step 2"
              className="rounded-lg border border-[#3a3f3f]"
            />
          </div>

          {/* Step 3 */}
          <div>
            <h3 className="text-white font-medium mb-1">
              Step 3: Enter Withdrawal Address
            </h3>
            <p className="mb-2">
              Paste the wallet address where you want to receive funds.
            </p>
            <img
              src="/images/withdraw-step-3.png"
              alt="Step 3"
              className="rounded-lg border border-[#3a3f3f]"
            />
          </div>

          {/* Step 4 */}
          <div>
            <h3 className="text-white font-medium mb-1">
              Step 4: Enter Amount
            </h3>
            <p className="mb-2">
              Enter the amount you want to withdraw.
            </p>
            <img
              src="/images/withdraw-step-4.png"
              alt="Step 4"
              className="rounded-lg border border-[#3a3f3f]"
            />
          </div>

          {/* Step 5 */}
          <div>
            <h3 className="text-white font-medium mb-1">
              Step 5: Confirm Withdrawal
            </h3>
            <p>
              Confirm the transaction and wait for blockchain confirmation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
