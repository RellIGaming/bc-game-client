import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ExternalLink } from "lucide-react";

const tabs = [
  { id: "journey", label: "Sponsorship Journey" },
  { id: "ohiggins", label: "O'Higgins" },
  { id: "jason-derulo", label: "Jason Derulo" },
  { id: "lil-pump", label: "Lil Pump" },
  { id: "colby-covington", label: "Colby Covington" },
  { id: "miami-club", label: "Miami Club" },
  { id: "bc-esports", label: "Rellbet Game Esports" },
  { id: "kwara-united", label: "Kwara United" },
  { id: "sashimi-poker", label: "Sashimi Poker" },
  { id: "leicester", label: "Leicester City" },
];

const sponsorships: Record<string, { title: string; subtitle: string; partner: string; period: string; officialWebsite?: string; sections: { heading: string; content: string }[] }> = {
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
        content: "• Cloud9 CS:GO Partnership — Marking our entry into esports sponsorship\n• AFA Global Partnership — Reaching football fans worldwide\n• Brand Ambassador Programs — Connecting with diverse audiences\n• Cloud9 DOTA 2 — Expanding our esports portfolio\n• Miami Club — Pickleball innovation\n• Future Plans — More exciting partnerships to come"
      },
      {
        heading: "Looking Ahead",
        content: "We continue to explore partnerships that align with our vision of bridging the worlds of crypto gaming, traditional sports, and esports. Stay tuned for upcoming announcements about new collaborations that will further enhance the gaming experience for our community."
      },
    ],
  },
  ohiggins: {
    title: "O'Higgins F.C.",
    subtitle: "Official Partnership",
    partner: "O'Higgins Football Club",
    period: "2024 – Present",
    officialWebsite: "https://ohiggins.cl",
    sections: [
      {
        heading: "Rellbet.Game Partners with O'Higgins F.C.",
        content: "We are proud to announce our official partnership with O'Higgins Football Club, one of the most storied clubs in Chilean football. This collaboration brings together the passion of South American football with the innovation of crypto gaming."
      },
      {
        heading: "A Historic Partnership",
        content: "O'Higgins F.C., based in Rancagua, Chile, has a rich history in Chilean football. Founded in 1955, the club has won multiple league titles and consistently competes at the highest level. Our partnership aims to bring exciting new digital experiences to their passionate fanbase."
      },
      {
        heading: "Community Impact",
        content: "This partnership goes beyond branding — it's about building community. Through joint initiatives, we aim to promote responsible gaming, support grassroots football development, and create innovative fan engagement opportunities across Latin America."
      },
    ],
  },
  "jason-derulo": {
    title: "Jason Derulo",
    subtitle: "Brand Ambassador",
    partner: "Jason Derulo",
    period: "2024 – Present",
    sections: [
      {
        heading: "Jason Derulo x Rellbet.Game",
        content: "Grammy-nominated artist Jason Derulo joins as our global brand ambassador, bringing his massive following and entertainment expertise to the crypto gaming world. With over 50 million social media followers, Jason helps connect our platform with a global audience."
      },
      {
        heading: "A Perfect Match",
        content: "Jason Derulo's energy, creativity, and global appeal make him the perfect ambassador for our brand. His content creation abilities and genuine interest in crypto technology create authentic connections between entertainment and blockchain gaming."
      },
      {
        heading: "Campaign Highlights",
        content: "Through engaging social media content, live events, and exclusive promotions, Jason Derulo showcases the excitement of crypto gaming to millions of fans worldwide. His involvement has significantly expanded our brand awareness across key demographics."
      },
    ],
  },
  "lil-pump": {
    title: "Lil Pump",
    subtitle: "Brand Ambassador",
    partner: "Lil Pump",
    period: "2024 – Present",
    sections: [
      {
        heading: "Lil Pump Joins Rellbet.Game",
        content: "Rapper and cultural icon Lil Pump brings his bold energy and massive Gen-Z following to our brand. Known for his unapologetic style and viral presence, Lil Pump helps us connect with younger crypto-savvy audiences."
      },
      {
        heading: "Breaking Boundaries",
        content: "Lil Pump's fearless approach to content creation mirrors our own boldness in the crypto gaming space. Together, we're pushing boundaries and creating experiences that resonate with a new generation of digital entertainment consumers."
      },
      {
        heading: "Digital-First Approach",
        content: "Through TikTok, Instagram, and YouTube content, Lil Pump introduces crypto gaming concepts to audiences who are digital natives but may be new to blockchain gaming. His authentic engagement style drives genuine interest and participation."
      },
    ],
  },
  "colby-covington": {
    title: "Colby Covington",
    subtitle: "UFC Fighter Partnership",
    partner: "Colby Covington",
    period: "2024 – Present",
    sections: [
      {
        heading: "Colby Covington x Rellbet.Game",
        content: "UFC welterweight contender Colby Covington brings the fighting spirit to our brand partnership. Known for his electric personality and world-class fighting skills, Colby connects crypto gaming with the massive UFC fanbase."
      },
      {
        heading: "Fight Night Promotions",
        content: "During UFC events, our branding is prominently featured alongside Colby's fights, reaching millions of combat sports fans worldwide. Exclusive fight-night promotions and predictions add an extra layer of excitement for our community."
      },
      {
        heading: "A Champion's Mentality",
        content: "Colby's relentless work ethic and competitive spirit align perfectly with our platform's values. His partnership helps position Rellbet.Game at the intersection of combat sports and crypto gaming entertainment."
      },
    ],
  },
  "miami-club": {
    title: "Miami Club",
    subtitle: "Pickleball Partnership",
    partner: "Miami Pickleball Club (MPC)",
    period: "2025 – Present",
    officialWebsite: "https://mpc.com",
    sections: [
      {
        heading: "Rellbet.Game Teams Up with Miami Pickleball Club in an Exciting New Brand Collaboration",
        content: "We are pumped to announce our latest collaboration with Miami Pickleball Club (MPC) — a game-changing partnership that brings together Pickleball and Rellbet.Game's unfiltered energy.\n\nPickleball is a fast-paced, high-energy game that combines tennis, badminton, and ping pong, and it's rapidly gaining momentum across the globe."
      },
      {
        heading: "MPC x Rellbet.Game: A Fresh Collaboration with a Bold Edge",
        content: "MPC is not your average sports team—it's part of the new wave of sports that's redefining what it means to compete. Hot off winning this year's Challenger title in the Major League of Pickleball, MPC is going to take the world by storm in 2025, and Rellbet.Game will be along for the ride, featuring on the front of the jersey's.\n\nThis partnership is all about bringing innovation, excitement, and a little chaos to the table. Including exclusive pickleball events featuring variety of talent. Get ready for an entirely new way to experience sports and entertainment."
      },
      {
        heading: "The Future is Untamed",
        content: "At Rellbet.Game, we don't just play by the rules—we create new ones. Our partnership with MPC is all about embracing innovation, pushing limits, and offering our community fresh experiences that break free from the ordinary.\n\nMPC competes in the Major League of Pickleball and counts Nick Kyrgios, Naomi Osaka, Patrick Mahomes, Kygo, Rich Paul and more as investors."
      },
    ],
  },
  "bc-esports": {
    title: "Rellbet Game Esports",
    subtitle: "Esports Division",
    partner: "Rellbet Game Esports Team",
    period: "2023 – Present",
    sections: [
      {
        heading: "Rellbet Game Esports: Our Competitive Gaming Division",
        content: "Rellbet Game Esports represents our direct involvement in competitive gaming. Our esports division competes across multiple titles including CS2, Dota 2, and League of Legends, bringing the Rellbet.Game brand to the forefront of competitive gaming."
      },
      {
        heading: "Tournament Achievements",
        content: "Our esports teams have competed in major tournaments worldwide, building a reputation for competitive excellence. From regional qualifiers to international championships, Rellbet Game Esports continues to grow and achieve new milestones."
      },
      {
        heading: "Community Engagement",
        content: "Beyond competition, our esports division runs community tournaments, streaming events, and educational content to help grow the gaming community. We believe esports and crypto gaming can coexist to create unique entertainment experiences."
      },
    ],
  },
  "kwara-united": {
    title: "Kwara United",
    subtitle: "Nigerian Football Partnership",
    partner: "Kwara United FC",
    period: "2024 – Present",
    sections: [
      {
        heading: "Rellbet.Game Partners with Kwara United FC",
        content: "Our partnership with Kwara United FC marks our expansion into African football. Kwara United, based in Ilorin, Nigeria, competes in the Nigerian Professional Football League and has a passionate, growing fanbase."
      },
      {
        heading: "Growing African Football",
        content: "This partnership reflects our commitment to supporting football development across Africa. Through jersey sponsorship, community initiatives, and digital engagement programs, we aim to contribute to the growth of Nigerian and African football."
      },
      {
        heading: "Digital Innovation in African Sports",
        content: "By bringing crypto gaming awareness to African football fans, we're helping bridge the digital divide and introducing new entertainment possibilities to a vibrant, tech-savvy population."
      },
    ],
  },
  "sashimi-poker": {
    title: "Sashimi Poker",
    subtitle: "Poker Partnership",
    partner: "Sashimi Poker",
    period: "2024 – Present",
    sections: [
      {
        heading: "Rellbet.Game x Sashimi Poker",
        content: "Our partnership with Sashimi Poker brings together two innovative forces in the gaming world. Sashimi Poker's unique approach to online poker aligns with our vision of creating exciting, fair, and transparent gaming experiences."
      },
      {
        heading: "Poker Innovation",
        content: "Together, we're exploring new ways to integrate blockchain technology with traditional poker, creating provably fair games and innovative tournament formats that appeal to both crypto enthusiasts and poker traditionalists."
      },
    ],
  },
  leicester: {
    title: "Leicester City",
    subtitle: "Premier League Partnership",
    partner: "Leicester City FC",
    period: "2024 – Present",
    officialWebsite: "https://lcfc.com",
    sections: [
      {
        heading: "Rellbet.Game x Leicester City FC",
        content: "Our partnership with Leicester City FC represents a landmark moment in our sponsorship journey. Leicester City, the miraculous 2015-16 Premier League champions, bring a global fanbase and a story of defying the odds — values that resonate deeply with our brand."
      },
      {
        heading: "Global Reach",
        content: "With millions of fans worldwide, Leicester City provides unparalleled exposure across key markets. Our branding is featured prominently across the King Power Stadium and the club's digital channels, reaching fans in Europe, Asia, and beyond."
      },
      {
        heading: "Shared Values",
        content: "Like Leicester City's famous title run, Rellbet.Game believes in breaking barriers and achieving the unexpected. This partnership celebrates innovation, community, and the thrill of competition that unites sports fans and gamers alike."
      },
    ],
  },
};

