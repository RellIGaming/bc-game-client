import { useParams } from "react-router-dom";
import { useState } from "react";
import useAuthStore from "@/store/authStore";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const ResetPasswordPage = () => {
  const { token } = useParams();
  const { resetPassword } = useAuthStore();
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    try {
      await resetPassword(token!, password);
      alert("Password reset successful ✅");
    } catch (err) {
      alert("Invalid or expired ❌");
    }
  };

  return (
    <div className="w-full max-w-md bg-card rounded-2xl overflow-hidden">
      <h2 className="text-xl font-bold text-foreground mb-6">Reset Password</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="password"
          placeholder="Enter new password"
          value={password}
          onChange={(e: any) => setPassword(e.target.value)}
          className="bg-secondary border-border"
        />

        <Button type="submit" onClick={handleSubmit} className="w-full">
          Set New Password
        </Button>
      </form>

    </div>
  );
};

export default ResetPasswordPage;