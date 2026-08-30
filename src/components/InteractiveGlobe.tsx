"use client";

import React from "react";
import dynamic from "next/dynamic";
import { CarbonProject } from "@/data/mockProjects";
import { Globe as GlobeIcon, Loader2 } from "lucide-react";

// Dynamically import the Globe component to prevent server-side rendering issues
const GlobeComponent = dynamic(
  () => import("./GlobeComponent"),
  { 
    ssr: false,
    loading: () => (
      <div className="w-full h-[550px] min-h-[400px] bg-[#0A0F0D] flex flex-col items-center justify-center gap-3 rounded-2xl border border-emerald-950/20 text-slate-400 relative overflow-hidden">
        {/* Shimmer loading backdrop */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-950/10 to-transparent -translate-x-full animate-shimmer" style={{ backgroundSize: "200% 100%" }}></div>
        
        {/* Loading Spinner */}
        <div className="relative">
          <GlobeIcon className="w-16 h-16 text-emerald-900 animate-pulse-slow" />
          <Loader2 className="w-6 h-6 text-emerald-500 animate-spin absolute top-1/2 left-1/2 -mt-3 -ml-3" />
        </div>
        
        <div className="flex flex-col items-center text-center px-4 max-w-sm">
          <p className="text-sm font-semibold text-slate-300">Loading Ecosystem Map...</p>
          <p className="text-xs text-slate-500 mt-1">Initializing WebGL coordinates and cross-referencing national registries.</p>
        </div>
      </div>
    )
  }
);

interface InteractiveGlobeProps {
  interactive?: boolean;
  onSelectProject?: (p: CarbonProject) => void;
  mini?: boolean;
}

export default function InteractiveGlobe({ interactive = true, onSelectProject, mini = false }: InteractiveGlobeProps) {
  return (
    <div className={`w-full h-full ${mini ? "min-h-[250px]" : "min-h-[450px]"}`}>
      <GlobeComponent interactive={interactive} onSelectProject={onSelectProject} mini={mini} />
    </div>
  );
}
