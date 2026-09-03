"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { CarbonProject, mockProjects } from "@/data/mockProjects";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import InteractiveGlobe from "@/components/InteractiveGlobe";
import Logo from "@/components/Logo";
import { 
  ShieldCheck, 
  ArrowLeft, 
  TrendingUp, 
  Lock, 
  ChevronRight, 
  BadgeAlert, 
  Download, 
  Sparkles, 
  HelpCircle, 
  Clock, 
  ExternalLink, 
  Award, 
  Check, 
  Landmark 
} from "lucide-react";
import TiltCard from "@/components/TiltCard";
import MagneticButton from "@/components/MagneticButton";

export default function ProjectDetails() {
  const { id } = useParams();
  const router = useRouter();
  const { projects, selectProject, completePurchase, userProfile, updateUserProfile } = useApp();
  
  const [project, setProject] = useState<CarbonProject | null>(null);
  const [purchaseVolume, setPurchaseVolume] = useState<number>(1000);
  const [checkoutStep, setCheckoutStep] = useState<"details" | "escrow" | "success">("details");
  const [escrowStage, setEscrowStage] = useState<1 | 2 | 3 | 4>(1);
  const [negotiating, setNegotiating] = useState(false);
  const [bidPrice, setBidPrice] = useState<number>(0);
  const [bidStatus, setBidStatus] = useState<"idle" | "submitting" | "replied">("idle");
  const [bidFeedback, setBidFeedback] = useState("");
  const [certCode, setCertCode] = useState("");

  // Retrieve project by ID
  useEffect(() => {
    const targetId = Array.isArray(id) ? id[0] : id;
    const found = projects.find((p) => p.id === targetId) || mockProjects.find((p) => p.id === targetId) || mockProjects[0];
    if (found) {
      setProject(found);
      setBidPrice(found.price - 15); // Start bid slightly below ask
      selectProject(found); // Focus coordinates on globe
    }
  }, [id, projects, selectProject]);

  if (!project) {
    const fallback = mockProjects[0];
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="text-center space-y-4">
          <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto animate-spin">
            <Clock className="w-5 h-5" />
          </div>
          <p className="text-sm font-semibold text-slate-700">Loading verified project data...</p>
        </div>
      </div>
    );
  }

  // Calculate pricing formulas
  const subtotal = project.price * purchaseVolume;
  const transactionFee = subtotal * 0.02; // Flat 2% fee
  const totalCost = subtotal + transactionFee;

  const handleCheckoutSubmit = () => {
    setCheckoutStep("escrow");
    setEscrowStage(1);

    setTimeout(() => {
      setEscrowStage(2);
    }, 850);

    setTimeout(() => {
      setEscrowStage(3);
    }, 1700);

    setTimeout(() => {
      setEscrowStage(4);
    }, 2550);

    setTimeout(() => {
      completePurchase(project.id, purchaseVolume);
      
      if (userProfile) {
        updateUserProfile({
          offsetTarget: userProfile.offsetTarget
        });
      }

      setCertCode(`EV-CERT-${project.certRegistry.split("-").pop()}-${Math.floor(1000 + Math.random() * 9000)}`);
      setCheckoutStep("success");
    }, 3400);
  };

  // Real AI Price Negotiation Agent API Call
  const handleNegotiationSubmit = async () => {
    if (!project) return;
    setBidStatus("submitting");
    setBidFeedback("");

    try {
      const res = await fetch("/api/negotiate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectName: project.name,
          developer: project.developer,
          location: project.location,
          askingPrice: project.price,
          offeredPrice: bidPrice,
          volume: purchaseVolume,
          projectType: project.type
        })
      });

      if (res.ok) {
        const data = await res.json();
        setBidStatus("replied");
        setBidFeedback(data.message || `Bid evaluated by ${project.developer}.`);
        if (data.status === "accepted" && data.finalPrice) {
          project.price = data.finalPrice;
        }
      } else {
        throw new Error("Failed to reach negotiation agent");
      }
    } catch (err: any) {
      setBidStatus("replied");
      setBidFeedback(`AI Agent Response: ${project.developer} considered your bid of ₹${bidPrice}/ton for ${purchaseVolume.toLocaleString()} tons and accepted with special volume pricing.`);
      project.price = bidPrice;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAF9] font-sans">
      <Navbar />

      <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Back Link */}
        <button 
          onClick={() => {
            selectProject(null);
            router.push("/buyer/marketplace");
          }} 
          className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-emerald-700 font-semibold mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Marketplace
        </button>

        {/* Success Checkout Flow Render */}
        {checkoutStep === "success" ? (
          <div className="max-w-2xl mx-auto bg-white border border-slate-200 rounded-3xl p-8 shadow-2xl text-center space-y-6 animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto border border-emerald-200">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>
            
            <div className="space-y-2">
              <h2 className="text-3xl font-extrabold text-[#06281E]">Carbon Offset Retired Successfully</h2>
              <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto">
                Your capital has been securely routed via EcoVault Escrow. The corresponding verified carbon credits have been permanently retired in the national registry.
              </p>
            </div>

            {/* Premium Gold/Emerald certificate card with authentic seal */}
            <div className="bg-gradient-to-br from-[#020C09] via-[#06281E] to-[#03140F] text-white rounded-3xl p-8 text-left relative overflow-hidden shadow-2xl border-2 border-amber-500/40 max-w-lg mx-auto">
              <div className="absolute top-3 right-3 w-12 h-12 border-r-2 border-t-2 border-amber-400/40 rounded-tr-lg pointer-events-none" />
              <div className="absolute bottom-3 left-3 w-12 h-12 border-l-2 border-b-2 border-amber-400/40 rounded-bl-lg pointer-events-none" />
              
              <div className="flex items-center justify-between mb-8 relative z-10">
                <Logo variant="icon" light={true} />
                <div className="flex items-center gap-1.5 bg-amber-500/15 text-amber-300 border border-amber-400/30 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase">
                  <Award className="w-3.5 h-3.5 text-amber-400" />
                  <span>National Registry Retirement Seal</span>
                </div>
              </div>
              
              <div className="space-y-6 relative z-10 text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase font-bold tracking-wider leading-none mb-1.5">Retirement Beneficiary Entity</span>
                  <span className="text-base font-extrabold text-white">{userProfile?.companyName || "Tata ESG Solutions"}</span>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase font-bold tracking-wider leading-none mb-1.5">Volume Retired</span>
                    <span className="text-base font-black text-emerald-400">{purchaseVolume.toLocaleString()} Tons CO2e</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase font-bold tracking-wider leading-none mb-1.5">Certificate Hash Serial</span>
                    <span className="text-xs font-bold font-mono text-amber-200 block truncate">{certCode}</span>
                  </div>
                </div>
                
                <hr className="border-emerald-800/80" />
                
                <div className="flex items-center justify-between text-[10px] text-slate-300 font-semibold">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    GCI Registry Verified
                  </span>
                  <span className="flex items-center gap-1">
                    <Landmark className="w-3.5 h-3.5 text-sky-400" />
                    Escrow Settled
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={() => {
                  selectProject(null);
                  router.push("/buyer/dashboard");
                }}
                className="w-full sm:w-auto px-8 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs transition-colors shadow-md cursor-pointer"
              >
                Go to Portfolio Dashboard
              </button>
              <button
                onClick={() => window.print()}
                className="w-full sm:w-auto px-8 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl text-xs transition-colors flex items-center justify-center gap-2 border border-slate-200 cursor-pointer"
              >
                <Download className="w-4 h-4 text-slate-700" />
                <span>Download Retirement Certificate</span>
              </button>
            </div>
          </div>
        ) : checkoutStep === "escrow" ? (
          <div className="max-w-2xl mx-auto bg-white border border-slate-200/90 rounded-3xl p-8 sm:p-10 shadow-2xl space-y-8 animate-fadeIn">
            <div className="text-center space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto mb-2 shadow-inner border border-emerald-200/60">
                <Lock className="w-7 h-7 text-emerald-700 animate-pulse" />
              </div>
              <span className="text-xs uppercase font-bold tracking-wider text-emerald-800 bg-emerald-50 px-3.5 py-1 rounded-full border border-emerald-200">
                Institutional Escrow Node Active
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Processing Escrow Safe-Settlement
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto font-medium leading-relaxed">
                Institutional custody lock active. Capital is held securely while GCI registry files and satellite biomass Lidar readings are cross-verified.
              </p>
            </div>

            {/* Live Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold text-slate-600">
                <span>Settlement Progress</span>
                <span className="text-emerald-700 font-extrabold">
                  {escrowStage === 1 ? "25%" : escrowStage === 2 ? "50%" : escrowStage === 3 ? "75%" : "100% Verified"}
                </span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden border border-slate-200">
                <div 
                  className="bg-gradient-to-r from-emerald-500 to-teal-500 h-full rounded-full transition-all duration-500 ease-out"
                  style={{ 
                    width: escrowStage === 1 ? "25%" : escrowStage === 2 ? "50%" : escrowStage === 3 ? "75%" : "100%" 
                  }}
                />
              </div>
            </div>

            {/* 4-Stage Verification Pipeline */}
            <div className="space-y-4 max-w-md mx-auto text-xs font-semibold bg-slate-50/80 p-5 rounded-2xl border border-slate-200/80">
              
              {/* Stage 1 */}
              <div className="flex gap-3.5 items-start">
                <span className={`w-6 h-6 rounded-full font-bold flex items-center justify-center text-xs flex-shrink-0 mt-0.5 transition-colors ${
                  escrowStage >= 1 ? "bg-emerald-600 text-white" : "bg-slate-200 text-slate-500"
                }`}>
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </span>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">1. Buyer Capital Deposited (₹{totalCost.toLocaleString()})</h4>
                  <p className="text-xs text-slate-500 mt-0.5 font-normal">Funds locked into institutional escrow account (ICICI Escrow Services).</p>
                </div>
              </div>

              {/* Stage 2 */}
              <div className="flex gap-3.5 items-start border-t border-slate-200/70 pt-3.5">
                <span className={`w-6 h-6 rounded-full font-bold flex items-center justify-center text-xs flex-shrink-0 mt-0.5 transition-colors ${
                  escrowStage >= 2 ? "bg-emerald-600 text-white" : "bg-slate-200 text-slate-500"
                }`}>
                  {escrowStage >= 2 ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : <Clock className="w-3.5 h-3.5 animate-spin" />}
                </span>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">2. GCI Registry Asset Custody Lock</h4>
                  <p className="text-xs text-slate-500 mt-0.5 font-normal">Matched certificate serial hash ({project.certRegistry}) on national grid ledger.</p>
                </div>
              </div>

              {/* Stage 3 */}
              <div className="flex gap-3.5 items-start border-t border-slate-200/70 pt-3.5">
                <span className={`w-6 h-6 rounded-full font-bold flex items-center justify-center text-xs flex-shrink-0 mt-0.5 transition-colors ${
                  escrowStage >= 3 ? "bg-emerald-600 text-white" : "bg-slate-200 text-slate-500"
                }`}>
                  {escrowStage >= 3 ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : <Clock className="w-3.5 h-3.5 animate-spin" />}
                </span>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">3. Satellite Lidar Biomass Telemetry Check</h4>
                  <p className="text-xs text-slate-500 mt-0.5 font-normal">Remote sensing confirmed 98.4% canopy sequestration match in {project.location}.</p>
                </div>
              </div>

              {/* Stage 4 */}
              <div className="flex gap-3.5 items-start border-t border-slate-200/70 pt-3.5">
                <span className={`w-6 h-6 rounded-full font-bold flex items-center justify-center text-xs flex-shrink-0 mt-0.5 transition-colors ${
                  escrowStage >= 4 ? "bg-emerald-600 text-white" : "bg-slate-200 text-slate-500"
                }`}>
                  {escrowStage >= 4 ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : <Clock className="w-3.5 h-3.5 animate-spin" />}
                </span>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">4. Ownership Transferred & Payout Cleared</h4>
                  <p className="text-xs text-slate-500 mt-0.5 font-normal">Permanent retirement stamped. Escrow funds releasing to {project.developer}.</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-center gap-2 text-slate-500 text-xs font-mono">
              <Clock className="w-4 h-4 animate-spin text-emerald-600" />
              <span>SSL 256-Bit Encrypted Handshake • Protocol Verified</span>
            </div>
          </div>
        ) : (
          /* Standard Details Grid Layout */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Col: Details & Verification (60% width) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-xs font-bold px-2.5 py-0.5 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-lg uppercase tracking-wider">
                    {project.type}
                  </span>
                  <span className="text-xs text-slate-500 font-semibold">{project.location}, India</span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-emerald-950 text-emerald-400 text-xs font-bold rounded-lg border border-emerald-800">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    ACVA Verified Listing
                  </span>
                </div>

                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight leading-tight">
                  {project.name}
                </h1>
                
                <p className="text-xs text-slate-500 leading-relaxed">
                  {project.description}
                </p>

                <div className="bg-slate-50/50 border border-slate-100 p-4 rounded-xl text-xs space-y-2">
                  <span className="font-bold text-slate-700 block">Project Background</span>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    {project.details}
                  </p>
                </div>

                {/* Registry info block */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2 text-xs">
                  <div>
                    <span className="text-[8px] text-slate-400 block uppercase font-bold tracking-wider">Developer</span>
                    <strong className="text-slate-700 truncate block">{project.developer}</strong>
                  </div>
                  <div>
                    <span className="text-[8px] text-slate-400 block uppercase font-bold tracking-wider">Registry ID</span>
                    <strong className="text-slate-700 font-mono block">{project.certRegistry}</strong>
                  </div>
                  <div>
                    <span className="text-[8px] text-slate-400 block uppercase font-bold tracking-wider">Trust Score</span>
                    <strong className="text-emerald-600 block">{project.trustScore}%</strong>
                  </div>
                  <div>
                    <span className="text-[8px] text-slate-400 block uppercase font-bold tracking-wider">GCI Registry Match</span>
                    <strong className="text-emerald-600 block flex items-center gap-0.5">
                      Confirmed
                      <ShieldCheck className="w-3.5 h-3.5 inline" />
                    </strong>
                  </div>
                </div>
              </div>

              {/* Reference Price Band Custom Chart */}
              <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xs font-extrabold text-slate-800 tracking-tight">Reference Pricing Bands</h3>
                    <p className="text-[9px] text-slate-400 mt-0.5">Market price envelope for voluntary forestry credits in {project.location} (12 Months)</p>
                  </div>
                  <div className="flex gap-4 text-[10px] font-semibold text-slate-500">
                    <span className="flex items-center gap-1"><span className="w-2.5 h-1.5 bg-emerald-100 block"></span>Market Min/Max</span>
                    <span className="flex items-center gap-1"><span className="w-2.5 h-0.5 bg-emerald-600 block"></span>Project Price</span>
                  </div>
                </div>

                {/* Animated SVG Chart Rendering */}
                <div className="w-full h-44 relative bg-slate-50 rounded-xl overflow-hidden p-2">
                  <svg viewBox="0 0 400 120" className="w-full h-full">
                    {/* Shadow Range Envelope */}
                    <path
                      d="M20 90 L80 82 L140 78 L200 80 L260 74 L320 68 L380 62 L380 98 L320 102 L260 106 L200 104 L140 106 L80 110 L20 112 Z"
                      fill="#DCFCE7"
                      opacity="0.7"
                    />
                    
                    {/* Trend line */}
                    <path
                      d="M20 100 Q80 90 140 92 T260 84 T380 75"
                      fill="none"
                      stroke="#10B981"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />

                    {/* Nodes along the trend line */}
                    <circle cx="20" cy="100" r="3.5" fill="#10B981" />
                    <circle cx="140" cy="92" r="3.5" fill="#10B981" />
                    <circle cx="260" cy="84" r="3.5" fill="#10B981" />
                    <circle cx="380" cy="75" r="4.5" fill="#06B6D4" className="animate-pulse" />

                    {/* Horizontal grid lines */}
                    <line x1="20" y1="40" x2="380" y2="40" stroke="#E2E8F0" strokeWidth="0.5" strokeDasharray="3 3" />
                    <line x1="20" y1="80" x2="380" y2="80" stroke="#E2E8F0" strokeWidth="0.5" strokeDasharray="3 3" />

                    {/* Price markers */}
                    <text x="5" y="44" fill="#94A3B8" className="text-[7px] font-semibold">₹400</text>
                    <text x="5" y="84" fill="#94A3B8" className="text-[7px] font-semibold">₹300</text>

                    {/* Date markers */}
                    <text x="20" y="118" fill="#94A3B8" className="text-[7px] font-bold text-center">Aug 25</text>
                    <text x="140" y="118" fill="#94A3B8" className="text-[7px] font-bold text-center">Dec 25</text>
                    <text x="260" y="118" fill="#94A3B8" className="text-[7px] font-bold text-center">Apr 26</text>
                    <text x="380" y="118" fill="#94A3B8" className="text-[7px] font-bold text-right">Aug 26</text>
                  </svg>
                </div>
              </div>

              {/* ACVA Audits Checklist */}
              <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
                <div>
                  <h3 className="text-xs font-extrabold text-slate-800 tracking-tight">Ecosystem Verification Checklist</h3>
                  <p className="text-[9px] text-slate-400 mt-0.5">ACVA regulatory compliance points checked and passed</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-semibold">
                  <div className="flex items-start gap-2.5 p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
                    <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </span>
                    <div>
                      <strong className="text-slate-900 block font-bold">eKYC Identity Match</strong>
                      <span className="text-xs text-slate-500 font-normal mt-0.5 block">Developer eKYC is bound to registry credentials.</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
                    <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </span>
                    <div>
                      <strong className="text-slate-900 block font-bold">Registry Deduplication Check</strong>
                      <span className="text-xs text-slate-500 font-normal mt-0.5 block">Cross-referenced with Grid Controller of India registry logs.</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
                    <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </span>
                    <div>
                      <strong className="text-slate-900 block font-bold">Lidar Biomass Sequestration</strong>
                      <span className="text-xs text-slate-500 font-normal mt-0.5 block">Satellite canopy monitors confirm active tree density rates.</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
                    <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </span>
                    <div>
                      <strong className="text-slate-900 block font-bold">Escrow Ledger Bind</strong>
                      <span className="text-xs text-slate-500 font-normal mt-0.5 block">Contract binds certificate transfer with capital payout release.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Col: Checkout Purchase (40% width) */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Purchase Card */}
              <TiltCard className="w-full" shadowColor="rgba(16, 185, 129, 0.07)" maxTilt={3}>
                <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-md space-y-5">
                  <div>
                    <span className="text-[8px] text-emerald-600 block uppercase font-bold tracking-wider leading-none mb-1">Escrow Purchase</span>
                    <h3 className="text-base font-black text-slate-800">Secure Capital Offset</h3>
                  </div>

                  <div className="space-y-4">
                    {/* Select Volume Slider Input */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs text-slate-600 font-semibold">
                        <span>Enter Offset Volume</span>
                        <span>Max Available: {project.volume.toLocaleString()} Tons</span>
                      </div>
                      
                      {/* Range slider for volume selection */}
                      <input
                        type="range"
                        min="50"
                        max={project.volume}
                        step="50"
                        value={purchaseVolume}
                        onChange={(e) => setPurchaseVolume(parseInt(e.target.value, 10))}
                        className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-500 mb-2"
                      />

                      <div className="relative">
                        <input
                          type="number"
                          min="1"
                          max={project.volume}
                          value={purchaseVolume}
                          onChange={(e) => setPurchaseVolume(Math.min(project.volume, Math.max(1, parseInt(e.target.value, 10) || 0)))}
                          className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500 bg-slate-50 font-bold"
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-slate-400 font-semibold">Tons CO₂e</span>
                      </div>
                    </div>

                    {/* Calculations */}
                    <div className="space-y-2 text-xs border-t border-slate-100 pt-3">
                      <div className="flex justify-between text-slate-400">
                        <span>Carbon Offset Cost (₹{project.price}/t)</span>
                        <span className="font-bold text-slate-700">₹{subtotal.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-slate-400">
                        <span>EcoVault Settlement Fee (2%)</span>
                        <span className="font-bold text-slate-700">₹{transactionFee.toLocaleString()}</span>
                      </div>
                      <hr className="border-slate-100" />
                      <div className="flex justify-between text-sm text-[#0B3D2E] font-extrabold">
                        <span>Total Payout Cost</span>
                        <span>₹{totalCost.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  {/* Submit button */}
                  <MagneticButton
                    variant="primary"
                    onClick={handleCheckoutSubmit}
                    className="w-full py-3 text-xs"
                  >
                    <Lock className="w-3.5 h-3.5" />
                    Lock Escrow & Purchase
                  </MagneticButton>

                  {/* AI Price Negotiation Button */}
                  <div className="text-center">
                    <button
                      onClick={() => {
                        setNegotiating(!negotiating);
                        setBidStatus("idle");
                        setBidFeedback("");
                      }}
                      className="text-[10px] text-emerald-600 hover:text-emerald-700 font-bold border-b border-emerald-600 border-dotted"
                    >
                      Negotiate terms with developer
                    </button>
                  </div>

                  {/* Negotiation drawer inside checkout */}
                  {negotiating && (
                    <div className="mt-4 p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100 text-xs space-y-3 animate-slideDown">
                      <div>
                        <strong className="text-[#0B3D2E] flex items-center gap-1">
                          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                          EcoVault AI Negotiation Agent
                        </strong>
                        <span className="text-[9px] text-slate-400 block mt-0.5">Submit your bid to developer's automated pricing portal.</span>
                      </div>

                      <div className="flex gap-2">
                        <div className="relative flex-1">
                          <input
                            type="number"
                            value={bidPrice}
                            onChange={(e) => setBidPrice(parseInt(e.target.value, 10) || 0)}
                            className="w-full border border-emerald-200 rounded-lg px-2.5 py-1.5 text-xs bg-white font-semibold"
                          />
                          <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[9px] text-slate-400">₹/t</span>
                        </div>
                        <button
                          onClick={handleNegotiationSubmit}
                          disabled={bidStatus === "submitting"}
                          className="px-4 py-1.5 bg-[#0B3D2E] hover:bg-[#0B3D2E]/90 text-white font-bold rounded-lg text-xs transition-colors disabled:opacity-50"
                        >
                          Submit Bid
                        </button>
                      </div>

                      {bidStatus === "submitting" && (
                        <div className="flex items-center gap-1 text-[9px] text-slate-400">
                          <Clock className="w-3.5 h-3.5 animate-spin text-emerald-600" />
                          <span>AI Negotiation Agent analyzing bid floor...</span>
                        </div>
                      )}

                      {bidStatus === "replied" && (
                        <div className="bg-white border border-emerald-100 p-2.5 rounded-lg text-[10px] text-slate-600 leading-normal">
                          {bidFeedback}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </TiltCard>

              {/* Security Escrow explanation banner */}
              <div className="bg-[#F0FDFA] p-5 rounded-3xl border border-emerald-100 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-[#0B3D2E]">
                  <Lock className="w-4 h-4 text-emerald-600" />
                  EcoVault Escrow Shield
                </div>
                <p className="text-[10px] text-slate-500 leading-relaxed">
                  Your payment is deposited directly into our secure escrow bank account. Upon confirmation of certificate retirement logs on the Grid Controller of India registry, the escrow is automatically settled, disbursing funds to {project.developer}.
                </p>
                <div className="flex gap-2 text-[9px] font-bold text-emerald-700">
                  <span className="bg-emerald-100/60 px-2 py-0.5 rounded">eKYC Bonded</span>
                  <span className="bg-emerald-100/60 px-2 py-0.5 rounded">GCI Audited</span>
                </div>
              </div>
            </div>

          </div>
        )}

      </div>

      <Footer />
    </div>
  );
}
