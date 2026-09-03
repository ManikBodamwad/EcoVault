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
    <div className="min-h-screen flex flex-col bg-transparent font-sans">
      <Navbar />

      <div className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* Banner */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-emerald-50 text-emerald-800 text-xs font-bold rounded-full border border-emerald-200 mb-2">
            Verification Protocol
          </div>
          <h1 className="text-3xl font-extrabold text-[#06281E] tracking-tight sm:text-4xl">
            How EcoVault Verification Works
          </h1>
          <p className="text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed font-medium">
            Voluntary carbon trading should not rely on blind trust. Every listing on our platform undergoes strict GCI registry cross-checks, corporate eKYC, and multi-spectral MRV audits.
          </p>
        </div>

        {/* Audit Pipeline Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {steps.map((st, idx) => {
            const Icon = st.icon;
            return (
              <div 
                key={idx}
                className="bg-white p-7 rounded-3xl border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between hover:border-emerald-300 transition-colors"
              >
                <div className="space-y-3">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${st.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">{st.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    {st.desc}
                  </p>
                </div>
                
                <div className="pt-3 border-t border-slate-100 flex items-center gap-2 text-xs text-emerald-700 font-bold uppercase tracking-wider">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Active Audit Point</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* ACVA Seal description */}
        <div className="bg-gradient-to-br from-[#03140F] via-[#06281E] to-[#020C09] text-white rounded-3xl p-8 space-y-4 border-2 border-emerald-500/30 shadow-2xl relative overflow-hidden">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-extrabold tracking-tight text-white">Accredited Carbon Verification Agency (ACVA) Standard</h3>
              <span className="text-xs text-emerald-400 font-mono">Institutional Trust Architecture</span>
            </div>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed font-medium">
            The ACVA Badge indicates a credit has passed third-party physical canopy audits, soil carbon sampling, and developer identity verification. EcoVault requires ACVA checks on all forestry and biogas assets before they are eligible for transaction under our Escrow Shield protocol. This removes greenwashing risks entirely for sustainability managers and compliance auditors.
          </p>
        </div>

      </div>

      <Footer />
    </div>
  );
}
