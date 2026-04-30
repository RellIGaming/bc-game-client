import { useEffect, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import {
    User, Shield, Settings2, FileCheck, CreditCard, ListChecks,
    ChevronLeft, Lock, Mail, Phone, Smartphone, Key, ShieldAlert,
    AlertCircle, Moon, Sun, Globe, Eye, EyeOff, Bell, ChevronRight,
    Plus, Edit2, X, ArrowLeft
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import useAuthStore from "@/store/authStore";

const tabs = [
    { id: "account", label: "Account Info", icon: User, badge: false },
    { id: "security", label: "Security", icon: Shield, badge: true },
    { id: "preferences", label: "Preferences", icon: Settings2, badge: false },
    { id: "verification", label: "Personal Verification", icon: FileCheck, badge: false },
    { id: "payment", label: "Payment Methods", icon: CreditCard, badge: false },
    { id: "whitelist", label: "Whitelist Management", icon: ListChecks, badge: false },
];

// Responsive modal wrapper
const ResponsiveModal = ({ open, onClose, children, title }: { open: boolean; onClose: () => void; children: React.ReactNode; title?: string }) => {
    const isMobile = useIsMobile();
    if (isMobile) {
        return (
            <Sheet open={open} onOpenChange={(v) => !v && onClose()}>
                <SheetContent side="right" className="w-full sm:max-w-md bg-card border-border p-0 overflow-y-auto">
                    <div className="flex items-center gap-3 p-4 border-b border-border">
                        <button onClick={onClose}><ArrowLeft className="w-5 h-5 text-muted-foreground" /></button>
                        {title && <h3 className="font-semibold text-foreground">{title}</h3>}
                    </div>
                    <div className="p-4">{children}</div>
                </SheetContent>
            </Sheet>
        );
    }
    return (
        <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
            <DialogContent className="bg-card border-border max-w-md">
                {title && <h3 className="font-semibold text-lg text-foreground mb-4">{title}</h3>}
                {children}
            </DialogContent>
        </Dialog>
    );
};

// Account Info Tab
const AccountInfoTab = ({
    username,
    selectedFrame,
    setUsername,
}: {
    username: string;
    selectedFrame: number;
    setUsername: React.Dispatch<React.SetStateAction<string>>;
}) => {
    const { user, updateProfile, loading } = useAuthStore();
    const [editModal, setEditModal] = useState(false);
    const [emailModal, setEmailModal] = useState(false);
    const [phoneModal, setPhoneModal] = useState(false);
    const [editUsername, setEditUsername] = useState(user?.username || "");


    const connections = [
        { name: "Cwallet", icon: "🔗", connected: false },
        { name: "Google", icon: "G", connected: false },
        { name: "Telegram", icon: "✈", connected: false },
        { name: "Line", icon: "🟢", connected: false },
        { name: "Twitter", icon: "𝕏", connected: false },
        { name: "Steam", icon: "🎮", connected: false },
    ];
    const handleSave = async () => {
        await updateProfile({ username: editUsername });
        setEditModal(false);
    };
    useEffect(() => {
        if (user) {
            setEditUsername(user.username)
        }
    }, [user])
    return (
        <div className="space-y-4">
            {/* Profile Info */}
            <div className="bg-secondary/50 rounded-lg p-4">
                <h3 className="font-semibold text-foreground mb-3 
    border-l-2 border-accent 
        pl-2">Profile Info</h3>
                <div className="flex items-center gap-3">
                    <div
                        className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl
    ${selectedFrame === 1
                                ? "ring-4 ring-yellow-400"
                                : selectedFrame === 2
                                    ? "ring-4 ring-blue-500"
                                    : selectedFrame === 3
                                        ? "ring-4 ring-pink-500"
                                        : ""
                            }
    bg-gradient-to-br from-orange-400 to-red-500`}
                    >
                        🦖
                    </div>          <div>
                        <p className="font-semibold text-foreground">{user?.username}</p>
                        <p className="text-sm text-muted-foreground">User ID: {user?.id}</p>
                    </div>
                    <button onClick={() => { setEditUsername(username); setEditModal(true); }} className="ml-auto p-2 hover:bg-secondary rounded-lg">
                        <Edit2 className="w-4 h-4 text-muted-foreground" />
                    </button>
                </div>
            </div>

            {/* Contact Info */}
            <div className="bg-secondary/50 rounded-lg p-4">
                <h3 className="font-semibold text-foreground mb-3 border-l-2 border-accent pl-2">Contact Info</h3>
                <div className="space-y-4">
                    <div>
                        <p className="text-sm text-muted-foreground mb-1">E-mail Verification</p>
                        <div className="flex items-center justify-between">
                            <p className="text-foreground">{user?.email || "Not verified"}</p>
                            <button onClick={() => setEmailModal(true)} className="text-accent text-sm hover:underline">Verify</button>
                        </div>
                    </div>
                    <div>
                        <p className="text-sm text-muted-foreground mb-1">Phone Number</p>
                        <p className="text-sm text-muted-foreground">Verify your phone number and you can use the phone as your second login method.{user?.phone || "Not added"}</p>
                        <button onClick={() => setPhoneModal(true)} className="mt-2 text-accent text-sm hover:underline">Add Phone</button>
                    </div>
                </div>
            </div>

            {/* Account Connections */}
            <div className="bg-secondary/50 rounded-lg p-4">
                <h3 className="font-semibold text-foreground mb-3 border-l-2 border-accent pl-2">Account Connections</h3>
                <div className="space-y-3">
                    {connections.map((conn) => (
                        <div key={conn.name} className="flex items-center justify-between py-2">
                            <div className="flex items-center gap-3">
                                <span className="text-lg">{conn.icon}</span>
                                <div>
                                    <p className="font-medium text-foreground">{conn.name}</p>
                                    <p className="text-xs text-muted-foreground">Not Connected</p>
                                </div>
                            </div>
                            <button className="bg-accent hover:bg-accent/80 text-accent-foreground px-4 py-1.5 rounded-lg text-sm font-medium transition-colors">
                                Connect
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Edit Username Modal */}
            <ResponsiveModal open={editModal} onClose={() => setEditModal(false)} title="Edit Profile">
                <div className="space-y-4">
                    <div className="flex justify-center">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-4xl">🦖</div>
                    </div>
                    <p className="text-center text-accent text-sm cursor-pointer">Edit Your Avatar</p>
                    <div>
                        <label className="text-sm text-muted-foreground">Username</label>
                        <input value={editUsername} onChange={(e) => setEditUsername(e.target.value)} className="w-full mt-1 bg-background border border-border rounded-lg px-3 py-2 text-foreground" />
                        <p className="text-xs text-muted-foreground mt-1">Do not use special symbols, otherwise your account may not be supported.</p>
                    </div>
                    <div>
                        <label className="text-sm text-muted-foreground">Avatar Frame</label>
                        <div className="flex gap-2 mt-2 flex-wrap">
                            {["Not used", "🔴", "🔵", "🟣", "🟠", "🟤"].map((f, i) => (
                                <div key={i} className={cn("w-12 h-12 rounded-full border-2 flex items-center justify-center cursor-pointer text-xs", i === 0 ? "border-accent text-accent" : "border-border text-muted-foreground")}>
                                    {i === 0 ? <span className="text-[10px]">Not used<br /><span className="text-accent text-[9px]">In use</span></span> : <Lock className="w-4 h-4" />}
                                </div>
                            ))}
                        </div>
                    </div>
                    <button
                        onClick={handleSave}
                        className="w-full bg-accent hover:bg-accent/80 text-accent-foreground py-3 rounded-lg font-semibold"
                    >
                        Save
                    </button>                </div>
            </ResponsiveModal>

            {/* Email Verify Modal */}
            <ResponsiveModal open={emailModal} onClose={() => setEmailModal(false)} title="Email Verification">
                <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">A verification code will be sent to your email address.</p>
                    <input placeholder="Enter verification code" className="w-full bg-background border border-border rounded-lg px-3 py-2 text-foreground" />
                    <button className="w-full bg-accent hover:bg-accent/80 text-accent-foreground py-3 rounded-lg font-semibold">Send Code</button>
                </div>
            </ResponsiveModal>

            {/* Phone Modal */}
            <ResponsiveModal open={phoneModal} onClose={() => setPhoneModal(false)} title="Phone Verification">
                <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">Add your phone number for additional security.</p>
                    <input placeholder="Enter phone number" className="w-full bg-background border border-border rounded-lg px-3 py-2 text-foreground" />
                    <button className="w-full bg-accent hover:bg-accent/80 text-accent-foreground py-3 rounded-lg font-semibold">Verify Phone</button>
                </div>
            </ResponsiveModal>
        </div>
    );
};

// Security Tab
const SecurityTab = () => {
    const [activeModal, setActiveModal] = useState<string | null>(null);

    const securityItems = [
        { id: "password", icon: Lock, title: "Change Password", desc: "Change your password regularly to keep it unique and secure.", btn: "Change Password", status: "done" },
        { id: "email", icon: Mail, title: "Email Verification", desc: "Verify your email address is valid and accessible by you.", btn: "Verify Email", status: "warn" },
        { id: "phone", icon: Phone, title: "Phone Number Verification", desc: "Verify your phone number is valid and accessible by you.", btn: "Verify Phone Number", status: "warn" },
        { id: "2fa", icon: Smartphone, title: "Two-factor authentication", desc: "Enable Two-factor to protect your account from unauthorized access.", btn: "Enable 2FA", status: "warn" },
        { id: "passkey", icon: Key, title: "Passkey", desc: "Using passkey to protect your account from unauthorized access.", btn: "Enable Passkey", status: "warn" },
        { id: "phishing", icon: ShieldAlert, title: "Anti-Phishing Code", desc: "This feature helps you verify the authenticity of communications from BC.GAME", btn: "Enable Anti-Phishing Code", status: "warn" },
    ];

    const sessions = [
        { device: "Windows 10 (Chrome 14)", location: "IN", ip: "146.196.47.103", lastUsed: "Online", action: "In Use" },
        { device: "Mac OS X (iPhone) (Mobile Safari)", location: "IN", ip: "103.175.63.106", lastUsed: "2/19/2026", action: "Remove" },
        { device: "Windows 10 (Chrome 14)", location: "IN", ip: "103.175.63.106", lastUsed: "2/19/2026", action: "Remove" },
        { device: "Windows 10 (Chrome 14)", location: "IN", ip: "103.175.168.107", lastUsed: "2/19/2026", action: "Remove" },
        { device: "Windows 10 (Chrome 14)", location: "IN", ip: "160.238.93.51", lastUsed: "2/19/2026", action: "Remove" },
    ];

    return (
        <div className="space-y-4">
            <div className="bg-secondary/50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-foreground border-l-2 border-accent pl-2">Security Setup</h3>
                    <span className="px-3 py-1 bg-orange-500/20 text-orange-400 rounded-full text-xs font-medium">Weak</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {securityItems.map((item) => (
                        <div key={item.id} className="bg-background/50 rounded-lg p-4 relative">
                            <div className="absolute top-3 right-3">
                                {item.status === "done" ? (
                                    <div className="w-5 h-5 rounded-full bg-accent flex items-center justify-center text-white text-xs">✓</div>
                                ) : (
                                    <AlertCircle className="w-5 h-5 text-orange-400" />
                                )}
                            </div>
                            <item.icon className="w-6 h-6 text-muted-foreground mb-2" />
                            <h4 className="font-semibold text-foreground text-sm">{item.title}</h4>
                            <p className="text-xs text-muted-foreground mt-1 mb-3">{item.desc}</p>
                            <button onClick={() => setActiveModal(item.id)} className={cn("w-full py-2 rounded-lg text-sm font-medium transition-colors", item.status === "done" ? "bg-secondary text-foreground hover:bg-secondary/80" : "bg-accent text-accent-foreground hover:bg-accent/80")}>
                                {item.btn}
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Sessions */}
            <div className="bg-secondary/50 rounded-lg p-4">
                <h3 className="font-semibold text-foreground mb-3 border-l-2 border-accent pl-2">Sessions</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="text-muted-foreground border-b border-border">
                                <th className="text-left py-2 font-medium">Device</th>
                                <th className="text-left py-2 font-medium hidden md:table-cell">Location</th>
                                <th className="text-left py-2 font-medium hidden md:table-cell">IP Address</th>
                                <th className="text-left py-2 font-medium">Last Used</th>
                                <th className="text-left py-2 font-medium">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sessions.map((s, i) => (
                                <tr key={i} className="border-b border-border/50">
                                    <td className="py-2 text-foreground flex items-center gap-2">
                                        <span className={cn("w-2 h-2 rounded-full", s.action === "In Use" ? "bg-accent" : "bg-muted-foreground")} />
                                        <span className="text-xs md:text-sm">{s.device}</span>
                                    </td>
                                    <td className="py-2 text-muted-foreground hidden md:table-cell">{s.location}</td>
                                    <td className="py-2 text-muted-foreground hidden md:table-cell">{s.ip}</td>
                                    <td className="py-2 text-muted-foreground text-xs">{s.lastUsed === "Online" ? <span className="text-accent">Online</span> : s.lastUsed}</td>
                                    <td className="py-2">{s.action === "In Use" ? <span className="text-muted-foreground text-xs">In Use</span> : <button className="text-destructive text-xs hover:underline">Remove</button>}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Security Modals */}
            <ResponsiveModal open={activeModal === "password"} onClose={() => setActiveModal(null)} title="Change Password">
                <div className="space-y-4">
                    <input type="password" placeholder="Current Password" className="w-full bg-background border border-border rounded-lg px-3 py-2 text-foreground" />
                    <input type="password" placeholder="New Password" className="w-full bg-background border border-border rounded-lg px-3 py-2 text-foreground" />
                    <input type="password" placeholder="Confirm New Password" className="w-full bg-background border border-border rounded-lg px-3 py-2 text-foreground" />
                    <button className="w-full bg-accent hover:bg-accent/80 text-accent-foreground py-3 rounded-lg font-semibold">Update Password</button>
                </div>
            </ResponsiveModal>
            <ResponsiveModal open={activeModal === "email"} onClose={() => setActiveModal(null)} title="Email Verification">
                <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">We'll send a verification code to your email.</p>
                    <input placeholder="Enter code" className="w-full bg-background border border-border rounded-lg px-3 py-2 text-foreground" />
                    <button className="w-full bg-accent hover:bg-accent/80 text-accent-foreground py-3 rounded-lg font-semibold">Verify</button>
                </div>
            </ResponsiveModal>
            <ResponsiveModal open={activeModal === "phone"} onClose={() => setActiveModal(null)} title="Phone Verification">
                <div className="space-y-4">
                    <input placeholder="Phone number" className="w-full bg-background border border-border rounded-lg px-3 py-2 text-foreground" />
                    <input placeholder="Verification code" className="w-full bg-background border border-border rounded-lg px-3 py-2 text-foreground" />
                    <button className="w-full bg-accent hover:bg-accent/80 text-accent-foreground py-3 rounded-lg font-semibold">Verify</button>
                </div>
            </ResponsiveModal>
            <ResponsiveModal open={activeModal === "2fa"} onClose={() => setActiveModal(null)} title="Two-Factor Authentication">
                <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">Scan the QR code with your authenticator app.</p>
                    <div className="w-40 h-40 mx-auto bg-secondary rounded-lg flex items-center justify-center text-muted-foreground">QR Code</div>
                    <input placeholder="Enter 2FA code" className="w-full bg-background border border-border rounded-lg px-3 py-2 text-foreground" />
                    <button className="w-full bg-accent hover:bg-accent/80 text-accent-foreground py-3 rounded-lg font-semibold">Enable 2FA</button>
                </div>
            </ResponsiveModal>
            <ResponsiveModal open={activeModal === "passkey"} onClose={() => setActiveModal(null)} title="Enable Passkey">
                <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">Passkeys provide a more secure way to sign in without passwords.</p>
                    <button className="w-full bg-accent hover:bg-accent/80 text-accent-foreground py-3 rounded-lg font-semibold">Setup Passkey</button>
                </div>
            </ResponsiveModal>
            <ResponsiveModal open={activeModal === "phishing"} onClose={() => setActiveModal(null)} title="Anti-Phishing Code">
                <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">Set a code that will appear in all official emails from us.</p>
                    <input placeholder="Enter anti-phishing code" className="w-full bg-background border border-border rounded-lg px-3 py-2 text-foreground" />
                    <button className="w-full bg-accent hover:bg-accent/80 text-accent-foreground py-3 rounded-lg font-semibold">Enable</button>
                </div>
            </ResponsiveModal>
        </div>
    );
};

// Preferences Tab
const PreferencesTab = () => {
    const [prefs, setPrefs] = useState({
        showFullName: false, hideGaming: false, hideUsername: false, refuseTip: false,
        maxProfit: true, depositEmail: true, withdrawEmail: true, marketingEmail: true, marketingSms: true,
    });

    const toggle = (key: keyof typeof prefs) => setPrefs(p => ({ ...p, [key]: !p[key] }));

    return (
        <div className="space-y-4">
            <div className="bg-secondary/50 rounded-lg p-4">
                <h3 className="font-semibold text-foreground mb-3 border-l-2 border-accent pl-2">Account Preferences</h3>
                <div className="space-y-4">
                    <div className="flex items-center justify-between"><span className="text-sm text-foreground">View in currency</span><span className="flex items-center gap-1 text-sm text-muted-foreground">৳ BDT <Edit2 className="w-3 h-3" /></span></div>
                    <div className="flex items-center justify-between"><span className="text-sm text-foreground">Change Language</span><span className="flex items-center gap-1 text-sm text-muted-foreground">English <Edit2 className="w-3 h-3" /></span></div>
                    <div className="flex items-center justify-between"><span className="text-sm text-foreground">Show full name of currency in Crypto list</span><Switch checked={prefs.showFullName} onCheckedChange={() => toggle("showFullName")} /></div>
                    <div className="flex items-center justify-between"><span className="text-sm text-foreground">Display mode</span><div className="flex gap-1 bg-background rounded-lg p-1"><button className="p-1.5 rounded bg-secondary"><Moon className="w-4 h-4" /></button><button className="p-1.5 rounded"><Sun className="w-4 h-4 text-muted-foreground" /></button></div></div>
                </div>
            </div>
            <div className="bg-secondary/50 rounded-lg p-4">
                <h3 className="font-semibold text-foreground mb-3 border-l-2 border-accent pl-2">Privacy Preferences</h3>
                <div className="space-y-4">
                    <div className="flex items-center justify-between"><span className="text-sm text-foreground">Hide my gaming data on profile</span><Switch checked={prefs.hideGaming} onCheckedChange={() => toggle("hideGaming")} /></div>
                    <div className="flex items-center justify-between"><span className="text-sm text-foreground">Hide my username from public lists</span><Switch checked={prefs.hideUsername} onCheckedChange={() => toggle("hideUsername")} /></div>
                    <div className="flex items-center justify-between"><span className="text-sm text-foreground">Refuse tip from strangers</span><Switch checked={prefs.refuseTip} onCheckedChange={() => toggle("refuseTip")} /></div>
                    <div className="flex items-center justify-between"><span className="text-sm text-foreground">Max profit alert</span><Switch checked={prefs.maxProfit} onCheckedChange={() => toggle("maxProfit")} /></div>
                </div>
            </div>
            <div className="bg-secondary/50 rounded-lg p-4">
                <h3 className="font-semibold text-foreground mb-3 border-l-2 border-accent pl-2">Email Notifications</h3>
                <div className="space-y-4">
                    <div className="flex items-center justify-between"><span className="text-sm text-foreground">Receive deposit successful email</span><Switch checked={prefs.depositEmail} onCheckedChange={() => toggle("depositEmail")} /></div>
                    <div className="flex items-center justify-between"><span className="text-sm text-foreground">Receive withdraw successful email</span><Switch checked={prefs.withdrawEmail} onCheckedChange={() => toggle("withdrawEmail")} /></div>
                </div>
            </div>
            <div className="bg-secondary/50 rounded-lg p-4">
                <h3 className="font-semibold text-foreground mb-3 border-l-2 border-accent pl-2">Marketing</h3>
                <div className="space-y-4">
                    <div className="flex items-center justify-between"><span className="text-sm text-foreground">Receive marketing promotions by Email</span><Switch checked={prefs.marketingEmail} onCheckedChange={() => toggle("marketingEmail")} /></div>
                    <div className="flex items-center justify-between"><span className="text-sm text-foreground">Receive marketing promotions by SMS</span><Switch checked={prefs.marketingSms} onCheckedChange={() => toggle("marketingSms")} /></div>
                </div>
            </div>
        </div>
    );
};

// Personal Verification Tab
const PersonalVerificationTab = () => (
    <div className="space-y-4">
        <div className="bg-secondary/50 rounded-lg p-4">
            <h3 className="font-semibold text-foreground mb-4 border-l-2 border-accent pl-2">Personal Verification</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-background/50 rounded-lg p-4 text-center">
                    <h4 className="font-semibold text-foreground mb-3">Basic Verification</h4>
                    <div className="space-y-2 text-sm text-muted-foreground text-left">
                        <p className="flex items-center gap-2"><FileCheck className="w-4 h-4 text-accent" /> Personal Information</p>
                        <p className="flex items-center gap-2"><User className="w-4 h-4 text-accent" /> Facial Verification</p>
                        <p className="flex items-center gap-2"><CreditCard className="w-4 h-4 text-accent" /> Government ID</p>
                    </div>
                    <div className="mt-4 bg-secondary rounded-lg p-3 flex items-center justify-between">
                        <div className="text-left">
                            <p className="text-sm font-medium text-foreground flex items-center gap-1"><FileCheck className="w-4 h-4" /> Start New Verification</p>
                            <p className="text-xs text-muted-foreground">Submit new identity documents</p>
                        </div>
                        <span className="text-accent text-sm font-medium">Go ›</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">Review time: Few mins</p>
                </div>
                <div className="bg-background/50 rounded-lg p-4 text-center">
                    <h4 className="font-semibold text-foreground mb-3">Advanced Verification</h4>
                    <div className="space-y-2 text-sm text-muted-foreground text-left">
                        <p className="flex items-center gap-2"><FileCheck className="w-4 h-4 text-accent" /> Personal Information</p>
                        <p className="flex items-center gap-2"><Globe className="w-4 h-4 text-accent" /> Proof of Address</p>
                        <p className="flex items-center gap-2"><Smartphone className="w-4 h-4 text-accent" /> Video verification</p>
                    </div>
                    <div className="mt-4 bg-secondary rounded-lg p-3 flex items-center justify-between">
                        <div className="text-left">
                            <p className="text-sm font-medium text-foreground flex items-center gap-1"><FileCheck className="w-4 h-4" /> Start New Verification</p>
                            <p className="text-xs text-muted-foreground">Submit new identity documents</p>
                        </div>
                        <span className="text-accent text-sm font-medium">Go ›</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">Review time: 10d</p>
                </div>
            </div>
            <div className="mt-4 bg-orange-500/10 border border-orange-500/30 rounded-lg p-3 flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
                <p className="text-xs text-muted-foreground">To serve you better we ask that you provide original identifying documents. This will secure your account in cases of account recovery. It also helps to ensure that the gifts or actual rewards you receive are sent to the correct location.</p>
            </div>
        </div>
    </div>
);

// Payment Methods Tab
const PaymentMethodsTab = () => {
    const [cardTab, setCardTab] = useState("all");
    return (
        <div className="space-y-4">
            <div className="bg-secondary/50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex gap-4">
                        {["All Cards", "Credit Cards", "Debit Cards"].map(t => (
                            <button key={t} onClick={() => setCardTab(t.toLowerCase())} className={cn("text-sm pb-1", cardTab === t.toLowerCase() ? "text-foreground border-b-2 border-accent font-medium" : "text-muted-foreground")}>
                                {t}
                            </button>
                        ))}
                    </div>
                    <button className="flex items-center gap-1 text-accent text-sm font-medium"><Plus className="w-4 h-4" /> Add New Method</button>
                </div>
                <div className="bg-background/50 rounded-lg p-4 text-center">
                    <p className="text-muted-foreground text-sm">No card yet! Please add a card</p>
                    <div className="mt-2 inline-flex items-center gap-2 bg-secondary px-4 py-2 rounded-lg">
                        <CreditCard className="w-4 h-4" /> <span className="text-sm text-foreground">Card</span>
                    </div>
                </div>
            </div>
            <div className="bg-secondary/50 rounded-lg p-4">
                <h3 className="font-semibold text-foreground mb-3 border-l-2 border-accent pl-2">History</h3>
                <div className="flex flex-col items-center py-8">
                    <div className="text-6xl mb-3">🦕</div>
                    <p className="text-accent text-sm">Stay tuned—something's coming!</p>
                </div>
            </div>
        </div>
    );
};

// Whitelist Management Tab
const WhitelistManagementTab = () => {
    const [typeOpen, setTypeOpen] = useState(false);
    const [selectedType, setSelectedType] = useState("All Type");
    return (
        <div className="space-y-4">
            <div className="bg-secondary/50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h3 className="font-semibold text-foreground border-l-2 border-accent pl-2">Whitelist Management</h3>
                        <div className="flex items-center gap-2 mt-1 pl-3">
                            <span className="text-sm text-muted-foreground">Whitelist Disabled</span>
                            <Switch />
                        </div>
                    </div>
                    <button className="flex items-center gap-1 text-accent text-sm font-medium"><Plus className="w-4 h-4" /> Add Address</button>
                </div>
                <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="relative">
                        <button onClick={() => setTypeOpen(!typeOpen)} className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm text-foreground flex items-center justify-between">
                            {selectedType} <ChevronRight className="w-4 h-4 rotate-90" />
                        </button>
                        {typeOpen && (
                            <div className="absolute top-full left-0 right-0 bg-card border border-border rounded-lg mt-1 z-10">
                                {["All Type", "Universal Address", "Standard Address"].map(t => (
                                    <button key={t} onClick={() => { setSelectedType(t); setTypeOpen(false); }} className="w-full text-left px-3 py-2 text-sm text-foreground hover:bg-secondary flex items-center justify-between">
                                        {t} {selectedType === t && <span className="w-3 h-3 rounded-full border-2 border-accent bg-accent" />}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                    <button className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm text-foreground flex items-center justify-between">
                        All Network <ChevronRight className="w-4 h-4 rotate-90" />
                    </button>
                </div>
                <div className="flex flex-col items-center py-8">
                    <div className="text-6xl mb-3">🦕</div>
                    <p className="text-accent text-sm">Stay tuned—something's coming!</p>
                </div>
            </div>
        </div>
    );
};

const GlobalSettingsPage = ({
    username,
    selectedFrame,
    setUsername,
}: {
    username: string;
    selectedFrame: number;
    setUsername: React.Dispatch<React.SetStateAction<string>>;
}) => {
    const [activeTab, setActiveTab] = useState("account");
    const isMobile = useIsMobile();
    const navigate = useNavigate();

    const renderTab = () => {
        switch (activeTab) {
            case "account": return <AccountInfoTab username={username}
                selectedFrame={selectedFrame} setUsername={setUsername} />;
            case "security": return <SecurityTab />;
            case "preferences": return <PreferencesTab />;
            case "verification": return <PersonalVerificationTab />;
            case "payment": return <PaymentMethodsTab />;
            case "whitelist": return <WhitelistManagementTab />;
            default: return <AccountInfoTab username={username}
                selectedFrame={selectedFrame} setUsername={setUsername} />;
        }
    };

    return (
        <div className="min-h-screen bg-background p-4 md:p-6">
            <div className="flex items-center gap-3 mb-6">
                {isMobile && <button onClick={() => navigate(-1)}><ChevronLeft className="w-5 h-5 text-foreground" /></button>}
                <h1 className="text-xl font-bold text-foreground">Global Settings</h1>
            </div>
            <div className="flex flex-col md:flex-row gap-4">
                {/* Sidebar Tabs */}
                <div className={cn("shrink-0", isMobile ? "flex overflow-x-auto gap-1 pb-2 scrollbar-none" : "w-56 space-y-1")}>
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={cn(
                                "flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm transition-colors whitespace-nowrap",
                                activeTab === tab.id ? "bg-secondary text-accent font-medium" : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                            )}
                        >
                            <tab.icon className="w-4 h-4" />
                            {tab.label}
                            {tab.badge && <span className="w-2 h-2 rounded-full bg-orange-400 ml-1" />}
                        </button>
                    ))}
                </div>
                {/* Content */}
                <div className="flex-1 min-w-0 overflow-y-auto custom-scrollbar">{renderTab()}</div>
            </div>
        </div>
    );
};

export default GlobalSettingsPage;
