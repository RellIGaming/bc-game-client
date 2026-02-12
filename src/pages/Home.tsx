import HeroSection from "@/components/home/HeroSection";
import RecentBigWins from "@/components/home/RecentBigWins";
import CategoryCards from "@/components/home/CategoryCards";
import BCOriginals from "@/components/home/BCOriginals";
import LiveSports from "@/components/home/LiveSports";
import BCExclusive from "@/components/home/BCExclusive";
import Slots from "@/components/home/Slots";
import LiveCasino from "@/components/home/LiveCasino";
import DepositBonus from "@/components/home/DepositBonus";
import BingoGames from "@/components/home/BingoGames";
import LatestRoundRace from "@/components/home/LatestRoundRace";
import HotGames from "@/components/home/HotGames";
import Footer from "@/components/home/Footer";

const Home = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  return (
    <div className="min-h-screen flex flex-col">

  {/* Content Wrapper */}
  <div className="flex-1 px-1 lg:px-2 py-4 space-y-6">
      <HeroSection isLoggedIn={isLoggedIn} onSignUp={() => {}} />
      <RecentBigWins />
      <CategoryCards />
      <BCOriginals />
      <LiveSports />
      <BCExclusive />
      <Slots />
      <LiveCasino />
      <DepositBonus />
      <BingoGames />
      <LatestRoundRace />
      <HotGames />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
