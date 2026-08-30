"use client";

import React, { useState, useEffect } from "react";
import { useApp } from "@/context/AppContext";
import { CarbonProject } from "@/data/mockProjects";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import InteractiveGlobe from "@/components/InteractiveGlobe";
import AIChatDrawer from "@/components/AIChatDrawer";
import { Search, Filter, ShieldCheck, ChevronRight, SlidersHorizontal, Map } from "lucide-react";
import Link from "next/link";

export default function Marketplace() {
  const { projects, activeProject, selectProject, chatMessages } = useApp();
  
  // States for search and filtering
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState<string>("All");
  const [maxPrice, setMaxPrice] = useState<number>(700);
  const [acvaOnly, setAcvaOnly] = useState<boolean>(false);
  const [filteredProjects, setFilteredProjects] = useState<CarbonProject[]>(projects);
  const [showFilters, setShowFilters] = useState(false);

  // Sync filtering based on state and inputs, as well as AI chat commands (e.g. if the user asked the AI to show biogas projects, etc.)
  useEffect(() => {
    // If the last message from AI contained project recommendations, let's parse or let it handle standard filters.
    // In our mock, the AI chat updates messages. We can check the last message text to auto-filter.
    const lastMsg = chatMessages[chatMessages.length - 1];
    if (lastMsg && lastMsg.sender === "ai") {
      const txt = lastMsg.text.toLowerCase();
      if (txt.includes("forestry projects")) {
        setSelectedType("Forestry");
      } else if (txt.includes("biogas projects")) {
        setSelectedType("Biogas");
      } else if (txt.includes("under ₹")) {
        const match = txt.match(/under ₹(\d+)/);
        if (match) {
          setMaxPrice(parseInt(match[1], 10));
        }
      }
    }
  }, [chatMessages]);

  useEffect(() => {
    let result = projects;

    if (searchTerm) {
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.developer.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedType !== "All") {
      result = result.filter((p) => p.type === selectedType);
    }

    result = result.filter((p) => p.price <= maxPrice);

    if (acvaOnly) {
      result = result.filter((p) => p.acvaVerified);
    }

    setFilteredProjects(result);
  }, [searchTerm, selectedType, maxPrice, acvaOnly, projects]);

  return (
    <div className="min-h-screen flex flex-col bg-[#F7FAF8] font-sans">
      <Navbar />

      <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex flex-col lg:flex-row gap-8">
        
        {/* Left Side: Filter and Cards (65% width on desktop) */}
        <div className="w-full lg:w-3/5 space-y-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-emerald-100/60 text-emerald-800 text-[10px] font-bold rounded mb-2">
              Carbon Marketplace
            </div>
            <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">Explore Verified Carbon Credits</h1>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Click on any listing card to zoom the 3D globe coordinates and verify the project details, registry logs, and ACVA audit records.
            </p>
          </div>

          {/* Search and Quick Filters bar */}
          <div className="bg-white p-4 rounded-xl border border-slate-200/60 shadow-sm space-y-3">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search project name, state, developer..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500 bg-slate-50/50 focus:bg-white transition-all"
                />
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-1.5 px-3 py-2 border border-slate-200 hover:border-slate-300 hover:bg-slate-50 rounded-lg text-xs font-semibold text-slate-700 transition-colors"
              >
                <SlidersHorizontal className="w-4 h-4" />
                Filters
              </button>
            </div>

            {/* Expanded Filters Drawer */}
            {(showFilters || selectedType !== "All" || acvaOnly || maxPrice < 700) && (
              <div className="pt-3 border-t border-slate-100 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                
                {/* Project Type */}
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 block">Project Type</label>
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="w-full p-2 border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  >
                    <option value="All">All Categories</option>
                    <option value="Forestry">Forestry</option>
                    <option value="Biogas">Biogas</option>
                    <option value="Wind">Wind</option>
                    <option value="Solar">Solar</option>
                    <option value="Waste-to-Energy">Waste-to-Energy</option>
                  </select>
                </div>

                {/* Price Range */}
                <div className="space-y-1">
                  <div className="flex justify-between font-semibold text-slate-700">
                    <span>Max Price</span>
                    <span className="text-emerald-600 font-bold">₹{maxPrice}/ton</span>
                  </div>
                  <input
                    type="range"
                    min="260"
                    max="700"
                    step="10"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(parseInt(e.target.value, 10))}
                    className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600 mt-2"
                  />
                </div>

                {/* ACVA Verification checkbox */}
                <div className="flex items-center gap-2 pt-4">
                  <input
                    type="checkbox"
                    id="acva-checkbox"
                    checked={acvaOnly}
                    onChange={(e) => setAcvaOnly(e.target.checked)}
                    className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-slate-300"
                  />
                  <label htmlFor="acva-checkbox" className="font-semibold text-slate-700 select-none cursor-pointer">
                    ACVA Verified Only
                  </label>
                </div>

              </div>
            )}
          </div>

          {/* Listings Grid */}
          <div className="space-y-3">
            {filteredProjects.length > 0 ? (
              filteredProjects.map((p) => {
                const isActive = activeProject?.id === p.id;
                return (
                  <div
                    key={p.id}
                    onClick={() => selectProject(isActive ? null : p)}
                    className={`bg-white rounded-xl border p-5 cursor-pointer shadow-sm hover:shadow-md transition-all relative overflow-hidden flex flex-col md:flex-row justify-between gap-4 group ${
                      isActive 
                        ? "border-[#38BDF8] ring-1 ring-[#38BDF8]/30" 
                        : "border-slate-200 hover:border-emerald-300"
                    }`}
                  >
                    {/* Left content block */}
                    <div className="space-y-2 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                          p.type === "Forestry" ? "bg-emerald-50 text-emerald-700 border border-emerald-200" :
                          p.type === "Biogas" ? "bg-amber-50 text-amber-700 border border-amber-200" :
                          p.type === "Solar" ? "bg-sky-50 text-sky-700 border border-sky-200" :
                          p.type === "Wind" ? "bg-purple-50 text-purple-700 border border-purple-200" :
                          "bg-rose-50 text-rose-700 border border-rose-200"
                        }`}>
                          {p.type}
                        </span>
                        <span className="text-[10px] text-slate-400 font-semibold">{p.location}, India</span>
                        {p.acvaVerified && (
                          <span className="inline-flex items-center gap-0.5 px-2 py-0.5 bg-emerald-950 text-emerald-400 text-[9px] font-bold rounded border border-emerald-900/50">
                            <ShieldCheck className="w-3 h-3 text-emerald-400" />
                            ACVA Audit
                          </span>
                        )}
                      </div>

                      <h3 className="text-base font-extrabold text-slate-800 tracking-tight group-hover:text-emerald-700 transition-colors">
                        {p.name}
                      </h3>
                      <p className="text-xs text-slate-500 leading-relaxed max-w-xl line-clamp-2">
                        {p.description}
                      </p>
                      
                      <div className="flex items-center gap-4 text-[10px] text-slate-400 pt-2 font-semibold">
                        <span>Trust Score: <strong className="text-emerald-600">{p.trustScore}%</strong></span>
                        <span>Registry: <code>{p.certRegistry}</code></span>
                        <span>Risk: <strong className={p.riskScore === "Low" ? "text-emerald-600" : "text-amber-500"}>{p.riskScore}</strong></span>
                      </div>
                    </div>

                    {/* Right pricing block */}
                    <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center gap-3 border-t md:border-t-0 md:border-l border-slate-100 pt-3 md:pt-0 md:pl-5 min-w-[120px]">
                      <div className="text-left md:text-right">
                        <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 block leading-none mb-1">Asking Price</span>
                        <span className="text-xl font-black text-slate-800">₹{p.price}</span>
                        <span className="text-[9px] text-slate-400 block font-semibold mt-0.5">per Ton CO₂e</span>
                      </div>
                      <div className="text-right">
                        <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 block leading-none mb-1">Volume</span>
                        <span className="text-xs font-bold text-slate-700">{p.volume.toLocaleString()} tons</span>
                      </div>
                      <Link
                        href={`/buyer/marketplace/${p.id}`}
                        onClick={(e) => e.stopPropagation()} // Stop event bubbling
                        className="p-1.5 bg-emerald-50 hover:bg-emerald-600 text-emerald-700 hover:text-white rounded-lg transition-all group-hover:translate-x-1"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                    </div>

                  </div>
                );
              })
            ) : (
              <div className="text-center py-16 bg-white border border-slate-200 rounded-xl space-y-2">
                <Search className="w-10 h-10 text-slate-300 mx-auto" />
                <h4 className="text-sm font-bold text-slate-700">No Projects Found</h4>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  Adjust your search keyword or filters. Try checking the "Ask EcoVault" chat assistant for recommendations.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Sticky Globe / Reveal (35% width on desktop) */}
        <div className="w-full lg:w-2/5">
          <div className="lg:sticky lg:top-24 space-y-4">
            
            {/* Globe container card */}
            <div className="bg-[#0A0F0D] rounded-2xl border border-emerald-950/20 overflow-hidden shadow-xl p-4 flex flex-col justify-between relative group">
              <div className="absolute top-4 left-4 z-10">
                <span className="flex items-center gap-1.5 px-2 py-0.5 bg-emerald-950/80 text-emerald-400 text-[9px] font-semibold rounded border border-emerald-900/50">
                  <Map className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                  Live Indian Grid Map
                </span>
              </div>
              
              {/* Globe renderer */}
              <div className="w-full h-[400px] flex items-center justify-center">
                <InteractiveGlobe />
              </div>

              {/* Reveal Context Card if a project is focused */}
              {activeProject ? (
                <div className="bg-[#0B3D2E]/80 backdrop-blur-md p-4 rounded-xl border border-emerald-500/20 text-white space-y-2.5 animate-fadeIn">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-bold px-2 py-0.5 bg-emerald-600 text-white rounded tracking-wide uppercase">
                      {activeProject.type}
                    </span>
                    <span className="text-[10px] text-emerald-300 font-semibold">{activeProject.location}, India</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white tracking-tight">{activeProject.name}</h4>
                    <p className="text-[10px] text-slate-300 mt-1 leading-relaxed line-clamp-2">
                      {activeProject.description}
                    </p>
                  </div>
                  <hr className="border-emerald-800" />
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[8px] text-slate-400 block uppercase font-bold tracking-wider leading-none">Market Price</span>
                      <span className="text-base font-black">₹{activeProject.price}/ton</span>
                    </div>
                    <Link
                      href={`/buyer/marketplace/${activeProject.id}`}
                      className="px-4 py-2 bg-[#16A34A] hover:bg-emerald-500 text-white text-[10px] font-bold rounded-lg shadow transition-all flex items-center gap-1"
                    >
                      Verify details
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="bg-[#0B3D2E]/30 p-4 rounded-xl border border-emerald-950/20 text-slate-400 text-center text-[10px] leading-relaxed">
                  Select any listing on the left to activate high-accuracy coordinate zoom and view certified project specifications.
                </div>
              )}
            </div>

            {/* Quick guide card */}
            <div className="bg-white p-4 rounded-xl border border-slate-200/60 shadow-sm text-xs text-slate-500 leading-relaxed flex items-start gap-2.5">
              <ShieldCheck className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <span>
                <strong>eKYC & Registry Matches:</strong> EcoVault guarantees that every listed certificate exists in the vault. Transactions route via institutional escrow to eliminate double-claiming risk.
              </span>
            </div>

          </div>
        </div>

      </div>

      <AIChatDrawer />
      <Footer />
    </div>
  );
}
