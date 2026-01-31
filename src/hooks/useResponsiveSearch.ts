import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const useResponsiveSearch = (
  searchOpen: boolean,
  setSearchOpen: (v: boolean) => void
) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const check = () => {
      const isMobile = window.innerWidth < 768;

      // ✅ If mobile & modal open → go to /search
      if (isMobile && searchOpen) {
        setSearchOpen(false);
        if (location.pathname !== "/search") {
          navigate("/search", { replace: true });
        }
      }

      // ✅ If desktop & currently on /search → close page & open modal
      if (!isMobile && location.pathname === "/search") {
        navigate(-1); // go back
        setSearchOpen(true);
      }
    };

    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [searchOpen, location.pathname]);
};
