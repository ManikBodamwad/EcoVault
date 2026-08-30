"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { CarbonProject, mockProjects } from "../data/mockProjects";

export type PersonaType = "public" | "buyer" | "seller";

export interface UserProfile {
  companyName: string;
  sector: string;
  offsetTarget: number; // in tons
  verified: boolean;
  avatarUrl?: string;
}

export interface PurchasedCredit {
  id: string;
  project: CarbonProject;
  volume: number;
  pricePaid: number;
  date: string;
  certPdfId: string;
}

export interface SellerOffer {
  id: string;
  projectId: string;
  projectName: string;
  projectType: string;
  buyerName: string;
  buyerSector: string;
  volume: number;
  offeredPrice: number; // ₹ per ton
  status: "Pending" | "Accepted" | "Declined";
  date: string;
}

export interface ChatMessage {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: string;
}

interface AppContextProps {
  persona: PersonaType;
  switchPersona: (p: PersonaType) => void;
  projects: CarbonProject[];
  setProjects: React.Dispatch<React.SetStateAction<CarbonProject[]>>;
  activeProject: CarbonProject | null;
  selectProject: (p: CarbonProject | null) => void;
  userProfile: UserProfile | null;
  updateUserProfile: (profile: Partial<UserProfile>) => void;
  purchasedCredits: PurchasedCredit[];
  completePurchase: (projectId: string, volume: number) => void;
  sellerOffers: SellerOffer[];
  respondToOffer: (offerId: string, status: "Accepted" | "Declined") => void;
  sellerListings: CarbonProject[];
  addNewListing: (listing: Omit<CarbonProject, "id" | "acvaVerified" | "trustScore" | "riskScore" | "riskRationale" | "certRegistry">) => void;
  chatMessages: ChatMessage[];
  sendChatMessage: (text: string) => void;
  clearChat: () => void;
  isGlobeExpanded: boolean;
  setIsGlobeExpanded: (b: boolean) => void;
  globeTheme: "dark" | "light";
  setGlobeTheme: (theme: "dark" | "light") => void;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [persona, setPersona] = useState<PersonaType>("public");
  const [projects, setProjects] = useState<CarbonProject[]>(mockProjects);
  const [activeProject, setActiveProject] = useState<CarbonProject | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [purchasedCredits, setPurchasedCredits] = useState<PurchasedCredit[]>([]);
  const [sellerOffers, setSellerOffers] = useState<SellerOffer[]>([]);
  const [sellerListings, setSellerListings] = useState<CarbonProject[]>([]);
  const [isGlobeExpanded, setIsGlobeExpanded] = useState(false);
  const [globeTheme, setGlobeTheme] = useState<"dark" | "light">("dark");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    const savedPersona = localStorage.getItem("ev_persona") as PersonaType;
    if (savedPersona) setPersona(savedPersona);

    const savedProfile = localStorage.getItem("ev_profile");
    if (savedProfile) {
      setUserProfile(JSON.parse(savedProfile));
    } else {
      // Set default profile for buyer/seller demo
      setUserProfile({
        companyName: "Tata ESG Solutions",
        sector: "Manufacturing",
        offsetTarget: 50000,
        verified: true
      });
    }

    const savedPurchases = localStorage.getItem("ev_purchases");
    if (savedPurchases) setPurchasedCredits(JSON.parse(savedPurchases));

    const savedListings = localStorage.getItem("ev_listings");
    if (savedListings) {
      setSellerListings(JSON.parse(savedListings));
    } else {
      // Initial mock listings for Rakesh
      setSellerListings([
        {
          id: "ev-rakesh-01",
          name: "Odisha Agroforestry Project",
          type: "Forestry",
          developer: "Rakesh Forestry Projects",
          location: "Odisha",
          lat: 20.27,
          lng: 85.84,
          price: 315,
          volume: 8500,
          acvaVerified: true,
          trustScore: 97,
          riskScore: "Low",
          riskRationale: "Verified locally. Reforestation of community lands with native broadleaf species.",
          description: "A community afforestation project that plants indigenous teak, sal, and bamboo along village commons. Directly creates carbon sequestration credits and provides income to 120 tribal households.",
          certRegistry: "GCI-REG-2026-OD942",
          details: "Registered under GCI registry in June 2026. The soil carbon estimation utilizes spatial remote sensing models calibrated with physical core drills every twelve months."
        }
      ]);
    }

