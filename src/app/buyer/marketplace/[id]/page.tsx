"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { CarbonProject } from "@/data/mockProjects";
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
  PartyPopper,
  Sparkles,
  HelpCircle,
  Clock,
  ExternalLink,
  Award
} from "lucide-react";

export default function ProjectDetails() {
  const { id } = useParams();
  const router = useRouter();
  const { projects, selectProject, completePurchase, userProfile, updateUserProfile } = useApp();
  
  const [project, setProject] = useState<CarbonProject | null>(null);
  const [purchaseVolume, setPurchaseVolume] = useState<number>(1000);
  const [checkoutStep, setCheckoutStep] = useState<"details" | "escrow" | "success">("details");
  const [negotiating, setNegotiating] = useState(false);
  const [bidPrice, setBidPrice] = useState<number>(0);
  const [bidStatus, setBidStatus] = useState<"idle" | "submitting" | "replied">("idle");
  const [bidFeedback, setBidFeedback] = useState("");
  const [certCode, setCertCode] = useState("");

  // Retrieve project by ID
  useEffect(() => {
    if (!id) return;
    const found = projects.find((p) => p.id === id);
    if (found) {
      setProject(found);
      setBidPrice(found.price - 15); // Start bid slightly below ask
      selectProject(found); // Focus coordinates on globe
    }
  }, [id, projects, selectProject]);

  if (!project) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-sm font-semibold text-slate-500">Loading project data...</p>
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
    // Simulate escrow transfer timeline
    setTimeout(() => {
      completePurchase(project.id, purchaseVolume);
      
      // Update user target offsets
      if (userProfile) {
        updateUserProfile({
          offsetTarget: userProfile.offsetTarget
        });
      }

      // Generate a mock certificate serial number
      setCertCode(`EV-CERT-${project.certRegistry.split("-").pop()}-${Math.floor(1000 + Math.random() * 9000)}`);
      setCheckoutStep("success");
    }, 3000);
  };

  // Simulated AI Price Negotiation
  const handleNegotiationSubmit = () => {
    setBidStatus("submitting");
    setTimeout(() => {
      const minAcceptablePrice = project.price * 0.95; // Seller won't go below 5% discount
      if (bidPrice >= minAcceptablePrice) {
        setBidStatus("replied");
        setBidFeedback(`Offer Accepted! Rakesh has agreed to lock a special pricing of ₹${bidPrice}/ton for your order of ${purchaseVolume} tons. This offer will be automatically updated in your checkout.`);
        // Update local project ask price for session checkout
        project.price = bidPrice;
      } else {
        setBidStatus("replied");
        setBidFeedback(`Counter Offer Received. Rakesh declined ₹${bidPrice}/ton, citing current forest reserve maintenance costs. His minimum reference floor is ₹${Math.floor(minAcceptablePrice)}/ton. Would you like to revise your bid?`);
      }
    }, 1500);
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
          <div className="max-w-2xl mx-auto bg-white border border-slate-200 rounded-3xl p-8 shadow-xl text-center space-y-6 animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <PartyPopper className="w-8 h-8" />
            </div>
            
            <div className="space-y-2">
              <h2 className="text-2xl font-black text-[#0B3D2E]">Offset Completed Successfully!</h2>
              <p className="text-xs text-slate-500">
                Your capital has been securely routed via EcoVault Escrow. The corresponding carbon credits have been retired in the national registry.
              </p>
            </div>

            {/* Premium Gold/Emerald certificate card with border details */}
            <div className="bg-gradient-to-br from-[#030704] to-[#0B3D2E] text-white rounded-3xl p-7 text-left relative overflow-hidden shadow-2xl border-2 border-yellow-500/30 max-w-md mx-auto">
              <div className="absolute top-2 right-2 w-16 h-16 border-r-2 border-t-2 border-yellow-500/20 rounded-tr-xl"></div>
              <div className="absolute bottom-2 left-2 w-16 h-16 border-l-2 border-b-2 border-yellow-500/20 rounded-bl-xl"></div>
              
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.04)_0%,transparent_70%)]"></div>

              <div className="flex items-center justify-between mb-8 relative z-10">
                <Logo variant="icon" light={true} />
                <div className="flex items-center gap-1 bg-yellow-500/10 text-yellow-500 border border-yellow-500/25 px-2.5 py-0.5 rounded-full text-[8px] font-bold tracking-widest uppercase">
                  <Award className="w-3 h-3" />
                  Official Retirement Seal
                </div>
              </div>
              
              <div className="space-y-5 relative z-10 text-xs">
                <div>
                  <span className="text-[8px] text-slate-400 block uppercase font-bold tracking-wider leading-none mb-1">Retirement Beneficiary</span>
                  <span className="text-sm font-extrabold text-white">{userProfile?.companyName || "Tata ESG Solutions"}</span>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-[8px] text-slate-400 block uppercase font-bold tracking-wider leading-none mb-1">Volume Retired</span>
                    <span className="text-sm font-black text-emerald-400">{purchaseVolume.toLocaleString()} Tons CO₂e</span>
                  </div>
                  <div>
                    <span className="text-[8px] text-slate-400 block uppercase font-bold tracking-wider leading-none mb-1">Certificate Serial</span>
                    <span className="text-xs font-bold font-mono text-slate-200 block truncate">{certCode}</span>
                  </div>
                </div>
                
                <hr className="border-emerald-800" />
                
                <div className="flex items-center justify-between text-[8px] text-slate-400 font-semibold leading-none">
                  <span>Cross-Matched against GCI registry</span>
                  <span>Escrow cleared by EcoVault</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => {
                  selectProject(null);
                  router.push("/buyer/dashboard");
                }}
                className="w-full sm:w-auto px-8 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs transition-colors shadow"
              >
                Go to Portfolio Dashboard
              </button>
              <button
                onClick={() => window.print()}
                className="w-full sm:w-auto px-8 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition-colors flex items-center justify-center gap-2 border border-slate-200"
              >
                <Download className="w-3.5 h-3.5" />
                Download PDF
              </button>
            </div>
          </div>
        ) : checkoutStep === "escrow" ? (
          /* Escrow Loading Timeline */
          <div className="max-w-2xl mx-auto bg-white border border-slate-200 rounded-3xl p-8 shadow-xl space-y-8 animate-pulse-slow">
            <div className="text-center space-y-2">
              <h2 className="text-xl font-bold text-slate-800">Processing Escrow Safe-Settlement</h2>
              <p className="text-xs text-slate-400">Locking capital, transferring certificates, and auditing registry state.</p>
            </div>

            <div className="space-y-6 max-w-md mx-auto text-xs">
              <div className="flex gap-4 items-start">
                <span className="w-5 h-5 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-[10px] flex-shrink-0 mt-0.5">✓</span>
                <div>
                  <h4 className="font-bold text-slate-800">Buyer Funds Deposited</h4>
                  <p className="text-[10px] text-slate-400 mt-0.5">Capital securely routed to EcoVault escrow account. (Tata ESG Solutions → Escrow)</p>
                </div>
              </div>

              <div className="flex gap-4 items-start border-t border-slate-100 pt-4">
                <span className="w-5 h-5 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-[10px] flex-shrink-0 mt-0.5">✓</span>
                <div>
                  <h4 className="font-bold text-slate-800">Carbon Certificate Vault Locked</h4>
                  <p className="text-[10px] text-slate-400 mt-0.5">GCI registered carbon certificates (Ref: {project.certRegistry}) locked in digital vault custody.</p>
                </div>
              </div>

              <div className="flex gap-4 items-start border-t border-slate-100 pt-4">
                <span className="w-5 h-5 rounded-full bg-[#06B6D4] text-white font-bold flex items-center justify-center text-[10px] flex-shrink-0 mt-0.5">⌛</span>
                <div>
                  <h4 className="font-bold text-slate-800">National Registry Ownership Transfer</h4>
                  <p className="text-[10px] text-slate-400 mt-0.5">Executing retirement records on Grid Controller of India registry logs. Disbursing funds to {project.developer}.</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-center gap-2 text-slate-400 text-[10px]">
              <Clock className="w-3.5 h-3.5 animate-spin text-emerald-600" />
              <span>Simulating network block confirmation...</span>
            </div>
          </div>
        ) : (
          /* Standard Details Grid Layout */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Col: Details & Verification (60% width) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-[9px] font-bold px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded uppercase tracking-wider">
                    {project.type}
                  </span>
                  <span className="text-xs text-slate-400 font-semibold">{project.location}, India</span>
                  <span className="inline-flex items-center gap-0.5 px-2 py-0.5 bg-emerald-950 text-emerald-400 text-[9px] font-bold rounded border border-emerald-900/50">
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

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="flex items-start gap-2 p-3 bg-slate-50/50 rounded-xl border border-slate-100">
                    <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-[10px] flex-shrink-0">✓</span>
                    <div>
                      <strong className="text-slate-700 block">eKYC Identity Match</strong>
                      <span className="text-[9px] text-slate-400 mt-0.5">Developer eKYC is bound to registry credentials.</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2 p-3 bg-slate-50/50 rounded-xl border border-slate-100">
                    <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-[10px] flex-shrink-0">✓</span>
                    <div>
                      <strong className="text-slate-700 block">Registry Deduplication Check</strong>
                      <span className="text-[9px] text-slate-400 mt-0.5">Cross-referenced with Grid Controller of India registry logs.</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2 p-3 bg-slate-50/50 rounded-xl border border-slate-100">
                    <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-[10px] flex-shrink-0">✓</span>
                    <div>
                      <strong className="text-slate-700 block">Lidar Biomass Sequestration</strong>
                      <span className="text-[9px] text-slate-400 mt-0.5">Satellite canopy monitors confirm active tree density rates.</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2 p-3 bg-slate-50/50 rounded-xl border border-slate-100">
                    <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-[10px] flex-shrink-0">✓</span>
                    <div>
                      <strong className="text-slate-700 block">Escrow Ledger Bind</strong>
                      <span className="text-[9px] text-slate-400 mt-0.5">Contract binds certificate transfer with capital payout release.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Col: Checkout Purchase (40% width) */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Purchase Card */}
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
                <button
                  onClick={handleCheckoutSubmit}
                  className="w-full py-3 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-bold rounded-xl text-xs transition-colors shadow flex items-center justify-center gap-1.5"
                >
                  <Lock className="w-3.5 h-3.5" />
                  Lock Escrow & Purchase
                </button>

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
