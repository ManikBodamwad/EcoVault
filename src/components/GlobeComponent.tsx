"use client";

import React, { useEffect, useRef, useState } from "react";
import Globe from "react-globe.gl";
import { CarbonProject } from "@/data/mockProjects";
import { useApp } from "@/context/AppContext";

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
  const containerRef = useRef<HTMLDivElement>(null);

  // Resize handler to make it responsive
  useEffect(() => {
    if (!containerRef.current) return;
    const updateSize = () => {
      if (containerRef.current) {
        setGlobeSize({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight || (mini ? 300 : 550)
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
    size: activeProject?.id === p.id ? 0.35 : 0.18,
    color: activeProject?.id === p.id ? "#38BDF8" : "#16A34A",
    label: `${p.name} (${p.location}) - ₹${p.price}/t`,
    project: p
  }));

  // Implied buyer location: Mumbai (India's financial capital)
  const BUYER_COORDS = { lat: 19.076, lng: 72.8777 };

  // Handle active project selection camera zoom and arc drawing
  useEffect(() => {
    if (!globeRef.current) return;
    
    // Check user preference for reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const duration = prefersReducedMotion ? 50 : 2000;

    if (activeProject) {
      // Zoom and center camera onto the selected project coordinate
      globeRef.current.pointOfView(
        {
          lat: activeProject.lat - 2, // offset slightly to leave space for info card
          lng: activeProject.lng,
          altitude: mini ? 1.4 : 1.15
        },
        duration
      );

      // Create an animated arc from Mumbai (Buyer) to Project (Seller)
      setArcs([
        {
          startLat: BUYER_COORDS.lat,
          startLng: BUYER_COORDS.lng,
          endLat: activeProject.lat,
          endLng: activeProject.lng,
          color: ["#38BDF8", "#4ADE80", "#16A34A"],
          name: `Delivery Arc: Escrow → ${activeProject.name}`
        }
      ]);
    } else {
      // Return to default view showing all of India
      globeRef.current.pointOfView(
        {
          lat: 20.5937,
          lng: 78.9629,
          altitude: mini ? 1.8 : 1.6
        },
        duration
      );
      setArcs([]);
    }
  }, [activeProject, mini]);

  // Auto-rotate setup when no project is active
  useEffect(() => {
    if (!globeRef.current) return;
    const controls = globeRef.current.controls();
    if (controls) {
      controls.autoRotate = !activeProject;
      controls.autoRotateSpeed = 0.6;
      controls.enableZoom = interactive;
      controls.enablePan = interactive;
    }
  }, [activeProject, interactive]);

  // Choose earth texture based on the app theme context
  const globeImage = globeTheme === "dark" 
    ? "//unpkg.com/three-globe/example/img/earth-dark.jpg"
    : "//unpkg.com/three-globe/example/img/earth-blue-marble.jpg";

  return (
    <div ref={containerRef} className="w-full h-full relative flex items-center justify-center overflow-hidden">
      {/* Globe Component */}
      <Globe
        ref={globeRef}
        width={globeSize.width}
        height={globeSize.height}
        globeImageUrl={globeImage}
        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
        backgroundColor="rgba(0,0,0,0)"
        showAtmosphere={true}
        atmosphereColor={globeTheme === "dark" ? "#0F3C2C" : "#38BDF8"}
        
        // Points (Pins)
        pointsData={pointsData}
        pointLat="lat"
        pointLng="lng"
        pointColor="color"
        pointRadius="size"
        pointAltitude={0.02}
        pointsMerge={false}
        onPointClick={(point: any) => {
          if (interactive && onSelectProject) {
            onSelectProject(point.project);
          }
        }}
        pointLabel="label"

        // Arcs (Flight paths)
        arcsData={arcs}
        arcStartLat="startLat"
        arcStartLng="startLng"
        arcEndLat="endLat"
        arcEndLng="endLng"
        arcColor="color"
        arcDashLength={0.4}
        arcDashGap={0.02}
        arcDashAnimateTime={1200}
        arcStroke={1.4}
        arcAltitude={0.3}
      />

      {/* Embedded Legend/Compass */}
      {!mini && (
        <div className="absolute bottom-4 left-4 bg-[#0A0F0D]/80 backdrop-blur-md px-3 py-2 rounded-lg border border-emerald-950/40 text-[10px] text-slate-400 space-y-1 select-none pointer-events-none">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#16A34A] block animate-pulse"></span>
            <span>Active Seller Project (GCI Registry)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#38BDF8] block"></span>
            <span>Buyer Node (EcoVault Escrow Hub)</span>
          </div>
        </div>
      )}
    </div>
  );
}
