import { useEffect, useMemo, useState } from "react";
import {
  X,
  ArrowLeft,
  Copy,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  RefreshCw,
  ChevronsRight,
  Image as ImageIcon,
  Video,
  FileText,
  Info,
  CheckCircle,
} from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

type Step = "progress" | "transaction" | "speedup" | "success";

type Props = {
  open: boolean;
  onClose: () => void;
  amount?: number;
  currency?: string;
  method?: string;
  methodLogo?: string;
};

/* ------------------------ Shared header ------------------------ */
const StepHeader = ({
  title,
  onBack,
  onClose,
  showBack,
}: {
  title: string;
  onBack?: () => void;
  onClose: () => void;
  showBack: boolean;
}) => (
  <div className="flex items-center justify-between px-5 py-4 border-b border-border bg-secondary/40">
    <div className="flex items-center gap-2 min-w-0">
      {showBack && onBack && (
        <button
          onClick={onBack}
          className="p-1 rounded hover:bg-secondary transition-colors"
          aria-label="Back"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
      )}
      <h3 className="font-bold text-base truncate">{title}</h3>
    </div>
    <button
      onClick={onClose}
      className="p-1 rounded hover:bg-secondary transition-colors"
      aria-label="Close"
    >
      <X className="w-5 h-5 text-muted-foreground" />
    </button>
  </div>
);

/* ------------------------ Step 1: Progress ------------------------ */
const ProgressStep = ({
  amount,
  currency,
  method,
  methodLogo,
  orderId,
  expiresIn,
  createdAt,
  onMadeDeposit,
  onContinue,
}: {
  amount: number;
  currency: string;
  method: string;
  methodLogo?: string;
  orderId: string;
  expiresIn: string;
  createdAt: Date;
  onMadeDeposit: () => void;
  onContinue: () => void;
}) => (
  <div className="p-5 space-y-5">
    <div className="flex flex-col items-center gap-3">
      <div className="w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center">
        <CheckCircle2 className="w-12 h-12 text-emerald-500" />
      </div>
    </div>

    <div className="space-y-3 text-sm">
      <Row label="Payment Method">
        {methodLogo ? (
          <img src={methodLogo} alt={method} className="h-5 object-contain" />
        ) : (
          <span className="font-semibold">{method}</span>
        )}
      </Row>
      <Row label="Order ID">
        <button
          className="flex items-center gap-1 text-foreground"
          onClick={() => {
            navigator.clipboard.writeText(orderId);
            toast.success("Order ID copied");
          }}
        >
          <span className="font-medium">{orderId}</span>
          <Copy className="w-3.5 h-3.5 text-muted-foreground" />
        </button>
      </Row>
      <Row label="Time">
        <span>{createdAt.toLocaleString()}</span>
      </Row>
      <Row label="Expires in">
        <span className="font-semibold">{expiresIn}</span>
      </Row>
      <Row label="Deposit amount">
        <span className="text-emerald-500 font-bold">
          {amount} {currency}
        </span>
      </Row>
    </div>

    <div className="space-y-3 pt-2">
      <Button
        onClick={onMadeDeposit}
        className="w-full bg-emerald-500 hover:bg-emerald-600 text-black font-bold h-12"
      >
        I've Made Deposit
      </Button>
      <Button
        onClick={onContinue}
        variant="secondary"
        className="w-full h-12 font-semibold"
      >
        Continue Deposit Process
      </Button>
    </div>
  </div>
);

const Row = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <div className="flex items-center justify-between gap-3">
    <span className="text-muted-foreground">{label}</span>
    <div className="text-right">{children}</div>
  </div>
);

