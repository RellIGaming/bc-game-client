import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const ReferralRedirect = () => {
    const { code } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (code) {
      localStorage.setItem("referralCode", code);
    }
    navigate("/signup"); // redirect to signup
  }, [code]);
    return (
        <div>
            <p>Redirecting...</p>
        </div>
    );
};

export default ReferralRedirect;