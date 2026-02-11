import { useState } from "react";
import { cn } from "@/lib/utils";
const tabs = [
  { id: "cloud9", label: "Cloud 9 CS:GO" },
  { id: "afa", label: "AFA" },
  { id: "daniel", label: "Daniel Sturdy" },
  { id: "dota", label: "Cloud 9 DOTA 2" },
  { id: "journey", label: "Sponsorship Journey" },
];
const sponsorships: Record<string, { title: string; subtitle: string; partner: string; period: string; sections: { heading: string; content: string }[]; images?: string[] }> = {
  cloud9: {
    title: "Cloud9 CS:GO",
    subtitle: "Official Partnership",
    partner: "Cloud9 Esports",
    period: "August 2023 – March 2024",
    sections: [
      {
        heading: "Cloud9 Official Partner – CS:GO (August 2023 – March 2024)",
        content: "We are proud to announce an official partnership with Cloud9, marking a significant milestone in the esports industry. This high-profile collaboration offered fans a deeper connection to the growing esports ecosystem led by Cloud9.\n\nAt the Crypto Crown of the Year, we supported Cloud9's iconic $2.5 million while also raising the groundwork for future innovations in iGaming. The partnership marked a positive step in creating exciting synergies between esports and crypto gaming, fostering a vibrant and competitive environment."
      },
      {
        heading: "Unlocking a New Era of Esports and iGaming",
        content: "Cloud9 is widely recognized for its prominent role in the League of Champions Series, as well as its remarkable underlying tenure of ELEAGUE Boston, Starfire 2018—two events that made cloud9 one of the most iconic esports teams in North America. With a deep-rooted fan base and rich history, Cloud9's legacy remains influential in the industry.\n\nCollaborating with such a legendary organization was an immense honor. This partnership represented a meaningful step in a journey to connect iGaming and esports, paving the way for future possibilities."
      },
      {
        heading: "A New Frontier",
        content: "Have you ever envisioned a world where esports and iGaming converge on a single, interconnected stage, allowing fans to seamlessly immerse themselves?\n\nThis collaboration marked the beginning of a vision—ushering in a new era of digital entertainment where crypto casinos and competitive gaming co-exist. It embodies creativity, innovation, and above all the landscapes of iGaming, and we're proudly took part in this evolution."
      },
    ],
  },
  afa: {
    title: "Argentine Football Association",
    subtitle: "Global Crypto Casino Partner",
    partner: "AFA (Argentine Football Association)",
    period: "September 2023 – August 2024",
    sections: [
      {
        heading: "Global Crypto Casino Partner (September 2023 – August 2024)",
        content: "We served as the official global crypto casino partner of the Argentine Football Association (AFA)—an organization synonymous with world-class football excellence. This landmark agreement granted exclusive association rights with AFA's coveted imagery during that time, including the iconic FIFA World Cup in 2022 trophy."
      },
      {
        heading: "Strategic Alliance",
        content: "The collaboration aimed to bridge the emerging world of blockchain gaming with the universal passion for football. This strategic alignment between our platform and AFA greatly expanded the intersection of iGaming, Web3, and sports engagement. During the initial period of collaboration, a series of co-branded promotional campaigns was designed to bring added value to both crypto users and football enthusiasts."
      },
      {
        heading: "A New Era (2023–2024 Retrospective)",
        content: "During this period of collaboration, we embraced new digital frontiers—integrating cutting-edge betting solutions and Web3 functionalities, gamification elements, and sports culture convergence to provide fans with enhanced digital experiences. By bridging technology and passion, we aimed to elevate fan engagement across borders."
      },
    ],
  },
  daniel: {
    title: "Daniel Sturdy",
    subtitle: "Brand Ambassador",
    partner: "Daniel Sturdy",
    period: "2024 – Present",
    sections: [
      {
        heading: "Brand Ambassador Partnership",
        content: "Daniel Sturdy brings charisma and relatability to our brand as an official ambassador. His social media reach and entertainment prowess help connect our platform with a wider, diverse audience."
      },
      {
        heading: "Digital Content Collaboration",
        content: "Through engaging video content, live streams, and social media collaborations, Daniel showcases the platform's features in an authentic and entertaining way. His unique personality resonates with both gaming enthusiasts and crypto-curious audiences."
      },
    ],
  },
  dota: {
    title: "Cloud9 DOTA 2",
    subtitle: "Esports Partnership",
    partner: "Cloud9 DOTA 2 Division",
    period: "2023 – 2024",
    sections: [
      {
        heading: "DOTA 2 Esports Partnership",
        content: "Our partnership extended to Cloud9's DOTA 2 division, one of the most competitive teams in the international DOTA 2 scene. This collaboration brought together two powerhouses—blockchain gaming innovation and top-tier esports competition."
      },
      {
        heading: "Tournament Presence",
        content: "Throughout the partnership, our branding was prominently featured during major DOTA 2 tournaments, reaching millions of viewers worldwide. The collaboration included exclusive in-game events and promotions that bridged the gap between traditional esports viewing and crypto gaming engagement."
      },
    ],
  },
  journey: {
    title: "Sponsorship Journey",
    subtitle: "Our Path Forward",
    partner: "Multiple Partners",
    period: "2023 – Present",
    sections: [
      {
        heading: "Our Sponsorship Journey",
        content: "From our first esports partnership to global football associations, our sponsorship journey represents a commitment to connecting blockchain gaming with mainstream entertainment. Each partnership has been carefully selected to expand our reach while maintaining authenticity."
      },
      {
        heading: "Key Milestones",
        content: "• Cloud9 CS:GO Partnership — Marking our entry into esports sponsorship\n• AFA Global Partnership — Reaching football fans worldwide\n• Brand Ambassador Programs — Connecting with diverse audiences\n• Cloud9 DOTA 2 — Expanding our esports portfolio\n• Future Plans — More exciting partnerships to come"
      },
      {
        heading: "Looking Ahead",
        content: "We continue to explore partnerships that align with our vision of bridging the worlds of crypto gaming, traditional sports, and esports. Stay tuned for upcoming announcements about new collaborations that will further enhance the gaming experience for our community."
      },
    ],
  },
};
const SponsorshipPage = () => {
  const [activeTab, setActiveTab] = useState("cloud9");
  const data = sponsorships[activeTab];
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className=" max-w-5xl mx-auto px-1 sm:px-2 py-6 space-y-6">
        {/* Tab Navigation - Horizontal scrollable */}
        <div className="flex gap-1 overflow-x-auto scrollbar-hide pb-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "whitespace-nowrap px-4 py-2 text-sm font-medium b-radius transition-colors shrink-0",
                activeTab === tab.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-card text-muted-foreground hover:text-foreground hover:bg-secondary"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
        {/* Content Area */}
        <div className="space-y-6">
          {/* Hero Section */}
          <div className="bg-card b-radius p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-xl sm:text-2xl font-bold">{data.title}</h1>
                <p className="text-sm text-muted-foreground mt-1">{data.subtitle}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-muted-foreground">Partner</p>
                <p className="text-sm font-medium">{data.partner}</p>
                <p className="text-xs text-primary mt-1">{data.period}</p>
              </div>
            </div>
          </div>
          {/* Content Sections */}
          {data.sections.map((section, i) => (
            <div key={i} className="bg-card b-radius p-5 sm:p-6 space-y-3">
              <h2 className="text-base sm:text-lg font-bold">{section.heading}</h2>
              <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                {section.content}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default SponsorshipPage;