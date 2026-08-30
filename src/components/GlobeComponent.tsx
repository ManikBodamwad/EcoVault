"use client";

import React, { useEffect, useRef, useState } from "react";
import Globe from "react-globe.gl";
import * as THREE from "three";
import { CarbonProject } from "@/data/mockProjects";
import { useApp } from "@/context/AppContext";
import { Compass, RotateCw } from "lucide-react";

interface GlobeComponentProps {
  interactive?: boolean;
  onSelectProject?: (p: CarbonProject) => void;
  mini?: boolean;
}

export default function GlobeComponent({ interactive = true, onSelectProject, mini = false }: GlobeComponentProps) {
  const globeRef = useRef<any>(null);
  const { projects, activeProject, globeTheme } = useApp();
  const [globeSize, setGlobeSize] = useState({ width: 600, height: 600 });
  const [arcs, setArcs] = useState<any[]>([]);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Responsive container sizing
  useEffect(() => {
    if (!containerRef.current) return;
    const updateSize = () => {
      if (containerRef.current) {
        setGlobeSize({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight || (mini ? 320 : 600)
        });
      }
    };
    
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, [mini]);

  // Set up pins (points) on the globe representing active carbon projects
  const pointsData = projects.map((p) => ({
    lat: p.lat,
    lng: p.lng,
    size: activeProject?.id === p.id ? 0.42 : 0.22,
    color: activeProject?.id === p.id ? "#38BDF8" : "#10B981",
    label: `<div style="background: rgba(15,23,42,0.9); backdrop-filter: blur(8px); padding: 6px 10px; border-radius: 8px; border: 1px solid rgba(16,185,129,0.3); font-family: sans-serif; font-size: 11px; font-weight: bold; color: white;">
      <span style="color: #34d399;">●</span> ${p.name} <span style="color: #94a3b8;">(${p.location})</span> — ₹${p.price}/t
    </div>`,
    project: p
  }));

  // Pulsating sonar / emissive wave rings for every project location
  const ringsData = projects.map((p) => {
    const isFocused = activeProject?.id === p.id;
    return {
      lat: p.lat,
      lng: p.lng,
      maxR: isFocused ? 7.5 : 4.0,
      propagationSpeed: isFocused ? 2.4 : 1.2,
      repeatPeriod: isFocused ? 1200 : 1800,
      color: (t: number) => {
        const alpha = Math.max(0, Math.sqrt(1 - t));
        return isFocused 
          ? `rgba(56, 189, 248, ${alpha * 0.9})` 
          : `rgba(16, 185, 129, ${alpha * 0.75})`;
      }
    };
  });

  // Implied buyer location: Mumbai (India's financial capital)
  const BUYER_COORDS = { lat: 19.076, lng: 72.8777 };

  // Handle active project selection camera zoom and arc drawing
  useEffect(() => {
    if (!globeRef.current) return;
    
    const prefersReducedMotion = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const duration = prefersReducedMotion ? 50 : 2200;

    if (activeProject) {
      // Zoom and center camera onto the selected project coordinate with custom altitude
      globeRef.current.pointOfView(
        {
          lat: activeProject.lat - 2,
          lng: activeProject.lng,
          altitude: mini ? 1.4 : 1.2
        },
        duration
      );

      // Create an animated delivery arc from Mumbai (Buyer) to Project (Seller)
      setArcs([
        {
          startLat: BUYER_COORDS.lat,
          startLng: BUYER_COORDS.lng,
          endLat: activeProject.lat,
          endLng: activeProject.lng,
          color: ["#38BDF8", "#34D399", "#10B981"],
          name: `Verified Escrow Stream: Mumbai → ${activeProject.name}`
        }
      ]);
    } else {
      // Return to default view showing all of India centered
      globeRef.current.pointOfView(
        {
          lat: 21.0,
          lng: 79.5,
          altitude: mini ? 1.8 : 1.65
        },
        duration
      );
      setArcs([]);
    }
  }, [activeProject, mini]);

  // Studio-grade 3-point Lighting & Weighted Inertial OrbitControls (Lusion.co style)
  useEffect(() => {
    if (!globeRef.current) return;
    
    // Configure weighted inertia & damping
    const controls = globeRef.current.controls();
    if (controls) {
      controls.autoRotate = true;
      controls.autoRotateSpeed = activeProject ? 0.2 : 0.6;
      controls.enableZoom = interactive;
      controls.enablePan = interactive;
      controls.enableDamping = true;
      controls.dampingFactor = 0.04; // Smooth momentum
      controls.rotateSpeed = 0.8;
    }

    // Access raw Three.js scene to inject studio lighting
    const scene = globeRef.current.scene();
    if (scene) {
      // Clear existing custom lights to avoid duplication on re-renders
      scene.children = scene.children.filter((c: any) => !c.__isEcoVaultStudioLight);

      // 1. Ambient Light: deep, soft studio fill
      const ambient = new THREE.AmbientLight(0x0a1914, 0.4);
      (ambient as any).__isEcoVaultStudioLight = true;
      scene.add(ambient);

      // 2. Key Light: Warm bright directional light casting distinct day/terminator line
      const keyLight = new THREE.DirectionalLight(0xfffaed, 2.6);
      keyLight.position.set(300, 180, 240);
      (keyLight as any).__isEcoVaultStudioLight = true;
      scene.add(keyLight);

      // 3. Rim / Back Light: Emerald-cyan edge illumination on the dark horizon (Lusion.co rim lighting)
      const rimLight = new THREE.DirectionalLight(0x10b981, 3.4);
      rimLight.position.set(-320, -120, -260);
      (rimLight as any).__isEcoVaultStudioLight = true;
      scene.add(rimLight);

      // 4. Accent Cyan Specular Light
      const cyanAccent = new THREE.DirectionalLight(0x38bdf8, 1.8);
      cyanAccent.position.set(0, 300, -150);
      (cyanAccent as any).__isEcoVaultStudioLight = true;
      scene.add(cyanAccent);
    }
  }, [activeProject, interactive]);

  // Natural Earth night lights texture with city clusters and topological bump map
  const globeImage = "//unpkg.com/three-globe/example/img/earth-night.jpg";
  const bumpImage = "//unpkg.com/three-globe/example/img/earth-topology.png";

  return (
    <div 
      ref={containerRef} 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="w-full h-full relative flex items-center justify-center overflow-visible select-none cursor-grab active:cursor-grabbing"
    >
      {/* Globe Component */}
      <Globe
        ref={globeRef}
        width={globeSize.width}
        height={globeSize.height}
        globeImageUrl={globeImage}
        bumpImageUrl={bumpImage}
        backgroundColor="rgba(0,0,0,0)"
        
        // Atmosphere Glow (Emerald Halo)
        showAtmosphere={true}
        atmosphereColor="#34D399"
        atmosphereAltitude={0.26}
        
        // Points (Pins)
        pointsData={pointsData}
        pointLat="lat"
        pointLng="lng"
        pointColor="color"
        pointRadius="size"
        pointAltitude={0.035}
        pointsMerge={false}
        onPointClick={(point: any) => {
          if (interactive && onSelectProject) {
            onSelectProject(point.project);
          }
        }}
        pointLabel="label"

        // Animated Emissive Ripple Rings
        ringsData={ringsData}
        ringLat="lat"
        ringLng="lng"
        ringColor="color"
        ringMaxRadius="maxR"
        ringPropagationSpeed="propagationSpeed"
        ringRepeatPeriod="repeatPeriod"

        // Arcs (Verified Delivery Streams)
        arcsData={arcs}
        arcStartLat="startLat"
        arcStartLng="startLng"
        arcEndLat="endLat"
        arcEndLng="endLng"
        arcColor="color"
        arcDashLength={0.45}
        arcDashGap={0.02}
        arcDashAnimateTime={1400}
        arcStroke={1.8}
        arcAltitude={0.28}
      />

      {/* Floating Drag Hint Pill (Cuberto/Lusion micro-interaction) */}
      {!mini && interactive && (
        <div 
          className={`absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full border border-slate-200/80 shadow-lg text-[10px] font-bold text-slate-700 flex items-center gap-2 pointer-events-none transition-all duration-300 ${
            isHovered ? "opacity-100 translate-y-0" : "opacity-75 translate-y-1"
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Drag &amp; spin to explore India's Voluntary Grid</span>
          <RotateCw className="w-3 h-3 text-slate-400 animate-spin" style={{ animationDuration: "12s" }} />
        </div>
      )}

      {/* Embedded Compass / Legend */}
      {!mini && (
        <div className="absolute top-4 left-4 bg-white/80 backdrop-blur-md px-3 py-2 rounded-xl border border-slate-200/80 text-[9px] font-semibold text-slate-600 space-y-1 select-none pointer-events-none shadow-sm">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#10B981] block animate-pulse" />
            <span>Active Seller Projects (GCI Registry)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#38BDF8] block" />
            <span>Escrow Settlement Hub (Mumbai)</span>
          </div>
        </div>
      )}
    </div>
  );
}