const SponsorshipPage = () => {
  const { tab } = useParams<{ tab?: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(tab || "journey");

  useEffect(() => {
    if (tab && sponsorships[tab]) {
      setActiveTab(tab);
    }
  }, [tab]);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    navigate(`/sponsorships/${tabId}`, { replace: true });
  };

  const data = sponsorships[activeTab] || sponsorships["journey"];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-5xl mx-auto px-1 sm:px-2 py-6 space-y-6">
        {/* Tab Navigation */}
        <div className="flex gap-1 overflow-x-auto scrollbar-hide pb-1">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => handleTabChange(t.id)}
              className={cn(
                "whitespace-nowrap px-4 py-2 text-sm font-medium b-radius transition-colors shrink-0",
                activeTab === t.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-card text-muted-foreground hover:text-foreground hover:bg-secondary"
              )}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="space-y-6">
          {/* Hero */}
          <div className="bg-card b-radius p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-xl sm:text-2xl font-bold">{data.title}</h1>
                <p className="text-sm text-muted-foreground mt-1">{data.subtitle}</p>
                {data.officialWebsite && (
                  <a href={data.officialWebsite} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-primary mt-2 hover:underline">
                    Official website <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
              <div className="text-right">
                <p className="text-xs text-muted-foreground">Partner</p>
                <p className="text-sm font-medium">{data.partner}</p>
                <p className="text-xs text-primary mt-1">{data.period}</p>
              </div>
            </div>
          </div>

          {/* Sections */}
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