    const savedOffers = localStorage.getItem("ev_offers");
    if (savedOffers) {
      setSellerOffers(JSON.parse(savedOffers));
    } else {
      // Default mock offers for Rakesh's listings
      setSellerOffers([
        {
          id: "off-1",
          projectId: "ev-rakesh-01",
          projectName: "Odisha Agroforestry Project",
          projectType: "Forestry",
          buyerName: "Reliance ESG Group",
          buyerSector: "Refining",
          volume: 2500,
          offeredPrice: 305,
          status: "Pending",
          date: new Date(Date.now() - 3600000 * 4).toLocaleDateString("en-IN")
        },
        {
          id: "off-2",
          projectId: "ev-rakesh-01",
          projectName: "Odisha Agroforestry Project",
          projectType: "Forestry",
          buyerName: "Infosys GreenTech",
          buyerSector: "Technology",
          volume: 1200,
          offeredPrice: 315,
          status: "Pending",
          date: new Date(Date.now() - 3600000 * 24).toLocaleDateString("en-IN")
        }
      ]);
    }

    const savedChat = localStorage.getItem("ev_chat");
    if (savedChat) {
      setChatMessages(JSON.parse(savedChat));
    } else {
      setChatMessages([
        {
          id: "msg-welcome",
          sender: "ai",
          text: "Namaste! I am EcoVault AI, your Carbon Credit Assistant. I can help you filter projects, check verification guidelines, or explain how our escrow model works. Try asking 'Show forestry projects' or 'What is ACVA?'",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }
  }, []);

  // Sync states to localStorage
  const switchPersona = (p: PersonaType) => {
    setPersona(p);
    localStorage.setItem("ev_persona", p);
    
    // Auto shift theme depending on page content contrast rules
    if (p === "seller") {
      setGlobeTheme("light");
    } else {
      setGlobeTheme("dark");
    }
  };

  const updateUserProfile = (profile: Partial<UserProfile>) => {
    setUserProfile((prev) => {
      const updated = prev ? { ...prev, ...profile } : (profile as UserProfile);
      localStorage.setItem("ev_profile", JSON.stringify(updated));
      return updated;
    });
  };

  const selectProject = (project: CarbonProject | null) => {
    setActiveProject(project);
    if (project) {
      setIsGlobeExpanded(true); // Auto expand map on click
    }
  };

  const completePurchase = (projectId: string, volume: number) => {
    const targetProj = projects.find((p) => p.id === projectId) || sellerListings.find((p) => p.id === projectId);
    if (!targetProj) return;

    // Deduct volume
    setProjects((prev) =>
      prev.map((p) => (p.id === projectId ? { ...p, volume: Math.max(0, p.volume - volume) } : p))
    );

    const newPurchase: PurchasedCredit = {
      id: `tx-${Math.floor(100000 + Math.random() * 900000)}`,
      project: targetProj,
      volume,
      pricePaid: targetProj.price * volume,
      date: new Date().toLocaleDateString("en-IN"),
      certPdfId: `EV-CERT-${targetProj.certRegistry.split("-").pop()}-${Math.floor(1000 + Math.random() * 9000)}`
    };

    setPurchasedCredits((prev) => {
      const updated = [newPurchase, ...prev];
      localStorage.setItem("ev_purchases", JSON.stringify(updated));
      return updated;
    });
  };

  const respondToOffer = (offerId: string, status: "Accepted" | "Declined") => {
    setSellerOffers((prev) => {
      const updated = prev.map((off) => {
        if (off.id === offerId) {
          // If accepted, execute simulated transfer
          if (status === "Accepted") {
            // Add to transaction log as payout completed
            setTimeout(() => {
              // Deduct volume from rakesh listings
              setSellerListings((prevListings) =>
                prevListings.map((l) =>
                  l.id === off.projectId ? { ...l, volume: Math.max(0, l.volume - off.volume) } : l
                )
              );
            }, 500);
          }
          return { ...off, status };
        }
        return off;
      });
      localStorage.setItem("ev_offers", JSON.stringify(updated));
      return updated;
    });
  };

  const addNewListing = (listing: Omit<CarbonProject, "id" | "acvaVerified" | "trustScore" | "riskScore" | "riskRationale" | "certRegistry">) => {
    const generatedId = `ev-rakesh-${Math.floor(100 + Math.random() * 900)}`;
    const newProj: CarbonProject = {
      ...listing,
      id: generatedId,
      acvaVerified: true,
      trustScore: Math.floor(93 + Math.random() * 6),
      riskScore: "Low",
      riskRationale: "Pre-verified via eKYC. Asset registry match with Grid Controller of India confirmed.",
      certRegistry: `GCI-REG-2026-${listing.location.substring(0,2).toUpperCase()}${Math.floor(100 + Math.random() * 899)}`
    };

    // Add to project list as well so it's discoverable by buyers
    setProjects((prev) => [newProj, ...prev]);

    setSellerListings((prev) => {
      const updated = [newProj, ...prev];
      localStorage.setItem("ev_listings", JSON.stringify(updated));
      return updated;
    });
  };

  // Advanced context-aware chatbot simulation
  const sendChatMessage = (text: string) => {
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: "user",
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages((prev) => {
      const updated = [...prev, userMsg];
      localStorage.setItem("ev_chat", JSON.stringify(updated));
      return updated;
    });

    // Simulate AI thinking and reply
    setTimeout(() => {
      let aiText = "I parsed your query but couldn't find a direct command. I can help filter carbon credits. Try saying 'forestry', 'biogas', or 'under 300'.";
      const normalized = text.toLowerCase();

      if (normalized.includes("forestry") || normalized.includes("forest") || normalized.includes("tree")) {
        aiText = "I found 3 verified Forestry projects: \n1. **Mahanadi Mangrove Restoration** (Odisha) - ₹320/ton\n2. **Western Ghats Community Forestry** (Maharashtra) - ₹360/ton\n3. **Brahmaputra Bamboo Reforestation** (Assam) - ₹345/ton.\n\nI have highlighted these on your marketplace view.";
      } else if (normalized.includes("biogas") || normalized.includes("stubble") || normalized.includes("methane")) {
        aiText = "We have 2 high-quality Biogas projects active:\n1. **Malwa Agricultural Biogas Hub** (Punjab) - ₹295/ton (95 trust score)\n2. **Haryana Dairy Biomethane Plant** (Haryana) - ₹305/ton (96 trust score).\n\nBoth prevent open stubble/manure emissions.";
      } else if (normalized.includes("under") || normalized.includes("less than") || normalized.includes("cheap") || normalized.includes("price")) {
        // Extract numbers
        const match = normalized.match(/\d+/);
        const limit = match ? parseInt(match[0], 10) : 300;
        
        const cheapProjs = projects.filter((p) => p.price <= limit);
        if (cheapProjs.length > 0) {
          aiText = `Here are projects priced under ₹${limit}/ton:\n` + 
            cheapProjs.map((p, idx) => `${idx + 1}. **${p.name}** (${p.location}) - ₹${p.price}/ton`).join("\n") +
            `\n\nWould you like me to filter your exploration feed to these?`;
        } else {
          aiText = `There are no projects under ₹${limit}/ton at the moment. Our lowest priced credit is the **Thar Desert Solar Harvest** in Rajasthan at ₹260/ton.`;
        }
      } else if (normalized.includes("acva") || normalized.includes("audit") || normalized.includes("verification")) {
        aiText = "ACVA stands for **Accredited Carbon Verification Agency**. It is an independent regulatory body that performs third-party physical audits, biomass verification, and satellite canopy monitoring. Listings with the ACVA Badge have passed our most rigorous trust checks, lowering greenwashing risk to near-zero.";
      } else if (normalized.includes("escrow") || normalized.includes("safety") || normalized.includes("pay")) {
        aiText = "Our escrow system protects transactions: \n1. The buyer deposits funds into the EcoVault Escrow. \n2. The system locks the corresponding digital carbon certificate. \n3. Upon verifying certificate ownership transfer on the National Registry, funds are safely disbursed to the project developer. EcoVault takes a flat transaction fee of 2%, with no hidden spreads.";
      } else if (normalized.includes("odisha") || normalized.includes("punjab") || normalized.includes("rajasthan")) {
        const state = normalized.includes("odisha") ? "Odisha" : normalized.includes("punjab") ? "Punjab" : "Rajasthan";
        const stateProjs = projects.filter(p => p.location.toLowerCase() === state.toLowerCase());
        aiText = `I found project(s) in **${state}**:\n` + 
          stateProjs.map((p, idx) => `${idx + 1}. **${p.name}** - ₹${p.price}/ton (Vol: ${p.volume.toLocaleString()} tons)`).join("\n") +
          `\n\nClicking on any card will focus the 3D globe coordinates directly.`;
      }

      const aiMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: "ai",
        text: aiText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setChatMessages((prev) => {
        const updated = [...prev, aiMsg];
        localStorage.setItem("ev_chat", JSON.stringify(updated));
        return updated;
      });
    }, 1000);
  };

  const clearChat = () => {
    const initialWelcome = [
      {
        id: "msg-welcome",
        sender: "ai",
        text: "Namaste! I am EcoVault AI, your Carbon Credit Assistant. I can help you filter projects, check verification guidelines, or explain how our escrow model works. Try asking 'Show forestry projects' or 'What is ACVA?'",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ] as ChatMessage[];
    setChatMessages(initialWelcome);
    localStorage.setItem("ev_chat", JSON.stringify(initialWelcome));
  };

  return (
    <AppContext.Provider
      value={{
        persona,
        switchPersona,
        projects,
        setProjects,
        activeProject,
        selectProject,
        userProfile,
        updateUserProfile,
        purchasedCredits,
        completePurchase,
        sellerOffers,
        respondToOffer,
        sellerListings,
        addNewListing,
        chatMessages,
        sendChatMessage,
        clearChat,
        isGlobeExpanded,
        setIsGlobeExpanded,
        globeTheme,
        setGlobeTheme
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
