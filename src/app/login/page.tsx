"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";
import Logo from "@/components/Logo";
import { Landmark, ArrowRight, ShieldCheck, Mail, Lock } from "lucide-react";

export default function MockLogin() {
  const router = useRouter();
  const { switchPersona, updateUserProfile } = useApp();

  const [role, setRole] = useState<"buyer" | "seller">("buyer");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setOtpSent(true);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length >= 4) {
      switchPersona(role);
      
      if (role === "buyer") {
        updateUserProfile({
          companyName: email.split("@")[0].toUpperCase() + " CORP",
          sector: "Sustainable Energy",
          offsetTarget: 25000,
          verified: true
        });
        router.push("/buyer/marketplace");
      } else {
        router.push("/seller/dashboard");
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0F0D] flex flex-col items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* Background gradients */}
      <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-emerald-950/20 rounded-full blur-[80px] pointer-events-none"></div>
      
      {/* Login Card */}
      <div className="w-full max-w-sm bg-white rounded-3xl p-8 border border-slate-200 shadow-2xl relative z-10 space-y-6">
        
        {/* Logo */}
        <div className="text-center space-y-2">
          <div className="flex justify-center mb-1">
            <Logo variant="icon" />
          </div>
          <h2 className="text-xl font-bold text-slate-800 tracking-tight">Access EcoVault Portal</h2>
          <p className="text-[10px] text-slate-500">Sign in to your voluntary carbon credit marketplace account.</p>
        </div>

        {/* Persona toggle tabs */}
        <div className="grid grid-cols-2 gap-2 bg-slate-100 p-1 rounded-xl text-xs">
          <button
            onClick={() => {
              setRole("buyer");
              setOtpSent(false);
            }}
            className={`py-2 rounded-lg font-bold transition-all ${
              role === "buyer" 
                ? "bg-white text-emerald-800 shadow" 
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            Buyer Login
          </button>
          <button
            onClick={() => {
              setRole("seller");
              setOtpSent(false);
            }}
            className={`py-2 rounded-lg font-bold transition-all ${
              role === "seller" 
                ? "bg-white text-emerald-800 shadow" 
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            Seller Login
          </button>
        </div>

        {/* Forms */}
        <form onSubmit={otpSent ? handleVerifyOtp : handleSendOtp} className="space-y-4 text-xs">
          
          {/* Email input */}
          <div className="space-y-1">
            <label className="font-semibold text-slate-700">Registered Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                disabled={otpSent}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. sustainability@tatagroup.com"
                className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl bg-slate-50 disabled:opacity-75 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* OTP Input if sent */}
          {otpSent && (
            <div className="space-y-1 animate-fadeIn">
              <label className="font-semibold text-slate-700">Verification OTP Code</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter any 4-6 digit code"
                  className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl bg-slate-50 focus:outline-none focus:ring-1 focus:ring-emerald-500 font-bold"
                />
              </div>
              <span className="text-[8px] text-slate-400 block mt-1">Mock OTP is active. Type any numeric code.</span>
            </div>
          )}

          {/* Submit buttons */}
          {otpSent ? (
            <button
              type="submit"
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow transition-colors flex items-center justify-center gap-1.5"
            >
              <ShieldCheck className="w-4 h-4" />
              Verify and Enter Dashboard
            </button>
          ) : (
            <button
              type="submit"
              className="w-full py-3 bg-[#0B3D2E] hover:bg-emerald-950 text-white font-bold rounded-xl shadow transition-colors flex items-center justify-center gap-1"
            >
              Get Sign-in OTP Code
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </form>

        <hr className="border-slate-100" />
        
        {/* Footnotes */}
        <div className="flex items-start gap-2 text-[10px] text-slate-400 leading-normal">
          <Landmark className="w-4 h-4 text-sky-500 flex-shrink-0 mt-0.5" />
          <span>
            EcoVault accounts are bound by Grid Controller of India registry permissions. Unverified entities will be rejected from seller listings.
          </span>
        </div>

      </div>
    </div>
  );
}
