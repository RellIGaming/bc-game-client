import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import useAuthStore from "@/store/authStore";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const ResetPasswordPage = () => {
  const { token } = useParams();
  const { resetPassword } = useAuthStore();
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async () => {
    try {
      await resetPassword(token!, password);
      alert("Password reset successful ✅");
      navigate("/")
    } catch (err) {
      alert("Invalid or expired ❌");
    }
  };

  return (
    <div className="w-full max-w-md bg-card rounded-lg overflow-hidden m-auto">
      <div className="mt-8 mb-8">
        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="text-xl font-bold text-foreground mb-6 flex justify-center">Reset Password</h2>
          <Input
            type="password"
            placeholder="Enter new password"
            value={password}
            onChange={(e: any) => setPassword(e.target.value)}
            className="bg-secondary border-border"
          />

          <Button type="submit" onClick={handleSubmit} className="w-full">
            Reset Now
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordPage;