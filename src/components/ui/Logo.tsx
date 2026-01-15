const Logo = () => {
  return (
    <div className="flex items-center gap-2">
      <div className="w-8 h-8 lg:w-9 lg:h-9 rounded-full bg-primary flex items-center justify-center">
        <span className="text-primary-foreground font-bold text-lg">G</span>
      </div>
      <span className="hidden sm:block text-foreground font-bold text-lg lg:text-xl tracking-tight">
        GAME<span className="text-primary">.WIN</span>
      </span>
    </div>
  );
};

export default Logo;