/* ------------------------ Step 2: Transaction details ------------------------ */
const TransactionStep = ({
  amount,
  currency,
  orderId,
  createdAt,
  onSpeedUp,
  floatingBtn,
  setFloatingBtn,
}: {
  amount: number;
  currency: string;
  orderId: string;
  createdAt: Date;
  onSpeedUp: () => void;
  floatingBtn: boolean;
  setFloatingBtn: (v: boolean) => void;
}) => {
  const [showMore, setShowMore] = useState(false);
  const txid = "20260" + Math.random().toString().slice(2, 7) + "11435";
  const fullOrderId = "F-" + orderId;

  return (
    <div className="p-5 space-y-5">
      {/* Amount header */}
      <div className="flex items-center justify-center gap-2">
        <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-sm">
          ₹
        </div>
        <span className="text-2xl font-bold">
          +{amount} {currency}
        </span>
      </div>

      {/* Details card */}
      <div className="bg-secondary/60 rounded-lg p-4 space-y-3 text-sm">
        <div className="flex justify-end">
          <button
            onClick={() => {
              navigator.clipboard.writeText(
                `Order: ${fullOrderId}\nAmount: ${amount} ${currency}\nTxid: ${txid}`
              );
              toast.success("Details copied");
            }}
            className="text-emerald-500 text-xs font-semibold flex items-center gap-1"
          >
            <Copy className="w-3.5 h-3.5" /> Copy all details
          </button>
        </div>
        <Row label="Status">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-orange-500" />
            <span>Processing</span>
          </span>
        </Row>
        <Row label="Order ID">
          <span className="bg-background/60 px-2 py-0.5 rounded text-xs">
            {fullOrderId}
          </span>
        </Row>
        <Row label="Credited Amount">
          <span>0 {currency}</span>
        </Row>
        <Row label="Order Amount">
          <span>
            {amount} {currency}
          </span>
        </Row>
        <Row label="Txid">
          <span className="bg-background/60 px-2 py-0.5 rounded text-xs">
            {txid.slice(0, 5)}…{txid.slice(-5)}
          </span>
        </Row>
        <Row label="Create on">
          <span>{createdAt.toLocaleString()}</span>
        </Row>

        <div className="flex justify-center pt-1">
          <button
            onClick={() => setShowMore((s) => !s)}
            className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground bg-background/40 px-3 py-1.5 rounded"
          >
            View more
            {showMore ? (
              <ChevronUp className="w-3 h-3" />
            ) : (
              <ChevronDown className="w-3 h-3" />
            )}
          </button>
        </div>
      </div>

      {/* Trust banner */}
      <div className="rounded-lg overflow-hidden bg-gradient-to-r from-orange-500 to-amber-500 p-3 text-white">
        <p className="font-bold text-sm mb-1">⚡ Trust & Compensation</p>
        <p className="text-xs opacity-95">
          • No Arrival in 7 Days? Full Manual Credit!
        </p>
        <p className="text-xs opacity-95">
          • No Arrival in 30 Mins? Get time-out bonus!
        </p>
      </div>

      {/* Order progress */}
      <div className="space-y-3">
        <h4 className="font-semibold">Order Progress</h4>
        <div className="bg-secondary/60 rounded-lg p-3 text-xs text-muted-foreground">
          Tips: {currency} deposit from merchant normally take 5 hour(s) to be
          processed.
        </div>

        <div className="space-y-4 pl-2">
          <ProgressNode
            done
            title="Deposit Order Created"
            time={createdAt}
            description={
              <>
                If you did not complete this transfer, you can continue the
                deposit process{" "}
                <span className="text-emerald-500 underline">here</span>
              </>
            }
          />
          <ProgressNode
            active
            title="3rd Merchant Processing"
            time={createdAt}
            description="This process may take 5 hours."
          />
          <ProgressNode title="Transaction Completed" muted />
        </div>
      </div>

      <Button
        onClick={onSpeedUp}
        className="w-full bg-emerald-500 hover:bg-emerald-600 text-black font-bold h-12"
      >
        Speed Up <ChevronsRight className="w-5 h-5 ml-1" />
      </Button>

      <div className="text-center">
        <button className="text-sm font-semibold underline">
          Rate your experience
        </button>
      </div>

      <div className="flex items-center justify-center gap-3 text-sm">
        <span>Deposit floating button</span>
        <Switch checked={floatingBtn} onCheckedChange={setFloatingBtn} />
      </div>
    </div>
  );
};

const ProgressNode = ({
  title,
  description,
  time,
  done,
  active,
  muted,
}: {
  title: string;
  description?: React.ReactNode;
  time?: Date;
  done?: boolean;
  active?: boolean;
  muted?: boolean;
}) => (
  <div className="flex gap-3">
    <div className="flex flex-col items-center">
      <div
        className={cn(
          "w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold border-2",
          done && "bg-emerald-500/20 border-emerald-500 text-emerald-500",
          active && "bg-emerald-500/20 border-emerald-500 text-emerald-500",
          muted && "bg-secondary border-border text-muted-foreground"
        )}
      >
        {done ? (
          <CheckCircle className="w-4 h-4" />
        ) : active ? (
          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
        ) : (
          "3"
        )}
      </div>
      {!muted && <div className="w-px flex-1 bg-emerald-500/40 mt-1" />}
    </div>
    <div className="flex-1 pb-2">
      <p
        className={cn(
          "font-semibold text-sm",
          muted && "text-muted-foreground"
        )}
      >
        {title}
      </p>
      {description && (
        <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
      )}
      {time && (
        <p className="text-[11px] text-muted-foreground mt-1">
          ⏱ Updated at {time.toLocaleString()}
        </p>
      )}
    </div>
  </div>
);

