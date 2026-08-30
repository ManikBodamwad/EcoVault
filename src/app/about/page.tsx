"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Logo from "@/components/Logo";
import { ShieldCheck, Eye, Compass, Heart, Lock } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-transparent font-sans">
      <Navbar />

      <div className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* Brand Banner */}
        <div className="text-center space-y-4">
          <div className="flex justify-center mb-2">
            <Logo variant="icon" />
          </div>
          <h1 className="text-3xl font-extrabold text-[#0B3D2E] tracking-tight sm:text-4xl">About EcoVault</h1>
          <p className="text-base text-slate-500 max-w-xl mx-auto leading-relaxed">
            Make Carbon Count. Bridging the trust and verification gap in India's voluntary carbon economy.
          </p>
        </div>

        {/* Purpose, Vision, Mission Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Purpose */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Heart className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-800">Brand Purpose</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              To make climate action trustworthy — turning carbon credits from an opaque, broker-dependent transaction into something buyers and sellers can verify, price, and trust. EcoVault exists to close the trust gap that keeps India's carbon market fragmented and inaccessible to smaller players.
            </p>
          </div>

          {/* Vision */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-sky-50 text-[#38BDF8] flex items-center justify-center">
              <Eye className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-800">Brand Vision</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              To become the verification and intelligence layer of India's carbon economy — accelerating the transition to net-zero by making every credit transparent, credible, and effortlessly tradable.
            </p>
          </div>

          {/* Mission */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-[#FBBF24] flex items-center justify-center">
              <Compass className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-800">Brand Mission</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              To enable secure, transparent carbon credit trading by verifying sellers, safeguarding certificates, and giving every participant a clear, fair reference price — so trust is built into the transaction, not negotiated around it.
            </p>
          </div>
        </div>

        {/* Brand Values Section */}
        <div className="space-y-6">
          <div className="text-center max-w-xl mx-auto">
            <h2 className="text-2xl font-bold text-[#0B3D2E] tracking-tight">Our Core Values</h2>
            <p className="text-xs text-slate-500 mt-1">Foundational principles baked into every line of code and corporate action.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-xs">
            <div className="bg-white p-5 rounded-xl border border-slate-200/60 shadow-sm space-y-2">
              <strong className="text-slate-800 block">1. Trust First</strong>
              <p className="text-slate-500 leading-relaxed">
                Every listing is verified against the official national registry before it reaches a buyer; credibility is the product.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200/60 shadow-sm space-y-2">
              <strong className="text-slate-800 block">2. Transparency</strong>
              <p className="text-slate-500 leading-relaxed">
                Visible reference pricing bands and fixed transaction fees. No hidden broker margins or back-channel spreads.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200/60 shadow-sm space-y-2">
              <strong className="text-slate-800 block">3. Accessibility</strong>
              <p className="text-slate-500 leading-relaxed">
                Empowering small biogas and forestry developers with the same market access as multi-state conglomerates.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200/60 shadow-sm space-y-2">
              <strong className="text-slate-800 block">4. Integrity</strong>
              <p className="text-slate-500 leading-relaxed">
                Zero tolerance for greenwashing. A "verified" badge on EcoVault signifies strict satellite density and registry audits.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200/60 shadow-sm space-y-2">
              <strong className="text-slate-800 block">5. Security</strong>
              <p className="text-slate-500 leading-relaxed">
                Buyer deposits and carbon certificates are safeguarded in secure vault mechanisms until registry locks disburse ownership.
              </p>
            </div>
          </div>
        </div>

        {/* Academic Credit Box */}
        <div className="bg-emerald-950 text-white rounded-3xl p-6 flex flex-col sm:flex-row items-center justify-between gap-6 border border-emerald-900 shadow-sm">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="font-bold text-sm">Academic Project Context</h4>
            <p className="text-[10px] text-emerald-300 max-w-md leading-relaxed">
              This platform is designed as an interactive marketing prototype for the Marketing Management course at the **Indian Institute of Management, Lucknow (IIM Lucknow)**. Crafted by Group 8.
            </p>
          </div>
          <span className="text-[10px] uppercase font-bold tracking-widest bg-emerald-900 border border-emerald-800 px-4 py-2 rounded-xl">
            IIM Lucknow • Group 8
          </span>
        </div>

      </div>

      <Footer />
    </div>
  );
}
