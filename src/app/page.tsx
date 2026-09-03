"use client";

import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Logo from "@/components/Logo";
import InteractiveGlobe from "@/components/InteractiveGlobe";
import AIChatDrawer from "@/components/AIChatDrawer";
import TiltCard from "@/components/TiltCard";
import MagneticButton from "@/components/MagneticButton";
import SensoryImpactShowcase from "@/components/SensoryImpactShowcase";
import { 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle, 
  Activity, 
  Terminal, 
  Sparkles, 
  TreePine, 
  PlaneTakeoff, 
  Award,
  Lock,
  Layers,
  MapPin,
  FileCheck
} from "lucide-react";
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue } from "framer-motion";

export default function Home() {
  const { switchPersona, selectProject } = useApp();
  const router = useRouter();
  
  // Parallax scroll controllers using framer-motion hooks
  const targetRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  
  // Float different layers at different speeds (Scroll Parallax)
  const yFloatingPill1 = useTransform(scrollY, [0, 800], [0, -180]);
  const yFloatingPill2 = useTransform(scrollY, [0, 800], [0, 110]);
  const yFloatingCard = useTransform(scrollY, [0, 800], [0, -100]);
  const rotateLeaf = useTransform(scrollY, [0, 1200], [0, 75]);

  // Mouse tilt movement for Apple-style 3D cursor interaction
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleHeroMouseMove = (e: React.MouseEvent) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleHeroMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Mouse tilt transforms
  const cursorTransX = useTransform(mouseX, [-0.5, 0.5], [-20, 20]);
  const cursorTransY = useTransform(mouseY, [-0.5, 0.5], [-20, 20]);
  const globeTransX = useTransform(mouseX, [-0.5, 0.5], [-45, 45]);
  const globeTransY = useTransform(mouseY, [-0.5, 0.5], [-45, 45]);

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
    <div ref={targetRef} className="min-h-screen flex flex-col bg-transparent font-sans overflow-x-hidden relative">
      
      {/* Light-Themed Transaction Marquee Ticker with smooth edge fades */}
      <div className="bg-slate-50 border-b border-slate-200/60 text-slate-700 py-3.5 overflow-hidden text-xs font-mono tracking-wider select-none relative z-50">
        <div className="absolute left-0 top-0 bottom-0 w-44 bg-gradient-to-r from-slate-50 via-slate-50/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-44 bg-gradient-to-l from-slate-50 via-slate-50/80 to-transparent z-10 pointer-events-none" />
        <div className="animate-marquee whitespace-nowrap flex gap-12 items-center">
          {[...mockMarqueeLog, ...mockMarqueeLog].map((log, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-semibold">{log}</span>
            </div>
          ))}
        </div>
      </div>

      <Navbar />

      {/* Hero Section (Apple/Stripe Parallax + Animated Gradient Mesh & Noise) */}
      <section 
        ref={heroRef}
        onMouseMove={handleHeroMouseMove}
        onMouseLeave={handleHeroMouseLeave}
        className="animated-mesh text-slate-800 py-20 lg:py-28 border-b border-slate-200/50 relative overflow-hidden dotted-grid"
      >
        
        {/* Parallax layers mapping scroll and mouse tracking */}
        <motion.div 
          style={{ y: yFloatingPill1, x: cursorTransX }}
          className="absolute top-20 right-16 hidden lg:flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200/80 shadow-xl rounded-2xl text-xs sm:text-sm font-bold text-slate-800 select-none z-25 cursor-default"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>Escrow: ₹1.2 Cr Safe Locked</span>
        </motion.div>

        <motion.div 
          style={{ y: yFloatingPill2, x: cursorTransX }}
          className="absolute bottom-28 left-20 hidden lg:flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200/80 shadow-xl rounded-2xl text-xs sm:text-sm font-bold text-slate-800 select-none z-25 cursor-default"
        >
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>eKYC Identity Confirmed</span>
        </motion.div>

        <motion.div 
          style={{ y: yFloatingCard, rotate: rotateLeaf }}
          className="absolute top-32 left-28 hidden lg:block select-none z-20 opacity-20 pointer-events-none"
        >
          <TreePine className="w-20 h-20 text-emerald-600" />
        </motion.div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column: Heading Copy */}
            <div className="lg:col-span-6 space-y-8 text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-50 text-emerald-800 text-xs sm:text-sm font-bold rounded-full border border-emerald-200/80 mb-5 shadow-sm">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  National Grid Carbon Registry Handshake Live
                </span>
                
                <h1 className="text-4xl sm:text-5xl lg:text-[62px] font-black tracking-tight leading-[1.02] text-[#064E3B] select-none">
                  Carbon credits you can <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-cyan-500">access.</span>
                  <br />
                  Transactions you can <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-emerald-800">trust.</span>
                </h1>
                
                <p className="mt-5 text-sm sm:text-base lg:text-lg text-slate-600 max-w-lg mx-auto lg:mx-0 leading-relaxed font-semibold">
                  EcoVault connects verified voluntary carbon project developers across India directly with corporate sustainability buyers. Direct escrow settlement and satellite Lidar verification audits.
                </p>
              </motion.div>

              {/* Dynamic Offset Calculator (Premium 3D Tilt Card) */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              >
                <TiltCard 
                  className="bg-white/95 backdrop-blur-md p-6 sm:p-7 border border-slate-200/90 text-slate-700 space-y-5 shadow-xl rounded-3xl"
                  shadowColor="rgba(16, 185, 129, 0.08)"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm font-extrabold text-emerald-800 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-emerald-600" />
                      ESG Offset Split Calculator
                    </span>
                    <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Instant valuation</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    {/* Sector */}
                    <div className="space-y-1.5">
                      <label className="text-slate-700 block font-bold text-xs sm:text-sm">Your Sector</label>
                      <select
                        value={sector}
                        onChange={(e: any) => setSector(e.target.value)}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-500 text-slate-800 font-bold text-xs sm:text-sm"
                      >
                        <option value="tech">Technology / SaaS</option>
                        <option value="manufacturing">Heavy Industrial</option>
                        <option value="aviation">Aviation / Travel</option>
                        <option value="logistics">Supply Chain</option>
                      </select>
                    </div>

                    {/* Volume Slider */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between font-bold text-xs sm:text-sm">
                        <span className="text-slate-700">Emissions Target</span>
                        <span className="text-emerald-700 font-extrabold">{emissions.toLocaleString()} t</span>
                      </div>
                      <input
                        type="range"
                        min="500"
                        max="100000"
                        step="500"
                        value={emissions}
                        onChange={(e) => setEmissions(parseInt(e.target.value, 10))}
                        className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600 mt-3"
                      />
                    </div>
                  </div>

                  <hr className="border-slate-100" />

                  {/* Calculation Outputs */}
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                      <span className="text-[10px] sm:text-xs text-slate-500 block uppercase font-bold tracking-wider mb-1">Estimated Cost</span>
                      <strong className="text-sm sm:text-base text-slate-900 font-black">₹{(metrics.estimatedCost / 100000).toFixed(2)} L</strong>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                      <span className="text-[10px] sm:text-xs text-slate-500 block uppercase font-bold tracking-wider mb-1">Trees Sequest.</span>
                      <strong className="text-sm sm:text-base text-emerald-700 font-black flex items-center justify-center gap-1">
                        <TreePine className="w-4 h-4 text-emerald-600" />
                        {metrics.treesEquivalent.toLocaleString()}
                      </strong>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                      <span className="text-[10px] sm:text-xs text-slate-500 block uppercase font-bold tracking-wider mb-1">Flight Offset</span>
                      <strong className="text-sm sm:text-base text-sky-700 font-black flex items-center justify-center gap-1">
                        <PlaneTakeoff className="w-4 h-4 text-sky-600" />
                        {metrics.flightsEquivalent.toLocaleString()}
                      </strong>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
                    <span className="text-xs text-slate-500 font-bold">Recommended: {metrics.forestryRatio}% Forestry / {metrics.biogasRatio}% Biogas</span>
                    <MagneticButton
                      variant="primary"
                      onClick={handleApplyCalculatorSplit}
                      className="w-full sm:w-auto px-5 py-2.5 text-xs sm:text-sm font-bold shadow-md"
                    >
                      <span>Apply Split</span>
                      <ArrowRight className="w-4 h-4" />
                    </MagneticButton>
                  </div>
                </TiltCard>
              </motion.div>
            </div>

            {/* Right Column: Globe Area (Bleeds off screen like Stripe/Lusion, responds to mouse movement) */}
            <div className="lg:col-span-6 flex justify-center relative w-full h-[400px] lg:h-[550px] overflow-visible">
              <motion.div 
                style={{ x: globeTransX, y: globeTransY }}
                className="w-full lg:w-[130%] h-full relative overflow-visible flex items-center justify-center lg:-mr-32"
              >
                <InteractiveGlobe interactive={true} />
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* Interactive Carbon Sensory Showcase (Kumo Matcha-style liquid flavor & impact explorer) */}
      <SensoryImpactShowcase />

      {/* High-Tech Anti-Greenwashing Laser Verification Scanner Console */}
      <section className="py-24 bg-[#03140F] text-white border-y border-emerald-950/80 relative overflow-hidden">
        {/* Ambient atmospheric cyan & emerald background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[850px] h-[380px] bg-gradient-to-b from-emerald-500/15 via-cyan-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-emerald-950/90 text-emerald-400 text-xs font-bold rounded-full border border-emerald-800/80 shadow-md">
              <Terminal className="w-3.5 h-3.5 text-emerald-400" />
              <span>National Registry Audit Instrument Console</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              Anti-Greenwashing Laser Verification Scanner
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl mx-auto font-medium">
              Validate voluntary carbon credit integrity by querying the Grid Controller of India registry files and satellite Lidar telemetry in real time.
            </p>
          </div>

          {/* Verification Console */}
          <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left Console Controller (5 cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div className="bg-[#06281E]/90 backdrop-blur-xl border border-emerald-800/60 p-6 rounded-3xl shadow-2xl flex flex-col justify-between h-full space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2.5 border-b border-emerald-900/60 pb-3">
                    <Terminal className="w-5 h-5 text-emerald-400" />
                    <h3 className="text-base font-bold text-white tracking-wide">Registry Controller</h3>
                  </div>
                  
                  <div className="space-y-2.5 text-xs">
                    <label className="text-slate-300 block font-bold">Select Certificate Registry ID to Audit</label>
                    <div className="grid grid-cols-1 gap-2">
                      {[
                        { id: "GCI-REG-2026-OD812", name: "Mahanadi Mangroves", loc: "Odisha" },
                        { id: "GCI-REG-2026-PB291", name: "Malwa Agri-Biogas", loc: "Punjab" },
                        { id: "GCI-REG-2026-RJ404", name: "Thar Desert Solar", loc: "Rajasthan" },
                        { id: "GCI-REG-2026-GJ118", name: "Kutch Coastal Wind", loc: "Gujarat" },
                        { id: "GCI-REG-2026-KA780", name: "Bengaluru Bio-Energy", loc: "Karnataka" },
                      ].map((item) => {
                        const isSelected = terminalInput === item.id;
                        return (
                          <button
                            key={item.id}
                            onClick={() => setTerminalInput(item.id)}
                            className={`text-left p-3 rounded-2xl border text-xs font-mono transition-all flex items-center justify-between cursor-pointer ${
                              isSelected 
                                ? "border-emerald-400 bg-emerald-950/90 text-emerald-300 font-bold shadow-lg shadow-emerald-950/60 ring-1 ring-emerald-400/30" 
                                : "border-emerald-950/80 bg-black/40 hover:bg-emerald-950/40 text-slate-300"
                            }`}
                          >
                            <div className="flex items-center gap-2.5 truncate">
                              <FileCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                              <span className="truncate">{item.id} ({item.name})</span>
                            </div>
                            {isSelected && (
                              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 flex-shrink-0" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <MagneticButton
                  variant="primary"
                  onClick={runRegistryAudit}
                  disabled={terminalStatus === "running"}
                  className="w-full py-3.5 text-xs shadow-lg font-bold"
                >
                  <Activity className={`w-4 h-4 text-white ${terminalStatus === "running" ? "animate-spin" : ""}`} />
                  <span>{terminalStatus === "running" ? "Executing Laser Audit Sweep..." : "Initialize Laser Scanner"}</span>
                </MagneticButton>
              </div>
            </div>

            {/* Right Scanner Terminal */}
            <div className="lg:col-span-7 bg-[#020C09]/95 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-emerald-900/80 relative overflow-hidden flex flex-col justify-between min-h-[380px]">
              
              {/* Laser Sweep Overlay Line */}
              {terminalStatus === "running" && <div className="laser-line-highres" />}

              {/* Header Telemetry Bar */}
              <div className="flex items-center justify-between pb-3 border-b border-emerald-950/90 text-xs font-mono text-slate-400">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-emerald-300 font-bold">GCI-LIVE-GATEWAY</span>
                </span>
                <span className="text-[11px] text-slate-400">PORT: 8443 / SSL ENCRYPTED</span>
              </div>

              {/* Console log output */}
              <div className="space-y-3 font-mono text-xs sm:text-sm text-slate-300 select-none overflow-y-auto max-h-[240px] my-4 leading-relaxed">
                {terminalLogs.length > 0 ? (
                  terminalLogs.map((log, idx) => (
                    <div 
                      key={idx} 
                      className={`animate-fadeIn ${
                        idx === terminalLogs.length - 1 && terminalStatus === "success" 
                          ? "text-emerald-300 font-bold bg-emerald-950/40 p-2.5 rounded-xl border border-emerald-800/60" 
                          : "text-slate-300"
                      }`}
                    >
                      {log}
                    </div>
                  ))
                ) : (
                  <div className="text-slate-500 text-center py-20 font-mono text-xs">
                    // Handshake idle. Select a certificate registry ID on the left and click Initialize.
                  </div>
                )}
              </div>

              {/* Audit checks checklist display */}
              <div className="border-t border-emerald-950/90 pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                <div className="flex items-center gap-2 bg-emerald-950/30 p-2 rounded-xl border border-emerald-900/40">
                  <span className={`w-2.5 h-2.5 rounded-full ${activeStep >= 3 ? "bg-emerald-400 animate-pulse" : "bg-slate-700"}`} />
                  <span className={activeStep >= 3 ? "text-emerald-300 font-bold" : "text-slate-500"}>eKYC Verified</span>
                </div>
                <div className="flex items-center gap-2 bg-emerald-950/30 p-2 rounded-xl border border-emerald-900/40">
                  <span className={`w-2.5 h-2.5 rounded-full ${activeStep >= 4 ? "bg-emerald-400 animate-pulse" : "bg-slate-700"}`} />
                  <span className={activeStep >= 4 ? "text-emerald-300 font-bold" : "text-slate-500"}>GCI Match</span>
                </div>
                <div className="flex items-center gap-2 bg-emerald-950/30 p-2 rounded-xl border border-emerald-900/40">
                  <span className={`w-2.5 h-2.5 rounded-full ${activeStep >= 5 ? "bg-emerald-400 animate-pulse" : "bg-slate-700"}`} />
                  <span className={activeStep >= 5 ? "text-emerald-300 font-bold" : "text-slate-500"}>No Duplicate</span>
                </div>
                <div className="flex items-center gap-2 bg-emerald-950/30 p-2 rounded-xl border border-emerald-900/40">
                  <span className={`w-2.5 h-2.5 rounded-full ${activeStep >= 6 ? "bg-emerald-400 animate-pulse" : "bg-slate-700"}`} />
                  <span className={activeStep >= 6 ? "text-emerald-300 font-bold" : "text-slate-500"}>Lidar Pass</span>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Buyer vs Seller dynamic panel showcase */}
      <section className="py-24 bg-slate-50/40 backdrop-blur-md border-b border-slate-200/50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="inline-flex items-center gap-1.5 text-xs uppercase font-bold tracking-wider text-emerald-800 bg-emerald-50 px-4 py-1.5 rounded-full border border-emerald-200/80 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              Adaptable Trading Ecosystem
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#064E3B] tracking-tight">
              Direct Trading Portal Preview
            </h2>
            <p className="text-slate-600 text-sm sm:text-base max-w-lg mx-auto font-medium leading-relaxed">
              EcoVault provides verified interfaces tailored specifically for corporate ESG buyers and local project developers.
            </p>

            <div className="inline-flex bg-slate-100 p-1.5 rounded-2xl text-sm font-bold border border-slate-200 mt-4 shadow-sm">
              <button
                onClick={() => setActiveView("buyer")}
                className={`px-8 py-3 rounded-xl transition-all cursor-pointer ${
                  activeView === "buyer" 
                    ? "bg-[#0B3D2E] text-white shadow-md font-bold" 
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                I'm a Corporate Buyer
              </button>
              <button
                onClick={() => setActiveView("seller")}
                className={`px-8 py-3 rounded-xl transition-all cursor-pointer ${
                  activeView === "seller" 
                    ? "bg-[#0B3D2E] text-white shadow-md font-bold" 
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                I'm a Project Developer
              </button>
            </div>
          </div>

          {/* Showcase Panel with 3D Tilt Wrapper */}
          <div className="max-w-5xl mx-auto">
            <TiltCard 
              className="bg-white/95 backdrop-blur-md border border-slate-200/90 p-8 sm:p-10 shadow-xl rounded-3xl min-h-[400px]"
              shadowColor="rgba(16, 185, 129, 0.05)"
            >
              <AnimatePresence mode="wait">
                {activeView === "buyer" ? (
                  <motion.div
                    key="buyer-panel"
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 15 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 items-center"
                  >
                    <div className="space-y-6 text-sm text-slate-600">
                      <span className="text-xs uppercase font-extrabold text-emerald-700 tracking-wider block">Corporate ESG Buyers</span>
                      <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                        Purchase verified voluntary credits with zero greenwashing risk.
                      </h3>
                      <p className="leading-relaxed font-medium text-slate-600 text-sm sm:text-base">
                        Corporate buyers need credits to hit carbon net-zero targets. However, greenwashing represents severe brand risks. EcoVault requires GCI registry verification and third-party ACVA audits, giving you complete trust.
                      </p>
                      <ul className="space-y-3 text-slate-700 font-semibold text-sm sm:text-base">
                        <li className="flex items-center gap-2.5">
                          <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                          <span>Explore credits on our Interactive 3D Globe map</span>
                        </li>
                        <li className="flex items-center gap-2.5">
                          <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                          <span>AI-generated carbon footprint offset insights</span>
                        </li>
                        <li className="flex items-center gap-2.5">
                          <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                          <span>Escrow protection: capital released only upon transfer verification</span>
                        </li>
                      </ul>
                      <MagneticButton
                        variant="primary"
                        onClick={() => handleChoosePersona("buyer")}
                        className="px-7 py-3 text-sm font-bold shadow-md"
                      >
                        <span>Enter Buyer Portal</span>
                        <ArrowRight className="w-4 h-4" />
                      </MagneticButton>
                    </div>

                    {/* UI Preview mockup */}
                    <div className="bg-slate-50 border border-slate-200/90 p-6 sm:p-8 rounded-3xl shadow-sm space-y-5">
                      <div className="flex justify-between items-center text-sm">
                        <strong className="text-slate-900 font-bold">Tata ESG Group Portfolio</strong>
                        <span className="text-xs bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full font-bold">14,200 t Offset</span>
                      </div>
                      <hr className="border-slate-200" />
                      <div className="space-y-4 text-sm text-slate-600 font-medium">
                        <div className="flex justify-between items-center">
                          <span>Offset Target:</span>
                          <strong className="text-slate-900 font-bold text-base">50,000 tons</strong>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2">
                          <div className="bg-emerald-600 h-2 rounded-full" style={{ width: "28%" }} />
                        </div>
                        <div className="bg-white p-3 rounded-xl border border-slate-200 font-mono text-xs text-slate-600 font-semibold">
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
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 items-center"
                  >
                    <div className="space-y-6 text-sm text-slate-600">
                      <span className="text-xs uppercase font-extrabold text-sky-700 tracking-wider block">Project Developers</span>
                      <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                        Your Projects. Verified Once. Sold Fair.
                      </h3>
                      <p className="leading-relaxed font-medium text-slate-600 text-sm sm:text-base">
                        Sellers of voluntary offsets (forestry, biogas) face opacity and lack broker access, losing huge margins. EcoVault provides direct access to corporate buyers, locks assets safely in digital vaults, and settles payouts inside 48 hours.
                      </p>
                      <ul className="space-y-3 text-slate-700 font-semibold text-sm sm:text-base">
                        <li className="flex items-center gap-2.5">
                          <CheckCircle className="w-5 h-5 text-[#38BDF8] flex-shrink-0" />
                          <span>AI Reference Price Assistant to optimize listings</span>
                        </li>
                        <li className="flex items-center gap-2.5">
                          <CheckCircle className="w-5 h-5 text-[#38BDF8] flex-shrink-0" />
                          <span>Escrow eLock: direct payouts settled within 48h</span>
                        </li>
                        <li className="flex items-center gap-2.5">
                          <CheckCircle className="w-5 h-5 text-[#38BDF8] flex-shrink-0" />
                          <span>One-time eKYC and GCI registry matching</span>
                        </li>
                      </ul>
                      <MagneticButton
                        variant="primary"
                        onClick={() => handleChoosePersona("seller")}
                        className="px-7 py-3 text-sm font-bold shadow-md"
                      >
                        <span>Enter Seller Portal</span>
                        <ArrowRight className="w-4 h-4" />
                      </MagneticButton>
                    </div>

                    {/* UI Preview mockup */}
                    <div className="bg-slate-50 border border-slate-200/90 p-6 sm:p-8 rounded-3xl shadow-sm space-y-5">
                      <div className="flex justify-between items-center text-sm">
                        <strong className="text-slate-900 font-bold">Mahanadi Mangrove Custody</strong>
                        <span className="text-xs bg-sky-100 text-sky-800 px-3 py-1 rounded-full font-bold">Vault Locked</span>
                      </div>
                      <hr className="border-slate-200" />
                      <div className="space-y-4 text-sm text-slate-600 font-medium">
                        <div className="flex justify-between items-center">
                          <span>Verified Inventory:</span>
                          <strong className="text-slate-900 font-bold text-base">14,500 tons</strong>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2">
                          <div className="bg-sky-500 h-2 rounded-full" style={{ width: "68%" }} />
                        </div>
                        <div className="bg-white p-3 rounded-xl border border-slate-200 font-mono text-xs text-slate-600 font-semibold">
                          // Settlement Status: ₹44.95 L Cleared
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </TiltCard>
          </div>
        </div>
      </section>

      {/* Strategic Roadmap (Sleek timeline) */}
      <section className="py-24 bg-white/40 backdrop-blur-md border-b border-slate-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-2">
            <span className="text-[9px] uppercase font-bold tracking-wider text-slate-400 block font-bold">Platform Scaling</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#064E3B] tracking-tight">Compliance Roadmap 2026/27</h2>
            <p className="text-slate-500 text-xs max-w-sm mx-auto leading-relaxed font-bold">
              Paving the path towards regulated compliance exchanges, CBAM exporting, and tokenized carbon registries.
            </p>
          </div>

          <div className="max-w-4xl mx-auto bg-slate-50/50 border border-slate-200 rounded-3xl p-8 shadow-sm text-xs relative overflow-hidden">
            <div className="space-y-8 font-bold">
              <div className="flex gap-4 items-start animate-fadeIn">
                <span className="px-3 py-1 bg-emerald-100 text-emerald-800 font-bold rounded-lg mt-0.5 uppercase tracking-wide text-[9px] border border-emerald-200">
                  Phase 1
                </span>
                <div>
                  <h4 className="font-bold text-slate-800 flex items-center gap-2">
                    Voluntary Trust Infrastructure
                    <span className="text-[9px] bg-emerald-600 text-white px-2 py-0.5 rounded-full font-bold shadow-sm">ACTIVE</span>
                  </h4>
                  <p className="text-slate-500 mt-1 leading-relaxed font-medium">
                    Establishing registry handshake verification logs, direct eKYC developer validation, and the voluntary credit escrow custody shield.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start border-t border-slate-200/60 pt-6 animate-fadeIn">
                <span className="px-3 py-1 bg-sky-50 text-sky-700 font-bold rounded-lg mt-0.5 uppercase tracking-wide text-[9px] border border-sky-200">
                  Phase 2
                </span>
                <div>
                  <h4 className="font-bold text-slate-800 flex items-center gap-2">
                    CCTS & CBAM Integrations
                    <span className="text-[9px] bg-sky-100 text-sky-800 px-2 py-0.5 rounded-full font-bold">2026 ROADMAP</span>
                  </h4>
                  <p className="text-slate-500 mt-1 leading-relaxed font-medium">
                    Adding CCTS regulated market support and carbon boundary pricing calculations for exporters (steel, iron) seeking ESG credit validation.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start border-t border-slate-200/60 pt-6 animate-fadeIn">
                <span className="px-3 py-1 bg-amber-50 text-amber-700 font-bold rounded-lg mt-0.5 uppercase tracking-wide text-[9px] border border-amber-200">
                  Phase 3
                </span>
                <div>
                  <h4 className="font-bold text-slate-800 flex items-center gap-2">
                    Autonomous Satellite MRV
                    <span className="text-[9px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-bold">2027 FUTURE</span>
                  </h4>
                  <p className="text-slate-500 mt-1 leading-relaxed font-medium">
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
