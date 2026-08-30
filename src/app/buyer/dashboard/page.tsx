"use client";

import React from "react";
import { useApp } from "@/context/AppContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AIChatDrawer from "@/components/AIChatDrawer";
import Logo from "@/components/Logo";
import { 
  Leaf, 
  Target, 
  TrendingUp, 
  FileCheck, 
  ArrowRight, 
  Download, 
  Sparkles, 
  Landmark, 
  Globe,
  Award
} from "lucide-react";
import Link from "next/link";
import TiltCard from "@/components/TiltCard";
import MagneticButton from "@/components/MagneticButton";

export default function BuyerDashboard() {
  const { purchasedCredits, userProfile } = useApp();

  // Aggregate stats
  const totalPurchasedTons = purchasedCredits.reduce((acc, curr) => acc + curr.volume, 0);
  const totalOffsetTons = totalPurchasedTons;
  const targetTons = userProfile?.offsetTarget || 50000;
  const progressPercent = Math.min(100, Math.floor((totalOffsetTons / targetTons) * 100));
  
  const averagePrice = purchasedCredits.length > 0 
    ? Math.round(purchasedCredits.reduce((acc, curr) => acc + (curr.project.price * curr.volume), 0) / totalOffsetTons)
    : 0;

  // AI Offset Insights text generator
  const getAIInsights = () => {
    if (purchasedCredits.length === 0) {
      return "Your portfolio is currently empty. Head over to the Explore Credits page to begin offsetting. EcoVault AI recommends starting with forestry listings in Odisha to maximize community bio-stability impact.";
    }

    const forestryCredits = purchasedCredits.filter(c => c.project.type === "Forestry");
    const forestryPct = Math.round((forestryCredits.reduce((acc, curr) => acc + curr.volume, 0) / totalOffsetTons) * 100);
    const equivalentFlights = Math.round(totalOffsetTons * 1.2);

    return `Your carbon offset portfolio is performing optimally this quarter. By retiring ${totalOffsetTons.toLocaleString()} tons of CO2 equivalents, you have offset emissions equivalent to approximately ${equivalentFlights} commercial flights from Delhi to Mumbai.\n\nApproximately ${forestryPct}% of your portfolio relies on Forestry projects in Eastern and Central India. These forestry offsets do more than lock away carbon; they stabilize estuary soils and support native fishing livelihoods in Odisha and Assam. EcoVault AI notes that your average price of ₹${averagePrice}/ton sits 4% below national exchange averages due to direct seller negotiations.`;
  };

  // Radial progress calculations
  const radius = 32;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progressPercent / 100) * circumference;

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAF9] font-sans">
      <Navbar />

      <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        
        {/* Header summary */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded-full mb-2">
              Buyer Command Center
            </div>
            <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">Sustainability Portfolio</h1>
            <p className="text-xs text-slate-500 mt-1">Manage offsets, audit certifications, and review environmental impact insights.</p>
          </div>
          <Link href="/buyer/marketplace">
            <MagneticButton
              variant="primary"
              className="px-5 py-2 text-xs"
            >
              Offset More Emissions
              <ArrowRight className="w-4 h-4" />
            </MagneticButton>
          </Link>
        </div>

        {/* Stats Cards Row (Enhanced Grid cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1 */}
          <TiltCard className="w-full" shadowColor="rgba(16, 185, 129, 0.05)" maxTilt={5}>
            <div className="bg-white p-5 rounded-2xl border border-slate-200/60 space-y-2 h-full">
              <span className="text-[9px] uppercase font-bold tracking-wider text-slate-400 block font-bold">Total Tons Offset</span>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-black text-slate-800">{totalOffsetTons.toLocaleString()}</span>
                <span className="text-xs text-slate-400 font-semibold">Tons CO₂e</span>
              </div>
              <span className="text-[10px] text-emerald-600 font-medium block">▼ GCI Registry Certified</span>
            </div>
          </TiltCard>

          {/* Card 2: Dynamic Radial Progress Gauge */}
          <TiltCard className="w-full" shadowColor="rgba(16, 185, 129, 0.05)" maxTilt={5}>
            <div className="bg-white p-5 rounded-2xl border border-slate-200/60 flex items-center justify-between gap-4 h-full">
              <div className="space-y-1">
                <span className="text-[9px] uppercase font-bold tracking-wider text-slate-400 block font-bold">Target Progress</span>
                <div className="flex items-baseline gap-0.5">
                  <span className="text-2xl font-black text-[#0B3D2E]">{progressPercent}%</span>
                  <span className="text-[10px] text-slate-400 font-semibold">completed</span>
                </div>
                <span className="text-[9px] text-slate-400 block font-semibold">Goal: {targetTons.toLocaleString()} t</span>
              </div>
              
              {/* SVG Circle Gauge */}
              <div className="relative w-16 h-16 flex items-center justify-center flex-shrink-0">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="32"
                    cy="32"
                    r={radius}
                    fill="transparent"
                    stroke="#F1F5F9"
                    strokeWidth="6"
                  />
                  <circle
                    cx="32"
                    cy="32"
                    r={radius}
                    fill="transparent"
                    stroke="#10B981"
                    strokeWidth="6"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    className="transition-all duration-700 ease-out"
                  />
                </svg>
                <div className="absolute text-[8px] font-black text-[#0B3D2E]">{progressPercent}%</div>
              </div>
            </div>
          </TiltCard>

          {/* Card 3 */}
          <TiltCard className="w-full" shadowColor="rgba(16, 185, 129, 0.05)" maxTilt={5}>
            <div className="bg-white p-5 rounded-2xl border border-slate-200/60 space-y-2 h-full">
              <span className="text-[9px] uppercase font-bold tracking-wider text-slate-400 block font-bold">Average Credit Price</span>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-black text-slate-800">₹{averagePrice}</span>
                <span className="text-xs text-slate-400 font-semibold">per Ton CO₂e</span>
              </div>
              <span className="text-[10px] text-slate-500 font-medium block">Compared to market: -4.2%</span>
            </div>
          </TiltCard>

          {/* Card 4 */}
          <TiltCard className="w-full" shadowColor="rgba(16, 185, 129, 0.05)" maxTilt={5}>
            <div className="bg-white p-5 rounded-2xl border border-slate-200/60 space-y-2 h-full">
              <span className="text-[9px] uppercase font-bold tracking-wider text-slate-400 block font-bold">Verification Rate</span>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-black text-slate-800">100%</span>
                <span className="text-xs text-emerald-600 font-semibold">ACVA Audited</span>
              </div>
              <span className="text-[10px] text-slate-500 font-medium block">Zero Greenwash Incidents</span>
            </div>
          </TiltCard>
        </div>

        {/* Dashboard Grid (Insights on Left, Assets on Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: AI insights (2 cols) */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* AI Insights Card */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-200/50">
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                </div>
                <div>
                  <h3 className="text-xs font-extrabold text-slate-800 tracking-tight leading-none">EcoVault AI — Portfolio Insights</h3>
                  <span className="text-[9px] text-slate-400">Natural-Language Environmental Impact Audit</span>
                </div>
              </div>
              <hr className="border-slate-100" />
              <p className="text-xs text-slate-600 leading-relaxed whitespace-pre-line">
                {getAIInsights()}
              </p>
            </div>

            {/* Portfolio History table */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
              <div>
                <h3 className="text-xs font-extrabold text-slate-800 tracking-tight">Registry Transactions Ledger</h3>
                <p className="text-[9px] text-slate-400 mt-0.5">Audit log of retired certificates custodied under vault parameters</p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead>
                    <tr className="text-slate-400 border-b border-slate-100 uppercase text-[9px] font-bold">
                      <th className="py-2.5">Date</th>
                      <th className="py-2.5">Project Name</th>
                      <th className="py-2.5">Volume (t)</th>
                      <th className="py-2.5">Certificate Code</th>
                      <th className="py-2.5 text-right">Audit</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50 text-slate-700">
                    {purchasedCredits.length > 0 ? (
                      purchasedCredits.map((tx) => (
                        <tr key={tx.id}>
                          <td className="py-3 font-medium text-slate-500">{tx.date}</td>
                          <td className="py-3 font-bold text-slate-800">{tx.project.name}</td>
                          <td className="py-3">{tx.volume.toLocaleString()}</td>
                          <td className="py-3 font-mono text-[10px] text-slate-400">{tx.certPdfId}</td>
                          <td className="py-3 text-right">
                            <span className="inline-flex items-center gap-0.5 px-2 py-0.5 bg-emerald-50 text-emerald-700 text-[9px] font-bold rounded border border-emerald-200">
                              Verified
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="py-8 text-center text-slate-400 text-xs">
                          No transactions recorded. Buy your first voluntary credits to see logs here.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>

          {/* Right Column: Downloadable Certificate Frame (1 col) */}
          <div className="w-full space-y-6">
            
            {/* Certificate Preview Card */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-5">
              <div>
                <h3 className="text-xs font-extrabold text-slate-800 tracking-tight">Active Impact Certificate</h3>
                <p className="text-[9px] text-slate-400 mt-0.5">Retirement of carbon credits audited by the Grid Controller of India</p>
              </div>

              {/* Premium Gold/Emerald Certificate Mock */}
              <TiltCard className="w-full" shadowColor="rgba(245, 158, 11, 0.16)" maxTilt={6}>
                <div className="bg-gradient-to-b from-[#030704] to-[#0B3D2E] text-white rounded-3xl p-6 border-2 border-yellow-500/20 shadow-xl space-y-6 relative overflow-hidden">
                  <div className="absolute top-2 right-2 w-12 h-12 border-r border-t border-yellow-500/20 rounded-tr-lg" />
                  <div className="absolute bottom-2 left-2 w-12 h-12 border-l border-b border-yellow-500/20 rounded-bl-lg" />
                  
                  <div className="flex justify-between items-center relative z-10">
                    <Logo variant="icon" light={true} />
                    <div className="flex items-center gap-1 bg-yellow-500/10 text-yellow-500 border border-yellow-500/25 px-2 py-0.5 rounded text-[8px] font-bold tracking-widest uppercase">
                      <Award className="w-3 h-3" />
                      Seal Lock
                    </div>
                  </div>

                  <div className="space-y-4 relative z-10">
                    <div>
                      <span className="text-[8px] text-slate-400 block uppercase font-bold tracking-wider leading-none mb-1">Beneficiary</span>
                      <strong className="text-xs block text-white">{userProfile?.companyName || "Tata ESG Solutions"}</strong>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-[8px] text-slate-400 block uppercase font-bold tracking-wider leading-none mb-1">Retires</span>
                        <strong className="text-emerald-400 font-extrabold text-sm">{totalOffsetTons.toLocaleString()} Tons</strong>
                      </div>
                      <div>
                        <span className="text-[8px] text-slate-400 block uppercase font-bold tracking-wider leading-none mb-1">Fee Schema</span>
                        <strong className="text-slate-200 font-mono text-[9px]">Escrow Protected</strong>
                      </div>
                    </div>
                    
                    <hr className="border-emerald-800" />
                    
                    <p className="text-[8px] text-slate-400 leading-relaxed font-medium">
                      This document verifies that carbon offsets representing actual biomass absorption have been retired from the market logs, preventing double allocation under voluntary registry frameworks.
                    </p>
                  </div>
                </div>
              </TiltCard>

              {/* Action buttons */}
              <button
                disabled={purchasedCredits.length === 0}
                onClick={() => window.print()}
                className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 disabled:opacity-50 text-slate-700 font-bold rounded-xl text-xs transition-colors flex items-center justify-center gap-2 border border-slate-200"
              >
                <Download className="w-4 h-4" />
                Download Corporate Certificate
              </button>
            </div>

            {/* Escrow status logs */}
            <div className="bg-emerald-50/40 border border-emerald-100 p-5 rounded-3xl space-y-3 text-xs">
              <span className="font-bold text-[#0B3D2E] flex items-center gap-1.5">
                <Landmark className="w-4 h-4 text-emerald-600" />
                Escrow Settlement Parameters
              </span>
              <p className="text-[10px] text-slate-500 leading-relaxed">
                Settled carbon credits are custodied under EcoVault escrow rules. If registry matching fails within the 48-hour release timeline, funds are automatically refunded to buyer custody bank coordinates.
              </p>
            </div>

          </div>

        </div>

      </div>

      <AIChatDrawer />
      <Footer />
    </div>
  );
}
