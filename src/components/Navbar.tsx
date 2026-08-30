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
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 cursor-pointer" onClick={() => router.push("/")}>
            <Logo variant="horizontal" light={isSeller} />
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.filter(link => link.show).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-emerald-500 ${
                  pathname === link.href 
                    ? isSeller 
                      ? "text-emerald-400 font-semibold" 
                      : "text-emerald-600 font-semibold" 
                    : isSeller 
                      ? "text-slate-200" 
                      : "text-slate-600"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Persona Switcher & Profile (Desktop) */}
          <div className="hidden md:flex items-center gap-4">
            {/* Escrow Badge */}
            {!isSeller && (
              <div className="flex items-center gap-1.5 px-3 py-1 bg-sky-50 text-sky-700 text-xs font-semibold rounded-full border border-sky-200/50">
                <Landmark className="w-3.5 h-3.5" />
                Escrow Protected
              </div>
            )}
            
            {/* Persona Switch Controls */}
            <div className="flex items-center bg-black/10 p-1 rounded-lg border border-white/5">
              <button
                onClick={() => handlePersonaSwitch("buyer")}
                className={`text-xs px-3 py-1.5 rounded-md font-medium transition-all ${
                  !isSeller 
                    ? "bg-emerald-600 text-white shadow-sm" 
                    : "text-slate-300 hover:text-white"
                }`}
              >
                Buy Credits
              </button>
              <button
                onClick={() => handlePersonaSwitch("seller")}
                className={`text-xs px-3 py-1.5 rounded-md font-medium transition-all ${
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
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium border transition-all ${
                  isSeller 
                    ? "bg-transparent text-emerald-300 border-emerald-800 hover:bg-emerald-950/40" 
                    : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                }`}
              >
                <User className="w-3.5 h-3.5" />
                <span className="max-w-[120px] truncate">
                  {userProfile?.companyName || (isSeller ? "Rakesh (Seller)" : "Buyer Dashboard")}
                </span>
                {isSeller && <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />}
              </Link>
            ) : (
              <Link
                href="/login"
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-md text-xs font-semibold bg-emerald-600 text-white hover:bg-emerald-500 shadow-sm transition-all"
              >
                Sign In
                <ArrowRight className="w-3.5 h-3.5" />
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
                    {userProfile?.companyName || (isSeller ? "Rakesh" : "Dashboard")}
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
    </nav>
  );
}
