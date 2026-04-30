import { useEffect, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { X, Edit2, ArrowLeft, ChevronRight, Heart, Lock } from "lucide-react";
import useAuthStore from "@/store/authStore";
import { toast } from "sonner";

interface MyProfileModalProps {
    open: boolean;
    onClose: () => void;
}

const EditProfileModal = ({
    open,
    onClose,
    selectedFrame,
    onSave,
}: {
    open: boolean;
    onClose: () => void;
    username: string;
    selectedFrame: number;
    onSave: (username: string, frame: number) => void;
}) => {
    const isMobile = useIsMobile();
    const { user, fetchProfile, updateProfile } = useAuthStore();
    // const [username, setUsername] = useState(user?.username || "");
    const [localUsername, setLocalUsername] = useState(user?.username || "");
    const [localFrame, setLocalFrame] = useState(selectedFrame);
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    // Fetch profile on open
    useEffect(() => {
        if (!open) return;
        const loadProfile = async () => {
            setLoading(true);
            try {
                await fetchProfile();
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        loadProfile();
    }, [open, fetchProfile]);
    // Sync local state when user changes
    useEffect(() => {
        if (user) {
            setLocalUsername(user.username);
        }
    }, [user]);

    const handleSave = async () => {
        setLoading(true);
        try {
            await updateProfile({
                username: localUsername,
                file: file || undefined,
            });

            await fetchProfile();

            // ✅ UPDATE FRAME IN PARENT
            onSave(localUsername, localFrame);

            // ✅ SUCCESS MESSAGE
            toast.success("Profile updated successfully ✅");

            onClose();
        } catch (err) {
            console.error(err);
            alert("Update failed ❌");
        } finally {
            setLoading(false);
        }
    };

    const content = (
        <div className="space-y-5">
            {/* Avatar */}
            <div className="flex justify-center">
                <div
                    className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center text-4xl relative
    ${localFrame === 1
                            ? "ring-4 ring-yellow-400"
                            : localFrame === 2
                                ? "ring-4 ring-blue-500"
                                : localFrame === 3
                                    ? "ring-4 ring-pink-500"
                                    : ""
                        }
    bg-gradient-to-br from-yellow-400 to-orange-500`}
                >{user?.profileImage ? (
                    <img
                        src={`https://bc-game-server.onrender.com${user.profileImage}?t=${Date.now()}`}
                        alt="Profile"
                        className="w-20 h-20 rounded-full object-cover"
                    />
                ) : (
                    "🦖"
                )}
                </div>
            </div>

            <p className="text-center text-accent text-sm font-medium">
                Click frame below to change
            </p>

            {/* Username */}
            <div>
                <label className="text-sm text-muted-foreground">Username</label>
                <input
                    value={localUsername}
                    onChange={(e) => setLocalUsername(e.target.value)}
                    className="w-full mt-1 bg-background border border-border rounded-lg px-3 py-2.5 text-foreground"
                />
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                        if (e.target.files?.[0]) {
                            setFile(e.target.files[0]);
                        }
                    }}
                />
                <p className="text-xs text-muted-foreground mt-1">
                    Do not use special symbols.
                </p>
            </div>

            {/* Avatar Frame */}
            <div>
                <label className="text-sm text-muted-foreground">Avatar Frame</label>
                <div className="flex gap-3 mt-2 flex-wrap">
                    {[0, 1, 2, 3, 4, 5].map((i) => (
                        <div
                            key={i}
                            onClick={() => setLocalFrame(i)}
                            className={`w-12 h-12 rounded-full border-2 flex items-center justify-center cursor-pointer transition
              ${localFrame === i
                                    ? "border-accent scale-110"
                                    : "border-border"
                                }`}
                        >
                            {i === 0 ? (
                                <span className="text-[9px] text-center leading-tight">
                                    No Frame
                                </span>
                            ) : (
                                <div
                                    className={`w-6 h-6 rounded-full ${i === 1
                                        ? "bg-yellow-400"
                                        : i === 2
                                            ? "bg-blue-500"
                                            : i === 3
                                                ? "bg-pink-500"
                                                : i === 4
                                                    ? "bg-green-500"
                                                    : "bg-purple-500"
                                        }`}
                                />
                            )}
                        </div>
                    ))}
                </div>
            </div>
            <div className="bg-background rounded-lg p-3 text-center">
                <p className="text-xs text-muted-foreground flex items-center justify-center gap-1">💰 Balance</p>
                <p className="text-lg font-bold text-foreground">₹{user?.balance ? Number(user.balance).toFixed(2) : "0.00"}</p>
            </div>
            {/* Save */}
            <button
                onClick={handleSave}
                className="w-full bg-accent hover:bg-accent/80 text-accent-foreground py-3 rounded-lg font-semibold"
            >
                Save
            </button>
        </div>
    );

    if (isMobile) {
        return (
            <Sheet open={open} onOpenChange={(v) => !v && onClose()}>
                <SheetContent className="w-full sm:max-w-md bg-card border-border p-0 overflow-y-auto">
                    <div className="p-4">{content}</div>
                </SheetContent>
            </Sheet>
        );
    }

    return (
        <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
            <DialogContent className="bg-card border-border max-w-sm p-0 overflow-hidden">
                <div className="p-4">{content}</div>
            </DialogContent>
        </Dialog>
    );
};

