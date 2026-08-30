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
  MapPin
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
    <div ref={targetRef} className="min-h-screen flex flex-col bg-white font-sans overflow-x-hidden">
      
      {/* Light-Themed Transaction Marquee Ticker with smooth edge fades */}
      <div className="bg-slate-50 border-b border-slate-200/60 text-slate-600 py-3 overflow-hidden text-[9px] font-mono tracking-wider select-none relative z-50">
        <div className="absolute left-0 top-0 bottom-0 w-44 bg-gradient-to-r from-slate-50 via-slate-50/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-44 bg-gradient-to-l from-slate-50 via-slate-50/80 to-transparent z-10 pointer-events-none" />
        <div className="animate-marquee whitespace-nowrap flex gap-12 items-center">
          {[...mockMarqueeLog, ...mockMarqueeLog].map((log, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>{log}</span>
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
          className="absolute top-20 right-16 hidden lg:flex items-center gap-1.5 px-4 py-2 bg-white border border-slate-200/60 shadow-lg rounded-2xl text-[10px] font-extrabold text-slate-700 select-none z-25 cursor-default"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          Escrow: ₹1.2 Cr Safe Locked
        </motion.div>

        <motion.div 
          style={{ y: yFloatingPill2, x: cursorTransX }}
          className="absolute bottom-28 left-20 hidden lg:flex items-center gap-1.5 px-4 py-2 bg-white border border-slate-200/60 shadow-lg rounded-2xl text-[10px] font-extrabold text-slate-700 select-none z-25 cursor-default"
        >
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          eKYC Identity Confirmed
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
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-emerald-50 text-emerald-800 text-[10px] font-extrabold rounded-full border border-emerald-200/60 mb-5 shadow-sm">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  National Grid Carbon Registry Handshake Live
                </span>
                
                <h1 className="text-4xl sm:text-5xl lg:text-[62px] font-black tracking-tight leading-[0.98] text-[#064E3B] select-none">
                  Carbon credits you can <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-cyan-500">access.</span>
                  <br />
                  Transactions you can <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-emerald-800">trust.</span>
                </h1>
                
                <p className="mt-5 text-xs sm:text-sm text-slate-500 max-w-lg mx-auto lg:mx-0 leading-relaxed font-bold">
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
                  className="bg-white/90 backdrop-blur-md p-6 border border-slate-200/80 text-slate-600 space-y-4 shadow-xl"
                  shadowColor="rgba(16, 185, 129, 0.08)"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black text-emerald-700 flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      ESG Offset Split Calculator
                    </span>
                    <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Instant valuation</span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-xs">
                    {/* Sector */}
                    <div className="space-y-1">
                      <label className="text-slate-500 block font-semibold">Your Sector</label>
                      <select
                        value={sector}
                        onChange={(e: any) => setSector(e.target.value)}
                        className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-500 text-slate-800 font-bold"
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
                        <span className="text-slate-500">Emissions Target</span>
                        <span className="text-emerald-700 font-bold">{emissions.toLocaleString()} t</span>
                      </div>
                      <input
                        type="range"
                        min="500"
                        max="100000"
                        step="500"
                        value={emissions}
                        onChange={(e) => setEmissions(parseInt(e.target.value, 10))}
                        className="w-full h-1 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-emerald-600 mt-2.5"
                      />
                    </div>
                  </div>

                  <hr className="border-slate-100" />

                  {/* Calculation Outputs */}
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                      <span className="text-[8px] text-slate-400 block uppercase font-bold tracking-wider mb-0.5">Estimated Cost</span>
                      <strong className="text-xs text-slate-800 font-black">₹{(metrics.estimatedCost / 100000).toFixed(2)} L</strong>
                    </div>
                    <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                      <span className="text-[8px] text-slate-400 block uppercase font-bold tracking-wider mb-0.5">Trees Sequest.</span>
                      <strong className="text-xs text-emerald-600 font-black flex items-center justify-center gap-0.5">
                        <TreePine className="w-3.5 h-3.5 text-emerald-600" />
                        {metrics.treesEquivalent.toLocaleString()}
                      </strong>
                    </div>
                    <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                      <span className="text-[8px] text-slate-400 block uppercase font-bold tracking-wider mb-0.5">Flight Offset</span>
                      <strong className="text-xs text-sky-600 font-black flex items-center justify-center gap-0.5">
                        <PlaneTakeoff className="w-3.5 h-3.5 text-sky-600" />
                        {metrics.flightsEquivalent.toLocaleString()}
                      </strong>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[9px] text-slate-400 font-bold">Recommended: {metrics.forestryRatio}% Forestry / {metrics.biogasRatio}% Biogas</span>
                    <MagneticButton
                      variant="primary"
                      onClick={handleApplyCalculatorSplit}
                      className="px-4 py-2 text-[10px]"
                    >
                      Apply Split
                      <ArrowRight className="w-3 h-3" />
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

      {/* Advanced Light-Themed Verification Scanner */}
      <section className="py-24 bg-white/40 backdrop-blur-md border-b border-slate-200/50 dotted-grid relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-[9px] uppercase font-bold tracking-wider bg-emerald-50 text-emerald-800 px-3 py-1 rounded-full border border-emerald-200/50">
              Audit Instrument console
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#064E3B] tracking-tight">
              Anti-Greenwashing Laser Verification Scanner
            </h2>
            <p className="text-slate-500 text-xs leading-relaxed max-w-lg mx-auto font-bold">
              Validate credit integrity by running queries directly on the Grid Controller of India registry files. Select a certificate serial to start.
            </p>
          </div>

          {/* Verification Console */}
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
            
            {/* Left Console Controller (5 cols) */}
            <div className="md:col-span-5 flex flex-col justify-between">
              <TiltCard 
                className="bg-white/90 backdrop-blur-md border border-slate-200/80 p-6 shadow-md flex flex-col justify-between h-full space-y-6"
                shadowColor="rgba(16, 185, 129, 0.05)"
              >
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
                            ? "border-emerald-500 bg-emerald-50/50 text-emerald-800 font-bold" 
                            : "border-slate-100 hover:bg-slate-50 text-slate-600"
                        }`}
                      >
                        📄 GCI-REG-2026-OD812 (Mahanadi Mangroves)
                      </button>
                      <button
                        onClick={() => setTerminalInput("GCI-REG-2026-PB291")}
                        className={`text-left p-2.5 rounded-xl border text-[10px] font-mono transition-all ${
                          terminalInput === "GCI-REG-2026-PB291" 
                            ? "border-emerald-500 bg-emerald-50/50 text-emerald-800 font-bold" 
                            : "border-slate-100 hover:bg-slate-50 text-slate-600"
                        }`}
                      >
                        📄 GCI-REG-2026-PB291 (Malwa Biogas)
                      </button>
                    </div>
                  </div>
                </div>

                <MagneticButton
                  variant="secondary"
                  onClick={runRegistryAudit}
                  disabled={terminalStatus === "running"}
                  className="w-full py-3 text-xs"
                >
                  <Activity className="w-4 h-4 text-white" />
                  Initialize Laser Scanner
                </MagneticButton>
              </TiltCard>
            </div>

            {/* Right Scanner Terminal (Frosted glass light layout) */}
            <div className="md:col-span-7 bg-white/70 backdrop-blur-md rounded-3xl p-6 shadow-lg border border-slate-200/80 relative overflow-hidden flex flex-col justify-between min-h-[300px]">
              
              {/* Laser Sweep Overlay Line */}
              {terminalStatus === "running" && <div className="laser-line" />}

              {/* Console log output (Clean light monospace text) */}
              <div className="space-y-3 font-mono text-[10px] text-slate-600 select-none overflow-y-auto max-h-[220px]">
                {terminalLogs.length > 0 ? (
                  terminalLogs.map((log, idx) => (
                    <div 
                      key={idx} 
                      className={`animate-fadeIn ${
                        idx === terminalLogs.length - 1 && terminalStatus === "success" 
                          ? "text-emerald-700 font-bold" 
                          : "text-slate-500"
                      }`}
                    >
                      {log}
                    </div>
                  ))
                ) : (
                  <div className="text-slate-400 text-center py-20">
                    // Handshake idle. Select certificate and execute scanner.
                  </div>
                )}
              </div>

              {/* Audit checks checklist display */}
              <div className="border-t border-slate-200 pt-4 mt-4 grid grid-cols-2 gap-4 text-[9px] font-mono text-slate-500">
                <div className="flex items-center gap-1.5">
                  <span className={`w-2 h-2 rounded-full ${activeStep >= 3 ? "bg-emerald-500" : "bg-slate-300"}`} />
                  <span>eKYC Verified</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className={`w-2 h-2 rounded-full ${activeStep >= 4 ? "bg-emerald-500" : "bg-slate-300"}`} />
                  <span>Registry match</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className={`w-2 h-2 rounded-full ${activeStep >= 5 ? "bg-emerald-500" : "bg-slate-300"}`} />
                  <span>Duplicate check clear</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className={`w-2 h-2 rounded-full ${activeStep >= 6 ? "bg-emerald-500" : "bg-slate-300"}`} />
                  <span>Satellite Lidar pass</span>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Buyer vs Seller dynamic panel showcase */}
      <section className="py-24 bg-slate-50/40 backdrop-blur-md border-b border-slate-200/50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
            <span className="text-[9px] uppercase font-bold tracking-wider text-slate-400 block font-bold">Adaptable Platform</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#064E3B] tracking-tight">Direct Trading Portal Preview</h2>
            <p className="text-slate-500 text-xs max-w-md mx-auto font-bold">
              EcoVault provides verified interfaces for both voluntary buyers and local project developers.
            </p>

            <div className="inline-flex bg-slate-100 p-1 rounded-xl text-xs font-bold border border-slate-200 mt-4">
              <button
                onClick={() => setActiveView("buyer")}
                className={`px-6 py-2 rounded-lg transition-all ${
                  activeView === "buyer" 
                    ? "bg-[#0B3D2E] text-white shadow-sm" 
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                I'm a Buyer
              </button>
              <button
                onClick={() => setActiveView("seller")}
                className={`px-6 py-2 rounded-lg transition-all ${
                  activeView === "seller" 
                    ? "bg-[#0B3D2E] text-white shadow-sm" 
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                I'm a Seller
              </button>
            </div>
          </div>

          {/* Showcase Panel with 3D Tilt Wrapper */}
          <div className="max-w-5xl mx-auto">
            <TiltCard 
              className="bg-white border border-slate-200/80 p-8 shadow-md min-h-[380px]"
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
                    className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
                  >
                    <div className="space-y-5 text-xs text-slate-500">
                      <span className="text-[9px] uppercase font-bold text-emerald-600 block">Corporate Buyers</span>
                      <h3 className="text-xl font-extrabold text-slate-800 tracking-tight leading-snug">
                        Purchase verified voluntary credits with zero greenwashing risk.
                      </h3>
                      <p className="leading-relaxed font-bold">
                        Corporate buyers need credits to hit carbon net-zero targets. However, greenwashing represents severe brand risks. EcoVault requires GCI registry verification and third-party ACVA audits, giving you complete trust.
                      </p>
                      <ul className="space-y-2 text-slate-600 font-bold">
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
                      <MagneticButton
                        variant="primary"
                        onClick={() => handleChoosePersona("buyer")}
                        className="px-6 py-2.5 text-xs"
                      >
                        Enter Buyer Portal
                        <ArrowRight className="w-3.5 h-3.5" />
                      </MagneticButton>
                    </div>

                    {/* UI Preview mockup */}
                    <div className="bg-slate-50 border border-slate-200/80 p-6 rounded-2xl shadow-sm space-y-4">
                      <div className="flex justify-between items-center text-xs">
                        <strong className="text-slate-800">Tata ESG Group Portfolio</strong>
                        <span className="text-[9px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold">14,200 t Offset</span>
                      </div>
                      <hr className="border-slate-200" />
                      <div className="space-y-3 text-xs text-slate-500 font-bold">
                        <div className="flex justify-between">
                          <span>Offset Target:</span>
                          <strong className="text-slate-800">50,000 tons</strong>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-1.5">
                          <div className="bg-emerald-600 h-1.5 rounded-full" style={{ width: "28%" }} />
                        </div>
                        <div className="bg-white p-2.5 rounded-lg border border-slate-100 font-mono text-[9px] text-slate-400">
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
                    className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
                  >
                    <div className="space-y-5 text-xs text-slate-500">
                      <span className="text-[9px] uppercase font-bold text-emerald-600 block">Project Developers</span>
                      <h3 className="text-xl font-extrabold text-slate-800 tracking-tight leading-snug">
                        Your Projects. Verified Once. Sold Fair.
                      </h3>
                      <p className="leading-relaxed font-bold">
                        Sellers of voluntary offsets (forestry, biogas) face opacity and lack broker access, losing huge margins. EcoVault provides direct access to corporate buyers, locks assets safely in digital vaults, and settles payouts inside 48 hours.
                      </p>
                      <ul className="space-y-2 text-slate-600 font-bold">
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
                      <MagneticButton
                        variant="primary"
                        onClick={() => handleChoosePersona("seller")}
                        className="px-6 py-2.5 text-xs"
                      >
                        Enter Seller Portal
                        <ArrowRight className="w-3.5 h-3.5" />
                      </MagneticButton>
                    </div>

                    {/* UI Preview mockup */}
                    <div className="bg-slate-50 border border-slate-200/80 p-6 rounded-2xl shadow-sm space-y-4">
                      <div className="flex justify-between items-center text-xs">
                        <strong className="text-slate-800">Rakesh Forestry Dashboard</strong>
                        <span className="text-[9px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold">Locked Vault</span>
                      </div>
                      <hr className="border-slate-200" />
                      <div className="space-y-3 text-xs text-slate-500 font-bold">
                        <div className="flex justify-between">
                          <span>Total Payouts:</span>
                          <strong className="text-slate-800">₹7,87,500</strong>
                        </div>
                        <div className="flex justify-between">
                          <span>Escrow Locked Bids:</span>
                          <strong className="text-emerald-600">2 Pending Offers</strong>
                        </div>
                        <div className="bg-white text-emerald-700 border border-emerald-100 p-2 rounded-lg text-[9px] flex items-center justify-between font-bold">
                          <span>Odisha Community Forestry</span>
                          <span>Locked in Custody ✅</span>
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
