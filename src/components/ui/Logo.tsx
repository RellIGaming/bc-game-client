import bcLogo from "@/assets/images/bc-logo.svg";

const Logo = () => {
  return (
    <div className="flex items-center gap-2">
      <img src={bcLogo} alt="Rellbet" className="h-7 lg:h-8 w-auto" />
    </div>
  );
};

export default Logo;
