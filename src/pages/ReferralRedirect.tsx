import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const ReferralRedirect = () => {
    const { code } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (code) {
      localStorage.setItem("promoCode", code);
    }

    navigate("/signup");
  }, [code, navigate]);
    return (
        <div>
            <p>Redirecting...</p>
        </div>
    );
};

export default ReferralRedirect;