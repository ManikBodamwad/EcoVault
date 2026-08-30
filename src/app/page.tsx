"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
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
  Users, 
  Globe2, 
  Layers 
} from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const { switchPersona, selectProject } = useApp();
  const router = useRouter();
  const [stats, setStats] = useState({ tons: 120400, sellers: 92, time: 24 });

  // Increment counters on load to feel interactive
  useEffect(() => {
    selectProject(null); // Clear any active project focus on landing
    const timer = setInterval(() => {
      setStats((prev) => ({
        tons: prev.tons + Math.floor(Math.random() * 5),
        sellers: prev.sellers,
        time: prev.time
      }));
    }, 4000);
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

  return (
    <div className="min-h-screen flex flex-col bg-[#F7FAF8] font-sans">
      <Navbar />

      {/* Hero Section (Dramatic Dark Bleed for the Globe) */}
      <section className="bg-[#0A0F0D] text-white py-16 lg:py-24 border-b border-emerald-950/40 relative overflow-hidden">
        {/* Animated green gradient glow */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-emerald-950/20 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-lime-950/15 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Copy */}
            <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-950/80 text-emerald-400 text-xs font-semibold rounded-full border border-emerald-900/50 mb-4">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  Grid Controller of India Registry Validated
                </div>
                
                <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight">
                  Carbon credits you can <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-lime-400">access.</span>
                  <br />
                  Transactions you can <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-sky-400">trust.</span>
                </h1>
                
                <p className="mt-4 text-base text-slate-400 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                  EcoVault connects verified voluntary carbon project developers across India directly with corporate buyers. Escrow security, transparent pricing bands, and zero greenwashing.
                </p>
              </motion.div>

              {/* Dual Action CTAs */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2"
              >
                <button
                  onClick={() => handleChoosePersona("buyer")}
                  className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-bold rounded-xl shadow-lg shadow-emerald-950/50 hover:shadow-emerald-400/20 transform hover:-translate-y-0.5 transition-all text-sm flex items-center justify-center gap-2 border border-emerald-500/25"
                >
                  I'm a Corporate Buyer
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleChoosePersona("seller")}
                  className="w-full sm:w-auto px-8 py-3.5 bg-slate-900 hover:bg-slate-800 text-emerald-400 hover:text-emerald-300 font-bold rounded-xl border border-emerald-900/60 hover:border-emerald-700/80 transition-all text-sm flex items-center justify-center gap-2"
                >
                  I'm a Project Seller
                  <Search className="w-4 h-4" />
                </button>
              </motion.div>

              {/* Trust Indicators */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-2 text-xs text-slate-500 pt-4"
              >
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-[#38BDF8]" />
                  <span>No Hidden Spreads</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-[#38BDF8]" />
                  <span>ACVA Audited Projects</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-[#38BDF8]" />
                  <span>Flat 2% Settlement Fee</span>
                </div>
              </motion.div>
            </div>

            {/* Right 3D Globe Centerpiece */}
            <div className="lg:col-span-6 flex justify-center relative w-full h-[350px] lg:h-[550px]">
              <InteractiveGlobe interactive={false} />
            </div>

          </div>
        </div>
      </section>

      {/* Live Market Counter Section (Fintech look) */}
      <section className="bg-white border-b border-slate-200/60 py-10 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
            <div className="p-4">
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block mb-1">Total Carbon Offset (India)</span>
              <span className="text-3xl font-extrabold text-slate-800 tracking-tight">
                {stats.tons.toLocaleString()} <span className="text-emerald-600 text-lg">Tons CO₂e</span>
              </span>
              <span className="text-[10px] text-emerald-600 block mt-1 font-medium">▲ Updated Live via GCI API</span>
            </div>
            <div className="p-4">
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block mb-1">Onboarded Developers</span>
              <span className="text-3xl font-extrabold text-slate-800 tracking-tight">
                {stats.sellers} <span className="text-[#38BDF8] text-lg">Verified Sellers</span>
              </span>
              <span className="text-[10px] text-slate-500 block mt-1 font-medium">Odisha, Punjab, Rajasthan, Gujarat</span>
            </div>
            <div className="p-4">
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block mb-1">Settlement Speed</span>
              <span className="text-3xl font-extrabold text-slate-800 tracking-tight">
                &lt; {stats.time} <span className="text-[#FBBF24] text-lg">Hours</span>
              </span>
              <span className="text-[10px] text-slate-500 block mt-1 font-medium">Average Escrow Release Cycle</span>
            </div>
          </div>
        </div>
      </section>

      {/* Core Strategy / Problems Section */}
      <section className="py-20 bg-[#F7FAF8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold text-[#0B3D2E] tracking-tight">
              Closing India's Carbon Trust Gap
            </h2>
            <p className="text-slate-500 mt-3 text-sm leading-relaxed">
              Voluntary carbon credit transactions in India are heavily broker-dependent, opaque, and prone to greenwashing. EcoVault provides a technology-driven trust and intelligence layer around voluntary credits.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-white p-8 rounded-2xl border border-slate-200/60 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300">
                <FileCheck className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-800 mb-2">Registry Integrity</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Before listing, every certificate is e-verified and cross-checked against the Grid Controller of India registry. Duplicate sales and phantom credits are structurally impossible.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-8 rounded-2xl border border-slate-200/60 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
              <div className="w-12 h-12 rounded-xl bg-sky-50 text-[#38BDF8] flex items-center justify-center mb-6 group-hover:bg-[#38BDF8] group-hover:text-white transition-colors duration-300">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-800 mb-2">Escrow Custody Vault</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Buyer capital is secured in third-party escrow accounts and credit certificates are deposited into our digital vault. Funds release automatically upon verified transfer on national registry logs.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-8 rounded-2xl border border-slate-200/60 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-[#FBBF24] flex items-center justify-center mb-6 group-hover:bg-[#FBBF24] group-hover:text-white transition-colors duration-300">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-800 mb-2">Fair Reference Pricing</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                No black-box broker spreads. EcoVault publishes clear reference price bands based on recent Indian transactions, letting smallholders and corporate sustainability managers trade on fair market value.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works Stepper */}
      <section className="py-20 bg-white border-y border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold text-[#0B3D2E] tracking-tight">
              Simple, Audited Carbon Lifecycles
            </h2>
            <p className="text-slate-500 mt-2 text-xs">
              EcoVault simplifies voluntary carbon offset transactions in four distinct, verified steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {/* Step 1 */}
            <div className="text-center space-y-4">
              <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center mx-auto text-xs">1</div>
              <h4 className="text-sm font-bold text-slate-800">Onboard & KYC</h4>
              <p className="text-xs text-slate-500 leading-relaxed max-w-xs mx-auto">
                Sellers verify identification once via eKYC. Credit authenticity is instantly validated against national databases.
              </p>
            </div>
            {/* Step 2 */}
            <div className="text-center space-y-4">
              <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center mx-auto text-xs">2</div>
              <h4 className="text-sm font-bold text-slate-800">Explore & Map</h4>
              <p className="text-xs text-slate-500 leading-relaxed max-w-xs mx-auto">
                Buyers query listings on our interactive map. View real-time satellite coordinates and ACVA audit certificates.
              </p>
            </div>
            {/* Step 3 */}
            <div className="text-center space-y-4">
              <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center mx-auto text-xs">3</div>
              <h4 className="text-sm font-bold text-slate-800">Escrow Exchange</h4>
              <p className="text-xs text-slate-500 leading-relaxed max-w-xs mx-auto">
                Buyers lock capital in escrow. Certificates are securely custody-held in the Vault until ownership shifts.
              </p>
            </div>
            {/* Step 4 */}
            <div className="text-center space-y-4">
              <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center mx-auto text-xs">4</div>
              <h4 className="text-sm font-bold text-slate-800">Offset Insights</h4>
              <p className="text-xs text-slate-500 leading-relaxed max-w-xs mx-auto">
                Receive certified ESG certificates and AI-generated offset dashboard insights regarding environmental impact.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Strategic Roadmap */}
      <section className="py-20 bg-[#F7FAF8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold text-[#0B3D2E] tracking-tight">
              EcoVault Roadmap & Compliance Strategy
            </h2>
            <p className="text-slate-500 mt-2 text-xs">
              Scaling trust across India's carbon economy towards 2026/27 compliance benchmarks.
            </p>
          </div>

          <div className="max-w-4xl mx-auto bg-white border border-slate-200/60 rounded-3xl p-8 shadow-sm">
            <div className="space-y-8">
              <div className="flex gap-4 items-start">
                <div className="px-3 py-1 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold rounded-lg mt-0.5">
                  Phase 1
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                    Voluntary Trust Layer
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-medium">Active</span>
                  </h4>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    Connecting voluntary buyers with verified biogas, forestry, and energy developers across Indian states. Establishing reference pricing and ACVA verification agency audits.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start border-t border-slate-100 pt-6">
                <div className="px-3 py-1 bg-sky-50 border border-sky-200 text-sky-700 text-xs font-bold rounded-lg mt-0.5">
                  Phase 2
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                    CCTS & CBAM Integrations
                    <span className="text-[10px] bg-sky-100 text-sky-800 px-2 py-0.5 rounded-full font-medium">2026 Roadmap</span>
                  </h4>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    Expanding verification systems to serve CBAM-exposed exporters (steel, cement) and major conglomerates as India's regulated compliance Carbon Credit Trading Scheme (CCTS) matures.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start border-t border-slate-100 pt-6">
                <div className="px-3 py-1 bg-amber-50 border border-amber-200 text-amber-700 text-xs font-bold rounded-lg mt-0.5">
                  Phase 3
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                    Satellite MRV & Tokenized Vaults
                    <span className="text-[10px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-medium">Future</span>
                  </h4>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    Implementing automated Lidar satellite biomass monitoring for continuous forestry carbon density measurements. Securing carbon certificates via decentralized blockchain custody vaults.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Chat Drawer & Floating Assist */}
      <AIChatDrawer />

      <Footer />
    </div>
  );
}
