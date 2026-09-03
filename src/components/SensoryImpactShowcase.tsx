"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "@/context/AppContext";
import TiltCard from "@/components/TiltCard";
import MagneticButton from "@/components/MagneticButton";
import { 
  TreePine, 
  Zap, 
  Sun, 
  Wind, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  Globe, 
  Layers, 
  TrendingUp, 
  CheckCircle,
  Activity,
  Compass
} from "lucide-react";
import Link from "next/link";

interface FlavorArchetype {
  id: string;
  name: string;
  category: "Forestry" | "Biogas" | "Solar" | "Wind";
  location: string;
  coords: { lat: number; lng: number };
  accentColor: string;
  bgGradient: string;
  badgeColor: string;
  tagline: string;
  description: string;
  pricePerTon: number;
  availableVolume: number;
  trustScore: number;
  sensoryNotes: { label: string; icon: React.ElementType }[];
  metrics: {
    treesPerTon: number;
    flightEquiv: number;
    bioStability: string;
    registryId: string;
  };
  icon: React.ElementType;
}

const archetypes: FlavorArchetype[] = [
  {
    id: "odisha-mangrove",
    name: "Mahanadi Delta Mangrove Estuary",
    category: "Forestry",
    location: "Kendrapara, Odisha",
    coords: { lat: 20.5, lng: 86.7 },
    accentColor: "#10B981",
    bgGradient: "from-emerald-950/20 via-emerald-900/10 to-transparent",
    badgeColor: "bg-emerald-50 text-emerald-800 border-emerald-200",
    tagline: "Dense Estuary Biomass & Native Coastal Protection",
    description: "Restoring 4,200 hectares of tidal mangrove wetlands in the Mahanadi estuary. Traps deep subterranean carbon in peat mud while shielding coastal fishing hamlets from cyclonic surges.",
    pricePerTon: 310,
    availableVolume: 14500,
    trustScore: 98,
    sensoryNotes: [
      { label: "High Subterranean Peat Carbon", icon: TreePine },
      { label: "98.4% Satellite Lidar Density", icon: Globe },
      { label: "Coastal Fishing Community Yield", icon: Activity },
      { label: "GCI Voluntary Registry Locked", icon: ShieldCheck }
    ],
    metrics: {
      treesPerTon: 14,
      flightEquiv: 1.2,
      bioStability: "Grade A+ (Estuary Wetland)",
      registryId: "GCI-REG-2026-OD812"
    },
    icon: TreePine
  },
  {
    id: "punjab-biogas",
    name: "Malwa Bio-Energy Agritech",
    category: "Biogas",
    location: "Ludhiana, Punjab",
    coords: { lat: 30.9, lng: 75.85 },
    accentColor: "#F59E0B",
    bgGradient: "from-amber-950/20 via-amber-900/10 to-transparent",
    badgeColor: "bg-amber-50 text-amber-800 border-amber-200",
    tagline: "Stubble-Burning Abatement & Clean Methane Capture",
    description: "Converting 65,000 metric tons of agricultural paddy crop stubble into compressed biomethane (CBG). Directly prevents toxic winter smog across Northern India while generating organic bio-fertilizer.",
    pricePerTon: 280,
    availableVolume: 8200,
    trustScore: 96,
    sensoryNotes: [
      { label: "100% Crop Burning Abatement", icon: Zap },
      { label: "Direct Farmer Revenue Split", icon: TrendingUp },
      { label: "Compressed Biomethane Injection", icon: Sparkles },
      { label: "ACVA Audited Chemical Purity", icon: ShieldCheck }
    ],
    metrics: {
      treesPerTon: 10,
      flightEquiv: 1.0,
      bioStability: "Grade A (Clean Air Index)",
      registryId: "GCI-REG-2026-PB291"
    },
    icon: Zap
  },
  {
    id: "thar-solar",
    name: "Thar High-Irradiance Solar Array",
    category: "Solar",
    location: "Jodhpur, Rajasthan",
    coords: { lat: 26.9, lng: 71.9 },
    accentColor: "#06B6D4",
    bgGradient: "from-cyan-950/20 via-cyan-900/10 to-transparent",
    badgeColor: "bg-cyan-50 text-cyan-800 border-cyan-200",
    tagline: "Zero-Water Inverter Telemetry Grid Power",
    description: "Massive 250MW tracking photovoltaic installation in the Thar Desert displacing fossil coal baseload with zero water consumption and real-time smart inverter telemetry.",
    pricePerTon: 260,
    availableVolume: 22000,
    trustScore: 99,
    sensoryNotes: [
      { label: "300+ Days Peak Solar Flux", icon: Sun },
      { label: "Zero Water Cleaning Tech", icon: Activity },
      { label: "24/7 Smart Telemetry Handshake", icon: Globe },
      { label: "Escrow Direct Capital Binding", icon: ShieldCheck }
    ],
    metrics: {
      treesPerTon: 9,
      flightEquiv: 0.95,
      bioStability: "Grade AAA (Industrial Grid)",
      registryId: "GCI-REG-2026-RJ404"
    },
    icon: Sun
  },
  {
    id: "kutch-wind",
    name: "Kutch Coastal Offshore Wind Hub",
    category: "Wind",
    location: "Mandvi, Gujarat",
    coords: { lat: 23.2, lng: 69.6 },
    accentColor: "#8B5CF6",
    bgGradient: "from-purple-950/20 via-purple-900/10 to-transparent",
    badgeColor: "bg-purple-50 text-purple-800 border-purple-200",
    tagline: "24/7 Maritime Wind Turbines & CBAM Compliance",
    description: "Tapping strong Arabian Sea coastal thermal wind currents with next-generation 4.2MW turbines, providing steady non-intermittent green energy for heavy industrial steel exporters.",
    pricePerTon: 295,
    availableVolume: 18000,
    trustScore: 97,
    sensoryNotes: [
      { label: "Maritime Offshore Thermal Winds", icon: Wind },
      { label: "EU CBAM Export Compliant", icon: Globe },
      { label: "Non-Intermittent Baseload", icon: Zap },
      { label: "48-Hour Escrow Settlement", icon: ShieldCheck }
    ],
    metrics: {
      treesPerTon: 11,
      flightEquiv: 1.15,
      bioStability: "Grade A+ (Maritime Energy)",
      registryId: "GCI-REG-2026-GJ109"
    },
    icon: Wind
  }
];

