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
  ArrowRightLeft
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const { switchPersona, selectProject } = useApp();
  const router = useRouter();
  
  // Interactive Terminal state
  const [terminalInput, setTerminalInput] = useState("GCI-REG-2026-OD812");
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);
  const [terminalStatus, setTerminalStatus] = useState<"idle" | "running" | "success" | "error">("idle");

  // Dynamic Landing tabs: Buyer or Seller view
  const [activeView, setActiveView] = useState<"buyer" | "seller">("buyer");

  // Live offset counter
  const [tonsCount, setTonsCount] = useState(142580);

  useEffect(() => {
    selectProject(null); // Clear any active project focus on landing
    const timer = setInterval(() => {
      setTonsCount((prev) => prev + Math.floor(Math.random() * 3) + 1);
    }, 3500);
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

  // Run registry audit simulation
  const runRegistryAudit = () => {
    if (!terminalInput.trim()) return;
    setTerminalStatus("running");
    setTerminalLogs([]);

    const logs = [
      `[0.1s] Initializing handshake with Grid Controller of India registry API...`,
      `[0.8s] Querying certificate ID: ${terminalInput.toUpperCase()}...`,
      `[1.5s] Fetching SHA-256 certificate hash and matching metadata...`,
      `[2.2s] Validating developer eKYC signature: Tata ESG / Rakesh Forestry...`,
      `[2.8s] Checking double-allocation logs: 0 matching claims found. Integrity clear.`,
      `[3.5s] Fetching ACVA Lidar Biomass density logs: 98% density match...`,
      `[4.0s] eLock verified. MATCH FOUND. Certificate locked in EcoVault custody.`
    ];

    logs.forEach((log, index) => {
      setTimeout(() => {
        setTerminalLogs((prev) => [...prev, log]);
        if (index === logs.length - 1) {
          setTerminalStatus("success");
        }
      }, (index + 1) * 650);
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7FAF8] font-sans transition-colors duration-300">
      <Navbar />

      {/* Hero Section (Dramatic Dark Grid Bleed) */}
      <section className="bg-[#070B09] text-white py-20 lg:py-28 border-b border-emerald-950/40 relative overflow-hidden grid-pattern-dark">
        {/* Subtle mesh background glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-gradient-to-b from-emerald-500/10 to-transparent rounded-full blur-[140px] pointer-events-none"></div>
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-emerald-950/20 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Copy */}
            <div className="lg:col-span-6 space-y-7 text-center lg:text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-950/60 text-emerald-400 text-[10px] font-bold rounded-full border border-emerald-900/50 mb-2 glow-pill">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                Grid Controller of India (GCI) Registry Connected
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08] text-white">
                Carbon credits you can <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-emerald-300 to-lime-300">access.</span>
                <br />
                Transactions you can <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-sky-300 to-sky-400">trust.</span>
              </h1>
              
              <p className="text-slate-400 text-xs sm:text-sm max-w-xl mx-auto lg:mx-0 leading-relaxed">
                EcoVault connects verified voluntary carbon project developers across India directly with corporate sustainability buyers. Secure escrow payouts, transparent pricing, and zero greenwashing.
              </p>

              {/* Persona Selector Tabs (Premium Slider look) */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <button
                  onClick={() => handleChoosePersona("buyer")}
                  className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-bold rounded-xl shadow-lg shadow-emerald-950/60 hover:shadow-emerald-400/20 transform hover:-translate-y-0.5 transition-all text-xs flex items-center justify-center gap-2 border border-emerald-500/20"
                >
                  I'm a Corporate Buyer
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleChoosePersona("seller")}
                  className="w-full sm:w-auto px-8 py-3.5 bg-slate-950 hover:bg-slate-900 text-emerald-400 hover:text-emerald-300 font-bold rounded-xl border border-emerald-900/40 hover:border-emerald-700/80 transition-all text-xs flex items-center justify-center gap-2"
                >
                  I'm a Project Seller
                  <Search className="w-4 h-4" />
                </button>
              </div>

              {/* Trust badges row */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-3 text-[10px] text-slate-500 pt-2 font-semibold">
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-sky-400" />
                  <span>No Hidden Spread</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-sky-400" />
                  <span>ACVA Audits Included</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-sky-400" />
                  <span>Flat 2% Settlement Fee</span>
                </div>
              </div>
            </div>

            {/* Right: Immersive 3D Globe */}
            <div className="lg:col-span-6 flex justify-center relative w-full h-[380px] lg:h-[550px]">
              <div className="w-full h-full relative">
                {/* Floating stats metrics card over the globe */}
                <div className="absolute top-2 right-2 z-10 glass-panel-dark p-3.5 rounded-xl border border-emerald-500/10 text-white space-y-1 select-none shadow-lg animate-float">
                  <span className="text-[8px] uppercase font-bold text-slate-400 block tracking-wider">Retired Offsets</span>
                  <span className="text-lg font-black text-emerald-400">{tonsCount.toLocaleString()} t</span>
                  <span className="text-[7px] text-slate-500 block">Retired on India Grid</span>
                </div>
                <InteractiveGlobe interactive={false} />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Grid Pattern Dividers (Stripe look) */}
      <section className="bg-white border-b border-slate-200/60 py-12 relative z-20 shadow-sm grid-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
            <div className="p-4 space-y-1">
              <span className="text-[9px] uppercase font-bold tracking-wider text-slate-400 block">Total Carbon Offset</span>
              <span className="text-3xl font-extrabold text-slate-800 tracking-tight">
                {tonsCount.toLocaleString()} <span className="text-emerald-600 text-sm font-semibold">Tons CO₂e</span>
              </span>
              <span className="text-[9px] text-emerald-600 block font-semibold">▲ Verified via Registry API</span>
            </div>
            <div className="p-4 space-y-1">
              <span className="text-[9px] uppercase font-bold tracking-wider text-slate-400 block">Onboarded Developers</span>
              <span className="text-3xl font-extrabold text-slate-800 tracking-tight">
                120+ <span className="text-sky-500 text-sm font-semibold">Verified Sellers</span>
              </span>
              <span className="text-[9px] text-slate-500 block">Odisha, Punjab, Rajasthan, Gujarat</span>
            </div>
            <div className="p-4 space-y-1">
              <span className="text-[9px] uppercase font-bold tracking-wider text-slate-400 block">Escrow Release Cycle</span>
              <span className="text-3xl font-extrabold text-slate-800 tracking-tight">
                &lt; 48 <span className="text-amber-500 text-sm font-semibold">Hours</span>
              </span>
              <span className="text-[9px] text-slate-500 block">Average registry execution speed</span>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Interactive Verification Terminal (Interactive WOW) */}
      <section className="py-20 bg-[#F7FAF8] grid-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <span className="text-[9px] uppercase font-bold tracking-wider bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full border border-emerald-200">
              Handshake Terminal
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B3D2E] tracking-tight">
              Instant Registry Handshake Audit
            </h2>
            <p className="text-slate-500 text-xs leading-relaxed max-w-lg mx-auto">
              EcoVault bypasses brokers by building direct verification checks against national registries. Paste a mock certificate registry ID below to test the audit trace.
            </p>
          </div>

          <div className="max-w-2xl mx-auto bg-slate-950 rounded-3xl p-6 shadow-2xl border border-emerald-950/40 space-y-4">
            
            {/* Terminal Input Controls */}
            <div className="flex gap-3 text-xs">
              <div className="relative flex-1">
                <Terminal className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={terminalInput}
                  onChange={(e) => setTerminalInput(e.target.value)}
                  placeholder="Enter GCI Registry ID (e.g. GCI-REG-2026-OD812)"
                  className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-emerald-950 text-emerald-400 font-mono rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>
              <button
                onClick={runRegistryAudit}
                disabled={terminalStatus === "running"}
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold rounded-xl transition-colors shadow flex items-center gap-1.5"
              >
                {terminalStatus === "running" ? (
                  <>
                    <Activity className="w-4 h-4 animate-spin text-white" />
                    Auditing...
                  </>
                ) : (
                  <>
                    <Activity className="w-4 h-4 text-white" />
                    Audit Certificate
                  </>
                )}
              </button>
            </div>

            {/* Code Output Screen */}
            <div className="h-48 bg-black/80 rounded-2xl p-4 font-mono text-[10px] text-slate-300 space-y-2 overflow-y-auto border border-emerald-950/20 select-none">
              {terminalLogs.length > 0 ? (
                terminalLogs.map((log, idx) => (
                  <div 
                    key={idx} 
                    className={
                      idx === terminalLogs.length - 1 && terminalStatus === "success" 
                        ? "text-emerald-400 font-bold" 
                        : "text-slate-300"
                    }
                  >
                    {log}
                  </div>
                ))
              ) : (
                <div className="text-slate-600 text-center py-12">
                  // Handshake idle. Enter certificate code and trigger audit above.
                </div>
              )}
            </div>

            <div className="flex justify-between items-center text-[8px] text-slate-600 font-semibold px-2">
              <span>Registry Match: {terminalStatus === "success" ? "VERIFIED ✅" : "IDLE"}</span>
              <span>SHA-256 Custody Hash Enabled</span>
            </div>
          </div>
        </div>
      </section>

      {/* Persona View Switcher Showcase (Buyer vs Seller Dynamic Card) */}
      <section className="py-20 bg-white border-t border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B3D2E] tracking-tight">Two Portals. One Secure Pipeline.</h2>
            <p className="text-slate-500 text-xs max-w-md mx-auto">
              EcoVault adapts to your ESG objectives. Choose your role to preview the custom trading experience.
            </p>
            
            {/* View Switch Tabs */}
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

          {/* Dynamic Panel Frame */}
          <div className="max-w-5xl mx-auto bg-slate-50 border border-slate-200/80 rounded-3xl p-8 shadow-md relative overflow-hidden min-h-[380px]">
            <AnimatePresence mode="wait">
              {activeView === "buyer" ? (
                <motion.div
                  key="buyer-view"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
                >
                  <div className="space-y-5">
                    <span className="text-[9px] uppercase font-bold text-emerald-600 block">Sustainbility Managers</span>
                    <h3 className="text-xl font-bold text-slate-800 tracking-tight leading-snug">
                      Offset with Confidence.
                      <br />
                      Safeguard your corporate reputation.
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Corporate buyers need credits to hit carbon net-zero targets. However, greenwashing scandals represent severe brand risks. EcoVault requires 100% GCI registry verification and third-party ACVA audits, giving you complete trust.
                    </p>
                    <ul className="space-y-2 text-xs text-slate-600">
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

                  {/* UI Preview mock */}
                  <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm space-y-4">
                    <div className="flex justify-between items-center text-xs">
                      <strong className="text-slate-800">Tata ESG Group Portfolio</strong>
                      <span className="text-[9px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold">14,200 t Offset</span>
                    </div>
                    <hr className="border-slate-100" />
                    <div className="space-y-2.5 text-xs text-slate-500">
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
                  key="seller-view"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
                >
                  <div className="space-y-5">
                    <span className="text-[9px] uppercase font-bold text-emerald-600 block">Project Developers</span>
                    <h3 className="text-xl font-bold text-slate-800 tracking-tight leading-snug">
                      Your Projects. Verified Once.
                      <br />
                      Sold Fair.
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Sellers of voluntary offsets (forestry, biogas) face opacity and lack broker access, losing huge margins. EcoVault provides direct access to corporate buyers, locks assets safely in digital vaults, and settles payouts inside 48 hours.
                    </p>
                    <ul className="space-y-2 text-xs text-slate-600">
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

                  {/* UI Preview mock */}
                  <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm space-y-4">
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

      {/* Strategy Pillars (Values) */}
      <section className="py-20 bg-[#F7FAF8] grid-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-2">
            <span className="text-[9px] uppercase font-bold tracking-wider text-slate-400 block">Corporate Mandate</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B3D2E] tracking-tight">
              EcoVault Integrity Pillars
            </h2>
            <p className="text-slate-500 text-xs max-w-md mx-auto leading-relaxed">
              We anchor our ecosystem around five core values, removing structural greenwashing from the trade.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-xs">
            <div className="bg-white p-7 rounded-2xl border border-slate-200/60 shadow-sm space-y-3 group hover:border-emerald-500/30 transition-all">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">1</div>
              <h3 className="text-sm font-bold text-slate-800">Trust First</h3>
              <p className="text-slate-500 leading-relaxed">
                Every listing is verified against the official Grid Controller of India registry logs before it reaches a buyer; credibility is our product.
              </p>
            </div>

            <div className="bg-white p-7 rounded-2xl border border-slate-200/60 shadow-sm space-y-3 group hover:border-emerald-500/30 transition-all">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">2</div>
              <h3 className="text-sm font-bold text-slate-800">Transparency</h3>
              <p className="text-slate-500 leading-relaxed">
                Visible pricing bands are calculated directly from GCI regional transaction history. Flat stated fee structures with zero broker spreads.
              </p>
            </div>

            <div className="bg-white p-7 rounded-2xl border border-slate-200/60 shadow-sm space-y-3 group hover:border-emerald-500/30 transition-all">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">3</div>
              <h3 className="text-sm font-bold text-slate-800">Accessibility</h3>
              <p className="text-slate-500 leading-relaxed">
                Empowering small biogas developers in Punjab and forestry holdings in Odisha with direct paths to global corporate ESG liquidity.
              </p>
            </div>

            <div className="bg-white p-7 rounded-2xl border border-slate-200/60 shadow-sm space-y-3 group hover:border-emerald-500/30 transition-all">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">4</div>
              <h3 className="text-sm font-bold text-slate-800">Zero-Greenwash Integrity</h3>
              <p className="text-slate-500 leading-relaxed">
                No shell registrations. Credits require third-party ACVA certification auditing alongside satellite MRV biomass confirmation.
              </p>
            </div>

            <div className="bg-white p-7 rounded-2xl border border-slate-200/60 shadow-sm space-y-3 group hover:border-emerald-500/30 transition-all">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">5</div>
              <h3 className="text-sm font-bold text-slate-800">Escrow Security</h3>
              <p className="text-slate-500 leading-relaxed">
                Certificates and capital sit protected under vault contract parameters, released only upon registry ledger transfer validation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Strategic Roadmap (Next.js Timeline) */}
      <section className="py-20 bg-white border-t border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-2">
            <span className="text-[9px] uppercase font-bold tracking-wider text-slate-400 block">Market Roadmap</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B3D2E] tracking-tight">Compliance Roadmap 2026/27</h2>
            <p className="text-slate-500 text-xs max-w-sm mx-auto leading-relaxed">
              Paving the path towards regulated compliance exchanges, CBAM exporting, and tokenized carbon registries.
            </p>
          </div>

          <div className="max-w-4xl mx-auto bg-slate-50 border border-slate-200/80 rounded-3xl p-8 shadow-sm text-xs relative overflow-hidden">
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

      {/* ChatDrawer floating assist */}
      <AIChatDrawer />

      <Footer />
    </div>
  );
}
