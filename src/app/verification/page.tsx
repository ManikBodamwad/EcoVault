"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ShieldCheck, FileCheck, CheckCircle2, Lock, Landmark, Satellite } from "lucide-react";

export default function VerificationExplainer() {
  const steps = [
    {
      title: "1. Developer eKYC & Entity Match",
      desc: "Sellers undergo strict corporate identity validation before being approved. Entity PAN hashes are locked and matched against official company records to prevent synthetic carbon fraud.",
      icon: ShieldCheck,
      color: "bg-emerald-50 text-emerald-600 border border-emerald-200"
    },
    {
      title: "2. GCI Registry Cross-Checking",
      desc: "Uploads are cross-referenced via real-time API checkups against the Grid Controller of India registry logs. EcoVault matches serial hashes to verify certificate ownership and active states.",
      icon: FileCheck,
      color: "bg-sky-50 text-sky-600 border border-sky-200"
    },
    {
      title: "3. Satellite Biomass Density (MRV)",
      desc: "For forestry and agricultural listings, automated satellite multi-spectral Lidar monitoring validates canopy boundaries, verifying biomass carbon sequestration rates over active cycles.",
      icon: Satellite,
      color: "bg-purple-50 text-purple-600 border border-purple-200"
    },
    {
      title: "4. Escrow Safe Settlement",
      desc: "Corporate funds sit in secure escrow bank vaults. Upon verified registry ownership transition, the escrow releases, preventing double-selling risk or loss of sustainability capital.",
      icon: Landmark,
      color: "bg-amber-50 text-amber-600 border border-amber-200"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#F7FAF8] font-sans">
      <Navbar />

      <div className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* Banner */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-semibold rounded-full border border-emerald-200 mb-2">
            Verification Protocol
          </div>
          <h1 className="text-3xl font-extrabold text-[#0B3D2E] tracking-tight sm:text-4xl">
            How EcoVault Verification Works
          </h1>
          <p className="text-base text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Voluntary carbon trading should not require trust. Every listing on our platform undergoes strict GCI registry cross-checks and third-party audits before trading can occur.
          </p>
        </div>

        {/* Audit Pipeline Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {steps.map((st, idx) => {
            const Icon = st.icon;
            return (
              <div 
                key={idx}
                className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${st.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-slate-800">{st.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {st.desc}
                  </p>
                </div>
                
                <div className="pt-2 flex items-center gap-1.5 text-[10px] text-emerald-600 font-bold uppercase tracking-wider">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Active Audit Point
                </div>
              </div>
            );
          })}
        </div>

        {/* ACVA Seal description */}
        <div className="bg-[#0B3D2E] text-white rounded-3xl p-8 space-y-4 border border-emerald-800 shadow-sm">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-emerald-400" />
            <h3 className="text-sm font-bold tracking-tight">Accredited Carbon Verification Agency (ACVA) Badge</h3>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            The ACVA Badge indicates a credit has passed third-party physical canopy audits, soil carbon sampling, and developer identity verification. EcoVault requires ACVA checks on all forestry and biogas assets before they are eligible for transaction under our Escrow Shield protocol. This removes greenwashing risks entirely for sustainability managers.
          </p>
        </div>

      </div>

      <Footer />
    </div>
  );
}