/* ------------------------ Step 3: Speed up ------------------------ */
const SpeedUpStep = ({
  amount,
  currency,
  orderId,
  createdAt,
  onSubmit,
}: {
  amount: number;
  currency: string;
  orderId: string;
  createdAt: Date;
  onSubmit: () => void;
}) => {
  const [utr, setUtr] = useState("");
  const [pwd, setPwd] = useState("");
  const [msg, setMsg] = useState("");
  const [orderOpen, setOrderOpen] = useState(true);
  const [files, setFiles] = useState<{ shot?: string; vid?: string; bank?: string }>(
    {}
  );

  const upload = (key: "shot" | "vid" | "bank") => {
    setFiles((f) => ({ ...f, [key]: "uploaded.png" }));
    toast.success("File uploaded");
  };

  const canSubmit = utr.trim().length > 0;

  return (
    <div className="p-5 space-y-4">
      <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-3 flex gap-2 text-sm">
        <Info className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
        <p className="text-muted-foreground">
          We strongly recommend you to upload your transfer proof to speed up
          your deposit process.
        </p>
      </div>

      {/* Order details collapsible */}
      <div className="bg-secondary/60 rounded-lg">
        <button
          onClick={() => setOrderOpen((s) => !s)}
          className="w-full flex items-center justify-between p-3"
        >
          <span className="font-semibold">Order Details</span>
          {orderOpen ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </button>
        {orderOpen && (
          <div className="px-3 pb-3 space-y-2 text-sm">
            <Row label="Status:">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-orange-500" />
                Processing
              </span>
            </Row>
            <Row label="Amount:">
              <span className="font-semibold">
                ₹{amount.toLocaleString()}.00
              </span>
            </Row>
            <Row label="OrderId:">
              <span className="bg-background/60 px-2 py-0.5 rounded text-xs flex items-center gap-1">
                F-{orderId}
                <Copy className="w-3 h-3" />
              </span>
            </Row>
            <Row label="Time:">
              <span>{createdAt.toLocaleString()}</span>
            </Row>
          </div>
        )}
      </div>

      <div>
        <p className="font-semibold text-sm">
          Please provide: <span className="text-emerald-500">*</span>
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          A screenshot and a video proof of the payment channel of the
          successful recharge:
        </p>
        <p className="text-[11px] text-muted-foreground">
          (*Image limit 10MB, Video limit 100MB, PDF limit 50MB)
        </p>
      </div>

      <UploadCard
        icon={<ImageIcon className="w-5 h-5" />}
        title="Screenshot of your transfer confirmation"
        uploaded={files.shot}
        onClick={() => upload("shot")}
      />
      <UploadCard
        icon={<Video className="w-5 h-5" />}
        title="Video proof (not screen recording)"
        uploaded={files.vid}
        onClick={() => upload("vid")}
      />
      <UploadCard
        icon={<FileText className="w-5 h-5" />}
        title="Bank statement or transaction record from the past 30 days"
        uploaded={files.bank}
        onClick={() => upload("bank")}
      />

      <div className="space-y-1">
        <label className="text-sm font-semibold">
          Please provide UTR number: <span className="text-emerald-500">*</span>
        </label>
        <input
          value={utr}
          onChange={(e) => setUtr(e.target.value)}
          className="w-full px-3 py-2.5 bg-secondary rounded-md outline-none focus:ring-1 focus:ring-emerald-500"
        />
      </div>

      <div className="space-y-1">
        <label className="text-sm">
          Password of Bank statement file:{" "}
          <span className="text-muted-foreground">(Optional)</span>
        </label>
        <input
          value={pwd}
          onChange={(e) => setPwd(e.target.value)}
          className="w-full px-3 py-2.5 bg-secondary rounded-md outline-none focus:ring-1 focus:ring-emerald-500"
        />
      </div>

      <div className="space-y-1">
        <label className="text-sm">
          Message <span className="text-muted-foreground">(Optional)</span>
        </label>
        <div className="relative">
          <textarea
            value={msg}
            onChange={(e) => setMsg(e.target.value.slice(0, 1000))}
            placeholder="Your message..."
            rows={3}
            className="w-full px-3 py-2.5 bg-secondary rounded-md outline-none focus:ring-1 focus:ring-emerald-500 resize-none"
          />
          <span className="absolute bottom-2 right-3 text-[11px] text-muted-foreground">
            {msg.length}/1000
          </span>
        </div>
      </div>

      <Button
        onClick={onSubmit}
        disabled={!canSubmit}
        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold h-12 disabled:opacity-60"
      >
        Submit
      </Button>
    </div>
  );
};

const UploadCard = ({
  icon,
  title,
  uploaded,
  onClick,
}: {
  icon: React.ReactNode;
  title: string;
  uploaded?: string;
  onClick: () => void;
}) => (
  <div className="bg-secondary/60 rounded-lg p-3 flex items-center gap-3">
    <div className="w-10 h-10 rounded-md bg-background/70 flex items-center justify-center text-muted-foreground shrink-0">
      {icon}
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-sm font-semibold leading-tight">{title}</p>
      <button className="text-emerald-500 text-xs underline">Example</button>
    </div>
    <button
      onClick={onClick}
      className="text-emerald-500 text-sm font-semibold flex items-center gap-1 shrink-0"
    >
      {uploaded ? "Uploaded" : "Upload"}{" "}
      <ChevronsRight className="w-4 h-4" />
    </button>
  </div>
);

/* ------------------------ Step 4: Success ------------------------ */
const SuccessStep = ({ onClose }: { onClose: () => void }) => (
  <div className="p-8 flex flex-col items-center text-center space-y-4">
    <div className="w-20 h-20 rounded-full bg-emerald-500/15 flex items-center justify-center">
      <CheckCircle2 className="w-12 h-12 text-emerald-500" />
    </div>
    <h3 className="text-xl font-bold">Submitted Successfully</h3>
    <p className="text-sm text-muted-foreground max-w-xs">
      Your speed-up request has been received. Our team will review your proof
      and credit your deposit shortly.
    </p>
    <Button
      onClick={onClose}
      className="w-full bg-emerald-500 hover:bg-emerald-600 text-black font-bold h-12 mt-2"
    >
      Done
    </Button>
  </div>
);

/* ------------------------ Container ------------------------ */
const DepositProgressModal = ({
  open,
  onClose,
  amount = 1000,
  currency = "INR",
  method = "UPI",
  methodLogo,
}: Props) => {
  const isMobile = useIsMobile();
  const [step, setStep] = useState<Step>("progress");
  const [floatingBtn, setFloatingBtn] = useState(true);

  const orderId = useMemo(
    () => Math.random().toString().slice(2, 18),
    [open]
  );
  const createdAt = useMemo(() => new Date(), [open]);
  const [expiresIn, setExpiresIn] = useState("01:00:00");

  // Simple countdown when modal is open and on the progress step.
  useEffect(() => {
    if (!open || step !== "progress") return;
    let secs = 60 * 60 - 2;
    setExpiresIn(fmt(secs));
    const id = window.setInterval(() => {
      secs -= 1;
      if (secs < 0) {
        clearInterval(id);
        return;
      }
      setExpiresIn(fmt(secs));
    }, 1000);
    return () => clearInterval(id);
  }, [open, step]);

  // Reset to first step when reopened.
  useEffect(() => {
    if (open) setStep("progress");
  }, [open]);

  const titles: Record<Step, string> = {
    progress: "Deposit is in progress",
    transaction: "Transaction Details",
    speedup: "Speed Up",
    success: "Submitted",
  };

  const back = () => {
    if (step === "transaction") setStep("progress");
    else if (step === "speedup") setStep("transaction");
    else if (step === "success") setStep("speedup");
  };

  const showBack = step !== "progress";

  const body = (
    <div className="flex flex-col h-full max-h-[90vh] sm:max-h-[85vh]">
      <StepHeader
        title={titles[step]}
        showBack={showBack}
        onBack={back}
        onClose={onClose}
      />
      <div className="flex-1 overflow-y-auto">
        {step === "progress" && (
          <ProgressStep
            amount={amount}
            currency={currency}
            method={method}
            methodLogo={methodLogo}
            orderId={orderId}
            expiresIn={expiresIn}
            createdAt={createdAt}
            onMadeDeposit={() => setStep("transaction")}
            onContinue={() => {
              window.open("/payment-gateway", "_blank");
            }}
          />
        )}
        {step === "transaction" && (
          <TransactionStep
            amount={amount}
            currency={currency}
            orderId={orderId}
            createdAt={createdAt}
            onSpeedUp={() => setStep("speedup")}
            floatingBtn={floatingBtn}
            setFloatingBtn={setFloatingBtn}
          />
        )}
        {step === "speedup" && (
          <SpeedUpStep
            amount={amount}
            currency={currency}
            orderId={orderId}
            createdAt={createdAt}
            onSubmit={() => setStep("success")}
          />
        )}
        {step === "success" && <SuccessStep onClose={onClose} />}
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <Sheet open={open} onOpenChange={(v) => !v && onClose()}>
        <SheetContent
          side="right"
          className="w-full sm:max-w-md p-0 overflow-hidden"
        >
          {body}
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-md p-0 overflow-hidden gap-0">
        {body}
      </DialogContent>
    </Dialog>
  );
};

function fmt(s: number) {
  const h = Math.floor(s / 3600)
    .toString()
    .padStart(2, "0");
  const m = Math.floor((s % 3600) / 60)
    .toString()
    .padStart(2, "0");
  const sec = (s % 60).toString().padStart(2, "0");
  return `${h}:${m}:${sec}`;
}

export default DepositProgressModal;
