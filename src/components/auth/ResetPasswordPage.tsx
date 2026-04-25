import { useParams } from "react-router-dom";
import { useState } from "react";
import useAuthStore from "@/store/authStore";

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
    <div>
      <input
        type="password"
        placeholder="New password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSubmit}>Reset</button>
    </div>
  );
};

export default ResetPasswordPage;