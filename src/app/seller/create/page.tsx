"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowLeft, Sparkles, Loader2, Landmark, CheckCircle } from "lucide-react";

export default function CreateListing() {
  const router = useRouter();
  const { addNewListing } = useApp();

  const [name, setName] = useState("");
  const [type, setType] = useState<"Forestry" | "Biogas" | "Wind" | "Solar" | "Waste-to-Energy">("Forestry");
  const [location, setLocation] = useState("Odisha");
  const [developer, setDeveloper] = useState("Rakesh Forestry Projects");
  const [lat, setLat] = useState(20.3);
  const [lng, setLng] = useState(85.8);
  const [price, setPrice] = useState<number>(310);
  const [volume, setVolume] = useState<number>(5000);
  const [description, setDescription] = useState("");
  const [details, setDetails] = useState("");

  // AI Pricing Assistant States
  const [aiPricing, setAiPricing] = useState({ min: 280, max: 340, rationale: "" });
  const [aiLoading, setAiLoading] = useState(false);

  // Trigger AI pricing updates on type/location change
  useEffect(() => {
    setAiLoading(true);
    const timer = setTimeout(() => {
      setAiLoading(false);
      
      // Calculate realistic ranges based on mock benchmarks
      let min = 300, max = 360, rat = "";
      if (type === "Forestry") {
        min = 310;
        max = 370;
        rat = `Forestry credits in ${location} capture premium value due to high biomass permanence and biodiversity offset multipliers. A recommended listing price range is ₹${min} to ₹${max}/ton.`;
      } else if (type === "Biogas") {
        min = 290;
        max = 320;
        rat = `Agricultural biogas projects in northern hubs like Punjab/Haryana displace methane efficiently. Market reference prices hold solid between ₹${min} and ₹${max}/ton.`;
      } else if (type === "Solar" || type === "Wind") {
        min = 260;
        max = 290;
        rat = `Renewable energy credits (Solar/Wind) are highly standardized grid-displacement assets. Highly liquid volumes trade at ₹${min} to ₹${max}/ton.`;
      } else {
        min = 300;
        max = 330;
        rat = `Waste-to-Energy biogas assets in municipal hubs require strict organic separation checks. Regional averages sit at ₹${min} to ₹${max}/ton.`;
      }

      setAiPricing({ min, max, rationale: rat });
    }, 1200);

    return () => clearTimeout(timer);
  }, [type, location]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !description) return;

    addNewListing({
      name,
      type,
      location,
      developer,
      lat,
      lng,
      price,
      volume,
      description,
      details: details || `A certified ${type.toLowerCase()} carbon offset asset located in ${location}, India. Backed by GCI matching and verified registry logs.`
    });

    router.push("/seller/dashboard");
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7FAF8] font-sans">
      <Navbar />

      <div className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Back Link */}
        <button 
          onClick={() => router.push("/seller/dashboard")} 
          className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-emerald-700 font-semibold mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Seller Portal
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Form Fields (7 cols) */}
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-5">
            <div>
              <span className="text-[9px] uppercase font-bold tracking-wider text-emerald-600 block">Asset Creation</span>
              <h2 className="text-xl font-bold text-slate-800 tracking-tight">Create Carbon Credit Listing</h2>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Provide specifications matching your GCI certificate records. The listing goes live instantly under ACVA pre-verified parameters.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              
              {/* Name */}
              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Project / Listing Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Punjab Stubble Bio-Energy Plant"
                  className="w-full border border-slate-200 rounded-xl px-3 py-2 bg-slate-50"
                />
              </div>

              {/* Grid 2 cols */}
              <div className="grid grid-cols-2 gap-4">
                {/* Project Type */}
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Project Type</label>
                  <select
                    value={type}
                    onChange={(e: any) => setType(e.target.value)}
                    className="w-full p-2 border border-slate-200 rounded-xl bg-slate-50"
                  >
                    <option value="Forestry">Forestry</option>
                    <option value="Biogas">Biogas</option>
                    <option value="Wind">Wind</option>
                    <option value="Solar">Solar</option>
                    <option value="Waste-to-Energy">Waste-to-Energy</option>
                  </select>
                </div>

                {/* State Location */}
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">State Location</label>
                  <input
                    type="text"
                    required
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full border border-slate-200 rounded-xl px-3 py-2 bg-slate-50"
                  />
                </div>
              </div>

              {/* Grid Pricing & Volume */}
              <div className="grid grid-cols-2 gap-4">
                {/* Volume */}
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Credit Volume (Tons)</label>
                  <input
                    type="number"
                    required
                    min={100}
                    value={volume}
                    onChange={(e) => setVolume(parseInt(e.target.value) || 0)}
                    className="w-full border border-slate-200 rounded-xl px-3 py-2 bg-slate-50 font-bold"
                  />
                </div>

                {/* Price */}
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Asking Price (₹/ton)</label>
                  <input
                    type="number"
                    required
                    min={200}
                    value={price}
                    onChange={(e) => setPrice(parseInt(e.target.value) || 0)}
                    className="w-full border border-slate-200 rounded-xl px-3 py-2 bg-slate-50 font-bold text-emerald-600"
                  />
                </div>
              </div>

              {/* GPS coordinates mock */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">GPS Latitude</label>
                  <input
                    type="number"
                    step="0.001"
                    value={lat}
                    onChange={(e) => setLat(parseFloat(e.target.value) || 20.3)}
                    className="w-full border border-slate-200 rounded-xl px-3 py-2 bg-slate-50"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">GPS Longitude</label>
                  <input
                    type="number"
                    step="0.001"
                    value={lng}
                    onChange={(e) => setLng(parseFloat(e.target.value) || 85.8)}
                    className="w-full border border-slate-200 rounded-xl px-3 py-2 bg-slate-50"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Summary Description</label>
                <textarea
                  required
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Summarize carbon capture mechanism, community parameters, and local impact..."
                  className="w-full border border-slate-200 rounded-xl px-3 py-2 bg-slate-50"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs transition-colors shadow mt-4"
              >
                Launch Listing to Marketplace
              </button>
            </form>
          </div>

          {/* Right Column: AI Reference Price Assistant (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* AI Assistant Card */}
            <div className="bg-[#0B3D2E] text-white rounded-3xl p-6 shadow-md space-y-4 border border-emerald-800">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-emerald-950 text-emerald-400 flex items-center justify-center border border-emerald-800">
                  <Sparkles className="w-4 h-4 text-emerald-400 animate-pulse" />
                </div>
                <div>
                  <h3 className="text-xs font-bold leading-none">EcoVault AI Pricing Assistant</h3>
                  <span className="text-[9px] text-emerald-400 mt-0.5 inline-block">Asset Valuation Node</span>
                </div>
              </div>

              <hr className="border-emerald-950" />

              {aiLoading ? (
                <div className="flex items-center justify-center gap-2 text-slate-300 text-xs py-8">
                  <Loader2 className="w-4 h-4 animate-spin text-emerald-400" />
                  <span>Analyzing registry transactions...</span>
                </div>
              ) : (
                <div className="space-y-4 animate-fadeIn">
                  <div>
                    <span className="text-[8px] text-slate-400 block uppercase font-bold tracking-wider leading-none mb-1">
                      Fair Reference Price Band
                    </span>
                    <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-lime-300">
                      ₹{aiPricing.min} – ₹{aiPricing.max} <span className="text-xs text-white">/ ton</span>
                    </span>
                  </div>

                  <p className="text-[10px] text-slate-300 leading-relaxed leading-normal">
                    {aiPricing.rationale}
                  </p>

                  <div className="flex gap-2 text-[9px] font-bold text-emerald-400 bg-emerald-950/40 p-2.5 rounded-lg border border-emerald-900/50">
                    <CheckCircle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-emerald-400" />
                    <span>Reference prices calculate real-time voluntary offset parameters indexed in Odisha/national hubs.</span>
                  </div>
                </div>
              )}
            </div>

            {/* Escrow note */}
            <div className="bg-emerald-50/40 border border-emerald-100 p-5 rounded-3xl space-y-2 text-xs">
              <span className="font-bold text-[#0B3D2E] flex items-center gap-1.5">
                <Landmark className="w-4 h-4 text-emerald-600" />
                Registry eLock Custody
              </span>
              <p className="text-[10px] text-slate-500 leading-relaxed">
                By listing, your digital carbon certificate is securely custodied inside the vault. EcoVault locks the certificate on GCI registries during buyer negotiations to prevent dual selling.
              </p>
            </div>

          </div>

        </div>

      </div>

      <Footer />
    </div>
  );
}
