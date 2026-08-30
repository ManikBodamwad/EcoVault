"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { 
  ShieldCheck, 
  ArrowRight, 
  Lock, 
  FolderLock, 
  Coins, 
  TrendingUp, 
  ChevronRight, 
  PlusCircle, 
  Check, 
  X, 
  Landmark,
  Layers,
  Award
} from "lucide-react";
import Link from "next/link";

export default function SellerDashboard() {
  const { sellerListings, sellerOffers, respondToOffer, userProfile } = useApp();
  const [successMsg, setSuccessMsg] = useState("");

  // Calculate payouts stats
  const totalListedTons = sellerListings.reduce((acc, curr) => acc + curr.volume, 0);
  const activeOffersCount = sellerOffers.filter(o => o.status === "Pending").length;
  
  const totalEarnings = sellerOffers
    .filter(o => o.status === "Accepted")
    .reduce((acc, curr) => acc + (curr.offeredPrice * curr.volume), 0);

  const pendingEscrow = sellerOffers
    .filter(o => o.status === "Pending")
    .reduce((acc, curr) => acc + (curr.offeredPrice * curr.volume), 0);

  const handleAction = (offerId: string, action: "Accepted" | "Declined", buyerName: string) => {
    respondToOffer(offerId, action);
    if (action === "Accepted") {
      setSuccessMsg(`Offer from ${buyerName} accepted! Escrow funds released to your payout balance.`);
      setTimeout(() => setSuccessMsg(""), 5000);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAF9] font-sans">
      <Navbar />

      <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        
        {/* Success toast alerts */}
        {successMsg && (
          <div className="bg-emerald-600 text-white p-4 rounded-xl shadow-lg text-center font-bold text-xs animate-slideDown">
            🎉 {successMsg}
          </div>
        )}

        {/* Header summary */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-emerald-950 text-emerald-400 text-[10px] font-bold rounded-full mb-2 border border-emerald-900/60">
              Seller Control Portal
            </div>
            <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">Developer Dashboard</h1>
            <p className="text-xs text-slate-500 mt-1">Manage vault-custodied certificates, verify active bids, and monitor cash payouts.</p>
          </div>
          <Link
            href="/seller/create"
            className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs transition-colors shadow flex items-center gap-1.5"
          >
            <PlusCircle className="w-4 h-4" />
            Create New Listing
          </Link>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1 */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm space-y-2">
            <span className="text-[9px] uppercase font-bold tracking-wider text-slate-400 block">Payout Earnings</span>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-black text-slate-800">₹{totalEarnings.toLocaleString()}</span>
            </div>
            <span className="text-[10px] text-emerald-600 font-medium block">Settled to your bank</span>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm space-y-2">
            <span className="text-[9px] uppercase font-bold tracking-wider text-slate-400 block">Funds Locked in Escrow</span>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-black text-[#0B3D2E]">₹{pendingEscrow.toLocaleString()}</span>
            </div>
            <span className="text-[10px] text-[#06B6D4] font-medium block">Pending buyer release</span>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm space-y-2">
            <span className="text-[9px] uppercase font-bold tracking-wider text-slate-400 block">Active Listings Volume</span>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-black text-slate-800">{totalListedTons.toLocaleString()}</span>
              <span className="text-xs text-slate-400 font-semibold">Tons</span>
            </div>
            <span className="text-[10px] text-slate-500 font-medium block">Pre-locked in GCI vaults</span>
          </div>

          {/* Card 4 */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm space-y-2">
            <span className="text-[9px] uppercase font-bold tracking-wider text-slate-400 block">Pending Bids</span>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-black text-[#F59E0B]">{activeOffersCount}</span>
              <span className="text-xs text-slate-400 font-semibold">Offers</span>
            </div>
            <span className="text-[10px] text-slate-500 font-medium block">Action required</span>
          </div>
        </div>

        {/* Main Dashboard Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Listings and Offers (2 cols) */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Offers Negotiation Manager */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
              <div>
                <h3 className="text-xs font-extrabold text-slate-800 tracking-tight">Active Buyer Offers (Negotiator)</h3>
                <p className="text-[9px] text-slate-400 mt-0.5">Bid prices submitted by corporate buyers based on reference pricing limits</p>
              </div>

              <div className="space-y-3">
                {sellerOffers.length > 0 ? (
                  sellerOffers.map((off) => (
                    <div 
                      key={off.id}
                      className={`border p-4 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors ${
                        off.status === "Pending" 
                          ? "border-amber-200 bg-amber-50/10" 
                          : off.status === "Accepted" 
                            ? "border-emerald-200 bg-emerald-50/15" 
                            : "border-slate-200 bg-slate-50/20"
                      }`}
                    >
                      {/* Bid Info */}
                      <div className="space-y-1 text-xs">
                        <div className="flex items-center gap-2">
                          <strong className="text-slate-800 font-bold">{off.buyerName}</strong>
                          <span className="text-[9px] bg-slate-100 text-slate-500 font-semibold px-2 py-0.5 rounded">
                            {off.buyerSector}
                          </span>
                        </div>
                        <p className="text-slate-500 text-[11px]">
                          Wants to purchase <strong>{off.volume.toLocaleString()} tons</strong> of <em>{off.projectName}</em>.
                        </p>
                        <div className="text-[9px] text-slate-400 flex gap-3 pt-1">
                          <span>Offered: <strong className="text-emerald-600">₹{off.offeredPrice}/ton</strong></span>
                          <span>Registry: <code>{off.date}</code></span>
                        </div>
                      </div>

                      {/* Bid Actions */}
                      <div className="flex items-center gap-2">
                        {off.status === "Pending" ? (
                          <>
                            <button
                              onClick={() => handleAction(off.id, "Accepted", off.buyerName)}
                              className="px-3.5 py-1.5 bg-[#10B981] hover:bg-emerald-500 text-white font-bold rounded-lg text-[10px] transition-colors shadow-sm flex items-center gap-0.5"
                            >
                              <Check className="w-3.5 h-3.5" />
                              Accept
                            </button>
                            <button
                              onClick={() => handleAction(off.id, "Declined", off.buyerName)}
                              className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold rounded-lg text-[10px] transition-colors flex items-center gap-0.5 border border-slate-200"
                            >
                              <X className="w-3.5 h-3.5" />
                              Decline
                            </button>
                          </>
                        ) : (
                          <span className={`text-[10px] font-bold px-3 py-1 rounded-full border ${
                            off.status === "Accepted" 
                              ? "bg-emerald-100/60 text-emerald-800 border-emerald-200" 
                              : "bg-slate-100 text-slate-400 border-slate-200"
                          }`}>
                            {off.status}
                          </span>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-slate-400 text-xs">
                    No buyer bids received yet.
                  </div>
                )}
              </div>
            </div>

            {/* Active Listings Grid */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
              <div>
                <h3 className="text-xs font-extrabold text-slate-800 tracking-tight">Active Listings</h3>
                <p className="text-[9px] text-slate-400 mt-0.5">Voluntary carbon credit assets currently live on the marketplace</p>
              </div>

              <div className="space-y-3">
                {sellerListings.map((l) => (
                  <div key={l.id} className="border border-slate-100 p-4 rounded-xl flex items-center justify-between gap-4 text-xs hover:border-emerald-300 transition-colors">
                    <div>
                      <div className="flex items-center gap-2">
                        <strong className="text-slate-800 font-bold text-sm">{l.name}</strong>
                        <span className="text-[9px] bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded tracking-wide border border-emerald-100 uppercase">
                          {l.type}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1 leading-relaxed line-clamp-1">{l.description}</p>
                      <div className="text-[9px] text-slate-400 flex gap-4 pt-1 font-semibold">
                        <span>Registry: <code>{l.certRegistry}</code></span>
                        <span>State: {l.location}</span>
                        <span>Trust Score: <strong className="text-emerald-600">{l.trustScore}%</strong></span>
                      </div>
                    </div>

                    <div className="text-right flex-shrink-0 min-w-[80px]">
                      <span className="text-sm font-black text-slate-800 block">₹{l.price}</span>
                      <span className="text-[9px] text-slate-400 block mt-0.5 font-semibold">{l.volume.toLocaleString()} t available</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Custody Vault & Escrow Info (1 col) */}
          <div className="w-full space-y-6">
            
            {/* Vault Custody Status (Locked Server Rack Look) */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-5">
              <div>
                <h3 className="text-xs font-extrabold text-slate-800 tracking-tight">Vault Custody Status</h3>
                <p className="text-[9px] text-slate-400 mt-0.5">Certificates securely deposited and e-locked on GCI registries</p>
              </div>

              <div className="space-y-4">
                {sellerListings.map((l) => (
                  <div 
                    key={l.id} 
                    className="bg-slate-50 text-slate-700 p-4.5 rounded-2xl border border-slate-200/80 flex items-center justify-between gap-4 relative overflow-hidden shadow-sm hover:border-emerald-300 transition-colors"
                  >
                    {/* Glowing status light */}
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 absolute top-3 right-3 animate-pulse"></div>
                    
                    <div className="absolute -right-4 -bottom-4 opacity-5 animate-pulse-slow">
                      <FolderLock className="w-16 h-16 text-emerald-600" />
                    </div>
                    
                    <div className="space-y-1.5 text-xs relative z-10">
                      <div className="flex items-center gap-1.5 text-emerald-700 font-bold">
                        <Lock className="w-3.5 h-3.5 text-emerald-600" />
                        Vault Block Custody
                      </div>
                      <h4 className="font-bold text-slate-800 text-[11px] truncate max-w-[150px]">{l.name}</h4>
                      <code className="text-[9px] font-mono text-slate-400 block">{l.certRegistry}</code>
                    </div>
                    <div className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1 rounded-lg text-[9px] font-bold font-mono">
                      ELOCKED
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Escrow payout parameters */}
            <div className="bg-emerald-50/40 border border-emerald-100 p-5 rounded-3xl space-y-3 text-xs">
              <span className="font-bold text-[#0B3D2E] flex items-center gap-1.5">
                <Landmark className="w-4 h-4 text-emerald-600" />
                Escrow Payout Guidelines
              </span>
              <p className="text-[10px] text-slate-500 leading-relaxed">
                When a buyer locks escrow capital, your certificate goes into GCI registry hold. Once the buyer completes registry ownership transfer verification, capital releases automatically to your registered banking codes. Settlement cycle is guaranteed under 48 hours.
              </p>
            </div>

          </div>

        </div>

      </div>

      <Footer />
    </div>
  );
}
