"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useApp } from "@/context/AppContext";
import Logo from "./Logo";
import { ShieldCheck, User, LogOut, ArrowRight, Menu, X, Landmark } from "lucide-react";

export default function Navbar() {
  const { persona, switchPersona, userProfile } = useApp();
  const router = useRouter();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [escrowModalOpen, setEscrowModalOpen] = useState(false);

  // Styling based on current persona
  const isSeller = persona === "seller";
  
  // Navbar bg behavior
  const navClass = isSeller 
    ? "bg-[#0B3D2E] text-white border-b border-emerald-900/50" 
    : pathname === "/" 
      ? "bg-transparent text-slate-800" 
      : "bg-white/80 backdrop-blur-md border-b border-slate-200/60 text-slate-800";

  const handlePersonaSwitch = (newPersona: "buyer" | "seller") => {
    switchPersona(newPersona);
    setMobileMenuOpen(false);
    if (newPersona === "buyer") {
      router.push("/buyer/marketplace");
    } else {
      router.push("/seller/dashboard");
    }
  };

  const navLinks = [
    { label: "Explore Credits", href: "/buyer/marketplace", show: !isSeller },
    { label: "How Verification Works", href: "/verification", show: true },
    { label: "About Brand", href: "/about", show: true }
  ];

  return (
    <nav className={`sticky top-0 z-50 w-full transition-all duration-300 ${navClass}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0 cursor-pointer" onClick={() => router.push("/")}>
            <Logo variant="horizontal" size="md" light={isSeller} />
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-7">
            {navLinks.filter(link => link.show).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-semibold transition-colors hover:text-emerald-500 tracking-wide ${
                  pathname === link.href 
                    ? isSeller 
                      ? "text-emerald-400 font-bold" 
                      : "text-emerald-700 font-bold" 
                    : isSeller 
                      ? "text-slate-200" 
                      : "text-slate-700"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Persona Switcher & Profile (Desktop) */}
          <div className="hidden md:flex items-center gap-4">
            {/* Escrow Badge - Clickable to open Explainer */}
            {!isSeller && (
              <button
                onClick={() => setEscrowModalOpen(true)}
                className="flex items-center gap-1.5 px-3.5 py-1.5 bg-sky-50 text-sky-800 text-xs font-bold rounded-full border border-sky-200/80 shadow-sm hover:bg-sky-100/80 hover:border-sky-300 transition-all cursor-pointer group"
                title="Click to view Escrow Architecture"
              >
                <Landmark className="w-3.5 h-3.5 text-sky-600 group-hover:scale-110 transition-transform" />
                <span>Escrow Protected</span>
              </button>
            )}
            
            {/* Persona Switch Controls */}
            <div className="flex items-center bg-black/10 p-1 rounded-xl border border-white/5">
              <button
                onClick={() => handlePersonaSwitch("buyer")}
                className={`text-xs sm:text-sm px-3.5 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                  !isSeller 
                    ? "bg-emerald-600 text-white shadow-sm" 
                    : "text-slate-300 hover:text-white"
                }`}
              >
                Buy Credits
              </button>
              <button
                onClick={() => handlePersonaSwitch("seller")}
                className={`text-xs sm:text-sm px-3.5 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                  isSeller 
                    ? "bg-[#16A34A] text-white shadow-sm" 
                    : "text-slate-600 hover:text-emerald-600"
                }`}
              >
                Sell Credits
              </button>
            </div>

            {/* Profile/Onboarding Button */}
            {persona !== "public" ? (
              <Link 
                href={isSeller ? "/seller/dashboard" : "/buyer/dashboard"}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold border transition-all ${
                  isSeller 
                    ? "bg-transparent text-emerald-300 border-emerald-800 hover:bg-emerald-950/40" 
                    : "bg-slate-50 text-slate-800 border-slate-200 hover:bg-slate-100 shadow-sm"
                }`}
              >
                <User className="w-4 h-4" />
                <span className="max-w-[140px] truncate">
                  {isSeller ? "Sharath Agro Energy" : (userProfile?.companyName || "Tata ESG Solutions")}
                </span>
                {isSeller && <ShieldCheck className="w-4 h-4 text-emerald-400" />}
              </Link>
            ) : (
              <Link
                href="/login"
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-emerald-600 text-white hover:bg-emerald-500 shadow-sm transition-all"
              >
                <span>Sign In</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1 rounded-md hover:bg-black/5"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className={`md:hidden px-4 pt-2 pb-6 space-y-3 shadow-lg border-t ${
          isSeller 
            ? "bg-[#0B3D2E] border-emerald-900" 
            : "bg-white border-slate-100"
        }`}>
          <div className="flex flex-col gap-2">
            {navLinks.filter(link => link.show).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-sm py-2 px-3 rounded-md transition-colors ${
                  pathname === link.href 
                    ? isSeller 
                      ? "bg-emerald-950 text-emerald-400 font-bold" 
                      : "bg-emerald-50 text-emerald-600 font-bold" 
                    : isSeller 
                      ? "text-slate-200 hover:bg-emerald-950/50" 
                      : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <hr className={isSeller ? "border-emerald-800" : "border-slate-100"} />

          <div className="space-y-3">
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 px-3 block">
              Toggle Persona
            </span>
            <div className="grid grid-cols-2 gap-2 px-3">
              <button
                onClick={() => handlePersonaSwitch("buyer")}
                className={`text-xs py-2 rounded-md font-medium transition-all ${
                  !isSeller 
                    ? "bg-emerald-600 text-white shadow-sm" 
                    : "bg-black/15 text-slate-300"
                }`}
              >
                Buy Credits
              </button>
              <button
                onClick={() => handlePersonaSwitch("seller")}
                className={`text-xs py-2 rounded-md font-medium transition-all ${
                  isSeller 
                    ? "bg-[#16A34A] text-white shadow-sm" 
                    : "bg-black/15 text-slate-300"
                }`}
              >
                Sell Credits
              </button>
            </div>

            <div className="px-3 pt-2">
              {persona !== "public" ? (
                <Link
                  href={isSeller ? "/seller/dashboard" : "/buyer/dashboard"}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`w-full flex items-center justify-between px-4 py-2.5 rounded-md text-xs font-semibold border ${
                    isSeller 
                      ? "bg-emerald-950 text-emerald-300 border-emerald-800" 
                      : "bg-slate-50 text-slate-700 border-slate-200"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    {isSeller ? "Sharath Agro Energy" : (userProfile?.companyName || "Tata ESG Solutions")}
                  </span>
                  {isSeller && <ShieldCheck className="w-4 h-4 text-emerald-400" />}
                </Link>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-md text-xs font-semibold bg-emerald-600 text-white hover:bg-emerald-500 shadow-sm"
                >
                  Sign In
                  <ArrowRight className="w-4 h-4" />
                </Link>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Interactive Institutional Escrow Explainer Modal */}
      {escrowModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6 relative">
            <button
              onClick={() => setEscrowModalOpen(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-sky-50 text-sky-800 text-xs font-bold rounded-full border border-sky-200">
                <Landmark className="w-3.5 h-3.5 text-sky-600" />
                <span>Institutional Escrow Architecture</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                How EcoVault Escrow Protects Every Rupee
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                Zero broker risk. Capital is locked into institutional bank vaults and released only when digital carbon retirement is stamped on the National Registry.
              </p>
            </div>

            <div className="space-y-3 text-xs bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
              <div className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-[10px] flex-shrink-0 mt-0.5">1</span>
                <div>
                  <strong className="text-slate-900 block font-bold">Deposit to Institutional Escrow</strong>
                  <span className="text-slate-500 font-normal">Buyer capital is locked in secure ICICI/HDFC Escrow custody.</span>
                </div>
              </div>

              <div className="flex items-start gap-3 border-t border-slate-200/60 pt-2.5">
                <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-[10px] flex-shrink-0 mt-0.5">2</span>
                <div>
                  <strong className="text-slate-900 block font-bold">National Registry Serial Match</strong>
                  <span className="text-slate-500 font-normal">API matches GCI certificate hash, preventing double-selling.</span>
                </div>
              </div>

              <div className="flex items-start gap-3 border-t border-slate-200/60 pt-2.5">
                <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-[10px] flex-shrink-0 mt-0.5">3</span>
                <div>
                  <strong className="text-slate-900 block font-bold">Lidar Satellite Biomass Check</strong>
                  <span className="text-slate-500 font-normal">Multi-spectral canopy imaging confirms physical carbon density.</span>
                </div>
              </div>

              <div className="flex items-start gap-3 border-t border-slate-200/60 pt-2.5">
                <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-[10px] flex-shrink-0 mt-0.5">4</span>
                <div>
                  <strong className="text-slate-900 block font-bold">Atomic Settlement & Certificate</strong>
                  <span className="text-slate-500 font-normal">Funds disburse to developer and official PDF certificate generates instantly.</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={() => {
                  setEscrowModalOpen(false);
                  router.push("/buyer/marketplace/ev-001");
                }}
                className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Test Live Escrow Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => setEscrowModalOpen(false)}
                className="px-5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
