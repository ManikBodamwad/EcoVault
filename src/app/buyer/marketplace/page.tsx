"use client";

import React, { useState, useEffect } from "react";
import { useApp } from "@/context/AppContext";
import { CarbonProject } from "@/data/mockProjects";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import InteractiveGlobe from "@/components/InteractiveGlobe";
import AIChatDrawer from "@/components/AIChatDrawer";
import { Search, Filter, ShieldCheck, ChevronRight, SlidersHorizontal, Map, Landmark, Activity, Sparkles } from "lucide-react";
import Link from "next/link";
import TiltCard from "@/components/TiltCard";

export default function Marketplace() {
  const { projects, activeProject, selectProject, chatMessages } = useApp();
  
  // States for search and filtering
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState<string>("All");
  const [maxPrice, setMaxPrice] = useState<number>(700);
  const [acvaOnly, setAcvaOnly] = useState<boolean>(false);
  const [filteredProjects, setFilteredProjects] = useState<CarbonProject[]>(projects);
  const [showFilters, setShowFilters] = useState(false);

  // Sync filtering based on AI chat commands
  useEffect(() => {
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
    <div className="min-h-screen flex flex-col bg-transparent font-sans">
      <Navbar />

      {/* Main Container */}
      <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex flex-col lg:flex-row gap-8">
        
        {/* Left Side: Filter and Cards (65% width on desktop) */}
        <div className="w-full lg:w-3/5 space-y-6">
          <div className="space-y-1">
            <span className="text-[9px] uppercase font-bold tracking-wider bg-emerald-100/60 text-emerald-800 px-2.5 py-0.5 rounded border border-emerald-200/50 w-fit block">
              Escrow-Protected Listings
            </span>
            <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">Ecosystem Carbon Marketplace</h1>
            <p className="text-xs text-slate-500 leading-relaxed">
              Verify real-time project metrics. Click on any card to automatically rotate and focus coordinates on the 3D grid globe.
            </p>
          </div>

          {/* Search and Filters Bar */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200/60 shadow-sm space-y-3">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search project name, state, developer..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500 bg-slate-50/50 focus:bg-white transition-all font-medium"
                />
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-1.5 px-4 py-2 border border-slate-200 hover:border-slate-300 hover:bg-slate-50 rounded-xl text-xs font-bold text-slate-700 transition-colors"
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
                    className="w-full p-2 border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500 font-bold"
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
                    className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-slate-300 cursor-pointer"
                  />
                  <label htmlFor="acva-checkbox" className="font-semibold text-slate-700 select-none cursor-pointer">
                    ACVA Verified Only
                  </label>
                </div>

              </div>
            )}
          </div>

          {/* Listings High Density Grid */}
          <div className="space-y-3">
            {filteredProjects.length > 0 ? (
              filteredProjects.map((p) => {
                const isActive = activeProject?.id === p.id;
                
                // Micro sparkline SVG coordinates generator
                const getSparklineD = () => {
                  if (p.type === "Forestry") return "M0 16 C10 12, 20 8, 30 14 C40 8, 45 4, 50 2";
                  if (p.type === "Biogas") return "M0 18 C12 14, 22 10, 32 12 C40 10, 45 8, 50 6";
                  if (p.type === "Solar") return "M0 15 C10 15, 20 12, 30 10 C38 8, 45 9, 50 4";
                  return "M0 12 C10 10, 20 15, 30 11 C40 14, 45 6, 50 8";
                };

                return (
                  <TiltCard
                    key={p.id}
                    className="w-full"
                    shadowColor="rgba(16, 185, 129, 0.04)"
                    maxTilt={4}
                  >
                    <div
                      onClick={() => selectProject(isActive ? null : p)}
                      className={`bg-white rounded-2xl border p-5 cursor-pointer flex flex-col md:flex-row justify-between gap-4 group w-full h-full ${
                        isActive 
                          ? "border-emerald-500 ring-1 ring-emerald-500/20" 
                          : "border-slate-200/80 hover:border-emerald-300"
                      }`}
                    >
                      {/* Left content block */}
                      <div className="space-y-2 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className={`text-xs font-bold px-2.5 py-0.5 rounded-lg uppercase tracking-wider ${
                            p.type === "Forestry" ? "bg-emerald-50 text-emerald-800 border border-emerald-200" :
                            p.type === "Biogas" ? "bg-amber-50 text-amber-800 border border-amber-200" :
                            p.type === "Solar" ? "bg-sky-50 text-sky-800 border border-sky-200" :
                            p.type === "Wind" ? "bg-purple-50 text-purple-800 border border-purple-200" :
                            "bg-rose-50 text-rose-800 border border-rose-200"
                          }`}>
                            {p.type}
                          </span>
                          <span className="text-xs text-slate-500 font-semibold">{p.location}, India</span>
                          {p.acvaVerified && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-emerald-950 text-emerald-400 text-xs font-bold rounded-lg border border-emerald-800">
                              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                              ACVA Verified
                            </span>
                          )}
                        </div>

                        <h3 className="text-lg font-extrabold text-slate-900 tracking-tight group-hover:text-emerald-700 transition-colors">
                          {p.name}
                        </h3>
                        <p className="text-xs text-slate-600 leading-relaxed max-w-xl line-clamp-2 font-medium">
                          {p.description}
                        </p>
                        
                        <div className="flex items-center gap-4 text-xs text-slate-500 pt-2 font-semibold border-t border-slate-100">
                          <span className="flex items-center gap-1">Trust Score: <strong className="text-emerald-700 font-bold">{p.trustScore}%</strong></span>
                          <span>Registry: <code className="font-mono text-slate-700 font-bold">{p.certRegistry}</code></span>
                          <span className="flex items-center gap-1">Risk: <strong className={p.riskScore === "Low" ? "text-emerald-700 font-bold" : "text-amber-600 font-bold"}>{p.riskScore}</strong></span>
                        </div>
                      </div>

                      {/* Middle: Sparkline Mini Chart */}
                      <div className="hidden md:flex flex-col justify-center items-center px-4 border-l border-r border-slate-100 min-w-[80px]">
                        <span className="text-[10px] uppercase font-bold text-slate-500 block mb-1">12M Trend</span>
                        <svg className={`w-16 h-7 ${
                          p.type === "Forestry" ? "text-emerald-600" : 
                          p.type === "Biogas" ? "text-amber-600" : "text-sky-600"
                        }`} viewBox="0 0 50 20">
                          <path
                            d={getSparklineD()}
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                        </svg>
                      </div>

                      {/* Right pricing block */}
                      <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center gap-3 border-t md:border-t-0 md:pl-5 min-w-[130px]">
                        <div className="text-left md:text-right">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block leading-none mb-1">Asking Price</span>
                          <span className="text-2xl font-black text-slate-900">₹{p.price}</span>
                          <span className="text-xs text-slate-500 block font-semibold mt-0.5">/ ton CO2e</span>
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block leading-none mb-0.5">Available</span>
                          <span className="text-xs font-bold text-slate-800">{p.volume.toLocaleString()} t</span>
                        </div>
                        <Link
                          href={`/buyer/marketplace/${p.id}`}
                          onClick={(e) => e.stopPropagation()}
                          className="px-3 py-1.5 bg-slate-100 hover:bg-emerald-600 text-slate-700 hover:text-white rounded-xl transition-all font-bold text-xs flex items-center gap-1 border border-slate-200"
                        >
                          <span>Inspect</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </TiltCard>
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
            <div className="bg-white rounded-3xl border border-slate-200/80 shadow-md overflow-hidden p-4 flex flex-col justify-between relative group">
              <div className="absolute top-4 left-4 z-10">
                <span className="flex items-center gap-1.5 px-2.5 py-0.5 bg-emerald-50 text-emerald-800 text-[9px] font-bold rounded border border-emerald-200">
                  <Activity className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
                  Live Indian Grid Map
                </span>
              </div>
              
              {/* Globe renderer */}
              <div className="w-full h-[400px] flex items-center justify-center">
                <InteractiveGlobe />
              </div>

              {/* Reveal Context Card if a project is focused */}
              {activeProject ? (
                <div className="bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-slate-200 text-slate-800 space-y-2.5 shadow-lg animate-fadeIn">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-bold px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded tracking-wide uppercase">
                      {activeProject.type}
                    </span>
                    <span className="text-[10px] text-slate-500 font-semibold">{activeProject.location}, India</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800 tracking-tight">{activeProject.name}</h4>
                    <p className="text-[10px] text-slate-500 mt-1 leading-relaxed line-clamp-2 font-medium">
                      {activeProject.description}
                    </p>
                  </div>
                  <hr className="border-slate-100" />
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[8px] text-slate-400 block uppercase font-bold tracking-wider leading-none">Market Price</span>
                      <span className="text-base font-black text-slate-800">₹{activeProject.price}/ton</span>
                    </div>
                    <Link
                      href={`/buyer/marketplace/${activeProject.id}`}
                      className="px-4 py-2 bg-[#10B981] hover:bg-emerald-500 text-white text-[10px] font-bold rounded-lg shadow transition-all flex items-center gap-1"
                    >
                      Verify details
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-slate-400 text-center text-[10px] leading-relaxed font-semibold">
                  Select any listing on the left to activate high-accuracy coordinate zoom and view certified project specifications.
                </div>
              )}
            </div>

            {/* Quick guide card */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200/60 shadow-sm text-xs text-slate-500 leading-relaxed flex items-start gap-2.5">
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
