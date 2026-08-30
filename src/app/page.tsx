"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Logo from "@/components/Logo";
import InteractiveGlobe from "@/components/InteractiveGlobe";
import AIChatDrawer from "@/components/AIChatDrawer";
import { 
  ShieldCheck, 
  ArrowRight, 
  Search, 
  CheckCircle, 
  TrendingUp, 
  Lock, 
  FileCheck, 
  Database, 
  Sparkles, 
  Landmark, 
  Globe, 
  Terminal,
  Activity,
  Layers,
  ArrowRightLeft,
  Flame,
  TreePine,
  PlaneTakeoff,
  Award
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const { switchPersona, selectProject } = useApp();
  const router = useRouter();
  
  // Interactive Calculator States
  const [sector, setSector] = useState<"tech" | "manufacturing" | "aviation" | "logistics">("tech");
  const [emissions, setEmissions] = useState<number>(10000);
  
  // Interactive Terminal Scanner state
  const [terminalInput, setTerminalInput] = useState("GCI-REG-2026-OD812");
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);
  const [terminalStatus, setTerminalStatus] = useState<"idle" | "running" | "success">("idle");
  const [activeStep, setActiveStep] = useState<number>(0);

  // Dynamic Landing tabs: Buyer or Seller view
  const [activeView, setActiveView] = useState<"buyer" | "seller">("buyer");

  // Live offset counter
  const [tonsCount, setTonsCount] = useState(142580);

  useEffect(() => {
    selectProject(null); // Clear active project focus on landing
    const timer = setInterval(() => {
      setTonsCount((prev) => prev + Math.floor(Math.random() * 3) + 1);
    }, 3000);
    return () => clearInterval(timer);
  }, [selectProject]);

  const handleChoosePersona = (role: "buyer" | "seller") => {
    switchPersona(role);
    if (role === "buyer") {
      router.push("/buyer/marketplace");
    } else {
      router.push("/seller/onboard");
    }
  };

  // Run registry audit laser scanner simulation
  const runRegistryAudit = () => {
    if (!terminalInput.trim()) return;
    setTerminalStatus("running");
    setTerminalLogs([]);
    setActiveStep(0);

    const steps = [
      "Connecting to Grid Controller of India registry API...",
      `Validating certificate hash: ${terminalInput.toUpperCase()}...`,
      "Verifying developer eKYC credentials...",
      "Running double-allocation logs check... Clear.",
      "Syncing satellite Lidar biomass readings... 98.2% match.",
      "Verification complete. Certificate locked in Vault."
    ];

    steps.forEach((stepText, index) => {
      setTimeout(() => {
        setActiveStep(index + 1);
        setTerminalLogs((prev) => [...prev, `[${new Date().toLocaleTimeString()}] ${stepText}`]);
        if (index === steps.length - 1) {
          setTerminalStatus("success");
        }
      }, (index + 1) * 750);
    });
  };

  // Calculations for Offset Calculator
  const getCalculatorMetrics = () => {
    let costPerTon = 310;
    let forestryRatio = 60;
    let biogasRatio = 40;
    
    if (sector === "tech") {
      costPerTon = 330;
      forestryRatio = 70;
      biogasRatio = 30;
    } else if (sector === "manufacturing") {
      costPerTon = 285;
      forestryRatio = 40;
      biogasRatio = 60;
    } else if (sector === "aviation") {
      costPerTon = 345;
      forestryRatio = 80;
      biogasRatio = 20;
    } else if (sector === "logistics") {
      costPerTon = 300;
      forestryRatio = 50;
      biogasRatio = 50;
    }

    const estimatedCost = emissions * costPerTon;
    const treesEquivalent = Math.round(emissions * 12);
    const flightsEquivalent = Math.round(emissions * 1.1);

    return {
      estimatedCost,
      forestryRatio,
      biogasRatio,
      treesEquivalent,
      flightsEquivalent,
      costPerTon
    };
  };

  const metrics = getCalculatorMetrics();

  const handleApplyCalculatorSplit = () => {
    switchPersona("buyer");
    // Pre-populate filters based on calculator ratios in marketplace
    router.push(`/buyer/marketplace?type=${metrics.forestryRatio > 50 ? "Forestry" : "Biogas"}&price=${metrics.costPerTon + 20}`);
  };

  const mockMarqueeLog = [
    "Tata Power retired 14,500 t in Maharashtra grid (GCI Match Validated)",
    "Reliance ESG purchased 22,000 t solar credits in Rajasthan (Escrow Secured)",
    "Infosys GreenTech retired 8,200 t biogas in Punjab (98% Lidar Sequestration)",
    "Adani Green Energy minted 45,000 t wind credits in Gujarat (Vault eLocked)",
    "ITC Limited settled ₹1.2 Cr forestry offset in Odisha estuary (Escrow cleared)",
    "Wipro Carbon Solutions retired 5,400 t Waste-to-Energy in Bengaluru",
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAF9] font-sans">
      
      {/* Live Transaction Marquee Ticker */}
      <div className="bg-[#030704] border-b border-emerald-950/40 text-slate-400 py-2.5 overflow-hidden text-[9px] font-mono tracking-wider select-none relative z-50">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#030704] to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#030704] to-transparent z-10 pointer-events-none"></div>
        <div className="animate-marquee whitespace-nowrap flex gap-12 items-center">
          {/* Double map list to make scrolling loop seamless */}
          {[...mockMarqueeLog, ...mockMarqueeLog].map((log, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>{log}</span>
            </div>
          ))}
        </div>
      </div>

      <Navbar />

      {/* Hero Section (Forest-Graphite Dark Theme + Radial Grid) */}
      <section className="bg-[#030704] text-white py-20 lg:py-24 border-b border-emerald-950/30 relative overflow-hidden dotted-grid-dark">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-emerald-500/10 to-transparent rounded-full blur-[140px] pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Heading Copy */}
            <div className="lg:col-span-7 space-y-7 text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-950/60 text-emerald-400 text-[10px] font-bold rounded-full border border-emerald-900/50 mb-4 glow-pill">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  National Carbon Grid Registry Handshake Active
                </span>
                
                <h1 className="text-4xl sm:text-5xl lg:text-[58px] font-black tracking-tight leading-[1.05] text-white">
                  Carbon credits you can <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-lime-300">access.</span>
                  <br />
                  Transactions you can <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-300">trust.</span>
                </h1>
                
                <p className="mt-4 text-xs sm:text-sm text-slate-400 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                  EcoVault connects verified voluntary carbon project developers across India directly with corporate sustainability buyers. Secure escrow, transparent pricing, and zero greenwashing.
                </p>
              </motion.div>

              {/* Dynamic Offset Calculator (Interactive WOW) */}
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="glass-panel-dark p-5 rounded-2xl border border-emerald-500/10 text-slate-300 space-y-4 text-left max-w-lg mx-auto lg:mx-0"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-emerald-400 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    ESG Offset Split Calculator
                  </span>
                  <span className="text-[9px] text-slate-500 font-semibold">Real-time Valuation</span>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs">
                  {/* Sector */}
                  <div className="space-y-1">
                    <label className="text-slate-400 block font-semibold">Your Sector</label>
                    <select
                      value={sector}
                      onChange={(e: any) => setSector(e.target.value)}
                      className="w-full p-2 bg-slate-900 border border-emerald-950 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500 text-white font-bold"
                    >
                      <option value="tech">Technology / SaaS</option>
                      <option value="manufacturing">Heavy Industrial</option>
                      <option value="aviation">Aviation / Travel</option>
                      <option value="logistics">Supply Chain</option>
                    </select>
                  </div>

                  {/* Volume Slider */}
                  <div className="space-y-1">
                    <div className="flex justify-between font-semibold">
                      <span className="text-slate-400">Emissions Target</span>
                      <span className="text-emerald-400 font-bold">{emissions.toLocaleString()} t</span>
                    </div>
                    <input
                      type="range"
                      min="500"
                      max="100000"
                      step="500"
                      value={emissions}
                      onChange={(e) => setEmissions(parseInt(e.target.value, 10))}
                      className="w-full h-1 bg-emerald-950 rounded-lg appearance-none cursor-pointer accent-emerald-500 mt-2"
                    />
                  </div>
                </div>

                <hr className="border-emerald-950" />

                {/* Calculation Outputs */}
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="p-2 bg-slate-900/60 rounded-xl border border-slate-900">
                    <span className="text-[8px] text-slate-500 block uppercase font-bold tracking-wider">Estimated Cost</span>
                    <strong className="text-xs text-white font-black">₹{(metrics.estimatedCost / 100000).toFixed(2)} L</strong>
                  </div>
                  <div className="p-2 bg-slate-900/60 rounded-xl border border-slate-900">
                    <span className="text-[8px] text-slate-500 block uppercase font-bold tracking-wider">Trees Sequest.</span>
                    <strong className="text-xs text-emerald-400 font-black flex items-center justify-center gap-0.5">
                      <TreePine className="w-3.5 h-3.5 text-emerald-400" />
                      {metrics.treesEquivalent.toLocaleString()}
                    </strong>
                  </div>
                  <div className="p-2 bg-slate-900/60 rounded-xl border border-slate-900">
                    <span className="text-[8px] text-slate-500 block uppercase font-bold tracking-wider">Flight Offset</span>
                    <strong className="text-xs text-sky-400 font-black flex items-center justify-center gap-0.5">
                      <PlaneTakeoff className="w-3.5 h-3.5 text-sky-400" />
                      {metrics.flightsEquivalent.toLocaleString()}
                    </strong>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-[9px] text-slate-500">Recommended: {metrics.forestryRatio}% Forestry / {metrics.biogasRatio}% Biogas</span>
                  <button
                    onClick={handleApplyCalculatorSplit}
                    className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg text-[9px] transition-colors shadow flex items-center gap-1"
                  >
                    Lock this split
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </motion.div>
            </div>

            {/* Right Column: 3D Globe center */}
            <div className="lg:col-span-5 flex justify-center relative w-full h-[350px] lg:h-[500px]">
              <InteractiveGlobe interactive={false} />
            </div>

          </div>
        </div>
      </section>

      {/* Advanced Laser Verification Scanner (WOW console) */}
      <section className="py-24 bg-[#F8FAF9] border-b border-slate-200/60 dotted-grid relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-[9px] uppercase font-bold tracking-wider bg-emerald-100/60 text-emerald-800 px-3 py-1 rounded-full border border-emerald-200/50">
              Auditing Engine
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B3D2E] tracking-tight">
              Anti-Greenwashing Laser Verification Scanner
            </h2>
            <p className="text-slate-500 text-xs leading-relaxed max-w-lg mx-auto">
              EcoVault guarantees credit integrity by executing direct registry queries. Select a GCI certificate code below to test the laser sweep verification scanner.
            </p>
          </div>

          {/* Verification Console */}
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
            
            {/* Left Console Controller (5 cols) */}
            <div className="md:col-span-5 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Terminal className="w-5 h-5 text-emerald-600" />
                  <h3 className="text-sm font-bold text-slate-800">Scanner Controller</h3>
                </div>
                
                <div className="space-y-2 text-xs">
                  <label className="text-slate-500 block font-semibold">Select Certificate Registry ID</label>
                  <div className="grid grid-cols-1 gap-2">
                    <button
                      onClick={() => setTerminalInput("GCI-REG-2026-OD812")}
                      className={`text-left p-2.5 rounded-xl border text-[10px] font-mono transition-all ${
                        terminalInput === "GCI-REG-2026-OD812" 
                          ? "border-emerald-500 bg-emerald-50/30 text-emerald-800 font-bold" 
                          : "border-slate-100 hover:bg-slate-50 text-slate-600"
                      }`}
                    >
                      📄 GCI-REG-2026-OD812 (Mahanadi Mangroves)
                    </button>
                    <button
                      onClick={() => setTerminalInput("GCI-REG-2026-PB291")}
                      className={`text-left p-2.5 rounded-xl border text-[10px] font-mono transition-all ${
                        terminalInput === "GCI-REG-2026-PB291" 
                          ? "border-emerald-500 bg-emerald-50/30 text-emerald-800 font-bold" 
                          : "border-slate-100 hover:bg-slate-50 text-slate-600"
                      }`}
                    >
                      📄 GCI-REG-2026-PB291 (Malwa Biogas)
                    </button>
                  </div>
                </div>
              </div>

              <button
                onClick={runRegistryAudit}
                disabled={terminalStatus === "running"}
                className="w-full py-3 bg-[#0B3D2E] hover:bg-emerald-950 disabled:opacity-50 text-white font-bold rounded-xl text-xs transition-colors shadow flex items-center justify-center gap-1.5"
              >
                <Activity className="w-4 h-4 text-white" />
                Initialize Laser Scanner
              </button>
            </div>

            {/* Right Scanner Terminal (7 cols) */}
            <div className="md:col-span-7 bg-slate-950 rounded-3xl p-6 shadow-xl border border-emerald-950/40 relative overflow-hidden flex flex-col justify-between min-h-[300px]">
              
              {/* Laser Sweep Overlay Line */}
              {terminalStatus === "running" && <div className="laser-line"></div>}

              {/* Console log output */}
              <div className="space-y-3 font-mono text-[9px] text-slate-400 select-none overflow-y-auto max-h-[220px]">
                {terminalLogs.length > 0 ? (
                  terminalLogs.map((log, idx) => (
                    <div 
                      key={idx} 
                      className={`animate-fadeIn ${
                        idx === terminalLogs.length - 1 && terminalStatus === "success" 
                          ? "text-emerald-400 font-bold" 
                          : "text-slate-300"
                      }`}
                    >
                      {log}
                    </div>
                  ))
                ) : (
                  <div className="text-slate-600 text-center py-20">
                    // Handshake idle. Select certificate and execute scanner.
                  </div>
                )}
              </div>

              {/* Audit checks checklist display */}
              <div className="border-t border-emerald-950/40 pt-4 mt-4 grid grid-cols-2 gap-4 text-[9px] font-mono text-slate-400">
                <div className="flex items-center gap-1.5">
                  <span className={`w-2 h-2 rounded-full ${activeStep >= 3 ? "bg-emerald-400" : "bg-slate-800"}`}></span>
                  <span>eKYC Verified</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className={`w-2 h-2 rounded-full ${activeStep >= 4 ? "bg-emerald-400" : "bg-slate-800"}`}></span>
                  <span>Registry match</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className={`w-2 h-2 rounded-full ${activeStep >= 5 ? "bg-emerald-400" : "bg-slate-800"}`}></span>
                  <span>Duplicate check clear</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className={`w-2 h-2 rounded-full ${activeStep >= 6 ? "bg-emerald-400" : "bg-slate-800"}`}></span>
                  <span>Satellite Lidar pass</span>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Buyer vs Seller dynamic panel showcase */}
      <section className="py-24 bg-white border-b border-slate-200/60 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
            <span className="text-[9px] uppercase font-bold tracking-wider text-slate-400 block">Adaptable Platform</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B3D2E] tracking-tight">Direct Trading Portal Preview</h2>
            <p className="text-slate-500 text-xs max-w-md mx-auto">
              EcoVault provides verified interfaces for both voluntary buyers and local project developers.
            </p>

            <div className="inline-flex bg-slate-100 p-1 rounded-xl text-xs font-bold border border-slate-200 mt-4">
              <button
                onClick={() => setActiveView("buyer")}
                className={`px-6 py-2 rounded-lg transition-all ${
                  activeView === "buyer" 
                    ? "bg-[#0B3D2E] text-white shadow" 
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                I'm a Buyer
              </button>
              <button
                onClick={() => setActiveView("seller")}
                className={`px-6 py-2 rounded-lg transition-all ${
                  activeView === "seller" 
                    ? "bg-[#0B3D2E] text-white shadow" 
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                I'm a Seller
              </button>
            </div>
          </div>

          {/* Showcase Panel */}
          <div className="max-w-5xl mx-auto bg-[#F8FAF9] border border-slate-200 rounded-3xl p-8 shadow-sm min-h-[380px]">
            <AnimatePresence mode="wait">
              {activeView === "buyer" ? (
                <motion.div
                  key="buyer-panel"
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 15 }}
                  transition={{ duration: 0.25 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
                >
                  <div className="space-y-5 text-xs text-slate-500">
                    <span className="text-[9px] uppercase font-bold text-emerald-600 block">Corporate Buyers</span>
                    <h3 className="text-xl font-extrabold text-slate-800 tracking-tight leading-snug">
                      Purchase verified voluntary credits with zero greenwashing risk.
                    </h3>
                    <p className="leading-relaxed">
                      Corporate buyers need credits to hit carbon net-zero targets. However, greenwashing represents severe brand risks. EcoVault requires GCI registry verification and third-party ACVA audits, giving you complete trust.
                    </p>
                    <ul className="space-y-2 text-slate-600">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                        Explore credits on our Interactive 3D Globe map
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                        AI-generated carbon footprint offset insights
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                        Escrow protection: capital released only upon transfer verification
                      </li>
                    </ul>
                    <button
                      onClick={() => handleChoosePersona("buyer")}
                      className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs transition-colors flex items-center gap-1 shadow"
                    >
                      Enter Buyer Portal
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* UI Preview mockup */}
                  <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm space-y-4">
                    <div className="flex justify-between items-center text-xs">
                      <strong className="text-slate-800">Tata ESG Group Portfolio</strong>
                      <span className="text-[9px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold">14,200 t Offset</span>
                    </div>
                    <hr className="border-slate-100" />
                    <div className="space-y-3 text-xs text-slate-500">
                      <div className="flex justify-between">
                        <span>Offset Target:</span>
                        <strong className="text-slate-800">50,000 tons</strong>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-1.5">
                        <div className="bg-emerald-600 h-1.5 rounded-full" style={{ width: "28%" }}></div>
                      </div>
                      <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100 font-mono text-[9px] text-slate-400">
                        // Latest Certificate: EV-CERT-OD812-4029
                      </div>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="seller-panel"
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -15 }}
                  transition={{ duration: 0.25 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
                >
                  <div className="space-y-5 text-xs text-slate-500">
                    <span className="text-[9px] uppercase font-bold text-emerald-600 block">Project Developers</span>
                    <h3 className="text-xl font-extrabold text-slate-800 tracking-tight leading-snug">
                      Your Projects. Verified Once. Sold Fair.
                    </h3>
                    <p className="leading-relaxed">
                      Sellers of voluntary offsets (forestry, biogas) face opacity and lack broker access, losing huge margins. EcoVault provides direct access to corporate buyers, locks assets safely in digital vaults, and settles payouts inside 48 hours.
                    </p>
                    <ul className="space-y-2 text-slate-600">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-[#38BDF8] flex-shrink-0" />
                        AI Reference Price Assistant to optimize listings
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-[#38BDF8] flex-shrink-0" />
                        Escrow eLock: direct payouts settled within 48h
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-[#38BDF8] flex-shrink-0" />
                        One-time eKYC and GCI registry matching
                      </li>
                    </ul>
                    <button
                      onClick={() => handleChoosePersona("seller")}
                      className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs transition-colors flex items-center gap-1 shadow"
                    >
                      Enter Seller Portal
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* UI Preview mockup */}
                  <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm space-y-4">
                    <div className="flex justify-between items-center text-xs">
                      <strong className="text-slate-800">Rakesh Forestry Dashboard</strong>
                      <span className="text-[9px] bg-emerald-950 text-emerald-400 border border-emerald-900/40 px-2 py-0.5 rounded font-bold">Locked Vault</span>
                    </div>
                    <hr className="border-slate-100" />
                    <div className="space-y-3 text-xs text-slate-500">
                      <div className="flex justify-between">
                        <span>Total Payouts:</span>
                        <strong className="text-slate-800">₹7,87,500</strong>
                      </div>
                      <div className="flex justify-between">
                        <span>Escrow Locked Bids:</span>
                        <strong className="text-emerald-600">2 Pending Offers</strong>
                      </div>
                      <div className="bg-emerald-950 text-emerald-400 border border-emerald-900/60 p-2 rounded-lg text-[9px] flex items-center justify-between font-semibold">
                        <span>Odisha Community Forestry</span>
                        <span>Locked in Custody ✅</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Strategic Roadmap (Sleek timeline) */}
      <section className="py-24 bg-white border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-2">
            <span className="text-[9px] uppercase font-bold tracking-wider text-slate-400 block">Platform Scaling</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B3D2E] tracking-tight">Compliance Roadmap 2026/27</h2>
            <p className="text-slate-500 text-xs max-w-sm mx-auto leading-relaxed">
              Paving the path towards regulated compliance exchanges, CBAM exporting, and tokenized carbon registries.
            </p>
          </div>

          <div className="max-w-4xl mx-auto bg-[#F8FAF9] border border-slate-200 rounded-3xl p-8 shadow-sm text-xs relative overflow-hidden">
            <div className="space-y-8">
              <div className="flex gap-4 items-start">
                <span className="px-3 py-1 bg-emerald-100 text-emerald-800 font-bold rounded-lg mt-0.5 uppercase tracking-wide text-[9px] border border-emerald-200">
                  Phase 1
                </span>
                <div>
                  <h4 className="font-bold text-slate-800 flex items-center gap-2">
                    Voluntary Trust Infrastructure
                    <span className="text-[9px] bg-emerald-600 text-white px-2 py-0.5 rounded-full font-bold">ACTIVE</span>
                  </h4>
                  <p className="text-slate-500 mt-1 leading-relaxed leading-normal">
                    Establishing registry handshake verification logs, direct eKYC developer validation, and the voluntary credit escrow custody shield.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start border-t border-slate-200/60 pt-6">
                <span className="px-3 py-1 bg-sky-50 text-sky-700 font-bold rounded-lg mt-0.5 uppercase tracking-wide text-[9px] border border-sky-200">
                  Phase 2
                </span>
                <div>
                  <h4 className="font-bold text-slate-800 flex items-center gap-2">
                    CCTS & CBAM Integrations
                    <span className="text-[9px] bg-sky-100 text-sky-800 px-2 py-0.5 rounded-full font-bold">2026 ROADMAP</span>
                  </h4>
                  <p className="text-slate-500 mt-1 leading-relaxed leading-normal">
                    Adding CCTS regulated market support and carbon boundary pricing calculations for exporters (steel, iron) seeking ESG credit validation.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start border-t border-slate-200/60 pt-6">
                <span className="px-3 py-1 bg-amber-50 text-amber-700 font-bold rounded-lg mt-0.5 uppercase tracking-wide text-[9px] border border-amber-200">
                  Phase 3
                </span>
                <div>
                  <h4 className="font-bold text-slate-800 flex items-center gap-2">
                    Autonomous Satellite MRV
                    <span className="text-[9px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-bold">2027 FUTURE</span>
                  </h4>
                  <p className="text-slate-500 mt-1 leading-relaxed leading-normal">
                    Integrating automated Lidar biomass density telemetry and blockchain smart contract escrow vaults to eliminate brokerage entirely.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Chat Assistant */}
      <AIChatDrawer />

      <Footer />
    </div>
  );
}