const medals = ["🏆", "🥇", "🎖️", "🏅", "🎗️", "⭐", "🌟", "💎"];

const MyProfileModal = ({ open, onClose }: MyProfileModalProps) => {
    const isMobile = useIsMobile();
    const [editOpen, setEditOpen] = useState(false);
    const { user } = useAuthStore();
    const [selectedFrame, setSelectedFrame] = useState<number>(0);


    useEffect(() => {
        const savedFrame = localStorage.getItem("frame");
        if (savedFrame) setSelectedFrame(Number(savedFrame));
    }, []);

    const handleFrameSave = (frame: number) => {
        setSelectedFrame(frame);
        localStorage.setItem("frame", frame.toString());
    };
    const content = (
        <div className="space-y-4">
            {/* Header */}
            <div className="text-center pt-2">
                <div className="flex items-end float-right px-2">
                    {/* <div className="flex items-center gap-1"><Heart className="w-4 h-4 text-destructive" /> <span className="text-sm text-foreground">0</span></div> */}
                    <button onClick={() => setEditOpen(true)} className="p-1.5 hover:bg-secondary rounded-lg"><Edit2 className="w-4 h-4 text-muted-foreground" /></button>
                </div>
                <div
                    className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center text-4xl relative
  ${selectedFrame === 1
                            ? "ring-4 ring-yellow-400"
                            : selectedFrame === 2
                                ? "ring-4 ring-blue-500"
                                : selectedFrame === 3
                                    ? "ring-4 ring-pink-500"
                                    : ""
                        }
  bg-gradient-to-br from-yellow-400 to-orange-500`}
                >
                    {user?.profileImage ? (
                        <img
                            src={`https://bc-game-server.onrender.com${user.profileImage}?t=${Date.now()}`}
                            className="w-20 h-20 rounded-full object-cover"
                        />
                    ) : (
                        "🦖"
                    )}
                </div>
                <h3 className="font-bold text-foreground mt-3">{user?.username}</h3>
                <p className="text-xs text-muted-foreground">User ID: {user?.id || "N/A"}</p>
            </div>

            {/* Medals */}
            {/* <div className="bg-secondary/50 rounded-lg p-3">
        <div className="flex items-center justify-between mb-2">
          <h4 className="font-semibold text-foreground text-sm flex items-center gap-1">🏅 Medals 0</h4>
          <span className="text-accent text-xs cursor-pointer">Details ›</span>
        </div>
        <div className="flex gap-2 overflow-x-auto scrollbar-none">
          {medals.map((m, i) => (
            <div key={i} className="w-10 h-10 rounded-lg bg-background flex items-center justify-center text-lg shrink-0">{m}</div>
          ))}
        </div>
      </div> */}

            {/* Statistics */}
            <div className="bg-secondary/50 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-foreground text-sm flex items-center gap-1">📊 Statistics</h4>
                    <span className="text-accent text-xs cursor-pointer">Details ›</span>
                </div>
                <div className="grid grid-cols-2 gap-2 mb-2">
                    <div className="bg-background rounded-lg p-3 text-center">
                        <p className="text-xs text-muted-foreground flex items-center justify-center gap-1">🏆 Total Wins</p>
                        <p className="text-lg font-bold text-foreground">0</p>
                    </div>
                    <div className="bg-background rounded-lg p-3 text-center">
                        <p className="text-xs text-muted-foreground flex items-center justify-center gap-1">🎲 Total Bet Counts</p>
                        <p className="text-lg font-bold text-foreground">0</p>
                    </div>
                </div>
                <div className="bg-background rounded-lg p-3 text-center">
                    <p className="text-xs text-muted-foreground flex items-center justify-center gap-1">💰 Total Wagered</p>
                    <p className="text-lg font-bold text-foreground">₹0.00</p>
                </div>
                <div className="bg-background rounded-lg p-3 mt-2">
                    <p className="text-md text-left">Top 3 Favorite Games</p>
                    <div className="pt-4">

                    </div>
                </div>
            </div>

            <EditProfileModal
                open={editOpen}
                onClose={() => setEditOpen(false)}
                username={user?.username}
                selectedFrame={selectedFrame}
                onSave={(_, newFrame) => {
                    handleFrameSave(newFrame);
                }}
            />
        </div>
    );

    if (isMobile) {
        return (
            <Sheet open={open} onOpenChange={(v) => !v && onClose()}>
                <SheetContent side="right" className="w-full sm:max-w-sm bg-card border-border p-0 overflow-y-auto">
                    <div className="flex items-center justify-between p-4 border-b border-border">
                        <h3 className="font-semibold text-foreground mx-auto">My Profile</h3>
                        <button onClick={onClose}><X className="w-5 h-5 text-muted-foreground" /></button>
                    </div>
                    <div className="p-4">{content}</div>
                </SheetContent>
            </Sheet>
        );
    }

    return (
        <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
            <DialogContent className="bg-card border-border max-w-sm p-0 overflow-hidden">
                <div className="flex items-center justify-center p-4 border-b border-border">
                    <span />
                    <h3 className="font-semibold text-foreground">My Profile</h3>
                    {/* <button onClick={onClose}><X className="w-5 h-5 text-muted-foreground" /></button> */}
                </div>
                <div className="p-4">{content}</div>
            </DialogContent>
        </Dialog>
    );
};

export default MyProfileModal;
