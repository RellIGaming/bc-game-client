import { X } from "lucide-react";
import { motion } from 'framer-motion';

const AddAddressModal=({ onClose })=> {
  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className="w-[400px] bg-[#242828] rounded-xl border border-[#3a3f3f] shadow-xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#3a3f3f]">
          <h2 className="text-white font-medium">Add Address</h2>
          <button onClick={onClose}>
            <X className="w-4 h-4 text-gray-400 hover:text-white" />
          </button>
        </div>

        {/* Body */}
        <div className="p-4 space-y-3 text-sm text-gray-300">
          <input
            placeholder="Address Name"
            className="w-full px-3 py-2 bg-secondary rounded-md border border-border outline-none"
          />

          <select className="w-full px-3 py-2 bg-secondary rounded-md border border-border">
            <option>BC</option>
            <option>USDT</option>
          </select>

          <select className="w-full px-3 py-2 bg-secondary rounded-md border border-border">
            <option>Solana</option>
            <option>ERC20</option>
          </select>

          <input
            placeholder="Enter Address"
            className="w-full px-3 py-2 bg-secondary rounded-md border border-border outline-none"
          />
        </div>

        {/* Footer */}
        <div className="p-4">
          <button className="w-full py-2 bg-green-500 text-black rounded-md font-medium hover:bg-green-400">
            Save
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default AddAddressModal;
