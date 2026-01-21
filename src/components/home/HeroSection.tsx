import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

import banner1 from "../../assets/images/new-banner.png";
import banner2 from "../../assets/images/banner-2.jpg";

interface HeroSectionProps {
  onSignUp: () => void;
  isLoggedIn: boolean;
}

const banners = [
  {
    id: 1,
    image: banner1,
    title: "LOTTERY",
    subtitle: "Play lotteries online and hit the jackpot!",
    bonus: "UP TO $20,000.00",
    description: "How to play?",
  },
  // {
  //   id: 2,
  //   image: banner2,
  //   title: "VIP Experience",
  //   subtitle: "Exclusive Benefits",
  //   bonus: "UP TO $50,000.00",
  //   description: "Weekly Cashback",
  // },
];

const HeroSection = ({ onSignUp, isLoggedIn }: HeroSectionProps) => {
  const [currentBanner, setCurrentBanner] = useState(0);

  const nextBanner = () => {
    setCurrentBanner((prev) => (prev + 1) % banners.length);
  };

  const prevBanner = () => {
    setCurrentBanner((prev) => (prev - 1 + banners.length) % banners.length);
  };

  useEffect(() => {
    const interval = setInterval(nextBanner, 5000);
    return () => clearInterval(interval);
  }, []);

  const banner = banners[currentBanner];

  return (
    <section className="relative">
      <div className="relative overflow-hidden rounded-2xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={banner.id}
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -80 }}
            transition={{ duration: 0.4 }}
            className="relative h-[160px] sm:h-[200px] md:h-[220px] lg:h-[260px]"

          >
            {/* Background Image */}
            <img
              src={banner.image}
              alt={banner.title}
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Dark Overlay for readability */}
            <div className="absolute inset-0 bg-black/40" />

            {/* Content */}
            <div className="relative z-10 h-full flex flex-col justify-center px-4 sm:px-6 lg:px-12 max-w-[90%] sm:max-w-xl">

              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-bold italic mb-2 sm:mb-3">
                {banner.title}
              </h1>

              <p className="text-xs sm:text-sm text-white/80 mb-1">
                {banner.subtitle}
              </p>

              <p className="text-lg sm:text-2xl lg:text-4xl font-bold text-primary mb-1">
                {banner.bonus}
              </p>

              <p className="text-xs sm:text-sm text-white/80 mb-4 sm:mb-6">
                {banner.description}
              </p>


              <Button
                onClick={onSignUp}
               className="w-fit px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-semibold rounded-lg sm:rounded-xl"
              >
                Join Now
              </Button>
            </div>

            {/* Bottom Controls */}
            {isLoggedIn && (
  <div className="absolute bottom-4 right-4 flex items-center gap-2 z-10">
    <button
      onClick={prevBanner}
      className="p-2 rounded-lg bg-black/50 hover:bg-black/70"
    >
      <ChevronLeft className="w-5 h-5 text-white" />
    </button>

    <button
      onClick={nextBanner}
      className="p-2 rounded-lg bg-black/50 hover:bg-black/70"
    >
      <ChevronRight className="w-5 h-5 text-white" />
    </button>
  </div>
)}


            {/* Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
              {banners.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentBanner(idx)}
                  className={cn(
                    "w-2.5 h-2.5 rounded-full transition",
                    idx === currentBanner
                      ? "bg-primary"
                      : "bg-white/50"
                  )}
                />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default HeroSection;
