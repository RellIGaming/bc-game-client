import { useEffect, useMemo, useState } from "react";
import { ChevronDown, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import {useWalletStore} from "@/store/walletStore";
const billTypes = ["Bill", "DEPOSIT", "WITHDRAW", "Swap", "Transfer"];
const assetTypes = ["All Assets", "BTC", "ETH", "USDT", "BC", "SOL"];
const timeFilters = ["Past 24 hours", "Past 7 days", "Past 30 days", "Past 90 days"];
const typeFilters = ["All Type", "Credit", "Debit", "Pending"];

const TransactionSection = () => {
  const [billType, setBillType] = useState("Bill");
  const { transactions, fetchTransactions } = useWalletStore();
  const [assetType, setAssetType] = useState("All Assets");
  const [timeFilter, setTimeFilter] = useState("Past 30 days");
  const [transactionType, setTransactionType] = useState("All Type");
  const [showBillDropdown, setShowBillDropdown] = useState(false);
  const [showAssetDropdown, setShowAssetDropdown] = useState(false);
  const [showTimeDropdown, setShowTimeDropdown] = useState(false);
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);
  const closeAllDropdowns = () => {
    setShowBillDropdown(false);
    setShowAssetDropdown(false);
    setShowTimeDropdown(false);
    setShowTypeDropdown(false);
  };
  console.log(transactions, "transactions")
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 5;

  useEffect(() => {
    fetchTransactions();
  }, []);
  const filteredTransactions = useMemo(() => {
    let data = [...(transactions || [])];

    // Bill Type
    if (billType !== "Bill") {
      data = data.filter((t) => t.type === billType.toUpperCase());
    }

    // Asset
    if (assetType !== "All Assets") {
      data = data.filter((t) => t.currency === assetType);
    }

    // Time filter (FIXED)
    const now = Date.now();

    const timeMap: any = {
      "Past 24 hours": 1,
      "Past 7 days": 7,
      "Past 30 days": 30,
      "Past 90 days": 90,
    };

    const days = timeMap[timeFilter];

    if (days) {
      const cutoff = now - days * 24 * 60 * 60 * 1000;

      data = data.filter(
        (t) => new Date(t.createdAt).getTime() >= cutoff
      );
    }

    // Type filter
    if (transactionType !== "All Type") {
      if (transactionType === "Credit") {
        data = data.filter((t) => t.type === "DEPOSIT");
      }
      if (transactionType === "Debit") {
        data = data.filter((t) => t.type === "WITHDRAW");
      }
      if (transactionType === "Pending") {
        data = data.filter((t) => t.status === "PENDING");
      }
    }

    return data.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() -
        new Date(a.createdAt).getTime()
    );
  }, [transactions, billType, assetType, timeFilter, transactionType]);
  const paginatedTransactions = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    return filteredTransactions.slice(start, end);
  }, [filteredTransactions, page]);

  return (
    <div className="space-y-4">
      {/* Filters Row */}
      <div className="flex flex-wrap gap-3">
        {/* Bill Type Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              closeAllDropdowns();
              setShowBillDropdown(!showBillDropdown);
            }}
            className="flex items-center justify-between gap-8 px-4 py-3 bg-secondary rounded-lg min-w-[140px]"
          >
            <span>{billType}</span>
            <ChevronDown className="w-4 h-4" />
          </button>
          {showBillDropdown && (
            <div className="absolute left-0 top-full mt-2 w-full bg-card border border-border rounded-lg shadow-xl z-20">
              {billTypes.map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    setBillType(item);
                    setShowBillDropdown(false);
                  }}
                  className={cn(
                    "w-full px-4 py-2 text-left hover:bg-secondary/50",
                    billType === item && "bg-secondary"
                  )}
                >
                  {item}
                </button>
              ))}
            </div>
          )}
        </div>
        {/* Asset Type Dropdown */}
        <div className="relative flex-1 min-w-[200px]">
          <button
            onClick={() => {
              closeAllDropdowns();
              setShowAssetDropdown(!showAssetDropdown);
            }}
            className="flex items-center justify-between w-full px-4 py-3 bg-secondary rounded-lg"
          >
            <span>{assetType}</span>
            <ChevronDown className="w-4 h-4" />
          </button>
          {showAssetDropdown && (
            <div className="absolute left-0 top-full mt-2 w-full bg-card border border-border rounded-lg shadow-xl z-20">
              {assetTypes.map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    setAssetType(item);
                    setShowAssetDropdown(false);
                  }}
                  className={cn(
                    "w-full px-4 py-2 text-left hover:bg-secondary/50",
                    assetType === item && "bg-secondary"
                  )}
                >
                  {item}
                </button>
              ))}
            </div>
          )}
        </div>
        {/* Time Filter Dropdown */}
        <div className="relative min-w-[160px]">
          <button
            onClick={() => {
              closeAllDropdowns();
              setShowTimeDropdown(!showTimeDropdown);
            }}
            className="flex items-center justify-between w-full px-4 py-3 bg-secondary rounded-lg"
          >
            <span>{timeFilter}</span>
            <ChevronDown className="w-4 h-4" />
          </button>
          {showTimeDropdown && (
            <div className="absolute left-0 top-full mt-2 w-full bg-card border border-border rounded-lg shadow-xl z-20">
              {timeFilters.map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    setTimeFilter(item);
                    setShowTimeDropdown(false);
                  }}
                  className={cn(
                    "w-full px-4 py-2 text-left hover:bg-secondary/50 whitespace-nowrap",
                    timeFilter === item && "bg-secondary"
                  )}
                >
                  {item}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      {/* Second Row - Type Filter */}
      <div className="flex items-center gap-3">
        <div className="relative min-w-[140px]">
          <button
            onClick={() => {
              closeAllDropdowns();
              setShowTypeDropdown(!showTypeDropdown);
            }}
            className="flex items-center justify-between w-full px-4 py-3 bg-secondary rounded-lg"
          >
            <span>{transactionType}</span>
            <ChevronDown className="w-4 h-4" />
          </button>
          {showTypeDropdown && (
            <div className="absolute left-0 top-full mt-2 w-full bg-card border border-border rounded-lg shadow-xl z-20">
              {typeFilters.map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    setTransactionType(item);
                    setShowTypeDropdown(false);
                  }}
                  className={cn(
                    "w-full px-4 py-2 text-left hover:bg-secondary/50",
                    transactionType === item && "bg-secondary"
                  )}
                >
                  {item}
                </button>
              ))}
            </div>
          )}
        </div>
        <button className="flex items-center gap-2 text-primary text-sm hover:underline">
          <Info className="w-4 h-4" />
          Fiat deposit issues or disputes
        </button>
      </div>
      {/* Table Header */}
      <div className="bg-secondary rounded-lg">
        <div className="grid grid-cols-6 gap-3 px-4 py-3 text-sm font-medium text-muted-foreground">
          <span>Type</span>
          <span>Time</span>
          <span className="text-left">Transaction Id</span>
          <span className="text-right">Amount</span>
          <span className="text-right">Balance</span>
          <span className="text-right">Status</span>
        </div>
      </div>
      {/* Empty State */}
      {paginatedTransactions.length === 0 ? (
        <div className="bg-card rounded-xl p-12 text-center">
          <p className="text-muted-foreground text-lg">
            No transactions found
          </p>

          <div className="flex justify-center gap-3 mt-4">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className="px-3 py-1 bg-secondary rounded disabled:opacity-50"
            >
              Prev
            </button>

            <span className="text-sm text-muted-foreground">
              Page {page}
            </span>

            <button
              disabled={page * PAGE_SIZE >= filteredTransactions.length}
              onClick={() => setPage((p) => p + 1)}
              className="px-3 py-1 bg-secondary rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          {paginatedTransactions.map((tx) => {
            const isCredit = tx.type === "DEPOSIT";

            return (
              <div
                key={tx.id}
                className="grid grid-cols-6 gap-3 px-4 py-3 text-xs bg-card rounded-lg "
              >
                <span className={isCredit ? "text-green-500" : "text-red-500"}>
                  {tx.type}
                </span>

                <span className="text-muted-foreground">
                  {new Date(tx.createdAt).toLocaleString()}
                </span>

                <span
                  className="text-muted-foreground"
                >
                  {tx.txId}
                </span>
                <span
                  className={`text-right font-semibold ${isCredit ? "text-green-500" : "text-red-500"
                    }`}
                >
                  {isCredit ? "+" : "-"}
                  {tx.currency} {Number(tx.amount)}
                </span>

                <span className="text-right text-muted-foreground">
                  {tx.balanceAfter ?? "--"}
                </span>
                <span className={`text-right font-semibold ${tx.status === "COMPLETED"
                  ? "text-green-500"
                  : tx.status === "REJECTED"
                    ? "text-red-500"
                    : tx.status === "PENDING"
                      ? "text-yellow-500"
                      : "text-muted-foreground"
                  }`}>
                  {tx.status ?? "--"}
                </span>
              </div>
            );
          })}

          {/* Pagination */}
          <div className="flex justify-center gap-3 mt-4">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className="px-3 py-1 bg-secondary rounded disabled:opacity-50"
            >
              Prev
            </button>

            <span className="text-sm text-muted-foreground">
              Page {page}
            </span>

            <button
              disabled={page * PAGE_SIZE >= filteredTransactions.length}
              onClick={() => setPage((p) => p + 1)}
              className="px-3 py-1 bg-secondary rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default TransactionSection;