export default function SensoryImpactShowcase() {
  const { selectProject, projects } = useApp();
  const [selectedArchetype, setSelectedArchetype] = useState<FlavorArchetype>(archetypes[0]);
  const [volume, setVolume] = useState<number>(5000);

  // Switch archetype and command the 3D globe camera
  const handleSelectArchetype = (arch: FlavorArchetype) => {
    setSelectedArchetype(arch);
    
    // Find matching project in app context or trigger globe coordinate zoom
    const match = projects.find(p => p.id === arch.id || p.type === arch.category);
    if (match) {
      selectProject(match);
    }
  };

  const Icon = selectedArchetype.icon;
  const totalCost = volume * selectedArchetype.pricePerTon;
  const treesTotal = volume * selectedArchetype.metrics.treesPerTon;
  const flightsTotal = Math.round(volume * selectedArchetype.metrics.flightEquiv);

  return (
    <section className="py-24 bg-[#FAFCFB] border-b border-slate-200/60 relative overflow-hidden">
      
      {/* Dynamic Liquid Glow Orbs (Kumo Matcha style background fluid motion) */}
      <motion.div
        animate={{
          backgroundColor: selectedArchetype.accentColor,
          opacity: [0.06, 0.12, 0.06],
          scale: [1, 1.15, 1],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 -left-32 w-[550px] h-[550px] rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{
          backgroundColor: selectedArchetype.accentColor,
          opacity: [0.04, 0.08, 0.04],
          scale: [1.1, 1, 1.1],
        }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-10 -right-24 w-[600px] h-[600px] rounded-full blur-3xl pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-slate-200/80 rounded-full shadow-sm">
            <span className="w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: selectedArchetype.accentColor }} />
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-700">
              Sensory Impact Explorer — Indian Carbon Terroir
            </span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#064E3B] tracking-tight">
            Explore Verified Carbon <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">Archetypes.</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto leading-relaxed font-bold">
            Carbon credits are not a commodity number. Every listing carries distinct biodiversity benefits, community livelihoods, and satellite Lidar telemetry.
          </p>
        </div>

        {/* Fluid Pill Archetype Selector (Kumo style interactive menu) */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {archetypes.map((arch) => {
            const isSelected = selectedArchetype.id === arch.id;
            const TabIcon = arch.icon;
            
            return (
              <button
                key={arch.id}
                onClick={() => handleSelectArchetype(arch)}
                className={`relative px-5 py-3 rounded-2xl text-xs font-extrabold transition-all duration-300 flex items-center gap-2 cursor-pointer select-none border ${
                  isSelected
                    ? "text-white shadow-lg shadow-emerald-950/15 border-transparent"
                    : "bg-white/80 hover:bg-white text-slate-600 border-slate-200 hover:border-emerald-200 shadow-sm"
                }`}
                style={{
                  backgroundColor: isSelected ? "#0B3D2E" : undefined
                }}
              >
                {isSelected && (
                  <motion.div
                    layoutId="activeArchetypeGlow"
                    className="absolute inset-0 rounded-2xl border-2 pointer-events-none"
                    style={{ borderColor: arch.accentColor }}
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <TabIcon 
                  className="w-4 h-4" 
                  style={{ color: isSelected ? arch.accentColor : undefined }} 
                />
                <span>{arch.name}</span>
                <span 
                  className="text-[9px] px-2 py-0.5 rounded-full font-mono font-bold"
                  style={{
                    backgroundColor: isSelected ? "rgba(255,255,255,0.15)" : "#f1f5f9",
                    color: isSelected ? "#ffffff" : "#64748b"
                  }}
                >
                  ₹{arch.pricePerTon}/t
                </span>
              </button>
            );
          })}
        </div>

        {/* Interactive Sensory Showcase Board (Kumo Matcha split sensory card) */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedArchetype.id}
            initial={{ opacity: 0, y: 15, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -15, scale: 0.98 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
          >
            
            {/* Left Card: Sensory Flavor & Biodiversity Notes (7 cols) */}
            <div className="lg:col-span-7 flex flex-col">
              <TiltCard 
                className="bg-white/95 backdrop-blur-xl border border-slate-200/80 p-8 shadow-xl flex-1 flex flex-col justify-between space-y-6 rounded-3xl"
                shadowColor="rgba(16, 185, 129, 0.08)"
                maxTilt={4}
              >
                <div className="space-y-6">
                  {/* Category Header */}
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider border ${selectedArchetype.badgeColor}`}>
                        {selectedArchetype.category}
                      </span>
                      <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
                        <Compass className="w-3.5 h-3.5 text-slate-400" />
                        {selectedArchetype.location}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-800 rounded-full text-[10px] font-extrabold border border-emerald-200">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      Trust Score {selectedArchetype.trustScore}%
                    </div>
                  </div>

                  {/* Headline & Description */}
                  <div className="space-y-2">
                    <h3 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight leading-snug">
                      {selectedArchetype.tagline}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                      {selectedArchetype.description}
                    </p>
                  </div>

                  {/* Floating Sensory Notes Pills */}
                  <div className="space-y-2">
                    <span className="text-[10px] uppercase font-bold text-slate-500 block tracking-wider">
                      Verified Bio-Telemetry &amp; Co-Benefits
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {selectedArchetype.sensoryNotes.map((note, idx) => {
                        const NoteIcon = note.icon;
                        return (
                          <motion.span
                            key={idx}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: idx * 0.08, duration: 0.3 }}
                            whileHover={{ scale: 1.05 }}
                            className="px-3.5 py-1.5 bg-slate-50 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 text-slate-800 text-xs font-bold rounded-xl transition-all shadow-sm cursor-default flex items-center gap-1.5"
                          >
                            <NoteIcon className="w-3.5 h-3.5 text-emerald-600" />
                            <span>{note.label}</span>
                          </motion.span>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Bottom Technical Spec Bar */}
                <div className="border-t border-slate-100 pt-5 grid grid-cols-3 gap-4 text-xs font-semibold">
                  <div>
                    <span className="text-[9px] text-slate-500 uppercase font-bold block mb-0.5">Registry File</span>
                    <code className="text-slate-800 font-mono text-xs font-bold block">{selectedArchetype.metrics.registryId}</code>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-500 uppercase font-bold block mb-0.5">Bio-Stability</span>
                    <strong className="text-emerald-700 font-bold block">{selectedArchetype.metrics.bioStability}</strong>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-500 uppercase font-bold block mb-0.5">Available Supply</span>
                    <strong className="text-slate-800 font-bold block">{selectedArchetype.availableVolume.toLocaleString()} Tons</strong>
                  </div>
                </div>
              </TiltCard>
            </div>

            {/* Right Card: Interactive Sensory Impact Calculator & Escrow Lock (5 cols) */}
            <div className="lg:col-span-5 flex flex-col">
              <TiltCard 
                className="bg-white/95 backdrop-blur-xl border border-slate-200/80 p-8 shadow-xl flex-1 flex flex-col justify-between space-y-6 rounded-3xl"
                shadowColor="rgba(16, 185, 129, 0.08)"
                maxTilt={4}
              >
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 block mb-1">
                        Interactive Offset Volume
                      </span>
                      <h4 className="text-lg font-black text-slate-900">
                        Customize Your Impact
                      </h4>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-black text-[#06281E]">₹{selectedArchetype.pricePerTon}</span>
                      <span className="text-[10px] text-slate-500 font-semibold block">/ ton CO2e</span>
                    </div>
                  </div>

                  {/* Volume Slider with Live Counter */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-600 font-bold">Volume Selected</span>
                      <span className="text-emerald-700 font-black text-base">{volume.toLocaleString()} Tons</span>
                    </div>
                    <input
                      type="range"
                      min="500"
                      max="20000"
                      step="500"
                      value={volume}
                      onChange={(e) => setVolume(parseInt(e.target.value, 10))}
                      className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                    />
                    <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                      <span>500 t</span>
                      <span>10,000 t</span>
                      <span>20,000 t</span>
                    </div>
                  </div>

                  {/* Sensory Impact Conversions */}
                  <div className="grid grid-cols-2 gap-3 text-center">
                    <div className="p-3 bg-emerald-50/70 rounded-2xl border border-emerald-100 space-y-1">
                      <div className="flex items-center justify-center gap-1 text-[9px] text-emerald-800 uppercase font-bold">
                        <TreePine className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Native Trees</span>
                      </div>
                      <strong className="text-lg text-[#06281E] font-black block">
                        {treesTotal.toLocaleString()}
                      </strong>
                      <span className="text-[9px] text-emerald-600 font-semibold">Absorption Cycle</span>
                    </div>

                    <div className="p-3 bg-sky-50/70 rounded-2xl border border-sky-100 space-y-1">
                      <div className="flex items-center justify-center gap-1 text-[9px] text-sky-800 uppercase font-bold">
                        <Globe className="w-3.5 h-3.5 text-sky-600" />
                        <span>Flights Neutralized</span>
                      </div>
                      <strong className="text-lg text-sky-950 font-black block">
                        {flightsTotal.toLocaleString()}
                      </strong>
                      <span className="text-[9px] text-sky-600 font-semibold">DEL to BOM Flights</span>
                    </div>
                  </div>

                  {/* Valuation Summary */}
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="text-[8px] uppercase font-bold text-slate-400 block">Total Settlement</span>
                      <strong className="text-sm font-black text-slate-800">
                        ₹{(totalCost / 100000).toFixed(2)} Lakhs
                      </strong>
                    </div>
                    <div className="text-right">
                      <span className="text-[8px] uppercase font-bold text-slate-400 block">Escrow Protection</span>
                      <span className="text-[10px] text-emerald-600 font-bold">100% Guaranteed</span>
                    </div>
                  </div>
                </div>

                {/* Primary CTA */}
                <Link href={`/buyer/marketplace?type=${selectedArchetype.category}`}>
                  <MagneticButton
                    variant="primary"
                    className="w-full py-3.5 text-xs shadow-md"
                  >
                    <span>Proceed to Escrow Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </MagneticButton>
                </Link>
              </TiltCard>
            </div>

          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}
